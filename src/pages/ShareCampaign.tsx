import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { ShareHub } from '../components/campaign/ShareHub';
import { CampaignData } from '../types/campaign';

export const ShareCampaign: React.FC = () => {
  const location = useLocation();
  const state = location.state as { campaign?: CampaignData; encodedData?: string } | null;

  const campaign = state?.campaign;
  const encodedData = state?.encodedData;

  if (!campaign || !encodedData) {
    return <Navigate to="/create" replace />;
  }

  return (
    <div className="min-h-[85vh] py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShareHub campaign={campaign} encodedData={encodedData} />
      </div>
    </div>
  );
};
