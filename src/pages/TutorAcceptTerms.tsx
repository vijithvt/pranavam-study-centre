
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SECTIONS = [
  {
    title: "General Terms & Agreements",
    content: [
      "It is agreed that Pranavam Study Centre is hiring you to provide educational services to our client on a contract basis as and when necessary for a period of 12 months.",
      "You understand and agree that all students, parents and Guardians are clients of only Pranavam Study Centre. The tutor is employed part-time to tutor students of our clients by Pranavam Study Centre. Pranavam Study Centre also fixes the tutoring schedule based on which the fee is collected from the Client on behalf of the Tutor, together with its fee. Tutors should not under any circumstance collect fees. Tutors should not under any circumstance change the schedule or take sessions outside the schedule without prior permission from Pranavam Study Centre.",
      "It is agreed that the Tutor shall always perform the services to the highest standard.",
      "In particular, but not limited to the below points, the Tutor shall make every effort to:",
      <ul className="list-disc pl-8">
        <li>be punctual</li>
        <li>not use mobile phones or gadgets during the session.</li>
        <li>be presentable and dressed appropriately and respectably at all times</li>
        <li>be polite, diligent and helpful. Never use profanity in front of a client or student, or make derogatory remarks about a student. Any tutor who does this will be removed from our team immediately.</li>
        <li>do all the necessary preparations for each tutoring session</li>
        <li>not cancel lessons unless absolutely necessary.</li>
      </ul>,
      "It should be noted that tutors who repeatedly cancel sessions or fail to notify the Pranavam Study Centre team of cancelled sessions may be removed from our team.",
      "You understand and agree that the relationship between Pranavam Study Centre and you will be considered as a Contract for services. It is not a contract of employment.",
      "You understand and agree that you won’t get involved in any kind of interaction with parents, regarding payment or you will not directly contact a client who is enrolled with Pranavam Study Centre and or provide additional services outside this contract of tuition unless arranged by Pranavam Study Centre management.",
      "You understand that regular assessments, assignments, exercises or homework are integral to tutoring and you should follow such work timeously.",
      "The Tutor must keep the client and Pranavam Study Centre informed of any issues or problems with each student taught, as and when they develop",
      "The tutor shall report to Pranavam Study Centre any misbehaviour or disrespect by students, parents or any other persons immediately to ensure appropriate redressal of the situation."
    ],
    short: "I Agree"
  },
  {
    title: "Demo Session",
    content: [
      "A demo class will be arranged only after getting your willingness to handle the Subject/ Student for an entire academic year, fixing hourly Payment and checking location accessibility.",
      "Once demo class timing is fixed according to your and the student’s / Parents’ convenience, the session shall not be rescheduled as it will affect Pranavam Study Centre’s reputation. If failing to attend without furnishing an authentic reason, you may not be considered for continuing a further relationship with Pranavam Study Centre.",
      "You understand that the demo session will be of 1 hour and as this session is to showcase your teaching capability to the client, there will be no payment for this session.",
      "Selected Tutors should not share their selected tuition details with their friends/colleagues and do not invite them to the student’s residence at the time of the introduction / Demo class.",
      "Academic support team will be your sole point of contact for communicating with Parents. Parents’ queries regarding the payment, feedback and class schedule, after the demo session should be directed to our Academic support team. If found communicating with parents without keeping Pranavam Study Centre in the loop, the tutor will not be considered in continuing a further relationship with Pranavam Study Centre.",
      "You understand that the final decision to choose a particular student for tuition is yours and yours alone. If you are selected in a demo, you can’t reject the tuition until and unless there is an authentic reason.",
      "During the demo class you should analyse students’ calibre to grab the portions and by that, we can fix how many classes we should provide in a week to improve the particular student.",
      "After the demo class tutor can recommend the number of classes and hours per session needed for completing the portions.",
      "A fixed number of classes, a minimum of 12-hour sessions should be there."
    ],
    short: "I Agree"
  },
  {
    title: "Leave and Rescheduling",
    content: [
      "If you cannot attend the tuition as per the schedule, a prior notice of 12 hours before the session starts must be given to the academic support team of Pranavam Study Centre to inform the parent/ Student.",
      "The tutor will wait for a maximum of 20 minutes from the time of the scheduled session for the student's arrival before considering that session cancelled (for cases without prior information from students.",
      "Session will be considered payable if the tutor arrives but the student is unavailable or not ready for the session for more than 20 minutes. Such a situation should be informed to the academic support team immediately for it to be considered a valid session. This should be recorded in the record book as well.",
      "Rescheduled classes have to be adjusted with another time slot in the following week as agreed upon by the parent through communication with the academic support team of Pranavam Study Centre.",
      "If a parent requests to cancel or reschedule a tutoring session, you should inform them to contact the academic support team of Pranavam Study Centre.",
      "If you are leaving any tuition with an authentic reason, you must intimate before one month.",
      "If the tutor discontinues the classes in the middle of the schedule no further payment will be made to the tutor including any pending payment."
    ],
    short: "I Agree"
  },
  {
    title: "Payment and Assessment Process",
    content: [
      "Tuition charges with transportation will be fixed at a hourly fee agreed upon by the teachers and the same will be valid for all scheduled classes, no change request will be accepted in the middle of a booked session till all classes booked by the students have been completed.",
      "Pranavam Study Centre will ensure that the Tutor gets paid for sessions reported irrespective of payment from the parents.",
      "Payment process is processed within 3 to 5 working days after the completion of each fixed schedule consisting of 4 weeks/ fixed hours.",
      "After completing each session, details of the class taken should be properly updated in the record book provided at the student’s residence. And the consolidated details of one month or fixed schedule should be updated in the Excel sheet and must be submitted to Pranavam Study Centre for Assessment.",
      "If there is no academic improvement for the students even after your tutoring, it also affects your assessment process.",
      "In exceptional circumstances, where the student is unable to give advance notice of cancellation, the teacher will do their best to offer an alternate date for the lesson that week. However, this is at the teacher's discretion. If the tutor fails to accommodate, the lesson will be chargeable during busy times and there will be no further charges or payments due Tutor.",
      "If the tutor discontinues the classes without 3 weeks prior notice, the payment will be released only after providing a replacement tutor to the student, as sudden stoppage of class causes great harm to the student.",
      "Individual classes will be 1-hour 2-hour sessions/classes depending on the requirement. For combined subject classes (more than 2 subjects) Teacher will take the same for 1 hour or 2 hours depending on the classes booked."
    ],
    short: "I Agree"
  },
  {
    title: "Termination of Agreement",
    content: [
      "Both parties appreciate the importance of a good understanding and trust between the tutor and the student. Accordingly, if the Client is, in his/her reasonable opinion, if not happy with the Tutor, This Agreement shall then terminate with immediate effect.",
      "If the Tutor, in her/his reasonable opinion, is unhappy with the Client and/or Student’s behaviour they must inform the Company and the Company may terminate the tutor's session with the Client.",
      <>
      The Tutor hereby agrees that the Company may terminate this Agreement with immediate effect and deny payment of due:
      <ul className="list-disc pl-8">
        <li>if the Tutor commits a serious or material breach of any of his or her obligations</li>
        <li>if the Tutor repeatedly commits minor breaches of obligations under this Agreement</li>
        <li>if the Tutor acts in such a way as to discredit the Company</li>
        <li>if the Tutor shall have been found guilty of any criminal offence</li>
        <li>Any complaints from the parent side such as not keeping time, usage of mobile phones during sessions, and unscheduled gaps during the sessions, which affect the session assessment.</li>
        <li>If the tutor misbehaves the student in any manner but not limited to screaming verbal accuse, derogatory remarks, exaggerated impatience or irritation etc. </li>
      </ul>
      </>
    ],
    short: "I Agree"
  },
  {
    title: "Final Confirmation",
    content: [
      "I hereby confirm that you will abide by all the rules and regulations of Pranavam Study Centre."
    ],
    short: "I Agree"
  }
];

