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

  // Generate background star particles matching reference image
  const starParticles = Array.from({ length: 45 }).map((_, i) => ({
    id: i,
    top: `${(i * 13) % 96}%`,
    left: `${(i * 29) % 96}%`,
    size: `${(i % 3) * 0.8 + 1.2}px`,
    duration: `${2.5 + (i % 4) * 0.8}s`,
    delay: `${(i % 6) * 0.4}s`,
  }));

  const hasMessages = messages.length > 0;

  return (
    <div className="relative flex-1 flex flex-col h-full min-h-0 bg-[#12001F] overflow-hidden select-none">
      {/* Exact Elliptical Radial Purple Glow behind center chatbot area */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 68% 48% at 50% 50%, rgba(109, 0, 255, 0.48) 0%, rgba(37, 0, 68, 0.32) 42%, rgba(18, 0, 31, 1) 78%)',
        }}
      />

      {/* Subtle Small Purple/White Star Particles */}
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

      {/* Center Main Canvas Area */}
      <div className="relative z-10 flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 custom-scrollbar flex flex-col justify-center">
        <div className="max-w-3xl w-full mx-auto space-y-8 my-auto">
          {/* Main Heading matching reference typography */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-normal leading-tight">
              The mic is yours,{' '}
              <span className="text-[#A855F7] font-normal">
                {displayName}
              </span>
            </h1>
          </div>

          {/* Centered Pill Input Bar */}
          <div className="w-full">
            <ChatInput />
          </div>

          {/* Conversation Messages Stream */}
          {hasMessages && (
            <div className="space-y-5 pt-6 text-left border-t border-purple-900/30 max-w-2xl mx-auto">
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
