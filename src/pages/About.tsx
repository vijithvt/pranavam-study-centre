
import React from 'react';
import { Users, Award, MapPin, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Users,
      title: 'Student-Centered Approach',
      description: 'Every decision we make is focused on improving student learning outcomes and experiences.'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in tutor selection and educational service delivery.'
    },
    {
      icon: MapPin,
      title: 'Local Community Focus',
      description: 'Deeply rooted in Kerala\'s culture and educational traditions, serving every district.'
    },
    {
      icon: Heart,
      title: 'Caring Support',
      description: 'We care about each student\'s journey and provide personalized attention to their needs.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Verified Tutors' },
    { number: '1000+', label: 'Happy Students' },
    { number: '14', label: 'Districts Covered' },
    { number: '5', label: 'Years of Experience' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="kerala-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Pranavam Study Centre
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Bridging the gap between passionate educators and eager learners across Kerala, 
              one personalized tutoring session at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Pranavam Study Centre, we believe that every student deserves access to quality education 
                tailored to their unique learning style. Our mission is to connect students across Kerala 
                with qualified, passionate tutors who can unlock their full potential.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded with the vision of making quality education accessible to all, we have been serving 
                families across Kerala by providing personalized home tuition services that respect both 
                traditional values and modern educational needs.
              </p>
              <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                <p className="text-gray-700 italic">
                  "Education is the most powerful weapon which you can use to change the world. 
                  We're here to put that weapon in the hands of every Kerala student."
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Students learning together"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at Pranavam Study Centre
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
          </div>
          
          <div className="prose prose-lg mx-auto text-gray-600">
            <p>
              Pranavam Study Centre was born out of a simple observation: while Kerala has always 
              been known for its high literacy rates and educational excellence, many students 
              still struggled to get the personalized attention they needed to truly excel.
            </p>
            
            <p>
              Founded in 2019, we started as a small initiative to connect local tutors with 
              students in Kochi. What began as a community effort has now grown into Kerala's 
              most trusted platform for home tuition services, serving families across all 14 districts.
            </p>
            
            <p>
              Our approach is deeply rooted in Kerala's educational traditions while embracing 
              modern teaching methodologies. We understand that each student is unique, with 
              their own learning pace, style, and aspirations. That's why we carefully match 
              students with tutors who not only have subject expertise but also the patience 
              and dedication to nurture young minds.
            </p>
            
            <p>
              Today, we're proud to be part of hundreds of success stories across Kerala - 
              from students who discovered their love for mathematics to those who gained 
              confidence in English communication, from exam toppers to students who simply 
              learned to enjoy learning again.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 kerala-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Whether you're a student seeking knowledge or an educator ready to share it, 
            Pranavam Study Centre is here to connect you with the right opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/students"
              className="inline-flex items-center bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Find a Tutor
            </a>
            <a
              href="/tutors"
              className="inline-flex items-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Become a Tutor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
