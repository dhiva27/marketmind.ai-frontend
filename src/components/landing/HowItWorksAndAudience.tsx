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
    <section id="how-it-works" className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* How It Works (Left Side) */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">
              How It Works
            </h2>

            <div className="relative pl-6 border-l-2 border-slate-200/80 space-y-5">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="relative group"
                >
                  <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-xs font-black flex items-center justify-center border-2 border-white shadow-2xs">
                    {step.num}
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-2xs space-y-0.5">
                    <h3 className="text-sm font-bold text-slate-950">
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
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">
              Who Is It For?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {audience.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="p-4 rounded-2xl bg-white border border-slate-200/60 shadow-2xs space-y-1.5 hover:border-slate-300 transition-colors"
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
