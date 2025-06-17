
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import StepWizard from "@/components/forms/StepWizard";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import PersonalInfoSection from "@/components/forms/PersonalInfoSection";
import LocationSection from "@/components/forms/LocationSection";
import FormSectionCard from "@/components/forms/FormSectionCard";
import BudgetCalculatorSection from "@/components/forms/BudgetCalculatorSection";
import { useToast } from "@/hooks/use-toast";
import SubjectPreferencesSection from "@/components/forms/SubjectPreferencesSection";

const phoneRegex = /^\+?\d{10,15}$/;

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
};

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
  { title: "Student & Parent Info" },
  { title: "Budget & Scheduling" },
  { title: "Preferences & Needs" },
];

const schoolGrades = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
];
const higherEdGrades = [
  "btech", "bsc", "ba", "bcom", "llb", "mtech", "msc", "ma", "mcom"
];
const artMusicGrades = [
  "music", "dance", "art", "violin-classical", "violin-western"
];

const StudentRegistration = () => {
  const [step, setStep] = React.useState(0);
  const [stepError, setStepError] = React.useState<string>("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submittedData, setSubmittedData] = React.useState<any>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const subjectParam = useQueryParam("subject");
  const classParam = useQueryParam("class");

  const methods = useForm({
    mode: "onChange",
    defaultValues,
  });

  const {
    handleSubmit,
    trigger,
    getValues,
    setValue,
    watch,
    formState: { isValid, errors },
  } = methods;

  // Prefill subjects and/or class from search param
  useEffect(() => {
    if (subjectParam) {
      const schoolSubjects = [
        "mathematics", "physics", "chemistry", "biology", "english", "hindi", "malayalam",
        "social science", "history", "geography", "political science", "economics", "computer science",
        "accountancy", "business studies", "psychology", "sociology", "philosophy", "physical education", "environmental science"
      ];
      if (classParam) {
        setValue("class", classParam);
        setValue("subjects", [subjectParam]);
      } else if (schoolSubjects.includes(subjectParam.toLowerCase())) {
        setValue("subjects", [subjectParam]);
      } else {
        setValue("class", subjectParam.toLowerCase());
      }
    }
  }, [subjectParam, classParam, setValue]);

  // Helper to determine which required fields to validate in Student & Parent Info
  function getInfoRequiredFields(values: any) {
    const required = [
      "studentName",
      "parentName",
      "email",
      "parentPhone",
      "class",
      "mode",
      "district",
      "area"
    ];
    const classGrade = values.class;
    if (schoolGrades.includes(classGrade)) {
      required.push("syllabus", "subjects");
    } else if (higherEdGrades.includes(classGrade)) {
      required.push("university", "branch", "customSubjects");
    } else if (classGrade) {
      required.push("otherSubjects");
    }
    return required;
  }

  // -- Step 1 Content: Student & Parent Info + Subject Preference --
  const infoStepContent = (
    <div className="space-y-6">
      <FormSectionCard
        title="Student & Parent Information"
        description="Provide details to help us match you with the best tutors."
        className="!mb-0"
      >
        <PersonalInfoSection
          classGrade={watch("class")}
          setClassGrade={(val) => setValue("class", val)}
        />
      </FormSectionCard>

      {/* Subject Preferences */}
      <FormSectionCard
        title="Subject Preferences"
        description="Select the subjects you need help with."
        className="!mb-0"
      >
        {(schoolGrades.includes(watch("class"))) && (
          <SubjectPreferencesSection
            classGrade={watch("class")}
            onSubjectsChange={(subs) => setValue("subjects", subs)}
            selectedSubjects={watch("subjects")}
            onOtherSubjectChange={(other) => setValue("otherSubjects", other)}
            defaultOtherSubject={watch("otherSubjects")}
          />
        )}

        {(higherEdGrades.includes(watch("class"))) && (
          <div className="space-y-3">
            <label htmlFor="customSubjects" className="font-semibold block mb-1 text-left">Subjects *</label>
            <input
              id="customSubjects"
              name="customSubjects"
              value={watch("customSubjects")}
              onChange={e => setValue("customSubjects", e.target.value)}
              className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Enter subject(s) required (e.g. Data Structures, Economics)"
            />
            {errors.customSubjects && (
              <div className="text-xs text-red-500">{errors.customSubjects.message as string}</div>
            )}
          </div>
        )}

        {
          (!schoolGrades.includes(watch("class")) && !higherEdGrades.includes(watch("class")) && watch("class")) && (
            <div className="space-y-3">
              <label htmlFor="otherSubjects" className="font-semibold block mb-1 text-left">Subject(s) Required *</label>
              <input
                id="otherSubjects"
                name="otherSubjects"
                value={watch("otherSubjects")}
                onChange={e => setValue("otherSubjects", e.target.value)}
                className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Describe subject/course needed"
                required
              />
              {errors.otherSubjects && (
                <div className="text-xs text-red-500">{errors.otherSubjects.message as string}</div>
              )}
            </div>
          )
        }
      </FormSectionCard>

      <FormSectionCard
        title="Location"
        description="Where do you need the tutoring?"
        className="!mb-0"
      >
        <LocationSection />
      </FormSectionCard>
    </div>
  );

  // Steps config
  const steps = [
    {
      title: stepsDef[0].title,
      content: infoStepContent,
      validate: async () => {
        const values = methods.getValues();
        const requiredFields = getInfoRequiredFields(values) as (keyof typeof defaultValues)[];
        const valid = await trigger(requiredFields);
        let hasAtLeastOneSubject = true;
        if (schoolGrades.includes(values.class)) {
          // school: must have subjects
          hasAtLeastOneSubject = (values.subjects && values.subjects.length > 0);
        } else if (higherEdGrades.includes(values.class)) {
          hasAtLeastOneSubject = !!values.customSubjects;
        } else if (values.class) {
          hasAtLeastOneSubject = !!values.otherSubjects;
        }
        setStepError(valid && hasAtLeastOneSubject ? "" : "Please complete all required info and specify subjects.");
        return valid && hasAtLeastOneSubject;
      },
    },
    {
      title: stepsDef[1].title,
      content: (
        <FormSectionCard
          title="Budget & Scheduling"
          description="Mention preferred budget, schedule or timing."
          className="!mb-6"
        >
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
      title: stepsDef[2].title,
      content: (
        <FormSectionCard
          title="Preferences & Additional Requirements"
          description="Tell us about your specific preferences and requirements."
          className="!mb-2"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-semibold text-sm block text-left" htmlFor="tutorGender">Tutor Gender Preference *</label>
                <select 
                  id="tutorGender" 
                  {...methods.register("tutorGender", { required: true })} 
                  className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
                >
                  <option value="">Select preference</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="no-preference">No Preference</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="urgency" className="font-semibold text-sm block text-left">When to start? *</label>
                <select 
                  id="urgency" 
                  {...methods.register("urgency", { required: true })} 
                  className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
                >
                  <option value="">Select start time</option>
                  <option value="immediately">Immediately</option>
                  <option value="within-week">Within this week</option>
                  <option value="within-month">Within this month</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="requirements" className="font-semibold text-sm block text-left">Special Requirements or Comments</label>
              <textarea
                className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all min-h-[100px] resize-none"
                {...methods.register("requirements")}
                placeholder="Any learning difficulties, exam goals, preferences, etc."
              />
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  id="consent"
                  {...methods.register("consent")}
                  className="h-5 w-5 rounded border-gray-300 accent-primary mt-1 flex-shrink-0"
                />
                <label
                  htmlFor="consent"
                  className="text-sm leading-relaxed font-medium text-gray-700 cursor-pointer"
                >
                  I consent to Pranavam Study Centre contacting me and sharing my details with suitable tutors.
                  <br />
                  <span className="text-xs text-gray-500 mt-1 block">
                    I understand this is a free service and there are no charges for connecting with tutors.
                  </span>
                </label>
              </div>
            </div>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center rounded-2xl shadow-2xl border-0">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Request Submitted!
            </h2>
            <p className="text-gray-600 mb-8 text-base leading-relaxed">
              We've received your tuition request. Our team will find suitable tutors in your area and contact you within 24 hours.
            </p>
            <button 
              onClick={() => { setIsSubmitted(false); setStep(0); }}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-primary/90 transition-all duration-200"
            >
              Submit Another Request
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Find Your Perfect Tutor</h1>
          <p className="text-gray-600 text-lg">Tell us what you need and we'll connect you with qualified tutors</p>
        </div>
        
        <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <FormProvider {...methods}>
              <form
                onSubmit={e => { e.preventDefault(); }}
                className="w-full"
                autoComplete="off"
              >
                <StepWizard
                  steps={steps}
                  current={step}
                  goBack={handleBack}
                  goNext={handleNext}
                  showBack={step > 0}
                  canNext={
                    step === 0
                      ? (() => {
                          const values = methods.getValues();
                          const requiredFields = getInfoRequiredFields(values);
                          const classType = values.class;
                          let subjectsOk = true;
                          if (schoolGrades.includes(classType)) {
                            subjectsOk = values.subjects && values.subjects.length > 0;
                          } else if (higherEdGrades.includes(classType)) {
                            subjectsOk = !!values.customSubjects;
                          } else if (classType) {
                            subjectsOk = !!values.otherSubjects;
                          }
                          return requiredFields.every(
                            (field) =>
                              typeof values[field] === "boolean" ? values[field] : !!values[field]
                          ) && isValid && subjectsOk;
                        })()
                      : isValid
                  }
                  stepError={stepError}
                  onSubmit={doSubmit}
                  nextLabel={step < steps.length - 1 ? "Next" : "Submit"}
                  finishLabel="Submit"
                />
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegistration;
