
import React from 'react';
import { Award, Users, MonitorPlay, BarChart3 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Award,
      title: 'Top Expert Teachers',
      description: "Learn from India's best teachers",
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Users,
      title: '1-on-1 or Small Group Batches',
      description: 'Smaller batch size, more personal attention',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: MonitorPlay,
      title: 'Interactive Live Classes',
      description: 'Real time live classes, learn just like offline classroom',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: BarChart3,
      title: 'Assessments',
      description: 'Quizzes, Assessment, Reports to evaluate daily outcomes',
      color: 'bg-purple-100 text-purple-600'
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
