
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PersonalInfoSectionProps {
  classGrade: string;
  setClassGrade: (grade: string) => void;
}

const schoolGrades = Array.from({length: 12}, (_, i) => (i+1).toString());
const higherEdGrades = ["btech","bsc","ba","bcom","llb","mtech","msc","ma","mcom"];
const artMusicGrades = [
  "music", "dance", "art", "violin-classical", "violin-western"
];

const PersonalInfoSection = ({ classGrade, setClassGrade }: PersonalInfoSectionProps) => {
  const { register, watch, setValue, formState: { errors } } = useFormContext();

  // Helper logic: figure out user type based on classGrade
  const isSchoolGrade = schoolGrades.includes(classGrade);
  const isHigherEd = higherEdGrades.includes(classGrade);
  const isArtMusic = artMusicGrades.includes(classGrade);

  // If user selects a new class, update parent
  const handleClassChange = (val: string) => {
    setClassGrade(val);
    setValue('class', val, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <section className="w-full max-w-2xl mx-auto bg-white px-4 py-6 xs:px-4 xs:py-7 sm:p-8 rounded-lg shadow-md flex flex-col gap-8">
      {/* 1. Heading */}
      <div>
        <h2 className="text-lg xs:text-xl font-bold text-gray-900 mb-2">Student & Parent Information</h2>
        <p className="text-gray-500 text-sm xs:text-base">Let’s get to know you better to match with the best tutors.</p>
      </div>

      {/* 2. Student/Parent Names */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="studentName" className="mb-1 font-medium block text-gray-800">Student Name <span className="text-red-500">*</span></Label>
          <Input
            id="studentName"
            {...register("studentName", { required: "Student name is required" })}
            required
            autoComplete="off"
            className="input mt-1"
            placeholder="Enter student name"
          />
          {errors.studentName && (
            <span className="text-xs text-red-500">{errors.studentName.message as string}</span>
          )}
        </div>
        <div>
          <Label htmlFor="parentName" className="mb-1 font-medium block text-gray-800">Parent/Guardian Name <span className="text-red-500">*</span></Label>
          <Input
            id="parentName"
            {...register("parentName", { required: "Parent/Guardian name is required" })}
            required
            autoComplete="off"
            className="input mt-1"
            placeholder="Enter parent/guardian name"
          />
          {errors.parentName && (
            <span className="text-xs text-red-500">{errors.parentName.message as string}</span>
          )}
        </div>
      </div>

      {/* 3. Contact Information */}
      <div className="p-4 rounded-lg bg-slate-50 sm:bg-transparent grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="email" className="mb-1 font-medium block text-gray-800">Email <span className="text-red-500">*</span></Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            required
            autoComplete="off"
            className="input mt-1"
            placeholder="Enter email"
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message as string}</span>
          )}
        </div>
        <div>
          <Label htmlFor="parentPhone" className="mb-1 font-medium block text-gray-800">Parent Phone Number <span className="text-red-500">*</span></Label>
          <Input
            id="parentPhone"
            type="tel"
            {...register("parentPhone", { required: "Parent phone is required" })}
            required
            autoComplete="off"
            className="input mt-1"
            placeholder="e.g. +91XXXXXXXXXX"
          />
          {errors.parentPhone && (
            <span className="text-xs text-red-500">{errors.parentPhone.message as string}</span>
          )}
        </div>
      </div>

      {/* 4. Class & Syllabus (School) or HigherEd */}
      {(isSchoolGrade || isHigherEd) && (
        <div className="bg-slate-50 rounded-lg px-4 py-5">
          {isSchoolGrade && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="class" className="mb-1 font-medium block text-gray-800">Class/Grade <span className="text-red-500">*</span></Label>
                <Select value={classGrade} onValueChange={handleClassChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {schoolGrades.map((grade) => (
                      <SelectItem key={grade} value={grade}>{`Class ${grade}`}</SelectItem>
                    ))}
                    {higherEdGrades.concat(artMusicGrades).map(option => (
                      <SelectItem key={option} value={option} style={{display:"none"}}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("class", { required: true })} value={classGrade || ""} />
                {errors.class && (
                  <span className="text-xs text-red-500">Required</span>
                )}
              </div>
              <div>
                <Label htmlFor="syllabus" className="mb-1 font-medium block text-gray-800">Syllabus <span className="text-red-500">*</span></Label>
                <Select 
                  value={watch('syllabus') || ""}
                  onValueChange={val => setValue('syllabus', val, { shouldValidate: true, shouldDirty: true })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select syllabus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CBSE">CBSE</SelectItem>
                    <SelectItem value="ICSE">ICSE</SelectItem>
                    <SelectItem value="State Board">State Board</SelectItem>
                    <SelectItem value="IB">IB</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("syllabus", { required: isSchoolGrade })} value={watch("syllabus") || ""} />
                {errors.syllabus && (
                  <span className="text-xs text-red-500">Required</span>
                )}
              </div>
            </div>
          )}
          {isHigherEd && (
            <div className="grid gap-4 md:grid-cols-2 mt-1">
              <div>
                <Label htmlFor="university" className="mb-1 font-medium block text-gray-800">University/Institution <span className="text-red-500">*</span></Label>
                <Input
                  id="university"
                  placeholder="Enter university name"
                  {...register("university", { required: "University is required" })}
                  required
                  className="input mt-1"
                />
                {errors.university && (
                  <span className="text-xs text-red-500">{errors.university.message as string}</span>
                )}
              </div>
              <div>
                <Label htmlFor="branch" className="mb-1 font-medium block text-gray-800">Branch/Specialization <span className="text-red-500">*</span></Label>
                <Input
                  id="branch"
                  placeholder="Enter branch/specialization"
                  {...register("branch", { required: "Branch/Specialization is required" })}
                  required
                  className="input mt-1"
                />
                {errors.branch && (
                  <span className="text-xs text-red-500">{errors.branch.message as string}</span>
                )}
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="customSubjects" className="mb-1 font-medium block text-gray-800">Subjects <span className="text-red-500">*</span></Label>
                <Input
                  id="customSubjects"
                  placeholder="e.g. Data Structures, Economics"
                  {...register("customSubjects", { required: "Subjects required" })}
                  className="input mt-1"
                  required
                />
                {errors.customSubjects && (
                  <span className="text-xs text-red-500">{errors.customSubjects.message as string}</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Mode & Time Preference */}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
        <div>
          <Label htmlFor="mode" className="mb-1 font-medium block text-gray-800">Tutoring Mode <span className="text-red-500">*</span></Label>
          <Select
            value={watch('mode') || ""}
            onValueChange={val => setValue('mode', val, { shouldValidate: true, shouldDirty: true })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">Home Tuition</SelectItem>
              <SelectItem value="online">Online Tuition</SelectItem>
              <SelectItem value="both">Both Home & Online</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" {...register("mode", { required: true })} value={watch("mode") || ""} />
          {errors.mode && (
            <span className="text-xs text-red-500">Required</span>
          )}
        </div>
        <div>
          <Label htmlFor="preferredTime" className="mb-1 font-medium block text-gray-800">Preferred Time</Label>
          <Select
            value={watch('preferredTime') || ""}
            onValueChange={val => setValue('preferredTime', val)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select time preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
              <SelectItem value="evening">Evening (6 PM - 10 PM)</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" {...register("preferredTime")} value={watch("preferredTime") || ""} />
        </div>
      </div>

      {/* 6. Preferred Language */}
      <div>
        <Label htmlFor="languages" className="mb-1 font-medium block text-gray-800">Preferred Teaching Language</Label>
        <Select
          value={watch('languages') || ""}
          onValueChange={val => setValue('languages', val)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select language preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Malayalam">Malayalam</SelectItem>
            <SelectItem value="English/Malayalam">English/Malayalam</SelectItem>
            <SelectItem value="Hindi">Hindi</SelectItem>
            <SelectItem value="Tamil">Tamil</SelectItem>
          </SelectContent>
        </Select>
        <input type="hidden" {...register("languages")} value={watch("languages") || ""} />
      </div>
    </section>
  );
};

export default PersonalInfoSection;

