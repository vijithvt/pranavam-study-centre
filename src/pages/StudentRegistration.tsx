
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudentRegistration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Submitted!",
      description: "We'll find suitable tutors and contact you within 24 hours.",
    });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-12 pb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Request Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              We've received your tuition request. Our team will find suitable tutors in your area and contact you within 24 hours.
            </p>
            <div className="space-y-2 text-sm text-gray-500 mb-6">
              <p>📞 You'll receive a call from our team</p>
              <p>👨‍🏫 We'll share tutor profiles</p>
              <p>📅 Schedule trial classes</p>
            </div>
            <Button onClick={() => setIsSubmitted(false)} className="w-full">
              Submit Another Request
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Tutor</h1>
          </div>
          <p className="text-xl text-gray-600">
            Tell us your requirements and we'll connect you with the best tutors in your area
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student Tuition Request</CardTitle>
            <CardDescription>
              Fill out this form and we'll find qualified tutors matching your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="studentName">Student Name *</Label>
                  <Input id="studentName" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="class">Class/Grade *</Label>
                  <Select required>
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
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Parent Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                  <Input id="parentName" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="parentPhone">Contact Number *</Label>
                  <Input id="parentPhone" type="tel" required className="mt-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" className="mt-1" />
              </div>

              {/* Location */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="district">District *</Label>
                  <Select required>
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
                  <Input id="area" required className="mt-1" placeholder="Enter your area or nearby landmark" />
                </div>
              </div>

              {/* Subject Requirements */}
              <div>
                <Label htmlFor="subjects">Subjects Needed *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Malayalam', 'Hindi', 'Social Science', 'Computer Science', 'Accountancy'].map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox id={subject} />
                      <Label htmlFor={subject} className="text-sm">{subject}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tuition Preferences */}
              <div>
                <Label>Preferred Mode *</Label>
                <div className="flex space-x-6 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="homeVisit" />
                    <Label htmlFor="homeVisit">Home Tuition</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="onlineClass" />
                    <Label htmlFor="onlineClass">Online Classes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="flexible" />
                    <Label htmlFor="flexible">Either is fine</Label>
                  </div>
                </div>
              </div>

              {/* Timing Preferences */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="preferredDays">Preferred Days</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox id={day} />
                        <Label htmlFor={day} className="text-sm">{day.slice(0, 3)}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="preferredTime">Preferred Time *</Label>
                  <Select required>
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

              {/* Tutor Preferences */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="tutorGender">Tutor Gender Preference</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Any preference?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="no-preference">No Preference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budget">Budget Range (per month)</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2000-3000">₹2,000 - ₹3,000</SelectItem>
                      <SelectItem value="3000-5000">₹3,000 - ₹5,000</SelectItem>
                      <SelectItem value="5000-8000">₹5,000 - ₹8,000</SelectItem>
                      <SelectItem value="8000+">₹8,000+</SelectItem>
                      <SelectItem value="discuss">Discuss with tutor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Special Requirements */}
              <div>
                <Label htmlFor="requirements">Special Requirements or Comments</Label>
                <Textarea 
                  id="requirements" 
                  className="mt-1" 
                  placeholder="Any specific requirements, learning difficulties, exam preparations, etc."
                />
              </div>

              {/* Urgency */}
              <div>
                <Label htmlFor="urgency">When do you want to start? *</Label>
                <Select required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="within-week">Within this week</SelectItem>
                    <SelectItem value="within-month">Within this month</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Consent */}
              <div className="flex items-start space-x-2">
                <Checkbox id="consent" required />
                <Label htmlFor="consent" className="text-sm leading-relaxed">
                  I consent to Pranavam Study Centre contacting me and sharing my details with suitable tutors. 
                  I understand this is a free service and there are no charges for connecting with tutors.
                </Label>
              </div>

              <Button type="submit" className="w-full btn-primary text-lg py-6">
                Submit Request - Find My Tutor
              </Button>

              <div className="text-center text-sm text-gray-500 space-y-1">
                <p>✓ Free service - No charges for connection</p>
                <p>✓ We'll call you within 24 hours</p>
                <p>✓ Qualified and verified tutors only</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegistration;
