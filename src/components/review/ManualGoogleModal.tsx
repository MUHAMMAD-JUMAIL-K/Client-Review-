import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { shareService } from '../../services/shareService';
import { googleService } from '../../services/googleService';
import { Copy, Check, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface ManualGoogleModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewText: string;
  destinationUrl: string;
  selectedStars: number;
  businessName: string;
}

export const ManualGoogleModal: React.FC<ManualGoogleModalProps> = ({
  isOpen,
  onClose,
  reviewText,
  destinationUrl,
  selectedStars,
  businessName,
}) => {
  const [copied, setCopied] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);

  const handleCopyAndContinue = async () => {
    // 1. Copy text to clipboard
    const success = await shareService.copyToClipboard(reviewText);
    if (success) {
      setCopied(true);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    }

    // 2. Open Google Review destination in new tab
    const opened = googleService.openGoogleReview(destinationUrl);
    if (!opened) {
      setPopupBlocked(true);
    }
  };

  const handleManualOpenGoogle = () => {
    window.open(destinationUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Final Step: Manual Google Submission"
      maxWidth="md"
    >
      <div className="space-y-6 text-center">
        {/* Status Badge */}
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>

        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Your Review is Ready!</h3>
          <p className="text-xs text-slate-600 mt-1">
            Follow the 3 simple steps below to post your review on Google.
          </p>
        </div>

        {/* 3 Step Instructions */}
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

          <div className="flex items-start gap-3 pt-2 border-t border-slate-200/60">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <p className="font-bold text-slate-900">Manually select your stars on Google</p>
              <p className="text-slate-500">
                Google will open in a new tab. Tap <strong>{selectedStars} Star{selectedStars > 1 ? 's' : ''}</strong> on Google.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2 border-t border-slate-200/60">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <p className="font-bold text-slate-900">Paste your review and submit</p>
              <p className="text-slate-500">Paste into Google's review box and tap "Post".</p>
            </div>
          </div>
        </div>

        {/* Review Snippet Preview */}
        <div className="p-3 bg-slate-100 rounded-xl text-left border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Copied Text:</span>
          <p className="text-xs text-slate-800 font-mono line-clamp-3">{reviewText}</p>
        </div>

        {/* Popup Blocked Fallback */}
        {popupBlocked && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 text-left flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Google couldn't be opened automatically.</p>
              <p className="mt-0.5 text-amber-800">Your browser blocked the popup. Click the button below to open Google manually.</p>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="space-y-2 pt-2">
          {!popupBlocked ? (
            <Button
              size="lg"
              className="w-full text-base shadow-md shadow-emerald-600/20"
              onClick={handleCopyAndContinue}
              rightIcon={<ExternalLink className="w-4 h-4" />}
            >
              Continue to Google →
            </Button>
          ) : (
            <Button
              size="lg"
              className="w-full text-base"
              onClick={handleManualOpenGoogle}
              rightIcon={<ExternalLink className="w-4 h-4" />}
            >
              Open Google Review Page
            </Button>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Alpha Tech Portal never automates or submits Google reviews for you.</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
