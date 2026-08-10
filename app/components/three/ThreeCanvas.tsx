"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

export default function ThreeCanvas({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 z-0 ${className.includes('pointer-events-auto') ? '' : 'pointer-events-none'} ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {children}
        <Preload all />
      </Canvas>
    </div>
  );
}
