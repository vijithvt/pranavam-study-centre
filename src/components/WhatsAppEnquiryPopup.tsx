
import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

interface WhatsAppEnquiryPopupProps {
  phoneNumber: string;
}

const WhatsAppEnquiryPopup: React.FC<WhatsAppEnquiryPopupProps> = ({ phoneNumber }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [userType, setUserType] = useState('parent');
  const [enquiry, setEnquiry] = useState('');
  const [hasShown, setHasShown] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Show popup after 60 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('hasSeenWhatsAppPopup');
      if (!hasSeenPopup) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, 60000); // 60 seconds

    return () => clearTimeout(timer);
  }, []);

  // Handle mouse leave event
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves towards the top of the page
      if (e.clientY <= 0 && !hasShown && window.scrollY > window.innerHeight * 0.7) {
        setIsVisible(true);
        setHasShown(true);
      }
    };
    
    // Handle scroll event - show popup when user scrolls to bottom
    const handleScroll = () => {
      const scrolledToBottom = 
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 300;
      
      if (scrolledToBottom && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Add event listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    // Check if we should show popup based on localStorage
    const hasSeenPopup = localStorage.getItem('hasSeenWhatsAppPopup');
    if (hasSeenPopup) {
      setHasShown(true);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasShown]);

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the WhatsApp message
    const message = `Name: ${name}%0A
WhatsApp: ${whatsAppNumber}%0A
I am a: ${userType}%0A
Enquiry: ${enquiry}`;
    
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${message}`, '_blank');
    
    // Set localStorage to remember that user has seen the popup
    localStorage.setItem('hasSeenWhatsAppPopup', 'true');
    setIsVisible(false);
  };

  // If not visible, don't render anything
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <Card className="w-full max-w-md relative overflow-hidden bg-white shadow-2xl" ref={popupRef}>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
        
        <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-green-100">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsVisible(false)} 
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 hover:bg-white/50"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-xl font-bold text-center text-green-600">
            Quick WhatsApp Enquiry
          </CardTitle>
        </CardHeader>
        
        <CardContent className="bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="Enter your name"
                className="focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input 
                id="whatsapp" 
                value={whatsAppNumber} 
                onChange={(e) => setWhatsAppNumber(e.target.value)} 
                required 
                placeholder="Enter your WhatsApp number"
                className="focus:ring-green-500 focus:border-green-500"
                type="tel"
              />
            </div>
            
            <div className="space-y-2">
              <Label>I am a</Label>
              <RadioGroup defaultValue="parent" onValueChange={setUserType} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="parent" id="parent" />
                  <Label htmlFor="parent" className="cursor-pointer">Parent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teacher" id="teacher" />
                  <Label htmlFor="teacher" className="cursor-pointer">Teacher</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="enquiry">Your Enquiry</Label>
              <Textarea 
                id="enquiry" 
                value={enquiry} 
                onChange={(e) => setEnquiry(e.target.value)} 
                required 
                placeholder="How can we help you?"
                className="focus:ring-green-500 focus:border-green-500"
              />
            </div>
          
            <CardFooter className="px-0 pb-0">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="h-4 w-4" />
                Send via WhatsApp
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppEnquiryPopup;
