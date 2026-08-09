'use client';

import React from 'react';
import { Edit3 } from 'lucide-react';

export function Header() {
  return (
    <header className="h-12 bg-transparent px-6 flex items-center justify-end select-none z-30 shrink-0 absolute top-0 right-0 left-16 sm:left-[74px] pointer-events-none">
      {/* Top-Right: Small minimal action icon matching Second Reference Image */}
      <button
        className="p-2 text-[#B8AFC4] hover:text-white hover:bg-purple-900/20 rounded-xl transition-colors pointer-events-auto"
        title="New Action"
      >
        <Edit3 className="w-4.5 h-4.5 stroke-[1.75]" />
      </button>
    </header>
  );
}
