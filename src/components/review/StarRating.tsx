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

  return (
    <div className="space-y-4 text-center">
      <fieldset className="border-0 p-0 m-0">
        <legend className="sr-only">Select star rating from 1 to 5 stars</legend>
        
        <div className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 py-2 max-w-full overflow-hidden">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= activeRating;
            return (
              <label
                key={star}
                className="relative cursor-pointer group p-0.5 sm:p-1 transition-transform active:scale-90 shrink-0"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
              >
                <input
                  type="radio"
                  name="star-rating"
                  value={star}
                  checked={selectedRating === star}
                  onChange={() => onRatingSelect(star as StarRatingType)}
                  className="sr-only focus:outline-none"
                />
                <div className="w-10 h-10 min-[360px]:w-11 min-[360px]:h-11 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl min-[360px]:rounded-2xl bg-white border border-slate-200/80 shadow-sm group-hover:border-amber-300 group-hover:shadow-md transition-all">
                  <Star
                    className={`w-6 h-6 min-[360px]:w-7 min-[360px]:h-7 sm:w-9 sm:h-9 transition-colors duration-150 ${
                      isFilled
                        ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                        : 'fill-slate-100 text-slate-300'
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
      {selectedRating ? (
        <div className="animate-fadeIn p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs font-semibold text-amber-900">
          {RATING_MESSAGES[selectedRating]}
        </div>
      ) : (
        <p className="text-xs font-medium text-slate-500">
          Tap stars above to rate your experience (1–5 stars)
        </p>
      )}
    </div>
  );
};
