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
  onSelect?: () => void;
}

export function ChatHistoryItem({ chat, isActive, onSelect }: ChatHistoryItemProps) {
  const { setActiveChatId, renameChat, deleteChat } = useChat();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(chat.title);

  const handleSaveRename = async () => {
    if (editTitle.trim() && editTitle !== chat.title) {
      await renameChat(chat.id, editTitle.trim());
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
      icon: <Trash2 className="w-3.5 h-3.5 text-rose-400" />,
      onClick: () => deleteChat(chat.id),
      danger: true,
    },
  ];

  return (
    <div
      onClick={() => {
        if (!isEditing) {
          setActiveChatId(chat.id);
          if (onSelect) onSelect();
        }
      }}
      className={cn(
        'group relative flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all border',
        isActive
          ? 'bg-[#8B3DFF]/25 border-[#A855F7]/40 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.2)]'
          : 'border-transparent text-[#B8AFC4] hover:bg-purple-900/20 hover:text-white hover:border-purple-800/30'
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <MessageSquare className={cn('w-4 h-4 flex-shrink-0', isActive ? 'text-[#A855F7]' : 'text-slate-400')} />

        {isEditing ? (
          <div className="flex items-center gap-1 flex-1" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveRename()}
              className="w-full bg-[#1A0B2E] border border-[#A855F7] rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
              autoFocus
            />
            <button onClick={handleSaveRename} className="p-1 text-emerald-400 hover:text-emerald-300">
              <Check className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setIsEditing(false)} className="p-1 text-rose-400 hover:text-rose-300">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col min-w-0 flex-1">
            <span className="truncate text-xs font-medium">{chat.title}</span>
            {chat.lastMessageSnippet && (
              <span className="truncate text-[10px] text-slate-400 font-normal mt-0.5">
                {chat.lastMessageSnippet}
              </span>
            )}
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
          <Dropdown
            trigger={
              <button className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-purple-800/40">
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
