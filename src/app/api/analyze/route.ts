import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getTopArtists, getTopTracks, getRecentlyPlayed, getAudioFeatures } from "@/lib/spotify";
import { analyzePersonality } from "@/lib/personalityEngine";
import { unstable_cache } from "next/cache";

async function generateProfile(accessToken: string) {
  // Attempt to fetch primary data (Top Artists & Tracks)
  let topArtists, topTracks;
  
  try {
    [topArtists, topTracks] = await Promise.all([
      getTopArtists(accessToken),
      getTopTracks(accessToken)
    ]);
  } catch (err) {
    console.warn("Primary fetch failed, attempting fallback to recently played:", err);
    
    // Fallback: If top tracks fails (common for new accounts), use recently played
    const [artists, recent] = await Promise.all([
      getTopArtists(accessToken).catch(() => ({ items: [] })),
      getRecentlyPlayed(accessToken).catch(() => ({ items: [] }))
    ]);
    
    topArtists = artists;
    // Format recently played items to match the structure of top tracks
    topTracks = { 
      items: recent.items?.map((item: any) => item.track).filter(Boolean) || [] 
    };
  }

  // Check if we have any data at all
  if ((!topArtists.items || topArtists.items.length === 0) && (!topTracks.items || topTracks.items.length === 0)) {
    throw new Error("Insufficient Spotify data to generate a profile. Listen to more music and try again!");
  }

  const trackIds = (topTracks.items || []).map((track: any) => track.id).filter(Boolean);
  const audioFeatures = await getAudioFeatures(accessToken, trackIds);

  return analyzePersonality(topArtists, topTracks, audioFeatures);
}

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });
    const accessToken = token?.accessToken as string;
    const userId = token?.sub as string;

    if (!accessToken || !userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Cache the profile generation for 1 hour (3600 seconds) per user
    // This prevents redundant Spotify API calls and re-analysis on page reloads
    const getCachedProfile = unstable_cache(
      async () => generateProfile(accessToken),
      [`profile-${userId}`],
      { revalidate: 3600 }
    );

    const profile = await getCachedProfile();

    return NextResponse.json({ profile });
  } catch (error: any) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ 
      error: error.message || "An unexpected error occurred during analysis." 
    }, { status: 500 });
  }
}
