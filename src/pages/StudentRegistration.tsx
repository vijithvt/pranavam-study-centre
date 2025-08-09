import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, CheckCircle, User, MapPin, BookOpen, Clock, MessageSquare, Calendar as CalendarIcon, DollarSign, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import PersonalInfoSection from '@/components/forms/PersonalInfoSection';
import LocationSection from '@/components/forms/LocationSection';
import SubjectPreferencesSection from '@/components/forms/SubjectPreferencesSection';
import { FormProvider, useForm } from 'react-hook-form';
import BudgetSliderSection from '@/components/forms/BudgetSliderSection';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const StudentRegistration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [otherSubject, setOtherSubject] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [budget, setBudget] = useState(3000);
  const { toast } = useToast();
  const methods = useForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    
    // Validation
    const classGradeValue = classGrade || formData.get('classGrade') as string;
    if (!classGradeValue) {
      toast({
        title: "Validation Error",
        description: "Please select a class/grade.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Check if entrance exam or arts/music requires specialization
    const isEntranceExam = ['neet','jee','upsc','psc','banking','ssc','railway'].includes(classGradeValue);
    const isArtsOrMusic = ['music','dance','art','violin-classical','violin-western'].includes(classGradeValue);
    
    if ((isEntranceExam || isArtsOrMusic) && !specialization.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your specialization.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // For regular classes, check subjects
    if (!isEntranceExam && !isArtsOrMusic && selectedSubjects.length === 0 && !otherSubject.trim()) {
      toast({
        title: "Validation Error",
        description: "Please select at least one subject or specify other subjects.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Prepare subjects array
    let subjects: string[] = [];
    if (isEntranceExam || isArtsOrMusic) {
      subjects = [specialization];
    } else {
      subjects = [...selectedSubjects];
      if (otherSubject.trim()) {
        subjects.push(otherSubject.trim());
      }
    }

    try {
      const { error } = await supabase
        .from('student_registrations')
        .insert({
          student_name: formData.get('studentName') as string,
          parent_name: formData.get('parentName') as string,
          email: formData.get('email') as string,
          phone: formData.get('parentPhone') as string,
          class_grade: classGradeValue,
          subjects: subjects,
          specialization: specialization || null,
          mode: formData.get('mode') as string,
          district: formData.get('district') as string,
          location: formData.get('area') as string,
          time_preference: formData.get('timePreference') as string,
          special_requests: formData.get('specialRequests') as string,
          monthly_budget: budget,
          preferred_start_date: startDate ? format(startDate, 'yyyy-MM-dd') : null,
        });

      if (error) throw error;

      // Send admin notification
      try {
        await supabase.functions.invoke('send-admin-notification', {
          body: {
            type: 'student',
            registration: {
              student_name: formData.get('studentName') as string,
              parent_name: formData.get('parentName') as string,
              email: formData.get('email') as string,
              phone: formData.get('parentPhone') as string,
              class_grade: classGradeValue,
              subjects: subjects,
              specialization: specialization || null,
              mode: formData.get('mode') as string,
              district: formData.get('district') as string,
              location: formData.get('area') as string,
              time_preference: formData.get('timePreference') as string,
              special_requests: formData.get('specialRequests') as string,
              monthly_budget: budget,
              preferred_start_date: startDate ? format(startDate, 'yyyy-MM-dd') : null,
              created_at: new Date().toISOString()
            }
          }
        });
      } catch (notificationError) {
        console.error('Failed to send admin notification:', notificationError);
      }

      toast({
        title: "Registration Successful!",
        description: "We'll match you with qualified tutors and contact you soon.",
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 animate-fade-in">
        <Card className="w-full max-w-lg text-center rounded-3xl shadow-2xl border-0 backdrop-blur-sm bg-white/90">
          <CardContent className="p-10">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
              Registration Complete!
            </h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Thank you for choosing Pranavam Study Centre. We'll find the perfect tutor for you and contact you within 24 hours.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Register Another Student
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const steps = [
    { 
      title: 'Personal Info',
      icon: User,
      description: 'Student & Parent Details',
      content: (
        <PersonalInfoSection 
          classGrade={classGrade}
          setClassGrade={setClassGrade}
        />
      )
    },
    { 
      title: 'Classes & Subjects',
      icon: BookOpen,
      description: 'What subjects to learn',
      content: (
        <SubjectPreferencesSection 
          classGrade={classGrade}
          onSubjectsChange={setSelectedSubjects}
          onOtherSubjectChange={setOtherSubject}
          onSpecializationChange={setSpecialization}
          selectedSubjects={selectedSubjects}
          defaultOtherSubject={otherSubject}
          defaultSpecialization={specialization}
        />
      )
    },
    { 
      title: 'Location',
      icon: MapPin,
      description: 'Where to teach',
      content: <LocationSection />
    },
    { 
      title: 'Schedule & Budget',
      icon: Clock,
      description: 'When and budget preferences',
      content: (
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Learning Preferences</h2>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="mode" className="text-sm font-semibold text-gray-700">Learning Mode *</label>
                <select 
                  name="mode" 
                  id="mode" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-base bg-white"
                >
                  <option value="">Select mode</option>
                  <option value="home">Home Tuition</option>
                  <option value="online">Online Classes</option>
                  <option value="both">Both Options</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="timePreference" className="text-sm font-semibold text-gray-700">Time Preference *</label>
                <select 
                  name="timePreference" 
                  id="timePreference" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-base bg-white"
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (6 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                  <option value="evening">Evening (6 PM - 10 PM)</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Preferred Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <input type="hidden" name="preferredStartDate" value={startDate ? format(startDate, 'yyyy-MM-dd') : ''} />
            </div>

            <div>
              <BudgetSliderSection onBudgetChange={setBudget} defaultBudget={budget} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <label htmlFor="specialRequests" className="text-sm font-semibold text-gray-700">Special Requirements</label>
            </div>
            <textarea 
              name="specialRequests" 
              id="specialRequests"
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-base resize-none bg-white"
              rows={4}
              placeholder="Any specific requirements, learning difficulties, or additional information..."
            />
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    // Add basic validation for each step
    if (currentStep === 0 && !classGrade) return false;
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <UserPlus className="h-10 w-10 text-primary mr-3" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Find Your Perfect Tutor
            </h1>
          </div>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Tell us about your learning needs and we'll connect you with qualified educators
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    index < currentStep ? "bg-green-500 border-green-500 text-white" :
                    index === currentStep ? "bg-primary border-primary text-white" : 
                    "bg-gray-100 border-gray-300 text-gray-400"
                  )}>
                    {index < currentStep ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={cn(
                      "text-sm font-semibold",
                      index <= currentStep ? "text-primary" : "text-gray-400"
                    )}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 hidden sm:block">
                      {step.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <Card className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-0 overflow-hidden animate-slide-in-right">
          <CardContent className="p-8 sm:p-12">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Step Content */}
                <div className="min-h-[400px]">
                  {steps[currentStep].content}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-6 py-3 rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  <div className="text-sm text-gray-500">
                    Step {currentStep + 1} of {steps.length}
                  </div>

                  {currentStep === steps.length - 1 ? (
                    <Button
                      type="submit"
                      disabled={isSubmitting || !canProceed()}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {isSubmitting ? "Finding Tutors..." : "Find My Tutor"}
                      <Star className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="px-6 py-3 rounded-xl"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegistration;