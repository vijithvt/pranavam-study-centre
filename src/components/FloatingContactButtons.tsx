import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const phoneNumber = '919496315903';
const defaultMessage = 'നമസ്കാരം, ക്ലാസുകളെക്കുറിച്ച് അറിയാൻ താല്പര്യപ്പെടുന്നു.';

const FloatingContactButtons = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    const popup = window.open(url, '_blank', 'noopener,noreferrer');

    if (!popup) {
      window.location.href = url;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={handleWhatsApp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group flex h-14 items-center gap-3 rounded-full bg-success px-4 text-success-foreground shadow-[0_20px_50px_hsl(var(--success)/0.35)] transition-all duration-300 hover:scale-[1.02] hover:bg-success/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Send enquiry on WhatsApp"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-success-foreground/15">
          <MessageCircle className="h-5 w-5" />
        </span>
        <span className={`overflow-hidden text-sm font-semibold transition-all duration-300 ${isHovered ? 'max-w-32 opacity-100' : 'max-w-0 opacity-0 sm:max-w-32 sm:opacity-100'}`}>
          WhatsApp
        </span>
      </button>
    </div>
  );
};

export default FloatingContactButtons;
