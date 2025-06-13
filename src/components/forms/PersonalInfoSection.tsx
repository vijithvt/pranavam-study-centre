
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PersonalInfoSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="studentName">Student Name *</Label>
          <Input name="studentName" id="studentName" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="class">Class/Grade *</Label>
          <Select name="class" required>
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
            </SelectContent>
          </Select>
        </div>
      </div>

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
    </div>
  );
};

export default PersonalInfoSection;
