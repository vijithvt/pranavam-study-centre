
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface SubjectPreferencesSectionProps {
  classGrade?: string;
}

const SubjectPreferencesSection = ({ classGrade }: SubjectPreferencesSectionProps) => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const isHigherEd = !!classGrade && ['btech','bsc','ba','bcom','llb','mtech','msc','ma','mcom'].includes(classGrade);
  const isArtsOrEntrance = !!classGrade && ['music','dance','art','violin-classical','violin-western','neet','jee','upsc','psc','banking','ssc','railway'].includes(classGrade);

  const allSchoolSubjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Hindi',
    'Malayalam',
    'Social Science',
    'History',
    'Geography',
    'Political Science',
    'Economics',
    'Computer Science',
    'Accountancy',
    'Business Studies',
    'Psychology',
    'Sociology',
    'Philosophy',
    'Physical Education',
    'Environmental Science'
  ];

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setSelectedSubjects([...selectedSubjects, subject]);
    } else {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    }
  };

  if (isHigherEd || isArtsOrEntrance) {
    return (
      <div className="space-y-4">
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
      </div>
    );
  }

  // Regular school subjects with multi-selection
  return (
    <div className="space-y-4">
      <div>
        <Label>Select Subjects *</Label>
        <div
          className="
            w-full
            grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            gap-x-5 gap-y-3 mt-2
            border rounded-xl p-4
            bg-muted/40
          "
        >
          {allSchoolSubjects.map((subject) => (
            <div
              key={subject}
              className="flex items-center min-w-0 mb-2"
              style={{ alignItems: 'flex-start' }}
            >
              <Checkbox
                id={subject}
                name="subjects"
                value={subject}
                checked={selectedSubjects.includes(subject)}
                onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
              />
              <Label
                htmlFor={subject}
                className="ml-2 text-sm font-normal cursor-pointer whitespace-normal break-words"
                style={{ maxWidth: "100%", wordBreak: "break-word" }}
              >
                {subject}
              </Label>
            </div>
          ))}
        </div>
        {/* Hidden inputs for form submission */}
        {selectedSubjects.map((subject) => (
          <input key={subject} type="hidden" name="subjects" value={subject} />
        ))}
      </div>

      <div>
        <Label htmlFor="otherSubjects">Other Subjects</Label>
        <Input 
          name="otherSubjects" 
          id="otherSubjects"
          className="mt-1"
          placeholder="If other subjects needed, specify here"
        />
      </div>
    </div>
  );
};

export default SubjectPreferencesSection;

