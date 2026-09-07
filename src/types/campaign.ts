export interface CampaignData {
  version: 1;
  campaignId: string;
  businessName: string;
  logoUrl?: string;
  location?: string;
  clientName?: string;
  clientCompany?: string;
  projectNotes?: string;
  googleMapsUrl: string;
  googleReviewUrl?: string;
  googlePlaceId?: string;
  brandColor: string; // Hex color string, e.g. '#059669'
  welcomeMessage: string;
  description?: string;
  thankYouMessage: string;
  createdAt: string; // ISO string
}

export type ColorPreset = {
  name: string;
  hex: string;
  swatches: string[];
  primaryClass: string;
  borderClass: string;
};
