'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, User as UserIcon, Mail, Calendar, Save, Check } from 'lucide-react';
import { formatDate } from '@/utils/formatters';

export default function ProfilePage() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-600/10 text-violet-600 dark:text-violet-400">
              <UserIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Profile</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage your personal account details</p>
            </div>
          </div>

          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Chat</span>
          </Link>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <Avatar name={user?.displayName || 'User'} size="lg" />
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{user?.displayName || 'User'}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Display Name
              </label>
              <Input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                icon={<UserIcon className="w-4 h-4" />}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <Input
                type="email"
                value={user?.email || ''}
                icon={<Mail className="w-4 h-4" />}
                disabled
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Member Since
              </label>
              <Input
                type="text"
                value={user ? formatDate(user.createdAt) : ''}
                icon={<Calendar className="w-4 h-4" />}
                disabled
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" variant="primary" className="gap-2">
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </Button>
              {saved && (
                <span className="text-xs font-medium text-emerald-500 flex items-center gap-1 animate-fade-in">
                  <Check className="w-4 h-4" /> Profile updated!
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
