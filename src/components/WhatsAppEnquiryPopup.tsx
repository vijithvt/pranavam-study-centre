import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface WhatsAppEnquiryPopupProps {
  phoneNumber: string;
}

const WhatsAppEnquiryPopup: React.FC<WhatsAppEnquiryPopupProps> = ({ phoneNumber }) => {
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenWhatsAppPopup');
    if (hasSeenPopup) return;

    const timer = window.setTimeout(() => setIsVisible(true), 30000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    if (!isVisible) return;

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible]);

  const handleDismiss = () => {
    localStorage.setItem('hasSeenWhatsAppPopup', 'true');
    setIsVisible(false);
  };

  const handleOpenForm = () => {
    document.getElementById('home-enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    handleDismiss();
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodeURIComponent('നമസ്കാരം, ക്ലാസുകളെക്കുറിച്ച് അറിയാൻ താല്പര്യപ്പെടുന്നു.')}`;
    const popup = window.open(url, '_blank', 'noopener,noreferrer');

    if (!popup) {
      window.location.href = url;
    }

    handleDismiss();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/45 p-4 backdrop-blur-sm sm:items-center">
      <div ref={popupRef} className="w-full max-w-md rounded-[1.75rem] border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              Quick help
            </p>
            <h2 className="text-xl font-bold text-foreground">Tutor enquiry സഹായം വേണോ?</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              നിങ്ങളുടെ ആവശ്യങ്ങൾ WhatsApp വഴി അയക്കാം അല്ലെങ്കിൽ enquiry form തുറക്കാം.
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleDismiss} className="shrink-0 rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button onClick={handleWhatsApp} className="h-11 rounded-xl bg-success text-success-foreground hover:bg-success/90">
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
          <Button onClick={handleOpenForm} variant="outline" className="h-11 rounded-xl">
            enquiry form തുറക്കൂ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppEnquiryPopup;
