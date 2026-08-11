'use client';

import React, { useState, useMemo } from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatHistoryItem } from './ChatHistoryItem';
import { Search, Plus, MessageSquare } from 'lucide-react';
import { Chat } from '@/types';

interface ChatHistoryListProps {
  onSelectChat?: () => void;
}

export function ChatHistoryList({ onSelectChat }: ChatHistoryListProps) {
  const { chats, activeChatId, createNewChat } = useChat();
  const [searchQuery, setSearchQuery] = useState('');

  // Search filter
  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chats;
    const query = searchQuery.toLowerCase();
    return chats.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        (c.lastMessageSnippet && c.lastMessageSnippet.toLowerCase().includes(query))
    );
  }, [chats, searchQuery]);

  // Group by date period
  const groupedChats = useMemo(() => {
    const today: Chat[] = [];
    const yesterday: Chat[] = [];
    const past7Days: Chat[] = [];
    const older: Chat[] = [];

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfYesterday = startOfToday - 86400000;
    const startOf7Days = startOfToday - 6 * 86400000;

    filteredChats.forEach((c) => {
      const date = new Date(c.updatedAt || c.createdAt || Date.now()).getTime();
      if (date >= startOfToday) {
        today.push(c);
      } else if (date >= startOfYesterday) {
        yesterday.push(c);
      } else if (date >= startOf7Days) {
        past7Days.push(c);
      } else {
        older.push(c);
      }
    });

    return { today, yesterday, past7Days, older };
  }, [filteredChats]);

  if (chats.length === 0) {
    return (
      <div className="px-4 py-10 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-900/20 border border-[#A855F7]/30 flex items-center justify-center mx-auto text-[#A855F7]">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <div className="text-sm font-semibold text-white">No Conversations Yet</div>
          <div className="text-xs text-slate-400">Start your first marketing strategy session</div>
        </div>
        <button
          onClick={() => {
            createNewChat();
            if (onSelectChat) onSelectChat();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-xs font-semibold text-white shadow-md hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          <span>New Strategy Chat</span>
        </button>
      </div>
    );
  }

  const renderGroup = (title: string, items: Chat[]) => {
    if (items.length === 0) return null;
    return (
      <div className="space-y-1">
        <div className="px-3 pt-3 pb-1 text-[10px] font-bold tracking-wider uppercase text-purple-300/60">
          {title}
        </div>
        {items.map((chat) => (
          <ChatHistoryItem
            key={chat.id}
            chat={chat}
            isActive={chat.id === activeChatId}
            onSelect={onSelectChat}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="px-3 pb-2 pt-1">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A0B2E]/90 border border-purple-900/40 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#A855F7]/60 transition-colors"
          />
        </div>
      </div>

      {/* History Items Grouped */}
      <div className="flex-1 overflow-y-auto px-1 space-y-2 custom-scrollbar">
        {filteredChats.length === 0 ? (
          <div className="px-3 py-6 text-center text-xs text-slate-400">
            No chats match "{searchQuery}"
          </div>
        ) : (
          <>
            {renderGroup('Today', groupedChats.today)}
            {renderGroup('Yesterday', groupedChats.yesterday)}
            {renderGroup('Previous 7 Days', groupedChats.past7Days)}
            {renderGroup('Older Conversations', groupedChats.older)}
          </>
        )}
      </div>
    </div>
  );
}