const TutorAcceptTerms = () => {
  const { tutorId } = useParams<{ tutorId: string }>();
  const [checks, setChecks] = useState<boolean[]>(Array(SECTIONS.length).fill(false));
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheck = (idx: number) => {
    setChecks(arr => arr.map((v, i) => i === idx ? !v : v));
  };

  const allChecked = checks.every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allChecked) {
      toast({
        title: "Please agree to all sections",
        description: "You must tick all checkboxes to proceed.",
        variant: "destructive"
      });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase
      .from('tutor_registrations')
      .update({ status: "converted as tutor" })
      .eq("id", tutorId);
    setSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status. Please contact admin.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "You have accepted the terms. Registration complete!",
      });
      setTimeout(() => navigate("/"), 1800);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <Card className="p-6">
          <h1 className="font-bold text-2xl mb-6 text-primary">Tutor Terms & Conditions</h1>
          <div className="space-y-8">
            {SECTIONS.map((section, idx) => (
              <div key={section.title} className="rounded-lg border p-4 bg-white shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">{section.title}</span>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`term-checkbox-${idx}`}
                      checked={checks[idx]}
                      onCheckedChange={() => handleCheck(idx)}
                      required
                    />
                    <Label htmlFor={`term-checkbox-${idx}`} className="text-sm">{section.short}</Label>
                  </div>
                </div>
                <div className="text-gray-700 space-y-2">
                  {section.content.map((line, lidx) =>
                    typeof line === "string"
                      ? <div key={lidx}>{line}</div>
                      : <div key={lidx}>{line}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full mt-8" disabled={!allChecked || submitting}>
            {submitting ? "Submitting..." : "Accept & Submit"}
          </Button>
        </Card>
      </form>
    </div>
  );
};
export default TutorAcceptTerms;
