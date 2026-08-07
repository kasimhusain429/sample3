"use client";

import { useEffect, useRef } from "react";
import { initGSAP } from "@/lib/animations";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ThreeCanvas from "../three/ThreeCanvas";
import ThreadGeometry from "../three/ThreadGeometry";
import { Star } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      initGSAP();
      
      // Simple text reveal animation
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
        );
      }
      
      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power2.out" }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="hero" className="relative md:min-h-[150vh] min-h-screen bg-void">
      <div className="md:sticky md:top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
            style={{ backgroundImage: 'url(/images/hero_bg.png)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
        </div>

        {/* 3D Background */}
        <ThreeCanvas className="opacity-80">
          <ThreadGeometry />
          <fog attach="fog" args={["#0a0a0a", 5, 25]} />
        </ThreeCanvas>

        {/* Content Overlay */}
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 h-full items-center pointer-events-none">
          
          <div className="md:col-span-8 md:col-start-2 pt-20 pointer-events-auto">
            <h1 ref={textRef} className="text-display-lg text-cream mb-6 leading-tight max-w-4xl font-display opacity-0">
              Where Every Stitch Tells a Story
            </h1>
            
            <p ref={subtextRef} className="text-body-lg text-muted-gold mb-8 tracking-wide font-light opacity-0">
              Premium Boutique & Tailoring — Jaipur
            </p>
            
            <div className="flex items-center gap-2 mb-10 bg-warm-void/50 backdrop-blur-sm px-4 py-2 rounded-full inline-flex border border-gold/20">
              <span className="text-cream font-medium text-sm">5.0</span>
              <div className="flex text-gold">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="text-sand text-xs ml-1">(286 Reviews)</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
              <a href="#contact" className="px-8 py-4 bg-gold/10 text-gold border border-gold/30 rounded-sm hover:bg-gold hover:text-void transition-all duration-300 font-medium">
                Book Consultation
              </a>
              <a href="#portfolio" className="text-cream hover:text-gold transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
                Explore Our Work <span className="text-gold">→</span>
              </a>
            </div>
          </div>
          
          <div className="absolute bottom-12 right-12 flex flex-col items-center gap-2 pointer-events-auto">
            <span className="text-xs text-sand uppercase tracking-widest rotate-90 origin-bottom mb-12">Scroll</span>
            <div className="w-[1px] h-16 bg-gold/30 relative overflow-hidden">
              <div className="w-full h-full bg-gold absolute top-0 left-0 animate-[scrollDown_2s_ease-in-out_infinite]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
