'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function MarqueeLogos() {
  const logos = [
    { name: 'Zepto', style: 'font-extrabold tracking-tight text-indigo-600' },
    { name: 'Swiggy', style: 'font-bold tracking-tight text-amber-500' },
    { name: 'CRED', style: 'font-mono font-black tracking-widest text-slate-900 dark:text-white' },
    { name: 'Razorpay', style: 'font-bold italic text-blue-600' },
    { name: 'Slice', style: 'font-black tracking-tight text-purple-600' },
    { name: 'Udaan', style: 'font-bold tracking-tight text-emerald-600' },
    { name: 'Meesho', style: 'font-bold italic text-pink-600' },
    { name: 'Licious', style: 'font-serif font-bold text-red-600' },
    { name: 'Google', style: 'font-semibold tracking-tight text-slate-700 dark:text-slate-200' },
    { name: 'Meta', style: 'font-bold text-blue-500' },
    { name: 'Microsoft', style: 'font-semibold text-slate-800 dark:text-slate-100' },
    { name: 'HubSpot', style: 'font-bold text-orange-600' },
    { name: 'Canva', style: 'font-serif italic font-bold text-teal-500' },
    { name: 'Notion', style: 'font-mono font-bold text-slate-900 dark:text-white' },
    { name: 'Shopify', style: 'font-bold text-emerald-500' },
    { name: 'OpenAI', style: 'font-mono font-bold text-slate-800 dark:text-slate-100' },
  ];

  return (
    <section className="py-10 bg-slate-50/80 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 text-center mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Trusted by 1000+ companies and marketers worldwide
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        {/* Fade gradients at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex items-center space-x-12 sm:space-x-16 whitespace-nowrap min-w-max"
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-200 cursor-pointer"
            >
              <span className={`text-xl sm:text-2xl ${logo.style}`}>{logo.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
