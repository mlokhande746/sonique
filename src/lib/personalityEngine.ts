// Genre-based mood heuristic fallback
const GENRE_MOOD_MAP: Record<string, { energy: number; valence: number; danceability: number; acousticness: number }> = {
  "pop": { energy: 0.7, valence: 0.65, danceability: 0.72, acousticness: 0.2 },
  "rock": { energy: 0.75, valence: 0.5, danceability: 0.5, acousticness: 0.15 },
  "hip hop": { energy: 0.72, valence: 0.55, danceability: 0.8, acousticness: 0.1 },
  "rap": { energy: 0.75, valence: 0.5, danceability: 0.78, acousticness: 0.08 },
  "r&b": { energy: 0.55, valence: 0.55, danceability: 0.7, acousticness: 0.3 },
  "electronic": { energy: 0.8, valence: 0.5, danceability: 0.75, acousticness: 0.05 },
  "edm": { energy: 0.9, valence: 0.6, danceability: 0.85, acousticness: 0.03 },
  "dance": { energy: 0.85, valence: 0.65, danceability: 0.9, acousticness: 0.05 },
  "house": { energy: 0.8, valence: 0.6, danceability: 0.85, acousticness: 0.05 },
  "techno": { energy: 0.85, valence: 0.4, danceability: 0.78, acousticness: 0.03 },
  "metal": { energy: 0.95, valence: 0.3, danceability: 0.35, acousticness: 0.05 },
  "punk": { energy: 0.9, valence: 0.45, danceability: 0.45, acousticness: 0.1 },
  "indie": { energy: 0.55, valence: 0.5, danceability: 0.5, acousticness: 0.4 },
  "alternative": { energy: 0.6, valence: 0.45, danceability: 0.48, acousticness: 0.3 },
  "jazz": { energy: 0.4, valence: 0.55, danceability: 0.5, acousticness: 0.7 },
  "classical": { energy: 0.25, valence: 0.4, danceability: 0.2, acousticness: 0.9 },
  "blues": { energy: 0.45, valence: 0.4, danceability: 0.45, acousticness: 0.6 },
  "country": { energy: 0.6, valence: 0.6, danceability: 0.55, acousticness: 0.5 },
  "folk": { energy: 0.35, valence: 0.5, danceability: 0.4, acousticness: 0.75 },
  "soul": { energy: 0.5, valence: 0.6, danceability: 0.65, acousticness: 0.4 },
  "funk": { energy: 0.75, valence: 0.7, danceability: 0.82, acousticness: 0.2 },
  "reggae": { energy: 0.55, valence: 0.65, danceability: 0.7, acousticness: 0.3 },
  "latin": { energy: 0.75, valence: 0.7, danceability: 0.8, acousticness: 0.2 },
  "k-pop": { energy: 0.8, valence: 0.65, danceability: 0.78, acousticness: 0.1 },
  "ambient": { energy: 0.15, valence: 0.35, danceability: 0.15, acousticness: 0.85 },
  "lo-fi": { energy: 0.3, valence: 0.45, danceability: 0.5, acousticness: 0.6 },
  "trap": { energy: 0.8, valence: 0.4, danceability: 0.75, acousticness: 0.05 },
  "singer-songwriter": { energy: 0.35, valence: 0.45, danceability: 0.4, acousticness: 0.7 },
  "synthwave": { energy: 0.7, valence: 0.5, danceability: 0.65, acousticness: 0.05 },
  "grunge": { energy: 0.8, valence: 0.3, danceability: 0.4, acousticness: 0.15 },
};

function estimateMoodFromGenres(genres: string[]): { energy: number; valence: number; danceability: number; acousticness: number } {
  let totalE = 0, totalV = 0, totalD = 0, totalA = 0, matched = 0;

  for (const genre of genres) {
    const lower = genre.toLowerCase();
    // Try exact match first, then partial match
    const match = GENRE_MOOD_MAP[lower] || Object.entries(GENRE_MOOD_MAP).find(([key]) => lower.includes(key) || key.includes(lower))?.[1];
    if (match) {
      totalE += match.energy;
      totalV += match.valence;
      totalD += match.danceability;
      totalA += match.acousticness;
      matched++;
    }
  }

  if (matched === 0) {
    // Default fallback: moderate everything
    return { energy: 0.55, valence: 0.5, danceability: 0.5, acousticness: 0.35 };
  }

  return {
    energy: totalE / matched,
    valence: totalV / matched,
    danceability: totalD / matched,
    acousticness: totalA / matched,
  };
}

