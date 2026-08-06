'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, PenTool, Search, Megaphone, Compass, ArrowRight } from 'lucide-react';

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
    <section id="features" className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        {/* Section Header */}
        <div className="max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 text-purple-700 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Everything You Need to Grow
          </h2>
        </div>

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
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-[24px] bg-white border border-slate-200/60 shadow-2xs hover:shadow-md transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-950 mb-1">
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
        <div className="pt-2">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-900 text-xs font-bold shadow-2xs hover:bg-slate-50 transition-all">
            <span>Explore All Features</span>
          </button>
        </div>
      </div>
    </section>
  );
}
