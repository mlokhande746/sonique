"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface MoodBarProps {
  label: string;
  value: number;
  color: string;
  delay: number;
  description: string;
}

export const MoodBar: React.FC<MoodBarProps> = ({ label, value, color, delay, description }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-col gap-2 group cursor-help transition-all duration-300 hover:translate-x-1">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <span className="label-caps text-[10px] text-[#869397] tracking-[0.2em] group-hover:text-[#e2e1eb] transition-colors">
                {label}
              </span>
              <Info className="w-3 h-3 text-[#3d494c] group-hover:text-[#4cd7f6] transition-colors" />
            </div>
            <span className="data-mono text-[14px] font-bold text-[#e2e1eb]">{value}%</span>
          </div>
          <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full"
              style={{ 
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}80`
              }}
            />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent 
        side="right" 
        className="max-w-[200px] bg-[#1a1b22] border border-white/10 p-3 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-[#4cd7f6] uppercase tracking-widest mb-1">{label} DNA</span>
          <p className="text-[12px] leading-relaxed text-[#bcc9cd] font-sans">
            {description}
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
