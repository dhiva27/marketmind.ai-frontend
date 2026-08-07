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

const INITIAL_CHATS: Chat[] = [
  {
    id: 'chat_1',
    title: 'Marketing strategy for...',
    createdAt: new Date(Date.now() - 120000).toISOString(),
    updatedAt: new Date(Date.now() - 120000).toISOString(),
    messagesCount: 2,
    lastMessageSnippet: 'Create a marketing strategy for my AI SaaS product',
  },
  {
    id: 'chat_2',
    title: 'Best SEO keywords...',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    messagesCount: 2,
    lastMessageSnippet: 'Top keywords for AI marketing tools...',
  },
  {
    id: 'chat_3',
    title: 'Competitor analysis...',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    messagesCount: 2,
    lastMessageSnippet: 'Competitor SWOT breakdown...',
  },
  {
    id: 'chat_4',
    title: 'Ad copy for SaaS...',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    messagesCount: 2,
    lastMessageSnippet: 'High converting Facebook & Google ad headlines...',
  },
  {
    id: 'chat_5',
    title: 'Content ideas for blog...',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    messagesCount: 2,
    lastMessageSnippet: '10 viral blog topics for SaaS growth...',
  },
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
  chat_1: [
    {
      id: 'msg_1',
      chatId: 'chat_1',
      sender: 'user',
      content: 'Create a marketing strategy for my AI SaaS product',
      timestamp: '10:30 AM',
    },
    {
      id: 'msg_2',
      chatId: 'chat_1',
      sender: 'assistant',
      content: `Here's a comprehensive marketing strategy for your AI SaaS product:

**1. Product Positioning**
Position your AI SaaS as an all-in-one solution that helps businesses save time and increase productivity.

**2. Target Audience**
• Startups and small businesses
• Marketing teams and agencies
• E-commerce businesses

**3. Key Marketing Channels...**`,
      timestamp: '10:31 AM',
    },
  ],
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string | null>('chat_1');
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sync with local storage
  useEffect(() => {
    const savedChats = localStorage.getItem('marketmind_chats');
    if (savedChats) {
      try {
        setChats(JSON.parse(savedChats));
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

    // AI Marketing Assistant response template
    const sampleResponse = `Here's a tailored marketing strategy breakdown for "${content.slice(0, 40)}":

**1. Strategic Messaging & Positioning**
• Focus on ROI, speed, and automated efficiency.
• Highlighting key features that solve critical customer pain points.

**2. Target Customer Segments**
• High-growth tech startups & SaaS founders
• In-house marketing managers looking to scale production
• Agencies offering digital growth services

**3. Actionable Launch Roadmap**
• **Phase 1**: Organic SEO & thought leadership content publishing
• **Phase 2**: High-converting Meta & Google ad retargeting campaigns
• **Phase 3**: Influencer partnerships and community outreach`;

    let index = 0;
    const interval = setInterval(() => {
      index += 4;
      const currentChunk = sampleResponse.slice(0, index);

      setMessagesMap((prev) => {
        const list = prev[targetChatId!] || [];
        return {
          ...prev,
          [targetChatId!]: list.map((m) =>
            m.id === assistantMsgId ? { ...m, content: currentChunk } : m
          ),
        };
      });

      if (index >= sampleResponse.length) {
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
    }, 20);
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
