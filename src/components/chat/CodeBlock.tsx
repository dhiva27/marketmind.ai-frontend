'use client';

import React from 'react';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  language?: string;
  code: string;
}

export function CodeBlock({ language = 'text', code }: CodeBlockProps) {
  return (
    <div className="relative my-3 rounded-xl border border-slate-700/60 bg-slate-950 overflow-hidden text-slate-100 shadow-md font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400">
        <span className="text-[11px] font-semibold uppercase tracking-wide">{language}</span>
        <CopyButton content={code} className="text-slate-400 hover:text-white hover:bg-slate-800" />
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="whitespace-pre">{code}</pre>
      </div>
    </div>
  );
}
