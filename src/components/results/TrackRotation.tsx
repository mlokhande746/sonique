import React from "react";
import { TopTrack } from "@/types/personality";
import { UI_LABELS } from "@/constants/copy";
import { motion } from "framer-motion";

interface TrackRotationProps {
  tracks: TopTrack[];
}

export const TrackRotation: React.FC<TrackRotationProps> = ({ tracks }) => {
  return (
    <div className="glass-panel rounded-xl p-5 md:p-8 border border-white/5 bg-white/[0.02]">
      <h3 className="text-[18px] font-semibold text-[#e2e1eb] mb-6 md:mb-8 flex items-center gap-2">
        <span className="material-symbols-outlined text-[#fbabff]">album</span> {UI_LABELS.rotationTitle}
      </h3>
      <div className="flex flex-col gap-4">
        {tracks.slice(0, 5).map((track, i) => (
          <motion.a 
            key={i}
            href={track.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer"
          >
            <img 
              src={track.albumArt || ""} 
              alt={track.name}
              className="w-10 h-10 md:w-12 md:h-12 rounded shadow-lg transition-all"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-[#e2e1eb] truncate group-hover:text-[#fbabff] transition-colors">{track.name}</span>
              <span className="text-[11px] text-[#869397]">{track.artist}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};
