'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthContext } from '@/context/AuthContext';
import { ArrowLeft, User as UserIcon, Mail, Calendar, Save, Check, Crown, Pencil } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuthContext();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [saved, setSaved] = useState(false);

  // Dynamic user details from Firebase
  const email = user?.email || 'user@marketmind.ai';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-10 font-sans selection:bg-purple-600 selection:text-white">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-800 hover:bg-slate-100 border border-slate-200/80 transition-all shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Chat</span>
          </Link>
          <div className="text-xs font-bold text-slate-500">MarketMind AI Profile</div>
        </div>

        {/* Profile Card Header */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-100 text-center sm:text-left">
            <div className="relative w-20 h-20 shrink-0">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden shadow-md">
                {user?.photoURL ? (
                  <Image src={user.photoURL} alt={displayName || 'User'} width={80} height={80} className="object-cover" />
                ) : (
                  <span>{(displayName || email).charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="absolute bottom-0 right-0 p-1 rounded-full bg-slate-950 text-white shadow-xs">
                <Pencil className="w-3 h-3" />
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-950">{displayName || email.split('@')[0]}</h2>
              <p className="text-xs text-slate-500 font-medium">{email}</p>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-[#7C3AED] text-[11px] font-bold border border-purple-100 mt-1">
                <Crown className="w-3 h-3 text-purple-600" />
                <span>Pro Plan Account</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                Display Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                Firebase Authenticated Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 font-medium cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                Account Status
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value="Active (Pro Plan)"
                  disabled
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 font-medium cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-[1.01]"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
              {saved && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-fade-in">
                  <Check className="w-4 h-4" /> Profile updated successfully!
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
