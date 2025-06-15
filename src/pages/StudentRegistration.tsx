import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StepWizard from "@/components/forms/StepWizard";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import PersonalInfoSection from '@/components/forms/PersonalInfoSection';
import LocationSection from '@/components/forms/LocationSection';
import SubjectPreferencesSection from '@/components/forms/SubjectPreferencesSection';
import BudgetCalculatorSection from '@/components/forms/BudgetCalculatorSection';
import FormSectionCard from '@/components/forms/FormSectionCard';
import { useToast } from '@/hooks/use-toast';

const subjectSchema = z.object({
  subjects: z
    .array(z.string())
    .min(1, "Please select or enter at least one subject.")
    .or(z.array(z.object({ customSubjects: z.string().min(1) })).min(1, "Please enter subject(s).")),
  customSubjects: z.string().optional(),
  otherSubjects: z.string().optional(),
});

const phoneRegex = /^\+?\d{10,15}$/;

const infoSchema = z.object({
  studentName: z.string().min(2),
  parentName: z.string().min(2),
  email: z.string().email({ message: "Please enter a valid email address." }),
  parentPhone: z.string().regex(phoneRegex, "Phone with country code, 10-15 digits."),
  class: z.string().min(1),
  mode: z.string().min(1),
  syllabus: z.string().optional(),
  university: z.string().optional(),
  branch: z.string().optional(),
  preferredTime: z.string().optional(),
  languages: z.string().optional(),
  district: z.string().min(1),
  area: z.string().min(1),
});

const budgetSchema = z.object({
  monthlyFee: z.coerce.number().min(1000).max(50000),
});

const preferenceSchema = z.object({
  tutorGender: z.string().min(1),
  urgency: z.string().min(1),
  requirements: z.string().optional(),
  consent: z.boolean().refine((v) => v, "Consent required"),
});

function useQueryParam(param: string) {
  const { search } = useLocation();
  return React.useMemo(() => {
    try {
      return new URLSearchParams(search).get(param) || "";
    } catch {
      return "";
    }
  }, [search]);
}

const stepsDef = [
  { title: "Subject Preferences" },
  { title: "Student & Parent Info" },
  { title: "Budget & Scheduling" },
  { title: "Preferences & Needs" },
];

const defaultValues = {
  studentName: "",
  parentName: "",
  email: "",
  parentPhone: "",
  class: "",
  mode: "",
  syllabus: "",
  university: "",
  branch: "",
  preferredTime: "",
  languages: "",
  district: "",
  area: "",
  monthlyFee: 8000,
  requirements: "",
  subjects: [],
  customSubjects: "",
  otherSubjects: "",
  tutorGender: "",
  urgency: "",
  consent: false,
}

