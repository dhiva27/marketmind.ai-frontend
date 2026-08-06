'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, PenTool, Search, Megaphone, Compass } from 'lucide-react';

export function FeaturesGrid() {
  const features = [
    {
      icon: Target,
      title: 'AI Marketing Strategy',
      description: 'Get a complete strategy in seconds.',
      color: 'bg-purple-100/70 text-purple-600',
    },
    {
      icon: Users,
      title: 'Competitor Analysis',
      description: 'Know what works for your competitors.',
      color: 'bg-blue-100/70 text-blue-600',
    },
    {
      icon: PenTool,
      title: 'Content Generator',
      description: 'Blogs, captions, emails, and more.',
      color: 'bg-pink-100/70 text-pink-600',
    },
    {
      icon: Search,
      title: 'SEO Assistant',
      description: 'Find keywords, fix SEO, rank higher.',
      color: 'bg-indigo-100/70 text-indigo-600',
    },
    {
      icon: Megaphone,
      title: 'Ad Copy Generator',
      description: 'High-converting ads that sell.',
      color: 'bg-violet-100/70 text-violet-600',
    },
    {
      icon: Compass,
      title: 'Trend Discovery',
      description: 'Find trending topics before others do.',
      color: 'bg-emerald-100/70 text-emerald-600',
    },
  ];

  return (
    <section id="features" className="py-12 md:py-14 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-xl mx-auto space-y-1.5"
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.06, ease: 'easeOut' }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
                className="p-6 rounded-[20px] bg-white border border-slate-200/60 shadow-2xs hover:shadow-md transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-950 mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
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
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="pt-1"
        >
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-900 text-xs font-bold shadow-2xs hover:bg-slate-50 transition-all hover:scale-[1.02]">
            <span>Explore All Features</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
