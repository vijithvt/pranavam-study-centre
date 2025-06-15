import React from 'react';
import Hero from '../components/Hero';
import LearnSearchBox from '../components/LearnSearchBox';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import HomeBenefits from '../components/HomeBenefits';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="px-2 md:px-0">
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
