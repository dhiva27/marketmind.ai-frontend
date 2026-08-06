'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Store, Briefcase, UserCheck, ShoppingBag, GraduationCap } from 'lucide-react';

export function HowItWorksAndAudience() {
  const steps = [
    {
      num: '1',
      title: 'Describe Your Business',
      desc: 'Tell us about your business and goals.',
    },
    {
      num: '2',
      title: 'AI Analyzes Everything',
      desc: 'Our AI analyzes data, competitors and market trends.',
    },
    {
      num: '3',
      title: 'Get Actionable Plan',
      desc: 'Receive a complete marketing plan with recommendations.',
    },
    {
      num: '4',
      title: 'Launch & Grow',
      desc: 'Implement strategies and track your growth.',
    },
  ];

  const audience = [
    {
      icon: Rocket,
      title: 'Startups',
      desc: 'Validate and grow faster',
      color: 'bg-purple-100/70 text-purple-600',
    },
    {
      icon: Store,
      title: 'Small Businesses',
      desc: 'Get more customers and sales',
      color: 'bg-blue-100/70 text-blue-600',
    },
    {
      icon: Briefcase,
      title: 'Digital Marketers',
      desc: 'Do more in less time',
      color: 'bg-indigo-100/70 text-indigo-600',
    },
    {
      icon: UserCheck,
      title: 'Freelancers',
      desc: 'Deliver better results to clients',
      color: 'bg-pink-100/70 text-pink-600',
    },
    {
      icon: ShoppingBag,
      title: 'E-commerce Brands',
      desc: 'Increase sales and ROAS',
      color: 'bg-purple-100/70 text-purple-600',
    },
    {
      icon: GraduationCap,
      title: 'Students',
      desc: 'Learn marketing the smart way',
      color: 'bg-emerald-100/70 text-emerald-600',
    },
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-14 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* How It Works (Left Side) */}
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">
              How It Works
            </h2>

            <div className="relative pl-6 border-l-2 border-slate-200/80 space-y-4">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
                  className="relative group"
                >
                  <div className="absolute -left-[35px] top-0 w-7.5 h-7.5 rounded-full bg-purple-100 text-purple-700 text-xs font-black flex items-center justify-center border-2 border-white shadow-2xs">
                    {step.num}
                  </div>

                  <div className="bg-white p-5 rounded-[20px] border border-slate-200/60 shadow-2xs space-y-0.5 hover:border-slate-300 transition-colors">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-950">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Who Is It For? (Right Side) */}
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">
              Who Is It For?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {audience.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.06, ease: 'easeOut' }}
                    whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.3 } }}
                    className="p-6 rounded-[20px] bg-white border border-slate-200/60 shadow-2xs space-y-1.5 hover:border-slate-300 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-950">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
