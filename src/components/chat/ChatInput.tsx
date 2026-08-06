'use client';

import React, { useState, useRef, KeyboardEvent } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useFileUpload } from '@/hooks/useFileUpload';
import { FileUploader } from '@/components/upload/FileUploader';
import { FilePreview } from './FilePreview';
import { Button } from '@/components/ui/button';

export function ChatInput() {
  const [prompt, setPrompt] = useState('');
  const { sendMessage, isGenerating } = useChat();
  const { attachments, error, handleFiles, removeAttachment, clearAttachments } = useFileUpload();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!prompt.trim() && attachments.length === 0) || isGenerating) return;

    const currentPrompt = prompt;
    const currentAttachments = [...attachments];

    setPrompt('');
    clearAttachments();

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    await sendMessage(currentPrompt, currentAttachments);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 180)}px`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* File Upload Error Alert */}
      {error && (
        <div className="mb-2 px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Input Box */}
      <form
        onSubmit={handleSubmit}
        className="relative rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xl p-3 focus-within:border-indigo-500 dark:focus-within:border-indigo-500/80 transition-all"
      >
        {/* File preview badge area */}
        {attachments.length > 0 && (
          <div className="mb-2 px-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <FilePreview attachments={attachments} onRemove={removeAttachment} />
          </div>
        )}

        <div className="flex items-end gap-2">
          <FileUploader onFilesSelected={handleFiles} disabled={isGenerating} />

          <textarea
            ref={textareaRef}
            rows={1}
            value={prompt}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask MarketMind AI anything... (Shift+Enter for new line)"
            className="flex-1 bg-transparent border-0 resize-none text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-0 max-h-44 py-1.5"
            disabled={isGenerating}
          />

          <Button
            type="submit"
            size="icon"
            disabled={(!prompt.trim() && attachments.length === 0) || isGenerating}
            className="rounded-xl flex-shrink-0 w-9 h-9"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>

      <div className="mt-2 text-center text-[11px] text-slate-400 dark:text-slate-500 font-normal">
        MarketMind AI can make mistakes. Verify important financial data.
      </div>
    </div>
  );
}
