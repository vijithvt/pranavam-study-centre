
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
    <div className="space-y-8 px-2 sm:px-4 md:px-8 lg:px-16 w-full max-w-3xl mx-auto">
      {/* Student & Parent Names */}
      <div className="flex flex-col md:flex-row md:gap-8 gap-4">
        <div className="w-full md:w-1/2">
          <Label htmlFor="studentName">Student Name *</Label>
          <Input
            id="studentName"
            {...register("studentName", { required: "Student name is required" })}
            required
            autoComplete="off"
            className="mt-1"
          />
          {errors.studentName && (
            <span className="text-xs text-red-500">{errors.studentName.message as string}</span>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <Label htmlFor="parentName">Parent/Guardian Name *</Label>
          <Input
            id="parentName"
            {...register("parentName", { required: "Parent/Guardian name is required" })}
            required
            autoComplete="off"
            className="mt-1"
          />
          {errors.parentName && (
            <span className="text-xs text-red-500">{errors.parentName.message as string}</span>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col md:flex-row md:gap-8 gap-4">
        <div className="w-full md:w-1/2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            required
            autoComplete="off"
            className="mt-1"
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message as string}</span>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <Label htmlFor="parentPhone">Parent Phone Number *</Label>
          <Input
            id="parentPhone"
            type="tel"
            {...register("parentPhone", { required: "Parent phone is required" })}
            required
            autoComplete="off"
            className="mt-1"
          />
          {errors.parentPhone && (
            <span className="text-xs text-red-500">{errors.parentPhone.message as string}</span>
          )}
        </div>
      </div>

      {/* Class/Grade & Syllabus (School Students) */}
      {isSchoolGrade && (
        <div className="flex flex-col md:flex-row md:gap-8 gap-4">
          <div className="w-full md:w-1/2">
            <Label htmlFor="class">Class/Grade *</Label>
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
          <div className="w-full md:w-1/2">
            <Label htmlFor="syllabus">Syllabus *</Label>
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

      {/* Higher Ed: University/Branch/Subjects */}
      {isHigherEd && (
        <>
          <div className="flex flex-col md:flex-row md:gap-8 gap-4">
            <div className="w-full md:w-1/2">
              <Label htmlFor="university">University/Institution *</Label>
              <Input
                id="university"
                placeholder="Enter university name"
                {...register("university", { required: "University is required" })}
                required
                className="mt-1"
              />
              {errors.university && (
                <span className="text-xs text-red-500">{errors.university.message as string}</span>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <Label htmlFor="branch">Branch/Specialization *</Label>
              <Input
                id="branch"
                placeholder="Enter branch/specialization"
                {...register("branch", { required: "Branch/Specialization is required" })}
                required
                className="mt-1"
              />
              {errors.branch && (
                <span className="text-xs text-red-500">{errors.branch.message as string}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="customSubjects">Subjects *</Label>
            <Input
              id="customSubjects"
              placeholder="Enter subject(s) required (e.g. Data Structures, Algorithms, Economics)"
              {...register("customSubjects", { required: "Subjects required" })}
              className="mt-1"
              required
            />
            {errors.customSubjects && (
              <span className="text-xs text-red-500">{errors.customSubjects.message as string}</span>
            )}
          </div>
        </>
      )}

      {/* For dance/music/art/violin: show nothing extra */}

      {/* Mode & Time Preference */}
      <div className="flex flex-col md:flex-row md:gap-8 gap-4">
        <div className="w-full md:w-1/2">
          <Label htmlFor="mode">Tutoring Mode *</Label>
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
        <div className="w-full md:w-1/2">
          <Label htmlFor="preferredTime">Preferred Time</Label>
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

      {/* Preferred Language */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="w-full md:w-1/2">
          <Label htmlFor="languages">Preferred Teaching Language</Label>
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
      </div>
    </div>
  );
};

export default PersonalInfoSection;

