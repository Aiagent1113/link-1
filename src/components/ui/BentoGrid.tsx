'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
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
  Sparkles,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { PROFILE_DATA } from '@/data/profileData';
import { TiltCard } from './TiltCard';
import { AITerminalCard } from './AITerminalCard';

interface BentoGridProps {
  antigravity: boolean;
}

export function BentoGrid({ antigravity }: BentoGridProps) {
  // Generate realistic neural contribution matrix (weeks x days)
  const contributionGrid = useMemo(() => {
    // 16 columns (weeks), 5 rows (days)
    const grid: number[][] = [];
    for (let col = 0; col < 16; col++) {
      const columnData: number[] = [];
      for (let row = 0; row < 5; row++) {
        // Higher activity bias towards recent weeks
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
        return 'bg-[#00F5D4]/20 border-[#00F5D4]/30';
      case 2:
        return 'bg-[#00F5D4]/45 border-[#00F5D4]/50 shadow-[0_0_6px_rgba(0,245,212,0.3)]';
      case 3:
        return 'bg-[#00F5D4]/75 border-[#00F5D4]/70 shadow-[0_0_8px_rgba(0,245,212,0.5)]';
      case 4:
        return 'bg-[#00F5D4] border-white shadow-[0_0_10px_rgba(0,245,212,0.8)]';
      default:
        return 'bg-white/[0.04] border-white/[0.06]';
    }
  };

  const getSocialIcon = (id: string) => {
    switch (id) {
      case 'telegram':
        return <Send className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'huggingface':
        return <Cpu className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4">
      {/* =========================================================================
          CARD 1: FLAGSHIP AI SHOWCASE (SPAN 4 - FULL WIDTH)
          ========================================================================= */}
      <div className="col-span-1 sm:col-span-4">
        <TiltCard
          accentColor="#00F5D4"
          antigravity={antigravity}
          floatDelay={0}
          floatDuration={5.2}
          onClick={() => window.open(PROFILE_DATA.flagship.liveDemoUrl, '_blank')}
        >
          <div className="flex flex-col justify-between h-full">
            {/* Top Row: Category, Badge & Launch Icon */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#00F5D4]/10 border border-[#00F5D4]/30 flex items-center justify-center text-[#00F5D4] shadow-[0_0_12px_rgba(0,245,212,0.3)]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase block">
                    Flagship Project
                  </span>
                  <span className="text-xs font-semibold text-white/90">
                    {PROFILE_DATA.flagship.subtitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00F5D4]/10 border border-[#00F5D4]/30 text-[#00F5D4] text-[10px] font-mono font-medium shadow-[0_0_10px_rgba(0,245,212,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-ping" />
                  {PROFILE_DATA.flagship.badge}
                </span>
                <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-[#00F5D4] text-white/60 group-hover:text-black border border-white/10 group-hover:border-[#00F5D4] flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>

            {/* Title & Description */}
            <div className="mb-5">
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00F5D4] transition-colors tracking-tight mb-2">
                {PROFILE_DATA.flagship.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                {PROFILE_DATA.flagship.description}
              </p>
            </div>

            {/* Live Telemetry Metric Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              {PROFILE_DATA.flagship.metrics.map((metric, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-base sm:text-lg font-bold font-mono text-white">
                      {metric.value}
                    </span>
                    <span className="text-[9px] font-mono text-[#00F5D4]">
                      {metric.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] font-mono text-white/40 mr-1">STACK:</span>
              {PROFILE_DATA.flagship.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-white/80 group-hover:border-[#00F5D4]/30 transition-colors"
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
          accentColor="#7B2CBF"
          antigravity={antigravity}
          floatDelay={0.4}
          floatDuration={5.6}
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
          accentColor="#00F5D4"
          antigravity={antigravity}
          floatDelay={0.8}
          floatDuration={6.0}
          className="h-full"
          onClick={() => window.open(PROFILE_DATA.contact.github, '_blank')}
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#7B2CBF]/20 border border-[#7B2CBF]/40 flex items-center justify-center text-[#7B2CBF] shadow-[0_0_10px_rgba(123,44,191,0.3)]">
                    <GitBranch className="w-4 h-4 text-[#00F5D4]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#00F5D4] transition-colors">
                      Neural OSS AI Lab
                    </h4>
                    <span className="text-[10px] font-mono text-white/50">
                      github.com/{PROFILE_DATA.socials.find(s => s.id === 'github')?.handle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/70">
                  <Activity className="w-3 h-3 text-[#10B981]" />
                  <span>3.2k Commits</span>
                </div>
              </div>

              {/* Neural Activity Matrix Grid */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.08] mb-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-2">
                  <span>Neural Synapse Commits</span>
                  <span className="text-[#00F5D4] text-[9px]">Continuous Deploy</span>
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
              <div className="space-y-2">
                {PROFILE_DATA.repositories.slice(0, 2).map((repo) => (
                  <div
                    key={repo.name}
                    className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-[#00F5D4]/30 transition-colors flex items-center justify-between text-xs"
                  >
                    <div className="flex flex-col">
                      <span className="font-mono font-medium text-white/90">
                        {repo.name}
                      </span>
                      <span className="text-[10px] text-white/50 truncate max-w-[190px]">
                        {repo.description}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-white/60">
                      <span className="flex items-center gap-1 text-[#E2B86B]">
                        <Star className="w-3 h-3 fill-current" />
                        {repo.stars}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Explore Button */}
            <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#00F5D4]">
              <span>Explore All Models & Weights</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </TiltCard>
      </div>

      {/* =========================================================================
          CARDS 4, 5, 6, 7: MAGNETIC SOCIAL TILES (SPAN 1 EACH)
          ========================================================================= */}
      {PROFILE_DATA.socials.map((social, index) => (
        <div key={social.id} className="col-span-1">
          <TiltCard
            accentColor={social.accentColor}
            antigravity={antigravity}
            floatDelay={0.2 * index}
            floatDuration={4.5 + index * 0.4}
            className="h-full"
            onClick={() => window.open(social.url, '_blank')}
          >
            <div className="flex flex-col justify-between h-full min-h-[140px]">
              {/* Header: Icon & External Arrow */}
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${social.accentColor}18`,
                    borderColor: `${social.accentColor}40`,
                    borderWidth: '1px',
                    color: social.accentColor,
                    boxShadow: `0 0 16px ${social.accentColor}25`,
                  }}
                >
                  {getSocialIcon(social.id)}
                </div>

                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Title & Handle */}
              <div className="my-2">
                <h4 className="text-sm font-bold text-white group-hover:text-white transition-colors">
                  {social.name}
                </h4>
                <p className="text-[11px] font-mono text-white/50 truncate">
                  {social.handle}
                </p>
              </div>

              {/* Bottom State Pill */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] font-mono">
                <span
                  style={{ color: social.accentColor }}
                  className="font-medium truncate"
                >
                  {social.stats || 'Connect'}
                </span>
              </div>
            </div>
          </TiltCard>
        </div>
      ))}

      {/* =========================================================================
          CARD 8: FULL-WIDTH CONSULTATION / DIRECT BOOKING LINK (SPAN 4)
          ========================================================================= */}
      <div className="col-span-1 sm:col-span-4">
        <TiltCard
          accentColor="#E2B86B"
          antigravity={antigravity}
          floatDelay={0.5}
          floatDuration={5.8}
          className="border-[#E2B86B]/30 shadow-[0_0_35px_rgba(226,184,107,0.18)]"
          onClick={() => window.open(PROFILE_DATA.contact.calendar, '_blank')}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E2B86B]/25 to-[#7B2CBF]/20 border border-[#E2B86B]/40 flex items-center justify-center text-[#E2B86B] shadow-[0_0_20px_rgba(226,184,107,0.3)] shrink-0">
                <Calendar className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-[#E2B86B]/15 border border-[#E2B86B]/30 text-[10px] font-mono font-bold text-[#E2B86B] tracking-wider uppercase">
                    {PROFILE_DATA.consultation.badge}
                  </span>
                  <span className="text-[11px] font-mono text-white/50">
                    {PROFILE_DATA.consultation.duration}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#E2B86B] transition-colors">
                  {PROFILE_DATA.consultation.title}
                </h3>
                <p className="text-xs text-white/60 max-w-xl mt-0.5">
                  {PROFILE_DATA.consultation.description}
                </p>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="w-full sm:w-auto flex items-center justify-end shrink-0">
              <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#E2B86B] to-[#c99a4c] text-black font-semibold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(226,184,107,0.4)] group-hover:shadow-[0_0_35px_rgba(226,184,107,0.6)] transition-all group-hover:scale-105 active:scale-95">
                <span>Reserve Strategy Call</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}
