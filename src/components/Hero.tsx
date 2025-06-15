import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Award } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Empowering Futures with Kerala’s Top Home Tutors
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Unlock your child’s potential with expert 1-to-1 home tuition—personalized learning, passionate teachers, and proven results. Trusted by families across Kerala since 2016.
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

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/lovable-uploads/319f16a6-e208-4f34-be22-cf30f09fa003.png"
                alt="Modern classroom setup"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
