import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, ClipboardList, IndianRupee, TrendingUp, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TutorTable from '@/components/admin/TutorTable';
import StudentTable from '@/components/admin/StudentTable';
import EnhancedTutorDetailsDialog from '@/components/admin/EnhancedTutorDetailsDialog';
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
  whatsapp?: string;
  specialization?: string;
  resume_url?: string;
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
    fetchRegistrations();
  }, []);

  useEffect(() => {
    if (tutorStatusFilter === 'all') setFilteredTutors(tutorRegistrations);
    else setFilteredTutors(tutorRegistrations.filter(t => t.status === tutorStatusFilter));
  }, [tutorRegistrations, tutorStatusFilter]);

  useEffect(() => {
    if (studentStatusFilter === 'all') setFilteredStudents(studentRegistrations);
    else setFilteredStudents(studentRegistrations.filter(s => s.status === studentStatusFilter));
  }, [studentRegistrations, studentStatusFilter]);

  const fetchRegistrations = async () => {
    try {
      const [tutorsResult, studentsResult] = await Promise.all([
        (supabase as any).from('tutor_registrations').select('*').order('created_at', { ascending: false }),
        (supabase as any).from('student_registrations').select('*').order('created_at', { ascending: false })
      ]);
      if (tutorsResult.error) throw tutorsResult.error;
      if (studentsResult.error) throw studentsResult.error;
      setTutorRegistrations(tutorsResult.data || []);
      setStudentRegistrations(studentsResult.data || []);
    } catch (error: any) {
      toast({ title: "Error loading data", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast({ title: "No data to export", description: "There are no registrations to download.", variant: "destructive" });
      return;
    }
    const headers = Object.keys(data[0]).filter(key => key !== 'id');
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        headers.map(header => {
          const value = row[header];
          return Array.isArray(value) ? `"${value.join('; ')}"` : `"${value || ''}"`;
        }).join(',')
      )
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">അഡ്മിൻ ഡാഷ്ബോർഡ്</h1>
          <p className="text-muted-foreground text-sm mt-1">രജിസ്ട്രേഷനുകളും ആവശ്യങ്ങളും മാനേജ് ചെയ്യൂ</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminStatCard icon={Users} label="അധ്യാപകർ" value={tutorRegistrations.length} color="text-blue-600" bgColor="bg-blue-50" />
          <AdminStatCard icon={ClipboardList} label="വിദ്യാർത്ഥി ആവശ്യങ്ങൾ" value={studentRegistrations.length} color="text-green-600" bgColor="bg-green-50" />
          <AdminStatCard icon={TrendingUp} label="മൊത്തം രജിസ്ട്രേഷനുകൾ" value={tutorRegistrations.length + studentRegistrations.length} color="text-purple-600" bgColor="bg-purple-50" />
          <AdminStatCard icon={IndianRupee} label="വരുമാനം" value="—" color="text-amber-600" bgColor="bg-amber-50" />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tutors" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="tutors">അധ്യാപക രജിസ്ട്രേഷനുകൾ</TabsTrigger>
            <TabsTrigger value="students">വിദ്യാർത്ഥി ആവശ്യങ്ങൾ</TabsTrigger>
          </TabsList>

          <TabsContent value="tutors">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div>
                    <CardTitle className="text-base">അധ്യാപക രജിസ്ട്രേഷനുകൾ ({filteredTutors.length})</CardTitle>
                    <CardDescription>എല്ലാ രജിസ്റ്റർ ചെയ്ത അധ്യാപകർ</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <StatusFilter selectedStatus={tutorStatusFilter} onStatusChange={setTutorStatusFilter} />
                    <Button variant="outline" size="sm" onClick={() => exportToCSV(tutorRegistrations, 'tutor_registrations')}>
                      <Download className="h-3.5 w-3.5 mr-1.5" /> CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsTutorAgreementOpen(true)}>
                      <FileText className="h-3.5 w-3.5 mr-1.5" /> Agreement
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <TutorTable
                  tutors={filteredTutors}
                  onViewDetails={(t) => { setSelectedTutor(t); setIsTutorDialogOpen(true); }}
                  onUpdateStatus={(id, status) => { setStatusUpdateType('tutor'); setStatusUpdateId(id); setCurrentStatus(status); setIsStatusDialogOpen(true); }}
                  formatDate={formatDate}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div>
                    <CardTitle className="text-base">വിദ്യാർത്ഥി ആവശ്യങ്ങൾ ({filteredStudents.length})</CardTitle>
                    <CardDescription>എല്ലാ വിദ്യാർത്ഥി ആവശ്യങ്ങളും</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <StatusFilter selectedStatus={studentStatusFilter} onStatusChange={setStudentStatusFilter} />
                    <Button variant="outline" size="sm" onClick={() => exportToCSV(studentRegistrations, 'student_requests')}>
                      <Download className="h-3.5 w-3.5 mr-1.5" /> CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <StudentTable
                  students={filteredStudents}
                  onViewDetails={(s) => { setSelectedStudent(s); setIsStudentDialogOpen(true); }}
                  onUpdateStatus={(id, status) => { setStatusUpdateType('student'); setStatusUpdateId(id); setCurrentStatus(status); setIsStatusDialogOpen(true); }}
                  formatDate={formatDate}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <EnhancedTutorDetailsDialog tutor={selectedTutor} isOpen={isTutorDialogOpen} onClose={() => setIsTutorDialogOpen(false)} formatDate={formatDate} />
        <StudentDetailsDialog student={selectedStudent} isOpen={isStudentDialogOpen} onClose={() => setIsStudentDialogOpen(false)} formatDate={formatDate} />
        <StatusUpdateDialog isOpen={isStatusDialogOpen} onClose={() => setIsStatusDialogOpen(false)} type={statusUpdateType} recordId={statusUpdateId} currentStatus={currentStatus} onStatusUpdated={fetchRegistrations} />
        <TutorAgreementDialog isOpen={isTutorAgreementOpen} onClose={() => setIsTutorAgreementOpen(false)} />
      </div>
    </DashboardLayout>
  );
};

function AdminStatCard({ icon: Icon, label, value, color, bgColor }: {
  icon: React.ElementType; label: string; value: number | string; color: string; bgColor: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div className={`h-12 w-12 rounded-xl ${bgColor} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminDashboard;
