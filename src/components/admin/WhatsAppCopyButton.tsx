
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
  subjects: string[];
  mode: string;
  district: string;
  location: string;
  time_preference: string;
  special_requests: string;
  created_at: string;
}

interface WhatsAppCopyButtonProps {
  student: StudentRegistration;
}

const WhatsAppCopyButton = ({ student }: WhatsAppCopyButtonProps) => {
  const { toast } = useToast();

  const generateWhatsAppFormat = (data: StudentRegistration) => {
    const generateId = () => {
      const date = new Date(data.created_at);
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `EN${year}${month}${day}${random}`;
    };

    const generateNote = (location: string, subjects: string[]) => {
      const nearbyAreas = {
        'pongumoodu': 'Pongumoodu, Chavadimukk, Kallampally, Sreekaryam, Cheruvakkal, Parottukonam, Ulloor, Keshavadhasapuram, Kottamugal',
        'trivandrum': 'Trivandrum city, Palayam, Statue, East Fort, Central Station, Medical College, Kowdiar',
        'kollam': 'Kollam city, Chinnakada, Sakthikulangara, Eravipuram, Kadappakada',
        'default': location
      };

      const area = nearbyAreas[location.toLowerCase()] || nearbyAreas['default'];
      const subjectText = subjects.join(', ');
      
      return `Parents are seeking a qualified and experienced tutor to teach ${subjectText}. The ideal candidate should possess excellent communication and teaching skills and have a proven track record of helping students achieve outstanding results, with preference given to tutors residing in or near ${area}.`;
    };

    return `ID-${generateId()}
Subject - ${data.subjects.join(', ')}
Grade - ${data.class_grade}
Syllabus- ${data.class_grade} Curriculum
Location - ${data.location}
Tutor Gender required - No Preference
Medium of Teaching- English/Malayalam
Probable hrs in month- 12 hrs
Hour Rate- 400
Contact ${data.phone}
Note- ${generateNote(data.location, data.subjects)}`;
  };

  const copyToClipboard = () => {
    const whatsappText = generateWhatsAppFormat(student);
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
