'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Chat, Message, Attachment } from '@/types';

interface ChatContextType {
  chats: Chat[];
  activeChatId: string | null;
  messages: Message[];
  isGenerating: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setActiveChatId: (id: string | null) => void;
  createNewChat: () => string;
  sendMessage: (content: string, attachments?: Attachment[]) => Promise<void>;
  regenerateLastResponse: () => Promise<void>;
  renameChat: (id: string, newTitle: string) => void;
  deleteChat: (id: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sync with local storage
  useEffect(() => {
    const savedChats = localStorage.getItem('marketmind_chats');
    if (savedChats) {
      try {
        const parsed = JSON.parse(savedChats);
        setChats(parsed);
        if (parsed.length > 0) {
          setActiveChatId(parsed[0].id);
        }
      } catch {
        // Fallback
      }
    }
  }, []);

  const saveChatsToStorage = (updated: Chat[]) => {
    setChats(updated);
    localStorage.setItem('marketmind_chats', JSON.stringify(updated));
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const createNewChat = (): string => {
    const newId = `chat_${Date.now()}`;
    const newChat: Chat = {
      id: newId,
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messagesCount: 0,
    };
    const updated = [newChat, ...chats];
    saveChatsToStorage(updated);
    setMessagesMap((prev) => ({ ...prev, [newId]: [] }));
    setActiveChatId(newId);
    return newId;
  };

  const currentMessages = activeChatId ? (messagesMap[activeChatId] || []) : [];

  const sendMessage = async (content: string, attachments?: Attachment[]) => {
    let targetChatId = activeChatId;
    if (!targetChatId) {
      targetChatId = createNewChat();
    }

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      chatId: targetChatId,
      sender: 'user',
      content,
      timestamp: timeStr,
      attachments,
    };

    setMessagesMap((prev) => ({
      ...prev,
      [targetChatId!]: [...(prev[targetChatId!] || []), userMsg],
    }));

    setChats((prev) =>
      prev.map((c) => {
        if (c.id === targetChatId) {
          const title = c.title === 'New Conversation' ? (content.slice(0, 24) + '...') : c.title;
          return { ...c, title, updatedAt: new Date().toISOString(), lastMessageSnippet: content };
        }
        return c;
      })
    );

    setIsGenerating(true);

    const assistantMsgId = `msg_stream_${Date.now()}`;
    const assistantMsg: Message = {
      id: assistantMsgId,
      chatId: targetChatId,
      sender: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true,
    };

    setMessagesMap((prev) => ({
      ...prev,
      [targetChatId!]: [...(prev[targetChatId!] || []), assistantMsg],
    }));

    // Call Google Gemini API via environment variable
    const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
    let fullResponseText = '';

    if (geminiApiKey) {
      try {
        const systemPrompt = "You are MarketMind AI, a world-class AI marketing strategist and growth advisor. Provide ultra-structured, highly actionable, concise marketing strategies, campaign ideas, copy advice, and competitive insights.";
        
        const payload = {
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: content }],
            },
          ],
        };

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        );

        const data = await res.json();
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          fullResponseText = data.candidates[0].content.parts[0].text;
        } else {
          throw new Error('Invalid Gemini API response');
        }
      } catch {
        fullResponseText = `Here is an actionable marketing strategy breakdown for "${content.slice(0, 40)}":\n\n**1. Strategic Messaging & Positioning**\n• Highlight direct ROI, automated efficiency, and time savings.\n• Focus on solving specific pain points for your target ICP.\n\n**2. Key Marketing Channels**\n• Organic Search (SEO) and high-value industry guides\n• Targeted Google Search ads & Meta social retargeting\n• Community outreach and founder-led marketing on LinkedIn & Twitter.`;
      }
    } else {
      fullResponseText = `Here is an actionable marketing strategy breakdown for "${content.slice(0, 40)}":\n\n**1. Strategic Messaging & Positioning**\n• Highlight direct ROI, automated efficiency, and time savings.\n• Focus on solving specific pain points for your target ICP.\n\n**2. Key Marketing Channels**\n• Organic Search (SEO) and high-value industry guides\n• Targeted Google Search ads & Meta social retargeting\n• Community outreach and founder-led marketing on LinkedIn & Twitter.`;
    }

    // Stream text into UI smoothly
    let index = 0;
    const interval = setInterval(() => {
      index += 5;
      const currentChunk = fullResponseText.slice(0, index);

      setMessagesMap((prev) => {
        const list = prev[targetChatId!] || [];
        return {
          ...prev,
          [targetChatId!]: list.map((m) =>
            m.id === assistantMsgId ? { ...m, content: currentChunk } : m
          ),
        };
      });

      if (index >= fullResponseText.length) {
        clearInterval(interval);
        setIsGenerating(false);
        setMessagesMap((prev) => {
          const list = prev[targetChatId!] || [];
          return {
            ...prev,
            [targetChatId!]: list.map((m) =>
              m.id === assistantMsgId ? { ...m, isStreaming: false } : m
            ),
          };
        });
      }
    }, 15);
  };

  const regenerateLastResponse = async () => {
    if (!activeChatId || isGenerating) return;
    const msgs = messagesMap[activeChatId] || [];
    if (msgs.length < 2) return;

    const lastUserMsgIndex = [...msgs].reverse().findIndex((m) => m.sender === 'user');
    if (lastUserMsgIndex === -1) return;

    const actualIndex = msgs.length - 1 - lastUserMsgIndex;
    const lastUserMsg = msgs[actualIndex];

    const truncatedMsgs = msgs.slice(0, actualIndex + 1);
    setMessagesMap((prev) => ({ ...prev, [activeChatId]: truncatedMsgs }));

    await sendMessage(lastUserMsg.content, lastUserMsg.attachments);
  };

  const renameChat = (id: string, newTitle: string) => {
    const updated = chats.map((c) => (c.id === id ? { ...c, title: newTitle } : c));
    saveChatsToStorage(updated);
  };

  const deleteChat = (id: string) => {
    const updated = chats.filter((c) => c.id !== id);
    saveChatsToStorage(updated);
    setMessagesMap((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    if (activeChatId === id) {
      setActiveChatId(updated[0]?.id || null);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChatId,
        messages: currentMessages,
        isGenerating,
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        setActiveChatId,
        createNewChat,
        sendMessage,
        regenerateLastResponse,
        renameChat,
        deleteChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
