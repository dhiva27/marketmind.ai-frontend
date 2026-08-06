'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Bot, Sparkles } from 'lucide-react';

interface CtaSectionProps {
  onOpenDemoModal?: () => void;
}

export function CtaSection({ onOpenDemoModal }: CtaSectionProps) {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 border border-blue-200/80 dark:border-indigo-800/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Left Content */}
          <div className="space-y-4 max-w-xl text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 text-blue-700 dark:text-blue-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Scaling Today</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Ready to <span className="text-blue-600 dark:text-blue-400">grow your business</span> with AI?
            </h2>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
              Join 1000+ marketers, founders, and creators who trust MarketMind AI to automate their growth.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center md:justify-start">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs text-slate-900 dark:text-white font-semibold text-sm hover:bg-white dark:hover:bg-slate-800 transition-all"
              >
                <Play className="w-4 h-4 text-blue-600 fill-current ml-0.5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Right 3D AI Assistant Graphic */}
          <div className="relative z-10 flex items-center justify-center shrink-0">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-1 shadow-2xl shadow-indigo-500/30 flex items-center justify-center"
            >
              <div className="w-full h-full rounded-[22px] bg-slate-900 flex flex-col items-center justify-center space-y-2 text-white">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <div className="text-xs font-bold tracking-wider uppercase text-blue-400">
                  MarketMind AI
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
