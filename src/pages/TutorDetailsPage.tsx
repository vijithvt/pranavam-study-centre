
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Phone, Mail, MapPin, Calendar, BookOpen, GraduationCap, User, Languages, Clock, MessageSquare } from 'lucide-react';

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
  admin_comments?: string;
  created_at: string;
  updated_at?: string;
}

const TutorDetailsPage = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState<TutorRegistration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchTutor();
  }, [id]);

  const fetchTutor = async () => {
    try {
      const { data, error } = await supabase
        .from('tutor_registrations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setTutor(data);
    } catch (error) {
      console.error('Error fetching tutor:', error);
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading tutor details...</div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Tutor not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">{tutor.full_name}</CardTitle>
                <CardDescription className="text-green-100 text-lg mt-2">
                  Tutor Registration Details
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
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-base text-gray-700">{tutor.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-base text-gray-700">{tutor.phone}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {tutor.whatsapp && (
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span className="text-base text-gray-700">WhatsApp: {tutor.whatsapp}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-base text-gray-700">{tutor.location}, {tutor.district}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Qualifications */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-200">
              <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-purple-600" />
                Qualifications & Experience
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Highest Qualification:</span>
                    <p className="text-base font-semibold text-gray-800">{tutor.qualification}</p>
                  </div>
                  {tutor.specialization && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Specialization:</span>
                      <p className="text-base font-semibold text-gray-800">{tutor.specialization}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Experience:</span>
                    <p className="text-base font-semibold text-gray-800">{tutor.experience} years</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <div className="mt-1">
                      <Badge variant="secondary" className="text-sm px-3 py-1 capitalize">{tutor.status}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Teaching Details */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
              <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                Teaching Details
              </h3>
              <div className="space-y-6">
                <div>
                  <span className="text-sm font-medium text-gray-600">Subjects:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tutor.subjects.map((subject, index) => (
                      <Badge key={index} variant="outline" className="text-sm px-3 py-1 bg-white">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Classes/Grades:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tutor.classes.map((classItem, index) => (
                      <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                        {classItem}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Teaching Mode:</span>
                    <p className="text-base font-semibold text-gray-800 capitalize">{tutor.mode}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium text-gray-600">Availability:</span>
                      <p className="text-base font-semibold text-gray-800">{tutor.availability}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200">
              <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
                <Languages className="h-5 w-5 text-yellow-600" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {tutor.languages.map((language, index) => (
                  <Badge key={index} variant="outline" className="text-sm px-3 py-2 bg-white">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Admin Information */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                Registration Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-sm font-medium text-gray-600">Registered On:</span>
                  <p className="text-base font-semibold text-gray-800">{formatDate(tutor.created_at)}</p>
                </div>
                {tutor.updated_at && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Last Updated:</span>
                    <p className="text-base font-semibold text-gray-800">{formatDate(tutor.updated_at)}</p>
                  </div>
                )}
              </div>
              {tutor.admin_comments && (
                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-600">Admin Comments:</span>
                  <div className="bg-white p-3 rounded-lg border mt-2">
                    <p className="text-base text-gray-700">{tutor.admin_comments}</p>
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

export default TutorDetailsPage;
