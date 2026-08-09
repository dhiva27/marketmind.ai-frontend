'use client';

import React from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Header } from '@/components/common/Header';
import { ChatArea } from '@/components/chat/ChatArea';

export default function ChatPage() {
  return (
    <div className="h-screen flex overflow-hidden bg-[#100018] text-white relative">
      {/* 74px Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <Header />
        <ChatArea />
      </div>
    </div>
  );
}
