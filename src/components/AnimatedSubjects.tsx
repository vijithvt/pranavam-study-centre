
import React from 'react';
import { Calculator, Atom, Laptop, Brain, Book, Microscope } from 'lucide-react';
import StudentRegistration from '../pages/StudentRegistration';

const AnimatedSubjects = () => {
  const subjects = [
    { icon: Calculator, name: 'Mathematics', color: 'from-blue-500 to-cyan-500', delay: '0s' },
    { icon: Atom, name: 'Physics', color: 'from-purple-500 to-pink-500', delay: '0.5s' },
    { icon: Laptop, name: 'Computer Science', color: 'from-green-500 to-teal-500', delay: '1s' },
    { icon: Brain, name: 'AI & Technology', color: 'from-orange-500 to-red-500', delay: '1.5s' },
    { icon: Book, name: 'Literature', color: 'from-indigo-500 to-purple-500', delay: '2s' },
    { icon: Microscope, name: 'Chemistry', color: 'from-yellow-500 to-orange-500', delay: '2.5s' },
  ];

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Enhanced Background with Animated Gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50/80 to-pink-50/60"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%237c3aed" fill-opacity="0.03"%3E%3Cpath d="M50 50l50-50v100l-50-50zm-50 0l50 50h-100l50-50z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Enhanced Malayalam Header */}
        <div className="text-center mb-8 slide-in-left">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white mb-6 pulse-glow">
            <span className="text-2xl font-bold">🏠</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              കേരളത്തിലെ മികച്ച അധ്യാപകരുമായി വ്യക്തിഗത ക്ലാസുകൾ
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 slide-in-right" style={{animationDelay: '0.2s'}}>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              മലയാളത്തിലും ഇംഗ്ലീഷിലും പഠനം - നിങ്ങളുടെ വീട്ടിൽ നിന്നോ ഓൺലൈനിലോ
            </span>
          </p>
        </div>
        
        {/* Enhanced Student Registration Form */}
        <div className="mb-16 bounce-in" style={{animationDelay: '0.4s'}}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl"></div>
            <div className="relative">
              <StudentRegistration variant="embedded" />
            </div>
          </div>
        </div>
        
        {/* Enhanced Subject Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 slide-in-right" style={{animationDelay: '0.6s'}}>
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Master Every Subject with Expert Guidance
          </span>
        </h2>
        
        {/* Enhanced Subjects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {subjects.map((subject, index) => {
            const IconComponent = subject.icon;
            return (
              <div
                key={subject.name}
                className="group relative bounce-in hover-lift"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                {/* Enhanced Subject Card */}
                <div className={`relative w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${subject.color} p-4 shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-6 pulse-glow`}>
                  <IconComponent className="w-full h-full text-white drop-shadow-lg" />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 rounded-2xl shimmer-effect opacity-0 group-hover:opacity-100"></div>
                </div>
                
                {/* Enhanced Subject Name */}
                <p className="text-center text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 group-hover:scale-105 transform">
                  {subject.name}
                </p>
                
                {/* Enhanced Floating Particles */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                
                {/* Enhanced Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnimatedSubjects;
