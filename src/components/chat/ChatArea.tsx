'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useChat } from '@/hooks/useChat';
import { useAuthContext } from '@/context/AuthContext';
import { MessageItem, TypingIndicator } from './MessageItem';
import { ChatInput } from './ChatInput';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ChatArea() {
  const { messages, isGenerating, sidebarExpanded } = useChat();
  const { user } = useAuthContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Dhivakar';

  // Scroll to bottom
  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  // Track scroll position to show/hide scroll-to-bottom button
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollBtn(distFromBottom > 120);
  }, []);

  useEffect(() => {
    if (!showScrollBtn) {
      scrollToBottom();
    }
  }, [messages, isGenerating, showScrollBtn, scrollToBottom]);

  // Sparse star particles for soft white background
  const starParticles = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    top: `${(i * 23) % 90}%`,
    left: `${(i * 37) % 90}%`,
    size: `${(i % 3) * 0.8 + 1.5}px`,
    duration: `${6 + (i % 5) * 1.2}s`,
    delay: `${(i % 4) * 0.8}s`,
  }));

  const hasMessages = messages.length > 0;

  return (
    <div
      className={cn(
        'relative flex-1 flex flex-col h-full min-h-0 bg-[#FFFFFF] overflow-hidden select-none transition-all duration-300',
        sidebarExpanded ? 'pl-64 sm:pl-72' : 'pl-16 sm:pl-[74px]'
      )}
    >
      {/* Subtle Purple Radial Glow around center matching Reference 1 */}
      <div
        className="absolute inset-0 pointer-events-none z-0 animate-pulse-glow"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 50% 50%, rgba(168, 85, 247, 0.08) 0%, rgba(139, 61, 255, 0.03) 40%, rgba(255, 255, 255, 0) 75%)',
        }}
      />

      {/* Subtle Floating Purple Star Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        {starParticles.map((star) => (
          <div
            key={star.id}
            className="star-particle bg-purple-400"
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

      {/* Main Scroll Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="relative z-10 flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 custom-scrollbar flex flex-col justify-center"
      >
        {!hasMessages ? (
          /* EMPTY STATE HERO matching Reference 1 */
          <div className="max-w-3xl w-full mx-auto space-y-8 my-auto text-center animate-fade-in-up py-6">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-[#0A0015] tracking-tight leading-tight">
                The mic is yours,{' '}
                <span className="text-[#8B3DFF] font-semibold">{displayName}</span>
              </h1>
            </div>

            <div className="w-full pt-2">
              <ChatInput />
            </div>
          </div>
        ) : (
          /* ACTIVE CONVERSATION */
          <div className="max-w-3xl w-full mx-auto space-y-6 pt-4 pb-40">
            <div className="space-y-6 text-left max-w-2xl mx-auto">
              {messages.map((msg, index) => (
                <MessageItem
                  key={msg.id}
                  message={msg}
                  isLastAssistantMessage={msg.sender === 'assistant' && index === messages.length - 1}
                />
              ))}

              {/* Typing indicator while waiting for AI response */}
              {isGenerating && messages[messages.length - 1]?.sender === 'user' && (
                <TypingIndicator />
              )}

              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Fixed Bottom Composer */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-30 ml-8 sm:ml-[37px]">
              <ChatInput />
            </div>
          </div>
        )}
      </div>

      {/* Scroll-to-Bottom Button */}
      <button
        onClick={() => scrollToBottom()}
        className={cn(
          'absolute bottom-28 right-6 z-40 w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center shadow-md hover:bg-slate-50 hover:text-slate-900 transition-all duration-200',
          showScrollBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        )}
        title="Scroll to latest"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
}
