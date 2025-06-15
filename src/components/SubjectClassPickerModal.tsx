
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SubjectClassPickerModalProps {
  open: boolean;
  subject: string;
  onPick: (pickedClass: string) => void;
  onClose: () => void;
}

const schoolSubjects = [
  "mathematics", "physics", "chemistry", "biology", "english", "hindi", "malayalam",
  "social science", "history", "geography", "political science", "economics", "computer science",
  "accountancy", "business studies", "psychology", "sociology", "philosophy", "physical education", "environmental science"
];
const schoolGrades = Array.from({length: 12}, (_, i) => (i+1).toString());

export default function SubjectClassPickerModal({ open, subject, onPick, onClose }: SubjectClassPickerModalProps) {
  const isSchoolSubject = schoolSubjects.includes(subject.trim().toLowerCase());
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl p-6">
        {isSchoolSubject ? (
          <>
            <div className="mb-4">
              <div className="text-xl font-bold mb-2">Select Class</div>
              <div className="text-gray-600">
                For <span className="font-semibold text-primary">{subject}</span>, please choose the class/grade.
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {schoolGrades.map((grade) => (
                <Button
                  key={grade}
                  variant="outline"
                  className="py-4 px-0 w-full font-bold rounded-lg"
                  onClick={() => onPick(grade)}
                >
                  Class {grade}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <div className="text-xl font-bold mb-2">Proceed</div>
              <div className="text-gray-600">
                We'll help you find tutors for <span className="font-semibold text-primary">{subject}</span>.
              </div>
            </div>
            <Button
              variant="default"
              className="w-full py-4 text-lg font-bold rounded-xl"
              onClick={() => onPick("")}
            >
              Continue
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
