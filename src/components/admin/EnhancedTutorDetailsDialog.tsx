import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Download, FileText, Phone, Mail, MapPin, GraduationCap, Calendar, Languages, Copy, Check, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import jsPDF from 'jspdf';

interface TutorRegistration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  district: string;
  location: string;
  subjects: string[];
  classes: string[];
  qualification: string;
  specialization?: string;
  experience: number;
  availability: string;
  languages: string[];
  mode: string;
  status: string;
  admin_comments: string | null;
  created_at: string;
  updated_at: string | null;
  resume_url?: string;
}

interface EnhancedTutorDetailsDialogProps {
  tutor: TutorRegistration | null;
  isOpen: boolean;
  onClose: () => void;
  formatDate: (dateString: string) => string;
}

const EnhancedTutorDetailsDialog = ({ tutor, isOpen, onClose, formatDate }: EnhancedTutorDetailsDialogProps) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  if (!tutor) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Contact information has been copied.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const generateComprehensivePDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    let currentY = 20;

    // Header
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TUTOR REGISTRATION PROFILE', pageWidth / 2, currentY, { align: 'center' });
    
    currentY += 10;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Pranavam Study Centre', pageWidth / 2, currentY, { align: 'center' });
    
    currentY += 20;

    // Personal Information
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PERSONAL INFORMATION', 20, currentY);
    currentY += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const personalInfo = [
      ['Full Name:', tutor.full_name],
      ['Email:', tutor.email],
      ['Phone:', tutor.phone],
      ['WhatsApp:', tutor.whatsapp || 'Same as phone'],
      ['District:', tutor.district],
      ['Location:', tutor.location]
    ];

    personalInfo.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'bold');
      pdf.text(label, 25, currentY);
      pdf.setFont('helvetica', 'normal');
      pdf.text(value, 80, currentY);
      currentY += 8;
    });

    currentY += 10;

    // Academic Qualifications
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ACADEMIC QUALIFICATIONS', 20, currentY);
    currentY += 10;

    pdf.setFontSize(10);
    const qualifications = [
      ['Highest Qualification:', tutor.qualification],
      ['Specialization:', tutor.specialization || 'N/A'],
      ['Experience:', `${tutor.experience} years`]
    ];

    qualifications.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'bold');
      pdf.text(label, 25, currentY);
      pdf.setFont('helvetica', 'normal');
      pdf.text(value, 80, currentY);
      currentY += 8;
    });

    currentY += 10;

    // Teaching Details
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TEACHING DETAILS', 20, currentY);
    currentY += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Subjects:', 25, currentY);
    pdf.setFont('helvetica', 'normal');
    const subjectsText = tutor.subjects.join(', ');
    const subjectsLines = pdf.splitTextToSize(subjectsText, pageWidth - 100);
    pdf.text(subjectsLines, 80, currentY);
    currentY += subjectsLines.length * 6;

    pdf.setFont('helvetica', 'bold');
    pdf.text('Classes/Grades:', 25, currentY);
    pdf.setFont('helvetica', 'normal');
    const classesText = tutor.classes.join(', ');
    const classesLines = pdf.splitTextToSize(classesText, pageWidth - 100);
    pdf.text(classesLines, 80, currentY);
    currentY += classesLines.length * 6;

    const teachingDetails = [
      ['Teaching Mode:', tutor.mode],
      ['Languages:', tutor.languages.join(', ')],
      ['Availability:', tutor.availability]
    ];

    teachingDetails.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'bold');
      pdf.text(label, 25, currentY);
      pdf.setFont('helvetica', 'normal');
      const valueLines = pdf.splitTextToSize(value, pageWidth - 100);
      pdf.text(valueLines, 80, currentY);
      currentY += Math.max(8, valueLines.length * 6);
    });

    currentY += 10;

    // Registration Details
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('REGISTRATION DETAILS', 20, currentY);
    currentY += 10;

    pdf.setFontSize(10);
    const registrationDetails = [
      ['Status:', tutor.status.toUpperCase()],
      ['Registration Date:', formatDate(tutor.created_at)],
      ['Last Updated:', tutor.updated_at ? formatDate(tutor.updated_at) : 'N/A']
    ];

    registrationDetails.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'bold');
      pdf.text(label, 25, currentY);
      pdf.setFont('helvetica', 'normal');
      pdf.text(value, 80, currentY);
      currentY += 8;
    });

    if (tutor.admin_comments) {
      currentY += 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Admin Comments:', 25, currentY);
      currentY += 8;
      pdf.setFont('helvetica', 'normal');
      const commentsLines = pdf.splitTextToSize(tutor.admin_comments, pageWidth - 50);
      pdf.text(commentsLines, 25, currentY);
      currentY += commentsLines.length * 6;
    }

    // Footer
    currentY += 20;
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'italic');
    pdf.text(`Generated on: ${new Date().toLocaleString('en-IN')}`, 20, currentY);
    pdf.text('Pranavam Study Centre - Tutor Management System', 20, currentY + 8);

    return pdf;
  };

  const downloadTutorProfile = async () => {
    setIsDownloading(true);
    try {
      // Generate PDF
      const pdf = generateComprehensivePDF();
      
      // Download profile PDF
      pdf.save(`${tutor.full_name}_Complete_Profile.pdf`);

      // If resume exists, download it separately
      if (tutor.resume_url) {
        const { data: resumeData, error } = await supabase.storage
          .from('tutor-documents')
          .download(tutor.resume_url);

        if (!error && resumeData) {
          const resumeBlob = new Blob([resumeData]);
          const resumeUrl = URL.createObjectURL(resumeBlob);
          const link = document.createElement('a');
          link.href = resumeUrl;
          link.download = `${tutor.full_name}_Resume.pdf`;
          link.click();
          URL.revokeObjectURL(resumeUrl);
        }
      }

      toast({
        title: "Download Complete",
        description: `Downloaded complete profile for ${tutor.full_name}`,
      });

    } catch (error) {
      console.error('Error downloading profile:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download tutor profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Tutor Profile Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
            <Button 
              onClick={() => copyToClipboard(`${tutor.phone}\n${tutor.email}`)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              Copy Contact
            </Button>
            <Button 
              onClick={downloadTutorProfile}
              disabled={isDownloading}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? 'Downloading...' : 'Download Complete Profile'}
            </Button>
            {tutor.resume_url && (
              <Badge variant="secondary" className="flex items-center gap-2">
                <FileText className="w-3 h-3" />
                Resume Available
              </Badge>
            )}
          </div>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input value={tutor.full_name} readOnly />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={tutor.email} readOnly />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={tutor.phone} readOnly />
              </div>
              <div>
                <Label>WhatsApp</Label>
                <Input value={tutor.whatsapp || 'Same as phone'} readOnly />
              </div>
              <div>
                <Label>District</Label>
                <Input value={tutor.district} readOnly />
              </div>
              <div>
                <Label>Location</Label>
                <Input value={tutor.location} readOnly />
              </div>
            </CardContent>
          </Card>

          {/* Academic Qualifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Academic Qualifications
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Highest Qualification</Label>
                <Input value={tutor.qualification} readOnly />
              </div>
              <div>
                <Label>Specialization</Label>
                <Input value={tutor.specialization || 'N/A'} readOnly />
              </div>
              <div>
                <Label>Experience</Label>
                <Input value={`${tutor.experience} years`} readOnly />
              </div>
            </CardContent>
          </Card>

          {/* Teaching Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Teaching Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Teaching Mode</Label>
                  <Input value={tutor.mode} readOnly />
                </div>
                <div>
                  <Label>Availability</Label>
                  <Input value={tutor.availability} readOnly />
                </div>
              </div>
              
              <div>
                <Label>Subjects</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tutor.subjects.map((subject, index) => (
                    <Badge key={index} variant="secondary">{subject}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Classes/Grades</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tutor.classes.map((cls, index) => (
                    <Badge key={index} variant="outline">{cls}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  Languages
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tutor.languages.map((lang, index) => (
                    <Badge key={index} variant="secondary">{lang}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Registration Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Status</Label>
                <Badge 
                  variant={
                    tutor.status === 'approved' ? 'default' :
                    tutor.status === 'pending' ? 'secondary' :
                    tutor.status === 'rejected' ? 'destructive' : 'outline'
                  }
                  className="mt-1"
                >
                  {tutor.status.toUpperCase()}
                </Badge>
              </div>
              <div>
                <Label>Registration Date</Label>
                <Input value={formatDate(tutor.created_at)} readOnly />
              </div>
              <div>
                <Label>Last Updated</Label>
                <Input value={tutor.updated_at ? formatDate(tutor.updated_at) : 'N/A'} readOnly />
              </div>
              {tutor.admin_comments && (
                <div className="md:col-span-3">
                  <Label>Admin Comments</Label>
                  <Textarea value={tutor.admin_comments} readOnly className="mt-1" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedTutorDetailsDialog;