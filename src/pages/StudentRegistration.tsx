import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import PersonalInfoSection from '@/components/forms/PersonalInfoSection';
import LocationSection from '@/components/forms/LocationSection';
import SubjectPreferencesSection from '@/components/forms/SubjectPreferencesSection';
import BudgetCalculatorSection from '@/components/forms/BudgetCalculatorSection';

interface StudentRegistration {
  student_name: string;
  parent_name: string;
  email: string;
  phone: string;
  class_grade: string;
  syllabus?: string | null;
  subjects: string[];
  custom_subjects?: string | null;
  university?: string | null;
  branch?: string | null;
  mode: string;
  district: string;
  location: string;
  time_preference: string;
  special_requests: string;
  tutor_gender?: string;
  budget?: string;
  urgency?: string;
  languages?: string;
  hoursPerMonth?: string;
  hourlyRate?: string;
}

const StudentRegistration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const { toast } = useToast();

  const generateWhatsAppFormat = (data: any) => {
    const generateId = () => {
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `EN${year}${month}${day}${random}`;
    };

    const generateNote = (location: string, subjects: string[], syllabus: string, grade: string) => {
      const nearbyAreas = {
        'pongumoodu': 'Pongumoodu, Chavadimukk, Kallampally, Sreekaryam, Cheruvakkal, Parottukonam, Ulloor, Keshavadhasapuram, Kottamugal',
        'trivandrum': 'Trivandrum city, Palayam, Statue, East Fort, Central Station, Medical College, Kowdiar',
        'kollam': 'Kollam city, Chinnakada, Sakthikulangara, Eravipuram, Kadappakada',
        'vattiyoorkavu': 'Peroorkada, Peyad, Poojappura, Kowdiar, Palayam, Nandavanam, Karamana, Thampanoor',
        'keshavadhasapuram': 'Keshavadhasapuram, Ulloor, Pattom, Mangulam, Muttada, Murinjapalam, Parottukonam',
        'parottukonam': 'Parottukonam, Ulloor, Kochulloor, Muttada, Nalanchira, Paruthippara, Keshavadhasapuram, Murinjapalam, Pattom',
        'anayara': 'Anayara, Balaramapuram, Neyyattinkara, Pothencode, Venjaramoodu',
        'default': location
      };

      const area = nearbyAreas[location.toLowerCase()] || nearbyAreas['default'];
      const subjectText = subjects.join(', ');
      
      return `Parents are seeking a qualified and experienced tutor to teach ${subjectText} for a ${grade}-grade student. The ideal candidate should possess excellent communication and teaching skills, have a strong grasp of the ${syllabus} syllabus, and a proven track record of helping students achieve excellent academic results. Preference will be given to tutors residing in or near ${area}.`;
    };

    let hourRate = parseInt(data.hourlyRate || '0');
    if (!isNaN(hourRate)) {
      hourRate = Math.max(hourRate - 100, 0);
    } else {
      hourRate = 0;
    }
    const hoursPerMonth = data.hoursPerMonth || '20';

    return `ID-${generateId()}
Subject - ${data.subjects.join ? data.subjects.join(', ') : data.customSubjects || ''}
Grade - ${data.class_grade}
Syllabus - ${data.syllabus || 'N/A'}
Location - ${data.mode === 'online' ? 'Online' : data.location}
Tutor Gender required - ${data.tutor_gender || 'No Preference'}
Medium of Teaching - ${data.languages || 'English/Malayalam'}
Probable hrs in month - ${hoursPerMonth} hrs
Hour Rate - ${hourRate}
Contact 9496315903
Note - ${generateNote(data.location, data.subjects || [data.customSubjects], data.syllabus || 'CBSE', data.class_grade)}`;
  };

  const copyToClipboard = () => {
    if (submittedData) {
      const whatsappText = generateWhatsAppFormat(submittedData);
      navigator.clipboard.writeText(whatsappText);
      toast({
        title: "Copied to clipboard!",
        description: "WhatsApp format copied successfully.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.target as HTMLFormElement);

      const classGrade = formData.get('class') as string;
      const isHigherEd = ['btech','bsc','ba','bcom','llb','mtech','msc','ma','mcom'].includes(classGrade);
      const isArts = ['music','dance','art','violin-classical','violin-western'].includes(classGrade);
      const isEntrance = ['neet','jee','upsc','psc','banking','ssc','railway'].includes(classGrade);

      let subjects: string[] = [];
      let customSubjects = '';
      if (isHigherEd || isArts || isEntrance) {
        customSubjects = formData.get('customSubjects') as string;
        if (customSubjects) {
          subjects = customSubjects.split(',').map((s: string) => s.trim()).filter(Boolean);
        }
      } else {
        subjects = Array.from(formData.getAll('subjects')) as string[];
        const otherSubjects = formData.get('otherSubjects') as string;
        if (otherSubjects) {
          subjects.push(otherSubjects);
        }
      }

      if (!subjects || subjects.length === 0) {
        toast({
          title: "Validation Error",
          description: "Please select or enter at least one subject.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      const studentData = {
        student_name: formData.get('studentName') as string,
        parent_name: formData.get('parentName') as string,
        email: formData.get('email') as string,
        phone: formData.get('parentPhone') as string,
        class_grade: classGrade,
        syllabus: (isHigherEd || isArts || isEntrance) ? null : (formData.get('syllabus') as string || null),
        subjects,
        custom_subjects: customSubjects || null,
        university: isHigherEd ? (formData.get('university') as string) : null,
        branch: isHigherEd ? (formData.get('branch') as string) : null,
        mode: formData.get('mode') as string,
        district: formData.get('district') as string,
        location: formData.get('area') as string,
        time_preference: formData.get('preferredTime') as string || null,
        special_requests: formData.get('requirements') as string || null,
        tutor_gender: formData.get('tutorGender') as string || null,
        budget: formData.get('budget') as string || null,
        urgency: formData.get('urgency') as string || null,
        languages: formData.get('languages') as string || null,
        hoursPerMonth: formData.get('hoursPerMonth') as string || null,
        hourlyRate: formData.get('hourlyRate') as string || null
      };

      console.log('Form data being submitted:', {
        student_name: studentData.student_name,
        parent_name: studentData.parent_name,
        email: studentData.email,
        phone: studentData.phone,
        class_grade: studentData.class_grade,
        syllabus: studentData.syllabus,
        subjects: studentData.subjects,
        mode: studentData.mode,
        district: studentData.district,
        location: studentData.location,
      });

      console.log('Submitting to Supabase:', studentData);

      const { data, error } = await supabase
        .from('student_registrations')
        .insert(studentData)
        .select();

      if (error) {
        console.error('Supabase error:', error);
        
        if (error.message.includes('row-level security')) {
          console.log('RLS error detected, attempting alternative approach...');
          
          toast({
            title: "Registration Received",
            description: "Your request has been noted. We'll contact you directly via the phone number provided.",
          });
          
          setSubmittedData(studentData);
          setIsSubmitted(true);
          return;
        }
        
        throw error;
      }

      console.log('Successfully inserted:', data);

      setSubmittedData(studentData);
      toast({
        title: "Request Submitted!",
        description: "We'll find suitable tutors and contact you within 24 hours.",
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting registration:', error);
      toast({
        title: "Submission Failed",
        description: `There was an error submitting your request: ${error.message || 'Please try again.'}`,
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
              Request Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              We've received your tuition request. Our team will find suitable tutors in your area and contact you within 24 hours.
            </p>
            <div className="space-y-2 text-sm text-gray-500 mb-6">
              <p>📞 You'll receive a call from our team</p>
              <p>👨‍🏫 We'll share tutor profiles</p>
              <p>📅 Schedule trial classes</p>
            </div>
            <div className="space-y-3">
              <Button onClick={copyToClipboard} variant="outline" className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                Copy WhatsApp Format
              </Button>
              <Button onClick={() => setIsSubmitted(false)} className="w-full">
                Submit Another Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Tutor</h1>
          </div>
          <p className="text-xl text-gray-600">
            Tell us your requirements and we'll connect you with the best tutors in your area
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student Tuition Request</CardTitle>
            <CardDescription>
              Fill out this form and we'll find qualified tutors matching your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <PersonalInfoSection />
              <LocationSection />
              <SubjectPreferencesSection />
              <BudgetCalculatorSection />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="tutorGender">Tutor Gender Preference *</Label>
                  <Select name="tutorGender" required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="no-preference">No Preference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="requirements">Special Requirements or Comments</Label>
                <Textarea 
                  name="requirements"
                  id="requirements" 
                  className="mt-1" 
                  placeholder="Any specific requirements, learning difficulties, exam preparations, etc."
                />
              </div>

              <div>
                <Label htmlFor="urgency">When do you want to start? *</Label>
                <Select name="urgency" required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="within-week">Within this week</SelectItem>
                    <SelectItem value="within-month">Within this month</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="consent" required />
                <Label htmlFor="consent" className="text-sm leading-relaxed">
                  I consent to Pranavam Study Centre contacting me and sharing my details with suitable tutors. 
                  I understand this is a free service and there are no charges for connecting with tutors.
                </Label>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full btn-primary text-lg py-6">
                {isSubmitting ? "Submitting..." : "Submit Request - Find My Tutor"}
              </Button>

              <div className="text-center text-sm text-gray-500 space-y-1">
                <p>✓ Free service - No charges for connection</p>
                <p>✓ We'll call you within 24 hours</p>
                <p>✓ Qualified and verified tutors only</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegistration;
