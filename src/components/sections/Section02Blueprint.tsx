'use client';
import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: '/assets/luxury_villa_exterior_1787225207882.jpg', title: 'The Architect\'s Villa', desc: 'Modern concrete and glass overlooking the Pacific.' },
  { src: '/assets/luxury_penthouse_interior_1787225262568.jpg', title: 'Skyline Penthouse', desc: 'Sun-drenched marble living above the clouds.' },
  { src: '/assets/modern_architecture_detail_1787225284123.jpg', title: 'Geometric Foundations', desc: 'Warm terracotta and sleek glass intersections.' },
  { src: '/assets/luxury_kitchen_minimal_1787225332291.jpg', title: 'Minimalist Gastronomy', desc: 'Dark forest green and matte black finishes.' }
];

export default function Section02Blueprint() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  
  // Grid line refs
  const hLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const vLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const lastScrollY = useRef(0);

  useGSAP(() => {
    // 1. Grid Drawing Animation
    const gridTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      }
    });

    gridTl.fromTo(hLinesRef.current, 
      { scaleX: 0 }, 
      { scaleX: 1, duration: 1, stagger: 0.1, ease: 'power2.inOut', transformOrigin: 'center center' }, 
      0
    );
    gridTl.fromTo(vLinesRef.current, 
      { scaleY: 0 }, 
      { scaleY: 1, duration: 1, stagger: 0.1, ease: 'power2.inOut', transformOrigin: 'top center' }, 
      0
    );
    gridTl.fromTo(textRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 
      0.5
    );

    // 2. Horizontal Gallery Pinning & Inner Parallax
    const getScrollAmount = () => {
      if (!galleryRef.current) return 0;
      let galleryWidth = galleryRef.current.scrollWidth;
      return -(galleryWidth - window.innerWidth + 100); 
    };

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // Move the gallery horizontally
    pinTl.to(galleryRef.current, {
      x: getScrollAmount,
      ease: "none",
    }, 0);

    // INNER PARALLAX: Move the images slightly opposite to the gallery movement
    // The images are scaled 1.15x, so they have room to move horizontally inside their containers
    pinTl.fromTo(innerImagesRef.current, 
      { x: "-8%" },
      { x: "8%", ease: "none" },
      0
    );

    // 3. Velocity Skew Effect for the images
    let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(imagesRef.current, "skewX", "deg"),
        clamp = gsap.utils.clamp(-15, 15);

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -100);
        
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0, 
            duration: 0.8, 
            ease: "power3", 
            overwrite: true, 
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });

  }, { scope: sectionRef });

  // 4. Drag to Scroll Logic
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    lastScrollY.current = window.scrollY;
    
    // Prevent default to stop text selection while dragging
    if (e.target instanceof HTMLElement) {
      e.target.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartX.current;
    // Map horizontal drag distance to vertical scroll distance.
    // Multiplier of 2 makes it feel more responsive.
    const scrollDelta = deltaX * 2; 
    
    window.scrollTo({
      top: lastScrollY.current - scrollDelta,
      behavior: 'auto' // Instant scroll update (Lenis smooths this naturally if enabled, or native scroll handles it)
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (e.target instanceof HTMLElement) {
      e.target.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden flex items-center"
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen">
        {/* Horizontal Lines */}
        {[20, 40, 60, 80].map((top, i) => (
          <div 
            key={`h-${i}`} 
            ref={(el) => { hLinesRef.current[i] = el; }}
            className="absolute left-0 right-0 h-[1px] bg-[var(--color-sand)]" 
            style={{ top: `${top}%` }} 
          />
        ))}
        {/* Vertical Lines */}
        {[20, 40, 60, 80].map((left, i) => (
          <div 
            key={`v-${i}`} 
            ref={(el) => { vLinesRef.current[i] = el; }}
            className="absolute top-0 bottom-0 w-[1px] bg-[var(--color-sand)]" 
            style={{ left: `${left}%` }} 
          />
        ))}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center pointer-events-none">
        
        {/* Section Intro Text */}
        <div ref={textRef} className="absolute top-[10%] left-[5%] md:left-[10%] max-w-lg z-20 mix-blend-difference pointer-events-auto">
          <h2 className="text-[var(--color-cream)] font-display text-4xl md:text-6xl tracking-tight leading-none mb-4 select-none">
            The Blueprint<br/>to Belonging
          </h2>
          <p className="text-[var(--color-sand)] font-sans text-sm md:text-base tracking-wide max-w-md select-none">
            Precision engineering meets intuitive luxury. Explore the spaces where architectural ambition becomes an everyday reality.
          </p>
        </div>

        {/* Horizontal Scrolling Gallery */}
        {/* Drag event handlers added here */}
        <div 
          ref={galleryWrapperRef} 
          className={`w-full h-full flex items-center overflow-visible pointer-events-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div 
            ref={galleryRef} 
            className="flex gap-8 md:gap-16 px-[10vw] pt-24 items-center h-full w-max will-change-transform"
          >
            {images.map((img, i) => (
              <div 
                key={i} 
                className="relative group shrink-0 w-[70vw] md:w-[45vw] lg:w-[35vw] h-[50vh] md:h-[60vh] flex flex-col justify-end overflow-hidden"
              >
                {/* Image Wrapper for Skewing */}
                <div 
                  ref={(el) => { imagesRef.current[i] = el; }} 
                  className="absolute inset-0 w-full h-full origin-bottom"
                >
                  {/* INNER PARALLAX: The image is scaled up so it can move inside the wrapper */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    ref={(el) => { innerImagesRef.current[i] = el; }}
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-full object-cover scale-[1.15] transition-transform duration-1000 group-hover:scale-[1.2] pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 pointer-events-none" />
                </div>
                
                {/* Overlay Text */}
                <div className="relative z-10 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                  <span className="text-[var(--color-sand)] font-sans text-xs tracking-[0.2em] uppercase block mb-2 opacity-80 select-none">0{i + 1} // Spaces</span>
                  <h3 className="text-[var(--color-cream)] font-display text-2xl md:text-3xl mb-2 select-none">{img.title}</h3>
                  <p className="text-[var(--color-cream)]/70 font-sans text-sm max-w-xs select-none">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
