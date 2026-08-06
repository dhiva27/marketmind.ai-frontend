'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 text-center space-y-6">
      <div className="p-4 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/20">
        <Sparkles className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-6xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-700 dark:from-white dark:via-indigo-200 dark:to-slate-300 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Page Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          The requested page doesn&apos;t exist or has been moved.
        </p>
      </div>

      <Link href="/chat">
        <Button variant="primary" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Chat Workspace</span>
        </Button>
      </Link>
    </div>
  );
}
