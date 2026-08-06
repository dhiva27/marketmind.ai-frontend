'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Shield } from 'lucide-react';

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
        <div className="absolute left-6 bottom-8 w-60 h-60 bg-purple-100/50 rounded-full blur-2xl pointer-events-none -z-10" />

        {/* Premium 3D AI Mascot */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.015, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-52 h-52 sm:w-60 sm:h-60 mx-auto lg:mx-0 flex items-center justify-center"
        >
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden flex items-center justify-center">
            <Image
              src="/mascot.jpg"
              alt="MarketMind AI Mascot"
              width={240}
              height={240}
              className="object-contain mix-blend-multiply drop-shadow-md"
              priority
            />
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
