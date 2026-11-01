'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, Download, QrCode, Sparkles, ShieldCheck } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profileData';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QRModal({ isOpen, onClose }: QRModalProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href || 'https://github.com/Aiagent1113');
    }
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleDownloadQR = () => {
    const svgElement = document.getElementById('neural-qr-code');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 600;
      canvas.height = 600;
      if (ctx) {
        ctx.fillStyle = '#030305';
        ctx.fillRect(0, 0, 600, 600);
        ctx.drawImage(img, 50, 50, 500, 500);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `${PROFILE_DATA.name.toLowerCase().replace(/\s+/g, '-')}-qr.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-all"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative z-10 w-full max-w-sm rounded-3xl overflow-hidden bg-[#07070b]/90 border border-white/10 shadow-[0_0_50px_rgba(0,245,212,0.18)] p-6 text-center"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Neural Header */}
            <div className="flex flex-col items-center mb-5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00F5D4]/20 to-[#7B2CBF]/20 border border-[#00F5D4]/30 flex items-center justify-center text-[#00F5D4] mb-3 shadow-[0_0_15px_rgba(0,245,212,0.3)]">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white tracking-wide flex items-center gap-2">
                Neural Digital Pass
                <Sparkles className="w-4 h-4 text-[#00F5D4]" />
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                Scan to instantly access {PROFILE_DATA.name}&apos;s Spatial Hub
              </p>
            </div>

            {/* QR Frame with Laser Scanline Effect */}
            <div className="relative mx-auto w-52 h-52 p-3 rounded-2xl bg-white/[0.04] border border-white/10 shadow-[inset_0_0_20px_rgba(0,245,212,0.1)] flex items-center justify-center overflow-hidden group">
              {/* Scanline laser */}
              <div className="pointer-events-none absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00F5D4] to-transparent shadow-[0_0_12px_#00F5D4] animate-scanline z-20" />

              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00F5D4]" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00F5D4]" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00F5D4]" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00F5D4]" />

              {/* SVG QR Code */}
              <div className="bg-white p-2.5 rounded-xl shadow-lg">
                <QRCodeSVG
                  id="neural-qr-code"
                  value={currentUrl || 'https://github.com/Aiagent1113'}
                  size={168}
                  bgColor="#ffffff"
                  fgColor="#030305"
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>

            {/* Verification Badge */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#00F5D4]/80">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cryptographically Verified Spatial Link</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                    <span className="text-[#10B981]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-white/70" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadQR}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#00F5D4]/10 hover:bg-[#00F5D4]/20 border border-[#00F5D4]/30 text-[#00F5D4] text-xs font-medium transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Pass</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
