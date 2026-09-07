/**
  * Sanitizes plain text input by stripping HTML tags and unsafe characters to prevent XSS
  */
export function sanitizeString(input: string, maxLength: number = 500): string {
  if (!input || typeof input !== 'string') return '';

  // Truncate to max length
  let clean = input.slice(0, maxLength);

  // Strip HTML tags
  clean = clean.replace(/<[^>]*>?/gm, '');

  // Escape dangerous entities if necessary
  return clean.trim();
}

/**
  * Validates URL string to ensure it uses safe protocols (http/https)
  * Prevents javascript: or data: script injection URLs
  */
export function isValidPublicUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const clean = url.trim().toLowerCase();

  if (clean.startsWith('javascript:') || clean.startsWith('vbscript:')) {
    return false;
  }

  // Allow standard http, https, or relative assets
  return clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('/');
}

/**
  * Validates hex color code
  */
export function isValidHexColor(color?: string): boolean {
  if (!color || typeof color !== 'string') return false;
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color.trim());
}
