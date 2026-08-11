'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Search, MessageSquare, ArrowRight } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function SearchPage() {
  const { sidebarExpanded, chats, setActiveChatId } = useChat();
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = chats.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    (c.lastMessageSnippet && c.lastMessageSnippet.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="h-screen flex overflow-hidden bg-white text-slate-900 relative">
      <Sidebar />
      <div
        className={cn(
          'flex-1 flex flex-col min-w-0 h-full overflow-y-auto p-6 sm:p-10 transition-all duration-300 custom-scrollbar',
          sidebarExpanded ? 'pl-64 sm:pl-72' : 'pl-16 sm:pl-[74px]'
        )}
      >
        <div className="max-w-3xl mx-auto w-full space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Search Conversations</h1>
            <p className="text-slate-500 mt-1">Find past marketing strategies, research, and ad copy.</p>
          </div>

          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chat titles or message content..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#8B3DFF] shadow-xs text-base"
              autoFocus
            />
          </div>

          <div className="space-y-2 pt-2">
            {filtered.length > 0 ? (
              filtered.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => {
                    setActiveChatId(chat.id);
                    router.push('/chat');
                  }}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#8B3DFF] flex items-center justify-center shrink-0 mt-0.5">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 text-sm truncate">{chat.title}</h3>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{chat.lastMessageSnippet || 'No preview available'}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#8B3DFF] group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <Search className="w-8 h-8 mx-auto opacity-50" />
                <p className="text-sm">No conversations found matching &quot;{query}&quot;</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
