'use client';

import React, { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Check, Sliders, Shield, Save } from 'lucide-react';

export function SettingsForm() {
  const [systemPrompt, setSystemPrompt] = useState(
    'You are MarketMind AI, a helpful, precise, and sophisticated financial and market intelligence assistant.'
  );
  const [autoScroll, setAutoScroll] = useState(true);
  const [enterToSend, setEnterToSend] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-3xl">
      {/* Theme Settings Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100">
          <Sliders className="w-4 h-4 text-indigo-500" />
          <span>Appearance & Theme</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Customize the interface look and color scheme.
        </p>
        <ThemeToggle />
      </div>

      {/* Model & System Prompt Settings */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100">
          <Shield className="w-4 h-4 text-violet-500" />
          <span>Custom Instructions</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Define the default persona or guidelines for MarketMind AI assistant responses.
        </p>
        <textarea
          rows={3}
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-xs text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      {/* Preferences Toggles */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Chat Preferences</h3>

        <div className="space-y-4 text-xs">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Auto-scroll during response</p>
              <p className="text-slate-400">Automatically scroll down as AI streams message content.</p>
            </div>
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer pt-3 border-t border-slate-100 dark:border-slate-800">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Press Enter to send</p>
              <p className="text-slate-400">Send message on Enter key (Shift+Enter for new line).</p>
            </div>
            <input
              type="checkbox"
              checked={enterToSend}
              onChange={(e) => setEnterToSend(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer pt-3 border-t border-slate-100 dark:border-slate-800">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Save Conversation History</p>
              <p className="text-slate-400">Keep recent chats in local history list.</p>
            </div>
            <input
              type="checkbox"
              checked={saveHistory}
              onChange={(e) => setSaveHistory(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" className="gap-2">
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </Button>
        {saved && (
          <span className="text-xs font-medium text-emerald-500 flex items-center gap-1 animate-fade-in">
            <Check className="w-4 h-4" /> Saved successfully!
          </span>
        )}
      </div>
    </form>
  );
}
