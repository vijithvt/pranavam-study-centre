
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye } from 'lucide-react';

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
  created_at: string;
}

interface TutorTableProps {
  tutors: TutorRegistration[];
  onViewDetails: (tutor: TutorRegistration) => void;
  formatDate: (dateString: string) => string;
}

const TutorTable = ({ tutors, onViewDetails, formatDate }: TutorTableProps) => {
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
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tutors.map((tutor) => (
          <TableRow key={tutor.id}>
            <TableCell className="font-medium">{tutor.full_name}</TableCell>
            <TableCell>{tutor.email}</TableCell>
            <TableCell>{tutor.phone}</TableCell>
            <TableCell>{tutor.location}, {tutor.district}</TableCell>
            <TableCell>{tutor.subjects.slice(0, 2).join(', ')}{tutor.subjects.length > 2 ? '...' : ''}</TableCell>
            <TableCell>{tutor.experience} years</TableCell>
            <TableCell>{formatDate(tutor.created_at)}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" onClick={() => onViewDetails(tutor)}>
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TutorTable;
