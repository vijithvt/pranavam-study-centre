
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
              <SelectItem value="bcom">B.Com</SelectItem>
              <SelectItem value="bed">B.Ed</SelectItem>
              <SelectItem value="llb">LLB</SelectItem>
              <SelectItem value="mtech">M.Tech</SelectItem>
              <SelectItem value="msc">M.Sc</SelectItem>
              <SelectItem value="ma">M.A</SelectItem>
              <SelectItem value="mcom">M.Com</SelectItem>
              <SelectItem value="med">M.Ed</SelectItem>
              <SelectItem value="phd">Ph.D</SelectItem>
              <SelectItem value="diploma">Diploma</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="subjects">Subjects to Teach *</Label>
          <Input name="subjects" id="subjects" required className="mt-1" placeholder="e.g., Mathematics, Physics" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="experience">Teaching Experience (years) *</Label>
          <Select name="experience" required>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Fresher</SelectItem>
              <SelectItem value="1">1 year</SelectItem>
              <SelectItem value="2">2 years</SelectItem>
              <SelectItem value="3">3 years</SelectItem>
              <SelectItem value="4">4 years</SelectItem>
              <SelectItem value="5">5 years</SelectItem>
              <SelectItem value="6">6+ years</SelectItem>
              <SelectItem value="10">10+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="teachingMode">Teaching Mode *</Label>
          <Select name="teachingMode" required>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">Home Tuition</SelectItem>
              <SelectItem value="online">Online Classes</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Classes You Can Teach *</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {[
            'Class 1-5', 'Class 6-8', 'Class 9-10', 'Class 11-12',
            'B.Tech', 'B.Sc', 'B.A', 'B.Com', 'LLB',
            'M.Tech', 'M.Sc', 'M.A', 'M.Com',
            'NEET', 'JEE', 'UPSC', 'PSC', 'Banking',
            'SSC', 'Railway', 'Music', 'Dance', 'Art/Drawing',
            'Violin (Classical)', 'Violin (Western)'
          ].map((grade) => (
            <div key={grade} className="flex items-center space-x-2">
              <Checkbox name="classes" value={grade} id={grade} />
              <Label htmlFor={grade} className="text-sm">{grade}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Languages *</Label>
        <div className="flex flex-wrap gap-4 mt-2">
          {['English', 'Malayalam', 'Hindi', 'Tamil'].map((language) => (
            <div key={language} className="flex items-center space-x-2">
              <Checkbox name="languages" value={language} id={language} />
              <Label htmlFor={language} className="text-sm">{language}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorQualificationSection;
