"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn("spotify", { callbackUrl: "/result" })}
      className="w-full max-w-xs mx-auto group relative rounded-full p-[1px] overflow-hidden"
    >
      {/* Glossy Border Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4cd7f6] via-[#fbabff] to-[#4cd7f6] opacity-70" />
      {/* Button Interior */}
      <div className="relative w-full h-full bg-[#0c0e14] backdrop-blur-md rounded-full flex items-center justify-center py-4 px-6 gap-3 group-hover:bg-[#4cd7f6]/10 transition-colors">
        <span className="material-symbols-outlined text-[#4cd7f6] text-xl">account_circle</span>
        <span className="label-caps text-[#4cd7f6] tracking-widest drop-shadow-[0_0_8px_rgba(76,215,246,0.5)]">
          Connect Spotify
        </span>
      </div>
    </button>
  );
}
