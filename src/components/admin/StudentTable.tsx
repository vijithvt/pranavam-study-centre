
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit, Download } from 'lucide-react';
import WhatsAppCopyButton from './WhatsAppCopyButton';
import StatusBadge from './StatusBadge';

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
  status: string;
  admin_comments: string | null;
  created_at: string;
  updated_at: string | null;
}

interface StudentTableProps {
  students: StudentRegistration[];
  onViewDetails: (student: StudentRegistration) => void;
  onUpdateStatus: (studentId: string, currentStatus: string) => void;
  formatDate: (dateString: string) => string;
}

const StudentTable = ({ students, onViewDetails, onUpdateStatus, formatDate }: StudentTableProps) => {
  const exportStudentPDF = (student: StudentRegistration) => {
    // Generate PDF content
    const content = `
STUDENT REGISTRATION DETAILS

Student Name: ${student.student_name}
Parent Name: ${student.parent_name}
Email: ${student.email}
Phone: ${student.phone}
Class: ${student.class_grade}
Subjects: ${[...new Set(student.subjects)].join(', ')}
Mode: ${student.mode}
Location: ${student.location}, ${student.district}
Time Preference: ${student.time_preference}
Special Requests: ${student.special_requests}
Status: ${student.status}
Registration Date: ${formatDate(student.created_at)}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Student_${student.student_name}_Registration.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

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
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => {
          // Remove duplicates from subjects array
          const uniqueSubjects = [...new Set(student.subjects)];
          
          return (
            <TableRow key={student.id}>
              <TableCell className="font-medium">
                <button 
                  onClick={() => onViewDetails(student)}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {student.student_name}
                </button>
              </TableCell>
              <TableCell>{student.parent_name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.phone}</TableCell>
              <TableCell>Class {student.class_grade}</TableCell>
              <TableCell>{uniqueSubjects.slice(0, 2).join(', ')}{uniqueSubjects.length > 2 ? '...' : ''}</TableCell>
              <TableCell>{student.location}, {student.district}</TableCell>
              <TableCell>
                <StatusBadge status={student.status} />
              </TableCell>
              <TableCell>{formatDate(student.created_at)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onViewDetails(student)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onUpdateStatus(student.id, student.status)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => exportStudentPDF(student)}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <WhatsAppCopyButton student={student} />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
