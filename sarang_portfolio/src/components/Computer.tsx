'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import Terminal from './Terminal';

export default function Computer() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (Math.sin(t / 4) / 10), 0.1);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, (Math.cos(t / 4) / 20), 0.1);
  });

  return (
    <group ref={group}>
      {/* Computer Case */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 3]} />
        <meshStandardMaterial color="#222" roughness={0.5} />
      </mesh>

      {/* Screen Area */}
      <mesh position={[0, 0.6, 1.51]}>
        <planeGeometry args={[3.5, 2.3]} />
        <meshStandardMaterial color="#000" emissive="#000" />
      </mesh>

      {/* Keyboard Base */}
      <mesh position={[0, -0.7, 1.5]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.5, 2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>

      {/* Screen Content */}
      <Html
        transform
        distanceFactor={2.5}
        position={[0, 0.6, 1.52]}
        className="select-none"
      >
        <div className="w-[800px] h-[520px] bg-black overflow-hidden border-4 border-[#333] rounded-sm relative">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,255,65,0.05)_0%,rgba(0,0,0,0)_100%)]" />
          <Terminal />
        </div>
      </Html>

      {/* Retro Text on Base */}
      <Text
        position={[0, -0.7, 2.51]}
        fontSize={0.15}
        color="#444"
      >
        SARANG-8296
      </Text>
    </group>
  );
}
