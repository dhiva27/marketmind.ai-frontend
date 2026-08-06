'use client';

import React, { useState } from 'react';
import { SplashLoader } from '@/components/landing/SplashLoader';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { MarqueeLogos } from '@/components/landing/MarqueeLogos';
import { ProblemSolution } from '@/components/landing/ProblemSolution';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';
import { InteractiveDemo } from '@/components/landing/InteractiveDemo';
import { HowItWorksAndAudience } from '@/components/landing/HowItWorksAndAudience';
import { Testimonials } from '@/components/landing/Testimonials';
import { PricingSection } from '@/components/landing/PricingSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { CtaSection } from '@/components/landing/CtaSection';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { DemoVideoModal } from '@/components/landing/DemoVideoModal';

export default function Home() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Cinematic Splash Loading Screen */}
      <SplashLoader />

      {/* Navigation Bar */}
      <LandingNavbar />

      {/* Main Landing Sections */}
      <main>
        <HeroSection onOpenDemoModal={() => setDemoModalOpen(true)} />
        <MarqueeLogos />
        <ProblemSolution />
        <FeaturesGrid />
        <InteractiveDemo />
        <HowItWorksAndAudience />
        <Testimonials />
        <PricingSection />
        <FaqSection />
        <CtaSection onOpenDemoModal={() => setDemoModalOpen(true)} />
      </main>

      {/* Footer */}
      <LandingFooter />

      {/* Demo Video Modal */}
      <DemoVideoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}
