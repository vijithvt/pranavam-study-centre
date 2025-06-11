
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/image1.png" alt="Pranavam Study Centre" className="h-10 w-10 mr-3" />
              <h3 className="text-xl font-bold">Pranavam Study Centre</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Connecting passionate educators with eager learners across Kerala. 
              Quality education delivered to your doorstep since 2016.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span className="text-gray-300">
                  Elavoorkkonam, Vilappilsala-Kundamoozhi Temple Rd, near Green Valley International School, Vilappilsala, Kerala 695573
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span className="text-gray-300">+91 94963 15903</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <span className="text-gray-300">pranavamonline@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/students" className="text-gray-300 hover:text-white transition-colors">
                  Find a Tutor
                </Link>
              </li>
              <li>
                <Link to="/tutors" className="text-gray-300 hover:text-white transition-colors">
                  Join as Tutor
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Home Tuition</li>
              <li>Online Classes</li>
              <li>Exam Preparation</li>
              <li>Subject Specialization</li>
              <li>Personalized Learning</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Pranavam Study Centre. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <Link 
                to="/auth" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
