
import React from "react";
import { cn } from "@/lib/utils";

interface StepWizardProps {
  steps: { title: string; content: React.ReactNode }[];
  current: number;
  goNext: () => void;
  goBack: () => void;
  canNext: boolean;
  showBack: boolean;
  stepError?: string;
  onSubmit?: () => void;
  nextLabel?: string;
  finishLabel?: string;
}

export default function StepWizard({
  steps,
  current,
  goNext,
  goBack,
  canNext,
  showBack,
  stepError,
  onSubmit,
  nextLabel = "Next",
  finishLabel = "Finish",
}: StepWizardProps) {
  // Animating slide-in (left/right) for step changes.
  // The current step stays in view, animates out, next animates in.
  return (
    <div>
      {/* Stepper */}
      <div className="flex justify-between items-center mb-8 px-1">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className={cn(
              "rounded-full h-9 w-9 flex items-center justify-center border-2",
              i < current ? "border-primary bg-primary/20" :
              i === current ? "border-primary bg-white" : "border-gray-200 bg-gray-50",
              i <= current ? "text-primary font-bold" : "text-gray-400"
            )}>
              {i + 1}
            </div>
            <span className={cn(
              "mt-2 text-xs sm:text-sm text-center",
              i === current ? "text-primary" : "text-gray-400"
            )}>{step.title}</span>
          </div>
        ))}
      </div>

      <div className="relative min-h-[320px]">
        <div className="transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
              display: 'flex',
              width: `${steps.length * 100}%`
            }}>
          {steps.map((step, i) => (
            <div key={i} className="w-full flex-shrink-0 px-1">
              <div className={cn(
                "animate-fade-in",
                i === current ? "" : "hidden"
              )}>
                {step.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      {stepError && (
        <div className="text-red-600 text-sm mt-6 mb-2">{stepError}</div>
      )}
      <div className="flex items-center justify-between mt-10 gap-5">
        {showBack && (
          <button type="button" onClick={goBack} className="px-6 py-3 rounded-lg bg-muted/60 text-gray-700 font-semibold shadow-sm hover:bg-muted transition min-w-[110px]">
            Back
          </button>
        )}
        <div className="flex-1" />
        <button
          type="button"
          onClick={current === steps.length - 1 && onSubmit ? onSubmit : goNext}
          disabled={!canNext}
          className={cn(
            "px-8 py-3 rounded-lg bg-primary text-white font-bold text-lg shadow transition min-w-[120px]",
            canNext ? "hover:bg-primary/90" : "bg-primary/40 cursor-not-allowed"
          )}
        >
          {current === steps.length - 1 ? finishLabel : nextLabel}
        </button>
      </div>
    </div>
  );
}
