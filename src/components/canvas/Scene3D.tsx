'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { DAGNetwork, SpatialDotMatrix } from './DAGNetwork';

export default function Scene3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050508]">
      {/* Subtle radial ambient illumination */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.08),transparent_70%)]" />

      {/* 3D WebGL Canvas with radial vignette mask & opacity-30 for pristine foreground legibility */}
      <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]">
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full pointer-events-auto"
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />

            {/* Subtle Spatial Illumination (Refined Indigo & Slate) */}
            <pointLight position={[6, 8, 5]} color="#6366F1" intensity={1.5} distance={20} />
            <pointLight position={[-6, -4, 3]} color="#818CF8" intensity={1.2} distance={20} />

            {/* Neural Latent Space / Directed Acyclic Graph (DAG) Network */}
            <DAGNetwork nodeCount={90} maxDistance={2.5} />

            {/* 3D Spatial Dot-Matrix Wave */}
            <SpatialDotMatrix cols={32} rows={32} sep={0.5} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
