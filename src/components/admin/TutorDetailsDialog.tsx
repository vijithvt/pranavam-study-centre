
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, Calendar, BookOpen, Users, Globe } from 'lucide-react';

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

interface TutorDetailsDialogProps {
  tutor: TutorRegistration | null;
  isOpen: boolean;
  onClose: () => void;
  formatDate: (dateString: string) => string;
}

const TutorDetailsDialog = ({ tutor, isOpen, onClose, formatDate }: TutorDetailsDialogProps) => {
  if (!tutor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{tutor.full_name}</DialogTitle>
          <DialogDescription>Tutor Registration Details</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{tutor.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{tutor.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{tutor.location}, {tutor.district}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Registered: {formatDate(tutor.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium">Qualification:</span>
                <p className="text-sm text-gray-600">{tutor.qualification}</p>
              </div>
              <div>
                <span className="text-sm font-medium">Experience:</span>
                <p className="text-sm text-gray-600">{tutor.experience} years</p>
              </div>
              <div>
                <span className="text-sm font-medium">Teaching Mode:</span>
                <p className="text-sm text-gray-600">{tutor.mode}</p>
              </div>
              <div>
                <span className="text-sm font-medium">Availability:</span>
                <p className="text-sm text-gray-600">{tutor.availability}</p>
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Subjects
            </h3>
            <div className="flex flex-wrap gap-2">
              {tutor.subjects.map((subject, index) => (
                <Badge key={index} variant="secondary">{subject}</Badge>
              ))}
            </div>
          </div>

          {/* Classes */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Classes/Grades
            </h3>
            <div className="flex flex-wrap gap-2">
              {tutor.classes.map((cls, index) => (
                <Badge key={index} variant="outline">{cls}</Badge>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {tutor.languages.map((language, index) => (
                <Badge key={index} variant="outline">{language}</Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorDetailsDialog;
