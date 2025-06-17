
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Users } from 'lucide-react';

const HighlightedFindTutor = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:50px_50px] animate-pulse"></div>
      </div>
      
      {/* Floating shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400/20 rounded-full blur-lg animate-ping"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent animate-pulse">
              Tutor Today!
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who've achieved academic excellence with our expert tutors
          </p>
        </div>

        {/* Stats with icons */}
        <div className="grid grid-cols-3 gap-8 mb-10 animate-slide-in-right">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
              <Star className="w-8 h-8 text-yellow-300" />
            </div>
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-blue-200 text-sm">Expert Tutors</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
              <Clock className="w-8 h-8 text-green-300" />
            </div>
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-blue-200 text-sm">Support</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
              <Users className="w-8 h-8 text-purple-300" />
            </div>
            <div className="text-2xl font-bold text-white">10K+</div>
            <div className="text-blue-200 text-sm">Happy Students</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-bounce-in">
          <Link to="/students">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 group"
            >
              Start Learning Now
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
          
          <p className="text-blue-200 mt-4 text-sm">
            ✨ Quick registration • No hidden fees • Verified tutors only
          </p>
        </div>
      </div>
    </section>
  );
};

export default HighlightedFindTutor;
