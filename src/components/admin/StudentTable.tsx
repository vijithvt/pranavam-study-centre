
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye } from 'lucide-react';
import WhatsAppCopyButton from './WhatsAppCopyButton';

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

interface StudentTableProps {
  students: StudentRegistration[];
  onViewDetails: (student: StudentRegistration) => void;
  formatDate: (dateString: string) => string;
}

const StudentTable = ({ students, onViewDetails, formatDate }: StudentTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student Name</TableHead>
          <TableHead>Parent Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Subjects</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.student_name}</TableCell>
            <TableCell>{student.parent_name}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.phone}</TableCell>
            <TableCell>Class {student.class_grade}</TableCell>
            <TableCell>{student.subjects.slice(0, 2).join(', ')}{student.subjects.length > 2 ? '...' : ''}</TableCell>
            <TableCell>{student.location}, {student.district}</TableCell>
            <TableCell>{formatDate(student.created_at)}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onViewDetails(student)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <WhatsAppCopyButton student={student} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
