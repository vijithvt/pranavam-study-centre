

import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import HomeImageCarousel from '../components/HomeImageCarousel';
import HomeBenefits from '../components/HomeBenefits';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      {/* Benefits section just after hero */}
      <HomeBenefits />
      {/* AI/Unsplash "student learning" carousel */}
      <HomeImageCarousel />
      <Features />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default Index;

