'use client';

import React, { useRef, useState, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  antigravity?: boolean;
  floatDelay?: number;
  floatDuration?: number;
  onClick?: () => void;
  interactive?: boolean;
}

export function TiltCard({
  children,
  className,
  accentColor = '#00F5D4',
  antigravity = true,
  floatDelay = 0,
  floatDuration = 5,
  onClick,
  interactive = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth physics springs
  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    setMousePos({ x: clientX, y: clientY });

    // Normalized coordinates (-0.5 to 0.5)
    const normX = (clientX / rect.width) - 0.5;
    const normY = (clientY / rect.height) - 0.5;

    x.set(normX);
    y.set(normY);
  }, [interactive, x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  // Antigravity sine-wave animation variant
  const floatAnimation = useMemo(() => {
    if (!antigravity || isHovered) {
      return {
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
      };
    }
    return {
      y: [-3.5, 3.5, -3.5],
      transition: {
        duration: floatDuration,
        delay: floatDelay,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    };
  }, [antigravity, isHovered, floatDuration, floatDelay]);

  return (
    <motion.div
      ref={cardRef}
      animate={floatAnimation}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
      }}
      className={cn(
        'group relative rounded-2xl transition-shadow duration-500',
        onClick ? 'cursor-pointer' : '',
        className
      )}
    >
      <motion.div
        style={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className={cn(
          'relative h-full w-full rounded-2xl overflow-hidden p-5 sm:p-6',
          // 2026 Liquid Glass Card Surface
          'bg-white/[0.022] backdrop-blur-[28px] backdrop-saturate-[190%]',
          // Hairline Specular Border & inner specular highlight
          'border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)]',
          'transition-all duration-300'
        )}
      >
        {/* Dynamic Cursor-Tracking Radial Spotlight Aura */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, ${accentColor}26, transparent 40%)`,
          }}
        />

        {/* Specular border illumination follow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl border transition-opacity duration-300 z-10"
          style={{
            borderColor: `${accentColor}40`,
            opacity: isHovered ? 0.75 : 0,
          }}
        />

        {/* Micro-noise gradient texture */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-50 z-0" />

        {/* Inner 3D elevated content container */}
        <div
          style={{
            transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)',
            transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
          className="relative z-20 h-full flex flex-col justify-between"
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
