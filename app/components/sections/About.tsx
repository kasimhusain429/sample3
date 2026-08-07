"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function About() {
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 75%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-warm-void" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity animate-[slowZoom_30s_ease-in-out_infinite_alternate]" 
        style={{ backgroundImage: 'url(/images/about_bg.png)' }} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-transparent" />
      
      <div ref={textRef} className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <h3 className="text-gold tracking-[0.2em] uppercase text-sm mb-6 font-medium">The Hands Behind the Thread</h3>
        <h2 className="text-display-md text-cream mb-10 leading-tight">A Family of Artisans</h2>
        
        <p className="text-body-lg text-sand leading-relaxed mb-16">
          What began as a small tailoring corner in Palika Bazar has grown into Jaipur's most trusted boutique studio. 
          Our team of master tailors brings together generations of Rajasthani craftsmanship with contemporary design sensibilities. 
          We don't just stitch garments — <span className="text-cream font-medium italic">we weave dreams.</span>
        </p>
        
        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { id: 1, name: "Ram Singh", role: "Master Cutter", img: "/images/craft_bg.png" },
            { id: 2, name: "Anita Devi", role: "Lead Artisan", img: "/images/about_bg.png" },
            { id: 3, name: "Prakash Tailor", role: "Finishing Expert", img: "/images/hero_bg.png" }
          ].map((artisan) => (
            <div key={artisan.id} className="flex flex-col items-center group">
              <div 
                className="w-48 h-64 rounded-full overflow-hidden border-2 border-gold/20 mb-6 relative bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${artisan.img})` }}
              >
                <div className="absolute inset-0 bg-void/20 group-hover:bg-void/0 transition-colors duration-500" />
              </div>
              <h4 className="text-xl font-display text-cream mb-1">{artisan.name}</h4>
              <p className="text-gold text-sm">{artisan.role}</p>
            </div>
          ))}
        </div>
        
        <div className="inline-block relative">
          <span className="font-script text-5xl text-gold/80 block">Siddh Laxmi Studio</span>
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
