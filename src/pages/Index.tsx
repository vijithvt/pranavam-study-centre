
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import HighlightedFindTutor from '../components/HighlightedFindTutor';
import AnimatedSubjects from '../components/AnimatedSubjects';
import FloatingContactButtons from '../components/FloatingContactButtons';
import WhatsAppEnquiryPopup from '../components/WhatsAppEnquiryPopup';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <HighlightedFindTutor />
      <AnimatedSubjects />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FloatingContactButtons />
      <WhatsAppEnquiryPopup phoneNumber="+919496315903" />
    </div>
  );
};

export default Index;
