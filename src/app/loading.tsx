import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="w-10 h-10 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mb-4" />
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Loading MarketMind AI...</p>
    </div>
  );
}
