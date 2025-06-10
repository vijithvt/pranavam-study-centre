
import React from 'react';
import { MapPin, Users, BookOpen, Clock, Star, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: 'All Kerala Coverage',
      description: 'Tutors available across all 14 districts of Kerala, from Kasaragod to Thiruvananthapuram.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Users,
      title: 'Verified Tutors',
      description: 'All tutors are background-verified with proper qualifications and teaching experience.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: BookOpen,
      title: 'All Subjects',
      description: 'Mathematics, Science, Languages, Social Studies - expert tutors for every subject.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Clock,
      title: 'Flexible Timing',
      description: 'Choose convenient time slots that work for your family\'s schedule.',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Star,
      title: 'Quality Assured',
      description: 'Regular monitoring and feedback system to ensure the best learning experience.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Trusted platform with verified profiles and secure communication channels.',
      color: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Pranavam Study Centre?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We connect families with the most qualified and dedicated home tutors across Kerala, 
            ensuring personalized learning experiences for every student.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-gray-100"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
