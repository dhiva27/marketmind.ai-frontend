'use client';

import React from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { useAuthContext } from '@/context/AuthContext';
import { useChat } from '@/hooks/useChat';
import { User as UserIcon, Mail, Shield, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { user } = useAuthContext();
  const { sidebarExpanded } = useChat();

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Dhivakar';
  const email = user?.email || 'dhivakar@marketmind.ai';

  return (
    <div className="h-screen flex overflow-hidden bg-white text-slate-900 relative">
      <Sidebar />
      <div
        className={cn(
          'flex-1 flex flex-col min-w-0 h-full overflow-y-auto p-6 sm:p-10 transition-all duration-300 custom-scrollbar',
          sidebarExpanded ? 'pl-64 sm:pl-72' : 'pl-16 sm:pl-[74px]'
        )}
      >
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">User Profile</h1>
            <p className="text-slate-500 mt-1">Manage your account information and preferences.</p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-xs">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold text-2xl flex items-center justify-center shadow-md">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{displayName}</h2>
                <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-purple-50 text-[#8B3DFF] text-xs font-semibold">
                  Free Plan
                </span>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex items-center gap-2.5 text-slate-600">
                  <UserIcon className="w-4 h-4 text-slate-400" />
                  <span>Display Name</span>
                </div>
                <span className="font-semibold text-slate-900">{displayName}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>Email Address</span>
                </div>
                <span className="font-semibold text-slate-900">{email}</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span>Account Status</span>
                </div>
                <span className="font-semibold text-emerald-600">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
