
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit, Download } from 'lucide-react';
import StatusBadge from './StatusBadge';

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
}

interface TutorTableProps {
  tutors: TutorRegistration[];
  onViewDetails: (tutor: TutorRegistration) => void;
  onUpdateStatus: (tutorId: string, currentStatus: string) => void;
  formatDate: (dateString: string) => string;
}

const TutorTable = ({ tutors, onViewDetails, onUpdateStatus, formatDate }: TutorTableProps) => {
  const exportTutorPDF = (tutor: TutorRegistration) => {
    // Generate PDF content
    const content = `
TUTOR REGISTRATION DETAILS

Name: ${tutor.full_name}
Email: ${tutor.email}
Phone: ${tutor.phone}
Location: ${tutor.location}, ${tutor.district}
Subjects: ${tutor.subjects.join(', ')}
Classes: ${tutor.classes.join(', ')}
Qualification: ${tutor.qualification}
Experience: ${tutor.experience} years
Availability: ${tutor.availability}
Languages: ${tutor.languages.join(', ')}
Mode: ${tutor.mode}
Status: ${tutor.status}
Registration Date: ${formatDate(tutor.created_at)}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Tutor_${tutor.full_name}_Registration.txt`;
    link.click();
    URL.revokeObjectURL(url);
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
                onClick={() => onViewDetails(tutor)}
                className="text-blue-600 hover:text-blue-800 hover:underline"
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
                <Button variant="outline" size="sm" onClick={() => exportTutorPDF(tutor)}>
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
