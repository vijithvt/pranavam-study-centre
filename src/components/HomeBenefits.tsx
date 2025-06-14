
import React from "react";
import { CheckCircle } from "lucide-react";

const benefits = [
  {
    label: "Free service - No charges for connection",
    color: "bg-green-50 text-green-800 border-green-200"
  },
  {
    label: "We'll call you within 24 hours",
    color: "bg-blue-50 text-blue-800 border-blue-200"
  },
  {
    label: "Qualified and verified tutors only",
    color: "bg-yellow-50 text-yellow-800 border-yellow-200"
  },
];

const HomeBenefits = () => (
  <div className="max-w-4xl mx-auto px-4 py-7 flex flex-col sm:flex-row gap-4 items-center justify-center animate-fade-in">
    {benefits.map((item, ix) => (
      <div
        key={item.label}
        className={`flex items-center gap-2 rounded-lg border ${item.color} px-4 py-3 shadow-sm w-full sm:w-auto`}
      >
        <CheckCircle className="text-primary h-5 w-5" />
        <span className="font-medium text-base">{item.label}</span>
      </div>
    ))}
  </div>
);

export default HomeBenefits;
