'use client';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CityMap from '@/components/canvas/CityMap';

gsap.registerPlugin(ScrollTrigger);

export default function Section03Urban() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);

  useGSAP(() => {
    // Pin the section and track scroll progress to pass to the 3D canvas
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      }
    });

    // Animate the text overlay
    gsap.fromTo(textRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'top top',
          scrub: 1
        }
      }
    );

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#050505] overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <CityMap scrollProgressRef={scrollProgressRef} />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
        
        {/* Top Header */}
        <div ref={textRef} className="absolute top-[10%] left-[5%] md:left-[10%] max-w-xl z-20 pointer-events-none">
          <span className="text-orange-500 font-sans text-xs tracking-[0.2em] uppercase block mb-2">Market Authority</span>
          <h2 className="text-[var(--color-cream)] font-display text-4xl md:text-5xl tracking-tight leading-none mb-4 mix-blend-difference">
            Mastering the<br/>Urban Landscape
          </h2>
          <p className="text-[var(--color-cream)]/70 font-sans text-sm md:text-base tracking-wide max-w-sm mix-blend-difference">
            With over $2B in closed transactions across 150+ neighborhoods, we don't just sell homes—we shape the market.
          </p>
        </div>

        {/* Scroll Instruction */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse pointer-events-none z-20">
          <span className="text-[var(--color-cream)]/50 text-xs tracking-widest uppercase font-sans">Hover Markers</span>
        </div>

      </div>
    </section>
  );
}
