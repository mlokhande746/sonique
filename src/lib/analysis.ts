import { MoodSpectrum } from "@/types/personality";

/**
 * AnalysisEngine provides high-level interpretive logic for musical data.
 */
export const AnalysisEngine = {
  /**
   * Generates a qualitative "Vibe Check" summary based on raw mood metrics.
   * Enhanced with granular thresholds and poetic descriptors.
   */
  generateVibeSummary(mood: MoodSpectrum): string {
    const energyLabel = mood.energy > 80 ? 'kinetic' : mood.energy > 50 ? 'pulse-driven' : 'ethereal';
    const valenceLabel = mood.valence > 70 ? 'radiant' : mood.valence > 40 ? 'balanced' : 'noir-tinged';
    const acousticLabel = mood.acousticness > 60 ? 'purely organic' : mood.acousticness > 30 ? 'hybrid' : 'digitally-crafted';
    const danceLabel = mood.danceability > 70 ? 'rhythm-focused' : 'melody-first';
    
    return `Your profile skews ${energyLabel} and ${valenceLabel}, rooted in a ${acousticLabel} foundation. This ${danceLabel} signature suggests a listener who values both technical precision and raw emotional resonance.`;
  },

  /**
   * Generates a narrative insight about listening frequency and discovery.
   * Dynamically evaluates mood and genre data to create a unique profile summary.
   */
  generateFrequencyInsight(archetype: string, mood: MoodSpectrum, genres: { genre: string; count: number }[]): string {
    const energyLevel = mood.energy > 70 ? 'high-voltage' : mood.energy > 40 ? 'balanced' : 'restrained';
    const emotionType = mood.valence > 60 ? 'vibrant' : mood.valence > 40 ? 'neutral' : 'atmospheric';
    const mainGenre = genres[0]?.genre || 'eclectic';
    
    const intensityPhrase = energyLevel === 'high-voltage' 
      ? 'characterized by dynamic surges of discovery'
      : 'favoring a more deliberate, curated flow';
      
    const moodPhrase = emotionType === 'vibrant'
      ? 'uplifting and bright harmonic layers'
      : emotionType === 'atmospheric'
      ? 'deep, immersive, and introspective soundscapes'
      : 'a versatile mix of emotional textures';

    return `Your sonic identity as ${archetype} is ${intensityPhrase}. Rooted in ${mainGenre}, your frequency pattern reveals a preference for ${moodPhrase}, resulting in a unique discovery signature.`;
  }
};
