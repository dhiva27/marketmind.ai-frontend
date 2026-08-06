'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function MarqueeLogos() {
  const logos = [
    { name: 'Google', font: 'font-sans font-medium' },
    { name: 'Meta', font: 'font-sans font-medium' },
    { name: 'Microsoft', font: 'font-sans font-medium' },
    { name: 'HubSpot', font: 'font-sans font-medium' },
    { name: 'Canva', font: 'font-sans font-medium' },
    { name: 'Notion', font: 'font-mono font-medium' },
    { name: 'Shopify', font: 'font-sans font-medium' },
    { name: 'Slack', font: 'font-sans font-medium' },
    { name: 'Adobe', font: 'font-sans font-medium' },
    { name: 'Zapier', font: 'font-sans font-medium' },
    { name: 'OpenAI', font: 'font-mono font-medium' },
    { name: 'Zepto', font: 'font-sans font-medium' },
    { name: 'Swiggy', font: 'font-sans font-medium' },
    { name: 'CRED', font: 'font-mono font-medium' },
    { name: 'Razorpay', font: 'font-sans font-medium' },
    { name: 'Slice', font: 'font-sans font-medium' },
    { name: 'Udaan', font: 'font-sans font-medium' },
    { name: 'Meesho', font: 'font-sans font-medium' },
    { name: 'Licious', font: 'font-serif font-medium' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-[40px] bg-white text-slate-950 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 text-center mb-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#6B7280]">
          Trusted by 1000+ companies and marketers worldwide
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center bg-white">
        {/* Soft edge fade gradients matching pure white background */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Infinite Marquee Track */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          className="flex items-center space-x-12 sm:space-x-16 whitespace-nowrap min-w-max bg-white"
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center text-[#111111] opacity-60 hover:opacity-100 transition-opacity duration-250 cursor-pointer"
            >
              <span className={`text-xl sm:text-2xl tracking-tight ${logo.font}`}>
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
