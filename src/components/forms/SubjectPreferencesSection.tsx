
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useSubjects } from "@/hooks/useSubjects";

interface SubjectPreferencesSectionProps {
  classGrade?: string;
  onSubjectsChange?: (subs: string[]) => void;
  onOtherSubjectChange?: (other: string) => void;
  onSpecializationChange?: (spec: string) => void;
  selectedSubjects?: string[];
  defaultOtherSubject?: string;
  defaultSpecialization?: string;
}

const SubjectPreferencesSection = ({
  classGrade,
  onSubjectsChange,
  onOtherSubjectChange,
  onSpecializationChange,
  selectedSubjects = [],
  defaultOtherSubject = "",
  defaultSpecialization = "",
}: SubjectPreferencesSectionProps) => {
  const [internalSelected, setInternalSelected] = useState<string[]>(selectedSubjects);
  const [otherValue, setOtherValue] = useState(defaultOtherSubject);
  const [specializationValue, setSpecializationValue] = useState(defaultSpecialization);

  // Fetch subjects from DB; fallback to empty structure if loading/error
  const { grouped, categoryLabels, sortedCategories, isLoading, error } = useSubjects();

  useEffect(() => {
    setInternalSelected(selectedSubjects);
  }, [selectedSubjects]);

  useEffect(() => {
    setOtherValue(defaultOtherSubject || "");
  }, [defaultOtherSubject]);

  useEffect(() => {
    setSpecializationValue(defaultSpecialization || "");
  }, [defaultSpecialization]);

  const isHigherEd = !!classGrade && [
    'btech','bsc','ba','bcom','llb','mtech','msc','ma','mcom'
  ].includes(classGrade);
  
  const isArtsOrMusic = !!classGrade && [
    'music','dance','art','violin-classical','violin-western'
  ].includes(classGrade);

  const isEntranceExam = !!classGrade && [
    'neet','jee','upsc','psc','banking','ssc','railway'
  ].includes(classGrade);

  // --- UI Handlers ---
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

  const handleSpecializationChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSpecializationValue(evt.target.value);
    onSpecializationChange?.(evt.target.value);
  };

  if (isHigherEd) {
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

  // Show loading/error UI
  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading subjects...</div>;
  }
  if (error) {
    return <div className="text-sm text-red-600">Failed to load subjects.</div>;
  }

  // For entrance exams, show specialization input
  if (isEntranceExam) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Entrance Exam Preparation</h3>
          <Label htmlFor="specialization">Specialization *</Label>
          <Input
            name="specialization"
            id="specialization"
            className="mt-1"
            placeholder="Enter specialization (e.g. Medical, Engineering, Civil Services)"
            value={specializationValue}
            onChange={handleSpecializationChange}
            required
          />
        </div>
      </div>
    );
  }

  // For arts/music, show specialization input
  if (isArtsOrMusic) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Arts & Music</h3>
          <Label htmlFor="specialization">Specialization *</Label>
          <Input
            name="specialization"
            id="specialization"
            className="mt-1"
            placeholder="Enter specialization (e.g. Classical Music, Western Music, Painting)"
            value={specializationValue}
            onChange={handleSpecializationChange}
            required
          />
        </div>
      </div>
    );
  }

  // Filter categories based on class type - show only school subjects for regular classes
  let categoriesToShow = ["school"];

  // UI for all subjects with multi-selection, now filtered by class type
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
          {categoriesToShow.map((cat) => (
            grouped[cat]?.length ? (
              <React.Fragment key={cat}>
                <div className="col-span-full text-xs font-semibold text-primary/80 py-2 pl-1 border-b border-muted/40 mb-1">
                  {categoryLabels[cat] || cat}
                </div>
                {grouped[cat].map(({ id, name }) => (
                  <div
                    key={id}
                    className="flex items-start min-w-0 mb-2 max-w-full"
                    style={{ alignItems: 'flex-start' }}
                  >
                    <Checkbox
                      id={name}
                      name="subjects"
                      value={name}
                      checked={internalSelected.includes(name)}
                      onCheckedChange={(checked) => handleSubjectChange(name, checked as boolean)}
                    />
                    <Label
                      htmlFor={name}
                      className="ml-2 text-sm font-normal cursor-pointer whitespace-normal break-words"
                      style={{ maxWidth: "100%", wordBreak: "break-word" }}
                    >
                      <span className="block max-w-[90vw] sm:max-w-[220px] break-words">{name}</span>
                    </Label>
                  </div>
                ))}
              </React.Fragment>
            ) : null
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
