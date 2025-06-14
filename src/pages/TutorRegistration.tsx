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
import FormSectionCard from "@/components/forms/FormSectionCard";

// All class/course names capitalized as specified
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

const termsSections = [
  {
    title: "General Terms & Agreements",
    text: `
1. It is agreed that Pranavam Study Centre is hiring you to provide educational services to our client on a contract basis as and when necessary for a period of 12 months.

2. You understand and agree that all students, parents and Guardians are clients of only Pranavam Study Centre. The tutor is employed part-time to tutor students of our clients by Pranavam Study Centre. Pranavam Study Centre also fixes the tutoring schedule based on which the fee is collected from the Client on behalf of the Tutor, together with its fee. Tutors should not under any circumstance collect fees. Tutors should not under any circumstance change the schedule or take sessions outside the schedule without prior permission from Pranavam Study Centre.

3. It is agreed that the Tutor shall always perform the services to the highest standard.

4. In particular, but not limited to the below points, the Tutor shall make every effort to:
    a) be punctual
    b) not use mobile phones or gadgets during the session.
    c) be presentable and dressed appropriately and respectably at all times
    d) be polite, diligent and helpful. Never use profanity in front of a client or student, or make derogatory remarks about a student. Any tutor who does this will be removed from our team immediately.
    e) do all the necessary preparations for each tutoring session
    f) not cancel lessons unless absolutely necessary.

5. It should be noted that tutors who repeatedly cancel sessions or fail to notify the Pranavam Study Centre team of cancelled sessions may be removed from our team.

6. You understand and agree that the relationship between Pranavam Study Centre and you will be considered as a Contract for services. It is not a contract of employment.

7. You understand and agree that you won’t get involved in any kind of interaction with parents, regarding payment or you will not directly contact a client who is enrolled with Pranavam Study Centre and or provide additional services outside this contract of tuition unless arranged by Pranavam Study Centre management.

8. You understand that regular assessments, assignments, exercises or homework are integral to tutoring and you should follow such work timeously.

9. The Tutor must keep the client and Pranavam Study Centre informed of any issues or problems with each student taught, as and when they develop

10. The tutor shall report to Pranavam Study Centre any misbehaviour or disrespect by students, parents or any other persons immediately to ensure appropriate redressal of the situation.
`.trim()
  },
  {
    title: "Demo Session",
    text: `
1. A demo class will be arranged only after getting your willingness to handle the Subject/ Student for an entire academic year, fixing hourly Payment and checking location accessibility.

2. Once demo class timing is fixed according to your and the student’s / Parents’ convenience, the session shall not be rescheduled as it will affect Pranavam Study Centre’s reputation. If failing to attend without furnishing an authentic reason, you may not be considered for continuing a further relationship with Pranavam Study Centre.

3. You understand that the demo session will be of 1 hour and as this session is to showcase your teaching capability to the client, there will be no payment for this session.

4. Selected Tutors should not share their selected tuition details with their friends/colleagues and do not invite them to the student’s residence at the time of the introduction / Demo class.

5. Academic support team will be your sole point of contact for communicating with Parents. Parents’ queries regarding the payment, feedback and class schedule, after the demo session should be directed to our Academic support team. If found communicating with parents without keeping Pranavam Study Centre in the loop, the tutor will not be considered in continuing a further relationship with Pranavam Study Centre.

6. You understand that the final decision to choose a particular student for tuition is yours and yours alone. If you are selected in a demo, you can’t reject the tuition until and unless there is an authentic reason.

7. During the demo class you should analyse students’ calibre to grab the portions and by that, we can fix how many classes we should provide in a week to improve the particular student.

8. After the demo class tutor can recommend the number of classes and hours per session needed for completing the portions.

9. A fixed number of classes, a minimum of 12-hour sessions should be there.
`.trim()
  },
  {
    title: "Leave and Rescheduling",
    text: `
1. If you cannot attend the tuition as per the schedule, a prior notice of 12 hours before the session starts must be given to the academic support team of Pranavam Study Centre to inform the parent/ Student.

2. The tutor will wait for a maximum of 20 minutes from the time of the scheduled session for the student's arrival before considering that session cancelled (for cases without prior information from students.

3. Session will be considered payable if the tutor arrives but the student is unavailable or not ready for the session for more than 20 minutes. Such a situation should be informed to the academic support team immediately for it to be considered a valid session. This should be recorded in the record book as well.

4. Rescheduled classes have to be adjusted with another time slot in the following week as agreed upon by the parent through communication with the academic support team of Pranavam Study Centre.

5. If a parent requests to cancel or reschedule a tutoring session, you should inform them to contact the academic support team of Pranavam Study Centre.

6. If you are leaving any tuition with an authentic reason, you must intimate before one month.

7. If the tutor discontinues the classes in the middle of the schedule no further payment will be made to the tutor including any pending payment.
`.trim()
  },
  {
    title: "Payment and Assessment Process",
    text: `
1. Tuition charges with transportation will be fixed at a hourly fee agreed upon by the teachers and the same will be valid for all scheduled classes, no change request will be accepted in the middle of a booked session till all classes booked by the students have been completed.

2. Pranavam Study Centre will ensure that the Tutor gets paid for sessions reported irrespective of payment from the parents.

3. Payment process is processed within 3 to 5 working days after the completion of each fixed schedule consisting of 4 weeks/ fixed hours.

4. After completing each session, details of the class taken should be properly updated in the record book provided at the student’s residence. And the consolidated details of one month or fixed schedule should be updated in the Excel sheet and must be submitted to Pranavam Study Centre for Assessment.

5. If there is no academic improvement for the students even after your tutoring, it also affects your assessment process.

6. In exceptional circumstances, where the student is unable to give advance notice of cancellation, the teacher will do their best to offer an alternate date for the lesson that week. However, this is at the teacher's discretion. If the tutor fails to accommodate, the lesson will be chargeable during busy times and there will be no further charges or payments due Tutor.

7. If the tutor discontinues the classes without 3 weeks prior notice, the payment will be released only after providing a replacement tutor to the student, as sudden stoppage of class causes great harm to the student.

8. Individual classes will be 1-hour 2-hour sessions/classes depending on the requirement. For combined subject classes (more than 2 subjects) Teacher will take the same for 1 hour or 2 hours depending on the classes booked.
`.trim()
  },
  {
    title: "Termination of Agreement",
    text: `
1. Both parties appreciate the importance of a good understanding and trust between the tutor and the student. Accordingly, if the Client is, in his/her reasonable opinion, if not happy with the Tutor, This Agreement shall then terminate with immediate effect.

2. If the Tutor, in her/his reasonable opinion, is unhappy with the Client and/or Student’s behaviour they must inform the Company and the Company may terminate the tutor's session with the Client.

3. The Tutor hereby agrees that the Company may terminate this Agreement with immediate effect and deny payment of due:

    a) if the Tutor commits a serious or material breach of any of his or her obligations
    b) if the Tutor repeatedly commits minor breaches of obligations under this Agreement
    c) if the Tutor acts in such a way as to discredit the Company
    d) if the Tutor shall have been found guilty of any criminal offence
    e) Any complaints from the parent side such as not keeping time, usage of mobile phones during sessions, and unscheduled gaps during the sessions, which affect the session assessment.
    f) If the tutor misbehaves the student in any manner but not limited to screaming verbal accuse, derogatory remarks, exaggerated impatience or irritation etc.
`.trim()
  }
];

