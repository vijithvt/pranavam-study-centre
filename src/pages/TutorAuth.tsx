
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const TutorAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // To toggle between Sign In and Sign Up
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTutorSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Verify if this user is an accepted tutor
        const { data: profile } = await supabase
          .from('profiles')
          .select('email, role')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          const { data: tutorRegistration } = await supabase
            .from('tutor_registrations')
            .select('status')
            .eq('email', profile.email)
            .eq('status', 'accepted')
            .single();
          
          if (tutorRegistration) {
            navigate('/tutor/dashboard');
          }
        }
      }
    };
    checkTutorSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
         const { data: profile } = await supabase
          .from('profiles')
          .select('email, role')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          const { data: tutorRegistration } = await supabase
            .from('tutor_registrations')
            .select('status')
            .eq('email', profile.email)
            .eq('status', 'accepted')
            .single();
          
          if (tutorRegistration) {
            if (profile.role !== 'tutor') {
              await supabase.from('profiles').update({ role: 'tutor' }).eq('id', session.user.id);
            }
            navigate('/tutor/dashboard');
          } else {
            // Not an accepted tutor, sign them out or show message
            toast({ title: "Access Denied", description: "You are not an accepted tutor.", variant: "destructive" });
            await supabase.auth.signOut();
          }
        } else {
            // Profile not found, might be an issue with handle_new_user trigger or new signup
            toast({ title: "Profile Error", description: "Could not verify tutor status.", variant: "destructive" });
            await supabase.auth.signOut();
        }
      } else if (event === 'SIGNED_OUT') {
        navigate('/tutor-auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign Up
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/tutor-auth`, // Or a specific confirmation page
          },
        });

        if (signUpError) throw signUpError;

        // Check if this email is in tutor_registrations and status is 'accepted'
        // The onAuthStateChange listener will handle role update and navigation after email confirmation
        toast({
          title: "Sign up successful!",
          description: "Please check your email to confirm your account.",
        });

      } else {
        // Sign In
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        // onAuthStateChange will handle navigation for successful sign in
      }
    } catch (error: any) {
      toast({
        title: isSignUp ? "Sign up failed" : "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <LogIn className="h-8 w-8 text-primary mr-3" />
            <CardTitle className="text-2xl">Tutor Portal</CardTitle>
          </div>
          <CardDescription>
            {isSignUp ? "Create your tutor account" : "Sign in to your tutor account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuthAction} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 pr-10"
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (isSignUp ? "Signing up..." : "Signing in...") : (isSignUp ? "Sign Up" : "Sign In")}
            </Button>
          </form>
          <Button variant="link" className="w-full mt-4" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorAuth;
