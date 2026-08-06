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
    title: 'Market Analysis & Strategy',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    messagesCount: 4,
    lastMessageSnippet: 'Here is a breakdown of quarterly market dynamics...',
  },
  {
    id: 'chat_2',
    title: 'Financial Forecasting Model',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    messagesCount: 2,
    lastMessageSnippet: 'Python script for Monte Carlo portfolio simulation...',
  },
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
  chat_1: [
    {
      id: 'msg_1',
      chatId: 'chat_1',
      sender: 'user',
      content: 'Can you analyze the competitive landscape for SaaS platforms in 2026?',
      timestamp: new Date(Date.now() - 3600000 * 2.5).toISOString(),
    },
    {
      id: 'msg_2',
      chatId: 'chat_1',
      sender: 'assistant',
      content: `### Executive Overview: SaaS Market Trends

1. **AI Native Integration**: Standard SaaS platforms are transitioning to agent-assisted workflows.
2. **Unit Economics**: Net Revenue Retention (NRR) targets have shifted towards 115%+ for enterprise tiers.
3. **Data Security**: On-premise hybrid deployments and strict SOC2 / GDPR compliance remain top buying criteria.

\`\`\`typescript
interface MarketMetrics {
  nrr: number; // Net Revenue Retention %
  cacPaybackMonths: number;
  ltvCacRatio: number;
}

const benchmark: MarketMetrics = {
  nrr: 118,
  cacPaybackMonths: 14,
  ltvCacRatio: 4.2
};
\`\`\`
`,
      timestamp: new Date(Date.now() - 3600000 * 2.4).toISOString(),
    },
  ],
  chat_2: [
    {
      id: 'msg_3',
      chatId: 'chat_2',
      sender: 'user',
      content: 'Write a Python snippet to parse CSV financial figures.',
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'msg_4',
      chatId: 'chat_2',
      sender: 'assistant',
      content: `Here is a lightweight Python snippet using \`pandas\` to ingest financial data and calculate quarter-over-quarter revenue growth:

\`\`\`python
import pandas as pd

def compute_growth(filepath: str) -> pd.DataFrame:
    df = pd.read_csv(filepath)
    df['QoQ_Growth'] = df['Revenue'].pct_change() * 100
    return df

print("Ingestion script ready.")
\`\`\`
`,
      timestamp: new Date(Date.now() - 86400000 * 1.9).toISOString(),
    },
  ],
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string | null>('chat_1');
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sync to local storage if available
  useEffect(() => {
    const savedChats = localStorage.getItem('marketmind_chats');
    if (savedChats) {
      try {
        setChats(JSON.parse(savedChats));
      } catch {
        // Fallback to initial
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

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      chatId: targetChatId,
      sender: 'user',
      content,
      timestamp: new Date().toISOString(),
      attachments,
    };

    // Update messages map
    setMessagesMap((prev) => ({
      ...prev,
      [targetChatId!]: [...(prev[targetChatId!] || []), userMsg],
    }));

    // Auto-update chat title if default
    setChats((prev) =>
      prev.map((c) => {
        if (c.id === targetChatId) {
          const title = c.title === 'New Conversation' ? (content.slice(0, 30) || 'New Chat') : c.title;
          return { ...c, title, updatedAt: new Date().toISOString(), lastMessageSnippet: content };
        }
        return c;
      })
    );

    // Simulate streaming AI assistant response
    setIsGenerating(true);

    const assistantMsgId = `msg_stream_${Date.now()}`;
    const assistantMsg: Message = {
      id: assistantMsgId,
      chatId: targetChatId,
      sender: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      isStreaming: true,
    };

    setMessagesMap((prev) => ({
      ...prev,
      [targetChatId!]: [...(prev[targetChatId!] || []), assistantMsg],
    }));

    const sampleResponse = `Thank you for your message! Here is an automated intelligent response from **MarketMind-AI**:

- **Received Input**: "${content.slice(0, 50)}${content.length > 50 ? '...' : ''}"
- **Attachments Processed**: ${attachments && attachments.length > 0 ? attachments.map(a => a.name).join(', ') : 'None'}

\`\`\`json
{
  "status": "success",
  "model": "MarketMind-v1-Turbo",
  "confidenceScore": 0.985,
  "executionTime": "140ms"
}
\`\`\`

Feel free to ask follow-up questions or attach additional financial documents!`;

    // Stream characters sequentially
    let index = 0;
    const interval = setInterval(() => {
      index += 3;
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
    }, 25);
  };

  const regenerateLastResponse = async () => {
    if (!activeChatId || isGenerating) return;
    const msgs = messagesMap[activeChatId] || [];
    if (msgs.length < 2) return;

    // Find last user prompt
    const lastUserMsgIndex = [...msgs].reverse().findIndex((m) => m.sender === 'user');
    if (lastUserMsgIndex === -1) return;

    const actualIndex = msgs.length - 1 - lastUserMsgIndex;
    const lastUserMsg = msgs[actualIndex];

    // Remove responses after user msg
    const truncatedMsgs = msgs.slice(0, actualIndex + 1);
    setMessagesMap((prev) => ({ ...prev, [activeChatId]: truncatedMsgs }));

    // Trigger message send
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
