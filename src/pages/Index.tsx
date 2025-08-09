
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import AnimatedSubjects from '../components/AnimatedSubjects';
import FloatingContactButtons from '../components/FloatingContactButtons';
import WhatsAppEnquiryPopup from '../components/WhatsAppEnquiryPopup';
import Chatbot from '../components/Chatbot';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <AnimatedSubjects />
      <Features />
      <HowItWorks />
      <About />
      <Testimonials />
      <FloatingContactButtons />
      <WhatsAppEnquiryPopup phoneNumber="+919496315903" />
      <Chatbot />
    </div>
  );
};

export default Index;
