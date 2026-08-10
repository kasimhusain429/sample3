"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function CraftStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      if (contentRef.current && sectionRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          }
        );
      }

      if (imageRef.current && sectionRef.current) {
        gsap.fromTo(
          imageRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 55%",
            },
          }
        );
      }

      if (statsRef.current && sectionRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 45%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="craft" className="relative md:min-h-[150vh] bg-gradient-to-b from-aged-linen to-ivory">
      <div className="md:sticky md:top-0 min-h-screen md:h-screen w-full flex flex-col justify-center overflow-hidden py-24 md:py-0">

        {/* Decorative background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236D1E37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center relative z-10 gap-12 md:gap-16">

          {/* Left Content */}
          <div ref={contentRef} className="w-full md:w-1/2 pr-0 md:pr-12 z-20">
            <span className="label-overline text-antique-gold block mb-6">Our Heritage</span>

            <h2 className="text-display-md text-espresso mb-8 leading-tight font-display" style={{ fontWeight: 300 }}>
              Three Decades <br />
              <em className="text-wine not-italic">of Precision</em>
            </h2>

            <p className="text-body text-stone mb-8 leading-relaxed max-w-lg">
              Nestled in the heart of Palika Bazar, near the sacred Balaji Mandir,
              Siddh Laxmi Studio has been Jaipur&rsquo;s trusted name in bespoke tailoring.
              From intricate bridal lehengas to perfectly fitted blouses, every garment
              carries the mark of master craftsmanship.
            </p>

            {/* Decorative divider */}
            <div className="line-gold w-16 mb-8" />

            <a
              href="#about"
              className="inline-block px-8 py-4 bg-wine text-ivory hover:bg-wine-light transition-all duration-300 rounded-sm font-medium shadow-md shadow-wine/20 hover:shadow-wine/30 hover:-translate-y-0.5"
            >
              Meet Our Artisans
            </a>
          </div>

          {/* Right Image */}
          <div
            ref={imageRef}
            className="w-full md:w-1/2 h-[45vh] md:h-[68vh] relative rounded-2xl overflow-hidden shadow-2xl shadow-espresso/20 group border border-mist"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url(/images/craft_bg.png)" }}
            />
            {/* Warm tonal overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-espresso/60 via-espresso/20 to-transparent" />

            {/* Floating quote card */}
            <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-xl p-5">
              <p className="text-ivory/90 text-sm italic font-display leading-relaxed">
                &ldquo;Where tradition meets contemporary elegance. Every thread is woven with passion.&rdquo;
              </p>
            </div>
          </div>

        </div>

        {/* Stats Row */}
        <div ref={statsRef} className="relative md:absolute bottom-0 md:bottom-12 left-0 w-full z-20 mt-16 md:mt-0 pb-12 md:pb-0">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-mist max-w-2xl">
              {[
                { value: "30+", label: "Years of Excellence" },
                { value: "286+", label: "Five-Star Reviews" },
                { value: "50+", label: "Daily Fittings" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-display text-wine mb-1">{stat.value}</div>
                  <div className="text-xs text-stone uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
