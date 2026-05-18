import { NextResponse } from 'next/server';
import { ProfileSchema } from '@/lib/validations';

export const runtime = 'nodejs';

/**
 * Helper to fetch an image and convert it to a base64 Data URL.
 */
async function getBase64Image(url: string | null) {
  if (!url) return null;
  try {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    return `data:${contentType};base64,${base64}`;
  } catch (err) {
    console.error("Failed to fetch image for base64 conversion:", url, err);
    return null;
  }
}

/**
 * Escapes characters that could break SVG/XML parsing to prevent injection.
 */
function escapeXML(unsafe: string) {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function POST(req: Request) {
  try {
    const rawData = await req.json();
    if (!rawData || !rawData.profile) return NextResponse.json({ error: "No profile data" }, { status: 400 });

    // Validate incoming data using Zod schema
    const profile = ProfileSchema.parse(rawData.profile);

    const { archetype, moodSpectrum, personalityTraits, topArtists, topTracks } = profile;
    
    // Fetch and base64-encode all images in parallel
    const [artistImages, trackImages] = await Promise.all([
      Promise.all(topArtists.slice(0, 3).map((a) => getBase64Image(a.imageUrl))),
      Promise.all(topTracks.slice(0, 3).map((t) => getBase64Image(t.albumArt)))
    ]);

    const energy = moodSpectrum?.energy || 0;
    const valence = moodSpectrum?.valence || 0;
    const danceability = moodSpectrum?.danceability || 0;

    const cyan = "#4CD7F6";
    const magenta = "#FBABFF";
    const purple = "#C084FC";
    const darkBg = "#0A0A0C";
    const textMain = "#E2E1EB";
    const textDim = "#869397";

    // CLEAN SVG TEMPLATE (Fixed duplication error & Added Escaping)
    const svg = `
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
           <linearGradient id="panelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stop-color="#1A1B22" />
             <stop offset="100%" stop-color="#0F1016" />
           </linearGradient>
           <clipPath id="circleClip"><circle cx="70" cy="70" r="70" /></clipPath>
           <clipPath id="rectClip"><rect width="80" height="80" rx="12" /></clipPath>
        </defs>

        <rect width="1080" height="1920" fill="${darkBg}"/>
        <circle cx="200" cy="200" r="800" fill="${cyan}" fill-opacity="0.05"/>
        <circle cx="880" cy="1720" r="800" fill="${magenta}" fill-opacity="0.05"/>
        
        <rect x="50" y="50" width="980" height="1820" rx="40" fill="url(#panelGrad)" stroke="white" stroke-opacity="0.1"/>
        
        <!-- Header -->
        <text x="540" y="130" text-anchor="middle" fill="${cyan}" font-family="Arial, sans-serif" font-size="28" font-weight="bold" letter-spacing="12">SONIQUE</text>
        
        <!-- Archetype Section -->
        <g transform="translate(540, 320)">
           <text text-anchor="middle" y="-40" fill="${magenta}" font-family="Arial, sans-serif" font-size="18" font-weight="bold" letter-spacing="4">[ ARCHETYPE IDENTIFIED ]</text>
           <text text-anchor="middle" y="35" fill="${textMain}" font-family="Arial, sans-serif" font-size="72" font-weight="900">${escapeXML(archetype).toUpperCase()}</text>
           <rect x="-80" y="70" width="160" height="3" rx="1.5" fill="${cyan}"/>
        </g>
        
        <!-- Mood Spectrum Section -->
        <g transform="translate(140, 540)">
           <text fill="${textMain}" font-family="Arial, sans-serif" font-size="30" font-weight="bold">MOOD SPECTRUM</text>
           <g transform="translate(0, 60)">
              <text fill="${textDim}" font-family="Arial, sans-serif" font-size="16" font-weight="bold" letter-spacing="2">ENERGY</text>
              <text x="800" text-anchor="end" fill="${textMain}" font-family="Arial, sans-serif" font-size="16" font-weight="bold">${energy}%</text>
              <rect y="15" width="800" height="6" rx="3" fill="white" fill-opacity="0.05"/>
              <rect y="15" width="${800 * (energy / 100)}" height="6" rx="3" fill="${cyan}"/>
           </g>
           <g transform="translate(0, 130)">
              <text fill="${textDim}" font-family="Arial, sans-serif" font-size="16" font-weight="bold" letter-spacing="2">VALENCE</text>
              <text x="800" text-anchor="end" fill="${textMain}" font-family="Arial, sans-serif" font-size="16" font-weight="bold">${valence}%</text>
              <rect y="15" width="800" height="6" rx="3" fill="white" fill-opacity="0.05"/>
              <rect y="15" width="${800 * (valence / 100)}" height="6" rx="3" fill="${magenta}"/>
           </g>
           <g transform="translate(0, 200)">
              <text fill="${textDim}" font-family="Arial, sans-serif" font-size="16" font-weight="bold" letter-spacing="2">DANCEABILITY</text>
              <text x="800" text-anchor="end" fill="${textMain}" font-family="Arial, sans-serif" font-size="16" font-weight="bold">${danceability}%</text>
              <rect y="15" width="800" height="6" rx="3" fill="white" fill-opacity="0.05"/>
              <rect y="15" width="${800 * (danceability / 100)}" height="6" rx="3" fill="${purple}"/>
           </g>
        </g>
        
        <!-- Artists Section -->
        <g transform="translate(140, 880)">
           <text fill="${textMain}" font-family="Arial, sans-serif" font-size="30" font-weight="bold">THE LINEUP</text>
           <g transform="translate(0, 40)">
              ${topArtists.slice(0, 3).map((a, i) => `
                <g transform="translate(${i * 280}, 0)">
                   <g transform="translate(0, 15)">
                      <circle cx="70" cy="70" r="70" fill="#282A31" />
                      <g clip-path="url(#circleClip)">
                         ${artistImages[i] ? `<image href="${artistImages[i]}" x="0" y="0" width="140" height="140" preserveAspectRatio="xMidYMid slice" />` : ''}
                      </g>
                   </g>
                   <text x="70" y="180" text-anchor="middle" fill="${textMain}" font-family="Arial, sans-serif" font-size="18" font-weight="bold">${escapeXML(a.name.length > 15 ? a.name.slice(0, 12) + '...' : a.name)}</text>
                </g>
              `).join('')}
           </g>
        </g>
        
        <!-- Tracks Section -->
        <g transform="translate(140, 1180)">
           <text fill="${magenta}" font-family="Arial, sans-serif" font-size="30" font-weight="bold">HEAVY ROTATION</text>
           <g transform="translate(0, 40)">
              ${topTracks.slice(0, 3).map((t, i) => `
                <g transform="translate(0, ${i * 90})">
                   <rect width="800" height="76" rx="16" fill="white" fill-opacity="0.03" />
                   <g transform="translate(8, 8)" clip-path="url(#rectClip)">
                      ${trackImages[i] ? `<image href="${trackImages[i]}" x="0" y="0" width="60" height="60" preserveAspectRatio="xMidYMid slice" />` : ''}
                   </g>
                   <text x="90" y="32" fill="${textMain}" font-family="Arial, sans-serif" font-size="20" font-weight="bold">${escapeXML(t.name.length > 40 ? t.name.slice(0, 37) + '...' : t.name)}</text>
                   <text x="90" y="56" fill="${textDim}" font-family="Arial, sans-serif" font-size="16">${escapeXML(t.artist)}</text>
                </g>
              `).join('')}
           </g>
        </g>
        
        <!-- Traits Section -->
        <g transform="translate(140, 1540)">
           <text fill="${textDim}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" letter-spacing="4" y="-15">DIGITAL DNA</text>
           <g transform="translate(0, 10)">
           ${personalityTraits.slice(0, 3).map((trait, i) => `
              <g transform="translate(0, ${i * 65})">
                 <rect width="420" height="50" rx="25" fill="white" fill-opacity="0.05" stroke="white" stroke-opacity="0.1" />
                 <text x="30" y="32" fill="${textMain}" font-family="Arial, sans-serif" font-size="18" font-weight="bold">${escapeXML(trait.icon)} ${escapeXML(trait.label).toUpperCase()}</text>
              </g>
           `).join('')}
           </g>
        </g>

        <!-- Footer -->
        <text x="540" y="1860" text-anchor="middle" fill="${textDim}" font-family="Arial, sans-serif" font-size="18" font-weight="bold" letter-spacing="8">SONIQUE // FREQUENCY DNA SCAN</text>
      </svg>
    `.trim();

    return NextResponse.json({ svg });
  } catch (err: any) {
    console.error("SVG Export Error:", err);
    // If it's a Zod error, return a 400 Bad Request with validation details
    if (err.name === 'ZodError') {
      return NextResponse.json({ error: "Invalid profile data", details: err.errors }, { status: 400 });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
