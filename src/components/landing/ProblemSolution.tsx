'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';

export function ProblemSolution() {
  const problems = [
    'No clear marketing strategy',
    'Competitor research takes hours',
    'Content ideas run out fast',
    'Ads waste money without ROAS',
    'SEO is confusing & complex',
    'Hard to track what works',
  ];

  const solutions = [
    'AI-powered marketing strategy',
    'Instant competitor analysis',
    'Unlimited content generation',
    'Smarter ad copy that converts',
    'SEO made simple & clear',
    'Track, analyze & grow faster',
  ];

  return (
    <section id="solutions" className="py-10 md:py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
          {/* Problem Card (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="lg:col-span-5 bg-white border border-slate-200/80 rounded-[20px] p-5 sm:p-6 space-y-4 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 relative"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>The Problem</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-tight">
              Marketing is Hard <br /> Without the Right Tools
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-medium text-slate-800">
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
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25 hover:scale-105 transition-transform duration-200"
            >
              <ArrowRight className="w-4 h-4 rotate-90 lg:rotate-0" />
            </motion.div>
          </div>

          {/* Solution Card (Right) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-5 bg-white border border-slate-200/80 rounded-[20px] p-5 sm:p-6 space-y-4 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 relative"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>The Solution</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-tight">
              MarketMind AI Solves It <br /> All with the Power of AI
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-medium text-slate-800">
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
