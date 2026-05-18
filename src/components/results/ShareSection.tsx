import React from "react";
import { Download } from "lucide-react";
import { PersonalityProfile } from "@/types/personality";

interface ShareSectionProps {
  profile: PersonalityProfile;
  exporting: boolean;
  onExport: () => Promise<void>;
}

export const ShareSection: React.FC<ShareSectionProps> = ({ profile, exporting, onExport }) => {
  return (
    <div className="mt-16 flex flex-col items-center">
      <button
        onClick={onExport}
        disabled={exporting}
        className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#4cd7f6] via-[#fbabff] to-[#4cd7f6] opacity-0 group-hover:opacity-20 transition-opacity animate-gradient-x" />
        <span className="relative flex items-center gap-2">
          {exporting ? (
            <>
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              GENERATING DNA...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              SAVE TO SHARE
            </>
          )}
        </span>
      </button>
      <p className="mt-4 text-[10px] text-[#3d494c] font-bold tracking-[0.3em] uppercase">
      </p>
    </div>
  );
};
