'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Neural Latent Space / Directed Acyclic Graph (DAG) Network
export function DAGNetwork({ nodeCount = 95, maxDistance = 2.6 }: { nodeCount?: number; maxDistance?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const hubPointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pulsesRef = useRef<THREE.Points>(null);

  // Generate DAG node coordinates in a 3D latent space
  const [positions, initialPositions, connections, hubIndices] = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const initPos = new Float32Array(nodeCount * 3);
    const hubs: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const idx = i * 3;
      // Distribute in a balanced 3D elliptical cloud
      const radius = 2.2 + Math.random() * 5.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.85;

      const x = radius * Math.cos(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * 0.85;
      const z = (Math.random() - 0.5) * 4.5;

      pos[idx] = x;
      pos[idx + 1] = y;
      pos[idx + 2] = z;

      initPos[idx] = x;
      initPos[idx + 1] = y;
      initPos[idx + 2] = z;

      if (i % 6 === 0) {
        hubs.push(i);
      }
    }

    // Precalculate DAG connections (ordered pairs to mimic directed causal flow)
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

    return [pos, initPos, connPairs, hubs];
  }, [nodeCount, maxDistance]);

  // Buffer for line segment vertices
  const linePositions = useMemo(() => {
    return new Float32Array(connections.length * 6);
  }, [connections]);

  // Hub nodes positions
  const hubPositions = useMemo(() => {
    return new Float32Array(hubIndices.length * 3);
  }, [hubIndices]);

  // Signal packet pulses traveling along connections
  const pulsePositions = useMemo(() => {
    return new Float32Array(connections.length * 3);
  }, [connections]);

  useFrame((state) => {
    const { pointer, clock } = state;
    const time = clock.getElapsedTime();

    if (!pointsRef.current || !linesRef.current) return;

    const pointPosAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const currentPointPos = pointPosAttr.array as Float32Array;

    const linePosAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const currentLinePos = linePosAttr.array as Float32Array;

    // Interactive pointer target with smooth inertia
    const targetX = pointer.x * 2.8;
    const targetY = pointer.y * 2.8;

    // Animate nodes with dynamic harmonic drift & cursor responsiveness
    for (let i = 0; i < nodeCount; i++) {
      const idx = i * 3;
      const offset = i * 0.25;

      // Noticeable 3D harmonic movement
      currentPointPos[idx] = initialPositions[idx] + Math.sin(time * 0.65 + offset) * 0.38;
      currentPointPos[idx + 1] = initialPositions[idx + 1] + Math.cos(time * 0.55 + offset) * 0.32;
      currentPointPos[idx + 2] = initialPositions[idx + 2] + Math.sin(time * 0.45 + offset) * 0.26;

      // Cursor gravity / repulsion
      const dx = targetX - currentPointPos[idx];
      const dy = targetY - currentPointPos[idx + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3.5) {
        const force = (3.5 - dist) * 0.035;
        currentPointPos[idx] += dx * force;
        currentPointPos[idx + 1] += dy * force;
      }
    }
    pointPosAttr.needsUpdate = true;

    // Update hub positions
    if (hubPointsRef.current) {
      const hubPosAttr = hubPointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const currentHubPos = hubPosAttr.array as Float32Array;
      for (let h = 0; h < hubIndices.length; h++) {
        const nodeIdx = hubIndices[h] * 3;
        currentHubPos[h * 3] = currentPointPos[nodeIdx];
        currentHubPos[h * 3 + 1] = currentPointPos[nodeIdx + 1];
        currentHubPos[h * 3 + 2] = currentPointPos[nodeIdx + 2];
      }
      hubPosAttr.needsUpdate = true;
    }

    // Update DAG connecting line segments
    let lineIdx = 0;
    for (let c = 0; c < connections.length; c++) {
      const [from, to] = connections[c];
      const fromIdx = from * 3;
      const toIdx = to * 3;

      // Vertex 1
      currentLinePos[lineIdx++] = currentPointPos[fromIdx];
      currentLinePos[lineIdx++] = currentPointPos[fromIdx + 1];
      currentLinePos[lineIdx++] = currentPointPos[fromIdx + 2];

      // Vertex 2
      currentLinePos[lineIdx++] = currentPointPos[toIdx];
      currentLinePos[lineIdx++] = currentPointPos[toIdx + 1];
      currentLinePos[lineIdx++] = currentPointPos[toIdx + 2];
    }
    linePosAttr.needsUpdate = true;

    // Update traveling signal pulses along lines
    if (pulsesRef.current) {
      const pulseAttr = pulsesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const currentPulsePos = pulseAttr.array as Float32Array;

      for (let c = 0; c < connections.length; c++) {
        const [from, to] = connections[c];
        const fromIdx = from * 3;
        const toIdx = to * 3;

        // Progress fraction (0 to 1) based on time and connection offset
        const progress = ((time * 0.8 + c * 0.15) % 1.0);

        currentPulsePos[c * 3] = currentPointPos[fromIdx] + (currentPointPos[toIdx] - currentPointPos[fromIdx]) * progress;
        currentPulsePos[c * 3 + 1] = currentPointPos[fromIdx + 1] + (currentPointPos[toIdx + 1] - currentPointPos[fromIdx + 1]) * progress;
        currentPulsePos[c * 3 + 2] = currentPointPos[fromIdx + 2] + (currentPointPos[toIdx + 2] - currentPointPos[fromIdx + 2]) * progress;
      }
      pulseAttr.needsUpdate = true;
    }

    // Gentle global orbit rotation
    pointsRef.current.rotation.y = time * 0.04;
    linesRef.current.rotation.y = time * 0.04;
    if (hubPointsRef.current) hubPointsRef.current.rotation.y = time * 0.04;
    if (pulsesRef.current) pulsesRef.current.rotation.y = time * 0.04;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Standard DAG Nodes */}
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
          size={0.11}
          color="#818CF8" // Refined Indigo-400
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Prominent High-Compute Hub Nodes */}
      <points ref={hubPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={hubIndices.length}
            array={hubPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.22}
          color="#00F5D4" // Vibrant Synapse Cyan
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Traveling Signal Pulse Packets */}
      <points ref={pulsesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length}
            array={pulsePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          color="#E2B86B" // Champagne Gold Pulse
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Connecting DAG Hairline Synapse Edges */}
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
          color="#6366F1"
          transparent
          opacity={0.35} // Visibly noticeable hairline connections
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// 3D Spatial Dot-Matrix Wave (Topological Embedding Manifold)
export function SpatialDotMatrix({ cols = 38, rows = 38, sep = 0.42 }: { cols?: number; rows?: number; sep?: number }) {
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
        const y = -2.2; // Elevation positioned for visible floor wave

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
        // Dynamic, clearly perceptible undulating sine waves
        const wave =
          Math.sin(x * 0.55 + time * 1.3) * Math.cos(z * 0.55 + time * 1.0) * 0.55 +
          Math.sin((x + z) * 0.35 + time * 0.8) * 0.25;
        array[i + 1] = initialPositions[i + 1] + wave;
        i += 3;
      }
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={pointsRef} rotation={[-0.35, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#6366F1" // Indigo
        transparent
        opacity={0.65} // Clearly visible dot-matrix wave
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
