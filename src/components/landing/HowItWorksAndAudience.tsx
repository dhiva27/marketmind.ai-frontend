'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Store, Briefcase, UserCheck, ShoppingBag, GraduationCap } from 'lucide-react';

export function HowItWorksAndAudience() {
  const steps = [
    {
      num: '1',
      title: 'Describe Your Business',
      desc: 'Tell us about your business, target audience, and growth goals.',
    },
    {
      num: '2',
      title: 'AI Analyzes Everything',
      desc: 'Our AI analyzes real-time market data, competitors, and industry trends.',
    },
    {
      num: '3',
      title: 'Get Actionable Plan',
      desc: 'Receive a complete marketing strategy with step-by-step recommendations.',
    },
    {
      num: '4',
      title: 'Launch & Grow',
      desc: 'Implement automated strategies and track your measurable growth.',
    },
  ];

  const audience = [
    {
      icon: Rocket,
      title: 'Startups',
      desc: 'Validate and grow faster with lean AI marketing budgets.',
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400',
    },
    {
      icon: Store,
      title: 'Small Businesses',
      desc: 'Get more customers and sales without hiring expensive agencies.',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
    },
    {
      icon: Briefcase,
      title: 'Digital Marketers',
      desc: 'Do more in less time and scale your workflow effortlessly.',
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
    },
    {
      icon: UserCheck,
      title: 'Freelancers',
      desc: 'Deliver better strategy and content results to your clients.',
      color: 'bg-pink-100 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400',
    },
    {
      icon: ShoppingBag,
      title: 'E-commerce Brands',
      desc: 'Increase repeat sales, CTR, and overall ad ROAS.',
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400',
    },
    {
      icon: GraduationCap,
      title: 'Students',
      desc: 'Learn high-income marketing skills the modern, smart way.',
      color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* How It Works (Left Side) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
                <span>🔄 How It Works</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Simple 4-Step Growth Process
              </h2>
            </div>

            <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Circle Step Number */}
                  <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600 text-blue-600 dark:text-blue-400 text-xs font-extrabold flex items-center justify-center shadow-xs">
                    {step.num}
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Who Is It For? (Right Side) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-xs font-bold mb-3">
                <span>🎯 Target Audience</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Who Is It For?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {audience.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2 hover:border-blue-300 dark:hover:border-blue-800 transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
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
