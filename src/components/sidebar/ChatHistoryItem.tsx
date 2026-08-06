'use client';

import React, { useState } from 'react';
import { Chat } from '@/types';
import { useChat } from '@/hooks/useChat';
import { MessageSquare, MoreVertical, Edit3, Trash2, Check, X } from 'lucide-react';
import { Dropdown } from '@/components/ui/dropdown';
import { cn } from '@/lib/utils';

interface ChatHistoryItemProps {
  chat: Chat;
  isActive: boolean;
}

export function ChatHistoryItem({ chat, isActive }: ChatHistoryItemProps) {
  const { setActiveChatId, renameChat, deleteChat } = useChat();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(chat.title);

  const handleSaveRename = () => {
    if (editTitle.trim() && editTitle !== chat.title) {
      renameChat(chat.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const dropdownItems = [
    {
      label: 'Rename',
      icon: <Edit3 className="w-3.5 h-3.5" />,
      onClick: () => setIsEditing(true),
    },
    {
      label: 'Delete',
      icon: <Trash2 className="w-3.5 h-3.5" />,
      onClick: () => deleteChat(chat.id),
      danger: true,
    },
  ];

  return (
    <div
      onClick={() => !isEditing && setActiveChatId(chat.id)}
      className={cn(
        'group relative flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all',
        isActive
          ? 'bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-semibold'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <MessageSquare className={cn('w-4 h-4 flex-shrink-0', isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400')} />

        {isEditing ? (
          <div className="flex items-center gap-1 flex-1" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveRename()}
              className="w-full bg-white dark:bg-slate-900 border border-indigo-500 rounded px-2 py-0.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              autoFocus
            />
            <button onClick={handleSaveRename} className="p-1 text-emerald-600 hover:text-emerald-500">
              <Check className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setIsEditing(false)} className="p-1 text-rose-600 hover:text-rose-500">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <span className="truncate flex-1">{chat.title}</span>
        )}
      </div>

      {!isEditing && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
          <Dropdown
            trigger={
              <button className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60">
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            }
            items={dropdownItems}
          />
        </div>
      )}
    </div>
  );
}
