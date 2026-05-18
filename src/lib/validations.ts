import { z } from "zod";

export const MoodSpectrumSchema = z.object({
  energy: z.number(),
  valence: z.number(),
  danceability: z.number(),
  acousticness: z.number(),
});

export const PersonalityTraitSchema = z.object({
  label: z.string(),
  icon: z.string(),
  color: z.string(),
});

export const TopArtistSchema = z.object({
  name: z.string(),
  imageUrl: z.string().nullable(),
  spotifyUrl: z.string(),
});

export const TopTrackSchema = z.object({
  name: z.string(),
  artist: z.string(),
  albumArt: z.string().nullable(),
  spotifyUrl: z.string(),
});

export const ProfileSchema = z.object({
  archetype: z.string().max(100),
  description: z.string().max(500),
  moodSpectrum: MoodSpectrumSchema,
  personalityTraits: z.array(PersonalityTraitSchema),
  topGenres: z.array(z.object({ genre: z.string(), count: z.number() })),
  topArtists: z.array(TopArtistSchema),
  topTracks: z.array(TopTrackSchema),
});
