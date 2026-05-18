import React from "react";
import { MoodBar } from "./MoodBar";
import { MoodSpectrum } from "@/types/personality";
import { AnalysisEngine } from "@/lib/analysis";
import { MOOD_DESCRIPTIONS, UI_LABELS } from "@/constants/copy";
import { COLORS } from "@/constants/design";

interface SpectrumSectionProps {
  mood: MoodSpectrum;
}

export const SpectrumSection: React.FC<SpectrumSectionProps> = ({ mood }) => {
  return (
    <div className="glass-panel rounded-xl p-8 relative overflow-hidden group border border-white/5 bg-white/[0.02]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4cd7f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative z-10">
        <h3 className="text-[18px] font-semibold text-[#e2e1eb] mb-8 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4cd7f6]">tune</span> Mood Spectrum
        </h3>
        
        <div className="flex flex-col gap-5">
          {Object.entries(mood).map(([key, value], i) => (
            <MoodBar
              key={key}
              label={key}
              value={value}
              color={COLORS.moods[i % COLORS.moods.length]}
              delay={0.2 + i * 0.1}
              description={MOOD_DESCRIPTIONS[key]}
            />
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[11px] text-[#869397] data-mono leading-relaxed">
            {AnalysisEngine.generateVibeSummary(mood)}
          </p>
        </div>
      </div>
    </div>
  );
};
