'use client';

import React from 'react';
import Link from 'next/link';
import { useChat } from '@/hooks/useChat';
import { useTheme } from '@/hooks/useTheme';
import { PanelLeft, Sun, Moon, Settings, User } from 'lucide-react';

export function Header() {
  const { toggleSidebar, chats, activeChatId } = useChat();
  const { theme, toggleTheme } = useTheme();

  const activeChat = chats.find((c) => c.id === activeChatId);

  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
          aria-label="Toggle Sidebar"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        <h1 className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs sm:max-w-md">
          {activeChat ? activeChat.title : 'MarketMind Assistant'}
        </h1>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        <Link
          href="/settings"
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </Link>

        <Link
          href="/profile"
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
          title="Profile"
        >
          <User className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}
