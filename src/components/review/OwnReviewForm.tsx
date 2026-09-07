import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export interface OwnReviewFormProps {
  initialText?: string;
  onComplete: (text: string, wantsAIImprovement: boolean) => void;
  brandColor?: string;
}

export const OwnReviewForm: React.FC<OwnReviewFormProps> = ({
  initialText = '',
  onComplete,
  brandColor,
}) => {
  const [text, setText] = useState(initialText);
  const [showPromptChoice, setShowPromptChoice] = useState(false);

  const MAX_CHARS = 1000;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (!showPromptChoice) {
      setShowPromptChoice(true);
    }
  };

  return (
    <form onSubmit={handleContinue} className="space-y-4 animate-fadeIn">
      <div className="space-y-1">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
          Tell us about your experience
        </label>
        <div className="relative">
          <textarea
            rows={5}
            maxLength={MAX_CHARS}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (showPromptChoice) setShowPromptChoice(false);
            }}
            placeholder={`Which service did you use?\nWhat did you like about the project?\nHow was the team & delivery?\nWhat stood out to you?`}
            className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 pb-8 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all resize-none"
          />
          <div className="absolute bottom-2.5 right-3 text-[10px] sm:text-[11px] font-mono text-slate-400 pointer-events-none bg-white/90 px-1 py-0.5 rounded">
            {text.length}/{MAX_CHARS}
          </div>
        </div>
      </div>

      {!showPromptChoice ? (
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={!text.trim()}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          customColor={brandColor}
        >
          Continue
        </Button>
      ) : (
        <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-3 animate-fadeIn text-center">
          <p className="text-xs font-bold text-emerald-900 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Would you like help improving the wording?</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => onComplete(text.trim(), false)}
              leftIcon={<Check className="w-4 h-4" />}
            >
              Keep my wording
            </Button>
            <Button
              type="button"
              size="md"
              onClick={() => onComplete(text.trim(), true)}
              leftIcon={<Sparkles className="w-4 h-4" />}
              customColor={brandColor}
            >
              Improve my wording
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};
