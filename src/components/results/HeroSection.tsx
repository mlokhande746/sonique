import React from "react";
import { motion } from "framer-motion";
import { UI_LABELS } from "@/constants/copy";
import { ANIMATIONS } from "@/constants/design";

interface HeroSectionProps {
  archetype: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ archetype }) => {
  return (
    <motion.div variants={ANIMATIONS.fadeUp} className="text-center mb-16 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4cd7f6]/5 blur-[120px] rounded-full" />
      <span className="label-caps text-[12px] text-[#fbabff] mb-4 block tracking-[0.4em] font-bold">
        {UI_LABELS.archetypeTag}
      </span>
      <h1 className="text-[64px] md:text-[100px] font-black text-[#e2e1eb] leading-none mb-6 tracking-tighter mix-blend-plus-lighter">
        {archetype}
      </h1>
      <div className="flex justify-center">
        <div className="h-[4px] w-24 bg-[#4cd7f6] rounded-full" />
      </div>
    </motion.div>
  );
};
