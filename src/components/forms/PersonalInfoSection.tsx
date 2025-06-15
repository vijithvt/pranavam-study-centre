
import React from 'react';
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
  // Helper logic: figure out user type based on classGrade
  const isSchoolGrade = schoolGrades.includes(classGrade);
  const isHigherEd = higherEdGrades.includes(classGrade);
  const isArtMusic = artMusicGrades.includes(classGrade);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="studentName">Student Name *</Label>
          <Input name="studentName" id="studentName" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="parentName">Parent/Guardian Name *</Label>
          <Input name="parentName" id="parentName" required className="mt-1" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input name="email" id="email" type="email" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="parentPhone">Parent Phone Number *</Label>
          <Input name="parentPhone" id="parentPhone" type="tel" required className="mt-1" />
        </div>
      </div>

      {/* Show class/grade only for school students (Class 1 to 12) */}
      {isSchoolGrade && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="class">Class/Grade *</Label>
            <Select name="class" value={classGrade} onValueChange={setClassGrade} required>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {schoolGrades.map((grade) => (
                  <SelectItem key={grade} value={grade}>{`Class ${grade}`}</SelectItem>
                ))}
                {/* Retain hidden higherEd/art/music option to allow changes */}
                {higherEdGrades.concat(artMusicGrades).map(option => (
                  <SelectItem key={option} value={option} style={{display:"none"}}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="syllabus">Syllabus *</Label>
            <Select name="syllabus" required>
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
          </div>
        </div>
      )}

      {/* Show subject text box only for higher education (not school or music/dance/art/violin) */}
      {isHigherEd && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="university">University/Institution *</Label>
            <Input name="university" id="university" required className="mt-1" placeholder="Enter university name" />
          </div>
          <div>
            <Label htmlFor="branch">Branch/Specialization *</Label>
            <Input name="branch" id="branch" required className="mt-1" placeholder="Enter branch/specialization" />
          </div>
        </div>
      )}

      {isHigherEd && (
        <div>
          <Label htmlFor="customSubjects">Subjects *</Label>
          <Input
            name="customSubjects"
            id="customSubjects"
            className="mt-1"
            placeholder="Enter subject(s) required (e.g. Data Structures, Algorithms, Economics)"
            required
          />
        </div>
      )}

      {/* For dance/music/art/violin do NOT show class/grade, syllabus, or customSubjects! */}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="mode">Tutoring Mode *</Label>
          <Select name="mode" required>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">Home Tuition</SelectItem>
              <SelectItem value="online">Online Tuition</SelectItem>
              <SelectItem value="both">Both Home & Online</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="preferredTime">Preferred Time</Label>
          <Select name="preferredTime">
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
        </div>
      </div>

      <div>
        <Label htmlFor="languages">Preferred Teaching Language</Label>
        <Select name="languages">
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
      </div>
    </div>
  );
};

export default PersonalInfoSection;
