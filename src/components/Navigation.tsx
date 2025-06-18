
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/lovable-uploads/f1375cac-1988-4227-98e7-d4a89e68c1af.png" alt="Pranavam Study Centre" className="h-10 w-10 mr-3" />
              <span className="text-xl font-bold text-primary">Pranavam Study Centre</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors ${isActive('/about') ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'}`}
            >
              About
            </Link>
            <Link 
              to="/students" 
              className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                isActive('/students') 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105'
              } animate-pulse`}
            >
              Find Tutor
            </Link>
            <Link 
              to="/tutors" 
              className={`transition-colors ${isActive('/tutors') ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'}`}
            >
              Join as Tutor
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors ${isActive('/contact') ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'}`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className={`block px-3 py-2 transition-colors ${isActive('/') ? 'text-primary font-medium bg-blue-50' : 'text-gray-700 hover:text-primary'}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`block px-3 py-2 transition-colors ${isActive('/about') ? 'text-primary font-medium bg-blue-50' : 'text-gray-700 hover:text-primary'}`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/students"
                className={`block px-3 py-2 rounded-lg font-medium transition-all ${
                  isActive('/students') 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-md'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Find Tutor ⭐
              </Link>
              <Link
                to="/tutors"
                className={`block px-3 py-2 transition-colors ${isActive('/tutors') ? 'text-primary font-medium bg-blue-50' : 'text-gray-700 hover:text-primary'}`}
                onClick={() => setIsOpen(false)}
              >
                Join as Tutor
              </Link>
              <Link
                to="/contact"
                className={`block px-3 py-2 transition-colors ${isActive('/contact') ? 'text-primary font-medium bg-blue-50' : 'text-gray-700 hover:text-primary'}`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
