
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
      {/* WhatsApp Button Only */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleWhatsApp}
          className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-110 animate-bounce"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};

export default FloatingContactButtons;
