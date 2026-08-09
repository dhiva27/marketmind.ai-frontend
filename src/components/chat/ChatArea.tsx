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

  // Dynamic username from authenticated user's account
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

  const hasMessages = messages.length > 0;

  return (
    <div className="relative flex-1 flex flex-col h-full min-h-0 bg-[#100019] overflow-hidden select-none">
      {/* Large Soft Radial Purple Glow with Breathing Pulse Animation */}
      <div
        className="absolute inset-0 pointer-events-none z-0 animate-pulse-glow"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 48%, rgba(139, 44, 255, 0.45) 0%, rgba(109, 0, 255, 0.38) 25%, rgba(53, 0, 107, 0.3) 48%, rgba(27, 0, 48, 0.2) 68%, rgba(16, 0, 25: 1) 85%)',
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

      {/* Main Canvas Area */}
      <div className="relative z-10 flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 custom-scrollbar flex flex-col justify-center">
        {!hasMessages ? (
          /* EMPTY CHATBOT STATE matching Second Reference Image */
          <div className="max-w-3xl w-full mx-auto space-y-8 my-auto text-center animate-fade-in-up">
            {/* Dynamic Heading */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#FFFFFF] tracking-normal leading-tight">
                The mic is yours,{' '}
                <span className="text-[#A855F7] font-medium">
                  {displayName}
                </span>
              </h1>
            </div>

            {/* Pill Chat Input */}
            <div className="w-full">
              <ChatInput />
            </div>
          </div>
        ) : (
          /* ACTIVE CONVERSATION VIEW */
          <div className="max-w-3xl w-full mx-auto space-y-6 my-auto pt-4">
            <div className="space-y-5 text-left max-w-2xl mx-auto">
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

            {/* Composer at Bottom of Active Conversation */}
            <div className="pt-4 border-t border-purple-900/30">
              <ChatInput />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
