"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const services = [
  {
    id: "01",
    title: "Custom Stitching",
    desc: "Perfectly tailored garments that flatter your unique silhouette.",
    price: "₹800",
    img: "/images/hero_bg.png",
  },
  {
    id: "02",
    title: "Blouse Design",
    desc: "Intricate necklines, embroidery, and modern cuts for every saree.",
    price: "₹500",
    img: "/images/blouse.png",
  },
  {
    id: "03",
    title: "Bridal Lehenga",
    desc: "Exquisite handwork and detailing for your most special day.",
    price: "₹5000",
    img: "/images/lehenga.png",
  },
  {
    id: "04",
    title: "Saree Lace Work",
    desc: "Premium borders, latkans, and custom finishing for heirloom sarees.",
    price: "₹300",
    img: "/images/craft_bg.png",
  },
  {
    id: "05",
    title: "Perfect Alterations",
    desc: "Expert resizing and reshaping to make off-the-rack feel custom.",
    price: "₹200",
    img: "/images/sharara.png",
  },
  {
    id: "06",
    title: "Urgent Service",
    desc: "Fast-track stitching when you need it by tomorrow.",
    price: "₹1200",
    img: "/images/about_bg.png",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      if (sectionRef.current && scrollWrapperRef.current && cardsRef.current) {
        const cards = cardsRef.current;
        
        // Calculate the exact translation distance
        // padding-left is 96px on md (pl-24), so we subtract it to prevent overscrolling.
        const totalWidth = cards.scrollWidth;
        const viewportWidth = window.innerWidth;
        const paddingOffset = window.innerWidth >= 768 ? 96 : 24;
        
        gsap.to(cards, {
          x: -(totalWidth - viewportWidth + paddingOffset),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="bg-void relative z-10 overflow-hidden">
      <div className="h-screen w-full flex flex-col justify-center bg-void">
        <div className="container mx-auto px-6 mb-12">
          <h3 className="text-gold tracking-[0.2em] uppercase text-sm mb-4 font-medium">The Atelier Menu</h3>
          <h2 className="text-display-md text-cream">Our Services</h2>
        </div>

        <div ref={scrollWrapperRef} className="pl-6 md:pl-24">
          <div ref={cardsRef} className="flex gap-8 w-[max-content]">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="w-[80vw] md:w-[40vw] lg:w-[30vw] h-[60vh] glass-panel rounded-xl p-8 flex flex-col justify-between group relative overflow-hidden transition-transform duration-500 hover:-translate-y-2"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 z-0 opacity-40 mix-blend-overlay" 
                  style={{ backgroundImage: `url(${service.img})` }} 
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-void/60 via-void/80 to-warm-void/95 group-hover:from-void/40 transition-colors duration-500 z-0" />
                
                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-gold font-display text-4xl opacity-30">{service.id}</span>
                  <span className="text-sm font-medium px-3 py-1 border border-gold/30 rounded-full text-cream">
                    From {service.price}
                  </span>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-display-sm text-cream mb-4 group-hover:text-gold transition-colors duration-300">{service.title}</h3>
                  <p className="text-sand leading-relaxed mb-8">{service.desc}</p>
                  <button className="flex items-center gap-2 text-sm text-cream hover:text-gold uppercase tracking-widest font-medium transition-colors">
                    Inquire Now <span className="text-gold">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
