'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, useScroll } from '@react-three/drei';
import * as THREE from 'three';

function BlueprintHouse() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Parallax floating based on mouse position
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    
    groupRef.current.rotation.y += 0.02 * (targetX - groupRef.current.rotation.y);
    groupRef.current.rotation.x += 0.02 * (-targetY - groupRef.current.rotation.x);
    
    // Gentle bobbing
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Main Base */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[4, 2, 3]} />
        <meshBasicMaterial transparent opacity={0.05} color="#E6D7C3" />
        <Edges scale={1} threshold={15} color="#D96C5B" />
      </mesh>
      
      {/* Upper Level */}
      <mesh position={[-0.5, 0.5, 0]}>
        <boxGeometry args={[3, 1, 3]} />
        <meshBasicMaterial transparent opacity={0.05} color="#E6D7C3" />
        <Edges scale={1} threshold={15} color="#E6D7C3" />
      </mesh>

      {/* Cantilever/Balcony */}
      <mesh position={[1.5, 0, 0.5]}>
        <boxGeometry args={[2, 0.2, 2]} />
        <meshBasicMaterial transparent opacity={0.05} color="#E6D7C3" />
        <Edges scale={1} threshold={15} color="#D96C5B" />
      </mesh>
    </group>
  );
}

export default function InteractiveBlueprint() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-auto">
      <Canvas camera={{ position: [5, 3, 5], fov: 45 }}>
        <color attach="background" args={['#1E392A']} />
        <ambientLight intensity={1} />
        <BlueprintHouse />
      </Canvas>
    </div>
  );
}
