'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';

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
    <section id="solutions" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Problem Card (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-white border border-slate-200/60 rounded-[28px] p-7 md:p-8 space-y-6 shadow-xs relative"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>The Problem</span>
            </div>

            <h3 className="text-2xl font-black text-slate-950 tracking-tight leading-tight">
              Marketing is Hard <br /> Without the Right Tools
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium text-slate-700">
              {problems.map((problem, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100"
                >
                  <div className="w-4 h-4 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                    <X className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="truncate">{problem}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Central Arrow Badge */}
          <div className="lg:col-span-2 flex items-center justify-center my-1 lg:my-0">
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25 cursor-pointer hover:scale-110 transition-transform"
            >
              <ArrowRight className="w-5 h-5 rotate-90 lg:rotate-0" />
            </motion.div>
          </div>

          {/* Solution Card (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-white border border-slate-200/60 rounded-[28px] p-7 md:p-8 space-y-6 shadow-xs relative"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>The Solution</span>
            </div>

            <h3 className="text-2xl font-black text-slate-950 tracking-tight leading-tight">
              MarketMind AI Solves It <br /> All with the Power of AI
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium text-slate-700">
              {solutions.map((solution, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100"
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
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
