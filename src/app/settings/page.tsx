'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { useChat } from '@/hooks/useChat';
import { Settings as SettingsIcon, Moon, Sun, Monitor, Bell, Key, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { sidebarExpanded } = useChat();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [autoScroll, setAutoScroll] = useState(true);

  return (
    <div className="h-screen flex overflow-hidden bg-white text-slate-900 relative">
      <Sidebar />
      <div
        className={cn(
          'flex-1 flex flex-col min-w-0 h-full overflow-y-auto p-6 sm:p-10 transition-all duration-300 custom-scrollbar',
          sidebarExpanded ? 'pl-64 sm:pl-72' : 'pl-16 sm:pl-[74px]'
        )}
      >
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
            <p className="text-slate-500 mt-1">Configure your workspace preferences and appearance.</p>
          </div>

          {/* Appearance Section */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sun className="w-4 h-4 text-[#8B3DFF]" />
              <span>Appearance</span>
            </h2>

            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { id: 'light', label: 'Light', icon: Sun },
                { id: 'dark', label: 'Dark', icon: Moon },
                { id: 'system', label: 'System', icon: Monitor },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = theme === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setTheme(item.id as any)}
                    className={cn(
                      'flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-medium text-sm transition-all',
                      isSelected
                        ? 'border-[#8B3DFF] bg-purple-50 text-[#8B3DFF] font-bold shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI & Chat Preferences */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <SettingsIcon className="w-4 h-4 text-[#8B3DFF]" />
              <span>Chat Preferences</span>
            </h2>

            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div>
                  <div className="font-semibold text-sm text-slate-900">Auto-scroll to latest response</div>
                  <div className="text-xs text-slate-500">Automatically scroll down as new tokens stream in</div>
                </div>
                <input
                  type="checkbox"
                  checked={autoScroll}
                  onChange={(e) => setAutoScroll(e.target.checked)}
                  className="w-4 h-4 accent-[#8B3DFF] rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
