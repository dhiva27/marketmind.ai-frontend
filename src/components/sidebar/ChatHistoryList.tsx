'use client';

import React from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatHistoryItem } from './ChatHistoryItem';

export function ChatHistoryList() {
  const { chats, activeChatId } = useChat();

  if (chats.length === 0) {
    return (
      <div className="px-3 py-6 text-center text-xs text-slate-400 dark:text-slate-500">
        No conversations yet. Start a new chat!
      </div>
    );
  }

  return (
    <div className="space-y-1 py-2">
      <div className="px-3 pb-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
        Recent Chats
      </div>
      {chats.map((chat) => (
        <ChatHistoryItem key={chat.id} chat={chat} isActive={chat.id === activeChatId} />
      ))}
    </div>
  );
}
