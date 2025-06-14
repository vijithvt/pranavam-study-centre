
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StudentDetailsPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    // Fetch all details for student registration
    fetchStudent();
    async function fetchStudent() {
      const res = await fetch(`/api/student-details?id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setStudent(data);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading student details...</div>;
  if (!student)
    return <div className="min-h-screen flex items-center justify-center">Student not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <Card className="max-w-3xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{student.student_name}</CardTitle>
          <CardDescription>Student Registration Details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Parent Name:</strong> {student.parent_name}<br />
            <strong>Email:</strong> {student.email}<br />
            <strong>Phone:</strong> {student.phone}<br />
            <strong>Class/Grade:</strong> {student.class_grade}<br />
            <strong>District:</strong> {student.district}<br />
            <strong>Location:</strong> {student.location}<br />
            <strong>Status:</strong> <Badge>{student.status}</Badge><br />
          </div>
          <div>
            <strong>Subjects Needed:</strong>
            <div className="flex flex-wrap gap-2 mt-1">
              {Array.isArray(student.subjects)
                ? [...new Set(student.subjects)].map((s: string, i: number) => (
                    <Badge key={i} variant="secondary">{s}</Badge>
                  ))
                : null}
            </div>
          </div>
          <div>
            <strong>Mode:</strong> {student.mode}<br />
            <strong>Time Preference:</strong> {student.time_preference}<br />
            {student.special_requests && (
              <>
                <strong>Special Requests:</strong>
                <div className="bg-gray-50 p-2 rounded text-gray-700 whitespace-pre-line">{student.special_requests}</div>
              </>
            )}
          </div>
          {/* Add any other details as fields */}
        </CardContent>
      </Card>
    </div>
  );
};
export default StudentDetailsPage;
