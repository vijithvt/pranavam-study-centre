
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import HomeBenefits from '../components/HomeBenefits';
// Removed LearnSearchBox import

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      {/* Removed Searchbox from home page as requested */}
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
