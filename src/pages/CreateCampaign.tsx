import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UrlForm } from '../components/campaign/UrlForm';
import { BrandingForm } from '../components/campaign/BrandingForm';
import { Card } from '../components/ui/Card';
import { encodeCampaign } from '../utils/encodeCampaign';
import { CampaignData } from '../types/campaign';
import { Check, Sparkles } from 'lucide-react';

export const CreateCampaign: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [googleReviewUrl, setGoogleReviewUrl] = useState<string | undefined>();
  const [googlePlaceId, setGooglePlaceId] = useState<string | undefined>();

  const handleUrlSubmit = (url: string, reviewUrl?: string, placeId?: string) => {
    setGoogleMapsUrl(url);
    setGoogleReviewUrl(reviewUrl);
    setGooglePlaceId(placeId);
    setStep(2);
  };

  const handleBrandingSubmit = (branding: {
    businessName: string;
    logoUrl?: string;
    location?: string;
    brandColor: string;
    welcomeMessage: string;
    description?: string;
    thankYouMessage: string;
  }) => {
    const campaignId = `cmp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    
    const newCampaign: CampaignData = {
      version: 1,
      campaignId,
      businessName: branding.businessName,
      logoUrl: branding.logoUrl,
      location: branding.location,
      googleMapsUrl,
      googleReviewUrl,
      googlePlaceId,
      brandColor: branding.brandColor,
      welcomeMessage: branding.welcomeMessage,
      description: branding.description,
      thankYouMessage: branding.thankYouMessage,
      createdAt: new Date().toISOString(),
    };

    // Encode into URL parameters
    const encoded = encodeCampaign(newCampaign);

    // Redirect to share page with encoded data state
    navigate('/share', { state: { campaign: newCampaign, encodedData: encoded } });
  };

  return (
    <div className="min-h-[85vh] py-12 bg-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Wizard Header & Progress Bar */}
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">Review Link Generator</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Create your shareable review link
          </h1>
          <p className="text-sm text-slate-600">
            Connect your Google listing and customize your customer review experience.
          </p>
        </div>

        {/* 3-Step Wizard Progress */}
        <div className="flex items-center justify-center gap-2 sm:gap-6 text-xs font-bold text-slate-500">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-emerald-700 font-extrabold' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
              step > 1 ? 'bg-emerald-600 text-white' : step === 1 ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' : 'bg-slate-200 text-slate-600'
            }`}>
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span>01 Business Link</span>
          </div>

          <div className="w-8 h-0.5 bg-slate-300" />

          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-emerald-700 font-extrabold' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
              step === 2 ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' : 'bg-slate-200 text-slate-600'
            }`}>
              2
            </div>
            <span>02 Customize</span>
          </div>

          <div className="w-8 h-0.5 bg-slate-300" />

          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">
              3
            </div>
            <span>03 Share</span>
          </div>
        </div>

        {/* Step Card with Sharp Contrast */}
        <Card className="bg-white border border-slate-200/90 shadow-xl shadow-slate-300/40 p-6 sm:p-8 rounded-3xl">
          {step === 1 ? (
            <UrlForm
              initialUrl={googleMapsUrl}
              initialReviewUrl={googleReviewUrl}
              initialPlaceId={googlePlaceId}
              onSubmit={handleUrlSubmit}
            />
          ) : (
            <BrandingForm
              initialValues={{
                businessName: '',
                logoUrl: '',
                location: '',
                brandColor: '#059669',
                welcomeMessage: 'How was your experience?',
                description: 'Your honest feedback matters.',
                thankYouMessage: 'Thank you for sharing your experience.',
              }}
              onBack={() => setStep(1)}
              onSubmit={handleBrandingSubmit}
            />
          )}
        </Card>
      </div>
    </div>
  );
};
