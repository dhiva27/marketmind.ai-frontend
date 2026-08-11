'use client';

import React from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Library, Search, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

export default function LibraryPage() {
  const { sidebarExpanded } = useChat();

  const resources = [
    { title: 'SaaS Marketing Playbook 2026', category: 'Strategy', desc: 'Comprehensive step-by-step framework for B2B SaaS user acquisition and retention.' },
    { title: 'High-Converting Ad Copy Templates', category: 'Copywriting', desc: '50+ proven ad templates for Meta, Google, and LinkedIn ad campaigns.' },
    { title: 'SEO Keyword Clustering Framework', category: 'SEO', desc: 'Methodology to structure topic clusters for #1 search rankings.' },
    { title: 'Viral Content Strategy Guide', category: 'Content', desc: 'Hooks, storytelling frameworks, and distribution loops for organic growth.' },
  ];

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
              <Library className="w-5 h-5" />
              <span>Resource Library</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Marketing Assets & Templates</h1>
            <p className="text-slate-500 mt-1">Saved frameworks, prompt templates, and strategic marketing playbooks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((res, i) => (
              <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-[#8B3DFF]">{res.category}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#8B3DFF] group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-semibold text-slate-900 text-base mb-1">{res.title}</h3>
                <p className="text-sm text-slate-600">{res.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
