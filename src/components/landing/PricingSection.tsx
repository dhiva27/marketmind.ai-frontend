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
        'Expert Reports',
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
      desc: 'For teams & agencies',
      features: [
        'Custom Credits',
        'Advanced Analytics',
        'Team Collaboration',
        'Dedicated Support',
      ],
      buttonText: 'Contact Sales',
      buttonLink: '/signup',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        {/* Header */}
        <div className="max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Plans & Pricing
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Choose the best plan for your business growth needs.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch text-left max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`rounded-[28px] p-7 flex flex-col justify-between relative transition-all bg-white border ${
                plan.highlighted
                  ? 'border-purple-600 shadow-lg shadow-purple-500/10'
                  : 'border-slate-200/60 shadow-2xs'
              }`}
            >
              {/* Highlight Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[9px] uppercase font-bold tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-950">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-slate-950 tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {plan.desc}
                  </p>
                </div>

                <hr className="border-slate-100" />

                {/* Features List */}
                <div className="space-y-2.5">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <Check className="w-3.5 h-3.5 text-purple-600 shrink-0 stroke-[3]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href={plan.buttonLink}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                    plan.highlighted
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-500/20'
                      : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200'
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
