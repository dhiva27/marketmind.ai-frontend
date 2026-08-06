'use client';

import React from 'react';
import Link from 'next/link';
import { useChat } from '@/hooks/useChat';
import { NewChatButton } from './NewChatButton';
import { ChatHistoryList } from './ChatHistoryList';
import { UserProfileCard } from './UserProfileCard';
import { Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useChat();

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed md:static inset-y-0 left-0 z-50 w-72 bg-slate-50/90 dark:bg-slate-950/90 border-r border-slate-200 dark:border-slate-800/80 p-4 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:p-0 md:border-r-0 md:overflow-hidden'
        )}
      >
        <div className="flex flex-col h-full min-h-0 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-base bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-indigo-200 dark:to-slate-300 bg-clip-text text-transparent">
                MarketMind AI
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <NewChatButton />

          {/* Chat List Scrollable Container */}
          <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
            <ChatHistoryList />
          </div>

          {/* User Profile Card */}
          <UserProfileCard />
        </div>
      </aside>
    </>
  );
}
