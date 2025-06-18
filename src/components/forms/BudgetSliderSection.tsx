
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface BudgetSliderSectionProps {
  onBudgetChange?: (budget: number) => void;
  defaultBudget?: number;
}

const BudgetSliderSection = ({ onBudgetChange, defaultBudget = 3000 }: BudgetSliderSectionProps) => {
  const [budget, setBudget] = useState([defaultBudget]);

  const handleBudgetChange = (value: number[]) => {
    setBudget(value);
    onBudgetChange?.(value[0]);
  };

  const formatBudget = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold">₹</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Budget Preference</h2>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200">
        <div className="space-y-6">
          <div className="text-center">
            <Label className="text-lg font-semibold text-gray-700 mb-2 block">
              Monthly Budget Range
            </Label>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {formatBudget(budget[0])}
            </div>
            <p className="text-sm text-gray-600">
              Set your preferred monthly budget for home tuition
            </p>
          </div>
          
          <div className="px-4">
            <Slider
              value={budget}
              onValueChange={handleBudgetChange}
              max={20000}
              min={2000}
              step={500}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>₹2,000</span>
              <span>₹20,000</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-sm text-gray-600">Minimum Budget</div>
              <div className="font-semibold text-green-600">₹2,000/month</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-sm text-gray-600">Your Selection</div>
              <div className="font-semibold text-green-600">{formatBudget(budget[0])}/month</div>
            </div>
          </div>
          
          <input
            type="hidden"
            name="monthlyFee"
            value={budget[0]}
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetSliderSection;
