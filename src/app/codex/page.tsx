'use client';

import React from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Code2, Terminal, Cpu, Play } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

export default function CodexPage() {
  const { sidebarExpanded } = useChat();

  return (
    <div className="h-screen flex overflow-hidden bg-white text-slate-900 relative">
      <Sidebar />
      <div
        className={cn(
          'flex-1 flex flex-col min-w-0 h-full overflow-y-auto p-6 sm:p-10 transition-all duration-300 custom-scrollbar',
          sidebarExpanded ? 'pl-64 sm:pl-72' : 'pl-16 sm:pl-[74px]'
        )}
      >
        <div className="max-w-4xl mx-auto w-full space-y-8">
          <div>
            <div className="flex items-center gap-3 text-[#8B3DFF] font-semibold text-sm mb-1">
              <Code2 className="w-5 h-5" />
              <span>Codex Engine</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Developer & Automation Workspace</h1>
            <p className="text-slate-500 mt-1">Generate tracking scripts, API webhooks, and marketing automation snippets.</p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 font-mono text-sm space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-slate-400">
                <Terminal className="w-4 h-4" />
                <span>marketmind-automation.js</span>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#8B3DFF] text-white text-xs font-semibold hover:bg-[#7C3AED] transition-colors">
                <Play className="w-3 h-3 fill-white" />
                <span>Run Code</span>
              </button>
            </div>
            <pre className="text-purple-300 leading-relaxed overflow-x-auto">
{`// MarketMind AI Webhook Event Tracker
const marketmind = require('@marketmind/sdk');

marketmind.init({ apiKey: process.env.MARKETMIND_KEY });

async function trackConversion(user) {
  const insight = await marketmind.analyzeSegment(user);
  console.log('AI Marketing Recommendation:', insight.recommendedAction);
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
