'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';

export function NeuralCore() {
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  // Synaptic pulsating material uniforms or values
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x = time * 0.15;
      outerMeshRef.current.rotation.y = time * 0.22;
      // Pulse scale subtly
      const scale = 1 + Math.sin(time * 2.2) * 0.04;
      outerMeshRef.current.scale.set(scale, scale, scale);
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = -time * 0.35;
      innerMeshRef.current.rotation.y = -time * 0.45;
      innerMeshRef.current.rotation.z = time * 0.2;
      const innerScale = 0.85 + Math.sin(time * 3.5) * 0.06;
      innerMeshRef.current.scale.set(innerScale, innerScale, innerScale);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.5) * 0.2;
      ring1Ref.current.rotation.y = time * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -Math.PI / 4 + Math.cos(time * 0.4) * 0.2;
      ring2Ref.current.rotation.z = time * 0.25;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = Math.PI / 2 + Math.sin(time * 0.6) * 0.2;
      ring3Ref.current.rotation.x = time * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <group position={[0, 0, 0]}>
        {/* Outer Iridescent Physical Shell */}
        <mesh ref={outerMeshRef} castShadow receiveShadow>
          <icosahedronGeometry args={[1.5, 3]} />
          <meshPhysicalMaterial
            roughness={0.15}
            metalness={0.2}
            transmission={0.88}
            ior={1.6}
            thickness={1.8}
            transparent={true}
            opacity={0.85}
            color="#00F5D4"
            emissive="#7B2CBF"
            emissiveIntensity={0.25}
            wireframe={false}
          />
        </mesh>

        {/* Inner Glowing Wireframe Core (Neural Synaptic Node) */}
        <mesh ref={innerMeshRef}>
          <octahedronGeometry args={[1.1, 2]} />
          <meshStandardMaterial
            color="#00F5D4"
            emissive="#00F5D4"
            emissiveIntensity={1.5}
            wireframe={true}
            wireframeLinewidth={1.5}
          />
        </mesh>

        {/* Core Singularity Point */}
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#E2B86B" />
        </mesh>

        {/* Orbital Neural Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.0, 0.015, 16, 100]} />
          <meshBasicMaterial color="#00F5D4" transparent opacity={0.6} />
        </mesh>

        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.3, 0.012, 16, 100]} />
          <meshBasicMaterial color="#7B2CBF" transparent opacity={0.5} />
        </mesh>

        <mesh ref={ring3Ref}>
          <torusGeometry args={[2.6, 0.01, 16, 100]} />
          <meshBasicMaterial color="#E2B86B" transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

// Synaptic Particle Field reacting to pointer
export function SynapticParticles({ count = 350 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate initial particle coordinates and velocities
  const [positions, originalPositions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Spread across a 3D sphere/ellipsoid volume
      const radius = 3.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = (Math.random() - 0.5) * 8;

      pos[idx] = x;
      pos[idx + 1] = y;
      pos[idx + 2] = z;

      orig[idx] = x;
      orig[idx + 1] = y;
      orig[idx + 2] = z;

      vel[idx] = (Math.random() - 0.5) * 0.01;
      vel[idx + 1] = (Math.random() - 0.5) * 0.01;
      vel[idx + 2] = (Math.random() - 0.5) * 0.01;
    }

    return [pos, orig, vel];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const { pointer, clock } = state;
    const time = clock.getElapsedTime();
    const positionAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const currentPositions = positionAttr.array as Float32Array;

    // Pointer 3D projection
    const targetX = pointer.x * 4.5;
    const targetY = pointer.y * 4.5;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Natural organic drift
      currentPositions[idx] = originalPositions[idx] + Math.sin(time * 0.8 + i) * 0.35;
      currentPositions[idx + 1] = originalPositions[idx + 1] + Math.cos(time * 0.6 + i) * 0.35;
      currentPositions[idx + 2] = originalPositions[idx + 2] + Math.sin(time * 0.4 + i * 0.5) * 0.25;

      // Cursor interaction: gravitation towards cursor
      const dx = targetX - currentPositions[idx];
      const dy = targetY - currentPositions[idx + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 4.0) {
        const force = (4.0 - dist) * 0.035;
        currentPositions[idx] += dx * force;
        currentPositions[idx + 1] += dy * force;
      }
    }

    positionAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#00F5D4"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
