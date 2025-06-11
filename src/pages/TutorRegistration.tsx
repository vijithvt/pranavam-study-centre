
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Upload, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input name="fullName" id="fullName" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input name="email" id="email" type="email" required className="mt-1" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input name="phone" id="phone" type="tel" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input name="whatsapp" id="whatsapp" type="tel" className="mt-1" />
                </div>
              </div>

              {/* Location */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="district">District *</Label>
                  <Select name="district" required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
                      <SelectItem value="kollam">Kollam</SelectItem>
                      <SelectItem value="pathanamthitta">Pathanamthitta</SelectItem>
                      <SelectItem value="alappuzha">Alappuzha</SelectItem>
                      <SelectItem value="kottayam">Kottayam</SelectItem>
                      <SelectItem value="idukki">Idukki</SelectItem>
                      <SelectItem value="ernakulam">Ernakulam</SelectItem>
                      <SelectItem value="thrissur">Thrissur</SelectItem>
                      <SelectItem value="palakkad">Palakkad</SelectItem>
                      <SelectItem value="malappuram">Malappuram</SelectItem>
                      <SelectItem value="kozhikode">Kozhikode</SelectItem>
                      <SelectItem value="wayanad">Wayanad</SelectItem>
                      <SelectItem value="kannur">Kannur</SelectItem>
                      <SelectItem value="kasaragod">Kasaragod</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="area">Area/Town *</Label>
                  <Input name="area" id="area" required className="mt-1" />
                </div>
              </div>

              {/* Teaching Experience */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="qualification">Highest Qualification *</Label>
                  <Select name="qualification" required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="btech">B.Tech</SelectItem>
                      <SelectItem value="bsc">B.Sc</SelectItem>
                      <SelectItem value="ba">B.A</SelectItem>
                      <SelectItem value="mtech">M.Tech</SelectItem>
                      <SelectItem value="msc">M.Sc</SelectItem>
                      <SelectItem value="ma">M.A</SelectItem>
                      <SelectItem value="phd">Ph.D</SelectItem>
                      <SelectItem value="bed">B.Ed</SelectItem>
                      <SelectItem value="med">M.Ed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experience">Teaching Experience *</Label>
                  <Select name="experience" required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0-1 years</SelectItem>
                      <SelectItem value="1">1-3 years</SelectItem>
                      <SelectItem value="3">3-5 years</SelectItem>
                      <SelectItem value="5">5-10 years</SelectItem>
                      <SelectItem value="10">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Subjects and Classes */}
              <div>
                <Label htmlFor="subjects">Subjects You Can Teach *</Label>
                <Textarea 
                  name="subjects"
                  id="subjects" 
                  required 
                  className="mt-1" 
                  placeholder="e.g., Mathematics, Physics, Chemistry, English, Malayalam..."
                />
              </div>

              <div>
                <Label htmlFor="classes">Classes/Grades You Prefer *</Label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-2">
                  {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map((grade) => (
                    <div key={grade} className="flex items-center space-x-2">
                      <Checkbox name="classes" value={grade} id={grade} />
                      <Label htmlFor={grade} className="text-sm">{grade}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <Label>Preferred Teaching Mode *</Label>
                <div className="flex space-x-6 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox name="teachingMode" value="home" id="home" />
                    <Label htmlFor="home">Home Visit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox name="teachingMode" value="online" id="online" />
                    <Label htmlFor="online">Online</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox name="teachingMode" value="both" id="both" />
                    <Label htmlFor="both">Both</Label>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div>
                <Label htmlFor="languages">Languages Known *</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {['English', 'Malayalam', 'Hindi', 'Tamil'].map((lang) => (
                    <div key={lang} className="flex items-center space-x-2">
                      <Checkbox name="languages" value={lang} id={lang} />
                      <Label htmlFor={lang} className="text-sm">{lang}</Label>
                    </div>
                  ))}
                </div>
              </div>

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
