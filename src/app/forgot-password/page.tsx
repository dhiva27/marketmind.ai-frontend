'use client';

import React from 'react';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { Navbar } from '@/components/common/Navbar';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <ForgotPasswordForm />
      </main>
    </div>
  );
}
