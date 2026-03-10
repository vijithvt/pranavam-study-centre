import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, BookOpen, Wallet, Search, UserCircle, TrendingUp, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const TutorDashboard = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [tutorProfile, setTutorProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ proposals: 0, classes: 0, earnings: 0 });

  useEffect(() => {
    const fetchTutor = async () => {
      if (!profile) return;
      const { data } = await (supabase.from('tutors') as any)
        .select('*')
        .eq('user_id', profile.id)
        .single();

      if (!data) {
        navigate('/tutor-onboarding');
        return;
      }
      setTutorProfile(data);

      // Fetch stats
      const [proposalsRes, classesRes] = await Promise.all([
        (supabase.from('tutor_proposals') as any).select('id', { count: 'exact', head: true }).eq('tutor_id', data.id),
        (supabase.from('assigned_classes') as any).select('id', { count: 'exact', head: true }).eq('tutor_id', data.id),
      ]);

      setStats({
        proposals: proposalsRes.count || 0,
        classes: classesRes.count || 0,
        earnings: 0,
      });

      setLoading(false);
    };
    fetchTutor();
  }, [profile, navigate]);

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
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            സ്വാഗതം, {tutorProfile?.name || 'അധ്യാപകൻ'}!
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            നിങ്ങളുടെ അധ്യാപന ജീവിതം ഇവിടെ നിയന്ത്രിക്കൂ
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Send className="h-5 w-5 text-blue-600" />
                </div>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.proposals}</div>
              <p className="text-sm font-medium text-foreground/80">അപേക്ഷകൾ അയച്ചത്</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <Star className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.classes}</div>
              <p className="text-sm font-medium text-foreground/80">ക്ലാസുകൾ ലഭിച്ചത്</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">₹{stats.earnings.toLocaleString('en-IN')}</div>
              <p className="text-sm font-medium text-foreground/80">മൊത്തം വരുമാനം</p>
            </CardContent>
          </Card>
        </div>

        {/* Available Enquiries Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">ലഭ്യമായ പഠന ആവശ്യങ്ങൾ</CardTitle>
            <Button variant="outline" size="sm" className="gap-1">
              <Search className="h-3.5 w-3.5" />
              എല്ലാം കാണുക
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-8 text-center">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Search className="h-7 w-7 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm">
                പുതിയ പഠന ആവശ്യങ്ങൾ ലഭ്യമാകുമ്പോൾ ഇവിടെ കാണാം
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Verification badge */}
        {tutorProfile?.verification_status === 'pending' && (
          <Card className="border-warning/30 bg-warning/5">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
                <UserCircle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">പ്രൊഫൈൽ പരിശോധന തീർപ്പാക്കിയിട്ടില്ല</p>
                <p className="text-xs text-muted-foreground">
                  അഡ്മിൻ നിങ്ങളുടെ പ്രൊഫൈൽ പരിശോധിക്കുന്നു. സ്ഥിരീകരണം ലഭിക്കും വരെ കാത്തിരിക്കുക.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TutorDashboard;