export function analyzePersonality(topArtists: any, topTracks: any, audioFeatures: any) {
  // 1. Genre DNA
  const genreCounts: Record<string, number> = {};
  const allGenres: string[] = [];
  (topArtists?.items || []).forEach((artist: any) => {
    (artist?.genres || []).forEach((genre: string) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      allGenres.push(genre);
    });
  });

  const sortedGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([genre, count]) => ({ genre, count }));

  const topGenres = sortedGenres.slice(0, 5);

  // 2. Mood Spectrum
  let avgEnergy: number, avgValence: number, avgDanceability: number, avgAcousticness: number;

  const validFeatures = (audioFeatures?.audio_features || []).filter(Boolean);

  if (validFeatures.length > 0) {
    let totalEnergy = 0, totalValence = 0, totalDanceability = 0, totalAcousticness = 0;
    validFeatures.forEach((feature: any) => {
      totalEnergy += feature.energy || 0;
      totalValence += feature.valence || 0;
      totalDanceability += feature.danceability || 0;
      totalAcousticness += feature.acousticness || 0;
    });
    const count = validFeatures.length;
    avgEnergy = totalEnergy / count;
    avgValence = totalValence / count;
    avgDanceability = totalDanceability / count;
    avgAcousticness = totalAcousticness / count;
  } else {
    // Fallback: estimate mood from genre heuristics
    const estimated = estimateMoodFromGenres(allGenres);
    avgEnergy = estimated.energy;
    avgValence = estimated.valence;
    avgDanceability = estimated.danceability;
    avgAcousticness = estimated.acousticness;
  }

  // 3. Archetype Logic
  let archetype = "The Sonic Explorer";
  let description = "You listen to a wide variety of music and are always exploring new sounds.";

  if (avgValence < 0.4 && avgEnergy < 0.5) {
    archetype = "The Night Driver";
    description = "Late-night, moody, atmospheric tracks are your lifeblood.";
  } else if (avgValence < 0.4 && avgEnergy >= 0.5) {
    archetype = "The Chaos Curator";
    description = "High energy but melancholic or intense; your playlists are a rollercoaster.";
  } else if (avgValence >= 0.5 && avgEnergy >= 0.7) {
    archetype = "The Hype Engine";
    description = "Your music is high-energy, confident, and ready for a party or a workout.";
  } else if (avgAcousticness > 0.5) {
    archetype = "The Nostalgic Archivist";
    description = "You lean toward organic, acoustic sounds and sentimental melodies.";
  }

  // 4. Personality Traits
  const traits: { label: string; icon: string; color: string }[] = [];

  // Energy traits
  if (avgEnergy >= 0.75) traits.push({ label: "Adrenaline Junkie", icon: "⚡", color: "#f59e0b" });
  else if (avgEnergy >= 0.55) traits.push({ label: "Steady Pulse", icon: "💫", color: "#4cd7f6" });
  else if (avgEnergy >= 0.35) traits.push({ label: "Calm Current", icon: "🌊", color: "#06b6d4" });
  else traits.push({ label: "Zen Master", icon: "🧘", color: "#a78bfa" });

  // Valence traits
  if (avgValence >= 0.65) traits.push({ label: "Eternal Optimist", icon: "☀️", color: "#fbbf24" });
  else if (avgValence >= 0.45) traits.push({ label: "Emotional Realist", icon: "🌗", color: "#94a3b8" });
  else traits.push({ label: "Midnight Philosopher", icon: "🌙", color: "#818cf8" });

  // Danceability traits
  if (avgDanceability >= 0.7) traits.push({ label: "Dance Floor Regular", icon: "💃", color: "#fb7185" });
  else if (avgDanceability >= 0.5) traits.push({ label: "Rhythm Keeper", icon: "🎵", color: "#fbabff" });
  else traits.push({ label: "Still Water", icon: "🍃", color: "#34d399" });

  // Acousticness traits
  if (avgAcousticness >= 0.6) traits.push({ label: "Acoustic Soul", icon: "🎸", color: "#d97706" });
  else if (avgAcousticness >= 0.35) traits.push({ label: "Hybrid Sound", icon: "🔀", color: "#c084fc" });
  else traits.push({ label: "Digital Native", icon: "🤖", color: "#4cd7f6" });

  // Combo traits
  if (avgEnergy >= 0.7 && avgValence < 0.4) traits.push({ label: "Dark Energy", icon: "🔥", color: "#ef4444" });
  if (avgValence >= 0.6 && avgDanceability >= 0.65) traits.push({ label: "Good Vibes Only", icon: "✨", color: "#a3e635" });
  if (avgAcousticness >= 0.5 && avgValence < 0.4) traits.push({ label: "Melancholy Poet", icon: "🖊️", color: "#a1a1aa" });
  if (avgEnergy < 0.35 && avgAcousticness >= 0.5) traits.push({ label: "Campfire Storyteller", icon: "🏕️", color: "#f97316" });

  return {
    archetype,
    description,
    moodSpectrum: {
      energy: Math.round(avgEnergy * 100),
      valence: Math.round(avgValence * 100),
      danceability: Math.round(avgDanceability * 100),
      acousticness: Math.round(avgAcousticness * 100),
    },
    personalityTraits: traits,
    topGenres,
    topArtists: (topArtists?.items || []).slice(0, 5).map((a: any) => ({
      name: a.name,
      imageUrl: a.images?.[0]?.url || null,
      spotifyUrl: a.external_urls?.spotify || `https://open.spotify.com/artist/${a.id}`,
    })),
    topTracks: (topTracks?.items || []).slice(0, 5).map((t: any) => ({
      name: t?.name,
      artist: t?.artists?.[0]?.name,
      albumArt: t?.album?.images?.[0]?.url || null,
      spotifyUrl: t?.external_urls?.spotify || `https://open.spotify.com/track/${t.id}`,
    })),
  };
}

