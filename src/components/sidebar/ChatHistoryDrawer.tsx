'use client';

import React from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatHistoryList } from './ChatHistoryList';
import { SquarePen, X, MessageSquare, Sparkles } from 'lucide-react';

export function ChatHistoryDrawer() {
  const { historyDrawerOpen, setHistoryDrawerOpen, createNewChat } = useChat();

  if (!historyDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex select-none">
      {/* Dark Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setHistoryDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-80 max-w-[85vw] bg-[#0E031A]/95 border-r border-[#A855F7]/30 h-full flex flex-col z-50 shadow-2xl animate-slide-right backdrop-blur-md ml-16 sm:ml-[74px]">
        {/* Header */}
        <div className="p-4 border-b border-purple-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] flex items-center justify-center text-white shadow-sm">
              <MessageSquare className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                Chat History
                <Sparkles className="w-3 h-3 text-[#A855F7]" />
              </h2>
              <p className="text-[11px] text-slate-400">All marketing sessions</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                createNewChat();
                setHistoryDrawerOpen(false);
              }}
              title="New Chat"
              className="p-1.5 rounded-xl bg-purple-900/40 text-purple-300 hover:text-white hover:bg-purple-800/60 transition-colors border border-purple-700/30"
            >
              <SquarePen className="w-4 h-4" />
            </button>
            <button
              onClick={() => setHistoryDrawerOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-purple-900/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-hidden py-2">
          <ChatHistoryList onSelectChat={() => setHistoryDrawerOpen(false)} />
        </div>
      </div>
    </div>
  );
}
