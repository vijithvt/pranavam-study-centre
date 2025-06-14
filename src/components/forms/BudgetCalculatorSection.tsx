import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Info } from 'lucide-react';

const BudgetCalculatorSection = ({ setMonthlyFee, classGrade }: { setMonthlyFee?: (fee: number) => void; classGrade?: string }) => {
  const [hoursPerMonth, setHoursPerMonth] = useState([20]);
  
  // Function to get minimum hourly rate based on class/grade
  const getMinHourlyRate = (grade: string) => {
    if (!grade) return 250;
    
    const gradeNum = parseInt(grade);
    
    // Classes 1-4: minimum 250
    if (gradeNum >= 1 && gradeNum <= 4) return 250;
    
    // Classes 5-6: minimum 250 (keeping same as 1-4)
    if (gradeNum >= 5 && gradeNum <= 6) return 250;
    
    // Classes 7-10: minimum 300
    if (gradeNum >= 7 && gradeNum <= 10) return 300;
    
    // Classes 11-12: minimum 350
    if (gradeNum >= 11 && gradeNum <= 12) return 350;
    
    // Higher education and special categories: minimum 400
    if (['btech','bsc','ba','bcom','llb','mtech','msc','ma','mcom','music','dance','art','violin-classical','violin-western','neet','jee','upsc','psc','banking','ssc','railway'].includes(grade)) {
      return 400;
    }
    
    return 250; // Default
  };

  const minRate = getMinHourlyRate(classGrade || '');
  const [hourlyRate, setHourlyRate] = useState([minRate]);
  const [monthlyFee, updateMonthlyFee] = useState(hoursPerMonth[0] * minRate);

  // Update hourly rate when class grade changes
  useEffect(() => {
    const newMinRate = getMinHourlyRate(classGrade || '');
    if (hourlyRate[0] < newMinRate) {
      setHourlyRate([newMinRate]);
    }
  }, [classGrade]);

  useEffect(() => {
    const calculatedFee = hoursPerMonth[0] * hourlyRate[0];
    updateMonthlyFee(calculatedFee);
    if (setMonthlyFee) setMonthlyFee(calculatedFee);
  }, [hoursPerMonth, hourlyRate, setMonthlyFee]);

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-gray-50">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Label htmlFor="hourlyRate">
              Hourly Rate: ₹{hourlyRate[0]}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <span tabIndex={0}><Info size={16} className="text-gray-500 cursor-pointer" /></span>
              </PopoverTrigger>
              <PopoverContent side="top" className="text-xs max-w-xs">
                Choose maximum budget for experienced tutors
              </PopoverContent>
            </Popover>
          </div>
          <Slider
            value={hourlyRate}
            onValueChange={setHourlyRate}
            max={3000}
            min={minRate}
            step={50}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹{minRate}</span>
            <span>₹3000</span>
          </div>
        </div>
        <div>
          <Label htmlFor="hoursPerMonth">
            Probable no. of hours in month: {hoursPerMonth[0]} hrs
          </Label>
          <Slider
            value={hoursPerMonth}
            onValueChange={setHoursPerMonth}
            max={60}
            min={8}
            step={2}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>8 hrs</span>
            <span>60 hrs</span>
          </div>
        </div>
      </div>
      {/* Monthly Fee only in state, not visible here */}
    </div>
  );
};

export default BudgetCalculatorSection;
