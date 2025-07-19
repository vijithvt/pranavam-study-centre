import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import StatsCards from '@/components/admin/StatsCards';
import TutorTable from '@/components/admin/TutorTable';
import StudentTable from '@/components/admin/StudentTable';
import TutorDetailsDialog from '@/components/admin/TutorDetailsDialog';
import StudentDetailsDialog from '@/components/admin/StudentDetailsDialog';
import StatusFilter from '@/components/admin/StatusFilter';
import StatusUpdateDialog from '@/components/admin/StatusUpdateDialog';
import TutorAgreementDialog from '@/components/admin/TutorAgreementDialog';

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

const AdminDashboard = () => {
  const [tutorRegistrations, setTutorRegistrations] = useState<TutorRegistration[]>([]);
  const [studentRegistrations, setStudentRegistrations] = useState<StudentRegistration[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<TutorRegistration[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTutor, setSelectedTutor] = useState<TutorRegistration | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentRegistration | null>(null);
  const [isTutorDialogOpen, setIsTutorDialogOpen] = useState(false);
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [statusUpdateType, setStatusUpdateType] = useState<'tutor' | 'student'>('tutor');
  const [statusUpdateId, setStatusUpdateId] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [tutorStatusFilter, setTutorStatusFilter] = useState('all');
  const [studentStatusFilter, setStudentStatusFilter] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isTutorAgreementOpen, setIsTutorAgreementOpen] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchRegistrations();
  }, []);

  useEffect(() => {
    filterTutors();
  }, [tutorRegistrations, tutorStatusFilter]);

  useEffect(() => {
    filterStudents();
  }, [studentRegistrations, studentStatusFilter]);

  const filterTutors = () => {
    if (tutorStatusFilter === 'all') {
      setFilteredTutors(tutorRegistrations);
    } else {
      setFilteredTutors(tutorRegistrations.filter(tutor => tutor.status === tutorStatusFilter));
    }
  };

  const filterStudents = () => {
    if (studentStatusFilter === 'all') {
      setFilteredStudents(studentRegistrations);
    } else {
      setFilteredStudents(studentRegistrations.filter(student => student.status === studentStatusFilter));
    }
  };

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  };

  const fetchRegistrations = async () => {
    try {
      const [tutorsResult, studentsResult] = await Promise.all([
        supabase.from('tutor_registrations').select('*').order('created_at', { ascending: false }),
        supabase.from('student_registrations').select('*').order('created_at', { ascending: false })
      ]);

      if (tutorsResult.error) throw tutorsResult.error;
      if (studentsResult.error) throw studentsResult.error;

      setTutorRegistrations(tutorsResult.data || []);
      setStudentRegistrations(studentsResult.data || []);
    } catch (error: any) {
      toast({
        title: "Error loading data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no registrations to download.",
        variant: "destructive",
      });
      return;
    }

    const headers = Object.keys(data[0]).filter(key => key !== 'id');
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          if (Array.isArray(value)) {
            return `"${value.join('; ')}"`;
          }
          return `"${value || ''}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTutorViewDetails = (tutor: TutorRegistration) => {
    setSelectedTutor(tutor);
    setIsTutorDialogOpen(true);
  };

  const handleStudentViewDetails = (student: StudentRegistration) => {
    setSelectedStudent(student);
    setIsStudentDialogOpen(true);
  };

  const handleTutorStatusUpdate = (tutorId: string, status: string) => {
    setStatusUpdateType('tutor');
    setStatusUpdateId(tutorId);
    setCurrentStatus(status);
    setIsStatusDialogOpen(true);
  };

  const handleStudentStatusUpdate = (studentId: string, status: string) => {
    setStatusUpdateType('student');
    setStatusUpdateId(studentId);
    setCurrentStatus(status);
    setIsStatusDialogOpen(true);
  };

  const handleStatusUpdated = () => {
    fetchRegistrations();
  };

  if (loading) {
    return (
      <div className="min-h-screen readable-bg flex items-center justify-center">
        <div className="readable-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage tutor and student registrations</p>
          </div>
          <div className="flex space-x-4">
            <Button 
              onClick={() => setIsTutorAgreementOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Tutor Agreement
            </Button>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <StatsCards 
          tutorCount={tutorRegistrations.length}
          studentCount={studentRegistrations.length}
        />

        <Tabs defaultValue="tutors" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tutors">Tutor Registrations</TabsTrigger>
            <TabsTrigger value="students">Student Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="tutors">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Tutor Registrations ({filteredTutors.length})</CardTitle>
                    <CardDescription>All registered tutors</CardDescription>
                  </div>
                  <div className="flex space-x-4">
                    <StatusFilter 
                      selectedStatus={tutorStatusFilter}
                      onStatusChange={setTutorStatusFilter}
                    />
                    <Button onClick={() => exportToCSV(tutorRegistrations, 'tutor_registrations')}>
                      <Download className="h-4 w-4 mr-2" />
                      Download CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <TutorTable 
                  tutors={filteredTutors}
                  onViewDetails={handleTutorViewDetails}
                  onUpdateStatus={handleTutorStatusUpdate}
                  formatDate={formatDate}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Student Requests ({filteredStudents.length})</CardTitle>
                    <CardDescription>All student tuition requests</CardDescription>
                  </div>
                  <div className="flex space-x-4">
                    <StatusFilter 
                      selectedStatus={studentStatusFilter}
                      onStatusChange={setStudentStatusFilter}
                    />
                    <Button onClick={() => exportToCSV(studentRegistrations, 'student_requests')}>
                      <Download className="h-4 w-4 mr-2" />
                      Download CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <StudentTable 
                  students={filteredStudents}
                  onViewDetails={handleStudentViewDetails}
                  onUpdateStatus={handleStudentStatusUpdate}
                  formatDate={formatDate}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <TutorDetailsDialog
          tutor={selectedTutor}
          isOpen={isTutorDialogOpen}
          onClose={() => setIsTutorDialogOpen(false)}
          formatDate={formatDate}
        />

        <StudentDetailsDialog
          student={selectedStudent}
          isOpen={isStudentDialogOpen}
          onClose={() => setIsStudentDialogOpen(false)}
          formatDate={formatDate}
        />

        <StatusUpdateDialog
          isOpen={isStatusDialogOpen}
          onClose={() => setIsStatusDialogOpen(false)}
          type={statusUpdateType}
          recordId={statusUpdateId}
          currentStatus={currentStatus}
          onStatusUpdated={handleStatusUpdated}
        />

        <TutorAgreementDialog
          isOpen={isTutorAgreementOpen}
          onClose={() => setIsTutorAgreementOpen(false)}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
