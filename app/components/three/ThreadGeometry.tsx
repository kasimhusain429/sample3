"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { TubeGeometry, MeshStandardMaterial, CatmullRomCurve3, Vector3, Mesh } from "three";

export default function ThreadGeometry() {
  const meshRef = useRef<Mesh>(null);

  // Simple placeholder curve
  const curve = new CatmullRomCurve3([
    new Vector3(-10, 5, -5),
    new Vector3(-5, -2, -2),
    new Vector3(0, 0, 0),
    new Vector3(5, 2, -2),
    new Vector3(10, -5, -5),
  ]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, 64, 0.05, 8, false]} />
      <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} emissive="#d4af37" emissiveIntensity={0.2} />
    </mesh>
  );
}
