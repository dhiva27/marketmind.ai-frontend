'use client';

import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '@/types';
import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { CodeBlock } from './CodeBlock';
import { CopyButton } from './CopyButton';
import { RegenerateButton } from './RegenerateButton';
import { FilePreview } from './FilePreview';
import { cn } from '@/lib/utils';

interface MessageItemProps {
  message: Message;
  isLastAssistantMessage?: boolean;
}

export function MessageItem({ message, isLastAssistantMessage }: MessageItemProps) {
  const { user } = useAuth();
  const isUser = message.sender === 'user';

  return (
    <div
      className={cn(
        'group flex gap-4 px-4 py-6 transition-colors',
        isUser
          ? 'bg-transparent'
          : 'bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/40 dark:border-slate-800/40'
      )}
    >
      <div className="flex-shrink-0">
        {isUser ? (
          <Avatar name={user?.displayName || 'User'} size="md" />
        ) : (
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center shadow-xs">
            <Image
              src="/mascot.jpg"
              alt="MarketMind AI Mascot"
              width={36}
              height={36}
              className="object-contain mix-blend-multiply"
            />
          </div>
        )}
      </div>

      <div className="flex-1 space-y-2 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {isUser ? user?.displayName || 'You' : 'MarketMind AI'}
            </span>
            <span className="text-[10px] text-slate-400">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <CopyButton content={message.content} />
            {!isUser && isLastAssistantMessage && <RegenerateButton />}
          </div>
        </div>

        {/* File Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <FilePreview attachments={message.attachments} readOnly />
        )}

        {/* Content Body */}
        <div className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 space-y-3 font-normal overflow-hidden">
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const codeString = String(children).replace(/\n$/, '');

                  return match ? (
                    <CodeBlock language={match[1]} code={codeString} />
                  ) : (
                    <code
                      className="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 font-mono text-xs font-medium text-indigo-600 dark:text-indigo-300"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                ul({ children }) {
                  return <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>;
                },
                h1({ children }) {
                  return <h1 className="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">{children}</h1>;
                },
                h2({ children }) {
                  return <h2 className="text-base font-bold text-slate-900 dark:text-white mt-3 mb-1.5">{children}</h2>;
                },
                h3({ children }) {
                  return <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 mb-1">{children}</h3>;
                },
                p({ children }) {
                  return <p className="mb-2 last:mb-0">{children}</p>;
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}

          {message.isStreaming && (
            <span className="inline-block w-2 h-4 bg-indigo-500 animate-pulse ml-1 align-middle rounded-xs" />
          )}
        </div>
      </div>
    </div>
  );
}
