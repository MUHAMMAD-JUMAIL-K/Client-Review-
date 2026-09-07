import React from 'react';
import { CampaignData } from '../../types/campaign';
import { MapPin } from 'lucide-react';

export interface CustomerHeaderProps {
  campaign: CampaignData;
}

export const CustomerHeader: React.FC<CustomerHeaderProps> = ({ campaign }) => {
  return (
    <div className="text-center space-y-3 pb-2">
      {/* Business Logo or Fallback Avatar */}
      {campaign.logoUrl ? (
        <img
          src={campaign.logoUrl}
          alt={campaign.businessName}
          className="w-16 h-16 mx-auto rounded-2xl object-contain bg-white border border-slate-200/80 p-1.5 shadow-sm"
          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
        />
      ) : (
        <div
          className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-md"
          style={{ backgroundColor: campaign.brandColor || '#059669' }}
        >
          {campaign.businessName.substring(0, 2).toUpperCase()}
        </div>
      )}

      {/* Business Name & Location */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{campaign.businessName}</h1>
        {campaign.location && (
          <p className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{campaign.location}</span>
          </p>
        )}
      </div>

      {/* Welcome & Subtitle */}
      <div className="bg-slate-100/80 p-3.5 rounded-2xl border border-slate-200/60">
        <h2 className="text-sm sm:text-base font-bold text-slate-900">{campaign.welcomeMessage}</h2>
        {campaign.description && (
          <p className="text-xs text-slate-600 mt-0.5">{campaign.description}</p>
        )}
      </div>
    </div>
  );
};
