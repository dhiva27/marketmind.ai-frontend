'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Bot } from 'lucide-react';

interface CtaSectionProps {
  onOpenDemoModal?: () => void;
}

export function CtaSection({ onOpenDemoModal }: CtaSectionProps) {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 border border-purple-200/60 shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="space-y-3 max-w-xl text-center md:text-left relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Ready to <span className="text-purple-700">grow your business</span> with AI?
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Join 1000+ marketers who trust MarketMind AI.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 justify-center md:justify-start">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-slate-300 bg-white/80 backdrop-blur-xs text-slate-900 font-semibold text-xs hover:bg-white transition-all shadow-2xs"
              >
                <Play className="w-3.5 h-3.5 text-slate-800 fill-current ml-0.5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Right 3D AI Robot graphic */}
          <div className="relative z-10 flex items-center justify-center shrink-0">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 p-1 shadow-xl flex items-center justify-center"
            >
              <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center space-y-1.5 text-white">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center shadow-md">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div className="text-[10px] font-bold tracking-wider uppercase text-purple-400">
                  MarketMind AI
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
