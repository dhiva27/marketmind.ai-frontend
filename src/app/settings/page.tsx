'use client';

import React from 'react';
import Link from 'next/link';
import { SettingsForm } from '@/components/settings/SettingsForm';
import { ArrowLeft, Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400">
              <SettingsIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage theme, model defaults, and interaction preferences
              </p>
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

        <SettingsForm />
      </div>
    </div>
  );
}
