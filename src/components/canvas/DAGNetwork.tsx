'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Neural Latent Space / Directed Acyclic Graph (DAG) Network
export function DAGNetwork({ nodeCount = 85, maxDistance = 2.4 }: { nodeCount?: number; maxDistance?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate DAG node coordinates in a 3D latent space
  const [positions, initialPositions, connections] = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const initPos = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      const idx = i * 3;
      // Distribute in an elliptical volume
      const radius = 2.5 + Math.random() * 5.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      const x = radius * Math.cos(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * 0.7;
      const z = (Math.random() - 0.5) * 5.0;

      pos[idx] = x;
      pos[idx + 1] = y;
      pos[idx + 2] = z;

      initPos[idx] = x;
      initPos[idx + 1] = y;
      initPos[idx + 2] = z;
    }

    // Precalculate DAG connections (ordered pairs to mimic directed flow)
    const connPairs: [number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      let connectionsFromNode = 0;
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = initPos[i * 3] - initPos[j * 3];
        const dy = initPos[i * 3 + 1] - initPos[j * 3 + 1];
        const dz = initPos[i * 3 + 2] - initPos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance && connectionsFromNode < 3) {
          connPairs.push([i, j]);
          connectionsFromNode++;
        }
      }
    }

    return [pos, initPos, connPairs];
  }, [nodeCount, maxDistance]);

  // Buffer for line segment vertices (2 vertices per connection pair)
  const linePositions = useMemo(() => {
    const arr = new Float32Array(connections.length * 6);
    return arr;
  }, [connections]);

  useFrame((state) => {
    const { pointer, clock } = state;
    const time = clock.getElapsedTime();

    if (!pointsRef.current || !linesRef.current) return;

    const pointPosAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const currentPointPos = pointPosAttr.array as Float32Array;

    const linePosAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const currentLinePos = linePosAttr.array as Float32Array;

    // Subtle cursor damping
    const targetX = pointer.x * 2.0;
    const targetY = pointer.y * 2.0;

    // Animate nodes with gentle organic drift
    for (let i = 0; i < nodeCount; i++) {
      const idx = i * 3;

      // Mathematical harmonic drift (latent space oscillation)
      const offset = i * 0.2;
      currentPointPos[idx] = initialPositions[idx] + Math.sin(time * 0.4 + offset) * 0.25;
      currentPointPos[idx + 1] = initialPositions[idx + 1] + Math.cos(time * 0.35 + offset) * 0.22;
      currentPointPos[idx + 2] = initialPositions[idx + 2] + Math.sin(time * 0.25 + offset) * 0.18;

      // Soft cursor repulsion/attraction field
      const dx = targetX - currentPointPos[idx];
      const dy = targetY - currentPointPos[idx + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3.0) {
        const force = (3.0 - dist) * 0.02;
        currentPointPos[idx] += dx * force;
        currentPointPos[idx + 1] += dy * force;
      }
    }
    pointPosAttr.needsUpdate = true;

    // Update DAG connecting line segments
    let lineIdx = 0;
    for (let c = 0; c < connections.length; c++) {
      const [from, to] = connections[c];
      const fromIdx = from * 3;
      const toIdx = to * 3;

      // Vertex 1 (from)
      currentLinePos[lineIdx++] = currentPointPos[fromIdx];
      currentLinePos[lineIdx++] = currentPointPos[fromIdx + 1];
      currentLinePos[lineIdx++] = currentPointPos[fromIdx + 2];

      // Vertex 2 (to)
      currentLinePos[lineIdx++] = currentPointPos[toIdx];
      currentLinePos[lineIdx++] = currentPointPos[toIdx + 1];
      currentLinePos[lineIdx++] = currentPointPos[toIdx + 2];
    }
    linePosAttr.needsUpdate = true;

    // Slow ambient rotation
    pointsRef.current.rotation.y = time * 0.025;
    linesRef.current.rotation.y = time * 0.025;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* DAG Latent Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          color="#818CF8" // Refined Indigo-400
          transparent
          opacity={0.65}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* DAG Directed Synapse Edges */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6366F1" // Refined Indigo
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// 3D Spatial Dot-Matrix Wave (Topological Embedding Manifold)
export function SpatialDotMatrix({ cols = 36, rows = 36, sep = 0.45 }: { cols?: number; rows?: number; sep?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = cols * rows;

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);

    let i = 0;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = (c - cols / 2) * sep;
        const z = (r - rows / 2) * sep;
        const y = -2.6; // Positioned below foreground content

        pos[i] = x;
        pos[i + 1] = y;
        pos[i + 2] = z;

        initPos[i] = x;
        initPos[i + 1] = y;
        initPos[i + 2] = z;

        i += 3;
      }
    }

    return [pos, initPos];
  }, [cols, rows, sep, count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    let i = 0;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = initialPositions[i];
        const z = initialPositions[i + 2];
        // Mathematical latent wave calculation
        const wave = Math.sin(x * 0.6 + time * 0.8) * Math.cos(z * 0.6 + time * 0.6) * 0.35;
        array[i + 1] = initialPositions[i + 1] + wave;
        i += 3;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} rotation={[-0.3, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#4F46E5" // Indigo-600
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
