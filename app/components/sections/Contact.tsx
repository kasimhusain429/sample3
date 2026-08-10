"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import ThreeCanvas from "../three/ThreeCanvas";
import { MapPin, Phone, Clock, Navigation2, MessageCircle } from "lucide-react";
import { Mesh } from "three";

function MapPinPlaceholder() {
  const pinRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (pinRef.current) {
      pinRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.2 + 1;
    }
    if (ringRef.current) {
      const scale = (state.clock.getElapsedTime() % 2) * 2;
      const opacity = 1 - scale / 2;
      ringRef.current.scale.set(scale, scale, scale);
      (ringRef.current.material as any).opacity = Math.max(0, opacity);
    }
  });

  return (
    <group position={[2, 0, 0]}>
      {/* Terrain — warm aged-linen tone */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[10, 10, 32, 32]} />
        <meshStandardMaterial color="#D9CFC5" wireframe />
      </mesh>

      {/* Animated Pin — wine/terracotta */}
      <mesh ref={pinRef}>
        <coneGeometry args={[0.3, 1, 16]} />
        <meshStandardMaterial
          color="#6D1E37"
          metalness={0.5}
          roughness={0.4}
          emissive="#B5533C"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Pulse Ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <ringGeometry args={[0.3, 0.4, 32]} />
        <meshBasicMaterial color="#B8883A" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen bg-parchment relative flex flex-col justify-center py-20">
      {/* Top fade */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-aged-linen to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Content */}
        <div className="md:col-span-6 lg:col-span-5">
          <span className="label-overline text-antique-gold block mb-5">Visit Us</span>

          <h2
            className="text-display-md text-espresso mb-5 leading-tight font-display"
            style={{ fontWeight: 300 }}
          >
            Let&rsquo;s Create<br />
            <em className="text-wine not-italic">Something Beautiful</em>
          </h2>

          <p className="text-stone mb-10 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse inline-block" />
            Walk-ins welcome · Appointments preferred
          </p>

          <div className="space-y-5 mb-12">
            {/* Address */}
            <div className="glass-panel p-6 rounded-2xl flex items-start gap-4 hover:border-antique-gold/40 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-wine/20 transition-colors">
                <MapPin className="text-wine" size={20} />
              </div>
              <div>
                <h4 className="text-espresso font-medium mb-1 text-sm">Visit Our Studio</h4>
                <p className="text-stone text-sm leading-relaxed">
                  Shop No. 131, Palika Bazar, Near Balaji Mandir,<br />
                  Sector 9, Malviya Nagar, Jaipur, Rajasthan 302017
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <a
                href="tel:+919571542617"
                className="glass-panel p-5 rounded-2xl flex items-center gap-3 hover:border-antique-gold/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-antique-gold/10 flex items-center justify-center group-hover:bg-antique-gold/20 transition-colors">
                  <Phone className="text-antique-gold" size={20} />
                </div>
                <div>
                  <h4 className="text-espresso font-medium text-sm mb-0.5">Call Us</h4>
                  <p className="text-stone text-xs">+91 95715 42617</p>
                </div>
              </a>

              <div className="glass-panel p-5 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dusty-rose/10 flex items-center justify-center">
                  <Clock className="text-dusty-rose" size={20} />
                </div>
                <div>
                  <h4 className="text-espresso font-medium text-sm mb-0.5">Hours</h4>
                  <p className="text-stone text-xs">Mon–Sat: 11am – 7pm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 px-6 py-4 bg-terracotta text-ivory font-medium rounded-sm hover:bg-terracotta-light transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-terracotta/20 hover:shadow-terracotta/35 hover:-translate-y-0.5">
              <Navigation2 size={18} /> Get Directions
            </button>
            <button className="flex-1 px-6 py-4 border-2 border-wine text-wine font-medium rounded-sm hover:bg-wine hover:text-ivory transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5">
              <MessageCircle size={18} /> WhatsApp
            </button>
          </div>
        </div>

        {/* Right 3D Map Area */}
        <div className="md:col-span-6 lg:col-span-7 h-[60vh] md:h-screen absolute md:relative inset-0 md:inset-auto -z-10 md:z-0 opacity-20 md:opacity-100">
          <ThreeCanvas>
            <MapPinPlaceholder />
          </ThreeCanvas>
        </div>

      </div>
    </section>
  );
}
