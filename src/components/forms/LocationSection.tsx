
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LocationSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <Label htmlFor="district">District *</Label>
        <Select name="district" required>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select your district" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
            <SelectItem value="kollam">Kollam</SelectItem>
            <SelectItem value="pathanamthitta">Pathanamthitta</SelectItem>
            <SelectItem value="alappuzha">Alappuzha</SelectItem>
            <SelectItem value="kottayam">Kottayam</SelectItem>
            <SelectItem value="idukki">Idukki</SelectItem>
            <SelectItem value="ernakulam">Ernakulam</SelectItem>
            <SelectItem value="thrissur">Thrissur</SelectItem>
            <SelectItem value="palakkad">Palakkad</SelectItem>
            <SelectItem value="malappuram">Malappuram</SelectItem>
            <SelectItem value="kozhikode">Kozhikode</SelectItem>
            <SelectItem value="wayanad">Wayanad</SelectItem>
            <SelectItem value="kannur">Kannur</SelectItem>
            <SelectItem value="kasaragod">Kasaragod</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="area">Area/Locality *</Label>
        <Input name="area" id="area" required className="mt-1" placeholder="Enter your area or nearby landmark" />
      </div>
    </div>
  );
};

export default LocationSection;
