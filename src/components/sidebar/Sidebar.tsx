'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  User as UserIcon,
  HelpCircle,
  LogOut,
  Pencil,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen, chats, activeChatId, setActiveChatId, createNewChat } = useChat();
  const { user, logout } = useAuthContext();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Dynamic authenticated user info
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const email = user?.email || 'user@marketmind.ai';

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch {
      // Fallback
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* WHITE LEFT SIDEBAR WITH BLACK TEXT AND ICONS */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 lg:w-[260px] bg-white text-slate-900 p-4 flex flex-col justify-between select-none transition-all duration-200 ease-out border-r border-slate-200/80',
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

          {/* New Chat Button - Subtle light-purple background with BLACK text */}
          <button
            onClick={() => {
              createNewChat();
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-purple-100/80 border border-purple-100 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
          >
            <Plus className="w-4 h-4 text-purple-700 stroke-[2.5]" />
            <span>New Chat</span>
          </button>

          {/* Navigation Links - BLACK Text & Icons */}
          <div className="space-y-0.5 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 transition-all duration-200"
                >
                  <Icon className="w-4 h-4 text-slate-700 shrink-0 stroke-[1.75]" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Recent Chats Section */}
          <div className="flex-1 overflow-y-auto min-h-0 pt-2 custom-scrollbar">
            <div className="flex items-center justify-between px-3 pb-2 text-xs font-bold">
              <span className="text-slate-950">Recent Chats</span>
              <button className="text-[#7C3AED] hover:underline text-xs font-semibold">View all</button>
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
                      'w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs sm:text-sm transition-all duration-200 group',
                      isActive
                        ? 'bg-purple-50 text-slate-950 font-bold border border-purple-100/80'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{chat.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-2">{chat.time}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom User Profile Card & Interactive Popup Menu */}
          <div className="pt-3 border-t border-slate-200/80 relative" ref={menuRef}>
            {/* User Profile Trigger Button */}
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/80 transition-all duration-200 group text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white text-xs sm:text-sm font-bold shrink-0 overflow-hidden shadow-xs">
                  {user?.photoURL ? (
                    <Image src={user.photoURL} alt={displayName} width={34} height={34} className="object-cover" />
                  ) : (
                    <span>{displayName.charAt(0).toUpperCase()}</span>
                  )}
                  <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs sm:text-sm text-slate-950 truncate">{displayName}</div>
                  <div className="text-xs text-[#7C3AED] font-semibold">Pro Plan</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-950 transition-colors" />
            </button>

            {/* Profile Floating Popup Menu */}
            {profileMenuOpen && (
              <div className="absolute bottom-14 left-0 w-64 bg-white rounded-2xl p-3.5 shadow-2xl border border-slate-200/90 z-50 animate-fade-in space-y-3">
                {/* Header User Info */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative w-9.5 h-9.5 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0 overflow-hidden">
                      {user?.photoURL ? (
                        <Image src={user.photoURL} alt={displayName} width={38} height={38} className="object-cover" />
                      ) : (
                        <span>{displayName.charAt(0).toUpperCase()}</span>
                      )}
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-slate-950 truncate">{displayName}</div>
                      <div className="text-xs text-slate-400 truncate">{email}</div>
                    </div>
                  </div>
                  <Link href="/profile" onClick={() => setProfileMenuOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100">
                    <Pencil className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Menu Items */}
                <div className="space-y-1 text-sm font-semibold text-slate-700">
                  <Link
                    href="/profile"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100/80 hover:text-slate-950 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-slate-500" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100/80 hover:text-slate-950 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-500" />
                    <span>Settings</span>
                  </Link>
                  <a
                    href="#faq"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100/80 hover:text-slate-950 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-slate-500" />
                    <span>Help & Support</span>
                  </a>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
