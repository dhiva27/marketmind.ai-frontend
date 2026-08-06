'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Shield, Bot } from 'lucide-react';

export function AuthLeftPanel() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time Insights',
      desc: 'Access live market data and trends instantly.',
    },
    {
      icon: Sparkles,
      title: 'AI Powered',
      desc: 'Advanced AI to analyze data and generate insights.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      desc: 'Your data is encrypted and completely secure.',
    },
  ];

  return (
    <div className="w-full h-full bg-white p-8 lg:p-12 flex flex-col justify-between select-none relative overflow-hidden">
      {/* Top Header Logo */}
      <div className="space-y-8 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-white shadow-xs">
            <TrendingUp className="w-4.5 h-4.5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-950">
            MarketMind AI
          </span>
        </Link>

        {/* Hero Title & Paragraph */}
        <div className="space-y-3 pt-2">
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-slate-950 leading-[1.1]">
            Smarter market <br /> insights with AI
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed font-normal">
            Join MarketMind AI and get real-time insights, analyze trends and make smarter investment decisions.
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div className="space-y-3 pt-2">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-colors shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-900 shrink-0">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-950">{f.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-snug">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: 3D Mascot & Footer */}
      <div className="relative pt-6 z-10 flex flex-col justify-end space-y-4">
        {/* Soft Background Circle Glow */}
        <div className="absolute left-6 bottom-8 w-56 h-56 bg-purple-100/40 rounded-full blur-2xl pointer-events-none -z-10" />

        {/* Premium 3D AI Mascot */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.01, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto lg:mx-0 flex items-center justify-center"
        >
          {/* Standing Circular Platform */}
          <div className="absolute bottom-2 w-40 h-6 bg-gradient-to-r from-slate-200/50 via-purple-200/60 to-slate-200/50 rounded-full blur-xs" />

          {/* 3D Mascot Card Graphic */}
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-gradient-to-b from-white via-purple-50/60 to-purple-100/80 p-2 shadow-xl shadow-purple-500/10 border border-purple-200/50 flex flex-col items-center justify-center space-y-2">
            {/* Robot Head with Purple Glowing Eyes */}
            <div className="relative w-20 h-16 rounded-2xl bg-slate-950 border-2 border-purple-300/40 flex items-center justify-center shadow-lg">
              {/* Purple Glowing Eyes */}
              <div className="flex items-center space-x-4">
                <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
                <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
              </div>
              {/* Antenna */}
              <div className="absolute -top-3 w-1 h-3 bg-purple-400 rounded-full">
                <div className="absolute -top-1.5 -left-1 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
              </div>
            </div>

            {/* Glossy White Body */}
            <div className="w-24 h-14 rounded-b-3xl bg-gradient-to-b from-slate-100 to-white border border-slate-200 flex items-center justify-center shadow-inner">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-[11px] text-slate-400 font-medium text-left">
          © 2025 MarketMind AI. All rights reserved.
        </div>
      </div>
    </div>
  );
}
