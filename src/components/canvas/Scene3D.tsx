'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { NeuralCore, SynapticParticles } from './NeuralCore';
import { Sparkles } from '@react-three/drei';

export default function Scene3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background radial gradient layers */}
      <div className="absolute inset-0 bg-[#030305]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(123,44,191,0.18),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(0,245,212,0.08),transparent_60%)]" />

      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full pointer-events-auto"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          
          {/* Spatial illumination */}
          <pointLight position={[5, 8, 5]} color="#00F5D4" intensity={2.2} distance={20} />
          <pointLight position={[-6, -4, -3]} color="#7B2CBF" intensity={2.8} distance={25} />
          <pointLight position={[0, -5, 4]} color="#E2B86B" intensity={1.5} distance={15} />

          {/* Central 3D AI Brain Core */}
          <NeuralCore />

          {/* Dynamic Interactive Synaptic Particles */}
          <SynapticParticles count={380} />

          {/* Ambient Micro-Sparkles */}
          <Sparkles
            count={80}
            scale={10}
            size={1.4}
            speed={0.4}
            color="#00F5D4"
            opacity={0.35}
          />
          <Sparkles
            count={50}
            scale={12}
            size={1.8}
            speed={0.3}
            color="#E2B86B"
            opacity={0.25}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
