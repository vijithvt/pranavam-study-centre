
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

interface TutorProfile {
  id: string;
  full_name: string;
  email: string;
  // Add other fields as needed from tutor_registrations
}

const TutorDashboard = () => {
  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchTutorData = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        toast({ title: "Authentication Error", description: "Please sign in.", variant: "destructive" });
        navigate('/tutor-auth');
        return;
      }
      setAuthUser(session.user);

      // 1. Fetch profile to get email
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('email, role')
        .eq('id', session.user.id)
        .single();

      if (profileError || !profileData) {
        toast({ title: "Profile Error", description: "Could not load your profile. Please try signing in again.", variant: "destructive" });
        await supabase.auth.signOut(); // Sign out if profile is missing
        navigate('/tutor-auth');
        return;
      }

      // 2. Fetch tutor registration details using email and check status
      const { data: tutorRegData, error: tutorRegError } = await supabase
        .from('tutor_registrations')
        .select('*') // Fetch all details for the dashboard
        .eq('email', profileData.email)
        .single();

      if (tutorRegError || !tutorRegData) {
        toast({ title: "Access Denied", description: "Tutor registration not found.", variant: "destructive" });
        await supabase.auth.signOut();
        navigate('/tutor-auth');
        return;
      }

      if (tutorRegData.status !== 'accepted') {
        toast({ title: "Access Denied", description: "Your registration is not yet accepted.", variant: "destructive" });
        await supabase.auth.signOut();
        navigate('/tutor-auth');
        return;
      }
      
      // 3. Update role to 'tutor' in profiles if not already set
      if (profileData.role !== 'tutor') {
        const { error: updateRoleError } = await supabase
          .from('profiles')
          .update({ role: 'tutor' })
          .eq('id', session.user.id);

        if (updateRoleError) {
          toast({ title: "Profile Update Error", description: "Could not update your role. Some features may not work.", variant: "destructive" });
        }
      }
      
      setTutor(tutorRegData as TutorProfile);
      setLoading(false);
    };

    fetchTutorData();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/tutor-auth');
      } else if (event === 'USER_UPDATED' && session) {
        setAuthUser(session.user);
        // Potentially refetch tutor data if email or other critical authUser info changes
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };

  }, [navigate, toast]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/tutor-auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading tutor dashboard...</div>
      </div>
    );
  }

  if (!tutor) {
     // This case should ideally be caught by the loading/redirect logic earlier
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Error loading tutor information. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tutor Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome, {tutor.full_name}!</CardTitle>
            <CardDescription>Here you can manage your assigned students and classes.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Your email: {tutor.email}</p>
            <p className="mt-4">More features coming soon: assigned students, class logging, etc.</p>
          </CardContent>
        </Card>

        {/* Placeholder for future content like assigned students list */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Assigned Students</h2>
          <p className="text-gray-600 mt-2">This section will display students assigned to you by the admin.</p>
          {/* Example: <AssignedStudentsTable tutorId={tutor.id} /> */}
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
