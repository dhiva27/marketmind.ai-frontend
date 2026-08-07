'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Play,
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
} from 'lucide-react';

interface HeroSectionProps {
  onOpenDemoModal?: () => void;
}

export function HeroSection({ onOpenDemoModal }: HeroSectionProps) {
  return (
    <section className="relative pt-24 pb-10 md:pt-28 md:pb-12 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-4 text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 text-purple-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>AI-Powered Marketing Intelligence</span>
            </div>

            {/* Main Heading - Strong but reasonably sized */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-slate-950 leading-[1.15]">
              Smarter Marketing.{' '}
              <br />
              Bigger{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
                Growth.
              </span>
            </h1>

            {/* Subtitle - Medium comfortable body text */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md font-normal">
              MarketMind AI is your all-in-one AI marketing assistant. Research, plan, create and grow—faster than ever.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={onOpenDemoModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-slate-200 bg-white text-slate-800 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all duration-200 shadow-2xs"
              >
                <Play className="w-3.5 h-3.5 text-slate-700 fill-current ml-0.5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Trust Metrics - Medium font weight */}
            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">✓</div>
                <span>No credit card <span className="text-slate-400">7-day free trial</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">✓</div>
                <span>Cancel anytime <span className="text-slate-400">No hidden fees</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">✓</div>
                <span>Trusted by <span className="text-slate-400">1000+ marketers</span></span>
              </div>
            </div>
          </motion.div>

          {/* Right AI Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-7 relative"
          >
            <div className="rounded-[20px] p-1 bg-slate-200/50 shadow-xl border border-slate-200/80">
              <div className="rounded-[18px] overflow-hidden bg-white border border-slate-100 shadow-2xs flex flex-col md:flex-row min-h-[400px]">
                {/* Dark Left Sidebar */}
                <div className="w-full md:w-44 bg-[#0F0F12] text-slate-300 p-3 flex flex-col justify-between border-r border-slate-800 shrink-0">
                  <div className="space-y-3">
                    {/* Brand */}
                    <div className="flex items-center gap-2 font-bold text-white text-xs">
                      <div className="w-4.5 h-4.5 rounded-md bg-purple-600 flex items-center justify-center text-white">
                        <TrendingUp className="w-3 h-3" />
                      </div>
                      <span>MarketMind AI</span>
                    </div>

                    {/* New Chat Button */}
                    <button className="w-full py-1 px-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs flex items-center justify-center gap-1 shadow-2xs transition-colors">
                      <Plus className="w-3 h-3" />
                      <span>New Chat</span>
                    </button>

                    {/* Menu items */}
                    <div className="space-y-0.5 text-xs font-semibold pt-1">
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-800 text-white">
                        <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" />
                        <span>Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-900 text-slate-400">
                        <Target className="w-3.5 h-3.5" />
                        <span>AI Strategy</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-900 text-slate-400">
                        <Users className="w-3.5 h-3.5" />
                        <span>Competitors</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-900 text-slate-400">
                        <PenTool className="w-3.5 h-3.5" />
                        <span>Content Studio</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-900 text-slate-400">
                        <Search className="w-3.5 h-3.5" />
                        <span>SEO Assistant</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-900 text-slate-400">
                        <Megaphone className="w-3.5 h-3.5" />
                        <span>Ad Generator</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-900 text-slate-400">
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>Analytics</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-900 text-slate-400">
                        <Settings className="w-3.5 h-3.5" />
                        <span>Settings</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile */}
                  <div className="pt-2.5 border-t border-slate-800 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">
                      U
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold text-white truncate">User</div>
                      <div className="text-[10px] text-purple-400 font-medium">Pro Plan</div>
                    </div>
                  </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 p-3.5 bg-[#FAFBFD] flex flex-col justify-between space-y-2.5">
                  <div>
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1">
                      <span>Welcome back</span>
                      <span>👋</span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      Here's what's happening with your marketing today.
                    </p>
                  </div>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="text-xs text-slate-500 font-medium">Total Insights</div>
                      <div className="text-sm font-black text-slate-900">128</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">↑ 24%</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="text-xs text-slate-500 font-medium">Content Generated</div>
                      <div className="text-sm font-black text-slate-900">93</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">↑ 18%</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="text-xs text-slate-500 font-medium">Campaigns</div>
                      <div className="text-sm font-black text-slate-900">12</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">↑ 30%</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="text-xs text-slate-500 font-medium">Revenue Impact</div>
                      <div className="text-sm font-black text-slate-900">₹2.45L</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">↑ 35%</div>
                    </div>
                  </div>

                  {/* Chart and Recommendations Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                    {/* SVG Line Chart */}
                    <div className="md:col-span-7 bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs relative">
                      <div className="text-xs font-bold text-slate-800 mb-0.5">
                        Marketing Performance
                      </div>
                      <div className="h-20 w-full relative">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 80">
                          <defs>
                            <linearGradient id="chartGradLight" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0 65 Q 30 50 60 55 T 120 30 T 180 20 L 180 80 L 0 80 Z"
                            fill="url(#chartGradLight)"
                          />
                          <path
                            d="M 0 65 Q 30 50 60 55 T 120 30 T 180 20"
                            fill="none"
                            stroke="#6366F1"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <circle cx="150" cy="22" r="3.5" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="1.5" />
                        </svg>
                      </div>
                      <div className="flex justify-between text-[9px] text-slate-500 pt-0.5">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                      </div>
                    </div>

                    {/* Top Recommendations */}
                    <div className="md:col-span-5 bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs flex flex-col justify-between space-y-1">
                      <div className="text-xs font-bold text-slate-800">
                        Top Recommendations
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="p-1 rounded-md bg-purple-50 border border-purple-100 flex items-start gap-1">
                          <Zap className="w-3 h-3 text-purple-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-900 text-xs">Improve SEO for 3 pages</div>
                            <div className="text-[10px] text-slate-500">Traffic +3.5k</div>
                          </div>
                        </div>
                        <div className="p-1 rounded-md bg-blue-50 border border-blue-100 flex items-start gap-1">
                          <Target className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-900 text-xs">Create Reel Campaign</div>
                            <div className="text-[10px] text-slate-500">High engagement</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
