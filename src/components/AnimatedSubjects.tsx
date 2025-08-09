
import React from 'react';
import { Calculator, Atom, Laptop, Brain, Book, Microscope } from 'lucide-react';
import QuickStudentForm from './QuickStudentForm';

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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
      
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            കേരളത്തിലെ മികച്ച അധ്യാപകരുമായി വ്യക്തിഗത ക്ലാസുകൾ
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            മലയാളത്തിലും ഇംഗ്ലീഷിലും പഠനം - നിങ്ങളുടെ വീട്ടിൽ നിന്നോ ഓൺലൈനിലോ
          </p>
        </div>
        
        {/* Quick Student Registration Form */}
        <div className="mb-16">
          <QuickStudentForm />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
          Master Every Subject with Expert Guidance
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {subjects.map((subject, index) => {
            const IconComponent = subject.icon;
            return (
              <div
                key={subject.name}
                className="group relative animate-bounce-in"
                style={{ animationDelay: subject.delay }}
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${subject.color} p-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 group-hover:-rotate-6`}>
                  <IconComponent className="w-full h-full text-white" />
                </div>
                <p className="text-center text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                  {subject.name}
                </p>
                
                {/* Floating particles effect */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnimatedSubjects;
