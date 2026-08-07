'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, PenTool, Search, Megaphone, Compass } from 'lucide-react';

export function FeaturesGrid() {
  const features = [
    {
      icon: Target,
      title: 'AI Marketing Strategy',
      description: 'Get a complete marketing strategy in seconds.',
      color: 'bg-purple-100/70 text-purple-600',
    },
    {
      icon: Users,
      title: 'Competitor Analysis',
      description: 'Know what works for your competitors and market rivals.',
      color: 'bg-blue-100/70 text-blue-600',
    },
    {
      icon: PenTool,
      title: 'Content Generator',
      description: 'Generate high-converting blogs, social captions, and emails.',
      color: 'bg-pink-100/70 text-pink-600',
    },
    {
      icon: Search,
      title: 'SEO Assistant',
      description: 'Find target keywords, fix website SEO, and rank higher.',
      color: 'bg-indigo-100/70 text-indigo-600',
    },
    {
      icon: Megaphone,
      title: 'Ad Copy Generator',
      description: 'Create high-converting ad copy for Meta and Google Ads.',
      color: 'bg-violet-100/70 text-violet-600',
    },
    {
      icon: Compass,
      title: 'Trend Discovery',
      description: 'Discover trending topics before competitors do.',
      color: 'bg-emerald-100/70 text-emerald-600',
    },
  ];

  return (
    <section id="features" className="py-10 md:py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="max-w-xl mx-auto space-y-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 text-purple-700 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Everything You Need to Grow
          </h2>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
                className="p-5 sm:p-6 rounded-[20px] bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform duration-200`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-950 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Button below */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
          className="pt-1"
        >
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm font-bold shadow-2xs hover:bg-slate-50 transition-all duration-200 hover:scale-[1.02]">
            <span>Explore All Features</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
