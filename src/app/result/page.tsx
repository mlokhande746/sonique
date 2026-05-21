"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";

// Hooks & Services
import { useAnalysisProgress } from "@/hooks/useAnalysisProgress";
import { usePersonalityProfile } from "@/hooks/usePersonalityProfile";
import { PersonalityService } from "@/services/personality";

// Components
import { HeroSection } from "@/components/results/HeroSection";
import { SpectrumSection } from "@/components/results/SpectrumSection";
import { ArtistLineup } from "@/components/results/ArtistLineup";
import { TrackRotation } from "@/components/results/TrackRotation";
import { InsightsSection } from "@/components/results/InsightsSection";
import { ShareSection } from "@/components/results/ShareSection";

// Constants & Types
import { ANIMATIONS } from "@/constants/design";

export default function ResultPage() {
  const [exporting, setExporting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Custom hooks handle state and lifecycle
  const { profile, loading, error } = usePersonalityProfile();
  const { progress, stageLabel, isComplete } = useAnalysisProgress(!!profile);

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => setShowResults(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  const handleExport = async () => {
    if (!profile) return;
    setExporting(true);
    try {
      const blob = await PersonalityService.exportCard(profile);
      const imageUrl = URL.createObjectURL(blob);

      if (navigator.share) {
        try {
          const file = new File([blob], `sonique-dna.png`, { type: 'image/png' });
          await navigator.share({
            title: 'My Sonique DNA',
            text: `I'm ${profile.archetype}! Check out my Spotify DNA.`,
            files: [file]
          });
          return;
        } catch (shareErr) {
          console.error("Native share failed", shareErr);
        }
      }

      const link = document.createElement("a");
      const filename = `sonique-${profile.archetype.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.download = filename;
      link.href = imageUrl;
      link.click();

      setTimeout(() => URL.revokeObjectURL(imageUrl), 100);
    } catch (err: any) {
      console.error("Export failed:", err);
      alert("Failed to save image. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <h2 className="text-[#fbabff] text-2xl font-bold mb-4">Analysis Failed</h2>
          <p className="text-[#869397] mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            Retry Analysis
          </button>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <main className="min-h-screen bg-[#0a0a0c] text-[#e2e1eb] selection:bg-[#4cd7f6]/30">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
              transition={{ duration: 0.8 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#0a0a0c]"
            >
              <div className="relative w-24 h-24 mb-12">
                <div className="absolute inset-0 border-2 border-white/5 rounded-full" />
                <motion.div
                  className="absolute inset-0 border-t-2 border-[#4cd7f6] rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[14px] font-bold data-mono text-[#4cd7f6]">{progress}%</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-[10px] text-[#4cd7f6] font-bold tracking-[0.4em] mb-4 uppercase animate-pulse">
                  {stageLabel}
                </p>
                <h2 className="text-[24px] font-black tracking-tight text-white">DECODING IDENTITY</h2>
              </div>
            </motion.div>
          ) : (
            profile && (
              <motion.div
                key="results"
                initial="hidden"
                animate="show"
                variants={ANIMATIONS.stagger}
                className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-32"
              >
                <HeroSection archetype={profile.archetype} />

                {/* Main Data Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
                  {/* Left Column: Mood Spectrum (Takes 2 columns) */}
                  <div className="lg:col-span-2">
                    <SpectrumSection mood={profile.moodSpectrum} />
                  </div>

                  {/* Right Column: Personality Traits */}
                  <div className="glass-panel rounded-xl p-5 md:p-8 border border-white/5 bg-white/[0.02]">
                    <h3 className="text-[18px] font-semibold text-[#e2e1eb] mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#fbabff]"></span> Personality
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.personalityTraits.map((trait, i) => (
                        <div
                          key={i}
                          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors cursor-default"
                        >
                          <span className="text-sm">{trait.icon}</span>
                          <span className="text-[11px] font-bold text-[#e2e1eb] uppercase tracking-wider">{trait.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Secondary Grid: Artists & Tracks */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                  <ArtistLineup artists={profile.topArtists} />
                  <TrackRotation tracks={profile.topTracks} />
                </div>

                {/* DNA Map & Insights */}
                <InsightsSection
                  mood={profile.moodSpectrum}
                  archetype={profile.archetype}
                  genres={profile.topGenres}
                />

                <ShareSection
                  profile={profile}
                  exporting={exporting}
                  onExport={handleExport}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </main>
    </TooltipProvider>
  );
}
