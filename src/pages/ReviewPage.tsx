import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { decodeCampaign } from '../utils/decodeCampaign';
import { CampaignData } from '../types/campaign';
import { StarRating as StarRatingType, ReviewMethod, ReviewTone, ReviewLength, AIWizardAnswers, AIAction } from '../types/review';
import { googleService } from '../services/googleService';
import { reviewAssistant } from '../services/reviewAssistant';
import { shareService } from '../services/shareService';

import { CustomerHeader } from '../components/review/CustomerHeader';
import { StarRating } from '../components/review/StarRating';
import { MethodSelector } from '../components/review/MethodSelector';
import { OwnReviewForm } from '../components/review/OwnReviewForm';
import { AIReviewWizard } from '../components/review/AIReviewWizard';
import { AIOutputEditor } from '../components/review/AIOutputEditor';
import { PrivateFeedbackModal } from '../components/review/PrivateFeedbackModal';

import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Star, ShieldCheck, Copy, Check, ExternalLink, ArrowLeft, MessageSquare, AlertTriangle, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReviewPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dataParam = searchParams.get('data') || '';

  // Campaign State
  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [decodeError, setDecodeError] = useState<string | null>(null);

  // Customer Flow State
  const [rating, setRating] = useState<StarRatingType | null>(null);
  const [method, setMethod] = useState<ReviewMethod | null>(null);
  
  // Review Text Tracking
  const [rawText, setRawText] = useState<string>('');
  const [aiText, setAiText] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | undefined>();
  
  // AI Tone & Length Controls
  const [tone, setTone] = useState<ReviewTone>('Natural');
  const [length, setLength] = useState<ReviewLength>('Medium');

  // Step Controls: 'rating' | 'method' | 'writing' | 'ai_review' | 'final'
  const [step, setStep] = useState<'rating' | 'method' | 'writing' | 'ai_review' | 'final'>('rating');

  // Copy & Popup state
  const [copied, setCopied] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);

  // Modals
  const [showPrivateModal, setShowPrivateModal] = useState<boolean>(false);

  // Decode campaign link on mount
  useEffect(() => {
    if (!dataParam) {
      setDecodeError('No review campaign parameter found in link.');
      return;
    }
    const result = decodeCampaign(dataParam);
    if (result.success && result.campaign) {
      setCampaign(result.campaign);
    } else {
      setDecodeError(result.error || 'Invalid or corrupted campaign link.');
    }
  }, [dataParam]);

  // Handle Star Rating Selection
  const handleRatingSelect = (selected: StarRatingType) => {
    setRating(selected);
    if (step === 'rating') {
      setStep('method');
    }
  };

  const [wizardContext, setWizardContext] = useState<AIWizardAnswers | null>(null);

  // Handle AI Wording Improvement Request
  const runAIRewrite = async (
    textToImprove: string,
    currentTone: ReviewTone,
    currentLength: ReviewLength,
    action: AIAction = 'improve'
  ) => {
    setIsAiLoading(true);
    setAiError(undefined);
    setStep('ai_review');

    const result = await reviewAssistant.rewriteReview({
      review: textToImprove,
      rating: rating || undefined,
      service: wizardContext?.serviceUsed,
      liked: wizardContext?.likedExperience,
      teamQualities: wizardContext?.teamKeywords,
      followUp: wizardContext?.followUp,
      standout: wizardContext?.standoutDetails,
      recommendation: wizardContext?.recommend,
      additionalComments: wizardContext?.additionalNotes,
      tone: currentTone,
      length: currentLength,
      action: action,
      nonce: `${Date.now()}_${Math.random()}`,
    });

    setIsAiLoading(false);
    if (result.success && result.review) {
      setAiText(result.review);
    } else {
      setAiError(result.error || 'AI assistance is temporarily unavailable.');
      setAiText(textToImprove); // Fallback to raw text
    }
  };

  // Own Review Form completion
  const handleOwnReviewComplete = (text: string, wantsAI: boolean) => {
    setRawText(text);
    if (wantsAI) {
      runAIRewrite(text, tone, length);
    } else {
      setAiText(text);
      setStep('final');
    }
  };

  // AI Wizard Completion
  const handleWizardComplete = (answers: AIWizardAnswers, summaryText: string) => {
    setWizardContext(answers);
    setRawText(summaryText);
    runAIRewrite(summaryText, tone, length);
  };

  // Handle Tone Change in AI Editor
  const handleToneChange = (newTone: ReviewTone) => {
    setTone(newTone);
    const baseText = rawText || aiText;
    if (baseText) {
      runAIRewrite(baseText, newTone, length);
    }
  };

  // Handle Length Change in AI Editor
  const handleLengthChange = (newLength: ReviewLength) => {
    setLength(newLength);
    const baseText = rawText || aiText;
    if (baseText) {
      runAIRewrite(baseText, tone, newLength);
    }
  };

  // Handle Copy & Direct Open Google Review
  const handleCopyAndContinueToGoogle = async (destinationUrl: string) => {
    setHasSubmitted(true);
    const textToCopy = aiText || rawText;
    
    // 1. Copy text to clipboard
    const success = await shareService.copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      setTimeout(() => setCopied(false), 3000);
    }

    // 2. Open Google Review destination in new tab directly
    const opened = googleService.openGoogleReview(destinationUrl);
    if (!opened) {
      setPopupBlocked(true);
    }
  };

  // Error screen for invalid campaign URL
  if (decodeError || !campaign) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Review Link Issue</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {decodeError || 'This review campaign link could not be loaded.'}
          </p>
          <div className="pt-2">
            <Link to="/">
              <Button variant="outline" size="sm">Go to Alpha Tech Home</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const destinationUrl = googleService.getDestination(
    campaign.googleMapsUrl,
    campaign.googleReviewUrl,
    campaign.googlePlaceId
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/90 to-slate-100 py-6 sm:py-12 px-4 flex flex-col justify-between items-center relative overflow-hidden selection:bg-emerald-500 selection:text-white">
      {/* Ambient Background Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#0D333C]/12 via-[#164954]/8 to-[#C9A84E]/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Mobile-First Container (Max Width 480px) */}
      <div className="w-full max-w-[480px] space-y-6 my-auto relative z-10">
        {/* Customer Header */}
        <CustomerHeader campaign={campaign} />

        {/* Core Review Step Card */}
        <Card className="shadow-2xl shadow-slate-300/60 p-3.5 min-[380px]:p-5 sm:p-7 space-y-5 sm:space-y-6 relative overflow-hidden bg-white/95 backdrop-blur-md rounded-2xl min-[380px]:rounded-3xl border border-slate-200/90">
          {/* Back button if past initial step */}
          {step !== 'rating' && step !== 'final' && (
            <button
              onClick={() => {
                if (step === 'ai_review' || step === 'writing') setStep('method');
                else if (step === 'method') setStep('rating');
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}

          {/* STEP 1: Star Rating Selector */}
          <StarRating
            selectedRating={rating}
            onRatingSelect={handleRatingSelect}
            brandColor={campaign.brandColor}
          />

          {/* STEP 2: Method Selector */}
          {rating && (step === 'method' || step === 'writing' || step === 'ai_review' || step === 'final') && (
            <div className="pt-2 border-t border-slate-100">
              {step === 'method' && (
                <MethodSelector
                  selectedMethod={method}
                  onSelect={(m) => {
                    setMethod(m);
                    setStep('writing');
                  }}
                  brandColor={campaign.brandColor}
                />
              )}

              {/* STEP 3: Writing Form (Own or AI Wizard) */}
              {step === 'writing' && method === 'own' && (
                <OwnReviewForm
                  initialText={rawText}
                  onComplete={handleOwnReviewComplete}
                  brandColor={campaign.brandColor}
                />
              )}

              {step === 'writing' && method === 'ai_wizard' && (
                <AIReviewWizard
                  onComplete={handleWizardComplete}
                  brandColor={campaign.brandColor}
                />
              )}

              {/* STEP 4: AI Output & Enhancer Editor */}
              {step === 'ai_review' && (
                <AIOutputEditor
                  originalText={rawText}
                  improvedText={aiText}
                  isLoading={isAiLoading}
                  error={aiError}
                  currentTone={tone}
                  currentLength={length}
                  onToneChange={handleToneChange}
                  onLengthChange={handleLengthChange}
                  onRegenerate={() => {
                    const baseText = rawText || aiText;
                    runAIRewrite(baseText, tone, length, 'regenerate');
                  }}
                  onAccept={(finalText) => {
                    setAiText(finalText);
                    setStep('final');
                  }}
                  onUseOriginal={() => {
                    setAiText(rawText);
                    setStep('final');
                  }}
                  brandColor={campaign.brandColor}
                />
              )}

              {/* STEP 5: Final Review Ready Screen (Includes embedded 3 manual submission steps) */}
              {step === 'final' && (
                <div className="space-y-5 text-center animate-fadeIn pt-1">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>Your Review is Ready! ({rating} Star{rating > 1 ? 's' : ''})</span>
                  </div>

                  {/* Review Text Display Box */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-sm text-slate-800 leading-relaxed font-sans relative">
                    <p className="whitespace-pre-wrap">{aiText || rawText}</p>
                    <button
                      onClick={() => setStep('ai_review')}
                      className="mt-2 text-xs font-semibold text-emerald-600 hover:underline inline-block"
                    >
                      Edit wording again
                    </button>
                  </div>

                  {/* 3 Simple Manual Submission Steps embedded directly on finish screen */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-3 text-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        1
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Copy your review text</p>
                        <p className="text-slate-500">Your review will be copied automatically when you continue.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-2.5 border-t border-slate-200/60">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        2
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Manually select your stars on Google</p>
                        <p className="text-slate-500">
                          Google will open in a new tab. Tap <strong>{rating} Star{rating > 1 ? 's' : ''}</strong> on Google.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-2.5 border-t border-slate-200/60">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        3
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Paste your review and submit</p>
                        <p className="text-slate-500">Paste into Google's review box and tap "Post".</p>
                      </div>
                    </div>
                  </div>

                  {/* Popup Blocked Fallback Alert */}
                  {popupBlocked && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 text-left flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Google couldn't be opened automatically.</p>
                        <p className="mt-0.5 text-amber-800">Your browser blocked the popup. Click the button below to open Google manually.</p>
                      </div>
                    </div>
                  )}

                  {/* Copy & Continue CTA */}
                  <div className="space-y-2 pt-1">
                    <Button
                      size="lg"
                      className="w-full text-base shadow-md shadow-emerald-600/20"
                      onClick={() => handleCopyAndContinueToGoogle(destinationUrl)}
                      rightIcon={<ExternalLink className="w-4 h-4" />}
                      customColor={campaign.brandColor}
                    >
                      {copied ? '✓ Copied! Opening Google...' : 'Copy Review & Continue to Google →'}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setShowPrivateModal(true)}
                      className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1.5 mx-auto pt-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                      <span>Share additional private feedback to business</span>
                    </button>

                    {hasSubmitted && (
                      <div className="pt-2 border-t border-slate-100 mt-3 animate-fadeIn">
                        <Link
                          to="/"
                          className="inline-flex items-center justify-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 px-4 py-2.5 rounded-xl transition-all w-full shadow-xs"
                        >
                          <Home className="w-4 h-4 text-slate-600" />
                          <span>Go to Home Screen</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Footer Guarantee */}
        <div className="text-center space-y-1 text-[11px] text-slate-500 font-medium">
          <div className="flex items-center justify-center gap-1 text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Customer-controlled manual submission to Google</span>
          </div>
          <p>Powered by Alpha Tech Review Assistant</p>
        </div>
      </div>

      {/* Optional Private Feedback Modal */}
      <PrivateFeedbackModal
        isOpen={showPrivateModal}
        onClose={() => setShowPrivateModal(false)}
        businessName={campaign.businessName}
      />
    </div>
  );
};
