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
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      initGSAP();

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.6 }
        );
      }
      if (subtextRef.current) {
        tl.fromTo(
          subtextRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
          "-=0.9"
        );
      }
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );
      }
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="hero" className="relative md:min-h-[150vh] min-h-screen">
      <div className="md:sticky md:top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-ink">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 animate-[slowZoom_22s_ease-in-out_infinite_alternate] opacity-40 mix-blend-luminosity"
            style={{ backgroundImage: "url(/images/hero_bg.png)" }}
          />
          {/* Dark velvet overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-espresso/80 to-ink/90" />
          {/* Side vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
        </div>

        {/* 3D Background */}
        <ThreeCanvas className="opacity-90">
          <ThreadGeometry />
          <fog attach="fog" args={["#1C1410", 6, 25]} />
        </ThreeCanvas>

        {/* Content Overlay */}
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 h-full items-center pointer-events-none">

          <div className="md:col-span-8 md:col-start-2 pt-20 pointer-events-auto">

            {/* Overline */}
            <p className="label-overline text-antique-gold mb-5 opacity-0 animate-[fadeUp_1s_ease-out_0.2s_forwards]">
              Jaipur&rsquo;s Premier Boutique
            </p>

            <h1
              ref={textRef}
              className="text-display-lg text-ivory mb-6 leading-tight max-w-4xl font-display opacity-0"
              style={{ fontWeight: 300, letterSpacing: "-0.01em" }}
            >
              Where Every Stitch<br />
              <em className="text-gradient-gold not-italic">Tells a Story</em>
            </h1>

            <p
              ref={subtextRef}
              className="text-body-lg text-blush mb-8 tracking-wide font-light opacity-0"
            >
              Premium Boutique &amp; Tailoring — Jaipur
            </p>

            {/* Star badge */}
            <div
              ref={badgeRef}
              className="flex items-center gap-2 mb-10 bg-ivory/10 backdrop-blur-sm px-4 py-2 rounded-full inline-flex border border-antique-gold/30 opacity-0"
            >
              <span className="text-ivory font-medium text-sm">5.0</span>
              <div className="flex text-warm-gold">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="text-blush/80 text-xs ml-1">(286 Reviews)</span>
            </div>

            {/* CTA buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-6 opacity-0">
              <a
                href="#contact"
                className="px-8 py-4 bg-terracotta text-ivory rounded-sm hover:bg-terracotta-light transition-all duration-300 font-medium shadow-lg shadow-terracotta/20 hover:shadow-terracotta/35 hover:-translate-y-0.5"
              >
                Book Consultation
              </a>
              <a
                href="#portfolio"
                className="text-ivory/90 hover:text-antique-gold transition-colors flex items-center gap-2 text-sm uppercase tracking-widest"
              >
                Explore Our Work <span className="text-antique-gold">→</span>
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 right-12 flex flex-col items-center gap-2 pointer-events-auto">
            <span className="text-xs text-blush/70 uppercase tracking-widest rotate-90 origin-bottom mb-12">Scroll</span>
            <div className="w-[1px] h-16 bg-antique-gold/30 relative overflow-hidden">
              <div className="w-full h-full bg-antique-gold absolute top-0 left-0 animate-[scrollDown_2s_ease-in-out_infinite]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
