"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Star } from "lucide-react";
import ThreeCanvas from "../three/ThreeCanvas";
import { Group } from "three";

const reviews = [
  {
    name: "Sony Kumari",
    service: "Blouse stitching",
    rating: 5,
    text: "I had a really great experience... They made the whole process very easy by coming directly to the restaurant...",
  },
  {
    name: "Manshi Singh",
    service: "Bridal Lehenga",
    rating: 5,
    text: "From the moment I walked in, the staff was welcoming, professional, and attentive...",
  },
  {
    name: "Asha Pandey",
    service: "Alterations",
    rating: 5,
    text: "The staff was professional, gave great style advice, and delivered exactly on time...",
  },
  {
    name: "Priya Sharma",
    service: "Custom Suit",
    rating: 5,
    text: "Excellent stitching and perfect fitting... reasonable prices and fast service...",
  }
];

function CylinderCarousel() {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  const radius = 4;
  const responsiveScale = Math.min(1, viewport.width / 10);

  return (
    <group ref={groupRef} position={[0, 0, -2]} scale={responsiveScale}>
      {reviews.map((review, i) => {
        const angle = (i / reviews.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <group
            key={i}
            position={[x, 0, z]}
            rotation={[0, angle, 0]}
          >
            <Html
              transform
              occlude
              center
              onPointerEnter={() => setHovered(true)}
              onPointerLeave={() => setHovered(false)}
            >
              <div className="w-80 glass-panel p-6 rounded-xl cursor-grab active:cursor-grabbing hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center border border-gold/50">
                    <span className="text-gold font-display text-xl">{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="text-cream font-medium">{review.name}</h4>
                    <span className="text-xs text-gold/80 px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20 mt-1 inline-block">
                      {review.service}
                    </span>
                  </div>
                </div>

                <div className="flex text-gold mb-3">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} size={14} fill="currentColor" />
                  ))}
                </div>

                <p className="text-sand text-sm font-display italic leading-relaxed">
                  "{review.text}"
                </p>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative h-screen bg-warm-void overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none text-center w-full">
        <h3 className="text-gold tracking-[0.2em] uppercase text-sm mb-4 font-medium">Voices of Trust</h3>
        <h2 className="text-display-md text-cream">Client Testimonials</h2>
      </div>

      <div className="absolute inset-0 mt-48 pointer-events-auto cursor-grab active:cursor-grabbing">
        <ThreeCanvas>
          <CylinderCarousel />
          {/* Dust particles placeholder */}
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array(300).map(() => (Math.random() - 0.5) * 20), 3]}
              />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#d4af37" transparent opacity={0.5} />
          </points>
        </ThreeCanvas>
      </div>
    </section>
  );
}
