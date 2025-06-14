
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FileText, Download } from 'lucide-react';

interface TutorAgreementDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const TutorAgreementDialog = ({ isOpen, onClose }: TutorAgreementDialogProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    alternateNumber: '',
    permanentAddress: '',
    presentAddress: '',
    generalTermsAgreed: false,
    demoSessionAgreed: false,
    leaveReschedulingAgreed: false,
    paymentAssessmentAgreed: false,
    terminationAgreed: false,
    finalConfirmation: false
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateAgreement = () => {
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.contactNumber || 
        !formData.permanentAddress || !formData.presentAddress) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Validate all agreements
    if (!formData.generalTermsAgreed || !formData.demoSessionAgreed || 
        !formData.leaveReschedulingAgreed || !formData.paymentAssessmentAgreed || 
        !formData.terminationAgreed || !formData.finalConfirmation) {
      toast({
        title: "Agreement Required",
        description: "Please agree to all terms and conditions.",
        variant: "destructive"
      });
      return;
    }

    // Generate and download agreement
    const agreementText = generateAgreementText();
    downloadAgreement(agreementText);
    
    toast({
      title: "Agreement Generated",
      description: "Tutor agreement has been generated and downloaded.",
    });
  };

  const generateAgreementText = () => {
    return `
TUTOR AGREEMENT
Pranavam Study Centre

Personal Details:
Name: ${formData.firstName} ${formData.lastName}
Contact Number: ${formData.contactNumber}
Alternate Number: ${formData.alternateNumber}
Permanent Address: ${formData.permanentAddress}
Present Address: ${formData.presentAddress}

Congratulations and welcome to Pranavam Study Centre 1to1 home tutors a sister concern of "The Isec School of Engineering & Consultancies"

You must take the time to read and understand it before registering as a tutor or rendering services through Pranavam Study Centre, you accept that you are entering into a contract with us based on these Terms and Conditions.

Tutor shall deem acceptance of the agreement on these Terms.

General Terms & Agreements

1. It is agreed that Pranavam Study Centre is hiring you to provide educational services to our client on a contract basis as and when necessary for a period of 12 months.

2. You understand and agree that all students, parents and Guardians are clients of only Pranavam Study Centre. The tutor is employed part-time to tutor students of our clients by Pranavam Study Centre. Pranavam Study Centre also fixes the tutoring schedule based on which the fee is collected from the Client on behalf of the Tutor, together with its fee. Tutors should not under any circumstance collect fees. Tutors should not under any circumstance change the schedule or take sessions outside the schedule without prior permission from Pranavam Study Centre.

3. It is agreed that the Tutor shall always perform the services to the highest standard.

4. In particular, but not limited to the below points, the Tutor shall make every effort to:
   a) be punctual
   b) not use mobile phones or gadgets during the session.
   c) be presentable and dressed appropriately and respectably at all times
   d) be polite, diligent and helpful. Never use profanity in front of a client or student, or make derogatory remarks about a student. Any tutor who does this will be removed from our team immediately.
   e) do all the necessary preparations for each tutoring session
   f) not cancel lessons unless absolutely necessary.

5. It should be noted that tutors who repeatedly cancel sessions or fail to notify the Pranavam Study Centre team of cancelled sessions may be removed from our team.

6. You understand and agree that the relationship between Pranavam Study Centre and you will be considered as a Contract for services. It is not a contract of employment.

7. You understand and agree that you won't get involved in any kind of interaction with parents, regarding payment or you will not directly contact a client who is enrolled with Pranavam Study Centre and or provide additional services outside this contract of tuition unless arranged by Pranavam Study Centre management.

8. You understand that regular assessments, assignments, exercises or homework are integral to tutoring and you should follow such work timeously.

9. The Tutor must keep the client and Pranavam Study Centre informed of any issues or problems with each student taught, as and when they develop

10. The tutor shall report to Pranavam Study Centre any misbehaviour or disrespect by students, parents or any other persons immediately to ensure appropriate redressal of the situation.

Demo Session

1. A demo class will be arranged only after getting your willingness to handle the Subject/ Student for an entire academic year, fixing hourly Payment and checking location accessibility.

2. Once demo class timing is fixed according to your and the student's / Parents' convenience, the session shall not be rescheduled as it will affect Pranavam Study Centre's reputation. If failing to attend without furnishing an authentic reason, you may not be considered for continuing a further relationship with Pranavam Study Centre.

3. You understand that the demo session will be of 1 hour and as this session is to showcase your teaching capability to the client, there will be no payment for this session.

4. Selected Tutors should not share their selected tuition details with their friends/colleagues and do not invite them to the student's residence at the time of the introduction / Demo class.

5. Academic support team will be your sole point of contact for communicating with Parents. Parents' queries regarding the payment, feedback and class schedule, after the demo session should be directed to our Academic support team. If found communicating with parents without keeping Pranavam Study Centre in the loop, the tutor will not be considered in continuing a further relationship with Pranavam Study Centre.

6. You understand that the final decision to choose a particular student for tuition is yours and yours alone. If you are selected in a demo, you can't reject the tuition until and unless there is an authentic reason.

7. During the demo class you should analyse students' calibre to grab the portions and by that, we can fix how many classes we should provide in a week to improve the particular student.

8. After the demo class tutor can recommend the number of classes and hours per session needed for completing the portions.

9. A fixed number of classes, a minimum of 12-hour sessions should be there.

Leave and rescheduling

1. If you cannot attend the tuition as per the schedule, a prior notice of 12 hours before the session starts must be given to the academic support team of Pranavam Study Centre to inform the parent/ Student.

2. The tutor will wait for a maximum of 20 minutes from the time of the scheduled session for the student's arrival before considering that session cancelled (for cases without prior information from students.

3. Session will be considered payable if the tutor arrives but the student is unavailable or not ready for the session for more than 20 minutes. Such a situation should be informed to the academic support team immediately for it to be considered a valid session. This should be recorded in the record book as well.

4. Rescheduled classes have to be adjusted with another time slot in the following week as agreed upon by the parent through communication with the academic support team of Pranavam Study Centre.

5. If a parent requests to cancel or reschedule a tutoring session, you should inform them to contact the academic support team of Pranavam Study Centre.

6. If you are leaving any tuition with an authentic reason, you must intimate before one month.

7. If the tutor discontinues the classes in the middle of the schedule no further payment will be made to the tutor including any pending payment.

Payment and Assessment Process

1. Tuition charges with transportation will be fixed at a hourly fee agreed upon by the teachers and the same will be valid for all scheduled classes, no change request will be accepted in the middle of a booked session till all classes booked by the students have been completed.

2. Pranavam Study Centre will ensure that the Tutor gets paid for sessions reported irrespective of payment from the parents.

3. Payment process is processed within 3 to 5 working days after the completion of each fixed schedule consisting of 4 weeks/ fixed hours.

4. After completing each session, details of the class taken should be properly updated in the record book provided at the student's residence. And the consolidated details of one month or fixed schedule should be updated in the Excel sheet and must be submitted to Pranavam Study Centre for Assessment.

5. If there is no academic improvement for the students even after your tutoring, it also affects your assessment process.

6. In exceptional circumstances, where the student is unable to give advance notice of cancellation, the teacher will do their best to offer an alternate date for the lesson that week. However, this is at the teacher's discretion. If the tutor fails to accommodate, the lesson will be chargeable during busy times and there will be no further charges or payments due Tutor.

7. If the tutor discontinues the classes without 3 weeks prior notice, the payment will be released only after providing a replacement tutor to the student, as sudden stoppage of class causes great harm to the student.

8. Individual classes will be 1-hour 2-hour sessions/classes depending on the requirement. For combined subject classes (more than 2 subjects) Teacher will take the same for 1 hour or 2 hours depending on the classes booked.

Termination of Agreement

1. Both parties appreciate the importance of a good understanding and trust between the tutor and the student. Accordingly, if the Client is, in his/her reasonable opinion, if not happy with the Tutor, This Agreement shall then terminate with immediate effect.

2. If the Tutor, in her/his reasonable opinion, is unhappy with the Client and/or Student's behaviour they must inform the Company and the Company may terminate the tutor's session with the Client.

3. The Tutor hereby agrees that the Company may terminate this Agreement with immediate effect and deny payment of due:
   a) if the Tutor commits a serious or material breach of any of his or her obligations
   b) if the Tutor repeatedly commits minor breaches of obligations under this Agreement
   c) if the Tutor acts in such a way as to discredit the Company
   d) if the Tutor shall have been found guilty of any criminal offence
   e) Any complaints from the parent side such as not keeping time, usage of mobile phones during sessions, and unscheduled gaps during the sessions, which affect the session assessment.
   f) If the tutor misbehaves the student in any manner but not limited to screaming verbal accuse, derogatory remarks exaggerated impatient or irritation etc.

I hereby confirm that you will abide by all the rules and regulations of Pranavam Study Centre.

Tutor Signature: _________________ Date: _________________

Pranavam Study Centre Representative: _________________ Date: _________________
    `;
  };

  const downloadAgreement = (content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Tutor_Agreement_${formData.firstName}_${formData.lastName}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenModal={() => {}} onClose={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Tutor Agreement Form
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <Input
                    id="contactNumber"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="alternateNumber">Alternate Number</Label>
                  <Input
                    id="alternateNumber"
                    value={formData.alternateNumber}
                    onChange={(e) => handleInputChange('alternateNumber', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="permanentAddress">Permanent Address *</Label>
                <Textarea
                  id="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="presentAddress">Present Address *</Label>
                <Textarea
                  id="presentAddress"
                  value={formData.presentAddress}
                  onChange={(e) => handleInputChange('presentAddress', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Agreement Sections */}
          <Card>
            <CardHeader>
              <CardTitle>Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* General Terms */}
              <div className="space-y-4">
                <h4 className="font-semibold">General Terms & Agreements</h4>
                <div className="text-sm text-gray-600 space-y-2 max-h-40 overflow-y-auto border p-3 rounded">
                  <p>1. It is agreed that Pranavam Study Centre is hiring you to provide educational services to our client on a contract basis as and when necessary for a period of 12 months.</p>
                  <p>2. You understand and agree that all students, parents and Guardians are clients of only Pranavam Study Centre...</p>
                  <p>3. It is agreed that the Tutor shall always perform the services to the highest standard.</p>
                  <p>4. The Tutor shall make every effort to: be punctual, not use mobile phones during sessions, be presentable and dressed appropriately...</p>
                  <p>5-10. [Additional terms and conditions...]</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="generalTerms"
                    checked={formData.generalTermsAgreed}
                    onCheckedChange={(checked) => handleInputChange('generalTermsAgreed', checked as boolean)}
                  />
                  <Label htmlFor="generalTerms">I Agree to General Terms & Agreements *</Label>
                </div>
              </div>

              {/* Demo Session */}
              <div className="space-y-4">
                <h4 className="font-semibold">Demo Session</h4>
                <div className="text-sm text-gray-600 space-y-2 max-h-40 overflow-y-auto border p-3 rounded">
                  <p>1. A demo class will be arranged only after getting your willingness to handle the Subject/Student for an entire academic year...</p>
                  <p>2. Once demo class timing is fixed, the session shall not be rescheduled...</p>
                  <p>3. The demo session will be of 1 hour with no payment for this session...</p>
                  <p>4-9. [Additional demo session terms...]</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="demoSession"
                    checked={formData.demoSessionAgreed}
                    onCheckedChange={(checked) => handleInputChange('demoSessionAgreed', checked as boolean)}
                  />
                  <Label htmlFor="demoSession">I Agree to Demo Session Terms *</Label>
                </div>
              </div>

              {/* Leave and Rescheduling */}
              <div className="space-y-4">
                <h4 className="font-semibold">Leave and Rescheduling</h4>
                <div className="text-sm text-gray-600 space-y-2 max-h-40 overflow-y-auto border p-3 rounded">
                  <p>1. Prior notice of 12 hours before the session must be given for any absence...</p>
                  <p>2. The tutor will wait for a maximum of 20 minutes for the student's arrival...</p>
                  <p>3-7. [Additional leave and rescheduling terms...]</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="leaveRescheduling"
                    checked={formData.leaveReschedulingAgreed}
                    onCheckedChange={(checked) => handleInputChange('leaveReschedulingAgreed', checked as boolean)}
                  />
                  <Label htmlFor="leaveRescheduling">I Agree to Leave and Rescheduling Terms *</Label>
                </div>
              </div>

              {/* Payment and Assessment */}
              <div className="space-y-4">
                <h4 className="font-semibold">Payment and Assessment Process</h4>
                <div className="text-sm text-gray-600 space-y-2 max-h-40 overflow-y-auto border p-3 rounded">
                  <p>1. Tuition charges will be fixed at an hourly fee agreed upon by the teachers...</p>
                  <p>2. Pranavam Study Centre will ensure payment for sessions reported...</p>
                  <p>3. Payment is processed within 3 to 5 working days after completion...</p>
                  <p>4-8. [Additional payment and assessment terms...]</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paymentAssessment"
                    checked={formData.paymentAssessmentAgreed}
                    onCheckedChange={(checked) => handleInputChange('paymentAssessmentAgreed', checked as boolean)}
                  />
                  <Label htmlFor="paymentAssessment">I Agree to Payment and Assessment Terms *</Label>
                </div>
              </div>

              {/* Termination */}
              <div className="space-y-4">
                <h4 className="font-semibold">Termination of Agreement</h4>
                <div className="text-sm text-gray-600 space-y-2 max-h-40 overflow-y-auto border p-3 rounded">
                  <p>1. If the Client is not happy with the Tutor, this Agreement shall terminate with immediate effect...</p>
                  <p>2. If the Tutor is unhappy with the Client's behaviour, they must inform the Company...</p>
                  <p>3. The Company may terminate this Agreement for serious breaches, criminal offences, complaints, or misbehaviour...</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="termination"
                    checked={formData.terminationAgreed}
                    onCheckedChange={(checked) => handleInputChange('terminationAgreed', checked as boolean)}
                  />
                  <Label htmlFor="termination">I Agree to Termination Terms *</Label>
                </div>
              </div>

              {/* Final Confirmation */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="finalConfirmation"
                    checked={formData.finalConfirmation}
                    onCheckedChange={(checked) => handleInputChange('finalConfirmation', checked as boolean)}
                  />
                  <Label htmlFor="finalConfirmation" className="font-semibold">
                    I hereby confirm that I will abide by all the rules and regulations of Pranavam Study Centre. *
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleGenerateAgreement} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Generate Agreement
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorAgreementDialog;
