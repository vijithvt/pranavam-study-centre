
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LogOut, Users, BookOpen, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

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

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{tutorRegistrations.length}</p>
                  <p className="text-gray-600">Tutor Registrations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{studentRegistrations.length}</p>
                  <p className="text-gray-600">Student Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{tutorRegistrations.length + studentRegistrations.length}</p>
                  <p className="text-gray-600">Total Registrations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tutors" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tutors">Tutor Registrations</TabsTrigger>
            <TabsTrigger value="students">Student Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="tutors">
            <div className="grid gap-6">
              {tutorRegistrations.map((tutor) => (
                <Card key={tutor.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{tutor.full_name}</CardTitle>
                        <CardDescription>{tutor.qualification} - {tutor.experience}+ years experience</CardDescription>
                      </div>
                      <Badge variant="secondary">
                        {formatDate(tutor.created_at)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{tutor.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{tutor.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{tutor.location}, {tutor.district}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <strong>Subjects:</strong> {tutor.subjects.join(', ')}
                        </div>
                        <div>
                          <strong>Classes:</strong> {tutor.classes.join(', ')}
                        </div>
                        <div>
                          <strong>Mode:</strong> {tutor.mode}
                        </div>
                        <div>
                          <strong>Languages:</strong> {tutor.languages.join(', ')}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students">
            <div className="grid gap-6">
              {studentRegistrations.map((student) => (
                <Card key={student.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{student.student_name}</CardTitle>
                        <CardDescription>Class {student.class_grade} - Parent: {student.parent_name}</CardDescription>
                      </div>
                      <Badge variant="secondary">
                        {formatDate(student.created_at)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{student.email || 'Not provided'}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{student.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{student.location}, {student.district}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <strong>Subjects:</strong> {student.subjects.join(', ')}
                        </div>
                        <div>
                          <strong>Mode:</strong> {student.mode}
                        </div>
                        <div>
                          <strong>Time:</strong> {student.time_preference}
                        </div>
                        {student.special_requests && (
                          <div>
                            <strong>Special Requests:</strong> {student.special_requests}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
