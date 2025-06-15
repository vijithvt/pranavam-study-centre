import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface SubjectPreferencesSectionProps {
  classGrade?: string;
  onSubjectsChange?: (subs: string[]) => void;
  onOtherSubjectChange?: (other: string) => void;
  selectedSubjects?: string[];
  defaultOtherSubject?: string;
}

const SubjectPreferencesSection = ({
  classGrade,
  onSubjectsChange,
  onOtherSubjectChange,
  selectedSubjects = [],
  defaultOtherSubject = "",
}: SubjectPreferencesSectionProps) => {
  const [internalSelected, setInternalSelected] = useState<string[]>(selectedSubjects);
  const [otherValue, setOtherValue] = useState(defaultOtherSubject);

  useEffect(() => {
    setInternalSelected(selectedSubjects);
  }, [selectedSubjects]);

  useEffect(() => {
    setOtherValue(defaultOtherSubject || "");
  }, [defaultOtherSubject]);

  const isHigherEd = !!classGrade && [
    'btech','bsc','ba','bcom','llb','mtech','msc','ma','mcom'
  ].includes(classGrade);
  const isArtsOrEntrance = !!classGrade && [
    'music','dance','art','violin-classical','violin-western','neet','jee','upsc','psc','banking','ssc','railway'
  ].includes(classGrade);

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
    let next = checked
      ? [...internalSelected, subject]
      : internalSelected.filter(s => s !== subject);
    setInternalSelected(next);
    onSubjectsChange?.(next);
  };

  const handleOtherChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setOtherValue(evt.target.value);
    onOtherSubjectChange?.(evt.target.value);
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
              className="flex items-start min-w-0 mb-2 max-w-full"
              style={{ alignItems: 'flex-start' }}
            >
              <Checkbox
                id={subject}
                name="subjects"
                value={subject}
                checked={internalSelected.includes(subject)}
                onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
              />
              <Label
                htmlFor={subject}
                className="ml-2 text-sm font-normal cursor-pointer whitespace-normal break-words"
                style={{ maxWidth: "100%", wordBreak: "break-word" }}
              >
                <span className="block max-w-[90vw] sm:max-w-[220px] break-words">{subject}</span>
              </Label>
            </div>
          ))}
        </div>
        {/* Hidden inputs for form submission */}
        {internalSelected.map((subject) => (
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
          value={otherValue}
          onChange={handleOtherChange}
        />
      </div>
    </div>
  );
};

export default SubjectPreferencesSection;
