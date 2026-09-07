import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { googleService } from '../../services/googleService';
import { MapPin, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

export interface UrlFormProps {
  initialUrl: string;
  initialReviewUrl?: string;
  initialPlaceId?: string;
  onSubmit: (url: string, reviewUrl?: string, placeId?: string) => void;
}

export const UrlForm: React.FC<UrlFormProps> = ({
  initialUrl,
  initialReviewUrl = '',
  initialPlaceId = '',
  onSubmit,
}) => {
  const [googleUrl, setGoogleUrl] = useState(initialUrl);
  const [reviewUrl, setReviewUrl] = useState(initialReviewUrl);
  const [placeId, setPlaceId] = useState(initialPlaceId);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleUrl.trim()) {
      setError('Please enter a Google Maps or Google Review URL.');
      return;
    }

    const validation = googleService.validateUrl(googleUrl);
    if (!validation.isValid) {
      setError(validation.errorMessage || 'Invalid Google Maps URL. Please check and try again.');
      return;
    }

    setError('');
    onSubmit(validation.normalizedUrl, reviewUrl.trim() || undefined, placeId.trim() || validation.placeId);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900">01 Connect Google Review Page</h3>
        <p className="text-sm text-slate-600">
          Paste your official Google Maps listing link or direct Google review URL.
        </p>
      </div>

      <Input
        label="Google Maps or Review Link"
        placeholder="https://www.google.com/maps/place/... or https://g.page/..."
        value={googleUrl}
        onChange={(e) => {
          setGoogleUrl(e.target.value);
          if (error) setError('');
        }}
        error={error}
        leftIcon={<MapPin className="w-4 h-4" />}
        helperText="Supported formats: maps.google.com, google.com/maps/place, search.google.com/local/writereview, or g.page shortcuts."
      />

      {/* Advanced Optional Manual Fields */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
        >
          {showAdvanced ? '− Hide Advanced Destination Settings' : '+ Show Advanced Direct Review URL & Place ID Options'}
        </button>

        {showAdvanced && (
          <div className="mt-3 p-4 bg-stone-100/70 border border-slate-200/80 rounded-2xl space-y-4 text-xs animate-fadeIn">
            <Input
              label="Direct Google Write-Review URL (Optional)"
              placeholder="https://search.google.com/local/writereview?placeid=..."
              value={reviewUrl}
              onChange={(e) => setReviewUrl(e.target.value)}
              helperText="If specified, customers will be redirected directly to this official Google write-review page."
            />
            <Input
              label="Google Place ID (Optional)"
              placeholder="e.g. ChIJN1t_tDeuEmsRUsoyG83frY4"
              value={placeId}
              onChange={(e) => setPlaceId(e.target.value)}
              helperText="Your 27-character unique Google Business identifier."
            />
          </div>
        )}
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
          Continue to Business Info
        </Button>
      </div>
    </form>
  );
};
