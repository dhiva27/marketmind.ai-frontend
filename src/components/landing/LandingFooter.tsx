'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Send } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="bg-white border-t border-slate-200/80 text-slate-500 text-xs sm:text-sm py-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-2.5">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-slate-950 text-base tracking-tight group">
              <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-200">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span>MarketMind AI</span>
            </Link>
            <p className="max-w-xs text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Your AI-powered marketing assistant for smarter research, planning, and growth.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 text-xs sm:text-sm">Product</h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li><a href="#features" className="hover:text-slate-950 transition-colors duration-200">Features</a></li>
              <li><a href="#pricing" className="hover:text-slate-950 transition-colors duration-200">Pricing</a></li>
              <li><a href="#solutions" className="hover:text-slate-950 transition-colors duration-200">Integrations</a></li>
              <li><Link href="/chat" className="hover:text-slate-950 transition-colors duration-200">Updates</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 text-xs sm:text-sm">Resources</h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li><a href="#how-it-works" className="hover:text-slate-950 transition-colors duration-200">Blog</a></li>
              <li><a href="#testimonials" className="hover:text-slate-950 transition-colors duration-200">Guides</a></li>
              <li><a href="#faq" className="hover:text-slate-950 transition-colors duration-200">Templates</a></li>
              <li><a href="#" className="hover:text-slate-950 transition-colors duration-200">Help Center</a></li>
            </ul>
          </div>

          {/* Company & Newsletter */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 text-xs sm:text-sm">Newsletter</h4>
            <p className="text-xs text-slate-500 font-normal">
              Get the latest marketing tips and AI updates in your inbox.
            </p>
            <div className="flex items-center gap-1.5 pt-0.5">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-purple-600 transition-colors duration-200"
              />
              <button className="p-2 rounded-lg bg-slate-950 text-white shrink-0 hover:bg-slate-800 transition-colors duration-200">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
          <div>© 2026 MarketMind AI. All rights reserved.</div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-slate-700 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-slate-700 transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
