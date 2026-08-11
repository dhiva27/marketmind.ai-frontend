'use client';

import React from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { HelpCircle, BookOpen, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

export default function HelpPage() {
  const { sidebarExpanded } = useChat();

  const faqs = [
    { q: 'How does MarketMind AI build marketing strategies?', a: 'MarketMind AI uses Gemini AI coupled with a 48-section strategic framework to guide you from problem diagnosis to measurable action plans.' },
    { q: 'Is my business data private?', a: 'Yes. All chat history is isolated per authenticated user account and never shared across users.' },
    { q: 'Can I export my marketing plans?', a: 'You can copy responses using the built-in copy button on any AI message or download Markdown content.' },
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
        <div className="max-w-3xl mx-auto w-full space-y-8">
          <div>
            <div className="flex items-center gap-3 text-[#8B3DFF] font-semibold text-sm mb-1">
              <HelpCircle className="w-5 h-5" />
              <span>Help & Support</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">How can we help?</h1>
            <p className="text-slate-500 mt-1">Frequently asked questions and support channels for MarketMind AI.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1">
                  <h3 className="font-semibold text-slate-900 text-sm">{faq.q}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
