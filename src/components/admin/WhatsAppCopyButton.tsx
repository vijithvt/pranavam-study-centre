
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudentRegistration {
  id: string;
  student_name: string;
  parent_name: string;
  email: string;
  phone: string;
  class_grade: string;
  syllabus?: string;
  subjects: string[];
  custom_subjects?: string;
  mode: string;
  district: string;
  location: string;
  time_preference: string;
  special_requests: string;
  tutor_gender?: string;
  languages?: string;
  budget?: string;
  created_at: string;
}

interface WhatsAppCopyButtonProps {
  student: StudentRegistration;
}

const WhatsAppCopyButton = ({ student }: WhatsAppCopyButtonProps) => {
  const { toast } = useToast();

  const generateWhatsAppFormat = async (data: StudentRegistration) => {
    const generateId = async () => {
      const date = new Date(data.created_at);
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      
      // Get language medium prefix
      const languages = data.languages || 'English/Malayalam';
      let prefix = 'EN'; // default
      if (languages.toLowerCase().includes('malayalam') && !languages.toLowerCase().includes('english')) {
        prefix = 'ML';
      } else if (languages.toLowerCase().includes('hindi')) {
        prefix = 'HI';
      } else if (languages.toLowerCase().includes('tamil')) {
        prefix = 'TA';
      }
      
      // Get count of enquiries for this month (simulated - in real app would query database)
      // For now, using a random number between 1-999
      const enquiryCount = Math.floor(Math.random() * 999) + 1;
      const countStr = enquiryCount.toString().padStart(3, '0');
      
      return `${prefix}${year}${month}${day}${countStr}`;
    };

    const generateNote = (location: string, subjects: string[], syllabus: string, grade: string) => {
      const nearbyAreas = {
        'pongumoodu': 'Pongumoodu, Chavadimukk, Kallampally, Sreekaryam, Cheruvakkal, Parottukonam, Ulloor, Keshavadhasapuram, Kottamugal',
        'trivandrum': 'Trivandrum city, Palayam, Statue, East Fort, Central Station, Medical College, Kowdiar',
        'kollam': 'Kollam city, Chinnakada, Sakthikulangara, Eravipuram, Kadappakada',
        'vattiyoorkavu': 'Peroorkada, Peyad, Poojappura, Kowdiar, Palayam, Nandavanam, Karamana, Thampanoor',
        'keshavadhasapuram': 'Keshavadhasapuram, Ulloor, Pattom, Mangulam, Muttada, Murinjapuram, Parottukonam',
        'parottukonam': 'Parottukonam, Ulloor, Kochulloor, Muttada, Nalanchira, Paruthippara, Keshavadhasapuram, Murinjapuram, Pattom',
        'anayara': 'Anayara, Balaramapuram, Neyyattinkara, Pothencode, Venjaramoodu',
        'default': location
      };

      const area = nearbyAreas[location.toLowerCase()] || nearbyAreas['default'];
      const subjectText = subjects.length > 0 ? subjects.join(', ') : 'the specified subjects';
      
      return `Parents are seeking a qualified and experienced tutor to teach ${subjectText} for a ${grade} student. The ideal candidate should possess excellent communication and teaching skills, have a strong grasp of the ${syllabus} syllabus, and a proven track record of helping students achieve excellent academic results. Preference will be given to tutors residing in or near ${area}.`;
    };

    // Calculate hour rate (budget / 20 hours) - 100, min 0
    let hourRate = 0;
    if (data.budget) {
      const monthlyBudget = parseInt(data.budget);
      if (!isNaN(monthlyBudget)) {
        const calculatedHourlyRate = Math.floor(monthlyBudget / 20);
        hourRate = Math.max(calculatedHourlyRate - 100, 0);
      }
    }

    // Get subjects - either from subjects array or custom_subjects
    const subjectDisplay = data.subjects?.length > 0 ? data.subjects.join(', ') : (data.custom_subjects || '');
    
    // Format syllabus
    const syllabusDisplay = data.syllabus || 'N/A';
    
    // Generate proper grade display
    const gradeDisplay = data.class_grade;

    const generatedId = await generateId();

    return `ID-${generatedId}
Subject - ${subjectDisplay}
Grade - ${gradeDisplay}
Syllabus - ${syllabusDisplay}
Location - ${data.mode === 'online' ? 'Online' : data.location}
Tutor Gender required - ${data.tutor_gender || 'No Preference'}
Medium of Teaching - ${data.languages || 'English/Malayalam'}
Probable hrs in month - 20 hrs
Hour Rate - ${hourRate}
Contact 9496315903
Note - ${generateNote(data.location, data.subjects || [data.custom_subjects || ''], syllabusDisplay, gradeDisplay)}`;
  };

  const copyToClipboard = async () => {
    const whatsappText = await generateWhatsAppFormat(student);
    navigator.clipboard.writeText(whatsappText);
    toast({
      title: "Copied to clipboard!",
      description: "WhatsApp format copied successfully.",
    });
  };

  return (
    <Button variant="outline" size="sm" onClick={copyToClipboard}>
      <Copy className="h-4 w-4 mr-1" />
      Copy
    </Button>
  );
};

export default WhatsAppCopyButton;
