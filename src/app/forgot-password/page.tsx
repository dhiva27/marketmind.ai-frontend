'use client';

import React from 'react';
import { AuthLeftPanel } from '@/components/auth/AuthLeftPanel';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-purple-600 selection:text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[1380px] min-h-[780px] bg-white rounded-[24px] border border-slate-200/80 shadow-2xl shadow-slate-200/50 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
      >
        {/* Left 50% Panel */}
        <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-slate-100">
          <AuthLeftPanel />
        </div>

        {/* Right 50% Panel */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <ForgotPasswordForm />
        </div>
      </motion.div>
    </div>
  );
}
