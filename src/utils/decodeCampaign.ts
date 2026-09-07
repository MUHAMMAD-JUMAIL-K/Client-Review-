import LZString from 'lz-string';
import { CampaignData } from '../types/campaign';
import { sanitizeString, isValidHexColor, isValidPublicUrl } from './validation';

export interface DecodeCampaignResult {
  success: boolean;
  campaign?: CampaignData;
  error?: string;
}

/**
  * Decodes, parses, and strictly validates campaign data from URL-encoded parameter.
  * Prevents XSS, script injections, and handles versions.
  */
export function decodeCampaign(encodedData: string): DecodeCampaignResult {
  if (!encodedData || typeof encodedData !== 'string') {
    return { success: false, error: 'No campaign data provided.' };
  }

  try {
    // Attempt LZString decompression
    let jsonString = LZString.decompressFromEncodedURIComponent(encodedData);
    
    // Fallback: If raw Base64/URI encoded JSON was passed
    if (!jsonString) {
      try {
        jsonString = decodeURIComponent(atob(encodedData));
      } catch {
        jsonString = decodeURIComponent(encodedData);
      }
    }

    if (!jsonString) {
      return { success: false, error: 'Corrupt or unreadable campaign data.' };
    }

    const rawObj = JSON.parse(jsonString);

    if (!rawObj || typeof rawObj !== 'object') {
      return { success: false, error: 'Invalid campaign format.' };
    }

    // Check version
    const version = rawObj.version || 1;
    if (version > 1) {
      return { success: false, error: 'Campaign created with a newer version of REVORA.' };
    }

    // Validate required fields
    if (!rawObj.businessName || typeof rawObj.businessName !== 'string') {
      return { success: false, error: 'Missing business name in campaign data.' };
    }

    if (!rawObj.googleMapsUrl || typeof rawObj.googleMapsUrl !== 'string') {
      return { success: false, error: 'Missing Google destination URL in campaign data.' };
    }

    // Construct sanitized Campaign object
    const campaign: CampaignData = {
      version: 1,
      campaignId: rawObj.campaignId || `cmp_${Date.now()}`,
      businessName: sanitizeString(rawObj.businessName, 100),
      logoUrl: isValidPublicUrl(rawObj.logoUrl) ? rawObj.logoUrl : undefined,
      location: rawObj.location ? sanitizeString(rawObj.location, 100) : undefined,
      googleMapsUrl: rawObj.googleMapsUrl.trim(),
      googleReviewUrl: rawObj.googleReviewUrl ? rawObj.googleReviewUrl.trim() : undefined,
      googlePlaceId: rawObj.googlePlaceId ? rawObj.googlePlaceId.trim() : undefined,
      brandColor: isValidHexColor(rawObj.brandColor) ? rawObj.brandColor : '#059669',
      welcomeMessage: sanitizeString(rawObj.welcomeMessage || 'How was your experience?', 150),
      description: rawObj.description ? sanitizeString(rawObj.description, 250) : undefined,
      thankYouMessage: sanitizeString(rawObj.thankYouMessage || 'Thank you for sharing your experience.', 200),
      createdAt: rawObj.createdAt || new Date().toISOString(),
    };

    return { success: true, campaign };
  } catch (e) {
    return { success: false, error: 'Unable to decode campaign link.' };
  }
}
