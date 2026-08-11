'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Message } from '@/types';
import { useAuthContext } from '@/context/AuthContext';
import { Copy, Check, ThumbsUp, ThumbsDown, TrendingUp, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageItemProps {
  message: Message;
  isLastAssistantMessage?: boolean;
}

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3.5 w-full animate-fade-in-up">
      <div className="shrink-0 mt-0.5 w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] text-white flex items-center justify-center shadow-md">
        <TrendingUp className="w-5 h-5 stroke-[2.5]" />
      </div>
      <div className="px-5 py-3.5 bg-slate-100/80 border border-slate-200/80 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-[#8B3DFF] typing-dot"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export function MessageItem({ message }: MessageItemProps) {
  const { user } = useAuthContext();
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState<string | null>(null);
  const [liked, setLiked] = useState<boolean | null>(null);

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Dhivakar';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCodeCopied(code);
    setTimeout(() => setCodeCopied(null), 2000);
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3.5 w-full animate-fade-in-up',
        isUser ? 'flex-row-reverse justify-start' : 'justify-start'
      )}
    >
      {/* Avatar */}
      <div className="shrink-0 mt-0.5">
        {isUser ? (
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold text-xs flex items-center justify-center overflow-hidden shadow-xs border border-white">
            {user?.photoURL ? (
              <Image src={user.photoURL} alt={displayName} width={36} height={36} className="object-cover" />
            ) : (
              <span>{displayName.charAt(0).toUpperCase()}</span>
            )}
          </div>
        ) : (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] text-white flex items-center justify-center shadow-md">
            <TrendingUp className="w-5 h-5 stroke-[2.5]" />
          </div>
        )}
      </div>

      {/* Message Bubble */}
      <div className={cn('flex flex-col space-y-1 min-w-0', isUser ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'text-[15px] leading-relaxed transition-all shadow-xs',
            isUser
              ? 'px-5 py-3.5 bg-[#8B3DFF] text-white rounded-2xl rounded-tr-xs max-w-md sm:max-w-lg font-medium'
              : 'px-5 py-4 bg-[#F8F6FF] text-slate-900 border border-purple-100 rounded-2xl rounded-tl-xs max-w-xl sm:max-w-2xl'
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="space-y-2 prose-mm">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1({ children }) {
                    return <h1 className="text-xl font-bold text-slate-900 mt-4 mb-2 border-b border-slate-200 pb-1.5">{children}</h1>;
                  },
                  h2({ children }) {
                    return <h2 className="text-[17px] font-bold text-slate-900 mt-3 mb-1.5">{children}</h2>;
                  },
                  h3({ children }) {
                    return <h3 className="text-[15px] font-semibold text-purple-700 mt-2.5 mb-1">{children}</h3>;
                  },
                  p({ children }) {
                    return <p className="mb-2.5 last:mb-0 leading-[1.75] text-slate-800">{children}</p>;
                  },
                  ul({ children }) {
                    return <ul className="list-none space-y-1.5 my-2 pl-1">{children}</ul>;
                  },
                  ol({ children }) {
                    return <ol className="list-none space-y-1.5 my-2 pl-1">{children}</ol>;
                  },
                  li({ children }) {
                    return (
                      <li className="flex items-start gap-2 text-slate-800">
                        <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#8B3DFF] shrink-0" />
                        <span>{children}</span>
                      </li>
                    );
                  },
                  strong({ children }) {
                    return <strong className="font-bold text-slate-900">{children}</strong>;
                  },
                  em({ children }) {
                    return <em className="italic text-purple-800">{children}</em>;
                  },
                  // @ts-expect-error – react-markdown passes inline prop
                  code({ inline, className, children, ...props }) {
                    const codeString = String(children).replace(/\n$/, '');
                    if (inline) {
                      return (
                        <code className="px-1.5 py-0.5 rounded-md bg-purple-50 border border-purple-200 text-purple-800 text-[13px] font-mono" {...props}>
                          {codeString}
                        </code>
                      );
                    }
                    const isCopied = codeCopied === codeString;
                    return (
                      <div className="relative group my-3 rounded-xl overflow-hidden border border-slate-300">
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200">
                          <div className="flex items-center gap-1.5 text-xs text-slate-600">
                            <Code2 className="w-3.5 h-3.5" />
                            <span>{className?.replace('language-', '') || 'code'}</span>
                          </div>
                          <button
                            onClick={() => handleCopyCode(codeString)}
                            className="text-[10px] text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1"
                          >
                            {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            {isCopied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="overflow-x-auto p-4 bg-slate-900 text-slate-100 text-[13px] font-mono leading-relaxed custom-scrollbar">
                          <code className={className} {...props}>
                            {codeString}
                          </code>
                        </pre>
                      </div>
                    );
                  },
                  blockquote({ children }) {
                    return (
                      <blockquote className="border-l-3 border-[#8B3DFF] pl-4 my-3 text-slate-600 italic">
                        {children}
                      </blockquote>
                    );
                  },
                  table({ children }) {
                    return (
                      <div className="overflow-x-auto my-3 rounded-xl border border-slate-200 custom-scrollbar">
                        <table className="min-w-full text-sm">{children}</table>
                      </div>
                    );
                  },
                  thead({ children }) {
                    return <thead className="bg-purple-50 text-purple-900 text-xs uppercase tracking-wide">{children}</thead>;
                  },
                  tbody({ children }) {
                    return <tbody className="divide-y divide-slate-200">{children}</tbody>;
                  },
                  tr({ children }) {
                    return <tr className="hover:bg-slate-50 transition-colors">{children}</tr>;
                  },
                  th({ children }) {
                    return <th className="px-4 py-2.5 text-left font-semibold">{children}</th>;
                  },
                  td({ children }) {
                    return <td className="px-4 py-2.5 text-slate-800">{children}</td>;
                  },
                  hr() {
                    return <hr className="my-4 border-slate-200" />;
                  },
                  a({ href, children }) {
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8B3DFF] underline underline-offset-2 hover:text-purple-700 transition-colors"
                      >
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>

              {message.isStreaming && (
                <span className="inline-block w-[3px] h-[18px] bg-[#8B3DFF] animate-pulse ml-0.5 align-middle rounded-xs" />
              )}

              {!message.isStreaming && (
                <div className="flex items-center justify-between pt-3 mt-2 border-t border-purple-200/60 text-slate-400">
                  <span className="text-[11px]">{message.timestamp}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleCopy}
                      className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors"
                      title="Copy response"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => setLiked(liked === true ? null : true)}
                      className={cn(
                        'p-1.5 rounded-lg hover:bg-slate-200 transition-colors',
                        liked === true ? 'text-[#8B3DFF]' : 'hover:text-slate-800'
                      )}
                      title="Good response"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setLiked(liked === false ? null : false)}
                      className={cn(
                        'p-1.5 rounded-lg hover:bg-slate-200 transition-colors',
                        liked === false ? 'text-rose-500' : 'hover:text-slate-800'
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

        {isUser && (
          <span className="text-[11px] text-slate-400 px-1">{message.timestamp}</span>
        )}
      </div>
    </div>
  );
}
