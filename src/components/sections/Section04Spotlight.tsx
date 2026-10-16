'use client';
import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Define type for particle style
interface ParticleStyle {
  width: string;
  height: string;
  top: string;
  left: string;
  animation: string;
  animationDelay: string;
  opacity: number;
}

export default function Section04Spotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null); // For scroll parallax
  const bgMouseParallaxRef = useRef<HTMLDivElement>(null); // For mouse parallax
  
  const bloomRef = useRef<HTMLImageElement>(null);
  const shuttersRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const cardOuterRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null); // For mouse parallax
  
  // Text Refs for staggered animation
  const textEyebrowRef = useRef<HTMLSpanElement>(null);
  const textTitleRef = useRef<HTMLHeadingElement>(null);
  const textSpecsRef = useRef<HTMLDivElement>(null);

  // Client-side generated particles for hydration safety
  const [particles, setParticles] = useState<ParticleStyle[]>([]);

  useEffect(() => {
    setParticles([...Array(20)].map(() => ({
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animation: `float-up ${10 + Math.random() * 20}s linear infinite`,
      animationDelay: `-${Math.random() * 20}s`,
      opacity: Math.random() * 0.6
    })));
  }, []);

  // Mouse Parallax Logic
  useGSAP(() => {
    const xToBg = gsap.quickTo(bgMouseParallaxRef.current, "x", { duration: 0.2, ease: "power2.out" });
    const yToBg = gsap.quickTo(bgMouseParallaxRef.current, "y", { duration: 0.2, ease: "power2.out" });
    
    const xToCard = gsap.quickTo(cardInnerRef.current, "x", { duration: 0.3, ease: "power2.out" });
    const yToCard = gsap.quickTo(cardInnerRef.current, "y", { duration: 0.3, ease: "power2.out" });

    const handlePointerMove = (e: PointerEvent) => {
      // Use window innerWidth and innerHeight instead of getBoundingClientRect 
      // to prevent layout thrashing on every mouse move
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const x = (e.clientX / width) - 0.5; // -0.5 to 0.5
      const y = (e.clientY / height) - 0.5;

      // Background moves slightly opposite to mouse
      xToBg(x * -30);
      yToBg(y * -30);

      // Card moves slightly with mouse (creating 3D depth)
      xToCard(x * 20);
      yToCard(y * 20);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('pointermove', handlePointerMove, { passive: true });
      return () => section.removeEventListener('pointermove', handlePointerMove);
    }
  }, { scope: sectionRef });

  // Main Scroll Sequence
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%', // Extended scroll duration for full sequence
        pin: true,
        scrub: true,
      }
    });

    // 1. Initial Parallax & Shutter Open
    tl.to(bgWrapperRef.current, {
      scale: 1.15,
      ease: 'none',
      duration: 3,
    }, 0);

    tl.to(shuttersRef.current, {
      rotateY: 90,
      stagger: 0.1,
      ease: 'power2.inOut',
      duration: 1,
    }, 0.2);

    // 2. Cinematic Light Bloom (Fades in as shutters open)
    tl.to(bloomRef.current, {
      opacity: 0.6,
      ease: 'power2.out',
      duration: 1.5,
    }, 0.5);

    // 3. Slide in Card Background
    tl.fromTo(cardOuterRef.current,
      { x: '120%', opacity: 0 },
      { x: '0%', opacity: 1, ease: 'power3.out', duration: 1 },
      1.2
    );

    // 4. Staggered Typography Reveal
    tl.fromTo([textEyebrowRef.current, textTitleRef.current, textSpecsRef.current],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, ease: 'power3.out', duration: 0.8 },
      1.5
    );

    // 5. Cinematic Exit (Dissolve card, push camera deep into skyline)
    tl.to([cardOuterRef.current, bloomRef.current], {
      opacity: 0,
      ease: 'power2.in',
      duration: 0.8,
    }, 3.5);

    tl.to(bgWrapperRef.current, {
      scale: 1.4, // Massive push forward
      ease: 'power2.in',
      duration: 1,
    }, 3.5);

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#050505] overflow-hidden"
    >
      <div ref={containerRef} className="absolute inset-0 w-full h-full perspective-[1200px]">
        
        {/* The Crown Jewel Background Container (Handles Scroll Scale) */}
        <div ref={bgWrapperRef} className="absolute inset-0 w-full h-full overflow-hidden transform-gpu origin-center will-change-transform">
          
          {/* Inner Parallax Container (Handles Mouse Move) */}
          <div ref={bgMouseParallaxRef} className="absolute inset-[-5%] w-[110%] h-[110%] transform-gpu will-change-transform">
            
            {/* Base Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/assets/crown_jewel_penthouse.jpg" 
              alt="The Zenith Penthouse"
              className="w-full h-full object-cover transform-gpu"
            />
            
            {/* Optimized Light Bloom Overlay (Radial Gradient instead of heavy blurred image) */}
            <div 
              ref={bloomRef}
              className="absolute inset-0 w-full h-full opacity-0 pointer-events-none transform-gpu will-change-opacity mix-blend-screen"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(100, 180, 255, 0.15) 0%, transparent 60%)' }}
            />

            {/* Ambient Gold Particles Overlay (Optimized: removed blur, added will-change) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
              {particles.map((p, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-[#d4af37] will-change-transform"
                  style={p}
                />
              ))}
            </div>

          </div>
        </div>

        {/* The Shutters overlaying the image */}
        <div className="absolute inset-0 w-full h-full flex z-10 pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              ref={(el) => { shuttersRef.current[i] = el; }}
              className="h-full bg-[#050505] transform-gpu origin-left border-r border-[#1a1a1a]/50 will-change-transform"
              style={{ width: '20%' }}
            />
          ))}
        </div>

        {/* The Glassmorphic Spec Card (Outer handles scroll slide) */}
        <div 
          ref={cardOuterRef}
          className="absolute top-1/2 -translate-y-1/2 right-[5%] md:right-[10%] w-[90%] md:w-[420px] z-20 pointer-events-none transform-gpu will-change-transform"
        >
          {/* Inner handles mouse parallax */}
          <div ref={cardInnerRef} className="relative w-full h-full transform-gpu will-change-transform">
            
            {/* Card Background with Light Sweep (Optimized: removed backdrop blur for performance) */}
            <div className="relative bg-[#050505]/95 border border-[#d4af37]/20 p-10 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group transform-gpu">
              
              {/* CSS Light Sweep Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] animate-[shimmer_3s_ease-in-out_infinite] opacity-30" />
              
              {/* Staggered Content */}
              <div className="relative z-10">
                <span ref={textEyebrowRef} className="text-[#d4af37] font-sans text-[10px] tracking-[0.4em] uppercase block mb-6 opacity-0">Off-Market Exclusive</span>
                
                <h2 ref={textTitleRef} className="text-[var(--color-cream)] font-display text-5xl tracking-tight leading-[1.1] mb-8 opacity-0">
                  The Zenith<br/>Penthouse
                </h2>
                
                <div ref={textSpecsRef} className="space-y-5 border-t border-white/10 pt-8 opacity-0">
                  <div className="flex justify-between items-center text-[var(--color-sand)] font-sans text-xs tracking-[0.2em] uppercase">
                    <span>Value</span>
                    <span className="text-[var(--color-cream)] text-base font-light">$45,000,000</span>
                  </div>
                  <div className="flex justify-between items-center text-[var(--color-sand)] font-sans text-xs tracking-[0.2em] uppercase">
                    <span>Interior</span>
                    <span className="text-[var(--color-cream)] text-base font-light">8,500 SQFT</span>
                  </div>
                  <div className="flex justify-between items-center text-[var(--color-sand)] font-sans text-xs tracking-[0.2em] uppercase">
                    <span>Terrace</span>
                    <span className="text-[var(--color-cream)] text-base font-light">3,200 SQFT</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes float-up {
          0% { transform: translateY(100px) rotate(0deg); }
          100% { transform: translateY(-100px) rotate(360deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
      `}</style>
    </section>
  );
}
