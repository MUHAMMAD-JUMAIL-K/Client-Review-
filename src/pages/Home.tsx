import React from 'react';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Features } from '../components/landing/Features';
import { TrustSection } from '../components/landing/TrustSection';
import { FAQ } from '../components/landing/FAQ';
import { FinalCTA } from '../components/landing/FinalCTA';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen space-y-0">
      <Hero />
      <HowItWorks />
      <Features />
      <TrustSection />
      <FAQ />
      <FinalCTA />
    </div>
  );
};