const StudentRegistration = () => {
  const [step, setStep] = React.useState(0);
  const [stepError, setStepError] = React.useState<string>("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submittedData, setSubmittedData] = React.useState<any>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const subjectParam = useQueryParam("subject");

  const methods = useForm({
    mode: "onChange",
    defaultValues,
  });

  const {
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { isValid },
  } = methods;

  // Prefill subjects from search param
  useEffect(() => {
    if (subjectParam && step === 0) {
      // try to smart match
      if (
        [
          "B.Tech",
          "B.Sc",
          "B.A",
          "B.Com",
          "LLB",
          "M.Tech",
          "M.Sc",
          "M.A",
          "M.Com",
          "Music",
          "Dance",
          "Art/Drawing",
          "Violin (Classical)",
          "Violin (Western)",
          "NEET",
          "JEE",
          "UPSC",
          "PSC",
          "Banking",
          "SSC",
          "Railway",
        ].map((s) => s.toLowerCase()).includes(subjectParam.toLowerCase())
      ) {
        setValue("class", subjectParam.toLowerCase());
      } else {
        setValue("otherSubjects", subjectParam);
        setValue("subjects", [subjectParam]);
      }
    }
  }, [subjectParam, step, setValue]);

  // Step configs
  const steps = [
    {
      title: stepsDef[0].title,
      content: (
        <FormSectionCard title="Subject Preferences"
          description="Which subjects do you need help with?">
          <SubjectPreferencesSection
            classGrade={methods.watch("class")}
            defaultOtherSubject={methods.watch("otherSubjects")}
            onSubjectsChange={(subs) => setValue("subjects", subs)}
            onOtherSubjectChange={(other) => setValue("otherSubjects", other)}
            selectedSubjects={methods.watch("subjects")}
          />
        </FormSectionCard>
      ),
      validate: async () => {
        // At least 1 subject or customSubjects
        const subs = methods.getValues("subjects") || [];
        const other = methods.getValues("otherSubjects");
        const custom = methods.getValues("customSubjects");
        if (
          (!custom && (!subs || subs.length === 0) && !other)
        ) {
          setStepError("Please select or enter at least one subject.");
          return false;
        }
        setStepError("");
        return true;
      },
    },
    {
      title: stepsDef[1].title,
      content: (
        <FormSectionCard title="Student & Parent Information"
          description="Provide basics to help us contact you and recommend best tutors.">
          <PersonalInfoSection
            classGrade={methods.watch("class")}
            setClassGrade={(val) => methods.setValue("class", val)}
          />
          <LocationSection />
        </FormSectionCard>
      ),
      validate: async () => {
        const valid = await trigger([
          "studentName",
          "parentName",
          "email",
          "parentPhone",
          "class",
          "mode",
          "district",
          "area",
          "syllabus",
        ]);
        setStepError(valid ? "" : "Please correct highlighted fields.");
        return valid;
      },
    },
    {
      title: stepsDef[2].title,
      content: (
        <FormSectionCard title="Budget & Scheduling"
          description="Mention preferred budget, schedule or timing.">
          <BudgetCalculatorSection
            setMonthlyFee={(val: number) => methods.setValue("monthlyFee", val)}
            classGrade={methods.watch("class")}
          />
        </FormSectionCard>
      ),
      validate: async () => {
        const valid = await trigger(["monthlyFee"]);
        setStepError(valid ? "" : "Budget must be between ₹1,000 and ₹50,000.");
        return valid;
      },
    },
    {
      title: stepsDef[3].title,
      content: (
        <FormSectionCard title="Preferences & Needs"
          description="Special preferences? Learning difficulties? Add here!">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="font-semibold mb-1 block" htmlFor="tutorGender">Tutor Gender Preference *</label>
              <select id="tutorGender" {...methods.register("tutorGender", { required: true })}
                className="w-full rounded px-3 py-2 border">
                <option value="">Select preference</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="no-preference">No Preference</option>
              </select>
            </div>
            <div>
              <label htmlFor="urgency" className="font-semibold mb-1 block">When to start? *</label>
              <select id="urgency" {...methods.register("urgency", { required: true })}
                className="w-full rounded px-3 py-2 border">
                <option value="">Select start time</option>
                <option value="immediately">Immediately</option>
                <option value="within-week">Within this week</option>
                <option value="within-month">Within this month</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="requirements" className="font-semibold mb-1 block">Special Requirements or Comments</label>
            <textarea
              className="w-full rounded px-3 py-2 border min-h-[70px]"
              {...methods.register("requirements")}
              placeholder="Any learning difficulties, exam goals, preferences, etc."
            />
          </div>
          <div className="mb-6 flex items-start gap-2 rounded-lg bg-muted/60 border p-4">
            <input type="checkbox" id="consent" {...methods.register("consent")} />
            <label htmlFor="consent" className="text-sm leading-relaxed">
              I consent to Pranavam Study Centre contacting me and sharing my details with suitable tutors.
              I understand this is a free service and there are no charges for connecting with tutors.
            </label>
          </div>
        </FormSectionCard>
      ),
      validate: async () => {
        const valid = await trigger(["tutorGender", "urgency", "consent"]);
        setStepError(valid ? "" : "Please fill all required fields and give consent.");
        return valid;
      },
    },
  ];

  const handleNext = async () => {
    const valid = await steps[step].validate();
    if (!valid) return;
    setStep((prev) => prev + 1);
    setStepError("");
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    setStepError("");
  };

  const doSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    // Here, add Supabase submission as original, or show a mock success.
    setSubmittedData(values);
    setIsSubmitted(true);
    setIsSubmitting(false);
    toast({
      title: "Request Submitted!",
      description: "We'll find suitable tutors and contact you within 24 hours.",
    });
  });

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-12 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Request Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              We've received your tuition request. Our team will find suitable tutors in your area and contact you within 24 hours.
            </p>
            <div className="space-y-3">
              <button onClick={() => { setIsSubmitted(false); setStep(0); }} className="w-full bg-primary text-white py-3 rounded-lg font-bold mt-2">
                Submit Another Request
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
        <FormProvider {...methods}>
          <form
            onSubmit={e => { e.preventDefault(); }}
            className="bg-white shadow-xl rounded-xl py-10 px-2 sm:px-6 md:px-12 mb-8 animate-fade-in"
            autoComplete="off"
          >
            <StepWizard
              steps={steps}
              current={step}
              goBack={handleBack}
              goNext={handleNext}
              showBack={step > 0}
              canNext={
                step === 0 ||
                (step === 1 && isValid) ||
                (step === 2 && isValid) ||
                (step === 3 && isValid)
              }
              stepError={stepError}
              onSubmit={doSubmit}
              nextLabel={step < steps.length - 1 ? "Next" : "Submit"}
              finishLabel="Submit"
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default StudentRegistration;
