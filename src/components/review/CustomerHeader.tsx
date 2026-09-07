import React, { useState } from 'react';
import { CampaignData } from '../../types/campaign';
import { MapPin, User } from 'lucide-react';
import alphaTechLogo from '../../assets/alpha-tech-logo.png';

export interface CustomerHeaderProps {
  campaign: CampaignData;
}

export const CustomerHeader: React.FC<CustomerHeaderProps> = ({ campaign }) => {
  const [imgError, setImgError] = useState(false);

  // Check if business is Alpha Tech or if custom logo is missing/broken
  const isAlphaTech = campaign.businessName?.toLowerCase().includes('alpha tech');
  const logoSrc = (isAlphaTech || !campaign.logoUrl || imgError) ? alphaTechLogo : campaign.logoUrl;

  const hasClientInfo = Boolean(campaign.clientName || campaign.clientCompany);

  return (
    <div className="text-center space-y-4 pb-2">
      {/* Business Logo Header with Glow & Accent Border */}
      <div className="relative inline-block group">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#0D333C]/20 via-[#C9A84E]/30 to-[#0D333C]/20 blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
        <div className="relative w-20 h-20 sm:w-22 sm:h-22 mx-auto rounded-2xl bg-[#0D333C] p-2 shadow-xl shadow-[#0D333C]/25 flex items-center justify-center border-2 border-[#C9A84E]/50 overflow-hidden">
          <img
            src={logoSrc}
            alt={campaign.businessName}
            className="w-full h-full object-contain rounded-xl"
            onError={() => setImgError(true)}
          />
        </div>
      </div>

      {/* Business Name & Location */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {campaign.businessName}
        </h1>
        {campaign.location && (
          <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center justify-center gap-1.5 pt-0.5">
            <MapPin className="w-3.5 h-3.5 text-[#0D333C]/70 shrink-0" />
            <span className="truncate">{campaign.location}</span>
          </p>
        )}
      </div>

      {/* Personalized Client Badge */}
      {hasClientInfo && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0D333C]/8 via-[#C9A84E]/15 to-[#0D333C]/8 border border-[#0D333C]/20 text-[#0D333C] text-xs font-semibold shadow-xs">
          <User className="w-3.5 h-3.5 text-[#0D333C]" />
          <span>
            Prepared for: <strong className="font-extrabold text-slate-900">{campaign.clientName || 'Valued Client'}</strong>
            {campaign.clientCompany ? ` • ${campaign.clientCompany}` : ''}
          </span>
        </div>
      )}

      {/* Welcome & Subtitle Box */}
      <div className="relative bg-gradient-to-b from-white to-slate-50/90 p-5 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/40 text-left sm:text-center space-y-1.5 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#0D333C] to-[#C9A84E]" />
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug pl-2 sm:pl-0">
          {campaign.welcomeMessage}
        </h2>
        {campaign.description && (
          <p className="text-xs sm:text-sm text-slate-600 pl-2 sm:pl-0 leading-relaxed">
            {campaign.description}
          </p>
        )}
      </div>
    </div>
  );
};
