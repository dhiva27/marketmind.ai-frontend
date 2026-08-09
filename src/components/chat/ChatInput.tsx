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
    <div className="w-full max-w-3xl mx-auto relative px-2">
      {/* Large Pill Chat Input Box matching Section 5 & Second Reference Image */}
      <form
        onSubmit={handleSubmit}
        className="relative rounded-[34px] border border-[#A855F7]/25 bg-[rgba(20,8,30,0.85)] backdrop-blur-md shadow-[0_0_35px_rgba(139,61,255,0.35)] px-6 py-4 flex items-center justify-between gap-4 transition-all duration-300 focus-within:border-[#A855F7]/60 focus-within:shadow-[0_0_45px_rgba(139,61,255,0.5)] min-h-[64px]"
      >
        {/* Plus Icon on Left */}
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          className="p-1 text-[#B8AFC4] hover:text-white transition-colors shrink-0"
          title="Add attachment"
        >
          <Plus className="w-5.5 h-5.5 stroke-[1.75]" />
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
          className="w-full bg-transparent border-0 text-base text-white placeholder-[#81758F] focus:outline-none focus:ring-0 py-0.5"
        />

        {/* Right Section: Model Selector Dropdown & Microphone Icon */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Model Selector Dropdown ("Flash v") */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-[#B8AFC4] hover:text-white px-2.5 py-1 rounded-xl hover:bg-purple-900/30 transition-colors"
            >
              <span>{model}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#81758F]" />
            </button>

            {modelDropdownOpen && (
              <div className="absolute right-0 bottom-12 w-40 bg-[#17101F] border border-[#A855F7]/30 rounded-2xl shadow-2xl p-1.5 z-50 text-xs text-slate-200 space-y-1 backdrop-blur-lg">
                {['Flash', 'Pro 2.0', 'Ultra Strategy'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setModel(m);
                      setModelDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl hover:bg-purple-900/40 transition-colors ${
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
              className="p-2 rounded-full bg-[#8B3DFF] text-white hover:bg-[#7C3AED] transition-all hover:scale-105 shadow-md"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          ) : (
            <button
              type="button"
              className="p-1 text-[#B8AFC4] hover:text-white transition-colors"
              title="Voice Input"
            >
              <Mic className="w-5.5 h-5.5 stroke-[1.5]" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
