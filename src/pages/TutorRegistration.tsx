
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Upload, CheckCircle, GraduationCap, MapPin, BookOpen, Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import TutorPersonalInfoSection from '@/components/forms/TutorPersonalInfoSection';
import LocationSection from '@/components/forms/LocationSection';
import TutorQualificationSection from '@/components/forms/TutorQualificationSection';

const allClasses = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
  'BTech', 'BSc', 'BA', 'BCom', 'LLB', 'MTech', 'MSc', 'MA', 'MCom',
  'Music', 'Dance', 'Art', 'Violin-Classical',
  'NEET', 'JEE', 'UPSC', 'PSC', 'Banking', 'SSC', 'Railway'
];

const allSubjects = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'Malayalam',
  'Social Science', 'History', 'Geography', 'Political Science', 'Economics',
  'Computer Science', 'Accountancy', 'Business Studies', 'Psychology', 'Sociology',
  'Philosophy', 'Physical Education', 'Environmental Science'
];

const allLanguages = ['English', 'Malayalam', 'Hindi', 'Tamil'];

const TutorRegistration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Check if arts/music classes are selected
  const isArtsMusicSelected = selectedClasses.some(cls => 
    ['Music', 'Dance', 'Art', 'Violin-Classical'].includes(cls)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);

    // Validate subjects only if not arts/music
    if (!isArtsMusicSelected && selectedSubjects.length === 0) {
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

    if (selectedClasses.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one class/grade.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (selectedLanguages.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one language.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    let subjects: string[] = [];
    if (!isArtsMusicSelected) {
      if (selectedSubjects.length > 0) {
        subjects = selectedSubjects;
      } else {
        const customSubjects = formData.get('customSubjects') as string;
        if (customSubjects && customSubjects.trim()) {
          subjects = [customSubjects.trim()];
        }
      }
    } else {
      subjects = ['Arts/Music'];
    }

    try {
      let resumeUrl = null;
      
      // Handle file upload if resume is provided
      if (resumeFile) {
        setIsUploading(true);
        const fileExt = resumeFile.name.split('.').pop();
        const fileName = `${Date.now()}_${formData.get('fullName')}_resume.${fileExt}`;
        const filePath = `public/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('tutor-documents')
          .upload(filePath, resumeFile);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          toast({
            title: "File Upload Failed",
            description: "Failed to upload resume. Please try again.",
            variant: "destructive"
          });
          setIsSubmitting(false);
          setIsUploading(false);
          return;
        }

        resumeUrl = filePath;
        setIsUploading(false);
      }

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
          mode: formData.get('teachingMode') as string,
          resume_url: resumeUrl,
        });

      if (error) throw error;

      // Send admin notification
      try {
        await supabase.functions.invoke('send-admin-notification', {
          body: {
            type: 'tutor',
            registration: {
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
              mode: formData.get('teachingMode') as string,
              created_at: new Date().toISOString()
            }
          }
        });
      } catch (notificationError) {
        console.error('Failed to send admin notification:', notificationError);
      }

      toast({
        title: "Registration Successful!",
        description: "We'll review your application and contact you soon.",
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
              Thank you for joining Pranavam Study Centre. We'll review your application and contact you soon.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Register Another Tutor
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4 sm:py-8 px-2 sm:px-4 pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in px-4">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <UserPlus className="h-8 sm:h-10 w-8 sm:w-10 text-primary mr-3" />
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 leading-tight">
            Become a Tutor
          </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-4">
            Join our network of qualified educators and make a difference in students' lives
          </p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border-0 overflow-hidden animate-slide-in-right mx-2 sm:mx-0">
          <CardContent className="p-4 sm:p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10">

              {/* Personal Information */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Personal Information</h2>
                </div>
                <TutorPersonalInfoSection />
              </div>

              {/* Location */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Location</h2>
                </div>
                <LocationSection />
              </div>

              {/* Qualifications */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Qualifications & Experience</h2>
                </div>
                <TutorQualificationSection />
              </div>

              {/* Classes/Grades */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Classes/Grades You Can Teach</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl sm:rounded-2xl border-2 border-gray-200 max-h-64 sm:max-h-80 overflow-y-auto">
                  {allClasses.map((classItem) => (
                    <div key={classItem} className="flex items-center space-x-2">
                      <Checkbox
                        id={`class-${classItem}`}
                        checked={selectedClasses.includes(classItem)}
                        onCheckedChange={(checked) => setSelectedClasses(checked
                          ? [...selectedClasses, classItem]
                          : selectedClasses.filter(c => c !== classItem)
                        )}
                      />
                      <Label htmlFor={`class-${classItem}`} className="text-sm font-medium cursor-pointer hover:text-blue-600 transition-colors">
                        {classItem}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subjects - Only show if not arts/music */}
              {!isArtsMusicSelected && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Subjects You Can Teach</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl border-2 border-gray-200 max-h-80 overflow-y-auto">
                    {allSubjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={`subject-${subject}`}
                          checked={selectedSubjects.includes(subject)}
                          onCheckedChange={(checked) => setSelectedSubjects(checked
                            ? [...selectedSubjects, subject]
                            : selectedSubjects.filter(s => s !== subject)
                          )}
                        />
                        <Label htmlFor={`subject-${subject}`} className="text-sm font-medium cursor-pointer hover:text-green-600 transition-colors">
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customSubjects" className="text-sm font-semibold text-gray-700">Other Subjects</Label>
                    <Input 
                      name="customSubjects" 
                      id="customSubjects" 
                      className="px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-lg"
                      placeholder="If other subjects, specify here (e.g., Advanced Mathematics, Organic Chemistry)"
                    />
                  </div>
                </div>
              )}

              {/* Languages */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                    <Languages className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Languages</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-br from-gray-50 to-pink-50 rounded-2xl border-2 border-gray-200">
                  {allLanguages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`language-${language}`}
                        checked={selectedLanguages.includes(language)}
                        onCheckedChange={(checked) => setSelectedLanguages(checked
                          ? [...selectedLanguages, language]
                          : selectedLanguages.filter(l => l !== language)
                        )}
                      />
                      <Label htmlFor={`language-${language}`} className="text-sm font-medium cursor-pointer hover:text-pink-600 transition-colors">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teaching Mode */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="teachingMode" className="text-sm font-semibold text-gray-700">Preferred Teaching Mode *</Label>
                  <select 
                    name="teachingMode" 
                    id="teachingMode" 
                    required 
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-lg bg-white"
                  >
                    <option value="">Select teaching mode</option>
                    <option value="home">Home Tuition</option>
                    <option value="online">Online</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>

              {/* Resume Upload */}
              <div className="space-y-6">
                  <div className="space-y-2">
                   <Label htmlFor="resume" className="text-sm font-semibold text-gray-700">Resume/CV (Optional)</Label>
                   <div className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors duration-300">
                     <Upload className="h-6 w-6 text-gray-400" />
                     <Input 
                       id="resume" 
                       type="file" 
                       accept=".pdf,.doc,.docx"
                       onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                      className="border-0 p-0 text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* About You */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-semibold text-gray-700">About You</Label>
                  <Textarea 
                    id="bio" 
                    className="px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-lg resize-none"
                    rows={4}
                    placeholder="Share your teaching philosophy, achievements, or any additional information..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 sm:py-6 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl shadow-xl sm:shadow-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TutorRegistration;
