import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, User, BookOpen, MapPin, Calendar, Send, Sparkles } from 'lucide-react';
import BudgetSliderSection from './BudgetSliderSection';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ModernStudentRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    classGrade: '',
    subjects: [] as string[],
    district: '',
    area: '',
    mode: '',
    budget: 5000,
    timePreference: '',
    specialRequests: ''
  });
  const { toast } = useToast();

  const steps = [
    {
      title: "Let's start with basics",
      icon: User,
      fields: ['studentName', 'parentName', 'email', 'phone', 'classGrade']
    },
    {
      title: "What subjects do you need help with?",
      icon: BookOpen,
      fields: ['subjects']
    },
    {
      title: "Where are you located?",
      icon: MapPin,
      fields: ['district', 'area', 'mode']
    },
    {
      title: "Schedule & Budget preferences",
      icon: Calendar,
      fields: ['budget', 'timePreference', 'specialRequests']
    }
  ];

  const classes = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    'BTech', 'BSc', 'BA', 'BCom', 'LLB', 'MTech', 'MSc', 'MA', 'MCom',
    'NEET', 'JEE', 'UPSC', 'PSC'
  ];

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'Malayalam',
    'Social Science', 'History', 'Geography', 'Computer Science', 'Accountancy'
  ];

  const districts = [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 'Idukki',
    'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('student_registrations')
        .insert({
          student_name: formData.studentName,
          parent_name: formData.parentName,
          email: formData.email,
          phone: formData.phone,
          class_grade: formData.classGrade,
          subjects: formData.subjects,
          district: formData.district,
          location: formData.area,
          mode: formData.mode,
          monthly_budget: formData.budget,
          time_preference: formData.timePreference,
          special_requests: formData.specialRequests
        });

      if (error) throw error;

      // Send admin notification
      try {
        await supabase.functions.invoke('send-admin-notification', {
          body: {
            type: 'student',
            registration: {
              student_name: formData.studentName,
              parent_name: formData.parentName,
              email: formData.email,
              phone: formData.phone,
              class_grade: formData.classGrade,
              subjects: formData.subjects,
              district: formData.district,
              location: formData.area,
              mode: formData.mode,
              monthly_budget: formData.budget,
              time_preference: formData.timePreference,
              special_requests: formData.specialRequests,
              created_at: new Date().toISOString()
            }
          }
        });
      } catch (notificationError) {
        console.error('Failed to send admin notification:', notificationError);
      }

      toast({
        title: "Registration Successful!",
        description: "We'll find the perfect tutor for you and contact you soon.",
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

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl border-0 overflow-hidden">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Registration Complete!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for choosing Pranavam Study Centre. We'll find the perfect tutor for you and contact you within 24 hours.
          </p>
          <Button 
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(0);
              setFormData({
                studentName: '',
                parentName: '',
                email: '',
                phone: '',
                classGrade: '',
                subjects: [],
                district: '',
                area: '',
                mode: '',
                budget: 5000,
                timePreference: '',
                specialRequests: ''
              });
            }}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
          >
            Register Another Student
          </Button>
        </CardContent>
      </Card>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentName" className="text-sm font-medium text-gray-700">Student Name</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => updateFormData('studentName', e.target.value)}
                  placeholder="Enter student's full name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="parentName" className="text-sm font-medium text-gray-700">Parent/Guardian Name</Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => updateFormData('parentName', e.target.value)}
                  placeholder="Enter parent's name"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="your@email.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="classGrade" className="text-sm font-medium text-gray-700">Class/Grade</Label>
              <Select value={formData.classGrade} onValueChange={(value) => updateFormData('classGrade', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select class or grade" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <p className="text-gray-600">Select the subjects you need help with:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {subjects.map((subject) => (
                <label
                  key={subject}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.subjects.includes(subject)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(subject)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFormData('subjects', [...formData.subjects, subject]);
                      } else {
                        updateFormData('subjects', formData.subjects.filter(s => s !== subject));
                      }
                    }}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{subject}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="district" className="text-sm font-medium text-gray-700">District</Label>
                <Select value={formData.district} onValueChange={(value) => updateFormData('district', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="area" className="text-sm font-medium text-gray-700">Area/Location</Label>
                <Input
                  id="area"
                  value={formData.area}
                  onChange={(e) => updateFormData('area', e.target.value)}
                  placeholder="Enter your area or location"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="mode" className="text-sm font-medium text-gray-700">Preferred Learning Mode</Label>
              <Select value={formData.mode} onValueChange={(value) => updateFormData('mode', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="How would you like to learn?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home Tuition</SelectItem>
                  <SelectItem value="online">Online Classes</SelectItem>
                  <SelectItem value="both">Both (Flexible)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-4 block">Monthly Budget</Label>
              <BudgetSliderSection 
                onBudgetChange={(budget) => updateFormData('budget', budget)}
                defaultBudget={formData.budget}
              />
            </div>
            <div>
              <Label htmlFor="timePreference" className="text-sm font-medium text-gray-700">Preferred Time</Label>
              <Select value={formData.timePreference} onValueChange={(value) => updateFormData('timePreference', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="When would you prefer classes?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
                  <SelectItem value="evening">Evening (6 PM - 10 PM)</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="specialRequests" className="text-sm font-medium text-gray-700">Special Requirements (Optional)</Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => updateFormData('specialRequests', e.target.value)}
                placeholder="Any specific requirements or preferences..."
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl border-0 overflow-hidden">
      <CardContent className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white mx-auto mb-4">
            <IconComponent className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{currentStepData.title}</h2>
          <div className="flex items-center justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          {currentStep > 0 ? (
            <Button variant="outline" onClick={handlePrev}>
              Previous
            </Button>
          ) : (
            <div />
          )}

          {currentStep < steps.length - 1 ? (
            <Button 
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              disabled={
                (currentStep === 0 && (!formData.studentName || !formData.parentName || !formData.email || !formData.phone || !formData.classGrade)) ||
                (currentStep === 1 && formData.subjects.length === 0) ||
                (currentStep === 2 && (!formData.district || !formData.area || !formData.mode))
              }
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              <Send className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernStudentRegistration;