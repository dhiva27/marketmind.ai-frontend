'use client';

import React, { useState } from 'react';
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <LandingNavbar />

      {/* Main Landing Sections */}
      <main>
        <HeroSection onOpenDemoModal={() => setDemoModalOpen(true)} />
        <ProblemSolution />
        <FeaturesGrid />
        <HowItWorksAndAudience />
        <Testimonials />
        <MarqueeLogos />
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
