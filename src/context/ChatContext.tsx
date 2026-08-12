'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Chat, Message, Attachment } from '@/types';
import { chatService } from '@/services/chatService';
import { useAuthContext } from '@/context/AuthContext';

interface ChatContextType {
  chats: Chat[];
  activeChatId: string | null;
  messages: Message[];
  isGenerating: boolean;
  sidebarOpen: boolean;
  sidebarExpanded: boolean;
  historyDrawerOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setSidebarExpanded: (expanded: boolean) => void;
  setHistoryDrawerOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  toggleSidebarExpand: () => void;
  toggleHistoryDrawer: () => void;
  setActiveChatId: (id: string | null) => void;
  createNewChat: () => string;
  sendMessage: (content: string, attachments?: Attachment[]) => Promise<void>;
  regenerateLastResponse: () => Promise<void>;
  renameChat: (id: string, newTitle: string) => Promise<void>;
  deleteChat: (id: string) => Promise<void>;
  refreshHistory: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('mm_sidebar_expanded');
    if (saved !== null) {
      setSidebarExpanded(saved === 'true');
    }
  }, []);

  const handleSetSidebarExpanded = (expanded: boolean) => {
    setSidebarExpanded(expanded);
    localStorage.setItem('mm_sidebar_expanded', String(expanded));
  };

  const toggleSidebarExpand = () => {
    handleSetSidebarExpanded(!sidebarExpanded);
  };

  // Load chat history from backend or localStorage on mount
  const refreshHistory = async () => {
    try {
      const history = await chatService.getHistory();
      if (history && history.length > 0) {
        setChats(history);
        if (!activeChatId) {
          setActiveChatId(history[0].id);
        }
        localStorage.setItem('marketmind_chats', JSON.stringify(history));
        return;
      }
    } catch (err) {
      console.warn('Backend history fetch failed, reading local storage:', err);
    }

    // Fallback to local storage
    const savedChats = localStorage.getItem('marketmind_chats');
    if (savedChats) {
      try {
        const parsed = JSON.parse(savedChats);
        setChats(parsed);
        if (parsed.length > 0 && !activeChatId) {
          setActiveChatId(parsed[0].id);
        }
      } catch {
        // Fallback
      }
    }
  };

  const { user: authUser } = useAuthContext();

  useEffect(() => {
    refreshHistory();
  }, [authUser]);

  // Fetch messages for active chat when switched
  useEffect(() => {
    if (!activeChatId) return;

    if (!messagesMap[activeChatId] || messagesMap[activeChatId].length === 0) {
      chatService
        .getMessages(activeChatId)
        .then((fetchedMsgs) => {
          if (fetchedMsgs && fetchedMsgs.length > 0) {
            setMessagesMap((prev) => ({ ...prev, [activeChatId]: fetchedMsgs }));
          }
        })
        .catch((err) => {
          console.warn(`Could not load backend messages for chat ${activeChatId}:`, err);
        });
    }
  }, [activeChatId]);

  const saveChatsToStorage = (updated: Chat[]) => {
    setChats(updated);
    localStorage.setItem('marketmind_chats', JSON.stringify(updated));
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleHistoryDrawer = () => setHistoryDrawerOpen((prev) => !prev);

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

  const currentMessages = activeChatId ? messagesMap[activeChatId] || [] : [];

  const sendMessage = async (content: string, attachments?: Attachment[]) => {
    if (!content || !content.trim()) return;

    let targetChatId = activeChatId;
    if (!targetChatId) {
      targetChatId = createNewChat();
    }

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      chatId: targetChatId,
      sender: 'user',
      content: content.trim(),
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
          const title = c.title === 'New Conversation' ? (content.length > 30 ? content.slice(0, 30) + '...' : content) : c.title;
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

    let fullResponseText = '';

    // Step 1: Attempt backend Express API call first if configured
    try {
      const response = await chatService.sendMessage(targetChatId, content);
      fullResponseText = response.aiMessage.content;
      if (response.chatSession?.title) {
        setChats((prev) =>
          prev.map((c) => (c.id === targetChatId ? { ...c, title: response.chatSession.title } : c))
        );
      }
    } catch (expressError) {
      // Step 2: Fallback to Next.js Server Route Handler (Vercel Serverless Function)
      try {
        const historyForServer = (messagesMap[targetChatId] || []).concat(userMsg);
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: content.trim(),
            messages: historyForServer,
          }),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          throw new Error(data.error || `Server responded with status ${res.status}`);
        }

        fullResponseText = data.text;
      } catch (serverErr: any) {
        console.error('Server side Gemini execution error:', serverErr);
        fullResponseText = `⚠️ **Connection Error**\n\n${
          serverErr.message || 'Failed to generate response from Gemini AI. Please check your Vercel environment variables or internet connection.'
        }`;
      }
    }

    // Stream text into UI smoothly
    let index = 0;
    const interval = setInterval(() => {
      index += 6;
      const currentChunk = fullResponseText.slice(0, index);

      setMessagesMap((prev) => {
        const list = prev[targetChatId!] || [];
        return {
          ...prev,
          [targetChatId!]: list.map((m) => (m.id === assistantMsgId ? { ...m, content: currentChunk } : m)),
        };
      });

      if (index >= fullResponseText.length) {
        clearInterval(interval);
        setIsGenerating(false);
        setMessagesMap((prev) => {
          const list = prev[targetChatId!] || [];
          return {
            ...prev,
            [targetChatId!]: list.map((m) => (m.id === assistantMsgId ? { ...m, isStreaming: false } : m)),
          };
        });
      }
    }, 12);
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

  const renameChat = async (id: string, newTitle: string) => {
    const updated = chats.map((c) => (c.id === id ? { ...c, title: newTitle } : c));
    saveChatsToStorage(updated);
    try {
      await chatService.renameChat(id, newTitle);
    } catch (err) {
      console.warn('Backend rename failed:', err);
    }
  };

  const deleteChat = async (id: string) => {
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
    try {
      await chatService.deleteChat(id);
    } catch (err) {
      console.warn('Backend delete chat failed:', err);
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
        sidebarExpanded,
        historyDrawerOpen,
        setSidebarOpen,
        setSidebarExpanded: handleSetSidebarExpanded,
        setHistoryDrawerOpen,
        toggleSidebar,
        toggleSidebarExpand,
        toggleHistoryDrawer,
        setActiveChatId,
        createNewChat,
        sendMessage,
        regenerateLastResponse,
        renameChat,
        deleteChat,
        refreshHistory,
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
