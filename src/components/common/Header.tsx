'use client';

import React from 'react';
import { Edit3 } from 'lucide-react';

export function Header() {
  return (
    <header className="h-12 bg-transparent px-4 sm:px-6 flex items-center justify-end select-none z-30 shrink-0">
      {/* Top-Right: Small white outline icon matching reference image */}
      <button
        className="p-2 text-slate-300 hover:text-white hover:bg-purple-900/20 rounded-xl transition-colors"
        title="Canvas Mode"
      >
        <Edit3 className="w-4.5 h-4.5 stroke-[1.75]" />
      </button>
    </header>
  );
}
