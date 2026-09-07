import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CampaignData } from '../../types/campaign';
import { CampaignCard } from './CampaignCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { PlusCircle, Search, Trash2, LayoutGrid } from 'lucide-react';

export interface CampaignListProps {
  campaigns: CampaignData[];
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export const CampaignList: React.FC<CampaignListProps> = ({
  campaigns,
  onDuplicate,
  onDelete,
  onClearAll,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = campaigns.filter(c =>
    c.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.location && c.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-4 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <LayoutGrid className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-slate-900">No Campaigns Yet</h3>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            Create your first review link to generate shareable URLs and QR codes for your customers.
          </p>
        </div>
        <div className="pt-2">
          <Link to="/create">
            <Button size="lg" leftIcon={<PlusCircle className="w-5 h-5" />}>
              Create Review Link
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header controls & search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Button variant="ghost" size="sm" onClick={onClearAll} leftIcon={<Trash2 className="w-4 h-4 text-rose-500" />}>
            Clear Local Storage
          </Button>
          <Link to="/create">
            <Button size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
              New Campaign
            </Button>
          </Link>
        </div>
      </div>

      {/* Campaign cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.campaignId}
            campaign={campaign}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
          />
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <p className="text-center text-sm text-slate-500 py-8">
          No campaigns found matching "{searchQuery}".
        </p>
      )}
    </div>
  );
};
