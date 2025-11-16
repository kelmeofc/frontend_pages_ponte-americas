import React from 'react';
import { Check } from 'lucide-react';

export type FlowStep = 'identification' | 'payment';

interface StepIndicatorProps {
  currentStep: FlowStep;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => (
  <div className="w-full max-w-56 inline-flex justify-center items-center gap-2">
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full p-2 flex items-center justify-center ${currentStep === 'payment' ? 'bg-indigo-600 text-white' : 'bg-white shadow border-2 border-indigo-600'}`}>
          {currentStep === 'payment' ? <Check className="w-4 h-4" /> : <div className="w-full h-full bg-indigo-600 rounded-full" />}
        </div>
        <div className="text-indigo-600 text-xs mt-1">Identificação</div>
      </div>

      <div className="w-12 h-px bg-stone-300" />

      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full p-2 flex items-center justify-center ${currentStep === 'payment' ? 'bg-indigo-600 text-white' : 'bg-white shadow border-2 border-gray-300'}`}>
          <div className={`w-full h-full rounded-full ${currentStep === 'payment' ? 'bg-indigo-600' : 'bg-gray-400'}`} />
        </div>
        <div className={`text-xs mt-1 ${currentStep === 'payment' ? 'text-indigo-600' : 'text-gray-500'}`}>Pagamento</div>
      </div>
    </div>
  </div>
);
