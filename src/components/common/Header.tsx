'use client';

import React from 'react';
import { SquarePen, History, Sparkles } from 'lucide-react';
import { useChat } from '@/hooks/useChat';

export function Header() {
  const { chats, activeChatId, toggleHistoryDrawer, createNewChat } = useChat();

  const activeChat = chats.find((c) => c.id === activeChatId);
  const activeTitle = activeChat?.title || 'New Marketing Session';

  return (
    <header className="h-14 bg-transparent px-4 sm:px-6 flex items-center justify-between select-none z-30 shrink-0 absolute top-0 right-0 left-16 sm:left-[74px]">
      {/* Active Conversation Title & History Button */}
      <button
        onClick={() => toggleHistoryDrawer()}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#17101F]/70 border border-purple-900/30 text-white hover:bg-purple-900/40 hover:border-[#A855F7]/40 transition-all text-xs font-semibold backdrop-blur-md"
        title="Open Chat History"
      >
        <History className="w-3.5 h-3.5 text-[#A855F7]" />
        <span className="truncate max-w-[200px] sm:max-w-xs">{activeTitle}</span>
        <Sparkles className="w-3 h-3 text-[#A855F7] opacity-70" />
      </button>

      {/* Top-Right: New Chat Action */}
      <button
        onClick={() => createNewChat()}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/30 text-[#B8AFC4] hover:text-white hover:bg-purple-800/50 border border-purple-700/30 transition-colors text-xs font-medium backdrop-blur-md"
        title="Start New Chat"
      >
        <SquarePen className="w-3.5 h-3.5 text-[#A855F7]" />
        <span className="hidden sm:inline">New Chat</span>
      </button>
    </header>
  );
}
