'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  QrCode,
  Download,
  Orbit,
  MapPin,
  Phone,
  ShieldCheck,
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
ORG:Autonomous Systems & Neural Architecture
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

    triggerToast('Contact card (vCard) downloaded');
  };

  return (
    <div className="relative w-full flex flex-col items-center text-center pt-1 pb-3">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            className="fixed top-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/95 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl text-xs font-mono text-zinc-200"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Streamlined Monogram Avatar with Single Subtle Rotating Conic-Gradient Border */}
      <div className="relative mb-5 group">
        {/* Single rotating conic-gradient border ring */}
        <div
          className="absolute -inset-0.5 rounded-full opacity-70 blur-[1px] animate-spin-slow pointer-events-none"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0%, rgba(99, 102, 241, 0.7) 35%, transparent 55%, rgba(16, 185, 129, 0.5) 85%, transparent 100%)',
          }}
        />

        {/* High-Contrast Monogram Badge */}
        <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#09090d] border border-white/[0.12] flex items-center justify-center shadow-[0_0_25px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-white">
              AE
            </span>
            <span className="text-[8px] tracking-[0.2em] uppercase font-mono text-indigo-400 mt-0.5">
              AI ARCHITECT
            </span>
          </div>
        </div>

        {/* Subtle Verified Architect Badge */}
        <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-zinc-900 border border-white/15 text-indigo-400 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Green "Available for Enterprise AI & High-Impact Ventures" Pill */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3.5 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.12)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="tracking-tight text-[11px] sm:text-xs font-medium">
          {PROFILE_DATA.status.text}
        </span>
      </motion.div>

      {/* Bold H1 with Tight Tracking (-0.03em) */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tightest text-white mb-2">
        {PROFILE_DATA.name}
      </h1>

      {/* Title / Role */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-sm sm:text-base font-medium text-zinc-300">
          {PROFILE_DATA.title}
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 font-mono mb-3">
        <MapPin className="w-3.5 h-3.5 text-indigo-400/80" />
        <span>{PROFILE_DATA.location}</span>
      </div>

      {/* Clean Muted Subtitle Text (text-zinc-400) */}
      <p className="max-w-xl text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans mb-6 px-4">
        {PROFILE_DATA.tagline}
      </p>

      {/* Action Bar with Brand Color Hover Highlights */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 z-30">
        {/* Copy Email Button (Emerald Glow on Hover) */}
        <button
          type="button"
          onClick={handleCopyEmail}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/60 hover:bg-emerald-500/10 border border-white/[0.08] hover:border-emerald-500/40 text-xs font-mono text-zinc-300 hover:text-emerald-300 transition-all active:scale-95 shadow-sm group"
        >
          {copiedEmail ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
          )}
          <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
        </button>

        {/* Direct Call Button (Emerald Voice Glow on Hover) */}
        <a
          href={PROFILE_DATA.contact.phoneUrl}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/60 hover:bg-emerald-500/10 border border-white/[0.08] hover:border-emerald-500/40 text-xs font-mono text-zinc-300 hover:text-emerald-300 transition-all active:scale-95 shadow-sm group"
          title={`Call ${PROFILE_DATA.contact.phone}`}
        >
          <Phone className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
          <span>Call</span>
        </a>

        {/* QR Digital Pass (Indigo Glow on Hover) */}
        <button
          type="button"
          onClick={() => setShowQR(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/60 hover:bg-indigo-500/10 border border-white/[0.08] hover:border-indigo-500/40 text-xs font-mono text-zinc-300 hover:text-indigo-300 transition-all active:scale-95 shadow-sm group"
        >
          <QrCode className="w-3.5 h-3.5 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
          <span>QR Pass</span>
        </button>

        {/* Download vCard (Amber Glow on Hover) */}
        <button
          type="button"
          onClick={handleDownloadVCard}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/60 hover:bg-amber-500/10 border border-white/[0.08] hover:border-amber-500/40 text-xs font-mono text-zinc-300 hover:text-amber-300 transition-all active:scale-95 shadow-sm group"
        >
          <Download className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-400 transition-colors" />
          <span>vCard</span>
        </button>

        {/* Antigravity Toggle (Indigo Glow on Hover) */}
        <button
          type="button"
          onClick={onToggleAntigravity}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all active:scale-95 ${
            antigravity
              ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
              : 'bg-zinc-900/60 border-white/[0.08] hover:border-indigo-500/30 text-zinc-400 hover:text-indigo-300'
          }`}
          title="Toggle Zero-Gravity Levitation"
        >
          <Orbit className={`w-3.5 h-3.5 ${antigravity ? 'animate-spin-slow text-indigo-400' : ''}`} />
          <span>Antigravity: {antigravity ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* QR Modal */}
      <QRModal isOpen={showQR} onClose={() => setShowQR(false)} />
    </div>
  );
}
