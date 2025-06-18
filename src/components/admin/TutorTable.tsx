
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit, Download } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useNavigate } from "react-router-dom";
import { useToast } from '@/hooks/use-toast';

interface TutorRegistration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  district: string;
  location: string;
  subjects: string[];
  classes: string[];
  qualification: string;
  experience: number;
  availability: string;
  languages: string[];
  mode: string;
  status: string;
  admin_comments: string | null;
  created_at: string;
  updated_at: string | null;
  whatsapp?: string;
  specialization?: string;
}

interface TutorTableProps {
  tutors: TutorRegistration[];
  onViewDetails: (tutor: TutorRegistration) => void;
  onUpdateStatus: (tutorId: string, currentStatus: string) => void;
  formatDate: (dateString: string) => string;
}

const TutorTable = ({ tutors, onViewDetails, onUpdateStatus, formatDate }: TutorTableProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const generateTutorPDF = (tutor: TutorRegistration): string => {
    const pdfContent = `
TUTOR REGISTRATION FORM
Pranavam Study Centre

PERSONAL INFORMATION
Name: ${tutor.full_name}
Email: ${tutor.email}
Phone: ${tutor.phone}
WhatsApp: ${tutor.whatsapp || 'N/A'}

LOCATION
District: ${tutor.district}
Location/Area: ${tutor.location}

ACADEMIC QUALIFICATIONS
Highest Qualification: ${tutor.qualification}
Specialization: ${tutor.specialization || 'N/A'}
Years of Experience: ${tutor.experience} years

TEACHING DETAILS
Subjects: ${tutor.subjects.join(', ')}
Classes/Grades: ${tutor.classes.join(', ')}
Teaching Mode: ${tutor.mode}
Languages: ${tutor.languages.join(', ')}
Availability: ${tutor.availability}

REGISTRATION DETAILS
Status: ${tutor.status}
Registration Date: ${formatDate(tutor.created_at)}
Last Updated: ${tutor.updated_at ? formatDate(tutor.updated_at) : 'N/A'}

ADMIN COMMENTS
${tutor.admin_comments || 'No comments'}

---
Generated on: ${new Date().toLocaleString('en-IN')}
Pranavam Study Centre - Tutor Registration System
    `.trim();

    return pdfContent;
  };

  const downloadTutorZip = async (tutor: TutorRegistration) => {
    try {
      // Create PDF content
      const pdfContent = generateTutorPDF(tutor);
      
      // Create a simple ZIP-like structure using text files
      const files = [
        {
          name: `${tutor.full_name}_Registration_Form.txt`,
          content: pdfContent
        },
        {
          name: 'README.txt',
          content: `Tutor Registration Package for ${tutor.full_name}

This package contains:
1. Registration Form (${tutor.full_name}_Registration_Form.txt)
2. Resume/CV (if provided by tutor)
3. Certificates (if provided by tutor)

Note: Resume and certificates would be included if file upload feature is implemented.
For now, please contact the tutor directly for these documents.

Contact Information:
Phone: ${tutor.phone}
Email: ${tutor.email}
WhatsApp: ${tutor.whatsapp || 'Same as phone'}

Generated on: ${new Date().toLocaleString('en-IN')}
Pranavam Study Centre
`
        }
      ];

      // Create and download individual files (simulating ZIP download)
      files.forEach((file, index) => {
        setTimeout(() => {
          const blob = new Blob([file.content], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = file.name;
          link.click();
          URL.revokeObjectURL(url);
        }, index * 500); // Stagger downloads
      });

      toast({
        title: "Download Started",
        description: `Downloading registration package for ${tutor.full_name}`,
      });

    } catch (error) {
      console.error('Error creating download package:', error);
      toast({
        title: "Download Failed",
        description: "There was an error creating the download package.",
        variant: "destructive"
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Subjects</TableHead>
          <TableHead>Experience</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tutors.map((tutor) => (
          <TableRow key={tutor.id}>
            <TableCell className="font-medium">
              <button
                onClick={() => navigate(`/tutors/${tutor.id}`)}
                className="text-blue-600 hover:text-blue-800 hover: underline"
              >
                {tutor.full_name}
              </button>
            </TableCell>
            <TableCell>{tutor.email}</TableCell>
            <TableCell>{tutor.phone}</TableCell>
            <TableCell>{tutor.location}, {tutor.district}</TableCell>
            <TableCell>{tutor.subjects.slice(0, 2).join(', ')}{tutor.subjects.length > 2 ? '...' : ''}</TableCell>
            <TableCell>{tutor.experience} years</TableCell>
            <TableCell>
              <StatusBadge status={tutor.status} />
            </TableCell>
            <TableCell>{formatDate(tutor.created_at)}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onViewDetails(tutor)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onUpdateStatus(tutor.id, tutor.status)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => downloadTutorZip(tutor)} title="Download Registration Package">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TutorTable;
