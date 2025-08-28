
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Find a Tutor', path: '/students', highlight: true },
    { name: 'Join as Tutor', path: '/tutors' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/f1375cac-1988-4227-98e7-d4a89e68c1af.png" 
              alt="Pranavam Study Centre" 
              className="h-8 w-8"
            />
            <span className="font-bold text-xl text-primary">Pranavam Study Centre</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-primary font-semibold'
                    : item.highlight
                    ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary bg-blue-50'
                      : item.highlight
                      ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
