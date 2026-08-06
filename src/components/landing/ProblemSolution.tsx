'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export function ProblemSolution() {
  const problems = [
    'No clear marketing strategy',
    'Competitor research takes hours',
    'Content ideas run out',
    'Ads waste money',
    'SEO is confusing',
    'Hard to track what works',
  ];

  const solutions = [
    'AI-powered marketing strategy',
    'Instant competitor analysis',
    'Unlimited content ideas',
    'Smarter ad copy that converts',
    'SEO made simple',
    'Track, analyze & grow faster',
  ];

  return (
    <section id="solutions" className="py-20 md:py-28 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Problem Card (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 space-y-6 shadow-xs relative"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-xs font-bold">
              <span>🚫 The Problem</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              Marketing is Hard Without the Right Tools
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
              {problems.map((problem, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/80 shadow-2xs"
                >
                  <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="truncate">{problem}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Central Arrow Connector */}
          <div className="lg:col-span-2 flex items-center justify-center my-2 lg:my-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-110 transition-transform cursor-pointer"
            >
              <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0" />
            </motion.div>
          </div>

          {/* Solution Card (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-emerald-50/40 dark:bg-slate-900/90 border border-emerald-200/80 dark:border-emerald-900/40 rounded-3xl p-8 space-y-6 shadow-md relative"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
              <span>✨ The Solution</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              MarketMind AI Solves It All with the Power of AI
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-800 dark:text-slate-200">
              {solutions.map((solution, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/40 shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">{solution}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
