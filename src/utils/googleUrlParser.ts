export interface ParsedGoogleUrl {
  isValid: boolean;
  type: 'direct_review' | 'maps_place' | 'search_location' | 'raw_url' | 'invalid';
  placeId?: string;
  normalizedUrl: string;
  reviewDestinationUrl: string;
  errorMessage?: string;
}

/**
  * Checks if the given URL string is a valid Google Maps or Google Review URL
  */
export function isGoogleMapsUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const cleanUrl = url.trim().toLowerCase();
  
  return (
    cleanUrl.includes('google.com/maps') ||
    cleanUrl.includes('maps.google.com') ||
    cleanUrl.includes('g.page') ||
    cleanUrl.includes('search.google.com/local/writereview') ||
    cleanUrl.includes('maps.app.goo.gl')
  );
}

/**
  * Extracts Place ID if present in standard Google Maps/Review URLs
  */
export function extractPossiblePlaceId(url: string): string | undefined {
  if (!url) return undefined;
  
  // Format: search.google.com/local/writereview?placeid=ChIJ...
  const placeIdMatch = url.match(/[?&]placeid=([a-zA-Z0-9_-]+)/i);
  if (placeIdMatch && placeIdMatch[1]) {
    return placeIdMatch[1];
  }

  // Format: google.com/maps/place/.../data=...!1s(ChIJ...)
  const dataChIJMatch = url.match(/!1s(ChIJ[a-zA-Z0-9_-]+)/);
  if (dataChIJMatch && dataChIJMatch[1]) {
    return dataChIJMatch[1];
  }

  // Format: ChIJ... directly in URL segment
  const directChIJMatch = url.match(/(ChIJ[a-zA-Z0-9_-]{20,40})/);
  if (directChIJMatch && directChIJMatch[1]) {
    return directChIJMatch[1];
  }

  return undefined;
}

/**
  * Generates an official Google Review direct submission URL if Place ID is present
  */
export function getReviewDestination(url: string, explicitReviewUrl?: string, explicitPlaceId?: string): string {
  // If explicitly provided official review URL, prioritize it
  if (explicitReviewUrl && explicitReviewUrl.trim().length > 0) {
    let clean = explicitReviewUrl.trim();
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = 'https://' + clean;
    }
    return clean;
  }

  // If explicit place ID or extracted place ID exists
  const placeId = explicitPlaceId?.trim() || extractPossiblePlaceId(url);
  if (placeId) {
    return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
  }

  // Fall back to original normalized Google URL
  return normalizeGoogleUrl(url);
}

/**
  * Normalizes Google URL to ensure https protocol and clean query params
  */
export function normalizeGoogleUrl(url: string): string {
  if (!url) return '';
  let clean = url.trim();
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = 'https://' + clean;
  }
  return clean;
}

/**
  * Full parser function that returns structured information about the Google URL
  */
export function parseGoogleMapsUrl(url: string): ParsedGoogleUrl {
  if (!url || !url.trim()) {
    return {
      isValid: false,
      type: 'invalid',
      normalizedUrl: '',
      reviewDestinationUrl: '',
      errorMessage: 'URL is required.',
    };
  }

  const normalized = normalizeGoogleUrl(url);

  try {
    const parsedUrl = new URL(normalized);
    const host = parsedUrl.hostname.toLowerCase();

    const isGoogle = 
      host.includes('google.com') || 
      host.includes('goo.gl') || 
      host.includes('g.page');

    if (!isGoogle) {
      return {
        isValid: false,
        type: 'invalid',
        normalizedUrl: normalized,
        reviewDestinationUrl: normalized,
        errorMessage: 'Please enter a valid Google Maps or Google Review URL.',
      };
    }

    const placeId = extractPossiblePlaceId(normalized);

    let type: ParsedGoogleUrl['type'] = 'raw_url';
    if (normalized.includes('writereview')) {
      type = 'direct_review';
    } else if (normalized.includes('/maps/place')) {
      type = 'maps_place';
    } else if (normalized.includes('/maps')) {
      type = 'search_location';
    }

    const destination = getReviewDestination(normalized, undefined, placeId);

    return {
      isValid: true,
      type,
      placeId,
      normalizedUrl: normalized,
      reviewDestinationUrl: destination,
    };
  } catch (e) {
    return {
      isValid: false,
      type: 'invalid',
      normalizedUrl: normalized,
      reviewDestinationUrl: normalized,
      errorMessage: 'Invalid URL format.',
    };
  }
}
