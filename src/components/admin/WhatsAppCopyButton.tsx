
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

  const generateWhatsAppFormat = (data: StudentRegistration) => {
    const generateId = () => {
      const date = new Date(data.created_at);
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

    const budgetMap = {
      '1000-2000': { rate: '200', hours: '12' },
      '2000-3000': { rate: '250', hours: '12' },
      '3000-5000': { rate: '350', hours: '12' },
      '5000-8000': { rate: '400', hours: '16' },
      '8000-12000': { rate: '500', hours: '16' },
      '12000+': { rate: '600', hours: '20' }
    };

    const budget = budgetMap[data.budget] || { rate: '400', hours: '12' };

    return `ID-${generateId()}
Subject - ${data.subjects.join(', ')}
Grade - ${data.class_grade}
Syllabus - ${data.syllabus || 'CBSE'}
Location - ${data.mode === 'online' ? 'Online' : data.location}
Tutor Gender required - ${data.tutor_gender || 'No Preference'}
Medium of Teaching - ${data.languages || 'English/Malayalam'}
Probable hrs in month - ${budget.hours} hrs
Hour Rate - ${budget.rate}
Contact 9496315903
Note - ${generateNote(data.location, data.subjects, data.syllabus || 'CBSE', data.class_grade)}`;
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
