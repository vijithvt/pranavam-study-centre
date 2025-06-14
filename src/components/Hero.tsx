
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Award } from 'lucide-react';

// Place image imports at the top for clarity
const studentImage1 = '/lovable-uploads/f1375cac-1988-4227-98e7-d4a89e68c1af.png';
const studentImage2 = '/lovable-uploads/319f16a6-e208-4f34-be22-cf30f09fa003.png';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Quality 
                <span className="text-primary"> 1-to-1 Home Tuition</span>
                <br />
                Across Kerala
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with experienced, qualified tutors for personalized 1-to-1 learning at home. 
                Excellence in education, delivered to your doorstep since 2016.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/students">
                <Button size="lg" className="w-full sm:w-auto">
                  Find a Tutor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/tutors">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Join as Tutor
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Expert Tutors</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Subjects</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">8+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Image + Student Bubbles */}
          <div className="relative flex items-center justify-center">
            {/* Main Hero Image */}
            <div className="relative z-10">
              <img
                src={studentImage2}
                alt="Modern classroom setup"
                className="w-full h-auto max-w-lg rounded-2xl shadow-2xl"
              />
            </div>
            {/* Bubble Student Images, absolute position for overlap */}
            <img 
              src={studentImage1}
              alt="Happy student 1"
              className="absolute left-0 bottom-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white shadow-lg hover:scale-105 transition-transform duration-200 animate-fade-in"
              style={{ zIndex: 20 }}
            />
            <img 
              src={studentImage2}
              alt="Happy student 2"
              className="absolute right-0 top-0 w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg hover:scale-105 transition-transform duration-200 animate-fade-in"
              style={{ zIndex: 20 }}
            />
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-primary/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl z-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

