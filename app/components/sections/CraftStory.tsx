"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function CraftStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    const ctx = gsap.context(() => {
      if (contentRef.current && sectionRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            }
          }
        );
      }

      if (statsRef.current && sectionRef.current) {
        gsap.fromTo(
          statsRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="craft" className="relative md:min-h-[150vh] bg-gradient-to-b from-void to-warm-void">
      <div className="md:sticky md:top-0 min-h-screen md:h-screen w-full flex flex-col justify-center overflow-hidden py-24 md:py-0">
        
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center relative z-10 gap-12 md:gap-0">
          
          {/* Left Content */}
          <div ref={contentRef} className="w-full md:w-1/2 pr-0 md:pr-12 z-20">
            <h3 className="text-gold tracking-[0.2em] uppercase text-sm mb-6 font-medium">Our Heritage</h3>
            <h2 className="text-display-md text-cream mb-8 leading-tight">
              Three Decades <br />of Precision
            </h2>
            <p className="text-body text-sand mb-12 leading-relaxed max-w-lg">
              Nestled in the heart of Palika Bazar, near the sacred Balaji Mandir, 
              Siddh Laxmi Studio has been Jaipur's trusted name in bespoke tailoring. 
              From intricate bridal lehengas to perfectly fitted blouses, every garment 
              carries the mark of master craftsmanship.
            </p>
            
            <a href="#about" className="inline-block px-8 py-4 border border-gold/40 text-gold hover:bg-gold hover:text-void transition-colors rounded-sm font-medium">
              Meet Our Artisans
            </a>
          </div>

          {/* Right Area / Image */}
          <div className="w-full md:w-1/2 h-[40vh] md:h-[70vh] relative rounded-2xl overflow-hidden shadow-2xl border border-gold/20 group">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url(/images/craft_bg.png)' }} />
            <div className="absolute inset-0 bg-gradient-to-tr from-void/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-cream/90 text-sm italic font-display">
                "Where tradition meets contemporary elegance. Every thread is woven with passion."
              </p>
            </div>
          </div>

        </div>

        {/* Stats Row */}
        <div ref={statsRef} className="relative md:absolute bottom-0 md:bottom-12 left-0 w-full z-20 mt-12 md:mt-0 pb-12 md:pb-0">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gold/10 max-w-3xl">
              <div>
                <div className="text-3xl font-display text-cream mb-1">30+ Years</div>
                <div className="text-sm text-muted-gold">Of Excellence</div>
              </div>
              <div>
                <div className="text-3xl font-display text-cream mb-1">286+</div>
                <div className="text-sm text-muted-gold">Five-Star Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-display text-cream mb-1">50+</div>
                <div className="text-sm text-muted-gold">Daily Fittings</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
