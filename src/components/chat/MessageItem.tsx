'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '@/types';
import { useAuthContext } from '@/context/AuthContext';
import { Copy, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageItemProps {
  message: Message;
  isLastAssistantMessage?: boolean;
}

export function MessageItem({ message }: MessageItemProps) {
  const { user } = useAuthContext();
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  // Dynamic user name from authenticated Firebase user
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 w-full select-none',
        isUser ? 'flex-row-reverse justify-start' : 'justify-start'
      )}
    >
      {/* Avatar */}
      <div className="shrink-0 mt-0.5">
        {isUser ? (
          <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold text-xs flex items-center justify-center overflow-hidden shadow-sm border border-purple-500/20">
            {user?.photoURL ? (
              <Image src={user.photoURL} alt={displayName} width={34} height={34} className="object-cover" />
            ) : (
              <span>{displayName.charAt(0).toUpperCase()}</span>
            )}
          </div>
        ) : (
          <div className="w-8.5 h-8.5 rounded-full bg-[#191020] border border-purple-500/30 overflow-hidden flex items-center justify-center shadow-sm">
            <Image
              src="/mascot.jpg"
              alt="MarketMind AI Mascot"
              width={34}
              height={34}
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Message Content Bubble */}
      <div className={cn('flex flex-col space-y-1', isUser ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'p-4 text-xs sm:text-sm leading-relaxed transition-all shadow-md',
            isUser
              ? 'bg-[#7C3AED] text-white border border-purple-400/30 rounded-2xl rounded-tr-xs max-w-md sm:max-w-lg font-medium'
              : 'bg-[#191020]/90 text-slate-100 border border-purple-500/20 rounded-2xl rounded-tl-xs max-w-xl sm:max-w-2xl space-y-2 backdrop-blur-xs'
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="space-y-2 text-slate-200">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  strong({ children }) {
                    return <strong className="font-bold text-white">{children}</strong>;
                  },
                  ul({ children }) {
                    return <ul className="list-disc list-inside space-y-1 my-1 text-slate-300">{children}</ul>;
                  },
                  ol({ children }) {
                    return <ol className="list-decimal list-inside space-y-1 my-1 text-slate-300">{children}</ol>;
                  },
                  p({ children }) {
                    return <p className="mb-1.5 last:mb-0 leading-relaxed">{children}</p>;
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>

              {message.isStreaming && (
                <span className="inline-block w-1.5 h-3.5 bg-purple-400 animate-pulse ml-1 align-middle rounded-xs" />
              )}

              {/* Action Toolbar below AI response */}
              {!isUser && !message.isStreaming && (
                <div className="flex items-center justify-between pt-2 border-t border-purple-900/30 text-slate-400 text-[11px]">
                  <span className="text-[10px] text-slate-500 font-medium">{message.timestamp}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-1 rounded-md hover:bg-purple-900/40 hover:text-white transition-colors"
                      title="Copy response"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => setLiked(liked === true ? null : true)}
                      className={cn(
                        'p-1 rounded-md hover:bg-purple-900/40 transition-colors',
                        liked === true ? 'text-purple-400' : 'hover:text-white'
                      )}
                      title="Good response"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setLiked(liked === false ? null : false)}
                      className={cn(
                        'p-1 rounded-md hover:bg-purple-900/40 transition-colors',
                        liked === false ? 'text-rose-400' : 'hover:text-white'
                      )}
                      title="Bad response"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Timestamp for User message */}
        {isUser && (
          <span className="text-[10px] text-slate-400 font-medium px-1">
            {message.timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
