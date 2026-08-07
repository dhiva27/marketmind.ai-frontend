'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: '/month',
      desc: 'For individuals getting started',
      features: ['5 AI Credits / month', 'Access to basic features', 'Limited Insights'],
      buttonText: 'Get Started',
      buttonLink: '/signup',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '₹999',
      period: '/month',
      desc: 'For marketers & small teams',
      features: [
        'Unlimited AI Credits',
        'All Premium Features',
        'Priority Support',
        'Expert Strategy Reports',
      ],
      buttonText: 'Start Free Trial',
      buttonLink: '/signup',
      highlighted: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      desc: 'For growing teams & agencies',
      features: [
        'Custom AI Credits',
        'Advanced Competitor Analytics',
        'Multi-user Team Collaboration',
        'Dedicated Support Manager',
      ],
      buttonText: 'Contact Sales',
      buttonLink: '/signup',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-10 md:py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="max-w-xl mx-auto space-y-1.5"
        >
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Plans & Pricing
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Choose the best plan for your business growth needs.
          </p>
        </motion.div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch text-left max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
              className={`rounded-[20px] p-5 sm:p-6 flex flex-col justify-between relative transition-all duration-200 bg-white border ${
                plan.highlighted
                  ? 'border-purple-600 shadow-lg shadow-purple-500/10 hover:-translate-y-1'
                  : 'border-slate-200/80 shadow-2xs hover:shadow-md hover:-translate-y-1'
              }`}
            >
              {/* Highlight Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] uppercase font-bold tracking-wider px-3.5 py-0.5 rounded-full shadow-2xs">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-950">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {plan.desc}
                  </p>
                </div>

                <hr className="border-slate-100" />

                {/* Features List - Medium font size */}
                <div className="space-y-2.5">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800">
                      <Check className="w-4 h-4 text-purple-600 shrink-0 stroke-[3]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href={plan.buttonLink}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center transition-all duration-200 ${
                    plan.highlighted
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-500/20 hover:scale-[1.01]'
                      : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 hover:scale-[1.01]'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
