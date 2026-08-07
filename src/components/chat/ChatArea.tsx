'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useChat } from '@/hooks/useChat';
import { useAuthContext } from '@/context/AuthContext';
import { MessageItem } from './MessageItem';
import { ChatInput } from './ChatInput';
import { Target, Users, FileText, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export function ChatArea() {
  const { messages, sendMessage } = useChat();
  const { user } = useAuthContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dynamic user name loaded automatically from authenticated Firebase user
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const suggestions = [
    {
      icon: Target,
      title: 'Marketing Strategy',
      desc: 'Create a complete marketing strategy for my SaaS startup.',
      prompt: 'Create a marketing strategy for my AI SaaS product',
    },
    {
      icon: Users,
      title: 'Competitor Analysis',
      desc: 'Analyze my competitors and find their strengths and weaknesses.',
      prompt: 'Analyze my competitors and find their strengths and weaknesses.',
    },
    {
      icon: FileText,
      title: 'Content Ideas',
      desc: 'Generate content ideas for my blog and AI marketing.',
      prompt: 'Generate content ideas for my blog and AI marketing.',
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      desc: 'Help me optimize my website for better search rankings.',
      prompt: 'Help me optimize my website for better search rankings.',
    },
  ];

  return (
    <div className="relative flex-1 flex flex-col h-full min-h-0 bg-white overflow-hidden select-none">
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Top 3D Mascot & Welcome Banner */}
          <div className="text-center pt-2 pb-4 space-y-3">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center"
            >
              <Image
                src="/mascot.jpg"
                alt="MarketMind AI Mascot"
                width={96}
                height={96}
                className="object-contain mix-blend-multiply drop-shadow-sm"
                priority
              />
            </motion.div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Hi, {displayName}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                How can I help you grow your business today?
              </p>
            </div>

            {/* 4 Clickable Suggestion Cards Grid (2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
              {suggestions.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => sendMessage(item.prompt)}
                    className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-purple-300 hover:shadow-md transition-all duration-200 flex items-start gap-3.5 group text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-[#7C3AED] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-950 group-hover:text-[#7C3AED] transition-colors duration-200">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-snug mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conversation Messages */}
          {messages.length > 0 && (
            <div className="space-y-5 pt-2">
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

      {/* Fixed Chat Input Composer at Bottom */}
      <div className="border-t border-slate-100 bg-white p-3">
        <ChatInput />
      </div>
    </div>
  );
}
