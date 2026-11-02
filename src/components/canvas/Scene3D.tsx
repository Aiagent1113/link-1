'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { DAGNetwork, SpatialDotMatrix } from './DAGNetwork';
import { Sparkles } from '@react-three/drei';

export default function Scene3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050508]">
      {/* Subtle radial ambient illumination */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.14),transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(0,245,212,0.06),transparent_65%)]" />

      {/* 3D WebGL Canvas with high clarity, active movement & smooth soft vignette */}
      <div className="absolute inset-0 opacity-80 [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_98%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_98%)]">
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full pointer-events-auto"
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />

            {/* Spatial Illumination (Refined Indigo, Synaptic Cyan & Champagne) */}
            <pointLight position={[6, 8, 5]} color="#6366F1" intensity={2.0} distance={25} />
            <pointLight position={[-6, -4, 4]} color="#00F5D4" intensity={1.8} distance={25} />
            <pointLight position={[0, -6, 3]} color="#E2B86B" intensity={1.2} distance={20} />

            {/* Neural Latent Space / Directed Acyclic Graph (DAG) Network */}
            <DAGNetwork nodeCount={105} maxDistance={2.7} />

            {/* 3D Spatial Dot-Matrix Wave (Topological Manifold) */}
            <SpatialDotMatrix cols={36} rows={36} sep={0.44} />

            {/* Ambient Cosmic Sparkles for Deep Spatial Layering */}
            <Sparkles count={55} scale={10} size={1.6} speed={0.4} color="#818CF8" opacity={0.5} />
            <Sparkles count={35} scale={12} size={1.4} speed={0.3} color="#00F5D4" opacity={0.4} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
