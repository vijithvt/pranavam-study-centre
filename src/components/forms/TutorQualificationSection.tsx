
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TutorQualificationSection = () => {
  const [qualification, setQualification] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="qualification">Highest Qualification *</Label>
        <Select name="qualification" required onValueChange={setQualification}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select qualification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BA">BA</SelectItem>
            <SelectItem value="BSc">BSc</SelectItem>
            <SelectItem value="BCom">BCom</SelectItem>
            <SelectItem value="BTech">BTech</SelectItem>
            <SelectItem value="MA">MA</SelectItem>
            <SelectItem value="MSc">MSc</SelectItem>
            <SelectItem value="MCom">MCom</SelectItem>
            <SelectItem value="MTech">MTech</SelectItem>
            <SelectItem value="PhD">PhD</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="specialization">Specialization</Label>
        <Input 
          name="specialization"
          id="specialization"
          placeholder="e.g., Physics, Mathematics, Commerce"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="experience">Years of Experience *</Label>
        <Input name="experience" id="experience" type="number" min={0} required className="mt-1" />
      </div>
    </div>
  );
};

export default TutorQualificationSection;
