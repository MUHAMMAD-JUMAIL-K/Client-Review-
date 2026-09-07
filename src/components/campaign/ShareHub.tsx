import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CampaignData } from '../../types/campaign';
import { generateCampaignUrl } from '../../utils/encodeCampaign';
import { shareService } from '../../services/shareService';
import { QRCodeGenerator } from './QRCodeGenerator';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Copy, Check, Share2, ExternalLink, MessageCircle, Mail, PlusCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface ShareHubProps {
  campaign: CampaignData;
  encodedData: string;
}

export const ShareHub: React.FC<ShareHubProps> = ({ campaign, encodedData }) => {
  const [copied, setCopied] = useState(false);
  const campaignUrl = generateCampaignUrl(encodedData);

  const handleCopyLink = async () => {
    const success = await shareService.copyToClipboard(campaignUrl);
    if (success) {
      setCopied(true);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    const shared = await shareService.nativeShare({
      title: `Review Link for ${campaign.businessName}`,
      text: `Share your experience with ${campaign.businessName}:`,
      url: campaignUrl,
    });

    if (!shared) {
      // Fallback copy if share failed/cancelled
      handleCopyLink();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Your Review Link is Ready!</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">{campaign.businessName}</h2>
        <p className="text-sm text-slate-600">
          Share this unique link or QR code with your customers to collect genuine Google reviews.
        </p>
      </div>

      {/* Main Link Box */}
      <Card className="space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
          Shareable Review Link
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            readOnly
            value={campaignUrl}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono text-slate-700 focus:outline-none select-all"
          />
          <div className="flex gap-2 w-full sm:w-auto shrink-0">
            <Button
              onClick={handleCopyLink}
              leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
            {shareService.canNativeShare() && (
              <Button
                variant="secondary"
                onClick={handleNativeShare}
                leftIcon={<Share2 className="w-4 h-4" />}
              >
                Share
              </Button>
            )}
          </div>
        </div>

        {/* Quick Social & Email Share Links */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100">
          <span className="text-slate-500 font-medium">Quick options:</span>
          <div className="flex items-center gap-3">
            <a
              href={shareService.getWhatsAppShareUrl(campaignUrl, `Review ${campaign.businessName}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold hover:underline"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>WhatsApp</span>
            </a>
            <a
              href={shareService.getEmailShareUrl(campaignUrl, campaign.businessName)}
              className="inline-flex items-center gap-1.5 text-slate-600 font-semibold hover:underline"
            >
              <Mail className="w-4 h-4 text-slate-500" />
              <span>Email</span>
            </a>
            <a
              href={campaignUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-900 font-semibold hover:underline"
            >
              <ExternalLink className="w-4 h-4 text-slate-700" />
              <span>Open Customer Preview</span>
            </a>
          </div>
        </div>
      </Card>

      {/* QR Code Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 text-center">Customer QR Code</h3>
        <QRCodeGenerator
          url={campaignUrl}
          businessName={campaign.businessName}
          logoUrl={campaign.logoUrl}
          brandColor={campaign.brandColor}
        />
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 flex justify-center border-t border-slate-200">
        <Link to="/create" className="w-full sm:w-auto">
          <Button variant="outline" leftIcon={<PlusCircle className="w-4 h-4" />} className="w-full sm:w-auto">
            Create Another Review Link
          </Button>
        </Link>
      </div>
    </div>
  );
};
