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
import { Link } from 'react-router-dom';

const TutorRegistration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const { toast } = useToast();

  const allSubjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Hindi',
    'Malayalam',
    'Social Science',
    'History',
    'Geography',
    'Political Science',
    'Economics',
    'Computer Science',
    'Accountancy',
    'Business Studies',
    'Psychology',
    'Sociology',
    'Philosophy',
    'Physical Education',
    'Environmental Science'
  ];

  const allClasses = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    'btech', 'bsc', 'ba', 'bcom', 'llb', 'mtech', 'msc', 'ma', 'mcom',
    'music', 'dance', 'art', 'violin-classical', 'violin-western',
    'neet', 'jee', 'upsc', 'psc', 'banking', 'ssc', 'railway'
  ];

  const allLanguages = ['English', 'Malayalam', 'Hindi', 'Tamil'];

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setSelectedSubjects([...selectedSubjects, subject]);
    } else {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    }
  };

  const handleClassChange = (classItem: string, checked: boolean) => {
    if (checked) {
      setSelectedClasses([...selectedClasses, classItem]);
    } else {
      setSelectedClasses(selectedClasses.filter(c => c !== classItem));
    }
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguages([...selectedLanguages, language]);
    } else {
      setSelectedLanguages(selectedLanguages.filter(l => l !== language));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    
    // Validate subjects
    if (selectedSubjects.length === 0) {
      const customSubjects = formData.get('customSubjects') as string;
      if (!customSubjects || customSubjects.trim() === '') {
        toast({
          title: "Validation Error",
          description: "Please select or enter at least one subject.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
    }

    // Validate classes
    if (selectedClasses.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one class/grade.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Validate languages
    if (selectedLanguages.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one language.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Prepare subjects array
    let subjects: string[] = [];
    if (selectedSubjects.length > 0) {
      subjects = selectedSubjects;
    } else {
      const customSubjects = formData.get('customSubjects') as string;
      if (customSubjects && customSubjects.trim()) {
        subjects = [customSubjects.trim()];
      }
    }
    
    try {
      const { error } = await supabase
        .from('tutor_registrations')
        .insert({
          full_name: formData.get('fullName') as string,
          email: formData.get('email') as string,
          phone: formData.get('phone') as string,
          whatsapp: formData.get('whatsapp') as string,
          district: formData.get('district') as string,
          location: formData.get('area') as string,
          subjects: subjects,
          classes: selectedClasses,
          qualification: formData.get('qualification') as string,
          specialization: formData.get('specialization') as string,
          experience: parseInt(formData.get('experience') as string) || 0,
          availability: formData.get('teachingMode') as string,
          languages: selectedLanguages,
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

              {/* Subjects Section */}
              <div className="space-y-4">
                <div>
                  <Label>Subjects You Can Teach *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2 max-h-60 overflow-y-auto border rounded-md p-4">
                    {allSubjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={`subject-${subject}`}
                          checked={selectedSubjects.includes(subject)}
                          onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                        />
                        <Label htmlFor={`subject-${subject}`} className="text-sm font-normal cursor-pointer">
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="customSubjects">Other Subjects</Label>
                  <Input 
                    name="customSubjects" 
                    id="customSubjects" 
                    className="mt-1" 
                    placeholder="If other subjects, specify here (e.g., Advanced Mathematics, Organic Chemistry)"
                  />
                </div>
              </div>

              {/* Classes Section */}
              <div className="space-y-4">
                <div>
                  <Label>Classes/Grades You Can Teach *</Label>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mt-2 border rounded-md p-4">
                    {allClasses.map((classItem) => (
                      <div key={classItem} className="flex items-center space-x-2">
                        <Checkbox
                          id={`class-${classItem}`}
                          checked={selectedClasses.includes(classItem)}
                          onCheckedChange={(checked) => handleClassChange(classItem, checked as boolean)}
                        />
                        <Label htmlFor={`class-${classItem}`} className="text-sm font-normal cursor-pointer">
                          {classItem}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Languages Section */}
              <div className="space-y-4">
                <div>
                  <Label>Languages You Can Teach In *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2 border rounded-md p-4">
                    {allLanguages.map((language) => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={`language-${language}`}
                          checked={selectedLanguages.includes(language)}
                          onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                        />
                        <Label htmlFor={`language-${language}`} className="text-sm font-normal cursor-pointer">
                          {language}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Teaching Mode */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="teachingMode">Preferred Teaching Mode *</Label>
                  <select name="teachingMode" id="teachingMode" required className="w-full mt-1 p-2 border rounded-md">
                    <option value="">Select teaching mode</option>
                    <option value="home">Home Tuition</option>
                    <option value="online">Online</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>

              {/* CV Upload Only */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resume">Upload Resume/CV *</Label>
                  <div className="mt-1 flex items-center space-x-2">
                    <Input id="resume" type="file" accept=".pdf,.doc,.docx" required />
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
                  I agree to the <Link to="/tutor-terms" target="_blank" className="underline text-blue-700">Terms and Conditions</Link> and confirm that all information provided is accurate.
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
