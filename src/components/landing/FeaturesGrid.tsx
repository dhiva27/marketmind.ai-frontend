'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, PenTool, Search, Megaphone, Compass, ArrowRight } from 'lucide-react';

export function FeaturesGrid() {
  const features = [
    {
      icon: Target,
      title: 'AI Marketing Strategy',
      description: 'Get a complete, customized marketing strategy in seconds tailored for your niche.',
      color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400',
    },
    {
      icon: Users,
      title: 'Competitor Analysis',
      description: 'Know what works for your competitors and spot untapped market opportunities.',
      color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
    },
    {
      icon: PenTool,
      title: 'Content Generator',
      description: 'Create high-converting blogs, social captions, newsletters, and email scripts in seconds.',
      color: 'bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400',
    },
    {
      icon: Search,
      title: 'SEO Assistant',
      description: 'Find profitable low-competition keywords, fix site SEO issues, and outrank rivals.',
      color: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400',
    },
    {
      icon: Megaphone,
      title: 'Ad Copy Generator',
      description: 'Generate high-converting Facebook, Instagram, and Google ad copy engineered to sell.',
      color: 'bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400',
    },
    {
      icon: Compass,
      title: 'Trend Discovery',
      description: 'Discover viral trending topics and emerging search patterns before your competitors do.',
      color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold">
            <span>⚡ Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything You Need to Grow
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Scale your brand faster with specialized AI models built specifically for growth marketing.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Button below */}
        <div>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 shadow-xs transition-all">
            <span>Explore All Features</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
