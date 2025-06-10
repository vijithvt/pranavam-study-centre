import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, MapPin, BookOpen } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center kerala-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                🌟 Trusted by 500+ families across Kerala
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find the Perfect
              <span className="block text-gradient bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Home Tutor
              </span>
              in Kerala
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Connect with qualified, experienced tutors for personalized home tuitions. 
              Quality education delivered to your doorstep across all districts of Kerala.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/students"
                className="inline-flex items-center bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Find a Tutor
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/tutors"
                className="inline-flex items-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Become a Tutor
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-white mr-2" />
                  <span className="text-2xl font-bold text-white">500+</span>
                </div>
                <p className="text-white/80 text-sm">Active Tutors</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 text-white mr-2" />
                  <span className="text-2xl font-bold text-white">4.8</span>
                </div>
                <p className="text-white/80 text-sm">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="h-5 w-5 text-white mr-2" />
                  <span className="text-2xl font-bold text-white">14</span>
                </div>
                <p className="text-white/80 text-sm">Districts Covered</p>
              </div>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Student learning with tutor"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
