
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const TutorQualificationSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="qualification">Highest Qualification *</Label>
          <Select name="qualification" required>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select qualification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="btech">B.Tech</SelectItem>
              <SelectItem value="bsc">B.Sc</SelectItem>
              <SelectItem value="ba">B.A</SelectItem>
              <SelectItem value="mtech">M.Tech</SelectItem>
              <SelectItem value="msc">M.Sc</SelectItem>
              <SelectItem value="ma">M.A</SelectItem>
              <SelectItem value="phd">Ph.D</SelectItem>
              <SelectItem value="bed">B.Ed</SelectItem>
              <SelectItem value="med">M.Ed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="experience">Teaching Experience *</Label>
          <Select name="experience" required>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0-1 years</SelectItem>
              <SelectItem value="1">1-3 years</SelectItem>
              <SelectItem value="3">3-5 years</SelectItem>
              <SelectItem value="5">5-10 years</SelectItem>
              <SelectItem value="10">10+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="subjects">Subjects You Can Teach *</Label>
        <Textarea 
          name="subjects"
          id="subjects" 
          required 
          className="mt-1" 
          placeholder="e.g., Mathematics, Physics, Chemistry, English, Malayalam..."
        />
      </div>

      <div>
        <Label htmlFor="classes">Classes/Grades You Prefer *</Label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-2">
          {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map((grade) => (
            <div key={grade} className="flex items-center space-x-2">
              <Checkbox name="classes" value={grade} id={grade} />
              <Label htmlFor={grade} className="text-sm">{grade}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Preferred Teaching Mode *</Label>
        <div className="flex space-x-6 mt-2">
          <div className="flex items-center space-x-2">
            <Checkbox name="teachingMode" value="home" id="home" />
            <Label htmlFor="home">Home Visit</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox name="teachingMode" value="online" id="online" />
            <Label htmlFor="online">Online</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox name="teachingMode" value="both" id="both" />
            <Label htmlFor="both">Both</Label>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="languages">Languages Known *</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {['English', 'Malayalam', 'Hindi', 'Tamil'].map((lang) => (
            <div key={lang} className="flex items-center space-x-2">
              <Checkbox name="languages" value={lang} id={lang} />
              <Label htmlFor={lang} className="text-sm">{lang}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorQualificationSection;
