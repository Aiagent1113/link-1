'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  QrCode,
  Download,
  Orbit,
  Sparkles,
  MapPin,
  ShieldCheck,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { PROFILE_DATA } from '@/data/profileData';
import { QRModal } from './QRModal';

interface ProfileHeroProps {
  antigravity: boolean;
  onToggleAntigravity: () => void;
}

export function ProfileHero({ antigravity, onToggleAntigravity }: ProfileHeroProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_DATA.contact.email);
      setCopiedEmail(true);
      triggerToast(`Copied ${PROFILE_DATA.contact.email} to clipboard`);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      triggerToast('Failed to copy email');
    }
  };

  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Egamberdiyev;Akbarjon;;;
FN:Akbarjon Egamberdiyev
ORG:Autonomous Systems & Neural Intelligence
TITLE:${PROFILE_DATA.title}
EMAIL;TYPE=INTERNET,PREF:${PROFILE_DATA.contact.email}
TEL;TYPE=CELL:${PROFILE_DATA.contact.phone}
URL:${PROFILE_DATA.contact.github}
NOTE:${PROFILE_DATA.tagline}
ADR;TYPE=WORK:;;Tashkent;Uzbekistan;;;
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Akbarjon_Egamberdiyev.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    triggerToast('Neural vCard Contact downloaded');
  };

  return (
    <div className="relative w-full flex flex-col items-center text-center pt-2 pb-4">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            className="fixed top-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0a0a10]/90 border border-[#00F5D4]/40 shadow-[0_0_30px_rgba(0,245,212,0.3)] backdrop-blur-xl text-xs font-mono text-white"
          >
            <div className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Levitating Avatar Frame with Dual Rotating Neural Ring */}
      <div className="relative mb-6">
        {/* Outer Rotating Gradient Rings */}
        <div className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-[#00F5D4] via-[#7B2CBF] to-[#E2B86B] opacity-75 blur-[6px] animate-spin-slow" />
        
        {/* Inner Counter-Rotating Hairline Ring */}
        <div 
          className="absolute -inset-1.5 rounded-full border border-dashed border-[#00F5D4]/50" 
          style={{ animation: 'spin 14s linear infinite reverse' }} 
        />

        {/* Central Avatar Orb */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden p-1 bg-[#050508] border border-white/20 shadow-[0_0_35px_rgba(0,245,212,0.35)]">
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0f172a] via-[#05050a] to-[#020204] flex flex-col items-center justify-center relative overflow-hidden group">
            {/* Holographic grid texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#00F5D4_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />

            {/* Stylized AI Monogram & Hologram Avatar */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-[#00F5D4] to-[#E2B86B] drop-shadow-[0_2px_10px_rgba(0,245,212,0.5)]">
                AE
              </span>
              <span className="text-[9px] tracking-widest uppercase font-mono text-[#00F5D4]/80 mt-0.5">
                NEURAL CORE
              </span>
            </div>

            {/* Specular Glint */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-white/20 rounded-full blur-xl pointer-events-none" />
          </div>
        </div>

        {/* Verified AI Architect Floating Badge */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute -bottom-1 -right-1 px-2.5 py-1 rounded-full bg-[#030305]/90 border border-[#00F5D4]/50 shadow-[0_0_15px_rgba(0,245,212,0.4)] backdrop-blur-md flex items-center gap-1.5 cursor-default"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#00F5D4]" />
          <span className="text-[10px] font-mono font-semibold tracking-wider text-white">
            ARCHITECT
          </span>
        </motion.div>
      </div>

      {/* Live Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="tracking-tight text-[11px] sm:text-xs">
          {PROFILE_DATA.status.text}
        </span>
      </motion.div>

      {/* Name with Metallic Liquid Text Shader */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#e2e8f0] to-[#94a3b8]">
          {PROFILE_DATA.name}
        </span>
      </h1>

      {/* Role / Title */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-sm sm:text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#00F5D4] via-[#7B2CBF] to-[#E2B86B]">
          {PROFILE_DATA.title}
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-white/50 font-mono mb-4">
        <MapPin className="w-3.5 h-3.5 text-[#00F5D4]/70" />
        <span>{PROFILE_DATA.location}</span>
      </div>

      {/* Tagline / Bio */}
      <p className="max-w-xl text-xs sm:text-sm text-white/70 leading-relaxed font-sans mb-6 px-4">
        {PROFILE_DATA.tagline}
      </p>

      {/* Luxury Utility Action Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 z-30">
        {/* Copy Email Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyEmail}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#00F5D4]/40 text-xs font-mono text-white transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] group"
        >
          {copiedEmail ? (
            <Check className="w-3.5 h-3.5 text-[#10B981]" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-white/60 group-hover:text-[#00F5D4] transition-colors" />
          )}
          <span>{copiedEmail ? 'Email Copied' : 'Copy Email'}</span>
        </motion.button>

        {/* QR Digital Pass Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowQR(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#00F5D4]/40 text-xs font-mono text-white transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] group"
        >
          <QrCode className="w-3.5 h-3.5 text-white/60 group-hover:text-[#00F5D4] transition-colors" />
          <span>QR Pass</span>
        </motion.button>

        {/* Download vCard Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadVCard}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#E2B86B]/40 text-xs font-mono text-white transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] group"
        >
          <Download className="w-3.5 h-3.5 text-white/60 group-hover:text-[#E2B86B] transition-colors" />
          <span>vCard (.vcf)</span>
        </motion.button>

        {/* Antigravity Physics Mode Toggle */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleAntigravity}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] ${
            antigravity
              ? 'bg-[#00F5D4]/15 border-[#00F5D4]/50 text-[#00F5D4] shadow-[0_0_15px_rgba(0,245,212,0.2)]'
              : 'bg-white/[0.04] border-white/10 text-white/60'
          }`}
          title="Toggle Zero-Gravity Levitation"
        >
          <Orbit className={`w-3.5 h-3.5 ${antigravity ? 'animate-spin-slow text-[#00F5D4]' : ''}`} />
          <span>Antigravity: {antigravity ? 'ON' : 'OFF'}</span>
        </motion.button>
      </div>

      {/* QR Modal Component */}
      <QRModal isOpen={showQR} onClose={() => setShowQR(false)} />
    </div>
  );
}
