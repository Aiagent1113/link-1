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
  href?: string;
  target?: string;
  rel?: string;
  interactive?: boolean;
}

export function TiltCard({
  children,
  className,
  accentColor = '#6366F1', // Default Refined Indigo
  antigravity = true,
  floatDelay = 0,
  floatDuration = 5,
  onClick,
  href,
  target,
  rel,
  interactive = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | HTMLAnchorElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse motion values for 3D perspective tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth physics springs
  const springConfig = { damping: 25, stiffness: 240, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current || !interactive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    setMousePos({ x: clientX, y: clientY });

    // Normalized coordinates (-0.5 to 0.5)
    const normX = clientX / rect.width - 0.5;
    const normY = clientY / rect.height - 0.5;

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

  // Antigravity sine-wave vertical levitation
  const floatAnimation = useMemo(() => {
    if (!antigravity || isHovered) {
      return {
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      };
    }
    return {
      y: [-3, 3, -3],
      transition: {
        duration: floatDuration,
        delay: floatDelay,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    };
  }, [antigravity, isHovered, floatDuration, floatDelay]);

  const commonClass = cn(
    'group relative block rounded-2xl transition-all duration-300 outline-none select-none',
    href
      ? 'cursor-pointer hover:-translate-y-1 focus-visible:ring-2 focus-visible:outline-none'
      : '',
    onClick && !href ? 'cursor-pointer hover:-translate-y-0.5' : '',
    className
  );

  const innerContent = (
    <motion.div
      style={{
        rotateX: interactive ? rotateX : 0,
        rotateY: interactive ? rotateY : 0,
        transformStyle: 'preserve-3d',
        borderColor: isHovered ? `${accentColor}55` : 'rgba(255, 255, 255, 0.07)',
        backgroundColor: isHovered ? `${accentColor}0e` : 'rgba(9, 9, 13, 0.65)',
        boxShadow: isHovered
          ? `0 12px 30px -10px ${accentColor}28, inset 0 1px 0 0 rgba(255, 255, 255, 0.1)`
          : '0 4px 20px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
      }}
      className={cn(
        'relative h-full w-full rounded-2xl overflow-hidden p-5 sm:p-6',
        'backdrop-blur-xl border',
        'transition-colors duration-300'
      )}
    >
      {/* Brand-Specific Cursor-Tracking Radial Spotlight Aura */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(360px circle at ${mousePos.x}px ${mousePos.y}px, ${accentColor}24, transparent 50%)`,
        }}
      />

      {/* Subtle top specular sheen in brand tone */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${isHovered ? accentColor : 'rgba(255,255,255,0.2)'} 50%, transparent 100%)`,
          opacity: isHovered ? 0.9 : 0.4,
        }}
      />

      {/* Elevated 3D Content Container */}
      <div
        style={{
          transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
          transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className="relative z-20 h-full flex flex-col justify-between"
      >
        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <motion.a
        ref={cardRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        animate={floatAnimation}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1000,
        }}
        className={commonClass}
      >
        {innerContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      animate={floatAnimation}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ perspective: 1000 }}
      className={commonClass}
    >
      {innerContent}
    </motion.div>
  );
}
