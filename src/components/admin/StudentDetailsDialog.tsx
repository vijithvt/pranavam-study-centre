
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, Calendar, BookOpen, Clock, MessageSquare } from 'lucide-react';

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

interface StudentDetailsDialogProps {
  student: StudentRegistration | null;
  isOpen: boolean;
  onClose: () => void;
  formatDate: (dateString: string) => string;
}

const StudentDetailsDialog = ({ student, isOpen, onClose, formatDate }: StudentDetailsDialogProps) => {
  if (!student) return null;

  // Remove duplicates from subjects array
  const uniqueSubjects = [...new Set(student.subjects)];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{student.student_name}</DialogTitle>
          <DialogDescription>Student Registration Details</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium">Parent/Guardian:</span>
                <p className="text-sm text-gray-600">{student.parent_name}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{student.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{student.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{student.location}, {student.district}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Registered: {formatDate(student.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium">Class/Grade:</span>
                <p className="text-sm text-gray-600">Class {student.class_grade}</p>
              </div>
              <div>
                <span className="text-sm font-medium">Teaching Mode:</span>
                <p className="text-sm text-gray-600">{student.mode}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium">Time Preference:</span>
                  <p className="text-sm text-gray-600">{student.time_preference}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Subjects Needed
            </h3>
            <div className="flex flex-wrap gap-2">
              {uniqueSubjects.map((subject, index) => (
                <Badge key={index} variant="secondary">{subject}</Badge>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          {student.special_requests && (
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Special Requests
              </h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-700">{student.special_requests}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailsDialog;
