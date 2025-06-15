
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Dummy student template
const DUMMY_STUDENTS = [
  {
    student_name: "Dummy Student 1",
    parent_name: "Parent A",
    email: "dummy1@example.com",
    phone: "+91000000111",
    class_grade: "10",
    subjects: ["Mathematics", "Science"],
    mode: "home",
    district: "Ernakulam",
    location: "Kochi",
    time_preference: "evening",
    special_requests: "Needs extra practice sheets",
  },
  {
    student_name: "Dummy Student 2",
    parent_name: "Parent B",
    email: "dummy2@example.com",
    phone: "+91000000222",
    class_grade: "11",
    subjects: ["Physics", "Chemistry"],
    mode: "online",
    district: "Thrissur",
    location: "Thrissur town",
    time_preference: "morning",
    special_requests: "",
  },
  {
    student_name: "Dummy Student 3",
    parent_name: "Parent C",
    email: "dummy3@example.com",
    phone: "+91000000333",
    class_grade: "12",
    subjects: ["Biology", "English"],
    mode: "both",
    district: "Kottayam",
    location: "Kottayam city",
    time_preference: "afternoon",
    special_requests: "Prefers female tutor",
  },
  {
    student_name: "Dummy Student 4",
    parent_name: "Parent D",
    email: "dummy4@example.com",
    phone: "+91000000444",
    class_grade: "9",
    subjects: ["Social Science"],
    mode: "home",
    district: "Alappuzha",
    location: "Alleppey",
    time_preference: "flexible",
    special_requests: "",
  },
  {
    student_name: "Dummy Student 5",
    parent_name: "Parent E",
    email: "dummy5@example.com",
    phone: "+91000000555",
    class_grade: "8",
    subjects: ["Computer Science"],
    mode: "online",
    district: "Trivandrum",
    location: "TVM",
    time_preference: "evening",
    special_requests: "Needs beginner-friendly tutor",
  },
];

const DEFAULT_EXTRA_FIELDS = {
  status: "new",
  budget: "2000",
  tutor_gender: "no-preference",
  syllabus: "CBSE",
  urgency: "within-week",
  languages: "English",
  university: null,
  branch: null,
  custom_subjects: null,
  admin_comments: null,
};

function mergeStudentFields(dummy: any) {
  return {
    ...dummy,
    ...DEFAULT_EXTRA_FIELDS,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

const StudentRegistrationTester = () => {
  const [result, setResult] = useState<string | null>(null);
  const [details, setDetails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // For safety, restrict to dev only
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

  async function handleRunTest() {
    setResult(null);
    setDetails([]);
    setIsLoading(true);

    // Insert 5 dummy students
    const studentsToAdd = DUMMY_STUDENTS.map(mergeStudentFields);
    const { data: insertData, error: insertError } = await supabase
      .from("student_registrations")
      .insert(studentsToAdd)
      .select();

    if (insertError) {
      setResult(`FAIL: Insertion error - ${insertError.message}`);
      setIsLoading(false);
      return;
    }

    // Fetch newly inserted by e-mail (for validation)
    const emails = DUMMY_STUDENTS.map(s => s.email);
    const { data: found, error: fetchError } = await supabase
      .from("student_registrations")
      .select("*")
      .in("email", emails);

    if (fetchError) {
      setResult(`FAIL: Fetch error - ${fetchError.message}`);
      setIsLoading(false);
      return;
    }

    // Validate: check existence and property match count
    if (!found || found.length !== 5) {
      setResult(`FAIL: Only found ${found?.length || 0} of 5 students`);
      setDetails(found || []);
      setIsLoading(false);
      return;
    }
    // Deep check fields
    let failed = false;
    for (let dummy of DUMMY_STUDENTS) {
      const inDb = found.find(s => s.email === dummy.email);
      if (!inDb) {
        failed = true;
        setResult(`FAIL: Missing student with email ${dummy.email}`);
        setDetails(found);
        setIsLoading(false);
        return;
      }
      if (
        inDb.student_name !== dummy.student_name ||
        inDb.parent_name !== dummy.parent_name ||
        inDb.class_grade !== dummy.class_grade
      ) {
        failed = true;
        setResult(`FAIL: Data mismatch for student ${dummy.student_name}`);
        setDetails(found);
        setIsLoading(false);
        return;
      }
    }
    if (!failed) {
      setResult("PASS: All 5 dummy students added and validated successfully!");
      setDetails(found);
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Student Registration Automation Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p>
              This tool will insert 5 dummy student registrations into your Supabase database, then fetch and validate them.
            </p>
            {!isLocal && (
              <div className="text-red-700 font-bold mt-2">
                ⚠️ This automation test is enabled only on localhost for safety! Please run on your local development environment.
              </div>
            )}
          </div>
          <Button
            onClick={handleRunTest}
            disabled={isLoading || !isLocal}
            className="mb-4"
          >
            {isLoading ? "Running..." : "Run Automation Test"}
          </Button>
          {result && (
            <div className={`font-mono mb-4 ${result.startsWith("PASS") ? "text-green-700" : "text-red-700"}`}>
              {result}
            </div>
          )}
          {details.length > 0 && (
            <div className="bg-gray-50 rounded p-2 text-xs overflow-auto" style={{ maxHeight: 200 }}>
              <pre>{JSON.stringify(details, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentRegistrationTester;
