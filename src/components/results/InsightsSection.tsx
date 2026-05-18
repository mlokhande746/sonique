import React from "react";
import { AudioRadar } from "./AudioRadar";
import { MoodSpectrum } from "@/types/personality";
import { AnalysisEngine } from "@/lib/analysis";
import { UI_LABELS } from "@/constants/copy";

interface InsightsSectionProps {
  mood: MoodSpectrum;
  archetype: string;
  genres: { genre: string; count: number }[];
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ mood, archetype, genres }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-panel rounded-xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
        <div className="scan-line" />
        <h3 className="text-[18px] font-semibold text-[#e2e1eb] mb-6 w-full text-left flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4cd7f6]">radar</span> {UI_LABELS.dnaMapTitle}
        </h3>
        <AudioRadar mood={mood} size={240} />
      </div>

      <div className="glass-panel rounded-xl p-8 relative overflow-hidden flex flex-col justify-center bg-gradient-to-br from-white/[0.02] to-transparent">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <span className="material-symbols-outlined text-[120px] text-[#fbabff]">analytics</span>
        </div>
        <h3 className="text-[18px] font-semibold text-[#e2e1eb] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#fbabff]">query_stats</span> {UI_LABELS.frequencyInsightTitle}
        </h3>
        <p className="text-[14px] text-[#bcc9cd] leading-relaxed font-sans max-w-md">
          {AnalysisEngine.generateFrequencyInsight(archetype, mood, genres)}
        </p>
        <div className="mt-8 flex gap-3">
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#4cd7f6] font-bold uppercase tracking-widest">
            Discovery High
          </div>
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#fbabff] font-bold uppercase tracking-widest">
            Pattern Match
          </div>
        </div>
      </div>
    </div>
  );
};
