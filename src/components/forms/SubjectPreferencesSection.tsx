
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const SubjectPreferencesSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="subjects">Subjects Needed *</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {[
            'Mathematics', 
            'Physics', 
            'Chemistry', 
            'Biology', 
            'English', 
            'Malayalam', 
            'Hindi', 
            'Social Science', 
            'Computer Science', 
            'Accountancy',
            'Economics',
            'Business Studies',
            'Political Science',
            'History',
            'Geography',
            'Psychology',
            'Sociology',
            'Statistics',
            'Music',
            'Dance',
            'Drawing/Art',
            'Violin (Classical)',
            'Violin (Western)'
          ].map((subject) => (
            <div key={subject} className="flex items-center space-x-2">
              <Checkbox name="subjects" value={subject} id={subject} />
              <Label htmlFor={subject} className="text-sm">{subject}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Preferred Mode *</Label>
        <RadioGroup name="mode" className="flex space-x-6 mt-2" required>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="home" id="homeVisit" />
            <Label htmlFor="homeVisit">Home Tuition</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="online" id="onlineClass" />
            <Label htmlFor="onlineClass">Online Classes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="flexible" id="flexible" />
            <Label htmlFor="flexible">Either is fine</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="preferredTime">Preferred Time *</Label>
          <Select name="preferredTime" required>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select time slot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
              <SelectItem value="evening">Evening (6 PM - 9 PM)</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SubjectPreferencesSection;
