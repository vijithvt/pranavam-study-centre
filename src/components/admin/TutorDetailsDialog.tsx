import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";

interface TutorDetailsDialogProps {
  tutor: any;
  isOpen: boolean;
  onClose: () => void;
  formatDate: (dateString: string) => string;
}

const TutorDetailsDialog = ({ tutor, isOpen, onClose, formatDate }: TutorDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tutor Registration Details</DialogTitle>
          <DialogDescription>
            View all the information provided by the tutor during registration.
          </DialogDescription>
        </DialogHeader>

        {tutor && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input type="text" readOnly value={tutor.full_name} />
              </div>
              <div>
                <Label>Email Address</Label>
                <Input type="email" readOnly value={tutor.email} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Phone Number</Label>
                <Input type="tel" readOnly value={tutor.phone} />
              </div>
              <div>
                <Label>WhatsApp Number</Label>
                <Input type="tel" readOnly value={tutor.whatsapp} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>District</Label>
                <Input type="text" readOnly value={tutor.district} />
              </div>
              <div>
                <Label>Location/Area</Label>
                <Input type="text" readOnly value={tutor.location} />
              </div>
            </div>

            <div>
              <Label>Subjects</Label>
              <Input type="text" readOnly value={tutor.subjects?.join(', ') || 'N/A'} />
            </div>

            <div>
              <Label>Classes/Grades</Label>
              <Input type="text" readOnly value={tutor.classes?.join(', ') || 'N/A'} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Highest Qualification</Label>
                <Input type="text" readOnly value={tutor.qualification} />
              </div>
              <div>
                <Label>Specialization</Label>
                <Input type="text" readOnly value={tutor.specialization || 'N/A'} />
              </div>
            </div>

            <div>
              <Label>Years of Experience</Label>
              <Input type="number" readOnly value={tutor.experience} />
            </div>

            <div>
              <Label>Preferred Teaching Mode</Label>
              <Input type="text" readOnly value={tutor.mode} />
            </div>

            <div>
              <Label>Languages</Label>
              <Input type="text" readOnly value={tutor.languages?.join(', ') || 'N/A'} />
            </div>

            <div>
              <Label>Status</Label>
              <Badge variant="secondary">{tutor.status}</Badge>
            </div>

            <div>
              <Label>Admin Comments</Label>
              <Input type="text" readOnly value={tutor.admin_comments || 'N/A'} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Created At</Label>
                <Input type="text" readOnly value={formatDate(tutor.created_at)} />
              </div>
              <div>
                <Label>Last Updated At</Label>
                <Input type="text" readOnly value={tutor.updated_at ? formatDate(tutor.updated_at) : 'N/A'} />
              </div>
            </div>
             {/* Add terms link for sharing if tutor has status 'approved' or equivalent */}
             {tutor && (tutor.status === "approved" || tutor.status === "pending" || tutor.status === "contacted") && (
        <div className="my-4">
          <Label className="text-sm mb-1 text-gray-600">Agreement Link to Share:</Label>
          <div className="flex items-center space-x-2">
            <Input
              readOnly
              value={`${window.location.origin}/tutor-agreement/${tutor.id}`}
              className="w-full"
              onFocus={(e) => e.target.select()}
            />
            <Button
              size="sm"
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/tutor-agreement/${tutor.id}`);
              }}
            >
              Copy Link
            </Button>
            <Link
              to={`/tutor-agreement/${tutor.id}`}
              target="_blank"
              className="ml-2 text-xs underline text-primary"
            >
              Open
            </Link>
          </div>
        </div>
      )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TutorDetailsDialog;
