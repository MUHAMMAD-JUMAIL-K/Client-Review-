import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Building2, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

export interface BrandingFormProps {
  initialValues: {
    businessName: string;
    logoUrl?: string;
    location?: string;
    brandColor: string;
    welcomeMessage: string;
    description?: string;
    thankYouMessage: string;
  };
  onBack: () => void;
  onSubmit: (values: {
    businessName: string;
    logoUrl?: string;
    location?: string;
    brandColor: string;
    welcomeMessage: string;
    description?: string;
    thankYouMessage: string;
  }) => void;
}

export const BrandingForm: React.FC<BrandingFormProps> = ({
  initialValues,
  onBack,
  onSubmit,
}) => {
  const [businessName, setBusinessName] = useState(initialValues.businessName);
  const [location, setLocation] = useState(initialValues.location || '');
  const [brandColor] = useState(initialValues.brandColor || '#059669');
  const [welcomeMessage, setWelcomeMessage] = useState(
    initialValues.welcomeMessage || 'How was your experience?'
  );
  const [description, setDescription] = useState(
    initialValues.description || 'Your honest feedback matters.'
  );
  const [thankYouMessage, setThankYouMessage] = useState(
    initialValues.thankYouMessage || 'Thank you for sharing your experience.'
  );
  const [errors, setErrors] = useState<{ businessName?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      setErrors({ businessName: 'Business name is required.' });
      return;
    }

    setErrors({});
    onSubmit({
      businessName: businessName.trim(),
      logoUrl: undefined,
      location: location.trim() || undefined,
      brandColor,
      welcomeMessage: welcomeMessage.trim() || 'How was your experience?',
      description: description.trim() || undefined,
      thankYouMessage: thankYouMessage.trim() || 'Thank you for sharing your experience.',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900">02 Customize Business Info & Branding</h3>
        <p className="text-sm text-slate-600">
          Personalize the review page header, business details, and welcome messages for your customers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Business Name *"
          placeholder="e.g. Apex Web Studio"
          value={businessName}
          onChange={(e) => {
            setBusinessName(e.target.value);
            if (errors.businessName) setErrors({});
          }}
          error={errors.businessName}
          leftIcon={<Building2 className="w-4 h-4" />}
        />

        <Input
          label="City / Location (Optional)"
          placeholder="e.g. San Francisco, CA"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          leftIcon={<MapPin className="w-4 h-4" />}
        />
      </div>

      {/* Custom Messaging */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        <Input
          label="Header Welcome Message"
          placeholder="How was your experience?"
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
        />

        <Input
          label="Subtitle / Sub-text"
          placeholder="Your honest feedback matters to us."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          label="Thank You Message (Shown after submission)"
          placeholder="Thank you for sharing your experience."
          value={thankYouMessage}
          onChange={(e) => setThankYouMessage(e.target.value)}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-100">
        <Button type="button" variant="ghost" onClick={onBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back
        </Button>
        <Button type="submit" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
          Generate Shareable Link
        </Button>
      </div>
    </form>
  );
};
