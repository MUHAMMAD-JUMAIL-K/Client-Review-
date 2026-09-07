import React, { useState } from 'react';
import { StarRating as StarRatingType } from '../../types/review';
import { Star } from 'lucide-react';

export interface StarRatingProps {
  selectedRating: StarRatingType | null;
  onRatingSelect: (rating: StarRatingType) => void;
  brandColor?: string;
}

export const RATING_MESSAGES: Record<StarRatingType, string> = {
  1: "We're sorry your experience wasn't what you expected.",
  2: "Thanks for sharing. We'd love to understand your experience.",
  3: "Thanks for your feedback.",
  4: "Glad to hear you had a good experience.",
  5: "Wonderful! Thank you for sharing.",
};

export const StarRating: React.FC<StarRatingProps> = ({
  selectedRating,
  onRatingSelect,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const activeRating = hoverRating !== null ? hoverRating : (selectedRating || 0);

  const LABELS: Record<number, string> = {
    1: '1 Star — Poor',
    2: '2 Stars — Fair',
    3: '3 Stars — Good',
    4: '4 Stars — Very Good',
    5: '5 Stars — Exceptional!',
  };

  return (
    <div className="space-y-4 text-center">
      <fieldset className="border-0 p-0 m-0">
        <legend className="sr-only">Select star rating from 1 to 5 stars</legend>
        
        <div className="flex items-center justify-center gap-1 sm:gap-2.5 py-2 w-full max-w-full overflow-hidden">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= activeRating;
            const isSelected = selectedRating === star;
            return (
              <label
                key={star}
                className="relative cursor-pointer group p-0.5 sm:p-1 transition-all duration-200 active:scale-95 shrink-0"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
              >
                <input
                  type="radio"
                  name="star-rating"
                  value={star}
                  checked={isSelected}
                  onChange={() => onRatingSelect(star as StarRatingType)}
                  className="sr-only focus:outline-none"
                />
                <div
                  className={`w-10 h-10 min-[360px]:w-12 min-[360px]:h-12 sm:w-15 sm:h-15 flex items-center justify-center rounded-xl min-[360px]:rounded-2xl border-2 transition-all duration-300 ${
                    isFilled
                      ? 'bg-gradient-to-b from-amber-500/10 to-amber-400/20 border-amber-400 shadow-md shadow-amber-400/20 scale-105'
                      : 'bg-white/80 border-slate-200/90 hover:border-amber-300 hover:bg-amber-50/30 hover:scale-105 shadow-xs'
                  }`}
                >
                  <Star
                    className={`w-5 h-5 min-[360px]:w-6 min-[360px]:h-6 sm:w-9 sm:h-9 transition-all duration-200 ${
                      isFilled
                        ? 'fill-amber-400 text-amber-500 drop-shadow-sm scale-110'
                        : 'fill-slate-100 text-slate-300 group-hover:text-amber-300'
                    }`}
                  />
                </div>
                <span className="sr-only">{star} Star{star > 1 ? 's' : ''}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Dynamic Feedback Message */}
      <div className="min-h-[40px] flex items-center justify-center">
        {activeRating > 0 ? (
          <div className="animate-fadeIn px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-amber-500/10 border border-amber-300/80 text-xs sm:text-sm font-extrabold text-amber-900 shadow-xs flex flex-col sm:flex-row items-center gap-1 sm:gap-2 leading-snug">
            <span>{LABELS[activeRating]}</span>
            {selectedRating && (
              <span className="text-amber-800 font-medium text-[11px] sm:text-xs">
                <span className="hidden sm:inline">• </span>
                {RATING_MESSAGES[selectedRating]}
              </span>
            )}
          </div>
        ) : (
          <p className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wide uppercase">
            Tap stars above to rate your experience (1–5 stars)
          </p>
        )}
      </div>
    </div>
  );
};
