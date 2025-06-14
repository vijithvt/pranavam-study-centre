
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const SubjectPreferencesSection = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [showRegularSubjects, setShowRegularSubjects] = useState(true);

  useEffect(() => {
    // Listen for class changes from the form
    const handleClassChange = () => {
      const classSelect = document.querySelector('select[name="class"]') as HTMLSelectElement;
      if (classSelect) {
        const value = classSelect.value;
        setSelectedClass(value);
        
        const artsClasses = ['music', 'dance', 'art', 'violin-classical', 'violin-western'];
        const entranceClasses = ['neet', 'jee', 'upsc', 'psc', 'banking', 'ssc', 'railway'];
        const higherEducationClasses = ['btech', 'bsc', 'ba', 'bcom', 'llb', 'mtech', 'msc', 'ma', 'mcom'];
        
        setShowRegularSubjects(!artsClasses.includes(value) && !entranceClasses.includes(value) && !higherEducationClasses.includes(value));
      }
    };

    // Initial check
    handleClassChange();

    // Set up observer for form changes
    const observer = new MutationObserver(handleClassChange);
    const form = document.querySelector('form');
    if (form) {
      observer.observe(form, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, []);

  const regularSubjects = [
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
    'Statistics'
  ];

  const artsSubjects = [
    'Music',
    'Dance',
    'Drawing/Art',
    'Violin (Classical)',
    'Violin (Western)',
    'Keyboard',
    'Guitar',
    'Vocal Music'
  ];

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="subjects">Subjects Needed *</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {showRegularSubjects ? (
            regularSubjects.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox name="subjects" value={subject} id={subject} />
                <Label htmlFor={subject} className="text-sm">{subject}</Label>
              </div>
            ))
          ) : (
            artsSubjects.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox name="subjects" value={subject} id={subject} />
                <Label htmlFor={subject} className="text-sm">{subject}</Label>
              </div>
            ))
          )}
        </div>
        {!showRegularSubjects && (
          <div className="mt-4">
            <Label htmlFor="otherSubjects">Other Subjects/Skills</Label>
            <input 
              type="text" 
              name="otherSubjects" 
              id="otherSubjects" 
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter specific subjects or skills needed"
            />
          </div>
        )}
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
