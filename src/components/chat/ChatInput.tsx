'use client';

import React, { useState, useRef, KeyboardEvent } from 'react';
import { Plus, Mic, ChevronDown, Send } from 'lucide-react';
import { useChat } from '@/hooks/useChat';

export function ChatInput() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('Flash');
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const { sendMessage, isGenerating } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    const currentPrompt = prompt;
    setPrompt('');

    await sendMessage(currentPrompt);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative px-2">
      {/* Pill Shape Input Bar matching second reference image */}
      <form
        onSubmit={handleSubmit}
        className="relative rounded-full border border-purple-500/25 bg-[#17101F]/95 backdrop-blur-md shadow-[0_0_35px_rgba(109,0,255,0.3)] px-5 py-3.5 flex items-center justify-between gap-3 transition-all duration-300 focus-within:border-purple-500/50 focus-within:shadow-[0_0_45px_rgba(109,0,255,0.45)]"
      >
        {/* Plus Icon on Left */}
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          className="p-1 text-slate-300 hover:text-white transition-colors shrink-0"
          title="Add attachment"
        >
          <Plus className="w-5 h-5 stroke-[1.75]" />
        </button>

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask MarketMind AI"
          disabled={isGenerating}
          className="w-full bg-transparent border-0 text-sm sm:text-base text-white placeholder-[#B8AEC5] focus:outline-none focus:ring-0 py-0.5"
        />

        {/* Right Section: Model Selector Dropdown & Microphone Icon */}
        <div className="flex items-center gap-3.5 shrink-0">
          {/* Model Selector Dropdown ("Flash v") */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white px-2 py-1 rounded-lg hover:bg-purple-900/30 transition-colors"
            >
              <span>{model}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {modelDropdownOpen && (
              <div className="absolute right-0 bottom-10 w-36 bg-[#17101F] border border-purple-500/30 rounded-xl shadow-2xl p-1.5 z-50 text-xs text-slate-200 space-y-1">
                {['Flash', 'Pro 2.0', 'Ultra Strategy'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setModel(m);
                      setModelDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-purple-900/40 transition-colors ${
                      model === m ? 'font-bold text-[#A855F7] bg-purple-950/60' : ''
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Microphone / Send Button */}
          {prompt.trim() ? (
            <button
              type="submit"
              disabled={isGenerating}
              className="p-1.5 rounded-full bg-[#A855F7] text-white hover:bg-purple-600 transition-all hover:scale-105"
            >
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              className="p-1 text-slate-300 hover:text-white transition-colors"
              title="Voice Input"
            >
              <Mic className="w-5 h-5 stroke-[1.5]" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
