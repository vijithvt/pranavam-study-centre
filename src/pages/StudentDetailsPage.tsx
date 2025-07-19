
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { Phone, Mail, MapPin, Calendar, BookOpen, Clock, MessageSquare, User, GraduationCap } from 'lucide-react';

interface StudentRegistration {
  id: string;
  student_name: string;
  parent_name: string;
  email: string;
  phone: string;
  class_grade: string;
  subjects: string[];
  specialization?: string;
  mode: string;
  district: string;
  location: string;
  time_preference: string;
  special_requests: string;
  status: string;
  admin_comments?: string;
  created_at: string;
  updated_at?: string;
}

const StudentDetailsPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState<StudentRegistration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const { data, error } = await supabase
        .from('student_registrations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setStudent(data);
    } catch (error) {
      console.error('Error fetching student:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen readable-bg flex items-center justify-center">
        <div className="text-lg readable-text">Loading student details...</div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen readable-bg flex items-center justify-center">
        <div className="text-lg text-destructive">Student not found.</div>
      </div>
    );
  }

  // Remove duplicates from subjects array
  const uniqueSubjects = [...new Set(student.subjects)];

  return (
    <div className="min-h-screen readable-bg py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">{student.student_name}</CardTitle>
                <CardDescription className="text-blue-100 text-lg mt-2">
                  Student Registration Details
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Parent/Guardian:</span>
                    <p className="text-base font-semibold text-gray-800">{student.parent_name}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-base text-gray-700">{student.email}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-base text-gray-700">{student.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-base text-gray-700">{student.location}, {student.district}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
              <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
                Academic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Class/Grade:</span>
                    <p className="text-base font-semibold text-gray-800 capitalize">{student.class_grade}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Learning Mode:</span>
                    <p className="text-base font-semibold text-gray-800 capitalize">{student.mode}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium text-gray-600">Time Preference:</span>
                      <p className="text-base font-semibold text-gray-800 capitalize">{student.time_preference}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <div className="mt-1">
                      <Badge variant="secondary" className="text-sm px-3 py-1 capitalize">{student.status}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subjects or Specialization */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
              <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                {student.specialization ? 'Specialization' : 'Subjects Needed'}
              </h3>
              {student.specialization ? (
                <div className="bg-white p-4 rounded-xl border">
                  <p className="text-lg font-semibold text-gray-800">{student.specialization}</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {uniqueSubjects.map((subject, index) => (
                    <Badge key={index} variant="outline" className="text-sm px-3 py-2 bg-white">
                      {subject}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Special Requests */}
            {student.special_requests && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200">
                <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-yellow-600" />
                  Special Requirements
                </h3>
                <div className="bg-white p-4 rounded-xl border">
                  <p className="text-base text-gray-700 whitespace-pre-line">{student.special_requests}</p>
                </div>
              </div>
            )}

            {/* Admin Information */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                Registration Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-sm font-medium text-gray-600">Registered On:</span>
                  <p className="text-base font-semibold text-gray-800">{formatDate(student.created_at)}</p>
                </div>
                {student.updated_at && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Last Updated:</span>
                    <p className="text-base font-semibold text-gray-800">{formatDate(student.updated_at)}</p>
                  </div>
                )}
              </div>
              {student.admin_comments && (
                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-600">Admin Comments:</span>
                  <div className="bg-white p-3 rounded-lg border mt-2">
                    <p className="text-base text-gray-700">{student.admin_comments}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDetailsPage;
