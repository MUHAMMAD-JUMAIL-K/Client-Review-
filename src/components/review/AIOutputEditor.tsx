import React, { useState } from 'react';
import { ReviewTone, ReviewLength } from '../../types/review';
import { Button } from '../ui/Button';
import { Sparkles, RefreshCw, Check, Undo, Edit3, AlertCircle } from 'lucide-react';

export interface AIOutputEditorProps {
  originalText: string;
  improvedText: string;
  isLoading: boolean;
  error?: string;
  currentTone: ReviewTone;
  currentLength: ReviewLength;
  onToneChange: (tone: ReviewTone) => void;
  onLengthChange: (length: ReviewLength) => void;
  onRegenerate: () => void;
  onAccept: (finalReview: string) => void;
  onUseOriginal: () => void;
  brandColor?: string;
}

export const AIOutputEditor: React.FC<AIOutputEditorProps> = ({
  originalText,
  improvedText,
  isLoading,
  error,
  currentTone,
  currentLength,
  onToneChange,
  onLengthChange,
  onRegenerate,
  onAccept,
  onUseOriginal,
  brandColor,
}) => {
  const [editedText, setEditedText] = useState(improvedText);

  // Sync editedText when improvedText prop updates
  React.useEffect(() => {
    setEditedText(improvedText);
  }, [improvedText]);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Your Improved Review</span>
        </h3>
        <span className="text-[11px] font-medium text-slate-400">Customer editable</span>
      </div>

      {/* Error state fallback */}
      {error ? (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-3 text-left">
          <div className="flex items-center gap-2 text-rose-700 text-xs font-bold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Couldn't improve the review right now.</span>
          </div>
          <p className="text-xs text-rose-600 leading-relaxed">{error}</p>
          <div className="flex gap-2 pt-1">
            <Button size="sm" onClick={onRegenerate} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
              Try Again
            </Button>
            <Button size="sm" variant="outline" onClick={onUseOriginal}>
              Use Original Text
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Tone & Length Controls */}
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2.5">
            {/* Tone Selector */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">Tone:</span>
              <div className="flex gap-1">
                {(['Natural', 'Friendly', 'Professional'] as const).map((t) => (
                  <button
                    key={t}
                    disabled={isLoading}
                    onClick={() => onToneChange(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      currentTone === t
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Length Selector */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
              <span className="font-semibold text-slate-600">Length:</span>
              <div className="flex gap-1">
                {(['Short', 'Medium', 'Detailed'] as const).map((l) => (
                  <button
                    key={l}
                    disabled={isLoading}
                    onClick={() => onLengthChange(l)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      currentLength === l
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Editable Text Area */}
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-xs rounded-2xl z-10 flex items-center justify-center gap-2 text-xs font-bold text-emerald-700">
                <Sparkles className="w-5 h-5 animate-spin text-emerald-600" />
                <span>Improving your review...</span>
              </div>
            )}

            <textarea
              rows={5}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 leading-relaxed resize-none"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={onRegenerate}
                disabled={isLoading}
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Regenerate
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onUseOriginal}
                disabled={isLoading}
                leftIcon={<Undo className="w-3.5 h-3.5" />}
              >
                Use Original
              </Button>
            </div>

            <Button
              size="md"
              disabled={isLoading || !editedText.trim()}
              onClick={() => onAccept(editedText.trim())}
              leftIcon={<Check className="w-4 h-4 stroke-[3]" />}
              customColor={brandColor}
            >
              Use This Review
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
