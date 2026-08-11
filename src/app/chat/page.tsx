'use client';

import React from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { ChatArea } from '@/components/chat/ChatArea';

export default function ChatPage() {
  return (
    <div className="h-screen flex overflow-hidden bg-white text-slate-900 relative">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <ChatArea />
      </div>
    </div>
  );
}
