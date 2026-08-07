"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const items = [
    { type: "Bridal Lehenga", img: "/images/lehenga.png", title: "Crimson Royalty" },
    { type: "Designer Blouse", img: "/images/blouse.png", title: "Midnight Zari" },
    { type: "Sharara Set", img: "/images/sharara.png", title: "Emerald Elegance" },
    { type: "Saree Lace", img: "/images/hero_bg.png", title: "Golden Threads" },
    { type: "Custom Suit", img: "/images/craft_bg.png", title: "Vintage Craft" },
    { type: "Boutique", img: "/images/about_bg.png", title: "Studio Interior" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    const ctx = gsap.context(() => {
      // Minimal parallax animation
      if (sectionRef.current) {
        const cards = sectionRef.current.querySelectorAll('.portfolio-card');
        
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              }
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="py-32 bg-warm-void relative">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h3 className="text-gold tracking-[0.2em] uppercase text-sm mb-4 font-medium">Gallery of Grace</h3>
        <h2 className="text-display-md text-cream">Our Masterpieces</h2>
      </div>

      <div className="container mx-auto px-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {items.map((item, i) => (
            <div 
              key={i} 
              className={`portfolio-card relative rounded-xl overflow-hidden group cursor-pointer border border-gold/10 ${
                i % 2 === 0 ? "h-96" : "h-72"
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                style={{ backgroundImage: `url(${item.img})` }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-3 py-1 bg-gold/20 backdrop-blur-md border border-gold/30 rounded-full text-xs font-medium text-cream mb-3">
                  {item.type}
                </span>
                <h4 className="text-xl font-display text-cream group-hover:text-gold transition-colors duration-300 shadow-sm">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-20 text-center">
        <button className="px-8 py-4 border border-gold/40 text-gold hover:bg-gold hover:text-void transition-colors rounded-sm font-medium">
          Load More Designs
        </button>
      </div>
    </section>
  );
}
