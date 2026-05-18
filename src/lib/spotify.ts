const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

async function spotifyFetch(url: string, accessToken: string) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    console.error(`Spotify API Error [${res.status}] at ${url}:`, errorBody);
    
    if (res.status === 401) throw new Error("Spotify session expired. Please log in again.");
    if (res.status === 403) throw new Error("Insufficient permissions. Check Spotify app scopes.");
    if (res.status === 429) throw new Error("Spotify is busy. Please try again in a moment.");
    
    throw new Error(`Failed to fetch data from Spotify [${res.status}]`);
  }
  
  return res.json();
}

export async function getTopArtists(accessToken: string, limit = 50) {
  return spotifyFetch(`${SPOTIFY_API_BASE}/me/top/artists?limit=${limit}&time_range=medium_term`, accessToken);
}

export async function getTopTracks(accessToken: string, limit = 50) {
  return spotifyFetch(`${SPOTIFY_API_BASE}/me/top/tracks?limit=${limit}&time_range=medium_term`, accessToken);
}

export async function getRecentlyPlayed(accessToken: string, limit = 50) {
  return spotifyFetch(`${SPOTIFY_API_BASE}/me/player/recently-played?limit=${limit}`, accessToken);
}

export async function getAudioFeatures(accessToken: string, trackIds: string[]) {
  if (!trackIds.length) return { audio_features: [] };
  const ids = trackIds.slice(0, 100).join(",");
  
  try {
    return await spotifyFetch(`${SPOTIFY_API_BASE}/audio-features?ids=${ids}`, accessToken);
  } catch (err) {
    console.warn("Audio features fetch failed, using fallbacks:", err);
    return { audio_features: [] };
  }
}
