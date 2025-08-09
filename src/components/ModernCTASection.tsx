import React from 'react';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

const ModernCTASection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-400/20 rounded-full blur-2xl float-animation" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content */}
        <div className="slide-in-left">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white mb-6 pulse-glow">
            <Sparkles className="w-8 h-8" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              Ready to Transform
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
              Your Learning Journey?
            </span>
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed slide-in-right" style={{animationDelay: '0.3s'}}>
            Join thousands of successful students who have achieved their academic goals with our expert tutors. 
            Your success story starts here.
          </p>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center bounce-in" style={{animationDelay: '0.6s'}}>
          <a
            href="#registration"
            className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 hover-lift shimmer-effect"
          >
            <span className="text-lg">Start Learning Today</span>
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
          </a>
          
          <button className="group relative inline-flex items-center px-10 py-5 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover-lift">
            <span className="text-lg">Learn More</span>
            <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto slide-in-left" style={{animationDelay: '0.9s'}}>
          {[
            { icon: '🏆', title: 'Award Winning', desc: 'Kerala\'s Best Tuition Service 2023' },
            { icon: '⚡', title: 'Quick Matching', desc: 'Find your tutor within 24 hours' },
            { icon: '🔒', title: 'Verified Tutors', desc: '100% background checked experts' }
          ].map((item, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover-lift group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/80 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernCTASection;