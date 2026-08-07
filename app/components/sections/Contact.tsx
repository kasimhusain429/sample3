"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import ThreeCanvas from "../three/ThreeCanvas";
import { MapPin, Phone, MessageCircle, Clock, Navigation2 } from "lucide-react";
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
      const opacity = 1 - (scale / 2);
      ringRef.current.scale.set(scale, scale, scale);
      (ringRef.current.material as any).opacity = Math.max(0, opacity);
    }
  });

  return (
    <group position={[2, 0, 0]}>
      {/* Terrain Placeholder */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[10, 10, 32, 32]} />
        <meshStandardMaterial color="#12100e" wireframe />
      </mesh>
      
      {/* Animated Pin */}
      <mesh ref={pinRef}>
        <coneGeometry args={[0.3, 1, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} emissive="#d4af37" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Pulse Ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <ringGeometry args={[0.3, 0.4, 32]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen bg-void relative flex flex-col justify-center py-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="md:col-span-6 lg:col-span-5">
          <h2 className="text-display-md text-cream mb-4 leading-tight">Let's Create<br />Something Beautiful</h2>
          <p className="text-muted-gold mb-10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            Walk-ins welcome · Appointments preferred
          </p>
          
          <div className="space-y-6 mb-12">
            <div className="glass-panel p-6 rounded-xl flex items-start gap-4 hover:border-gold/50 transition-colors">
              <MapPin className="text-gold shrink-0 mt-1" size={24} />
              <div>
                <h4 className="text-cream font-medium mb-1">Visit Our Studio</h4>
                <p className="text-sand text-sm leading-relaxed">
                  Shop No. 131, Palika Bazar, Near Balaji Mandir, 
                  Sector 9, Malviya Nagar, Jaipur, Rajasthan 302017
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <a href="tel:+919571542617" className="glass-panel p-6 rounded-xl flex items-center gap-4 hover:border-gold/50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Phone className="text-gold" size={20} />
                </div>
                <div>
                  <h4 className="text-cream font-medium text-sm mb-0.5">Call Us</h4>
                  <p className="text-sand text-xs">+91 95715 42617</p>
                </div>
              </a>
              
              <div className="glass-panel p-6 rounded-xl flex items-center gap-4 hover:border-gold/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Clock className="text-gold" size={20} />
                </div>
                <div>
                  <h4 className="text-cream font-medium text-sm mb-0.5">Hours</h4>
                  <p className="text-sand text-xs">Mon–Sat: 11am – 7pm</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 px-6 py-4 bg-gold text-void font-medium rounded-sm hover:bg-cream transition-colors flex items-center justify-center gap-2">
              <Navigation2 size={18} /> Get Directions
            </button>
            <button className="flex-1 px-6 py-4 border border-gold text-gold font-medium rounded-sm hover:bg-gold/10 transition-colors flex items-center justify-center gap-2">
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
