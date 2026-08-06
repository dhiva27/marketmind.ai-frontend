'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Copy, Check, Bot, User, RefreshCw } from 'lucide-react';

export function InteractiveDemo() {
  const [selectedPrompt, setSelectedPrompt] = useState('Instagram Reels strategy for a sustainable clothing brand');
  const [isTyping, setIsTyping] = useState(false);
  const [typedResponse, setTypedResponse] = useState('');
  const [copied, setCopied] = useState(false);

  const presetPrompts = [
    'Instagram Reels strategy for a sustainable clothing brand',
    'High-converting Facebook ad copy for a B2B SaaS startup',
    'SEO keyword & content pillar plan for an E-commerce store',
  ];

  const responsesMap: Record<string, string> = {
    'Instagram Reels strategy for a sustainable clothing brand': `Here is your 4-Step Viral Instagram Reels Strategy:

1. 🎥 "Behind the Stitch" Teasers (Format: 7-10s loop)
   Show raw footage of eco-friendly fabric sourcing. Hook: "What 99% of fast fashion brands won't tell you..."

2. 📊 Price Breakdown Breakdown (Educational)
   Visually contrast $15 fast fashion vs $45 ethical garment longevity.

3. 🏷️ Content Pillars:
   • 40% Transparency & Sustainability Proof
   • 35% Outfit Styling & Wearability
   • 25% User Generated Reviews & Unboxing

4. 🚀 Target Hashtags & Audio:
   #SlowFashion #SustainableStyle #EcoFriendlyOOTD`,

    'High-converting Facebook ad copy for a B2B SaaS startup': `🔥 Facebook Ad Angle: Pain-Agitate-Solution (PAS)

【 Hook 】
Stop wasting 15+ hours every week on manual data entry across spreadsheets.

【 Body 】
Your team was hired to innovate, not to copy-paste CRM data.
MarketMind AI automates your entire analytics & workflow pipeline in 3 clicks.

✔ 85% reduction in manual effort
✔ Instant real-time performance alerts
✔ Setup takes under 4 minutes

【 CTA 】
👉 Try Free for 7 Days – No Credit Card Required.`,

    'SEO keyword & content pillar plan for an E-commerce store': `🎯 3-Tier SEO Strategy & High-Intent Keywords:

1. High-Intent Transactional Keywords (Bottom of Funnel):
   • "buy organic cotton t-shirts online" (KD: 18, Vol: 4.2k)
   • "best eco friendly apparel brands" (KD: 24, Vol: 8.9k)

2. Informational Content Pillars (Top of Funnel):
   • Guide: "How to Build a Capsule Wardrobe in 2026"
   • Comparison: "Bamboo vs Organic Cotton: Which is Better?"

3. On-Page Recommendation:
   Add Schema Markup for Product Reviews & Free Shipping badges to boost CTR by 22%.`,
  };

  const handleRunDemo = (promptText?: string) => {
    const textToRun = promptText || selectedPrompt;
    setIsTyping(true);
    setTypedResponse('');

    const fullText = responsesMap[textToRun] || responsesMap[presetPrompts[0]];
    let idx = 0;

    const interval = setInterval(() => {
      if (idx < fullText.length) {
        setTypedResponse(fullText.slice(0, idx + 1));
        idx += 3;
      } else {
        setTypedResponse(fullText);
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 25);
  };

  const handleCopy = () => {
    if (!typedResponse) return;
    navigator.clipboard.writeText(typedResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
        {/* Header */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Live Playground</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            See MarketMind AI in Action
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Pick a prompt below or type your own to experience real-time AI marketing intelligence.
          </p>
        </div>

        {/* ChatGPT Mockup Frame */}
        <div className="bg-slate-950 text-white rounded-3xl border border-slate-800 p-4 sm:p-6 shadow-2xl text-left space-y-4 relative overflow-hidden">
          {/* Top Header Controls */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2 font-semibold">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-slate-300">MarketMind Assistant v4.2</span>
            </div>
            <div className="text-[11px] text-blue-400 bg-blue-950/60 border border-blue-800 px-2 py-0.5 rounded-full">
              Live Sandbox
            </div>
          </div>

          {/* Preset Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {presetPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedPrompt(prompt);
                  handleRunDemo(prompt);
                }}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                  selectedPrompt === prompt
                    ? 'bg-blue-600 border-blue-500 text-white font-medium shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="min-h-[260px] bg-slate-900/60 rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-4 flex flex-col justify-between">
            {/* User Prompt */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
              <div className="bg-slate-800 px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-slate-100 max-w-2xl">
                {selectedPrompt}
              </div>
            </div>

            {/* AI Assistant Output */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-md shadow-indigo-500/20">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1 bg-slate-950/80 border border-slate-800 px-4 py-3.5 rounded-2xl text-xs sm:text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-wrap relative min-h-[120px]">
                {isTyping && !typedResponse && (
                  <div className="flex items-center gap-2 text-slate-400 italic text-xs">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                    <span>MarketMind AI is analyzing market signals & writing response...</span>
                  </div>
                )}

                {typedResponse || (!isTyping && !typedResponse && (
                  <span className="text-slate-500 italic">
                    Click "Generate Response" below to test the AI streaming output.
                  </span>
                ))}

                {isTyping && (
                  <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse" />
                )}

                {typedResponse && !isTyping && (
                  <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Copy AI Output"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <input
                type="text"
                value={selectedPrompt}
                onChange={(e) => setSelectedPrompt(e.target.value)}
                placeholder="Ask MarketMind AI anything..."
                className="flex-1 w-full bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleRunDemo()}
              />
              <button
                onClick={() => handleRunDemo()}
                disabled={isTyping}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <span>Generate Response</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
