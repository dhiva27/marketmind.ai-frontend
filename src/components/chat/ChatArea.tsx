'use client';

import React, { useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { useAuthContext } from '@/context/AuthContext';
import { MessageItem } from './MessageItem';
import { ChatInput } from './ChatInput';
import { Target, Users, Search, Lightbulb, Megaphone, BarChart2 } from 'lucide-react';

export function ChatArea() {
  const { messages, sendMessage } = useChat();
  const { user } = useAuthContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dynamic username from authenticated user's account (username -> displayName -> email handle)
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Sparse, tiny, elegant star particles
  const starParticles = Array.from({ length: 32 }).map((_, i) => ({
    id: i,
    top: `${(i * 19) % 95}%`,
    left: `${(i * 31) % 95}%`,
    size: `${(i % 3) * 0.7 + 1.2}px`,
    duration: `${6 + (i % 5) * 1.2}s`,
    delay: `${(i % 4) * 0.8}s`,
  }));

  const quickActions = [
    { label: 'Marketing Strategy', icon: Target, prompt: 'Create a complete marketing strategy for my SaaS product.' },
    { label: 'Competitor Analysis', icon: Users, prompt: 'Analyze my main competitors and highlight their strengths and weaknesses.' },
    { label: 'SEO Strategy', icon: Search, prompt: 'Outline an organic SEO strategy to rank #1 for high-intent keywords.' },
    { label: 'Content Ideas', icon: Lightbulb, prompt: 'Generate 5 high-converting viral content ideas for my marketing campaign.' },
    { label: 'Campaign Ideas', icon: Megaphone, prompt: 'Design a multi-channel ad campaign for Google, Meta, and LinkedIn.' },
    { label: 'Market Research', icon: BarChart2, prompt: 'Conduct a market research breakdown for top growth trends in my industry.' },
  ];

  const hasMessages = messages.length > 0;

  return (
    <div className="relative flex-1 flex flex-col h-full min-h-0 bg-[#10001F] overflow-hidden select-none pl-16 sm:pl-[74px]">
      {/* Soft Radial Purple Glow with Slow Breathing Pulse Animation */}
      <div
        className="absolute inset-0 pointer-events-none z-0 animate-pulse-glow"
        style={{
          background:
            'radial-gradient(ellipse 72% 52% at 50% 48%, rgba(139, 61, 255, 0.45) 0%, rgba(168, 85, 247, 0.35) 25%, rgba(76, 29, 149, 0.25) 48%, rgba(20, 0, 31, 0.15) 68%, rgba(16, 0, 31, 1) 85%)',
        }}
      />

      {/* Subtle Star Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
        {starParticles.map((star) => (
          <div
            key={star.id}
            className="star-particle"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              '--duration': star.duration,
              '--delay': star.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Main Canvas Area */}
      <div className="relative z-10 flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 custom-scrollbar flex flex-col justify-center">
        {!hasMessages ? (
          /* EMPTY CHATBOT HERO STATE matching Reference Design */
          <div className="max-w-3xl w-full mx-auto space-y-8 my-auto text-center animate-fade-in-up py-6">
            {/* Dynamic Heading */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-medium text-[#FFFFFF] tracking-normal leading-tight">
                The mic is yours,{' '}
                <span className="text-[#A855F7] font-medium">
                  {displayName}
                </span>
              </h1>
            </div>

            {/* Pill Chat Input Box */}
            <div className="w-full">
              <ChatInput />
            </div>

            {/* Redesigned MarketMind Purple Quick Actions */}
            <div className="flex items-center justify-center flex-wrap gap-2.5 max-w-2xl mx-auto pt-2">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => sendMessage(action.prompt)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-purple-500/20 bg-[#17101F]/80 text-[#B8AFC4] hover:text-white hover:bg-purple-900/40 hover:border-[#A855F7]/40 transition-all text-xs font-medium backdrop-blur-md shadow-xs active:scale-95"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#A855F7]" />
                    <span>{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* ACTIVE CONVERSATION STATE */
          <div className="max-w-3xl w-full mx-auto space-y-6 pt-4 pb-32">
            <div className="space-y-6 text-left max-w-2xl mx-auto">
              {messages.map((msg, index) => (
                <MessageItem
                  key={msg.id}
                  message={msg}
                  isLastAssistantMessage={
                    msg.sender === 'assistant' && index === messages.length - 1
                  }
                />
              ))}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Fixed Sticky Bottom Composer */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-30 ml-8 sm:ml-[37px]">
              <ChatInput />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
