'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  TrendingUp,
  LayoutDashboard,
  Target,
  Users,
  PenTool,
  Search,
  Megaphone,
  BarChart3,
  Settings,
  Plus,
  Zap,
  ArrowUpRight,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenDemoModal?: () => void;
}

export function HeroSection({ onOpenDemoModal }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Background Subtle Gradient & Grid Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>AI-Powered Marketing Intelligence</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Smarter Marketing.{' '}
              <br />
              Bigger{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Growth.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              MarketMind AI is your all-in-one AI marketing assistant. Research, plan, create and grow—faster than ever.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-bold text-base shadow-xl shadow-slate-900/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <button
                onClick={onOpenDemoModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs text-slate-800 dark:text-slate-200 font-semibold text-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Trust Metrics Grid */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>No credit card (7-day free trial)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Cancel anytime (No hidden fees)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Trusted by 1000+ marketers</span>
              </div>
            </div>
          </motion.div>

          {/* Right AI Dashboard Mockup (Matching the reference UI image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* Outer Glow frame */}
            <div className="relative mx-auto rounded-3xl p-2 bg-gradient-to-b from-slate-200 via-slate-100 to-white dark:from-slate-800 dark:to-slate-900 shadow-2xl shadow-blue-500/10 border border-slate-200/80 dark:border-slate-800">
              <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-inner flex flex-col md:flex-row min-h-[460px]">
                {/* Left Sidebar (Dark Mockup Panel) */}
                <div className="w-full md:w-52 bg-slate-950 text-slate-300 p-4 flex flex-col justify-between border-r border-slate-800 shrink-0">
                  <div className="space-y-4">
                    {/* Mock Logo */}
                    <div className="flex items-center gap-2 font-bold text-white text-sm">
                      <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </div>
                      <span>MarketMind AI</span>
                    </div>

                    {/* New Chat Button */}
                    <button className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Chat</span>
                    </button>

                    {/* Navigation list */}
                    <div className="space-y-1 text-[11px] font-medium pt-1">
                      <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-slate-800 text-white">
                        <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
                        <span>Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-slate-200">
                        <Target className="w-3.5 h-3.5" />
                        <span>AI Strategy</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-slate-200">
                        <Users className="w-3.5 h-3.5" />
                        <span>Competitors</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-slate-200">
                        <PenTool className="w-3.5 h-3.5" />
                        <span>Content Studio</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-slate-200">
                        <Search className="w-3.5 h-3.5" />
                        <span>SEO Assistant</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-slate-200">
                        <Megaphone className="w-3.5 h-3.5" />
                        <span>Ad Generator</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-slate-200">
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>Analytics</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-slate-200">
                        <Settings className="w-3.5 h-3.5" />
                        <span>Settings</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Card Mockup */}
                  <div className="pt-4 border-t border-slate-800 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                      A
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold text-white truncate">Aravind</div>
                      <div className="text-[9px] text-blue-400 font-medium">Pro Plan</div>
                    </div>
                  </div>
                </div>

                {/* Right Main Content Mockup */}
                <div className="flex-1 p-5 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col justify-between space-y-4">
                  {/* Top Bar Greeting */}
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>Welcome back, Aravind</span>
                      <span>👋</span>
                    </h2>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Here's what's happening with your marketing today.
                    </p>
                  </div>

                  {/* 4 Stat Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700 shadow-xs">
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Total Insights</div>
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white">128</div>
                      <div className="text-[9px] text-emerald-600 font-semibold">↑ 24%</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700 shadow-xs">
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Content Generated</div>
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white">93</div>
                      <div className="text-[9px] text-emerald-600 font-semibold">↑ 18%</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700 shadow-xs">
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Campaigns</div>
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white">12</div>
                      <div className="text-[9px] text-emerald-600 font-semibold">↑ 30%</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700 shadow-xs">
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Revenue Impact</div>
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white">₹2.45L</div>
                      <div className="text-[9px] text-emerald-600 font-semibold">↑ 35%</div>
                    </div>
                  </div>

                  {/* Chart and Recommendations Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    {/* SVG Chart */}
                    <div className="md:col-span-7 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700 shadow-xs relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                          Marketing Performance
                        </span>
                      </div>

                      {/* Line Chart Graphic */}
                      <div className="h-28 w-full relative">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 80">
                          <defs>
                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {/* Gradient Fill */}
                          <path
                            d="M 0 65 Q 30 50 60 55 T 120 30 T 180 20 L 180 80 L 0 80 Z"
                            fill="url(#chartGrad)"
                          />

                          {/* Smooth Purple/Blue Line */}
                          <path
                            d="M 0 65 Q 30 50 60 55 T 120 30 T 180 20"
                            fill="none"
                            stroke="#6366F1"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />

                          {/* Highlight Data Point */}
                          <circle cx="150" cy="22" r="4" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="2" />
                        </svg>

                        {/* Floating Tooltip Pill */}
                        <div className="absolute top-2 right-6 bg-slate-900 text-white text-[9px] px-2 py-0.5 rounded-full shadow-md font-semibold flex items-center gap-1">
                          <span>Ad:</span>
                          <span className="text-emerald-400 font-bold">₹2.45L</span>
                        </div>
                      </div>

                      <div className="flex justify-between text-[8px] text-slate-400 pt-1">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                      </div>
                    </div>

                    {/* Top Recommendations */}
                    <div className="md:col-span-5 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700 shadow-xs flex flex-col justify-between">
                      <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                        Top Recommendations
                      </div>

                      <div className="space-y-1.5 text-[10px]">
                        <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-slate-700/60 border border-blue-100 dark:border-slate-600 flex items-start gap-1.5">
                          <Zap className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white">Improve SEO for 3 pages</div>
                            <div className="text-[8px] text-slate-500">Potential traffic +3.5k</div>
                          </div>
                        </div>

                        <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-slate-700/60 border border-purple-100 dark:border-slate-600 flex items-start gap-1.5">
                          <Target className="w-3 h-3 text-purple-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white">Create Reel Campaign</div>
                            <div className="text-[8px] text-slate-500">High engagement opportunity</div>
                          </div>
                        </div>

                        <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-slate-700/60 border border-emerald-100 dark:border-slate-600 flex items-start gap-1.5">
                          <TrendingUp className="w-3 h-3 text-emerald-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white">Optimize Google Ads</div>
                            <div className="text-[8px] text-slate-500">Reduce CPA by 18%</div>
                          </div>
                        </div>
                      </div>

                      <button className="mt-2 w-full text-center text-[9px] font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1">
                        <span>View All Insights</span>
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-2xl shadow-lg hidden sm:flex items-center gap-2 z-20"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-500">ROAS Boost</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">4.8x Higher</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
