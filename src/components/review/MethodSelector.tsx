import React from 'react';
import { ReviewMethod } from '../../types/review';
import { Card } from '../ui/Card';
import { PenTool, Sparkles } from 'lucide-react';

export interface MethodSelectorProps {
  selectedMethod: ReviewMethod | null;
  onSelect: (method: ReviewMethod) => void;
  brandColor?: string;
}

export const MethodSelector: React.FC<MethodSelectorProps> = ({
  selectedMethod,
  onSelect,
}) => {
  return (
    <div className="space-y-4 animate-fadeIn">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 text-center">
        How would you like to write your review?
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Choice 1: Write My Own */}
        <button
          type="button"
          onClick={() => onSelect('own')}
          className="text-left w-full focus:outline-none"
        >
          <Card
            className={`h-full flex flex-col justify-between transition-all duration-200 cursor-pointer ${
              selectedMethod === 'own'
                ? 'border-2 border-[#0B2C33] bg-[#0B2C33]/5 shadow-md scale-[1.02]'
                : 'hover:border-slate-300 hover:bg-slate-50'
            }`}
            padding="sm"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <PenTool className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Write my own review</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Share your experience in your own words directly.
              </p>
            </div>
          </Card>
        </button>

        {/* Choice 2: Help Me Write It */}
        <button
          type="button"
          onClick={() => onSelect('ai_wizard')}
          className="text-left w-full focus:outline-none"
        >
          <Card
            className={`h-full flex flex-col justify-between transition-all duration-200 cursor-pointer ${
              selectedMethod === 'ai_wizard'
                ? 'border-2 border-[#0B2C33] bg-[#0B2C33]/5 shadow-md scale-[1.02]'
                : 'hover:border-slate-300 hover:bg-slate-50'
            }`}
            padding="sm"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#0B2C33]/10 flex items-center justify-center text-[#0B2C33]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Help me write it</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Answer a few quick questions and we'll help organize your thoughts.
              </p>
            </div>
          </Card>
        </button>
      </div>
    </div>
  );
};
