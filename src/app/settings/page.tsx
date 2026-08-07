'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import {
  ArrowLeft,
  Pencil,
  Sparkles,
  Cpu,
  Zap,
  Globe,
  Crown,
  Mail,
  ShieldCheck,
  Sun,
  Palette,
  Sliders,
  Bell,
  Mic,
  Shield,
  Key,
  Smartphone,
  HardDrive,
  Database,
  Bug,
  Info,
  LogOut,
  ChevronRight,
  Check,
} from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuthContext();
  const [accentColor, setAccentColor] = useState('purple');
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  // Source of truth from Firebase Auth
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
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-10 font-sans selection:bg-purple-600 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-800 hover:bg-slate-100 border border-slate-200/80 transition-all shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Chat</span>
          </Link>
          <div className="text-xs font-bold text-slate-500">MarketMind AI Account Settings</div>
        </div>

        {/* Profile Card Header (Top Center) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm text-center relative overflow-hidden space-y-4">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold overflow-hidden shadow-md">
              {user?.photoURL ? (
                <Image src={user.photoURL} alt={displayName} width={96} height={96} className="object-cover" />
              ) : (
                <span>{displayName.charAt(0).toUpperCase()}</span>
              )}
            </div>
            {/* Edit overlay icon */}
            <Link
              href="/profile"
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-slate-950 text-white hover:bg-purple-600 transition-colors shadow-md"
              title="Edit Profile"
            >
              <Pencil className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              {displayName}
            </h1>
            <p className="text-xs text-slate-500 font-medium">{email}</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-50 text-[#7C3AED] text-xs font-bold border border-purple-100 mt-1">
              <Crown className="w-3 h-3 text-purple-600" />
              <span>Pro Plan Active</span>
            </div>
          </div>
        </div>

        {/* Categorized Settings Grid */}
        <div className="space-y-6">
          {/* SECTION 1: My MarketMind AI */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              My MarketMind AI
            </h3>
            <div className="divide-y divide-slate-100">
              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4.5 h-4.5 text-purple-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Personalization</div>
                    <div className="text-[11px] text-slate-500">Custom marketing instructions & persona settings</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Cpu className="w-4.5 h-4.5 text-indigo-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Memory</div>
                    <div className="text-[11px] text-slate-500">AI context retention across chat sessions</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Zap className="w-4.5 h-4.5 text-amber-500" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Plugins</div>
                    <div className="text-[11px] text-slate-500">Connected SEO tools & analytics APIs</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* SECTION 2: Account */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Account
            </h3>
            <div className="divide-y divide-slate-100">
              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Globe className="w-4.5 h-4.5 text-blue-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Workspace</div>
                    <div className="text-[11px] text-slate-500">Personal Growth Workspace</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-500">Default</span>
              </div>

              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Crown className="w-4.5 h-4.5 text-purple-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Upgrade Plan</div>
                    <div className="text-[11px] text-slate-500">Manage billing & subscription tier</div>
                  </div>
                </div>
                <button className="px-3 py-1 rounded-xl bg-[#7C3AED] text-white font-bold text-[11px] hover:bg-[#6D28D9] transition-colors">
                  Pro Plan
                </button>
              </div>

              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Mail className="w-4.5 h-4.5 text-slate-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Email</div>
                    <div className="text-[11px] text-slate-500">Authenticated Firebase Email</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-900">{email}</span>
              </div>

              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Age Verification</div>
                    <div className="text-[11px] text-slate-500">Identity & age verification status</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 3: Appearance */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Appearance
            </h3>
            <div className="divide-y divide-slate-100">
              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Sun className="w-4.5 h-4.5 text-amber-500" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Appearance</div>
                    <div className="text-[11px] text-slate-500">System theme preference</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-900">Light Mode</span>
              </div>

              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Palette className="w-4.5 h-4.5 text-purple-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Accent Color</div>
                    <div className="text-[11px] text-slate-500">Brand accent color theme</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-[#7C3AED] ring-2 ring-purple-600 ring-offset-1" />
                  <span className="text-xs font-bold text-slate-900">Purple</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: General */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              General
            </h3>
            <div className="divide-y divide-slate-100">
              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Sliders className="w-4.5 h-4.5 text-slate-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">General</div>
                    <div className="text-[11px] text-slate-500">Language, Region & Date Formatting</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-500">English (US)</span>
              </div>

              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Bell className="w-4.5 h-4.5 text-indigo-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Notifications</div>
                    <div className="text-[11px] text-slate-500">Marketing reports & AI email digests</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-600 cursor-pointer"
                />
              </div>

              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Mic className="w-4.5 h-4.5 text-purple-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Voice</div>
                    <div className="text-[11px] text-slate-500">Voice input & speech synthesis</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-500">Disabled</span>
              </div>

              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="w-4.5 h-4.5 text-emerald-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Safety</div>
                    <div className="text-[11px] text-slate-500">AI output content filtering</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-600">Standard</span>
              </div>

              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Key className="w-4.5 h-4.5 text-blue-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Security and Login</div>
                    <div className="text-[11px] text-slate-500">Firebase Auth Provider & password reset</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4.5 h-4.5 text-slate-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Remote Control</div>
                    <div className="text-[11px] text-slate-500">Active browser sessions</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-500">1 Active</span>
              </div>

              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <HardDrive className="w-4.5 h-4.5 text-slate-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Storage</div>
                    <div className="text-[11px] text-slate-500">Chat history & uploaded files</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-500">1.2 MB used</span>
              </div>

              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Database className="w-4.5 h-4.5 text-indigo-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Data Controls</div>
                    <div className="text-[11px] text-slate-500">Export chat data & memory controls</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Bug className="w-4.5 h-4.5 text-[#7C3AED]" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Report Bug</div>
                    <div className="text-[11px] text-slate-500">Submit feedback to MarketMind AI developers</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Info className="w-4.5 h-4.5 text-slate-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">About</div>
                    <div className="text-[11px] text-slate-500">MarketMind AI Version 2.4.0 (Build 2026)</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-400">v2.4.0</span>
              </div>
            </div>
          </div>

          {/* BOTTOM LOG OUT BUTTON */}
          <div className="pt-2">
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 text-xs font-extrabold flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out of Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
