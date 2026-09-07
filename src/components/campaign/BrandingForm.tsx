import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Building2, MapPin, ArrowRight, ArrowLeft, User, Briefcase, FileText } from 'lucide-react';

export interface BrandingFormProps {
  initialValues: {
    businessName: string;
    logoUrl?: string;
    location?: string;
    clientName?: string;
    clientCompany?: string;
    projectNotes?: string;
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
    clientName?: string;
    clientCompany?: string;
    projectNotes?: string;
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
  const [businessName, setBusinessName] = useState(initialValues.businessName || 'Alpha Tech Business Solutions');
  const [location, setLocation] = useState(initialValues.location || 'Ambalavayal Sulthanbathery, Wayanad, Kerala');
  const [clientName, setClientName] = useState(initialValues.clientName || '');
  const [clientCompany, setClientCompany] = useState(initialValues.clientCompany || '');
  const [projectNotes, setProjectNotes] = useState(initialValues.projectNotes || '');
  const [brandColor, setBrandColor] = useState(initialValues.brandColor || '#0D333C');
  const [welcomeMessage, setWelcomeMessage] = useState(
    initialValues.welcomeMessage || 'How was your experience working with Alpha Tech Business Solutions?'
  );
  const [description, setDescription] = useState(
    initialValues.description || 'Your feedback helps us continuously elevate our IT software & enterprise solutions.'
  );
  const [thankYouMessage, setThankYouMessage] = useState(
    initialValues.thankYouMessage || 'Thank you for trusting Alpha Tech Business Solutions with your project!'
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
      clientName: clientName.trim() || undefined,
      clientCompany: clientCompany.trim() || undefined,
      projectNotes: projectNotes.trim() || undefined,
      brandColor,
      welcomeMessage: welcomeMessage.trim() || 'How was your experience working with Alpha Tech Business Solutions?',
      description: description.trim() || undefined,
      thankYouMessage: thankYouMessage.trim() || 'Thank you for trusting Alpha Tech Business Solutions with your project!',
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
          placeholder="e.g. Alpha Tech Business Solutions"
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
          placeholder="e.g. Ambalavayal Sulthanbathery, Wayanad, Kerala"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          leftIcon={<MapPin className="w-4 h-4" />}
        />
      </div>

      {/* Optional Client & Project Personalization */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Client & Project Personalization (Optional)</h4>
          <p className="text-xs text-slate-500">
            Add client & project details to personalize the review experience and AI assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Client Name (Optional)"
            placeholder="e.g. Rahul Sharma"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
          />

          <Input
            label="Client Company / Org (Optional)"
            placeholder="e.g. Apex Global Solutions"
            value={clientCompany}
            onChange={(e) => setClientCompany(e.target.value)}
            leftIcon={<Briefcase className="w-4 h-4" />}
          />
        </div>

        <Input
          label="Project / Service Notes (Optional)"
          placeholder="e.g. Custom Web Portal & Mobile App development completed in Q3 2026"
          value={projectNotes}
          onChange={(e) => setProjectNotes(e.target.value)}
          leftIcon={<FileText className="w-4 h-4" />}
          helperText="These details help AI tailor review suggestions specifically for this client project."
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
