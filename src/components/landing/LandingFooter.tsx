'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Send } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="bg-[#F8FAFC] border-t border-slate-200/60 text-slate-500 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-slate-950 text-base tracking-tight">
              <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <span>MarketMind AI</span>
            </Link>
            <p className="max-w-xs text-[11px] text-slate-500 leading-relaxed">
              Your AI-powered marketing assistant for smarter growth.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-950 text-xs">Product</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><a href="#features" className="hover:text-slate-950 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-slate-950 transition-colors">Pricing</a></li>
              <li><a href="#solutions" className="hover:text-slate-950 transition-colors">Integrations</a></li>
              <li><Link href="/chat" className="hover:text-slate-950 transition-colors">Updates</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-950 text-xs">Resources</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><a href="#how-it-works" className="hover:text-slate-950 transition-colors">Blog</a></li>
              <li><a href="#testimonials" className="hover:text-slate-950 transition-colors">Guides</a></li>
              <li><a href="#faq" className="hover:text-slate-950 transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-slate-950 transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Company & Newsletter */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-950 text-xs">Newsletter</h4>
            <p className="text-[11px] text-slate-500">
              Get the latest marketing tips and AI updates in your inbox.
            </p>
            <div className="flex items-center gap-1.5 pt-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-purple-600"
              />
              <button className="p-1.5 rounded-lg bg-slate-950 text-white shrink-0 hover:bg-slate-800 transition-colors">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>© 2026 MarketMind AI. All rights reserved.</div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-slate-700">Privacy Policy</a>
            <a href="#" className="hover:text-slate-700">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
