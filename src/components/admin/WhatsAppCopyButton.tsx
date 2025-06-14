
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

    // Get minimum hourly rate based on class/grade for calculation
    const getMinHourlyRate = (grade: string) => {
      const gradeNum = parseInt(grade);
      
      // Classes 1-4: minimum 250, show 200
      if (gradeNum >= 1 && gradeNum <= 4) return 200;
      
      // Classes 5-6: minimum 250, show 200
      if (gradeNum >= 5 && gradeNum <= 6) return 200;
      
      // Classes 7-10: minimum 300, show 250
      if (gradeNum >= 7 && gradeNum <= 10) return 250;
      
      // Classes 11-12: minimum 350, show 300
      if (gradeNum >= 11 && gradeNum <= 12) return 300;
      
      // Higher education and special categories: minimum 400, show 350
      if (['btech','bsc','ba','bcom','llb','mtech','msc','ma','mcom','music','dance','art','violin-classical','violin-western','neet','jee','upsc','psc','banking','ssc','railway'].includes(grade)) {
        return 350;
      }
      
      return 200; // Default
    };

    const hourRate = getMinHourlyRate(data.class_grade);

    // Get subjects - either from subjects array or custom_subjects, remove duplicates
    let subjectDisplay = '';
    if (data.subjects?.length > 0) {
      // Remove duplicates from subjects array
      const uniqueSubjects = [...new Set(data.subjects)];
      subjectDisplay = uniqueSubjects.join(', ');
    } else if (data.custom_subjects) {
      subjectDisplay = data.custom_subjects;
    }
    
    // Format syllabus
    const syllabusDisplay = data.syllabus || 'N/A';
    
    // Generate proper grade display
    const gradeDisplay = data.class_grade;

    // Capitalize tutor gender
    const tutorGender = data.tutor_gender ? 
      data.tutor_gender.charAt(0).toUpperCase() + data.tutor_gender.slice(1).toLowerCase() : 
      'No Preference';

    const generatedId = await generateId();

    return `ID-${generatedId}
Subject - ${subjectDisplay}
Grade - ${gradeDisplay}
Syllabus - ${syllabusDisplay}
Location - ${data.mode === 'online' ? 'Online' : data.location}
Tutor Gender required - ${tutorGender}
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
