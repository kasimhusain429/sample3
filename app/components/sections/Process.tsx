"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const steps = [
  {
    num: "01",
    title: "Consultation",
    desc: "We discuss your vision, fabric preferences, and style requirements.",
    time: "15 min",
    icon: "✦",
  },
  {
    num: "02",
    title: "Precise Measurement",
    desc: "Taking exact measurements to ensure the perfect, flattering fit.",
    time: "30 min",
    icon: "◈",
  },
  {
    num: "03",
    title: "Crafting",
    desc: "Our master artisans cut and stitch your garment with meticulous care.",
    time: "2–5 days",
    icon: "❧",
  },
  {
    num: "04",
    title: "Fitting & Delivery",
    desc: "Final trial to ensure perfection, followed by immediate delivery.",
    time: "Same day",
    icon: "◆",
  },
];

export default function Process() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: "#process",
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          }
        );
      }

      // Animate cards in
      const cards = document.querySelectorAll(".process-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: i % 2 === 0 ? 40 : -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="py-32 bg-silk relative">
      {/* Top fade */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-ivory to-transparent" />

      <div className="container mx-auto px-6 mb-24 text-center">
        <span className="label-overline text-antique-gold block mb-4">How We Work</span>
        <h2 className="text-display-md text-espresso font-display" style={{ fontWeight: 300 }}>
          From Measure to <em className="text-wine not-italic">Masterpiece</em>
        </h2>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative">
        {/* Central connecting line track */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-mist -translate-x-1/2" />
        {/* Animated fill line */}
        <div
          ref={lineRef}
          className="absolute left-6 md:left-1/2 top-0 w-px bg-gradient-to-b from-antique-gold via-dusty-rose to-wine -translate-x-1/2 shadow-[0_0_12px_rgba(184,136,58,0.4)]"
          style={{ height: "0%" }}
        />

        <div className="space-y-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Empty spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />

              {/* Center node */}
              <div className="absolute left-6 md:left-1/2 w-5 h-5 rounded-full bg-ivory border-2 border-antique-gold -translate-x-1/2 z-10 shadow-[0_0_16px_rgba(184,136,58,0.5)] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-wine" />
              </div>

              {/* Content Card */}
              <div className="w-full pl-16 md:pl-0 md:w-1/2 flex">
                <div
                  className={`process-card glass-panel p-8 rounded-2xl w-full relative overflow-hidden group hover:shadow-lg hover:shadow-espresso/10 transition-shadow duration-300 ${
                    index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                  }`}
                >
                  {/* Big background numeral */}
                  <span className="absolute -top-4 -right-3 text-8xl font-display font-light text-antique-gold/35 select-none pointer-events-none z-0 group-hover:text-wine/25 transition-colors duration-500">
                    {step.num}
                  </span>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium text-wine bg-wine/10 border border-wine/20"
                      >
                        {step.time}
                      </span>
                      <span className="text-antique-gold text-lg">{step.icon}</span>
                    </div>

                    <h4
                      className="text-2xl font-display text-espresso mb-3 group-hover:text-wine transition-colors duration-300"
                      style={{ fontWeight: 400 }}
                    >
                      {step.title}
                    </h4>
                    <p className="text-stone leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-aged-linen to-transparent" />
    </section>
  );
}
