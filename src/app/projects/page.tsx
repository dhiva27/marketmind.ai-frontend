'use client';

import React from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { FolderKanban, Plus, Clock, Target } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
  const { sidebarExpanded } = useChat();

  const projects = [
    { title: 'SaaS Product Launch Q3', updated: '2 hours ago', goals: '1,000 Signups', progress: '65%' },
    { title: 'Brand Repositioning', updated: 'Yesterday', goals: 'Messaging & Pitch', progress: '40%' },
    { title: 'Black Friday Campaign', updated: '3 days ago', goals: 'Meta & Google Ads', progress: '90%' },
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
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 text-[#8B3DFF] font-semibold text-sm mb-1">
                <FolderKanban className="w-5 h-5" />
                <span>Projects</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Marketing Workspaces</h1>
              <p className="text-slate-500 mt-1">Organize your strategies, research, and campaigns by project.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B3DFF] text-white font-medium text-sm hover:bg-[#7C3AED] transition-colors shadow-md">
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((proj, i) => (
              <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 transition-all space-y-3">
                <h3 className="font-bold text-slate-900 text-base">{proj.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{proj.updated}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-slate-600 font-medium">{proj.goals}</span>
                  <span className="font-bold text-[#8B3DFF]">{proj.progress}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
