'use client';

import React from 'react';
import { useChat } from '@/hooks/useChat';
import { PanelLeft, ChevronDown, Crown } from 'lucide-react';

export function Header() {
  const { toggleSidebar, createNewChat } = useChat();

  return (
    <header className="h-14 border-b border-slate-200/80 bg-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        {/* New Chat Dropdown trigger */}
        <button
          onClick={() => createNewChat()}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-900 border border-slate-200/90 rounded-xl px-3 py-1.5 hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <span>New Chat</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>

      {/* Upgrade Plan Button */}
      <div className="flex items-center gap-3">
        <button className="border border-purple-200/80 text-purple-700 bg-purple-50 hover:bg-purple-100/80 font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs">
          <Crown className="w-3.5 h-3.5 text-purple-600" />
          <span>Upgrade Plan</span>
        </button>
      </div>
    </header>
  );
}
