
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m here to help you with questions about tutoring. You can ask me about subjects, classes, pricing, or anything else!',
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Simple rule-based responses - in a real app, this would query your database
    if (message.includes('price') || message.includes('fee') || message.includes('cost')) {
      return 'Our tutoring fees vary by class and subject:\n• Classes 1-6: ₹250-500/hour\n• Classes 7-10: ₹300-600/hour\n• Classes 11-12: ₹350-700/hour\n• Higher Education: ₹400-800/hour\n\nFinal fees depend on tutor experience and requirements.';
    }
    
    if (message.includes('subject') || message.includes('math') || message.includes('science') || message.includes('english')) {
      return 'We offer tutoring for all major subjects including:\n• Mathematics, Physics, Chemistry, Biology\n• English, Hindi, Malayalam\n• Social Sciences, Computer Science\n• Competitive exam prep (NEET, JEE, etc.)\n• Arts and Music\n\nWhat specific subject are you interested in?';
    }
    
    if (message.includes('online') || message.includes('home')) {
      return 'We offer both online and home tutoring options:\n• Home Tuition: Tutor comes to your location\n• Online Tuition: Virtual classes via video call\n• Hybrid: Combination of both\n\nWhich mode would you prefer?';
    }
    
    if (message.includes('register') || message.includes('sign up') || message.includes('join')) {
      return 'Getting started is easy! You can:\n• Click "Find Tutor" to register as a student\n• Click "Join as Tutor" to become a tutor\n• Fill out the form and we\'ll match you with suitable options\n\nWould you like me to guide you through the process?';
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! Welcome to Pranavam Study Centre. I\'m here to help you find the perfect tutor or answer any questions about our services. What would you like to know?';
    }
    
    if (message.includes('contact') || message.includes('phone') || message.includes('whatsapp')) {
      return 'You can reach us at:\n• WhatsApp: +91 94963 15903\n• Use our contact form for detailed inquiries\n• Chat with me for quick questions!\n\nHow can I help you today?';
    }
    
    return 'That\'s a great question! For detailed information about that topic, I\'d recommend:\n• Checking our registration forms for specific details\n• Contacting us directly at +91 94963 15903\n• Or feel free to ask me something else!\n\nIs there anything specific about tutoring I can help with?';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl z-50 animate-bounce"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] bg-white shadow-2xl z-50 flex flex-col animate-scale-in border-0">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6" />
                <CardTitle className="text-lg">Study Assistant</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.isBot && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      {!message.isBot && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about tutoring..."
                  className="flex-1 border-gray-200 focus:border-blue-500"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
