'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Play,
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
  TrendingUp,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenDemoModal?: () => void;
}

export function HeroSection({ onOpenDemoModal }: HeroSectionProps) {
  return (
    <section className="relative pt-24 pb-12 md:pt-28 md:pb-14 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-4 text-left"
          >
            {/* Mascot Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold shadow-2xs">
              <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-white shrink-0">
                <Image
                  src="/mascot.jpg"
                  alt="MarketMind Mascot"
                  width={20}
                  height={20}
                  className="object-contain mix-blend-multiply"
                />
              </div>
              <span>AI-Powered Marketing Intelligence</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 leading-[1.15]">
              Smarter Marketing.{' '}
              <br />
              Bigger{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
                Growth.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
              MarketMind AI is your all-in-one AI marketing assistant. Research, plan, create and grow—faster than ever.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={onOpenDemoModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-800 font-semibold text-xs hover:bg-slate-50 transition-all shadow-2xs"
              >
                <Play className="w-3 h-3 text-slate-700 fill-current ml-0.5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Trust Metrics */}
            <div className="pt-3 flex flex-wrap items-center gap-4 text-[11px] font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[9px] font-bold">✓</div>
                <span>No credit card <span className="text-slate-400">7-day free trial</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[9px] font-bold">✓</div>
                <span>Cancel anytime <span className="text-slate-400">No hidden fees</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[9px] font-bold">✓</div>
                <span>Trusted by <span className="text-slate-400">1000+ marketers</span></span>
              </div>
            </div>
          </motion.div>

          {/* Right AI Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-7 relative"
          >
            <div className="rounded-[20px] p-1 bg-slate-200/50 shadow-xl border border-slate-200/80">
              <div className="rounded-[18px] overflow-hidden bg-white border border-slate-100 shadow-2xs flex flex-col md:flex-row min-h-[400px]">
                {/* Dark Left Sidebar */}
                <div className="w-full md:w-44 bg-[#0F0F12] text-slate-300 p-3 flex flex-col justify-between border-r border-slate-800 shrink-0">
                  <div className="space-y-3">
                    {/* Brand */}
                    <div className="flex items-center gap-2 font-bold text-white text-xs">
                      <div className="w-5 h-5 rounded-md bg-white overflow-hidden flex items-center justify-center">
                        <Image
                          src="/mascot.jpg"
                          alt="MarketMind Mascot"
                          width={20}
                          height={20}
                          className="object-contain mix-blend-multiply"
                        />
                      </div>
                      <span>MarketMind AI</span>
                    </div>

                    {/* New Chat Button */}
                    <button className="w-full py-1 px-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-[10px] flex items-center justify-center gap-1 shadow-2xs transition-colors">
                      <Plus className="w-3 h-3" />
                      <span>New Chat</span>
                    </button>

                    {/* Menu items */}
                    <div className="space-y-0.5 text-[10px] font-medium pt-1">
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-800 text-white">
                        <LayoutDashboard className="w-3 h-3 text-purple-400" />
                        <span>Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-900 text-slate-400">
                        <Target className="w-3 h-3" />
                        <span>AI Strategy</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-900 text-slate-400">
                        <Users className="w-3 h-3" />
                        <span>Competitors</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-900 text-slate-400">
                        <PenTool className="w-3 h-3" />
                        <span>Content Studio</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-900 text-slate-400">
                        <Search className="w-3 h-3" />
                        <span>SEO Assistant</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-900 text-slate-400">
                        <Megaphone className="w-3 h-3" />
                        <span>Ad Generator</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-900 text-slate-400">
                        <BarChart3 className="w-3 h-3" />
                        <span>Analytics</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-900 text-slate-400">
                        <Settings className="w-3 h-3" />
                        <span>Settings</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile */}
                  <div className="pt-2.5 border-t border-slate-800 flex items-center gap-2">
                    <div className="w-5.5 h-5.5 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white text-[9px] font-bold">
                      A
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-semibold text-white truncate">Aravind</div>
                      <div className="text-[8px] text-purple-400 font-medium">Pro Plan</div>
                    </div>
                  </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 p-3.5 bg-[#FAFBFD] flex flex-col justify-between space-y-2.5">
                  <div>
                    <h2 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <span>Welcome back, Aravind</span>
                      <span>👋</span>
                    </h2>
                    <p className="text-[9.5px] text-slate-400">
                      Here's what's happening with your marketing today.
                    </p>
                  </div>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="text-[9px] text-slate-400">Total Insights</div>
                      <div className="text-xs font-black text-slate-900">128</div>
                      <div className="text-[8px] text-emerald-600 font-semibold">↑ 24%</div>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="text-[9px] text-slate-400">Content Generated</div>
                      <div className="text-xs font-black text-slate-900">93</div>
                      <div className="text-[8px] text-emerald-600 font-semibold">↑ 18%</div>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="text-[9px] text-slate-400">Campaigns</div>
                      <div className="text-xs font-black text-slate-900">12</div>
                      <div className="text-[8px] text-emerald-600 font-semibold">↑ 30%</div>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="text-[9px] text-slate-400">Revenue Impact</div>
                      <div className="text-xs font-black text-slate-900">₹2.45L</div>
                      <div className="text-[8px] text-emerald-600 font-semibold">↑ 35%</div>
                    </div>
                  </div>

                  {/* Chart and Recommendations Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                    {/* SVG Line Chart */}
                    <div className="md:col-span-7 bg-white p-2 rounded-xl border border-slate-100 shadow-2xs relative">
                      <div className="text-[9.5px] font-bold text-slate-800 mb-0.5">
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
                        <div className="absolute top-1 right-3 bg-slate-900 text-white text-[8px] px-1.5 py-0.5 rounded-full shadow-2xs font-semibold">
                          Ad: ₹2.45L
                        </div>
                      </div>
                      <div className="flex justify-between text-[7px] text-slate-400 pt-0.5">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                      </div>
                    </div>

                    {/* Top Recommendations */}
                    <div className="md:col-span-5 bg-white p-2 rounded-xl border border-slate-100 shadow-2xs flex flex-col justify-between space-y-1">
                      <div className="text-[9.5px] font-bold text-slate-800">
                        Top Recommendations
                      </div>
                      <div className="space-y-1 text-[8.5px]">
                        <div className="p-1 rounded-md bg-purple-50 border border-purple-100 flex items-start gap-1">
                          <Zap className="w-2.5 h-2.5 text-purple-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-900 text-[8.5px]">Improve SEO for 3 pages</div>
                            <div className="text-[7px] text-slate-400">Potential traffic +3.5k</div>
                          </div>
                        </div>
                        <div className="p-1 rounded-md bg-blue-50 border border-blue-100 flex items-start gap-1">
                          <Target className="w-2.5 h-2.5 text-blue-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-900 text-[8.5px]">Create Reel Campaign</div>
                            <div className="text-[7px] text-slate-400">High engagement</div>
                          </div>
                        </div>
                        <div className="p-1 rounded-md bg-emerald-50 border border-emerald-100 flex items-start gap-1">
                          <TrendingUp className="w-2.5 h-2.5 text-emerald-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-900 text-[8.5px]">Optimize Google Ads</div>
                            <div className="text-[7px] text-slate-400">Reduce CPA by 18%</div>
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
