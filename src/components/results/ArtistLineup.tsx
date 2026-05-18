import React from "react";
import { TopArtist } from "@/types/personality";
import { UI_LABELS } from "@/constants/copy";
import { motion } from "framer-motion";

interface ArtistLineupProps {
  artists: TopArtist[];
}

export const ArtistLineup: React.FC<ArtistLineupProps> = ({ artists }) => {
  return (
    <div className="glass-panel rounded-xl p-8 border border-white/5 bg-white/[0.02]">
      <h3 className="text-[18px] font-semibold text-[#e2e1eb] mb-8 flex items-center gap-2">
        <span className="material-symbols-outlined text-[#4cd7f6]">group</span> {UI_LABELS.lineupTitle}
      </h3>
      <div className="flex flex-col gap-6">
        {artists.slice(0, 3).map((artist, i) => (
          <motion.a 
            key={i}
            href={artist.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center gap-6 p-4 rounded-xl hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-white/5"
          >
            <div className="relative w-20 h-20 flex-shrink-0">
              <div className="absolute inset-0 rounded-2xl border-2 border-[#4cd7f6]/20 group-hover:border-[#4cd7f6]/50 transition-all duration-500 group-hover:scale-105" />
              <img 
                src={artist.imageUrl || ""} 
                alt={artist.name}
                className="w-full h-full rounded-2xl object-cover transition-all duration-500 shadow-2xl"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-[#4cd7f6] font-bold tracking-[0.2em] uppercase opacity-50">Top Artist</span>
              <span className="text-[16px] font-bold text-[#e2e1eb] uppercase tracking-wider group-hover:text-[#4cd7f6] transition-colors">
                {artist.name}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};
