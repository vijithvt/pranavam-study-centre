
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

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
      <h3 className="font-medium text-gray-900">Budget Calculator</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="hoursPerMonth">Probable Hours in Month: {hoursPerMonth[0]} hrs</Label>
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

        <div>
          <Label htmlFor="hourlyRate">
            Hourly Rate: ₹{hourlyRate[0]}
            <br />
            <span className="text-xs text-gray-500 font-normal">Choose maximum budget for more experienced teachers</span>
          </Label>
          <Slider
            value={hourlyRate}
            onValueChange={setHourlyRate}
            max={2000}
            min={250}
            step={50}
            className="mt-2"
          />
          <input type="hidden" name="hourlyRate" value={hourlyRate[0]} />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹250</span>
            <span>₹2000</span>
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
