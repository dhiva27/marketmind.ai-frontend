'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useChat } from '@/hooks/useChat';
import { useAuthContext } from '@/context/AuthContext';
import {
  TrendingUp,
  Plus,
  LayoutDashboard,
  Target,
  Users,
  PenTool,
  Search,
  Megaphone,
  BarChart3,
  Settings,
  MessageSquare,
  ChevronRight,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen, chats, activeChatId, setActiveChatId, createNewChat } = useChat();
  const { user } = useAuthContext();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '#', active: false },
    { name: 'AI Strategy', icon: Target, href: '#', active: false },
    { name: 'Competitors', icon: Users, href: '#', active: false },
    { name: 'Content Studio', icon: PenTool, href: '#', active: false },
    { name: 'SEO Assistant', icon: Search, href: '#', active: false },
    { name: 'Ad Generator', icon: Megaphone, href: '#', active: false },
    { name: 'Analytics', icon: BarChart3, href: '#', active: false },
    { name: 'Settings', icon: Settings, href: '/settings', active: false },
  ];

  const recentChatsList = [
    { id: 'chat_1', title: 'Marketing strategy for...', time: '2m ago' },
    { id: 'chat_2', title: 'Best SEO keywords...', time: '1h ago' },
    { id: 'chat_3', title: 'Competitor analysis...', time: '3h ago' },
    { id: 'chat_4', title: 'Ad copy for SaaS...', time: '1d ago' },
    { id: 'chat_5', title: 'Content ideas for blog...', time: '2d ago' },
  ];

  // Dynamic user name from Firebase Auth
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 lg:w-[260px] bg-white text-slate-900 p-4 flex flex-col justify-between select-none transition-all duration-300 ease-in-out border-r border-slate-200/80',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-[260px]'
        )}
      >
        <div className="flex flex-col h-full min-h-0 space-y-4">
          {/* Top Brand Header */}
          <div className="flex items-center justify-between pt-1 px-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-white shadow-xs">
                <TrendingUp className="w-4.5 h-4.5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-950">
                MarketMind AI
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-950 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => {
              createNewChat();
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Chat</span>
          </button>

          {/* Navigation Links */}
          <div className="space-y-0.5 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 transition-colors"
                >
                  <Icon className="w-4 h-4 text-slate-600 shrink-0 stroke-[1.75]" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Recent Chats Section */}
          <div className="flex-1 overflow-y-auto min-h-0 pt-2 custom-scrollbar">
            <div className="flex items-center justify-between px-3 pb-2 text-xs font-bold">
              <span className="text-slate-950">Recent Chats</span>
              <button className="text-[#7C3AED] hover:underline text-[11px] font-semibold">View all</button>
            </div>

            <div className="space-y-1">
              {recentChatsList.map((chat) => {
                const isActive = activeChatId === chat.id;
                return (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setActiveChatId(chat.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors group',
                      isActive
                        ? 'bg-purple-50 text-slate-950 font-bold border border-purple-100/80'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate text-xs">{chat.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-2">{chat.time}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom User Profile */}
          <div className="pt-3 border-t border-slate-200/80">
            <Link
              href="/profile"
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/80 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden shadow-xs">
                  {user?.photoURL ? (
                    <Image src={user.photoURL} alt={displayName} width={32} height={32} className="object-cover" />
                  ) : (
                    <span>{displayName.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs text-slate-950 truncate">{displayName}</div>
                  <div className="text-[11px] text-[#7C3AED] font-semibold">Pro Plan</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-950 transition-colors" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
