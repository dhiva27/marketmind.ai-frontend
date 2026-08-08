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

  // Dynamic user name from authenticated Firebase user
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate background star particles
  const starParticles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    top: `${(i * 17) % 95}%`,
    left: `${(i * 23) % 95}%`,
    size: `${(i % 3) + 1.5}px`,
    duration: `${3 + (i % 4)}s`,
    delay: `${(i % 5) * 0.6}s`,
  }));

  return (
    <div className="relative flex-1 flex flex-col h-full min-h-0 bg-[#12001F] overflow-hidden select-none">
      {/* Smooth Radial Purple Glow behind center area */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(109, 0, 255, 0.42) 0%, rgba(37, 0, 68, 0.28) 45%, rgba(18, 0, 31, 1) 75%)',
        }}
      />

      {/* Subtle Star Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
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

      {/* Center Main Canvas Area */}
      <div className="relative z-10 flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 custom-scrollbar flex flex-col justify-center">
        <div className="max-w-3xl w-full mx-auto space-y-7 my-auto">
          {/* Main Heading matching reference image */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              The mic is yours,{' '}
              <span className="text-[#A855F7] bg-gradient-to-r from-[#A855F7] to-purple-300 bg-clip-text text-transparent">
                {displayName}
              </span>
            </h1>
          </div>

          {/* Centered Chat Input Pill */}
          <div className="w-full">
            <ChatInput />
          </div>

          {/* Conversation Messages Stream (when active) */}
          {messages.length > 0 && (
            <div className="space-y-5 pt-6 text-left border-t border-purple-900/20 max-w-2xl mx-auto">
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
          )}
        </div>
      </div>
    </div>
  );
}
