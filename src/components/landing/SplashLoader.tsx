'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Sparkles } from 'lucide-react';

interface SplashLoaderProps {
  onComplete?: () => void;
}

export function SplashLoader({ onComplete }: SplashLoaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 4200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const logoText = "MarketMind.ai";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] bg-[#0B0B0B] text-white flex flex-col items-center justify-center overflow-hidden font-sans select-none"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none -top-20 -left-20" />
          <div className="absolute w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -bottom-20 -right-20" />

          {/* Zig-zag Graph animation box */}
          <div className="relative w-80 h-36 mb-8 flex items-center justify-center">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 300 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Subtle background grid lines */}
              <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="300" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />

              {/* White Zig-Zag line drawing */}
              <motion.path
                d="M 10 100 L 70 75 L 120 85 L 180 40 L 230 55 L 280 15"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0.3 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              />

              {/* Glowing Electric Blue Energy Line drawing */}
              <motion.path
                d="M 10 100 L 70 75 L 120 85 L 180 40 L 230 55 L 280 15"
                stroke="#2563EB"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, delay: 0.4, ease: "easeInOut" }}
                style={{ filter: "drop-shadow(0px 0px 10px #2563EB)" }}
              />

              {/* Electric Blue Dot Moving along path */}
              <motion.circle
                r="6"
                fill="#60A5FA"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 2.2, delay: 0.4, ease: "easeInOut" }}
                style={{
                  offsetPath: "path('M 10 100 L 70 75 L 120 85 L 180 40 L 230 55 L 280 15')",
                  filter: "drop-shadow(0px 0px 12px #3B82F6)"
                }}
              />

              {/* Glowing Arrow head at top end */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.4, duration: 0.4, type: "spring" }}
                transform="translate(280, 15)"
              >
                <circle r="12" fill="#2563EB" className="animate-pulse opacity-40" />
                <path
                  d="M -4 4 L 4 0 L -4 -4"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.g>
            </svg>
          </div>

          {/* Logo Name Stagger Text Animation */}
          <div className="flex items-center space-x-1 mb-2">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center mr-2 shadow-lg shadow-blue-500/40"
            >
              <TrendingUp className="w-5 h-5 text-white" />
            </motion.div>

            {logoText.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  delay: 2.0 + index * 0.05,
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                className={`text-3xl font-extrabold tracking-tight ${
                  char === '.' || char === 'a' || char === 'i'
                    ? 'text-blue-500'
                    : 'text-white'
                }`}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.5 }}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
            <span>AI Marketing Intelligence</span>
          </motion.div>

          {/* Progress bar line */}
          <motion.div className="w-48 h-1 bg-slate-800 rounded-full mt-8 overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 3.5, ease: 'easeInOut' }}
              className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-400 shadow-sm shadow-blue-500"
            />
          </motion.div>

          {/* Skip button */}
          <button
            onClick={() => {
              setVisible(false);
              if (onComplete) onComplete();
            }}
            className="absolute bottom-6 text-xs text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest"
          >
            Skip Intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
