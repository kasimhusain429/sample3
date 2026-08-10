"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, Vector3, Mesh, Group } from "three";
import { Float, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function ThreadGeometry() {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const mesh2Ref = useRef<Mesh>(null);

  // Primary sweeping curve (made slightly thicker and longer for dramatic silk effect)
  const curve1 = new CatmullRomCurve3([
    new Vector3(-14, 6, -8),
    new Vector3(-6, -2, -3),
    new Vector3(0, 2, 0),
    new Vector3(7, 4, -4),
    new Vector3(14, -5, -7),
  ]);

  // Secondary crossing curve for depth
  const curve2 = new CatmullRomCurve3([
    new Vector3(-12, -4, -5),
    new Vector3(-4, 3, -2),
    new Vector3(2, -2, 1),
    new Vector3(9, 5, -3),
    new Vector3(13, 2, -6),
  ]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    // Magnetic mouse tracking - smooth lerping towards cursor
    if (groupRef.current) {
      // state.pointer is normalized (-1 to +1)
      const targetRotationY = (state.pointer.x * Math.PI) / 6; 
      const targetRotationX = -(state.pointer.y * Math.PI) / 8;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 2 * delta);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 2 * delta);
    }

    // Slow, elegant continuous rotation of the individual threads
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.05;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.y = -t * 0.04;
      mesh2Ref.current.rotation.z = Math.sin(t * 0.15) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Primary silk ribbon — antique gold */}
        <mesh ref={meshRef}>
          <tubeGeometry args={[curve1, 100, 0.08, 16, false]} />
          <MeshWobbleMaterial
            factor={0.4}
            speed={1.2}
            color="#B8883A"
            metalness={0.9}
            roughness={0.15}
            emissive="#C4788A"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Secondary silk ribbon — warm rose */}
        <mesh ref={mesh2Ref}>
          <tubeGeometry args={[curve2, 90, 0.05, 16, false]} />
          <MeshWobbleMaterial
            factor={0.6}
            speed={1.5}
            color="#D4A84B"
            metalness={0.8}
            roughness={0.2}
            emissive="#B8883A"
            emissiveIntensity={0.35}
          />
        </mesh>
      </group>
    </Float>
  );
}
