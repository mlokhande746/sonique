export interface MoodSpectrum {
  energy: number;
  valence: number;
  danceability: number;
  acousticness: number;
}

export interface PersonalityTrait {
  label: string;
  icon: string;
  color: string;
}

export interface TopArtist {
  name: string;
  imageUrl: string | null;
  spotifyUrl: string;
}

export interface TopTrack {
  name: string;
  artist: string;
  albumArt: string | null;
  spotifyUrl: string;
}

export interface PersonalityProfile {
  archetype: string;
  description: string;
  moodSpectrum: MoodSpectrum;
  personalityTraits: PersonalityTrait[];
  topGenres: { genre: string; count: number }[];
  topArtists: TopArtist[];
  topTracks: TopTrack[];
}

export interface ArchetypeConfig {
  icon: string;
  gradient: string;
  speed: string;
}
