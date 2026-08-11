'use client';

import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { Plus, Mic, ChevronDown, Send, Square } from 'lucide-react';
import { useChat } from '@/hooks/useChat';

export function ChatInput() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('Flash');
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const { sendMessage, isGenerating } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as user types
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }, [prompt]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    const currentPrompt = prompt;
    setPrompt('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    await sendMessage(currentPrompt);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative px-2">
      {/* Large Pill Chat Input Box matching Reference 1 */}
      <form
        onSubmit={handleSubmit}
        className="relative rounded-full border border-slate-200 bg-white shadow-[0_4px_25px_rgba(139,61,255,0.12)] px-5 py-3.5 flex items-center justify-between gap-3 transition-all duration-300 focus-within:border-[#8B3DFF]/40 focus-within:shadow-[0_4px_30px_rgba(139,61,255,0.22)] min-h-[58px]"
      >
        {/* Plus Icon on Left */}
        <button
          type="button"
          className="p-1 text-[#8B3DFF] hover:text-[#7C3AED] transition-colors shrink-0"
          title="Add attachment"
        >
          <Plus className="w-5.5 h-5.5 stroke-[2]" />
        </button>

        {/* Multiline Textarea */}
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask MarketMind AI"
          disabled={isGenerating}
          rows={1}
          className="flex-1 bg-transparent border-0 text-[15px] text-[#0A0015] placeholder-[#9489A5] focus:outline-none focus:ring-0 resize-none py-1 min-h-[26px] max-h-[160px] custom-scrollbar font-medium"
        />

        {/* Right Section: Model Selector & Microphone / Send */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Model Selector Dropdown ("Flash v") */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <span>{model}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {modelDropdownOpen && (
              <div className="absolute right-0 bottom-12 w-44 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 text-xs text-slate-800 space-y-1">
                {[
                  { name: 'Flash', desc: 'Fast & smart' },
                  { name: 'Pro 2.0', desc: 'Deeper strategy' },
                  { name: 'Ultra Strategy', desc: 'Advanced analysis' },
                ].map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => {
                      setModel(m.name);
                      setModelDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                      model === m.name
                        ? 'font-bold text-[#8B3DFF] bg-purple-50'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <span>{m.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{m.desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Microphone / Send / Stop Button */}
          {isGenerating ? (
            <button
              type="button"
              title="Stop generating"
              className="p-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-all shadow-sm"
            >
              <Square className="w-4 h-4 fill-white" />
            </button>
          ) : prompt.trim() ? (
            <button
              type="submit"
              title="Send message"
              className="p-2 rounded-full bg-[#8B3DFF] text-white hover:bg-[#7C3AED] transition-all hover:scale-105 shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              className="p-1 text-slate-500 hover:text-slate-900 transition-colors"
              title="Voice Input"
            >
              <Mic className="w-5.5 h-5.5 stroke-[1.75]" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
