import { PersonalityProfile } from "@/types/personality";

/**
 * Service layer for interacting with the personality analysis API.
 */
export const PersonalityService = {
  /**
   * Fetches the analyzed personality profile for the current user session.
   * @returns {Promise<PersonalityProfile>}
   */
  async getProfile(): Promise<PersonalityProfile> {
    const res = await fetch("/api/analyze");
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to analyze sonic DNA data.");
    }
    
    const data = await res.json();
    return data.profile;
  },

  /**
   * Triggers the export of the personality card.
   * @param profile - The profile data to export
   * @returns {Promise<Blob>} The generated image blob
   */
  async exportCard(profile: PersonalityProfile): Promise<Blob> {
    const res = await fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to generate export card on the server.");
    }
    
    const { svg } = await res.json();
    
    // Convert SVG string to PNG Blob using browser canvas
    return new Promise((resolve, reject) => {
      const img = new Image();
      const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1920;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error("Canvas context failed"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url);
          if (blob) resolve(blob);
          else reject(new Error("PNG conversion failed"));
        }, 'image/png');
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("SVG loading failed"));
      };
      
      img.src = url;
    });
  }
};
