import LZString from 'lz-string';
import { CampaignData } from '../types/campaign';
import { sanitizeString, isValidHexColor, isValidPublicUrl } from './validation';

/**
  * Encodes a CampaignData object into a compact, URL-safe string.
  * Enforces maximum character limits and schema structure (version: 1).
  */
export function encodeCampaign(campaign: Omit<CampaignData, 'version'> & { version?: 1 }): string {
  // Sanitize fields before encoding
  const sanitizedCampaign: CampaignData = {
    version: 1,
    campaignId: campaign.campaignId || `cmp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    businessName: sanitizeString(campaign.businessName, 100),
    logoUrl: isValidPublicUrl(campaign.logoUrl) ? campaign.logoUrl?.trim() : undefined,
    location: campaign.location ? sanitizeString(campaign.location, 100) : undefined,
    googleMapsUrl: campaign.googleMapsUrl?.trim() || '',
    googleReviewUrl: campaign.googleReviewUrl?.trim() || undefined,
    googlePlaceId: campaign.googlePlaceId?.trim() || undefined,
    brandColor: isValidHexColor(campaign.brandColor) ? campaign.brandColor : '#059669',
    welcomeMessage: sanitizeString(campaign.welcomeMessage || 'How was your experience?', 150),
    description: campaign.description ? sanitizeString(campaign.description, 250) : undefined,
    thankYouMessage: sanitizeString(campaign.thankYouMessage || 'Thank you for sharing your experience.', 200),
    createdAt: campaign.createdAt || new Date().toISOString(),
  };

  const jsonString = JSON.stringify(sanitizedCampaign);
  
  // Compress to encoded URI component
  const encoded = LZString.compressToEncodedURIComponent(jsonString);
  return encoded;
}

/**
  * Generates full shareable URL for customer review page
  */
export function generateCampaignUrl(encodedData: string, origin?: string): string {
  const base = origin || (typeof window !== 'undefined' ? window.location.origin : 'https://revora.app');
  return `${base}/r/?data=${encodedData}`;
}
