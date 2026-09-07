import React, { useState, useEffect } from 'react';
import { campaignService } from '../services/campaignService';
import { CampaignData } from '../types/campaign';
import { StorageWarning } from '../components/dashboard/StorageWarning';
import { CampaignList } from '../components/dashboard/CampaignList';
import { LayoutDashboard, QrCode, PlusCircle, Link2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);

  useEffect(() => {
    setCampaigns(campaignService.getAllCampaigns());
  }, []);

  const handleDuplicate = (id: string) => {
    campaignService.duplicateCampaign(id);
    setCampaigns(campaignService.getAllCampaigns());
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this campaign from local storage?')) {
      campaignService.deleteCampaign(id);
      setCampaigns(campaignService.getAllCampaigns());
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all locally stored campaigns?')) {
      campaignService.clearAllCampaigns();
      setCampaigns([]);
    }
  };

  return (
    <div className="min-h-[85vh] py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <LayoutDashboard className="w-8 h-8 text-emerald-600" />
              <span>Local Campaign Dashboard</span>
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Manage your generated review links and QR code displays.
            </p>
          </div>

          <Link to="/create">
            <Button size="lg" leftIcon={<PlusCircle className="w-5 h-5" />}>
              Create New Link
            </Button>
          </Link>
        </div>

        {/* Local Storage Warning */}
        <StorageWarning />

        {/* Overview Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Link2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900">{campaigns.length}</span>
              <p className="text-xs font-medium text-slate-500">Active Review Links</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900">{campaigns.length}</span>
              <p className="text-xs font-medium text-slate-500">Generated QR Codes</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900">Static</span>
              <p className="text-xs font-medium text-slate-500">Storage Mode</p>
            </div>
          </div>
        </div>

        {/* Campaign List */}
        <CampaignList
          campaigns={campaigns}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
          onClearAll={handleClearAll}
        />
      </div>
    </div>
  );
};
