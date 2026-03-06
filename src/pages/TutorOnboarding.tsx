import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const TutorOnboarding = () => {
  const [name, setName] = useState('');
  const [subjects, setSubjects] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { profile, refreshProfile } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !profile) return;

    setLoading(true);
    try {
      const subjectsArray = subjects.split(',').map(s => s.trim()).filter(Boolean);
      
      const { error } = await (supabase.from('tutors') as any).insert({
        user_id: profile.id,
        name: name.trim(),
        subjects: subjectsArray,
        experience: experience.trim() || null,
        bio: bio.trim() || null,
        location: location.trim() || null,
      });

      if (error) throw error;

      await refreshProfile();
      toast({
        title: "Profile Complete!",
        description: "Your profile is under review. You'll be notified once verified.",
      });
      navigate('/tutor-dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4 pt-20">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Complete Your Tutor Profile</CardTitle>
          <CardDescription>Tell us about your expertise to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1" placeholder="Your full name" />
            </div>
            <div>
              <Label htmlFor="subjects">Subjects (comma-separated) *</Label>
              <Input id="subjects" value={subjects} onChange={(e) => setSubjects(e.target.value)} required className="mt-1" placeholder="Mathematics, Physics, Chemistry" />
            </div>
            <div>
              <Label htmlFor="experience">Teaching Experience</Label>
              <Input id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} className="mt-1" placeholder="e.g., 5 years" />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="mt-1" placeholder="Tell students about your teaching style..." rows={3} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="pl-10" placeholder="City, State" />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Complete Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorOnboarding;
