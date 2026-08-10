"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  const items = [
    { type: "Bridal Lehenga", img: "/images/lehenga.png", title: "Crimson Royalty", accentColor: "#6D1E37" },
    { type: "Designer Blouse", img: "/images/blouse.png", title: "Midnight Zari", accentColor: "#B8883A" },
    { type: "Sharara Set", img: "/images/sharara.png", title: "Emerald Elegance", accentColor: "#C4788A" },
    { type: "Saree Lace", img: "/images/hero_bg.png", title: "Golden Threads", accentColor: "#D4A84B" },
    { type: "Custom Suit", img: "/images/craft_bg.png", title: "Vintage Craft", accentColor: "#B5533C" },
    { type: "Boutique", img: "/images/about_bg.png", title: "Studio Interior", accentColor: "#6D1E37" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        const cards = sectionRef.current.querySelectorAll(".portfolio-card");

        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              delay: (i % 3) * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="py-32 bg-ivory relative">
      {/* Subtle top border fade */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mist to-transparent" />

      <div className="container mx-auto px-6 mb-20 text-center">
        <span className="label-overline text-antique-gold block mb-4">Gallery of Grace</span>
        <h2 className="text-display-md text-espresso font-display" style={{ fontWeight: 300 }}>
          Our <em className="text-wine not-italic">Masterpieces</em>
        </h2>
      </div>

      <div className="container mx-auto px-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item, i) => (
            <div
              key={i}
              className={`portfolio-card relative rounded-2xl overflow-hidden group cursor-pointer ${
                i % 2 === 0 ? "h-96" : "h-72"
              }`}
              style={{ border: "1px solid rgba(217, 207, 197, 0.6)" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-108"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              {/* Warm tonal gradient overlay */}
              <div
                className="absolute inset-0 opacity-75 group-hover:opacity-90 transition-opacity duration-500"
                style={{ background: `linear-gradient(to top, ${item.accentColor}DD 0%, ${item.accentColor}44 40%, transparent 70%)` }}
              />

              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium text-ivory mb-3 backdrop-blur-sm"
                  style={{ background: `${item.accentColor}99`, border: `1px solid ${item.accentColor}55` }}
                >
                  {item.type}
                </span>
                <h4 className="text-xl font-display text-ivory group-hover:text-pale-gold transition-colors duration-300" style={{ fontWeight: 300 }}>
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
        <button className="px-10 py-4 border border-wine/40 text-wine hover:bg-wine hover:text-ivory transition-all duration-300 rounded-sm font-medium hover:-translate-y-0.5 hover:shadow-lg hover:shadow-wine/20">
          Load More Designs
        </button>
      </div>

      {/* Bottom border fade */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mist to-transparent" />
    </section>
  );
}
