'use client';

import React from 'react';
import { RotateCw } from 'lucide-react';
import { useChat } from '@/hooks/useChat';

export function RegenerateButton() {
  const { regenerateLastResponse, isGenerating } = useChat();

  return (
    <button
      onClick={() => regenerateLastResponse()}
      disabled={isGenerating}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-40"
      title="Regenerate assistant response"
    >
      <RotateCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
      <span>Regenerate</span>
    </button>
  );
}
