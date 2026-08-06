'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Send } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-slate-900 dark:text-white text-lg tracking-tight">
              <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span>MarketMind.ai</span>
            </Link>
            <p className="max-w-xs text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your AI-powered marketing assistant for smarter growth. Research, plan, create, and optimize marketing campaigns faster than ever.
            </p>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#solutions" className="hover:text-slate-900 dark:hover:text-white transition-colors">Solutions</a></li>
              <li><Link href="/chat" className="hover:text-slate-900 dark:hover:text-white transition-colors">AI Studio</Link></li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="hover:text-slate-900 dark:hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#testimonials" className="hover:text-slate-900 dark:hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Newsletter</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Get the latest AI growth hacks directly in your inbox.
            </p>
            <div className="flex items-center gap-1.5 pt-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <button className="p-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shrink-0 hover:opacity-90 transition-opacity">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© 2026 MarketMind.ai Inc. All rights reserved.</div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
