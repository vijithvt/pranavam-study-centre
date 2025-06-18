
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useForm, FormProvider } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Search, ChevronDown, Users, BookOpen, MapPin, Phone, Mail, User, GraduationCap } from "lucide-react";
import SubjectPreferencesSection from "@/components/forms/SubjectPreferencesSection";

const ALL_SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English", "Hindi", "Malayalam",
  "Social Science", "History", "Geography", "Political Science", "Economics", 
  "Computer Science", "Accountancy", "Business Studies", "Psychology", "Sociology",
  "Philosophy", "Physical Education", "Environmental Science", "Music", "Dance", 
  "Art/Drawing", "Violin (Classical)", "Violin (Western)", "NEET", "JEE", "UPSC", 
  "PSC", "Banking", "SSC", "Railway", "Data Structures", "Algorithms", "Statistics"
];

const SCHOOL_SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English", "Hindi", "Malayalam",
  "Social Science", "History", "Geography", "Political Science", "Economics", 
  "Computer Science", "Accountancy", "Business Studies", "Psychology", "Sociology",
  "Philosophy", "Physical Education", "Environmental Science"
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

const schoolGrades = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const higherEdGrades = ["btech", "bsc", "ba", "bcom", "llb", "mtech", "msc", "ma", "mcom"];
const artMusicGrades = ["music", "dance", "art", "violin-classical", "violin-western"];

