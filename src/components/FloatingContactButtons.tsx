
import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

const FloatingContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '+919496315903';

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=Hi, I'm interested in tutoring services from Pranavam Study Centre`, '_blank');
  };

  return (
    <>
      {/* Main floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-110 animate-bounce"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {/* Contact options popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 space-y-3 animate-fade-in">
          {/* WhatsApp Button */}
          <div className="flex items-center gap-3">
            <span className="bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-700 whitespace-nowrap animate-slide-in-right">
              WhatsApp Us
            </span>
            <button
              onClick={handleWhatsApp}
              className="w-12 h-12 bg-green-500 rounded-full shadow-xl flex items-center justify-center text-white hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default FloatingContactButtons;
