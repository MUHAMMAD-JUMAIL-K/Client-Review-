import React, { useState } from 'react';
import { CampaignData } from '../../types/campaign';
import { encodeCampaign, generateCampaignUrl } from '../../utils/encodeCampaign';
import { shareService } from '../../services/shareService';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { QRCodeGenerator } from '../campaign/QRCodeGenerator';
import { Modal } from '../ui/Modal';
import { ExternalLink, Copy, Check, QrCode, CopyPlus, Trash2, MapPin, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import alphaTechLogo from '../../assets/alpha-tech-logo.png';

export interface CampaignCardProps {
  campaign: CampaignData;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onDuplicate,
  onDelete,
}) => {
  const [copied, setCopied] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [imgError, setImgError] = useState(false);

  const encodedData = encodeCampaign(campaign);
  const campaignUrl = generateCampaignUrl(encodedData);

  const handleCopyLink = async () => {
    const success = await shareService.copyToClipboard(campaignUrl);
    if (success) {
      setCopied(true);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedDate = new Date(campaign.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const isAlphaTech = campaign.businessName?.toLowerCase().includes('alpha tech');
  const cardLogoSrc = (isAlphaTech || !campaign.logoUrl || imgError) ? alphaTechLogo : campaign.logoUrl;

  return (
    <>
      <Card className="flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all group">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={cardLogoSrc}
                alt={campaign.businessName}
                className="w-10 h-10 rounded-xl object-contain bg-slate-50 border border-slate-200 p-1"
                onError={() => setImgError(true)}
              />
              <div>
                <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
                  {campaign.businessName}
                </h3>
                {campaign.location && (
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{campaign.location}</span>
                  </p>
                )}
                {(campaign.clientName || campaign.clientCompany) && (
                  <p className="text-[11px] font-medium text-[#0D333C] mt-0.5">
                    Client: {campaign.clientName || ''}{campaign.clientCompany ? ` (${campaign.clientCompany})` : ''}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Messages summary */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1">
            <p className="font-semibold text-slate-800 italic">"{campaign.welcomeMessage}"</p>
            <p className="text-slate-500 text-[11px] truncate">
              Google Destination: {campaign.googleMapsUrl}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-1.5">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyLink}
              leftIcon={copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copied ? 'Copied' : 'Copy Link'}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowQRModal(true)}
              leftIcon={<QrCode className="w-3.5 h-3.5" />}
            >
              QR Code
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <a href={campaignUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="ghost" title="Open Preview">
                <ExternalLink className="w-4 h-4 text-slate-600" />
              </Button>
            </a>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDuplicate(campaign.campaignId)}
              title="Duplicate Campaign"
            >
              <CopyPlus className="w-4 h-4 text-slate-600" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(campaign.campaignId)}
              title="Delete Campaign"
            >
              <Trash2 className="w-4 h-4 text-rose-500" />
            </Button>
          </div>
        </div>
      </Card>

      {/* QR Modal */}
      <Modal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        title={`QR Code for ${campaign.businessName}`}
        maxWidth="md"
      >
        <QRCodeGenerator
          url={campaignUrl}
          businessName={campaign.businessName}
          logoUrl={campaign.logoUrl}
          brandColor={campaign.brandColor}
        />
      </Modal>
    </>
  );
};
