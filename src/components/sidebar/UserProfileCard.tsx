'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Avatar } from '@/components/ui/avatar';
import { LogOut, Settings, User as UserIcon } from 'lucide-react';

export function UserProfileCard() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
        <Link href="/profile" className="flex items-center gap-2.5 min-w-0 flex-1 group">
          <Avatar name={user.displayName || user.email} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {user.displayName || 'MarketMind User'}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">{user.email}</p>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/settings"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </Link>
          <button
            onClick={() => logout()}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
