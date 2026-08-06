'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/button';
import { Sparkles, MessageSquare, Shield, FileText, Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 max-w-5xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation Intelligent Assistant</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-700 dark:from-white dark:via-indigo-200 dark:to-slate-300 bg-clip-text text-transparent max-w-4xl leading-tight">
          Supercharge Market Insights & Analytics with AI
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          MarketMind AI offers real-time conversational intelligence, financial document synthesis, code generation, and automated workflows.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link href="/chat">
            <Button size="lg" variant="primary" className="gap-2 px-8 py-3.5 text-base shadow-xl shadow-indigo-600/25">
              <span>Start Chatting Now</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="px-8 py-3.5 text-base">
              Sign In to Account
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 w-full text-left">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Conversational Intel</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Context-aware assistant supporting continuous chat history, session renaming, and streaming responses.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Document Analysis</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Upload PDF, DOCX, TXT, CSV, PNG, and JPG files up to 20MB directly into conversations.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Code & Markdown</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Formatted code syntax highlighting, one-click copying, and clean markdown tables.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-400">
        © 2026 MarketMind AI. All rights reserved.
      </footer>
    </div>
  );
}
