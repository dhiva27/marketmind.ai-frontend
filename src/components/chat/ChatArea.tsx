'use client';

import React, { useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { useAuthContext } from '@/context/AuthContext';
import { MessageItem } from './MessageItem';
import { ChatInput } from './ChatInput';

export function ChatArea() {
  const { messages } = useChat();
  const { user } = useAuthContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Priority username selection according to Section 16: username -> displayName -> email handle
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Sparse, tiny, elegant star particles (Section 1 & 6)
  const starParticles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    top: `${(i * 19) % 94}%`,
    left: `${(i * 29) % 94}%`,
    size: `${(i % 3) * 0.7 + 1.2}px`,
    duration: `${6.5 + (i % 5) * 1.2}s`,
    delay: `${(i % 4) * 0.7}s`,
  }));

  const hasMessages = messages.length > 0;

  return (
    <div className="relative flex-1 flex flex-col h-full min-h-0 bg-[#100018] overflow-hidden select-none pl-16 sm:pl-[74px]">
      {/* Soft Radial Purple Glow behind central input area with Breathing Pulse Animation (Section 1 & 6) */}
      <div
        className="absolute inset-0 pointer-events-none z-0 animate-pulse-glow"
        style={{
          background:
            'radial-gradient(ellipse 72% 52% at 50% 48%, rgba(139, 44, 255, 0.45) 0%, rgba(109, 0, 255, 0.38) 25%, rgba(53, 0, 107, 0.28) 48%, rgba(27, 0, 48, 0.18) 68%, rgba(16, 0, 24, 1) 85%)',
        }}
      />

      {/* Subtle Tiny Star Particles */}
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

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 custom-scrollbar flex flex-col">
        {!hasMessages ? (
          /* EMPTY CHATBOT HERO STATE matching Second Reference Image (Section 4 & 7) */
          <div className="max-w-3xl w-full mx-auto space-y-8 my-auto text-center animate-fade-in-up py-10">
            {/* Dynamic Heading */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-medium text-[#FFFFFF] tracking-normal leading-tight">
                The mic is yours,{' '}
                <span className="text-[#A855F7] font-medium">
                  {displayName}
                </span>
              </h1>
            </div>

            {/* Pill Chat Input Box (Section 5) */}
            <div className="w-full">
              <ChatInput />
            </div>
          </div>
        ) : (
          /* ACTIVE CONVERSATION STATE (Section 7, 8 & 9) */
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

            {/* Fixed Sticky Bottom Composer (Section 9) */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-30 ml-8 sm:ml-[37px]">
              <ChatInput />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
