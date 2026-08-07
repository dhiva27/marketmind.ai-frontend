'use client';

import React, { useState, useRef, KeyboardEvent } from 'react';
import { Send, Paperclip, AlertCircle } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useFileUpload } from '@/hooks/useFileUpload';
import { FilePreview } from './FilePreview';

export function ChatInput() {
  const [prompt, setPrompt] = useState('');
  const { sendMessage, isGenerating } = useChat();
  const { attachments, error, handleFiles, removeAttachment, clearAttachments } = useFileUpload();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4">
      {/* File Upload Error Alert */}
      {error && (
        <div className="mb-2 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Composer Box */}
      <form
        onSubmit={handleSubmit}
        className="relative rounded-2xl border border-slate-200/90 bg-white shadow-md p-2.5 flex items-center justify-between gap-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all"
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={onFileChange}
          className="hidden"
        />

        {/* Attachment preview area */}
        {attachments.length > 0 && (
          <div className="absolute -top-12 left-0 right-0 px-2 py-1 bg-white/95 rounded-xl border border-slate-200 shadow-sm backdrop-blur-xs">
            <FilePreview attachments={attachments} onRemove={removeAttachment} />
          </div>
        )}

        <div className="flex items-center gap-2 flex-1">
          {/* Paperclip Attachment Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isGenerating}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
            title="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Text Area Input */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={prompt}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about marketing..."
            className="w-full bg-transparent border-0 resize-none text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 max-h-36 py-1"
            disabled={isGenerating}
          />
        </div>

        {/* Purple Circular Send Button */}
        <button
          type="submit"
          disabled={(!prompt.trim() && attachments.length === 0) || isGenerating}
          className="w-9.5 h-9.5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center justify-center shrink-0 shadow-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
        >
          <Send className="w-4 h-4 fill-current ml-0.5" />
        </button>
      </form>

      {/* Small Disclaimer */}
      <div className="mt-2 text-center text-[11px] text-slate-400 font-normal">
        MarketMind AI can make mistakes. Please verify important information.
      </div>
    </div>
  );
}
