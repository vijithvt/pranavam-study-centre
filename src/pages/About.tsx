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
    { number: '9', label: 'Years of Experience' }
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
                Established in Vilappilsala, Thiruvananthapuram, we have been serving 
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
          </div>
          {/* Story Content */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Timeline / Steps */}
            <div className="relative w-full md:w-2/3">
              {/* Step 1 */}
              <div className="flex md:items-start items-center gap-4 mb-8">
                <div className="flex-shrink-0 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-primary/20">
                  1
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    The Realization
                  </div>
                  <p className="text-gray-600">
                    Pranavam Study Centre was born out of a heartfelt realization: even in a state like Kerala—celebrated for its high literacy and strong academic foundations—many students in rural and semi-urban areas still lacked access to personalized guidance that could unlock their full potential.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex md:items-start items-center gap-4 mb-8">
                <div className="flex-shrink-0 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-primary/20">
                  2
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    Humble Beginnings
                  </div>
                  <p className="text-gray-600">
                    Established in 2016 in Vilappilsala, Thiruvananthapuram, Pranavam began as a humble effort to bridge this gap. What started with just a few passionate tutors helping local students has grown into a trusted educational hub that continues to serve the academic needs of our community with dedication and care.
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex md:items-start items-center gap-4 mb-8">
                <div className="flex-shrink-0 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-primary/20">
                  3
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    Our Approach
                  </div>
                  <p className="text-gray-600">
                    Rooted deeply in Kerala's rich educational values, our approach blends traditional mentorship with modern teaching techniques. We believe that every child learns differently—with their own pace, strengths, and dreams. That's why we thoughtfully pair students with tutors who are not just subject matter experts but also patient mentors, committed to nurturing curiosity and confidence.
                  </p>
                </div>
              </div>
              {/* Step 4 */}
              <div className="flex md:items-start items-center gap-4 mb-8">
                <div className="flex-shrink-0 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-primary/20">
                  4
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    Milestones & Impact
                  </div>
                  <p className="text-gray-600">
                    Over the years, we've become part of countless student journeys—from those who overcame their fear of science and math, to those who found their voice in English communication, and many who simply rediscovered the joy of learning.
                  </p>
                </div>
              </div>
              {/* Step 5 */}
              <div className="flex md:items-start items-center gap-4">
                <div className="flex-shrink-0 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-primary/20">
                  5
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    Today and Beyond
                  </div>
                  <p className="text-gray-600">
                    Today, Pranavam Study Centre stands as a symbol of hope and excellence in Vilappilsala—committed to helping every learner thrive.
                  </p>
                </div>
              </div>
            </div>
            {/* Side Image & Quote */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80"
                alt="Learning journey"
                className="rounded-xl shadow-lg mb-8 w-full max-w-xs md:max-w-none"
              />
              <blockquote className="border-l-4 border-primary bg-white p-6 rounded-lg shadow-inner">
                <span className="italic text-gray-700">
                  “Empowering students by connecting them with mentors who truly care is not just our mission – it’s our passion.”
                </span>
              </blockquote>
            </div>
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
