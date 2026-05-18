"use client";

import LoginButton from "@/components/LoginButton";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#12131a] text-[#e2e1eb]">
      {/* Atmospheric Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4cd7f6] rounded-full blur-[150px] opacity-10 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#fbabff] rounded-full blur-[150px] opacity-10 pointer-events-none mix-blend-screen" />

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 border-b border-white/10 shadow-2xl flex justify-between items-center px-6 py-4 bg-black/60 backdrop-blur-2xl backdrop-saturate-150">
        <div className="label-caps text-[#4cd7f6] drop-shadow-[0_0_12px_rgba(76,215,246,0.6)] font-bold tracking-[0.4em]">
          SONIQUE
        </div>
        <div className="flex-1" />
        {/* Profile Button */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-full overflow-hidden border border-white/20 hover:border-[#4cd7f6]/50 transition-colors flex items-center justify-center bg-[#282a31]"
          >
            {session?.user?.image ? (
              <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-white/50" style={{ fontSize: '18px' }}>person</span>
            )}
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-12 w-56 rounded-xl border border-white/10 bg-[#1e1f26]/95 backdrop-blur-2xl shadow-2xl overflow-hidden z-50"
            >
              {session?.user && (
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-sm font-medium text-[#e2e1eb] truncate">{session.user.name || 'Spotify User'}</p>
                  <p className="text-xs text-[#869397] truncate">{session.user.email}</p>
                </div>
              )}
              <div className="py-1">
                <button
                  onClick={() => window.location.href = '/result'}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#bcc9cd] hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>analytics</span>
                  My DNA Profile
                </button>
                <button
                  onClick={() => window.open('https://open.spotify.com', '_blank')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#bcc9cd] hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>open_in_new</span>
                  Open Spotify
                </button>
                <div className="border-t border-white/5 my-1" />
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
                  Log Out
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="w-full max-w-[1200px] px-10 pt-32 pb-32 flex-grow flex flex-col items-center justify-center relative z-10">
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: "spring", bounce: 0.3 }} className="w-full max-w-4xl text-center flex flex-col items-center gap-4 relative">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse shadow-[0_0_8px_rgba(76,215,246,0.8)]" />
            <span className="label-caps text-[#4cd7f6]">SONIC ANALYSIS ACTIVE</span>
          </div>

          <h1 className="text-[48px] font-bold tracking-[0.05em] leading-[1.1] text-[#e2e1eb] mb-4 drop-shadow-[0_4px_20px_rgba(226,225,235,0.2)]">
            WHO ARE YOU WHEN NO ONE IS LISTENING?
          </h1>
          <p className="text-base leading-relaxed tracking-wide text-[#bcc9cd] max-w-2xl mb-12">
            A deep dive into your sonic identity. Reflecting your moods, rhythms, and hidden frequencies through the lens of a digital mirror.
          </p>

          {/* Glassmorphic Card */}
          <div className="w-full max-w-3xl aspect-[16/9] relative rounded-xl border border-white/10 bg-[#1e1f26]/40 backdrop-blur-[48px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] flex items-center justify-center">
            <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4cd7f6]/5 via-transparent to-[#fbabff]/5 opacity-50 pointer-events-none" />
            {/* Animated Waveform */}
            <div className="flex items-center justify-center gap-[6px] h-16">
              <div className="waveform-bar" />
              <div className="waveform-bar" />
              <div className="waveform-bar" />
              <div className="waveform-bar" />
              <div className="waveform-bar" />
              <div className="waveform-bar" />
              <div className="waveform-bar" />
            </div>
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#4cd7f6]" style={{ fontVariationSettings: "'FILL' 1" }}>graphic_eq</span>
              <span className="data-mono text-[#e2e1eb]">FREQUENCY CALIBRATING...</span>
            </div>
            <div className="absolute top-6 right-6 px-3 py-1 border border-[#fbabff]/30 bg-[#fbabff]/10 rounded-full">
              <span className="label-caps text-[#fbabff]">[ ARCHETYPE UNKNOWN ]</span>
            </div>
          </div>

          {/* Connect Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 w-full max-w-sm">
            <LoginButton />
          </motion.div>

          <p className="data-mono text-[#bcc9cd]/60 max-w-md mt-6">
            We only read your listening history. We never modify your playlists or follow artists without your direct permission.
          </p>
        </motion.section>
      </main>
    </div>
  );
}
