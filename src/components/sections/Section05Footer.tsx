'use client';
import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';

// --- Data ---
const TESTIMONIALS = [
  { pos: [3.5, 2.5, 3.5] as [number, number, number], title: "Tech CEO", quote: "They secured our penthouse off-market in 48 hours. Unmatched discretion." },
  { pos: [-4.5, 1.5, 2.5] as [number, number, number], title: "Investment Group", quote: "The only brokerage that truly understands the intersection of architecture and value." },
  { pos: [1.5, -3.5, 4.5] as [number, number, number], title: "International Buyer", quote: "Seamless, elegant, and highly professional from the first viewing to closing." },
  { pos: [-2.5, 3.5, -3.5] as [number, number, number], title: "Developer", quote: "Their market authority is undeniable. UrbanNest dictates the trends." },
  { pos: [4.5, -1.5, -2.5] as [number, number, number], title: "Private Family Office", quote: "A completely bespoke experience. They redefine luxury real estate." },
];

// --- WebGL Components ---
function GlobeParticles({ count = 3000, radius = 6 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Generate points on a sphere surface
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const sinPhi = Math.sin(phi);
      const x = radius * sinPhi * Math.cos(theta);
      const y = radius * sinPhi * Math.sin(theta);
      const z = radius * Math.cos(phi);

      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }
    return p;
  }, [count, radius]);

  return (
    <Points positions={points}>
      <PointMaterial 
        transparent 
        color="#888888" 
        size={0.03} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.4}
      />
    </Points>
  );
}

function HotspotNode({ 
  pos, 
  title, 
  quote, 
  onHover 
}: { 
  pos: [number, number, number], 
  title: string, 
  quote: string, 
  onHover: (hovered: boolean) => void 
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={pos}>
      {/* 3D Glowing Core */}
      <mesh 
        onPointerOver={() => { setHovered(true); onHover(true); }}
        onPointerOut={() => { setHovered(false); onHover(false); }}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#ffffff" : "#d4af37"} />
      </mesh>
      
      {/* Outer Glow */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={hovered ? 0.4 : 0.15} />
      </mesh>

      {/* HTML Testimonial Card */}
      <Html zIndexRange={[100, 0]} className="pointer-events-none">
        <div 
          className={`absolute left-4 top-4 w-64 p-6 bg-[#050505]/80 backdrop-blur-xl border transition-all duration-500 origin-top-left ${
            hovered 
              ? 'opacity-100 scale-100 border-[#d4af37]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
              : 'opacity-0 scale-75 border-white/5 shadow-none'
          }`}
        >
          <div className="text-[#d4af37] font-sans text-[10px] tracking-[0.2em] uppercase mb-3">
            {title}
          </div>
          <div className="text-[var(--color-cream)] font-display text-lg leading-snug">
            &quot;{quote}&quot;
          </div>
        </div>
      </Html>
    </group>
  );
}

function NetworkGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotationSpeed = useRef(0.001);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smoothly interpolate rotation speed (slows down on hover)
      groupRef.current.rotation.y += targetRotationSpeed.current;
      groupRef.current.rotation.x += targetRotationSpeed.current * 0.3;
    }
  });

  const handleHover = (hovered: boolean) => {
    // We use a GSAP-like approach but simple lerp or just set target is fine
    // Since we are in useFrame, setting target speed is easiest.
    // For simplicity, we just snap the target speed.
    targetRotationSpeed.current = hovered ? 0.0001 : 0.001;
  };

  return (
    <group ref={groupRef} rotation={[0.2, 0, 0]}>
      <GlobeParticles />
      {TESTIMONIALS.map((t, i) => (
        <HotspotNode 
          key={i} 
          pos={t.pos} 
          title={t.title} 
          quote={t.quote} 
          onHover={handleHover} 
        />
      ))}
    </group>
  );
}

// --- Main Section Component ---
export default function Section05Footer() {
  return (
    <section className="relative w-full h-screen bg-[#030303] overflow-hidden flex flex-col justify-between">
      
      {/* Massive Header Overlay */}
      <div className="absolute top-24 left-0 w-full z-10 pointer-events-none px-6 md:px-12 text-center">
        <h2 className="text-[var(--color-cream)] font-display text-4xl md:text-6xl mb-4 text-shadow-xl">
          The Living Network
        </h2>
        <p className="text-[var(--color-sand)] font-sans text-sm tracking-[0.2em] uppercase">
          An Interconnected Web of Elite Clients
        </p>
      </div>

      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <fog attach="fog" args={['#030303', 10, 25]} />
          <ambientLight intensity={0.5} />
          <NetworkGlobe />
        </Canvas>
      </div>

      {/* The Footer Overlay */}
      <div className="absolute bottom-0 left-0 w-full z-10 px-6 md:px-12 pb-8 pt-24 bg-gradient-to-t from-[#030303] to-transparent pointer-events-auto">
        
        {/* Contact CTA */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center mb-20">
           <a 
            href="mailto:contact@urbannest.com"
            className="flex items-center gap-4 text-[var(--color-cream)] hover:text-[#d4af37] font-sans text-sm tracking-[0.2em] uppercase transition-colors group cursor-pointer"
          >
            <span>Initiate Your Search</span>
            <div className="w-12 h-[1px] bg-current relative overflow-hidden group-hover:w-16 transition-all duration-500" />
          </a>
        </div>

        {/* Minimal Footer */}
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8">
          <div className="text-[var(--color-sand)] font-sans text-xs tracking-[0.2em] uppercase">
            © 2026 UrbanNest Brokerage
          </div>
          <div className="flex gap-8">
            {['Instagram', 'LinkedIn', 'Twitter'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-[var(--color-cream)] hover:text-[#d4af37] font-sans text-xs tracking-[0.2em] uppercase transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
          <div className="flex gap-8 text-[var(--color-sand)] font-sans text-xs tracking-[0.2em] uppercase">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
      
    </section>
  );
}
