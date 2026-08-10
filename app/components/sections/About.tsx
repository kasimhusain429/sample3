"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function About() {
  const textRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 75%",
            },
          }
        );
      }

      if (teamRef.current) {
        gsap.fromTo(
          teamRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.18,
            ease: "power2.out",
            scrollTrigger: {
              trigger: teamRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
      {/* Warm parchment base */}
      <div className="absolute inset-0 bg-parchment" />

      {/* Background image with warm overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 animate-[slowZoom_30s_ease-in-out_infinite_alternate]"
        style={{ backgroundImage: "url(/images/about_bg.png)" }}
      />
      {/* Warm gradient over image */}
      <div className="absolute inset-0 bg-gradient-to-t from-parchment via-parchment/85 to-parchment/70" />

      <div ref={textRef} className="container mx-auto px-6 relative z-10 text-center max-w-4xl">

        <span className="label-overline text-antique-gold block mb-6">
          The Hands Behind the Thread
        </span>

        <h2
          className="text-display-md text-espresso mb-10 leading-tight font-display"
          style={{ fontWeight: 300 }}
        >
          A Family of <em className="text-wine not-italic">Artisans</em>
        </h2>

        <div className="line-gold w-20 mx-auto mb-10" />

        <p className="text-body-lg text-stone leading-relaxed mb-20 max-w-2xl mx-auto">
          What began as a small tailoring corner in Palika Bazar has grown into Jaipur&rsquo;s most trusted boutique studio.
          Our team of master tailors brings together generations of Rajasthani craftsmanship with contemporary design sensibilities.
          We don&rsquo;t just stitch garments —{" "}
          <span className="text-wine font-medium italic">we weave dreams.</span>
        </p>

        {/* Team Grid */}
        <div ref={teamRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {[
            { id: 1, name: "Ram Singh", role: "Master Cutter", img: "/images/craft_bg.png" },
            { id: 2, name: "Anita Devi", role: "Lead Artisan", img: "/images/about_bg.png" },
            { id: 3, name: "Prakash Tailor", role: "Finishing Expert", img: "/images/hero_bg.png" },
          ].map((artisan) => (
            <div key={artisan.id} className="flex flex-col items-center group">
              <div className="relative mb-6">
                <div
                  className="w-44 h-60 rounded-2xl overflow-hidden border-2 border-mist relative bg-cover bg-center transition-transform duration-700 group-hover:scale-105 group-hover:border-antique-gold/50"
                  style={{ backgroundImage: `url(${artisan.img})` }}
                >
                  {/* Warm tonal overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent group-hover:from-wine/30 transition-colors duration-500" />
                </div>
                {/* Decorative accent dot */}
                <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-antique-gold/20 border border-antique-gold/40" />
              </div>
              <h4 className="text-xl font-display text-espresso mb-1" style={{ fontWeight: 400 }}>
                {artisan.name}
              </h4>
              <p className="text-dusty-rose text-sm tracking-wide">{artisan.role}</p>
            </div>
          ))}
        </div>

        {/* Signature */}
        <div className="inline-block relative">
          <span className="font-script text-5xl text-antique-gold/80 block">Siddh Laxmi Studio</span>
          <div className="line-gold mt-3" />
        </div>
      </div>
    </section>
  );
}
