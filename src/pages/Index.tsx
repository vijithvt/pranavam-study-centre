import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import HomeBenefits from '../components/HomeBenefits';
import LearnSearchBox from '@/components/LearnSearchBox';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      {/* Learn searchbox */}
      <div className="w-full flex flex-col items-center mt-0 mb-8">
        <LearnSearchBox />
      </div>
      {/* Benefits section just after hero */}
      <HomeBenefits />
      {/* Removed HomeImageCarousel as requested */}
      <Features />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default Index;
