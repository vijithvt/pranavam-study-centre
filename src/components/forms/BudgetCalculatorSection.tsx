
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Info } from 'lucide-react';

const BudgetCalculatorSection = () => {
  const [hoursPerMonth, setHoursPerMonth] = useState([20]);
  const [hourlyRate, setHourlyRate] = useState([400]);
  const [monthlyFee, setMonthlyFee] = useState(8000);

  useEffect(() => {
    const calculatedFee = hoursPerMonth[0] * hourlyRate[0];
    setMonthlyFee(calculatedFee);
  }, [hoursPerMonth, hourlyRate]);

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-gray-50">
      {/* Removed "Budget Calculator" header */}
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
            min={300}
            step={100}
            className="mt-2"
          />
          <input type="hidden" name="hourlyRate" value={hourlyRate[0]} />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹300</span>
            <span>₹3000</span>
          </div>
        </div>
        <div>
          <Label htmlFor="hoursPerMonth">
            Choose required no. of hours in month: {hoursPerMonth[0]} hrs
          </Label>
          <Slider
            value={hoursPerMonth}
            onValueChange={setHoursPerMonth}
            max={60}
            min={12}
            step={2}
            className="mt-2"
          />
          <input type="hidden" name="hoursPerMonth" value={hoursPerMonth[0]} />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>12 hrs</span>
            <span>60 hrs</span>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg border-2 border-blue-200">
        <Label className="text-lg font-semibold text-blue-700">
          Monthly Fee: ₹{monthlyFee.toLocaleString()}
        </Label>
        <p className="text-sm text-gray-600 mt-1">
          Calculated as {hoursPerMonth[0]} hours × ₹{hourlyRate[0]} per hour
        </p>
        <input type="hidden" name="budget" value={`${monthlyFee}`} />
      </div>
    </div>
  );
};

export default BudgetCalculatorSection;
