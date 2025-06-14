
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

// Terms data: array of { title: string, text: string } objects for each section
const termsSections = [
  {
    title: "General Terms & Agreements",
    text: `
1. It is agreed that Pranavam Study Centre is hiring you to provide educational services to our client on a contract basis as and when necessary for a period of 12 months.

2. You understand and agree that all students, parents and Guardians are clients of only Pranavam Study Centre. ... Tutors should not under any circumstance collect fees. Tutors should not under any circumstance change the schedule or take sessions outside the schedule without prior permission from Pranavam Study Centre.

3. It is agreed that the Tutor shall always perform the services to the highest standard.

4. In particular, but not limited to the below points, the Tutor shall make every effort to:
a) be punctual
b) not use mobile phones or gadgets during the session.
c) be presentable and dressed appropriately and respectably at all times
d) be polite, diligent and helpful. Never use profanity in front of a client or student, or make derogatory remarks about a student. Any tutor who does this will be removed from our team immediately.
e) do all the necessary preparations for each tutoring session
f) not cancel lessons unless absolutely necessary.

5. It should be noted that tutors who repeatedly cancel sessions ... may be removed.

6. You understand and agree ... Contract for services. It is not a contract of employment.

7. You understand and agree that you won't get involved in any kind of interaction with parents, regarding payment ... unless arranged by Pranavam Study Centre management.

8. You understand that regular assessments, assignments, exercises or homework are integral to tutoring and you should follow such work timeously.

9. The Tutor must keep the client and Pranavam Study Centre informed of any issues or problems with each student taught, as and when they develop

10. The tutor shall report to Pranavam Study Centre any misbehaviour or disrespect by students, parents or any other persons immediately ...
    `.trim()
  },
  {
    title: 'Demo Session',
    text: `
1. A demo class will be arranged only after getting your willingness to handle the Subject/ Student for an entire academic year, fixing hourly Payment and checking location accessibility.

2. Once demo class timing is fixed ... the session shall not be rescheduled ... you may not be considered ...

3. You understand that the demo session will be of 1 hour ... no payment for this session.

4. Selected Tutors should not share their selected tuition details with their friends/colleagues ...

5. Academic support team will be your sole point of contact for communicating with Parents. ... If found communicating with parents without keeping Pranavam Study Centre in the loop, the tutor will not be considered ...

6. You understand that the final decision ... is yours and yours alone. ...

7. During the demo class you should analyse students' calibre ...

8. After the demo class tutor can recommend the number of classes and hours per session needed.

9. A fixed number of classes, a minimum of 12-hour sessions should be there.
    `.trim()
  },
  {
    title: 'Leave and Rescheduling',
    text: `
1. If you cannot attend the tuition as per the schedule, a prior notice of 12 hours before the session starts must be given ...

2. The tutor will wait for a maximum of 20 minutes ... for the student's arrival ...

3. Session will be considered payable if the tutor arrives but the student is unavailable ...

4. Rescheduled classes have to be adjusted with another time slot ...

5. If a parent requests to cancel ... inform them to contact the academic support team ...

6. If you are leaving any tuition, you must intimate before one month.

7. If the tutor discontinues the classes in the middle ... no further payment will be made ...
    `.trim()
  },
  {
    title: 'Payment and Assessment Process',
    text: `
1. Tuition charges with transportation will be fixed at an hourly fee agreed upon ...

2. Pranavam Study Centre will ensure that the Tutor gets paid for sessions reported ...

3. Payment process ... within 3 to 5 working days ...

4. After completing each session, details ... should be properly updated ...

5. If there is no academic improvement for the students ...

6. In exceptional circumstances ... If the tutor fails to accommodate, the lesson will be chargeable ... no further charges or payments due Tutor.

7. If the tutor discontinues the classes without 3 weeks prior notice, the payment will be released only after providing a replacement tutor.

8. Individual classes will be 1-hour 2-hour sessions/classes depending ...
    `.trim()
  },
  {
    title: 'Termination of Agreement',
    text: `
1. Both parties appreciate the importance of a good understanding and trust between the tutor and the student ...

2. If the Tutor, in her/his reasonable opinion, is unhappy with the Client ... may terminate the tutor's session ...

3. The Tutor hereby agrees that the Company may terminate this Agreement with immediate effect and deny payment of due:
a) if the Tutor commits a serious or material breach of any of his or her obligations
b) if the Tutor repeatedly commits minor breaches of obligations under this Agreement
c) if the Tutor acts in such a way as to discredit the Company
d) if the Tutor shall have been found guilty of any criminal offence
e) Any complaints from the parent side such as not keeping time, usage of mobile phones ... which affect the session assessment.
f) If the tutor misbehaves the student in any manner ...
    `.trim()
  },
];

// Capitalized version of class names
const allClasses = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
  'BTech', 'BSc', 'BA', 'BCom', 'LLB', 'MTech', 'MSc', 'MA', 'MCom',
  'Music', 'Dance', 'Art', 'Violin-Classical', 'Violin-Western',
  'NEET', 'JEE', 'UPSC', 'PSC', 'Banking', 'SSC', 'Railway'
];

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

const allLanguages = ['English', 'Malayalam', 'Hindi', 'Tamil'];

const TutorRegistration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [termsChecked, setTermsChecked] = useState<boolean[]>(Array(termsSections.length).fill(false));
  const { toast } = useToast();

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

  // Handler for ticking terms sections
  const handleTermsCheck = (idx: number, checked: boolean) => {
    const updated = [...termsChecked];
    updated[idx] = checked;
    setTermsChecked(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate that all terms are checked
    if (!termsChecked.every(Boolean)) {
      toast({
        title: "Please Accept All Terms",
        description: "Please read and accept each terms & conditions section before submitting.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

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
          mode: formData.get('teachingMode') as string,
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

              {/* Classes/Grades Section */}
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

              {/* Terms & Conditions - with checkboxes for each section */}
              <div className="space-y-6 border-[1.5px] border-gray-200 rounded-lg p-4 bg-gray-50 mt-2">
                <h2 className="text-lg font-semibold mb-3">Terms & Conditions (Read and tick each section)</h2>
                {termsSections.map((section, idx) => (
                  <div key={section.title} className="mb-4 border border-gray-200 rounded-lg p-3 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{section.title}</span>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`terms-section-${idx}`}
                          checked={termsChecked[idx]}
                          onCheckedChange={(checked) => handleTermsCheck(idx, checked as boolean)}
                          required
                        />
                        <Label htmlFor={`terms-section-${idx}`} className="text-xs">I have read this section</Label>
                      </div>
                    </div>
                    <div className="text-gray-700 text-sm whitespace-pre-line">{section.text}</div>
                  </div>
                ))}
              </div>

              {/* Old single terms checkbox replaced with above checkboxes */}

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
