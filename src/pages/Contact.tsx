
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 98765 43210',
      subtext: 'Available Mon-Sat, 9 AM - 8 PM'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@pranavamstudycentre.com',
      subtext: 'We respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Pranavam Study Centre',
      subtext: 'Serving all districts of Kerala'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: '+91 98765 43210',
      subtext: 'Quick queries and updates'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our tutoring services? We're here to help! 
            Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required className="mt-1" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="district">District</Label>
                      <Input id="district" className="mt-1" placeholder="Your district in Kerala" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" required className="mt-1" placeholder="What is your message about?" />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      required 
                      className="mt-1 min-h-[120px]" 
                      placeholder="Tell us more about your requirements or questions..."
                    />
                  </div>

                  <Button type="submit" className="w-full btn-primary">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-700 font-medium mb-1">
                        {info.details}
                      </p>
                      <p className="text-sm text-gray-500">
                        {info.subtext}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Quick Actions */}
            <Card className="bg-primary text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a 
                    href="/students" 
                    className="block w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <div className="font-medium">Find a Tutor</div>
                    <div className="text-sm opacity-90">Submit your requirements</div>
                  </a>
                  <a 
                    href="/tutors" 
                    className="block w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <div className="font-medium">Join as Tutor</div>
                    <div className="text-sm opacity-90">Start teaching with us</div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-gray-900">Office Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How do you select tutors?
                </h3>
                <p className="text-gray-600 text-sm">
                  All our tutors undergo a rigorous verification process including qualification checks, 
                  background verification, and interview assessments.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  What are your charges?
                </h3>
                <p className="text-gray-600 text-sm">
                  We don't charge students or parents. Our service is completely free. 
                  You only pay the tutor directly based on mutually agreed fees.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How quickly can I get a tutor?
                </h3>
                <p className="text-gray-600 text-sm">
                  We typically connect you with suitable tutors within 24-48 hours of receiving your request.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Do you provide online tutoring?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes! Many of our tutors offer both home visits and online tutoring options 
                  to suit your preferences and convenience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
