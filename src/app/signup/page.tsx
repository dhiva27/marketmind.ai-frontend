'use client';

import React from 'react';
import { SignupForm } from '@/components/auth/SignupForm';
import { Navbar } from '@/components/common/Navbar';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <SignupForm />
      </main>
    </div>
  );
}
