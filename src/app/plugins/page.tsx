'use client';

import React from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Plug, CheckCircle2, Sliders, ExternalLink } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

export default function PluginsPage() {
  const { sidebarExpanded } = useChat();

  const plugins = [
    { name: 'Google Analytics 4', status: 'Connected', desc: 'Sync live traffic data & conversion metrics into your marketing strategy.' },
    { name: 'Meta Ads Manager', status: 'Connected', desc: 'Automated ad performance analysis & copy optimization.' },
    { name: 'HubSpot CRM', status: 'Available', desc: 'Pull customer segment data directly into lead gen planning.' },
    { name: 'Semrush SEO Engine', status: 'Available', desc: 'Live competitor keyword gap & search volume research.' },
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
              <Plug className="w-5 h-5" />
              <span>Integrations & Plugins</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Connected Tools</h1>
            <p className="text-slate-500 mt-1">Extend MarketMind AI with live data from your marketing tech stack.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plugins.map((item, i) => (
              <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                  <span className={cn('text-xs font-semibold px-2.5 py-0.5 rounded-full', item.status === 'Connected' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500')}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                <button className="text-xs font-medium text-[#8B3DFF] hover:underline flex items-center gap-1">
                  <span>Configure Settings</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