const StudentRegistration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjectSearch, setSubjectSearch] = useState("");
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const subjectParam = useQueryParam("subject");
  const classParam = useQueryParam("class");

  const methods = useForm({
    mode: "onChange",
    defaultValues,
  });

  const { handleSubmit, setValue, watch, formState: { errors } } = methods;

  useEffect(() => {
    if (subjectParam) {
      if (classParam) {
        setValue("class", classParam);
        setSelectedSubjects([subjectParam]);
      } else {
        setSelectedSubjects([subjectParam]);
      }
    }
  }, [subjectParam, classParam, setValue]);

  const currentClass = watch("class");
  const isSchoolGrade = schoolGrades.includes(currentClass);
  const isHigherEd = higherEdGrades.includes(currentClass);
  const isArtsMusic = artMusicGrades.includes(currentClass);

  const getAvailableSubjects = () => {
    if (isSchoolGrade) return SCHOOL_SUBJECTS;
    return ALL_SUBJECTS;
  };

  const filteredSubjects = getAvailableSubjects().filter(subject =>
    subject.toLowerCase().includes(subjectSearch.toLowerCase()) &&
    !selectedSubjects.includes(subject)
  );

  const addSubject = (subject: string) => {
    const newSubjects = [...selectedSubjects, subject];
    setSelectedSubjects(newSubjects);
    setValue("subjects", newSubjects);
    setSubjectSearch("");
    setShowSubjectDropdown(false);
  };

  const removeSubject = (subject: string) => {
    const newSubjects = selectedSubjects.filter(s => s !== subject);
    setSelectedSubjects(newSubjects);
    setValue("subjects", newSubjects);
  };

  const addCustomSubject = () => {
    if (subjectSearch.trim() && !selectedSubjects.includes(subjectSearch.trim())) {
      addSubject(subjectSearch.trim());
    }
  };

  const doSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    console.log('Submitting form data:', values);
    setIsSubmitted(true);
    setIsSubmitting(false);
    toast({
      title: "Request Submitted Successfully!",
      description: "We'll connect you with qualified tutors soon.",
    });
  });

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4 animate-fade-in">
        <Card className="w-full max-w-lg text-center rounded-3xl shadow-2xl border-0 backdrop-blur-sm bg-white/90">
          <CardContent className="p-10">
            <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
              Request Submitted!
            </h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              We've received your tuition request. Our team will find suitable tutors and contact you soon.
            </p>
            <button 
              onClick={() => { setIsSubmitted(false); }}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
            >
              Submit Another Request
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Find Your Perfect Tutor
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Connect with qualified, verified tutors tailored to your learning needs
          </p>
        </div>
        
        <Card className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-0 overflow-hidden animate-slide-in-right">
          <CardContent className="p-8 sm:p-12">
            <FormProvider {...methods}>
              <form onSubmit={doSubmit} className="space-y-10">
                
                {/* Student & Parent Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Student & Parent Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Student Name *
                      </label>
                      <input
                        {...methods.register("studentName", { required: true })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg"
                        placeholder="Enter student name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Parent/Guardian Name *
                      </label>
                      <input
                        {...methods.register("parentName", { required: true })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg"
                        placeholder="Enter parent/guardian name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email *
                      </label>
                      <input
                        type="email"
                        {...methods.register("email", { required: true })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...methods.register("parentPhone", { required: true })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg"
                        placeholder="+91XXXXXXXXXX"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Academic Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Class/Grade *</label>
                      <select
                        {...methods.register("class", { required: true })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg bg-white"
                      >
                        <option value="">Select class/grade</option>
                        {schoolGrades.map(grade => (
                          <option key={grade} value={grade}>Class {grade}</option>
                        ))}
                        {higherEdGrades.map(grade => (
                          <option key={grade} value={grade}>{grade.toUpperCase()}</option>
                        ))}
                        {artMusicGrades.map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </div>
                    
                    {isSchoolGrade && (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Syllabus *</label>
                        <select
                          {...methods.register("syllabus", { required: isSchoolGrade })}
                          className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg bg-white"
                        >
                          <option value="">Select syllabus</option>
                          <option value="CBSE">CBSE</option>
                          <option value="ICSE">ICSE</option>
                          <option value="State Board">State Board</option>
                          <option value="IB">IB</option>
                        </select>
                      </div>
                    )}
                    
                    {isHigherEd && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">University/Institution *</label>
                          <input
                            {...methods.register("university", { required: isHigherEd })}
                            className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg"
                            placeholder="Enter university name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Branch/Specialization *</label>
                          <input
                            {...methods.register("branch", { required: isHigherEd })}
                            className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg"
                            placeholder="Enter branch/specialization"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Subject Selection - Only show if not arts/music */}
                {!isArtsMusic && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Subject Preferences</h2>
                    </div>
                    
                    <SubjectPreferencesSection
                      classGrade={currentClass}
                      selectedSubjects={selectedSubjects}
                      onSubjectsChange={setSelectedSubjects}
                    />
                  </div>
                )}

                {/* Location & Preferences */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Location & Preferences</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">District *</label>
                      <input
                        {...methods.register("district", { required: true })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg"
                        placeholder="Enter district"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Area *</label>
                      <input
                        {...methods.register("area", { required: true })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg"
                        placeholder="Enter area/locality"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Tutoring Mode *</label>
                      <select
                        {...methods.register("mode", { required: true })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg bg-white"
                      >
                        <option value="">Select mode</option>
                        <option value="home">Home Tuition</option>
                        <option value="online">Online Tuition</option>
                        <option value="both">Both Home & Online</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Tutor Gender Preference *</label>
                      <select
                        {...methods.register("tutorGender", { required: true })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg bg-white"
                      >
                        <option value="">Select preference</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="no-preference">No Preference</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Special Requirements</label>
                    <textarea
                      {...methods.register("requirements")}
                      rows={4}
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg resize-none"
                      placeholder="Any special requirements, learning goals, or preferences..."
                    />
                  </div>
                </div>

                {/* Consent */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      {...methods.register("consent", { required: true })}
                      className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 mt-1"
                    />
                    <label className="text-sm leading-relaxed font-medium text-gray-700 cursor-pointer">
                      I consent to Pranavam Study Centre contacting me and sharing my details with suitable tutors.
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-6 rounded-2xl font-bold text-xl shadow-2xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Find My Perfect Tutor"}
                  </button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegistration;
