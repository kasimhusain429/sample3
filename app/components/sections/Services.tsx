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
    accent: "#6D1E37",
  },
  {
    id: "02",
    title: "Blouse Design",
    desc: "Intricate necklines, embroidery, and modern cuts for every saree.",
    price: "₹500",
    img: "/images/blouse.png",
    accent: "#B5533C",
  },
  {
    id: "03",
    title: "Bridal Lehenga",
    desc: "Exquisite handwork and detailing for your most special day.",
    price: "₹5000",
    img: "/images/lehenga.png",
    accent: "#C4788A",
  },
  {
    id: "04",
    title: "Saree Lace Work",
    desc: "Premium borders, latkans, and custom finishing for heirloom sarees.",
    price: "₹300",
    img: "/images/craft_bg.png",
    accent: "#B8883A",
  },
  {
    id: "05",
    title: "Perfect Alterations",
    desc: "Expert resizing and reshaping to make off-the-rack feel custom.",
    price: "₹200",
    img: "/images/sharara.png",
    accent: "#6D1E37",
  },
  {
    id: "06",
    title: "Urgent Service",
    desc: "Fast-track stitching when you need it by tomorrow.",
    price: "₹1200",
    img: "/images/about_bg.png",
    accent: "#B5533C",
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
    <section ref={sectionRef} id="services" className="bg-parchment relative z-10 overflow-hidden">
      <div className="h-screen w-full flex flex-col justify-center bg-parchment">

        <div className="container mx-auto px-6 mb-12">
          <span className="label-overline text-antique-gold block mb-4">The Atelier Menu</span>
          <h2 className="text-display-md text-espresso font-display" style={{ fontWeight: 300 }}>Our Services</h2>
        </div>

        <div ref={scrollWrapperRef} className="pl-6 md:pl-24">
          <div ref={cardsRef} className="flex gap-8 w-[max-content]">
            {services.map((service, index) => (
              <div
                key={index}
                className="w-[80vw] md:w-[38vw] lg:w-[28vw] h-[60vh] rounded-xl relative overflow-hidden group transition-all duration-500 hover:-translate-y-3 cursor-pointer shadow-md shadow-espresso/10 hover:shadow-xl hover:shadow-espresso/15"
                style={{ border: "1px solid rgba(217, 207, 197, 0.8)" }}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 z-0"
                  style={{ backgroundImage: `url(${service.img})` }}
                />
                {/* Gradient overlay — warm ivory at bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-espresso/30 via-espresso/60 to-espresso/92 z-0" />
                {/* Top warm tint */}
                <div
                  className="absolute top-0 left-0 w-full h-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                  style={{ background: `linear-gradient(to bottom, ${service.accent}22, transparent)` }}
                />

                {/* Card top row */}
                <div className="relative z-10 flex justify-between items-start p-7">
                  <span
                    className="text-5xl font-display opacity-25 text-ivory"
                    style={{ fontWeight: 300 }}
                  >
                    {service.id}
                  </span>
                  <span
                    className="text-xs font-medium px-3 py-1.5 rounded-full text-ivory backdrop-blur-sm"
                    style={{ background: `${service.accent}CC`, border: `1px solid ${service.accent}` }}
                  >
                    From {service.price}
                  </span>
                </div>

                {/* Card bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-7">
                  <h3 className="text-display-sm text-ivory mb-3 font-display group-hover:text-pale-gold transition-colors duration-300" style={{ fontWeight: 300 }}>
                    {service.title}
                  </h3>
                  <p className="text-ivory/70 leading-relaxed mb-7 text-sm">{service.desc}</p>
                  <button className="flex items-center gap-2 text-xs text-antique-gold hover:text-warm-gold uppercase tracking-widest font-medium transition-colors group/btn">
                    <span>Inquire Now</span>
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
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
