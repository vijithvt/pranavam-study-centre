
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import StatsCards from '@/components/admin/StatsCards';
import TutorTable from '@/components/admin/TutorTable';
import StudentTable from '@/components/admin/StudentTable';
import TutorDetailsDialog from '@/components/admin/TutorDetailsDialog';
import StudentDetailsDialog from '@/components/admin/StudentDetailsDialog';

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

const AdminDashboard = () => {
  const [tutorRegistrations, setTutorRegistrations] = useState<TutorRegistration[]>([]);
  const [studentRegistrations, setStudentRegistrations] = useState<StudentRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTutor, setSelectedTutor] = useState<TutorRegistration | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentRegistration | null>(null);
  const [isTutorDialogOpen, setIsTutorDialogOpen] = useState(false);
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchRegistrations();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage tutor and student registrations</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
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
                    <CardTitle>Tutor Registrations ({tutorRegistrations.length})</CardTitle>
                    <CardDescription>All registered tutors</CardDescription>
                  </div>
                  <Button onClick={() => exportToCSV(tutorRegistrations, 'tutor_registrations')}>
                    <Download className="h-4 w-4 mr-2" />
                    Download CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <TutorTable 
                  tutors={tutorRegistrations}
                  onViewDetails={handleTutorViewDetails}
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
                    <CardTitle>Student Requests ({studentRegistrations.length})</CardTitle>
                    <CardDescription>All student tuition requests</CardDescription>
                  </div>
                  <Button onClick={() => exportToCSV(studentRegistrations, 'student_requests')}>
                    <Download className="h-4 w-4 mr-2" />
                    Download CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <StudentTable 
                  students={studentRegistrations}
                  onViewDetails={handleStudentViewDetails}
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
      </div>
    </div>
  );
};

export default AdminDashboard;
