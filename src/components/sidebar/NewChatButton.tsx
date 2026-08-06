'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { useChat } from '@/hooks/useChat';

export function NewChatButton() {
  const { createNewChat } = useChat();

  return (
    <button
      onClick={() => createNewChat()}
      className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-indigo-50 dark:hover:bg-slate-800/80 hover:border-indigo-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200 text-sm font-medium transition-all shadow-sm group"
    >
      <span className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-lg bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Plus className="w-4 h-4" />
        </div>
        New Chat
      </span>
      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
        ⌘K
      </span>
    </button>
  );
}
