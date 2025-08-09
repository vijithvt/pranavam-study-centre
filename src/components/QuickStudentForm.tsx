import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, ArrowRight, Phone, Mail, MapPin, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const QuickStudentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const studentName = formData.get('studentName') as string;
    const parentName = formData.get('parentName') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const classGrade = formData.get('classGrade') as string;
    const subject = formData.get('subject') as string;

    // Basic validation
    if (!studentName?.trim() || !parentName?.trim() || !phone?.trim() || !email?.trim() || !classGrade || !subject?.trim()) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required for quick registration.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('student_registrations')
        .insert({
          student_name: studentName,
          parent_name: parentName,
          phone: phone,
          email: email,
          class_grade: classGrade,
          subjects: [subject],
          mode: 'both',
          district: 'Not specified',
          location: 'Will be contacted',
          time_preference: 'flexible',
          monthly_budget: 5000,
          special_requests: 'Quick registration - needs followup call',
          is_quick_registration: true
        });

      if (error) throw error;

      // Send admin notification
      try {
        await supabase.functions.invoke('send-admin-notification', {
          body: {
            type: 'student',
            registration: {
              student_name: studentName,
              parent_name: parentName,
              phone: phone,
              email: email,
              class_grade: classGrade,
              subjects: [subject],
              mode: 'both',
              district: 'Not specified',
              location: 'Will be contacted',
              time_preference: 'flexible',
              monthly_budget: 5000,
              special_requests: 'Quick registration - needs followup call',
              created_at: new Date().toISOString()
            }
          }
        });
      } catch (notificationError) {
        console.error('Failed to send admin notification:', notificationError);
      }

      setIsSubmitted(true);
      toast({
        title: "Registration Successful!",
        description: "We'll contact you within 24 hours to discuss your requirements.",
      });
    } catch (error) {
      console.error('Error submitting registration:', error);
      toast({
        title: "Registration Failed",
        description: "Please try again or use the detailed registration form.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
          <p className="text-green-700 mb-4">
            We've received your registration. Our team will contact you within 24 hours.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="border-green-500 text-green-700 hover:bg-green-50"
          >
            Register Another Student
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-sm shadow-xl border-0">
      <CardContent className="p-6 sm:p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Quick Registration
          </h3>
          <p className="text-gray-600">
            Get matched with the perfect tutor in just 2 minutes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">Student Name *</label>
              </div>
              <Input
                name="studentName"
                placeholder="Enter student name"
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">Parent Name *</label>
              </div>
              <Input
                name="parentName"
                placeholder="Enter parent/guardian name"
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">Phone Number *</label>
              </div>
              <Input
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">Email *</label>
              </div>
              <Input
                name="email"
                type="email"
                placeholder="Enter email address"
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">Class/Grade *</label>
              </div>
              <select 
                name="classGrade" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select class/grade</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="5">Class 5</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
                <option value="btech">B.Tech</option>
                <option value="bsc">B.Sc</option>
                <option value="ba">B.A</option>
                <option value="bcom">B.Com</option>
                <option value="neet">NEET</option>
                <option value="jee">JEE</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">Primary Subject *</label>
              </div>
              <Input
                name="subject"
                placeholder="e.g., Mathematics, Physics, English"
                required
                className="w-full"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold py-3 text-lg"
          >
            {isSubmitting ? 'Submitting...' : 'Get My Perfect Tutor'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            Need more customization? Use our{' '}
            <a href="/students" className="text-primary hover:underline font-medium">
              detailed registration form
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuickStudentForm;