'use client';

import React, { useMemo } from 'react';
import {
  ArrowUpRight,
  GitBranch,
  Star,
  Activity,
  Send,
  Github,
  Linkedin,
  Cpu,
  Calendar,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { PROFILE_DATA } from '@/data/profileData';
import { TiltCard } from './TiltCard';
import { AITerminalCard } from './AITerminalCard';

interface BentoGridProps {
  antigravity: boolean;
}

export function BentoGrid({ antigravity }: BentoGridProps) {
  // Generate subtle neural synapse commit activity grid
  const contributionGrid = useMemo(() => {
    // 16 columns (weeks), 5 rows (days)
    const grid: number[][] = [];
    for (let col = 0; col < 16; col++) {
      const columnData: number[] = [];
      for (let row = 0; row < 5; row++) {
        const bias = (col / 16) * 0.4 + 0.3;
        const level = Math.random() < bias ? Math.floor(Math.random() * 4) + 1 : 0;
        columnData.push(level);
      }
      grid.push(columnData);
    }
    return grid;
  }, []);

  const getContributionColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-emerald-500/25 border-emerald-500/30';
      case 2:
        return 'bg-emerald-500/50 border-emerald-500/60 shadow-[0_0_6px_rgba(16,185,129,0.3)]';
      case 3:
        return 'bg-emerald-400/80 border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]';
      case 4:
        return 'bg-emerald-300 border-white shadow-[0_0_10px_rgba(16,185,129,0.8)]';
      default:
        return 'bg-white/[0.04] border-white/[0.06]';
    }
  };

  const getSocialIcon = (id: string) => {
    switch (id) {
      case 'telegram':
        return <Send className="w-4 h-4" />;
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'huggingface':
        return <Cpu className="w-4 h-4" />;
      default:
        return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-3.5 sm:gap-4">
      {/* =========================================================================
          CARD 1: FLAGSHIP AI SHOWCASE (SPAN 4 - FULL WIDTH)
          ========================================================================= */}
      <div className="col-span-1 sm:col-span-4">
        <TiltCard
          accentColor="#6366F1"
          antigravity={antigravity}
          floatDelay={0}
          floatDuration={5.2}
          href={PROFILE_DATA.flagship.liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex flex-col justify-between h-full">
            {/* Top Row: Category, Badge & Launch Icon */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-sm">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block">
                    Flagship Architecture
                  </span>
                  <span className="text-xs font-semibold text-zinc-200">
                    {PROFILE_DATA.flagship.subtitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-medium shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {PROFILE_DATA.flagship.badge}
                </span>
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] group-hover:bg-indigo-500 text-zinc-400 group-hover:text-white border border-white/[0.08] group-hover:border-indigo-400 flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>

            {/* Title & Description */}
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-bold tracking-tightest text-white group-hover:text-indigo-300 transition-colors mb-1.5">
                {PROFILE_DATA.flagship.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                {PROFILE_DATA.flagship.description}
              </p>
            </div>

            {/* Real-Time Telemetry Metric Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4 p-3 rounded-xl bg-black/40 border border-white/[0.06]">
              {PROFILE_DATA.flagship.metrics.map((metric, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-base sm:text-lg font-bold font-mono text-white">
                      {metric.value}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-medium">
                      {metric.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] font-mono text-zinc-500 mr-1">STACK:</span>
              {PROFILE_DATA.flagship.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.07] text-[10px] font-mono text-zinc-300 group-hover:border-indigo-500/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </TiltCard>
      </div>

      {/* =========================================================================
          CARD 2: INTERACTIVE AI TERMINAL / TELEMETRY (SPAN 2)
          ========================================================================= */}
      <div className="col-span-1 sm:col-span-2">
        <TiltCard
          accentColor="#6366F1"
          antigravity={antigravity}
          floatDelay={0.3}
          floatDuration={5.5}
          interactive={false}
          className="h-full"
        >
          <AITerminalCard />
        </TiltCard>
      </div>

      {/* =========================================================================
          CARD 3: GITHUB & HUGGINGFACE AI LAB (SPAN 2)
          ========================================================================= */}
      <div className="col-span-1 sm:col-span-2">
        <TiltCard
          accentColor="#6366F1"
          antigravity={antigravity}
          floatDelay={0.6}
          floatDuration={5.8}
          className="h-full"
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <GitBranch className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                      Neural OSS AI Lab
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500">
                      github.com/{PROFILE_DATA.socials.find(s => s.id === 'github')?.handle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-zinc-300">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span>3.2k Commits</span>
                </div>
              </div>

              {/* Neural Synapse Commit Matrix */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] mb-3.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-2">
                  <span>Synapse Activity Matrix</span>
                  <span className="text-emerald-400 text-[9px] font-medium">99.98% Deploy</span>
                </div>

                {/* Matrix Columns */}
                <div className="flex gap-1 justify-between overflow-hidden">
                  {contributionGrid.map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-1">
                      {col.map((level, rowIdx) => (
                        <div
                          key={rowIdx}
                          className={`w-2.5 h-2.5 rounded-[2px] border transition-all duration-300 ${getContributionColor(
                            level
                          )}`}
                          title={`Activity Level ${level}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Repositories Highlights */}
              <div className="space-y-1.5">
                {PROFILE_DATA.repositories.slice(0, 2).map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all flex items-center justify-between text-xs group/repo"
                  >
                    <div className="flex flex-col">
                      <span className="font-mono font-medium text-zinc-200 group-hover/repo:text-indigo-300 transition-colors">
                        {repo.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 truncate max-w-[190px]">
                        {repo.description}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                      <span className="flex items-center gap-1 text-amber-300/80">
                        <Star className="w-3 h-3 fill-current" />
                        {repo.stars}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Semantic Link: Explore All Models & Weights (Required by Spec) */}
            <a
              href="https://github.com/Aiagent1113?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors group/explore"
            >
              <span>Explore All Models & Weights</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/explore:translate-x-0.5 group-hover/explore:-translate-y-0.5" />
            </a>
          </div>
        </TiltCard>
      </div>

      {/* =========================================================================
          CARDS 4, 5, 6, 7: SEMANTIC MAGNETIC SOCIAL TILES (SPAN 1 EACH)
          Strictly rendered as <a href="..." target="_blank" rel="noopener noreferrer">
          ========================================================================= */}
      {PROFILE_DATA.socials.map((social, index) => (
        <div key={social.id} className="col-span-1">
          <TiltCard
            accentColor="#6366F1"
            antigravity={antigravity}
            floatDelay={0.15 * index}
            floatDuration={4.6 + index * 0.3}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="h-full"
          >
            <div className="flex flex-col justify-between h-full min-h-[135px]">
              {/* Header: Icon & External Animated Arrow */}
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  {getSocialIcon(social.id)}
                </div>

                <div className="w-6 h-6 rounded-md bg-white/[0.04] group-hover:bg-indigo-500/20 text-zinc-400 group-hover:text-indigo-300 border border-white/[0.08] flex items-center justify-center transition-all duration-200">
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Title & Handle */}
              <div className="my-2">
                <h4 className="text-sm font-semibold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                  {social.name}
                </h4>
                <p className="text-[11px] font-mono text-zinc-500 truncate mt-0.5">
                  {social.handle}
                </p>
              </div>

              {/* Bottom State Tag */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] font-mono">
                <span className="text-zinc-400 font-medium truncate group-hover:text-indigo-300 transition-colors">
                  {social.stats || 'Connect ↗'}
                </span>
              </div>
            </div>
          </TiltCard>
        </div>
      ))}

      {/* =========================================================================
          CARD 8: FULL-WIDTH CONSULTATION / DIRECT BOOKING LINK (SPAN 4)
          Interactive CTA button linking to https://t.me/egamberdiyev_ai
          ========================================================================= */}
      <div className="col-span-1 sm:col-span-4">
        <TiltCard
          accentColor="#6366F1"
          antigravity={antigravity}
          floatDelay={0.4}
          floatDuration={5.5}
          className="border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.08)]"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-sm shrink-0">
                <Calendar className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono font-semibold text-indigo-300 tracking-wider uppercase">
                    {PROFILE_DATA.consultation.badge}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {PROFILE_DATA.consultation.duration}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold tracking-tightest text-white group-hover:text-indigo-200 transition-colors">
                  {PROFILE_DATA.consultation.title}
                </h3>
                <p className="text-xs text-zinc-400 max-w-xl mt-0.5">
                  {PROFILE_DATA.consultation.description}
                </p>
              </div>
            </div>

            {/* Semantic Interactive CTA Button (Required by Spec) */}
            <div className="w-full sm:w-auto flex items-center justify-end shrink-0">
              <a
                href="https://t.me/egamberdiyev_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-200 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <span>Reserve Strategy Call</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}
