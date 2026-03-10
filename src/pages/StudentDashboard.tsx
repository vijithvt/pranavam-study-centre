import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, CreditCard, MessageSquare, ArrowRight, GraduationCap, Shield, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const StudentDashboard = () => {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const [studentProfile, setStudentProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ enquiries: 0, proposals: 0, classes: 0 });

  useEffect(() => {
    const fetchStudent = async () => {
      if (!profile) return;
      const { data } = await (supabase.from('students') as any)
        .select('*')
        .eq('user_id', profile.id)
        .single();

      if (!data) {
        navigate('/student-onboarding');
        return;
      }
      setStudentProfile(data);

      // Fetch stats
      const [enquiriesRes, classesRes] = await Promise.all([
        (supabase.from('enquiries') as any).select('id', { count: 'exact', head: true }).eq('student_id', data.id),
        (supabase.from('assigned_classes') as any).select('id', { count: 'exact', head: true }).eq('student_id', data.id),
      ]);

      setStats({
        enquiries: enquiriesRes.count || 0,
        proposals: 0,
        classes: classesRes.count || 0,
      });

      setLoading(false);
    };
    fetchStudent();
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
        {/* Hero Card */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <CardContent className="relative p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  നിങ്ങൾക്കായി ഏറ്റവും അനുയോജ്യമായ അധ്യാപകനെ കണ്ടെത്തൂ
                </h1>
                <p className="text-primary-foreground/80 text-sm md:text-base">
                  കേരളത്തിലുടനീളം വിശ്വാസത്തോടെ പഠിക്കാം
                </p>
              </div>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg gap-2 self-start"
              >
                <FileText className="h-4 w-4" />
                പുതിയ പഠന ആവശ്യങ്ങൾ നൽകുക
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={FileText}
            label="എന്റെ ആവശ്യങ്ങൾ"
            value={stats.enquiries}
            description="പഠന ആവശ്യങ്ങൾ"
            color="text-primary"
            bgColor="bg-primary/10"
          />
          <StatsCard
            icon={MessageSquare}
            label="അധ്യാപക നിർദ്ദേശങ്ങൾ"
            value={stats.proposals}
            description="ലഭിച്ച നിർദ്ദേശങ്ങൾ"
            color="text-accent-foreground"
            bgColor="bg-accent/10"
          />
          <StatsCard
            icon={BookOpen}
            label="ക്ലാസുകൾ"
            value={stats.classes}
            description="സജീവമായ ക്ലാസുകൾ"
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatsCard
            icon={CreditCard}
            label="പെയ്മെന്റുകൾ"
            value="—"
            description="പെയ്മെന്റ് ചരിത്രം"
            color="text-purple-600"
            bgColor="bg-purple-50"
          />
        </div>

        {/* Empty state / CTA */}
        {stats.enquiries === 0 && (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                പഠനം ആരംഭിക്കാൻ തയ്യാറാണോ?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                നിങ്ങളുടെ ആദ്യ പഠന ആവശ്യം പോസ്റ്റ് ചെയ്യൂ. വിദഗ്ധരായ അധ്യാപകർ നിർദ്ദേശങ്ങൾ അയയ്ക്കും.
              </p>
              <Button size="lg" className="gap-2 font-semibold">
                <FileText className="h-4 w-4" />
                പുതിയ ആവശ്യം പോസ്റ്റ് ചെയ്യുക
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Trust badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TrustBadge
            icon={Shield}
            title="സുരക്ഷിത പ്ലാറ്റ്ഫോം"
            description="പൂർണ്ണ സുരക്ഷിതമായ പെയ്മെന്റ് സിസ്റ്റം"
          />
          <TrustBadge
            icon={Users}
            title="100+ വിദ്യാർത്ഥികൾ"
            description="കേരളത്തിലുടനീളം വിശ്വസിക്കുന്നു"
          />
          <TrustBadge
            icon={GraduationCap}
            title="മികച്ച അധ്യാപകർ"
            description="പരിശോധിച്ച് സ്ഥിരീകരിച്ച അധ്യാപകർ"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

// Stats card sub-component
function StatsCard({ icon: Icon, label, value, description, color, bgColor }: {
  icon: React.ElementType; label: string; value: number | string; description: string; color: string; bgColor: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className={`h-10 w-10 rounded-xl ${bgColor} flex items-center justify-center`}>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
        </div>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-sm font-medium text-foreground/80 mt-0.5">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

// Trust badge sub-component
function TrustBadge({ icon: Icon, title, description }: {
  icon: React.ElementType; title: string; description: string;
}) {
  return (
    <Card className="bg-card/50 border-border/50">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default StudentDashboard;
