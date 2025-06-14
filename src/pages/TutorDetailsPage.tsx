
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

const TutorDetailsPage = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("tutor_registrations")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setTutor(data);
        setLoading(false);
      });
  }, [id]);

  const handleDownloadResume = async () => {
    if (!tutor?.resume_url) return;
    window.open(tutor.resume_url, "_blank");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading tutor details...
      </div>
    );

  if (!tutor)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Tutor not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <Card className="max-w-3xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{tutor.full_name}</CardTitle>
          <CardDescription>
            Tutor Registration Details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Email:</strong> {tutor.email}<br />
            <strong>Phone:</strong> {tutor.phone}<br />
            <strong>District:</strong> {tutor.district}<br />
            <strong>Location:</strong> {tutor.location}<br />
            <strong>Qualification:</strong> {tutor.qualification}<br />
            <strong>Specialization:</strong> {tutor.specialization}<br />
            <strong>Experience:</strong> {tutor.experience} years<br />
            <strong>Availability:</strong> {tutor.availability}<br />
            <strong>Mode:</strong> {tutor.mode}<br />
            <strong>Status:</strong> <Badge>{tutor.status}</Badge>
          </div>
          <div>
            <strong>Subjects:</strong><br />
            <div className="flex flex-wrap gap-2 mt-1">
              {Array.isArray(tutor.subjects)
                ? tutor.subjects.map((s: string, i: number) => (
                    <Badge key={i} variant="secondary">{s}</Badge>
                  ))
                : null}
            </div>
          </div>
          <div>
            <strong>Classes:</strong><br />
            <div className="flex flex-wrap gap-2 mt-1">
              {Array.isArray(tutor.classes)
                ? tutor.classes.map((c: string, i: number) => (
                    <Badge key={i}>{c}</Badge>
                  ))
                : null}
            </div>
          </div>
          <div>
            <strong>Languages:</strong><br />
            <div className="flex flex-wrap gap-2 mt-1">
              {Array.isArray(tutor.languages)
                ? tutor.languages.map((l: string, i: number) => (
                    <Badge key={i} variant="outline">{l}</Badge>
                  ))
                : null}
            </div>
          </div>
          {/* Resume download/view (if uploaded) */}
          {"resume_url" in tutor && tutor.resume_url && (
            <div className="pt-4">
              <button 
                className="flex items-center gap-2 text-blue-700 underline"
                onClick={handleDownloadResume}
              >
                <Download className="h-4 w-4" />
                Download Resume / CV
              </button>
            </div>
          )}
          {tutor.bio && (
            <div>
              <strong>Bio:</strong>
              <div className="whitespace-pre-line">{tutor.bio}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default TutorDetailsPage;
