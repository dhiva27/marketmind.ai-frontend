'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useChat } from '@/hooks/useChat';
import { useAuthContext } from '@/context/AuthContext';
import {
  ToggleLeft,
  SquarePen,
  Search,
  TrendingUp,
  Package,
  LayoutGrid,
  Settings,
  User as UserIcon,
  HelpCircle,
  LogOut,
  Pencil,
} from 'lucide-react';

export function Sidebar() {
  const router = useRouter();
  const { createNewChat } = useChat();
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
    { icon: ToggleLeft, label: 'Mode Toggle', action: () => {} },
    { icon: SquarePen, label: 'New Chat', action: () => createNewChat() },
    { icon: Search, label: 'Search', action: () => {} },
    { icon: TrendingUp, label: 'Analytics', action: () => {} },
    { icon: Package, label: 'Projects', action: () => {} },
    { icon: LayoutGrid, label: 'Apps', action: () => {} },
  ];

  return (
    <aside className="w-14 sm:w-16 bg-[#0E031A] border-r border-purple-900/20 flex flex-col justify-between items-center py-5 select-none z-40 shrink-0 h-full">
      {/* Top Vertical Icon Stack (NO LOGO AT ALL AT TOP-LEFT) */}
      <div className="flex flex-col items-center space-y-6 pt-2">
        {/* Navigation Icon List */}
        <div className="flex flex-col items-center space-y-5">
          {navIcons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                title={item.label}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-purple-900/30 transition-all duration-200"
              >
                <Icon className="w-5 h-5 stroke-[1.75]" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Settings & User Avatar Stack */}
      <div className="flex flex-col items-center space-y-4 relative" ref={menuRef}>
        {/* Settings Icon with small blue indicator dot */}
        <Link
          href="/settings"
          title="Settings"
          className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-purple-900/30 transition-all duration-200"
        >
          <Settings className="w-5 h-5 stroke-[1.75]" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 border border-[#0E031A]" />
        </Link>

        {/* Circular User Avatar Trigger */}
        <button
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          title={displayName}
          className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden shadow-md hover:scale-105 transition-transform"
        >
          {user?.photoURL ? (
            <Image src={user.photoURL} alt={displayName} width={36} height={36} className="object-cover" />
          ) : (
            <span>{displayName.charAt(0).toUpperCase()}</span>
          )}
        </button>

        {/* User Profile Floating Menu */}
        {profileMenuOpen && (
          <div className="absolute bottom-2 left-16 w-64 bg-[#191020] rounded-2xl p-3.5 shadow-2xl border border-purple-500/30 z-50 animate-fade-in space-y-3 text-white">
            {/* Header Info */}
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
                  <div className="text-xs text-slate-400 truncate">{email}</div>
                </div>
              </div>
              <Link href="/profile" onClick={() => setProfileMenuOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-purple-900/40">
                <Pencil className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Links */}
            <div className="space-y-1 text-sm font-semibold text-slate-300">
              <Link
                href="/profile"
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-950/60 hover:text-white transition-colors"
              >
                <UserIcon className="w-4 h-4 text-purple-400" />
                <span>My Profile</span>
              </Link>
              <Link
                href="/settings"
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-950/60 hover:text-white transition-colors"
              >
                <Settings className="w-4 h-4 text-purple-400" />
                <span>Settings</span>
              </Link>
              <a
                href="#faq"
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-950/60 hover:text-white transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-purple-400" />
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
