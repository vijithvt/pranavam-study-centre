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
              <div className="text-center mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  കേരളത്തിലെ മികച്ച അധ്യാപകരുമായി വ്യക്തിഗത ക്ലാസുകൾ
                </h2>
                <p className="text-lg text-gray-600">
                  മലയാളത്തിലും ഇംഗ്ലീഷിലും പഠനം - നിങ്ങളുടെ വീട്ടിൽ നിന്നോ ഓൺലൈനിലോ
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Personalized live classes with top teachers
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                <span className="font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Personalized live 1‑on‑1 classes
                </span>{" "}
                with top teachers — tailored lessons, daily progress, and proven results.
                <span className="ml-1 font-medium text-gray-900">Trusted by families across Kerala since 2016.</span>
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
                src="/lovable-uploads/a2a584b4-0ae8-4d70-9e01-dc194aebdc8b.png"
                alt="Student attending live online class with top teacher"
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
