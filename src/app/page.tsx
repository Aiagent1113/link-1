'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ProfileHero } from '@/components/ui/ProfileHero';
import { BentoGrid } from '@/components/ui/BentoGrid';
import { PROFILE_DATA } from '@/data/profileData';

// Dynamic import with SSR false to prevent Three.js WebGL canvas hydration issues
const Scene3D = dynamic(() => import('@/components/canvas/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#050508] -z-10 pointer-events-none" />
  ),
});

export default function Home() {
  const [antigravity, setAntigravity] = useState(true);

  const toggleAntigravity = () => {
    setAntigravity((prev) => !prev);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#050508] text-zinc-100 flex flex-col items-center justify-between overflow-x-hidden selection:bg-indigo-500/25 selection:text-indigo-200">
      {/* 3D WebGL Background Scene (Neural Latent Space & DAG Particle Wave) */}
      <Scene3D />

      {/* Main Content Container (Bounded to 720px for high-end spatial aesthetics) */}
      <div className="relative z-10 w-full max-w-[720px] px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center gap-6 sm:gap-8">
        {/* Top Minimalist System Telemetry Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-500 pb-2.5 border-b border-white/[0.06]"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-400 font-medium">DAG LATENT SPACE // 2026.11</span>
          </div>
          <div className="flex items-center gap-2">
            <span>CLUSTER: 8x H100</span>
            <span className="text-emerald-400 font-semibold">ONLINE</span>
          </div>
        </motion.div>

        {/* Profile Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full"
        >
          <ProfileHero
            antigravity={antigravity}
            onToggleAntigravity={toggleAntigravity}
          />
        </motion.div>

        {/* Spatial Bento Grid Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full"
        >
          <BentoGrid antigravity={antigravity} />
        </motion.div>

        {/* Minimalist Executive Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full pt-8 pb-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500"
        >
          <div className="flex items-center gap-2">
            <span>© 2026 {PROFILE_DATA.name}</span>
            <span>•</span>
            <span className="text-zinc-400">Autonomous Architecture</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Aiagent1113"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-indigo-300 transition-colors"
            >
              github.com/Aiagent1113
            </a>
            <span>•</span>
            <span className="text-emerald-400 font-medium">99.98% SLA</span>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}
