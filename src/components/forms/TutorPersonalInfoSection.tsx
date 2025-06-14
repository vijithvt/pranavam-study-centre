
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TutorPersonalInfoSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input name="fullName" id="fullName" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input name="email" id="email" type="email" required className="mt-1" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input name="phone" id="phone" type="tel" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="whatsapp">WhatsApp Number *</Label>
          <Input name="whatsapp" id="whatsapp" type="tel" required className="mt-1" />
        </div>
      </div>
    </div>
  );
};

export default TutorPersonalInfoSection;
