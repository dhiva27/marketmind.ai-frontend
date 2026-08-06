'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is MarketMind AI?',
      a: 'MarketMind AI is an all-in-one AI marketing assistant designed to automate competitor analysis, SEO optimization, ad copywriting, content creation, and market strategy.',
    },
    {
      q: 'Is there a free trial?',
      a: 'Yes! You get a 7-day free trial on the Pro plan with no credit card required to start.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Absolutely. You can manage or cancel your subscription at any time with a single click from your account settings page.',
    },
    {
      q: 'Is my data safe?',
      a: 'Yes. We use enterprise-grade encryption (SSL/TLS), Firebase authentication, and strict privacy protocols.',
    },
    {
      q: 'Can I use MarketMind AI for my clients?',
      a: 'Yes! Digital agencies, freelancers, and consultants use MarketMind AI daily to generate marketing strategies and content reports for client brands.',
    },
  ];

  return (
    <section id="faq" className="py-12 md:py-14 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-left max-w-xl"
        >
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-3 max-w-4xl">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: 'easeOut' }}
                className="rounded-[20px] border border-slate-200/60 bg-white overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-950 hover:text-purple-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                    {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <div className="px-5 pb-5 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