const finalConfirmationText = "I hereby confirm that you will abide by all the rules and regulations of Pranavam Study Centre.";


const TutorRegistration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [termsChecked, setTermsChecked] = useState<boolean[]>(Array(termsSections.length).fill(false));
  const [finalAgree, setFinalAgree] = useState(false);
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

  const handleTermsCheck = (idx: number, checked: boolean) => {
    const updated = [...termsChecked];
    updated[idx] = checked;
    setTermsChecked(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all terms
    // if (!termsChecked.every(Boolean)) {
    //   toast({
    //     title: "Please Accept All Sections",
    //     description: "Please agree to each Terms & Conditions section before submitting.",
    //     variant: "destructive"
    //   });
    //   setIsSubmitting(false);
    //   return;
    // }
    // if (!finalAgree) {
    //   toast({
    //     title: "Final Agreement Required",
    //     description: "You must confirm that you will abide by all the rules and regulations.",
    //     variant: "destructive"
    //   });
    //   setIsSubmitting(false);
    //   return;
    // }

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
      <div className="max-w-4xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <UserPlus className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Become a Tutor</h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-600">
            Join our network of qualified educators and make a difference in students' lives.
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl">Tutor Registration Form</CardTitle>
            <CardDescription>
              Please fill out all required information to join our tutor network.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-0">

              <FormSectionCard
                title="Personal Information"
                description="Tell us about yourself. We'll use this to contact you."
              >
                <TutorPersonalInfoSection />
              </FormSectionCard>

              <FormSectionCard
                title="Location"
                description="Where are you located?"
              >
                <LocationSection />
              </FormSectionCard>

              <FormSectionCard
                title="Qualifications & Experience"
                description="Share your academic background and subject expertise."
              >
                <TutorQualificationSection />
              </FormSectionCard>

              <FormSectionCard
                title="Subjects You Can Teach"
                description="Select all relevant subjects. You may also specify others below."
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2 max-h-60 overflow-y-auto border rounded-md p-4 bg-muted/40">
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
                      <Label htmlFor={`subject-${subject}`} className="text-sm font-normal cursor-pointer">
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Label htmlFor="customSubjects">Other Subjects</Label>
                  <Input 
                    name="customSubjects" 
                    id="customSubjects" 
                    className="mt-1"
                    placeholder="If other subjects, specify here (e.g., Advanced Mathematics, Organic Chemistry)"
                  />
                </div>
              </FormSectionCard>

              <FormSectionCard
                title="Classes/Grades"
                description="Select all grades/classes you are comfortable teaching."
              >
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-2 border rounded-md p-4 bg-muted/40">
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
                      <Label htmlFor={`class-${classItem}`} className="text-sm font-normal cursor-pointer">
                        {classItem}
                      </Label>
                    </div>
                  ))}
                </div>
              </FormSectionCard>

              <FormSectionCard
                title="Languages"
                description="Select all languages you are comfortable teaching in."
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2 border rounded-md p-4 bg-muted/40">
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
                      <Label htmlFor={`language-${language}`} className="text-sm font-normal cursor-pointer">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </FormSectionCard>

              <FormSectionCard
                title="Preferred Teaching Mode"
                description="Are you open to home tuitions, online, or both?"
              >
                <select name="teachingMode" id="teachingMode" required className="w-full mt-1 p-2 border rounded-md bg-muted/30">
                  <option value="">Select teaching mode</option>
                  <option value="home">Home Tuition</option>
                  <option value="online">Online</option>
                  <option value="both">Both</option>
                </select>
              </FormSectionCard>

              <FormSectionCard
                title="Resume/CV"
                description="Optional but helps us know your profile even better (PDF, DOC)."
              >
                <div className="mt-1 flex items-center space-x-2">
                  <Input id="resume" type="file" accept=".pdf,.doc,.docx" />
                  <Upload className="h-5 w-5 text-gray-400" />
                </div>
              </FormSectionCard>

              <FormSectionCard
                title="About You"
                description="Share your teaching philosophy, achievements, or anything else."
              >
                <Textarea 
                  id="bio" 
                  className="mt-1" 
                  placeholder="Share your teaching philosophy, achievements, or any additional information..."
                />
              </FormSectionCard>

              <Button type="submit" disabled={isSubmitting} className="w-full btn-primary text-lg py-6 shadow-lg mt-4">
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
