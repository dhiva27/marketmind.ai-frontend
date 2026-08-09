'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useChat } from '@/hooks/useChat';
import { useAuthContext } from '@/context/AuthContext';
import {
  TrendingUp,
  SquarePen,
  Search,
  MessageSquare,
  Target,
  Sparkles,
  LayoutGrid,
  Settings,
  User as UserIcon,
  HelpCircle,
  LogOut,
  Pencil,
} from 'lucide-react';

export function Sidebar() {
  const router = useRouter();
  const { createNewChat, activeChatId } = useChat();
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

  // Priority username selection according to Section 16: username -> displayName -> email handle
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

  const navIcons = [
    { id: 'new', icon: SquarePen, label: 'New Chat', action: () => createNewChat(), active: !activeChatId },
    { id: 'search', icon: Search, label: 'Search', action: () => {}, active: false },
    { id: 'history', icon: MessageSquare, label: 'Chat History', action: () => {}, active: !!activeChatId },
    { id: 'strategy', icon: Target, label: 'Marketing Strategy', action: () => {}, active: false },
    { id: 'ai_tools', icon: Sparkles, label: 'AI Tools', action: () => {}, active: false },
    { id: 'workspace', icon: LayoutGrid, label: 'Workspace', action: () => {}, active: false },
  ];

  return (
    <aside className="w-16 sm:w-[74px] bg-[#0D0017]/95 border-r border-[#A855F7]/15 flex flex-col justify-between items-center py-5 select-none z-40 shrink-0 h-full fixed top-0 bottom-0 left-0 backdrop-blur-md">
      {/* Top Section: MarketMind AI Brand Icon & Navigation Items */}
      <div className="flex flex-col items-center space-y-7 pt-1 w-full">
        {/* MarketMind AI Brand Logo Icon (NO GEMINI LOGO) */}
        <Link
          href="/"
          title="MarketMind AI Home"
          className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] flex items-center justify-center text-white shadow-[0_0_15px_rgba(139,61,255,0.4)] hover:scale-105 transition-all"
        >
          <TrendingUp className="w-5 h-5 stroke-[2.5]" />
        </Link>

        {/* Navigation Outline Icons (Section 2) */}
        <div className="flex flex-col items-center space-y-4 w-full px-2">
          {navIcons.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                title={item.label}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  item.active
                    ? 'bg-[#8B3DFF]/30 text-white border border-[#A855F7]/30 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                    : 'text-[#B8AFC4] hover:text-white hover:bg-purple-900/30'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[1.75]" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Settings & User Profile Avatar */}
      <div className="flex flex-col items-center space-y-4 relative w-full px-2" ref={menuRef}>
        {/* Settings Icon */}
        <Link
          href="/settings"
          title="Settings"
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-[#B8AFC4] hover:text-white hover:bg-purple-900/30 transition-all duration-200 relative"
        >
          <Settings className="w-5 h-5 stroke-[1.75]" />
          <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-500 border border-[#0D0017]" />
        </Link>

        {/* Circular User Avatar Trigger with Status Indicator */}
        <button
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          title={displayName}
          className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden shadow-md hover:scale-105 transition-transform border border-white/20"
        >
          {user?.photoURL ? (
            <Image src={user.photoURL} alt={displayName} width={40} height={40} className="object-cover" />
          ) : (
            <span>{displayName.charAt(0).toUpperCase()}</span>
          )}
        </button>

        {/* Profile Floating Menu */}
        {profileMenuOpen && (
          <div className="absolute bottom-2 left-18 w-64 bg-[#17101F] rounded-2xl p-3.5 shadow-2xl border border-[#A855F7]/30 z-50 animate-fade-in-up space-y-3 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/30">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-white text-sm font-bold shrink-0 overflow-hidden">
                  {user?.photoURL ? (
                    <Image src={user.photoURL} alt={displayName} width={36} height={36} className="object-cover" />
                  ) : (
                    <span>{displayName.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm text-white truncate">{displayName}</div>
                  <div className="text-xs text-[#B8AFC4] truncate">{email}</div>
                </div>
              </div>
              <Link href="/profile" onClick={() => setProfileMenuOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-purple-900/40">
                <Pencil className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-1 text-sm font-semibold text-[#B8AFC4]">
              <Link
                href="/profile"
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-950/60 hover:text-white transition-colors"
              >
                <UserIcon className="w-4 h-4 text-[#A855F7]" />
                <span>My Profile</span>
              </Link>
              <Link
                href="/settings"
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-950/60 hover:text-white transition-colors"
              >
                <Settings className="w-4 h-4 text-[#A855F7]" />
                <span>Settings</span>
              </Link>
              <a
                href="#faq"
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-950/60 hover:text-white transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-[#A855F7]" />
                <span>Help & Support</span>
              </a>
            </div>

            <div className="pt-2 border-t border-purple-900/30">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-950/40 transition-colors text-left"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
