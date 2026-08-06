'use client';

import React from 'react';
import { Attachment } from '@/types';
import { FileText, Image as ImageIcon, FileCode, Paperclip, X } from 'lucide-react';
import { formatBytes } from '@/utils/formatters';

interface AttachmentBadgeProps {
  attachment: Attachment;
  onRemove?: (id: string) => void;
  readOnly?: boolean;
}

export function AttachmentBadge({ attachment, onRemove, readOnly = false }: AttachmentBadgeProps) {
  const getIcon = () => {
    const ext = attachment.name.split('.').pop()?.toLowerCase() || '';
    if (['png', 'jpg', 'jpeg'].includes(ext)) {
      return <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />;
    }
    if (['csv', 'txt', 'docx', 'pdf'].includes(ext)) {
      return <FileText className="w-3.5 h-3.5 text-violet-500" />;
    }
    return <Paperclip className="w-3.5 h-3.5 text-slate-400" />;
  };

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-xs text-slate-700 dark:text-slate-200 shadow-xs">
      {getIcon()}
      <span className="truncate max-w-[140px] font-medium">{attachment.name}</span>
      <span className="text-[10px] text-slate-400 font-mono">({formatBytes(attachment.size)})</span>
      {!readOnly && onRemove && (
        <button
          type="button"
          onClick={() => onRemove(attachment.id)}
          className="ml-1 text-slate-400 hover:text-rose-500 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
