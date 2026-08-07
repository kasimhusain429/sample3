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
  },
  {
    num: "02",
    title: "Precise Measurement",
    desc: "Taking exact measurements to ensure the perfect, flattering fit.",
    time: "30 min",
  },
  {
    num: "03",
    title: "Crafting",
    desc: "Our master artisans cut and stitch your garment with meticulous care.",
    time: "2-5 days",
  },
  {
    num: "04",
    title: "Fitting & Delivery",
    desc: "Final trial to ensure perfection, followed by immediate delivery.",
    time: "Same day",
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
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="py-32 bg-void relative">
      <div className="container mx-auto px-6 mb-24 text-center">
        <h3 className="text-gold tracking-[0.2em] uppercase text-sm mb-4 font-medium">How We Work</h3>
        <h2 className="text-display-md text-cream">From Measure to Masterpiece</h2>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative">
        {/* Central connecting line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gold/10 -translate-x-1/2" />
        <div 
          ref={lineRef} 
          className="absolute left-6 md:left-1/2 top-0 w-px bg-gold -translate-x-1/2 shadow-[0_0_10px_rgba(212,175,55,0.5)]" 
        />

        <div className="space-y-24">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Empty space for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
              
              {/* Center node */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-void border-2 border-gold -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
              
              {/* Content Card */}
              <div className="w-full pl-16 md:pl-0 md:w-1/2 flex">
                <div className={`glass-panel p-8 rounded-xl w-full relative ${
                  index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                }`}>
                  <span className="absolute -top-6 -right-4 text-8xl font-display font-bold text-warm-void opacity-50 z-0 select-none pointer-events-none">
                    {step.num}
                  </span>
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-medium mb-4">
                      {step.time}
                    </span>
                    <h4 className="text-2xl font-display text-cream mb-3">{step.title}</h4>
                    <p className="text-sand leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
