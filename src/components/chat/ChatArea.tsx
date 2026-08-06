'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { MessageItem } from './MessageItem';
import { ChatInput } from './ChatInput';
import { Sparkles, ArrowDown, TrendingUp, ShieldCheck, BarChart3, HelpCircle } from 'lucide-react';

export function ChatArea() {
  const { messages, sendMessage, isGenerating } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    setShowScrollBottom(scrollHeight - scrollTop - clientHeight > 150);
  };

  const samplePrompts = [
    {
      icon: <TrendingUp className="w-4 h-4 text-emerald-500" />,
      title: 'Market Analysis',
      prompt: 'Analyze current tech sector valuation metrics and market trends.',
    },
    {
      icon: <BarChart3 className="w-4 h-4 text-indigo-500" />,
      title: 'Financial Model',
      prompt: 'Create a Python script for calculating Discounted Cash Flows (DCF).',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-violet-500" />,
      title: 'Risk Assessment',
      prompt: 'Summarize portfolio risk management frameworks for SaaS startups.',
    },
    {
      icon: <HelpCircle className="w-4 h-4 text-amber-500" />,
      title: 'Doc Analysis',
      prompt: 'How do I upload CSV financial reports for automated analysis?',
    },
  ];

  return (
    <div className="relative flex-1 flex flex-col h-full min-h-0 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Scrollable Message Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto min-h-0 custom-scrollbar"
      >
        {messages.length === 0 ? (
          <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-fade-in">
            <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/20">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-700 dark:from-white dark:via-indigo-200 dark:to-slate-300 bg-clip-text text-transparent">
                What can MarketMind AI help with today?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Real-time market insights, financial code generation, document analysis, and strategic intelligence.
              </p>
            </div>

            {/* Quick Prompt Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
              {samplePrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(item.prompt)}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-indigo-50/60 dark:hover:bg-slate-800/60 hover:border-indigo-300 dark:hover:border-slate-700 transition-all text-left group"
                >
                  <div className="flex items-center gap-2 mb-1.5 font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{item.prompt}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-900">
            {messages.map((msg, index) => (
              <MessageItem
                key={msg.id}
                message={msg}
                isLastAssistantMessage={
                  msg.sender === 'assistant' && index === messages.length - 1
                }
              />
            ))}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </div>

      {/* Floating Auto-Scroll Button */}
      {showScrollBottom && (
        <button
          onClick={() => scrollToBottom()}
          className="absolute bottom-24 right-6 p-2 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 transition-all animate-bounce z-20"
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      )}

      {/* Fixed Chat Input Bar */}
      <div className="border-t border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <ChatInput />
      </div>
    </div>
  );
}
