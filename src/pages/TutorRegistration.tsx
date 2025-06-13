
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Upload, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import TutorPersonalInfoSection from '@/components/forms/TutorPersonalInfoSection';
import LocationSection from '@/components/forms/LocationSection';
import TutorQualificationSection from '@/components/forms/TutorQualificationSection';

const TutorRegistration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    
    // Get checkbox values
    const classes = Array.from(formData.getAll('classes'));
    const languages = Array.from(formData.getAll('languages'));
    
    try {
      const { error } = await supabase
        .from('tutor_registrations')
        .insert({
          full_name: formData.get('fullName') as string,
          email: formData.get('email') as string,
          phone: formData.get('phone') as string,
          district: formData.get('district') as string,
          location: formData.get('area') as string,
          subjects: [formData.get('subjects') as string],
          classes: classes as string[],
          qualification: formData.get('qualification') as string,
          experience: parseInt(formData.get('experience') as string) || 0,
          availability: formData.get('mode') as string,
          languages: languages as string[],
          mode: formData.get('teachingMode') as string
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Registration Successful!",
        description: "We'll review your application and contact you within 24 hours.",
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting registration:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-12 pb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Registration Complete!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for joining Pranavam Study Centre. We'll review your application and contact you within 24 hours.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="w-full">
              Register Another Tutor
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <UserPlus className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Become a Tutor</h1>
          </div>
          <p className="text-xl text-gray-600">
            Join our network of qualified educators and make a difference in students' lives
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tutor Registration Form</CardTitle>
            <CardDescription>
              Please fill out all required information to join our tutor network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <TutorPersonalInfoSection />
              <LocationSection />
              <TutorQualificationSection />

              {/* File Uploads */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resume">Upload Resume/CV *</Label>
                  <div className="mt-1 flex items-center space-x-2">
                    <Input id="resume" type="file" accept=".pdf,.doc,.docx" required />
                    <Upload className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="certificates">Upload Qualification Certificates *</Label>
                  <div className="mt-1 flex items-center space-x-2">
                    <Input id="certificates" type="file" accept=".pdf,.jpg,.jpeg,.png" multiple required />
                    <Upload className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <Label htmlFor="bio">Tell us about yourself</Label>
                <Textarea 
                  id="bio" 
                  className="mt-1" 
                  placeholder="Share your teaching philosophy, achievements, or any additional information..."
                />
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the terms and conditions and confirm that all information provided is accurate. 
                  I understand that Pranavam Study Centre may verify the information and contact me for interviews.
                </Label>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full btn-primary text-lg py-6">
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TutorRegistration;
