'use client';

import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-xs">
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={cn(
          'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all',
          theme === 'light'
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
        )}
      >
        <Sun className="w-4 h-4 text-amber-500" />
        Light Mode
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={cn(
          'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all',
          theme === 'dark'
            ? 'bg-slate-900 text-white shadow-sm'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
        )}
      >
        <Moon className="w-4 h-4 text-indigo-400" />
        Dark Mode
      </button>
    </div>
  );
}
