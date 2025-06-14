import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface SubjectPreferencesSectionProps {
  classGrade?: string;
}

const SubjectPreferencesSection = ({
  classGrade
}: {
  classGrade?: string;
}) => {
  // logic for determining edu type
  const isHigherEd =
    !!classGrade &&
    ['btech','bsc','ba','bcom','llb','mtech','msc','ma','mcom'].includes(classGrade);

  const isArtsOrEntrance =
    !!classGrade &&
    ['music','dance','art','violin-classical','violin-western',
    'neet','jee','upsc','psc','banking','ssc','railway'].includes(classGrade);

  if (isHigherEd || isArtsOrEntrance) {
    // Hide Subjects Needed for higher ed and arts/entrance. No subject input needed here.
    return null;
  }

  // Regular subject selection (as before):
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label>Select Subjects *</Label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="physics" name="subjects" value="Physics" className="h-4 w-4" />
              <Label htmlFor="physics">Physics</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="chemistry" name="subjects" value="Chemistry" className="h-4 w-4" />
              <Label htmlFor="chemistry">Chemistry</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="maths" name="subjects" value="Maths" className="h-4 w-4" />
              <Label htmlFor="maths">Maths</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="biology" name="subjects" value="Biology" className="h-4 w-4" />
              <Label htmlFor="biology">Biology</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="english" name="subjects" value="English" className="h-4 w-4" />
              <Label htmlFor="english">English</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="hindi" name="subjects" value="Hindi" className="h-4 w-4" />
              <Label htmlFor="hindi">Hindi</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="social-science" name="subjects" value="Social Science" className="h-4 w-4" />
              <Label htmlFor="social-science">Social Science</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="computer-science" name="subjects" value="Computer Science" className="h-4 w-4" />
              <Label htmlFor="computer-science">Computer Science</Label>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="otherSubjects">Other Subjects</Label>
          <Input 
            name="otherSubjects" 
            id="otherSubjects" 
            className="mt-1" 
            placeholder="If other, specify here"
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectPreferencesSection;
