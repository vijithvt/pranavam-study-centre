
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TutorTerms = () => (
  <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
    <Card className="max-w-4xl w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Tutor Terms &amp; Conditions</CardTitle>
      </CardHeader>
      <CardContent className="prose max-w-none">
        <p>You must take the time to read and understand it before registering as a tutor or rendering services through Pranavam Study Centre, you accept that you are entering into a contract with us based on these Terms and Conditions.</p>
        <p><strong>Tutor shall deem acceptance of the agreement on these Terms.</strong></p>
        <h3>General Terms &amp; Agreements</h3>
        <ol className="list-decimal pl-6">
          <li>It is agreed that Pranavam Study Centre is hiring you to provide educational services ... contract basis as and when necessary for a period of 12 months.</li>
          <li>You understand and agree that all students, parents and Guardians are clients of only Pranavam Study Centre ... Tutors should not under any circumstance collect fees. Tutors should not under any circumstance change ...</li>
          <li>It is agreed that the Tutor shall always perform the services to the highest standard.</li>
          <li>In particular, but not limited to the below points, the Tutor shall make every effort to:
            <ol className="list-[lower-alpha] pl-6">
              <li>be punctual</li>
              <li>not use mobile phones or gadgets during the session.</li>
              <li>be presentable and dressed appropriately and respectably at all times</li>
              <li>be polite, diligent and helpful. Never use profanity in front of a client or student, ...</li>
              <li>do all the necessary preparations for each tutoring session</li>
              <li>not cancel lessons unless absolutely necessary.</li>
            </ol>
          </li>
          <li>It should be noted that tutors who repeatedly cancel sessions ... may be removed from our team.</li>
          <li>You understand and agree ... Contract for services. It is not a contract of employment.</li>
          <li>You understand and agree that you won't get involved in any kind of interaction with parents ... unless arranged by Pranavam Study Centre management.</li>
          <li>You understand that regular assessments ... should follow such work timeously.</li>
          <li>The Tutor must keep the client and Pranavam Study Centre informed ...</li>
          <li>The tutor shall report ... to ensure appropriate redressal ...</li>
        </ol>
        <h4>Demo Session</h4>
        <ol className="list-decimal pl-6" start={1}>
          <li>A demo class will be arranged ...</li>
          <li>Once demo class timing is fixed ...</li>
          <li>You understand that the demo session will be of 1 hour ...</li>
          <li>Selected Tutors should not share their selected tuition details ...</li>
          <li>Academic support team will be your sole point of contact ...</li>
          <li>You understand that the final decision to choose a particular student for tuition is yours ...</li>
          <li>During the demo class you should analyse students' calibre ...</li>
          <li>After the demo class tutor can recommend the number of classes ...</li>
          <li>A fixed number of classes, a minimum of 12-hour sessions should be there.</li>
        </ol>
        <h4>Leave and rescheduling</h4>
        <ol className="list-decimal pl-6" start={1}>
          <li>If you cannot attend the tuition as per the schedule ...</li>
          <li>The tutor will wait for a maximum of 20 minutes ...</li>
          <li>Session will be considered payable if the tutor arrives but the student is unavailable ...</li>
          <li>Rescheduled classes have to be adjusted ...</li>
          <li>If a parent requests to cancel or reschedule ...</li>
          <li>If you are leaving any tuition ... you must intimate before one month.</li>
          <li>If the tutor discontinues the classes in the middle ...</li>
        </ol>
        <h4>Payment and Assessment Process</h4>
        <ol className="list-decimal pl-6" start={1}>
          <li>Tuition charges with transportation will be fixed ...</li>
          <li>Pranavam Study Centre will ensure that the Tutor gets paid ...</li>
          <li>Payment process is processed within 3 to 5 working days ...</li>
          <li>After completing each session, details ... should be properly updated ...</li>
          <li>If there is no academic improvement for the students ...</li>
          <li>In exceptional circumstances ... the lesson will be chargeable ...</li>
          <li>If the tutor discontinues the classes without 3 weeks prior notice ...</li>
          <li>Individual classes will be 1-hour 2-hour sessions/classes depending ...</li>
        </ol>
        <h4>Termination of Agreement</h4>
        <ol className="list-decimal pl-6" start={1}>
          <li>Both parties appreciate the importance of a good understanding ...</li>
          <li>If the Tutor ... is unhappy ... may terminate the tutor's session ...</li>
          <li>The Tutor hereby agrees that the Company may terminate ... with immediate effect and deny payment ... 
            <ol className="list-[lower-alpha] pl-6">
              <li>if the Tutor commits a serious or material breach ...</li>
              <li>if the Tutor repeatedly commits minor breaches ...</li>
              <li>if the Tutor acts in such a way as to discredit the Company</li>
              <li>if the Tutor ... found guilty of any criminal offence</li>
              <li>Any complaints ... which affect the session assessment.</li>
              <li>If the tutor misbehaves the student in any manner ...</li>
            </ol>
          </li>
        </ol>
      </CardContent>
    </Card>
  </div>
);

export default TutorTerms;
