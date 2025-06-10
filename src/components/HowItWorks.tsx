
import React from 'react';
import { UserPlus, Search, BookOpen } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Register Your Details',
      description: 'Tell us about your learning needs - subjects, class, location, and preferred timing.',
      step: '01'
    },
    {
      icon: Search,
      title: 'We Find Perfect Matches',
      description: 'Our team matches you with qualified tutors in your area based on your requirements.',
      step: '02'
    },
    {
      icon: BookOpen,
      title: 'Start Learning',
      description: 'Connect with your tutor and begin your personalized learning journey at home.',
      step: '03'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting started with quality home tuition is simple and straightforward
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                {step.step}
              </div>
              
              {/* Content */}
              <div className="bg-gray-50 p-8 pt-12 rounded-2xl card-hover">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-6 w-12 h-0.5 bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
