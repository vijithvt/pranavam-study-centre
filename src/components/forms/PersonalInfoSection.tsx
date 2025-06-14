import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const higherEdClasses = ['btech', 'bsc', 'ba', 'bcom', 'llb', 'mtech', 'msc', 'ma', 'mcom'];
const artsClasses = ['music', 'dance', 'art', 'violin-classical', 'violin-western'];
const entranceClasses = ['neet', 'jee', 'upsc', 'psc', 'banking', 'ssc', 'railway'];

const PersonalInfoSection = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [showUniversityFields, setShowUniversityFields] = useState(false);
  const [showSyllabusField, setShowSyllabusField] = useState(false);
  const [showSubjectInput, setShowSubjectInput] = useState(false);

  useEffect(() => {
    setShowUniversityFields(higherEdClasses.includes(selectedClass));
    setShowSyllabusField(!(higherEdClasses.includes(selectedClass) || artsClasses.includes(selectedClass) || entranceClasses.includes(selectedClass)));
    setShowSubjectInput(higherEdClasses.includes(selectedClass));
  }, [selectedClass]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="studentName">Student Name *</Label>
          <Input name="studentName" id="studentName" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="class">Class/Grade *</Label>
          <Select name="class" required onValueChange={setSelectedClass}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Class 1</SelectItem>
              <SelectItem value="2">Class 2</SelectItem>
              <SelectItem value="3">Class 3</SelectItem>
              <SelectItem value="4">Class 4</SelectItem>
              <SelectItem value="5">Class 5</SelectItem>
              <SelectItem value="6">Class 6</SelectItem>
              <SelectItem value="7">Class 7</SelectItem>
              <SelectItem value="8">Class 8</SelectItem>
              <SelectItem value="9">Class 9</SelectItem>
              <SelectItem value="10">Class 10</SelectItem>
              <SelectItem value="11">Class 11</SelectItem>
              <SelectItem value="12">Class 12</SelectItem>
              <SelectItem value="btech">B.Tech</SelectItem>
              <SelectItem value="bsc">B.Sc</SelectItem>
              <SelectItem value="ba">B.A</SelectItem>
              <SelectItem value="bcom">B.Com</SelectItem>
              <SelectItem value="llb">LLB</SelectItem>
              <SelectItem value="mtech">M.Tech</SelectItem>
              <SelectItem value="msc">M.Sc</SelectItem>
              <SelectItem value="ma">M.A</SelectItem>
              <SelectItem value="mcom">M.Com</SelectItem>
              <SelectItem value="neet">NEET</SelectItem>
              <SelectItem value="jee">JEE</SelectItem>
              <SelectItem value="upsc">UPSC</SelectItem>
              <SelectItem value="psc">PSC</SelectItem>
              <SelectItem value="banking">Banking Exams</SelectItem>
              <SelectItem value="ssc">SSC</SelectItem>
              <SelectItem value="railway">Railway Exams</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="dance">Dance</SelectItem>
              <SelectItem value="art">Art/Drawing</SelectItem>
              <SelectItem value="violin-classical">Violin (Classical)</SelectItem>
              <SelectItem value="violin-western">Violin (Western)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showSyllabusField && (
        <div>
          <Label htmlFor="syllabus">Syllabus *</Label>
          <Select name="syllabus" required>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select syllabus" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CBSE">CBSE</SelectItem>
              <SelectItem value="ICSE">ICSE</SelectItem>
              <SelectItem value="IGCSE">IGCSE</SelectItem>
              <SelectItem value="STATE">State Board</SelectItem>
              <SelectItem value="IB">International Baccalaureate (IB)</SelectItem>
              <SelectItem value="CAMBRIDGE">Cambridge</SelectItem>
              <SelectItem value="NIOS">NIOS</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {showUniversityFields && (
        <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="university">University/Institution *</Label>
              <Input 
                name="university" 
                id="university"
                required
                className="mt-1" 
                placeholder="Enter university name"
              />
            </div>
            <div>
              <Label htmlFor="branch">Branch/Specialization *</Label>
              <Input 
                name="branch" 
                id="branch"
                required
                className="mt-1" 
                placeholder="e.g., Computer Science, Commerce"
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="parentName">Parent/Guardian Name *</Label>
          <Input name="parentName" id="parentName" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="parentPhone">Contact Number *</Label>
          <Input name="parentPhone" id="parentPhone" type="tel" required className="mt-1" />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input name="email" id="email" type="email" required className="mt-1" />
      </div>

      <div>
        <Label htmlFor="languages">Medium of Teaching *</Label>
        <Select name="languages" required>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select medium of teaching" />
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
