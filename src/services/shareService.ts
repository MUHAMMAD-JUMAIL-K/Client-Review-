export const shareService = {
  async copyToClipboard(text: string): Promise<boolean> {
    if (!text) return false;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('Clipboard writeText failed, falling back to execCommand:', err);
      }
    }

    // Fallback using textarea element
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch (e) {
      console.error('Fallback clipboard copy failed:', e);
      return false;
    }
  },

  canNativeShare(): boolean {
    return typeof navigator !== 'undefined' && !!navigator.share;
  },

  async nativeShare(data: { title: string; text: string; url: string }): Promise<boolean> {
    if (this.canNativeShare()) {
      try {
        await navigator.share(data);
        return true;
      } catch (e) {
        // User cancelled or share failed
        return false;
      }
    }
    return false;
  },

  getWhatsAppShareUrl(url: string, title: string): string {
    const text = `${title}: ${url}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  },

  getEmailShareUrl(url: string, businessName: string): string {
    const subject = encodeURIComponent(`Review Link for ${businessName}`);
    const body = encodeURIComponent(`Here is the link to share your experience with ${businessName}:\n\n${url}`);
    return `mailto:?subject=${subject}&body=${body}`;
  }
};
