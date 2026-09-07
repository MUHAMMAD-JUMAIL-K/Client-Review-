import { CampaignData } from '../types/campaign';
import { storageService } from './storageService';

const CAMPAIGNS_KEY = 'campaigns';

export const campaignService = {
  getAllCampaigns(): CampaignData[] {
    return storageService.get<CampaignData[]>(CAMPAIGNS_KEY, []);
  },

  getCampaignById(id: string): CampaignData | undefined {
    const campaigns = this.getAllCampaigns();
    return campaigns.find(c => c.campaignId === id);
  },

  saveCampaign(campaign: CampaignData): void {
    const campaigns = this.getAllCampaigns();
    const existingIndex = campaigns.findIndex(c => c.campaignId === campaign.campaignId);

    if (existingIndex >= 0) {
      campaigns[existingIndex] = campaign;
    } else {
      campaigns.unshift(campaign);
    }

    storageService.set(CAMPAIGNS_KEY, campaigns);
  },

  duplicateCampaign(id: string): CampaignData | undefined {
    const original = this.getCampaignById(id);
    if (!original) return undefined;

    const copy: CampaignData = {
      ...original,
      campaignId: `cmp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      businessName: `${original.businessName} (Copy)`,
      createdAt: new Date().toISOString(),
    };

    this.saveCampaign(copy);
    return copy;
  },

  deleteCampaign(id: string): void {
    const campaigns = this.getAllCampaigns().filter(c => c.campaignId !== id);
    storageService.set(CAMPAIGNS_KEY, campaigns);
  },

  clearAllCampaigns(): void {
    storageService.remove(CAMPAIGNS_KEY);
  }
};
