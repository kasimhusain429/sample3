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
    service: "Blouse Stitching",
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
  },
];

const cardThemes = [
  {
    cardBg: "rgba(109, 30, 55, 0.85)",
    avatarBg: "rgba(250, 246, 240, 0.15)",
    avatarBorder: "rgba(250, 246, 240, 0.3)",
    avatarText: "#FAF6F0",
    tagBg: "rgba(250, 246, 240, 0.1)",
    tagBorder: "rgba(250, 246, 240, 0.2)",
    tagText: "#FAF6F0",
    cardBorder: "rgba(250, 246, 240, 0.2)",
    nameText: "#FAF6F0",
    reviewText: "rgba(250, 246, 240, 0.85)",
    starColor: "#B8883A",
  },
  {
    cardBg: "rgba(46, 31, 20, 0.85)",
    avatarBg: "rgba(184, 136, 58, 0.15)",
    avatarBorder: "rgba(184, 136, 58, 0.4)",
    avatarText: "#B8883A",
    tagBg: "rgba(184, 136, 58, 0.1)",
    tagBorder: "rgba(184, 136, 58, 0.25)",
    tagText: "#B8883A",
    cardBorder: "rgba(184, 136, 58, 0.2)",
    nameText: "#FAF6F0",
    reviewText: "rgba(250, 246, 240, 0.85)",
    starColor: "#B8883A",
  },
  {
    cardBg: "rgba(181, 83, 60, 0.85)",
    avatarBg: "rgba(250, 246, 240, 0.15)",
    avatarBorder: "rgba(250, 246, 240, 0.3)",
    avatarText: "#FAF6F0",
    tagBg: "rgba(250, 246, 240, 0.1)",
    tagBorder: "rgba(250, 246, 240, 0.2)",
    tagText: "#FAF6F0",
    cardBorder: "rgba(250, 246, 240, 0.2)",
    nameText: "#FAF6F0",
    reviewText: "rgba(250, 246, 240, 0.9)",
    starColor: "#FAF6F0",
  },
  {
    cardBg: "rgba(140, 100, 60, 0.85)",
    avatarBg: "rgba(250, 246, 240, 0.15)",
    avatarBorder: "rgba(250, 246, 240, 0.3)",
    avatarText: "#FAF6F0",
    tagBg: "rgba(250, 246, 240, 0.1)",
    tagBorder: "rgba(250, 246, 240, 0.2)",
    tagText: "#FAF6F0",
    cardBorder: "rgba(250, 246, 240, 0.2)",
    nameText: "#FAF6F0",
    reviewText: "rgba(250, 246, 240, 0.9)",
    starColor: "#FAF6F0",
  },
];

function CylinderCarousel() {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y += delta * 0.18;
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
        const theme = cardThemes[i % cardThemes.length];

        return (
          <group key={i} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <Html transform center onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
              <div className="w-80 h-64 p-6 rounded-2xl cursor-grab active:cursor-grabbing hover:scale-[1.02] transition-transform duration-300 flex flex-col" style={{
                background: theme.cardBg,
                backdropFilter: "blur(20px) saturate(1.4)",
                border: `1px solid ${theme.cardBorder}`,
                boxShadow: "0 8px 40px rgba(28, 20, 16, 0.12)",
              }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 shrink-0" style={{ background: theme.avatarBg, borderColor: theme.avatarBorder }}>
                    <span className="font-display text-xl" style={{ color: theme.avatarText, fontWeight: 400 }}>
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium" style={{ color: theme.nameText }}>{review.name}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block font-medium" style={{
                      background: theme.tagBg,
                      border: `1px solid ${theme.tagBorder}`,
                      color: theme.tagText,
                    }}>
                      {review.service}
                    </span>
                  </div>
                </div>

                <div className="flex mb-3" style={{ color: theme.starColor }}>
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} size={14} fill="currentColor" />
                  ))}
                </div>

                <p className="text-sm italic leading-relaxed font-display flex-1 overflow-hidden" style={{ color: theme.reviewText }}>
                  &ldquo;{review.text}&rdquo;
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
    <section id="testimonials" className="relative h-screen bg-aged-linen overflow-hidden flex flex-col items-center justify-center">
      {/* Top fade from silk */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-silk to-transparent z-10 pointer-events-none" />

      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none text-center w-full">
        <span className="label-overline text-antique-gold block mb-4">Voices of Trust</span>
        <h2
          className="text-display-md text-espresso font-display"
          style={{ fontWeight: 300 }}
        >
          Client <em className="text-wine not-italic">Testimonials</em>
        </h2>
      </div>

      <div className="absolute inset-0 mt-48 pointer-events-auto cursor-grab active:cursor-grabbing">
        <ThreeCanvas className="pointer-events-auto">
          <CylinderCarousel />
          {/* Warm particle dust */}
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array(300).map(() => (Math.random() - 0.5) * 20), 3]}
              />
            </bufferGeometry>
            <pointsMaterial size={0.04} color="#B8883A" transparent opacity={0.35} />
          </points>
        </ThreeCanvas>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-aged-linen to-transparent z-10 pointer-events-none" />
    </section>
  );
}
