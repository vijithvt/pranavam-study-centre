
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PersonalInfoSectionProps {
  classGrade: string;
  setClassGrade: (grade: string) => void;
}

const PersonalInfoSection = ({ classGrade, setClassGrade }: PersonalInfoSectionProps) => {
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

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="class">Class/Grade *</Label>
          <Select name="class" value={classGrade} onValueChange={setClassGrade} required>
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
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="dance">Dance</SelectItem>
              <SelectItem value="art">Art/Drawing</SelectItem>
              <SelectItem value="violin-classical">Violin (Classical)</SelectItem>
              <SelectItem value="violin-western">Violin (Western)</SelectItem>
              <SelectItem value="neet">NEET</SelectItem>
              <SelectItem value="jee">JEE</SelectItem>
              <SelectItem value="upsc">UPSC</SelectItem>
              <SelectItem value="psc">PSC</SelectItem>
              <SelectItem value="banking">Banking</SelectItem>
              <SelectItem value="ssc">SSC</SelectItem>
              <SelectItem value="railway">Railway</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {!['btech','bsc','ba','bcom','llb','mtech','msc','ma','mcom','music','dance','art','violin-classical','violin-western','neet','jee','upsc','psc','banking','ssc','railway'].includes(classGrade) && (
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
        )}
      </div>

      {/* Higher education fields */}
      {['btech','bsc','ba','bcom','llb','mtech','msc','ma','mcom'].includes(classGrade) && (
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
