import { parseGoogleMapsUrl, getReviewDestination } from '../utils/googleUrlParser';

export const googleService = {
  validateUrl(url: string) {
    return parseGoogleMapsUrl(url);
  },

  getDestination(googleMapsUrl: string, explicitReviewUrl?: string, explicitPlaceId?: string): string {
    return getReviewDestination(googleMapsUrl, explicitReviewUrl, explicitPlaceId);
  },

  openGoogleReview(destinationUrl: string): boolean {
    if (!destinationUrl) return false;
    
    try {
      const newTab = window.open(destinationUrl, '_blank', 'noopener,noreferrer');
      return !!newTab;
    } catch (e) {
      console.warn('Popup blocked or window.open failed:', e);
      return false;
    }
  }
};
