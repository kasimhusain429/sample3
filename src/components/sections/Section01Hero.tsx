'use client';
import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FrameSequenceCanvas, { FrameSequenceHandle } from '@/components/canvas/FrameSequenceCanvas';

export default function Section01Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLHeadingElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const innerLettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const frameSequenceRef = useRef<FrameSequenceHandle>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const blurOverlayRef = useRef<HTMLDivElement>(null);
  
  const text = "URBANNEST";

  useGSAP(() => {
    // Initial load animation - animate the wrapper to prevent conflicts with the letter tweens
    if (textWrapperRef.current) {
      gsap.from(textWrapperRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
      });
    }

    // Scroll parallax - scattering the letters to reveal the background
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=250%',
        scrub: true, // Use 'true' instead of '1' because Lenis already handles smooth scrolling.
        pin: true,
      }
    });

    // Scrub the frame sequence (151 frames total, so 0 to 150)
    const frameObj = { frame: 0 };
    let lastRenderedFrame = -1;
    tl.to(frameObj, {
      frame: 150, 
      ease: "none",
      onUpdate: () => {
        const currentFrame = Math.round(frameObj.frame);
        if (currentFrame !== lastRenderedFrame && frameSequenceRef.current) {
          frameSequenceRef.current.renderFrame(currentFrame);
          lastRenderedFrame = currentFrame;
        }
      }
    }, 0);

    // Fade the video overlay slightly as you scroll down to make the video pop more
    tl.fromTo(videoOverlayRef.current, 
      { opacity: 0.5 },
      { opacity: 0.2, ease: 'power1.inOut' },
      0
    );
    
    // Quickly remove the blurish green screen at the start of the scroll
    tl.to(blurOverlayRef.current, {
      opacity: 0,
      duration: 0.05, // Removes it in the first 10% of the timeline
      ease: 'power2.out'
    }, 0);
    
    lettersRef.current.forEach((letter, index) => {
      // Calculate random trajectories for each letter to slide away (Original clean effect)
      const randomX = (index % 2 === 0 ? 1 : -1) * (Math.random() * 50 + 20) + 'vw';
      const randomY = (Math.random() * 100 - 50) + 'vh';
      const randomRotate = Math.random() * 45 - 22.5;

      // Use `to` instead of `fromTo` to ensure GSAP's scrollTrigger seamlessly restores the original DOM state on reverse scrub.
      tl.to(letter, {
        x: randomX,
        y: randomY,
        rotation: randomRotate,
        scale: 2 + Math.random() * 3,
        opacity: 0,
        ease: 'power1.inOut'
      }, 0); 
    });

    // --- Magnetic Typography & Glass Lens Reveal Logic ---
    if (!containerRef.current || !blurOverlayRef.current) return;

    // Create fast GSAP setters for each inner letter to handle magnetic pull
    const letterSetters = innerLettersRef.current.map((el) => {
      if (!el) return null;
      return {
        x: gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" }),
        rect: el.getBoundingClientRect()
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update Lens Reveal Mask position
      if (blurOverlayRef.current) {
        blurOverlayRef.current.style.setProperty('--mouse-x', `${clientX}px`);
        blurOverlayRef.current.style.setProperty('--mouse-y', `${clientY}px`);
      }

      // Update Magnetic Letters
      letterSetters.forEach((setter) => {
        if (!setter) return;
        
        // Recalculate rect in case of resize or scroll (though mostly static before scroll)
        const rect = setter.rect;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distX = clientX - centerX;
        const distY = clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        // Magnetic radius - how close the mouse needs to be to pull the letter
        const radius = 200;
        
        if (distance < radius) {
          // Attract logic: pull it towards the mouse (max offset based on distance)
          const pullX = (distX / radius) * 30; // Max 30px pull
          const pullY = (distY / radius) * 30;
          setter.x(pullX);
          setter.y(pullY);
        } else {
          // Reset to original position if out of range
          setter.x(0);
          setter.y(0);
        }
      });
    };

    const handleResize = () => {
      // Update bounding rects on resize
      letterSetters.forEach((setter, i) => {
        if (setter && innerLettersRef.current[i]) {
          setter.rect = innerLettersRef.current[i]!.getBoundingClientRect();
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
    
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden bg-[var(--color-forest)] flex items-center justify-center cursor-crosshair"
    >
      {/* Background Frame Sequence */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        
        {/* Blurish green screen with CSS mask for the Glass Lens Effect */}
        <div 
          ref={blurOverlayRef} 
          className="absolute inset-0 bg-[var(--color-forest)]/60 backdrop-blur-md z-20"
          style={{
            maskImage: `radial-gradient(circle 180px at var(--mouse-x, 50%) var(--mouse-y, 50%), transparent 0%, black 100%)`,
            WebkitMaskImage: `radial-gradient(circle 180px at var(--mouse-x, 50%) var(--mouse-y, 50%), transparent 0%, black 100%)`
          }}
        ></div>
        
        {/* Restored the elegant gradient overlay from the original Concept 3 */}
        <div ref={videoOverlayRef} className="absolute inset-0 bg-gradient-to-br from-[var(--color-forest)] to-[var(--color-terracotta)] opacity-50 z-10 mix-blend-multiply"></div>
        
        <FrameSequenceCanvas 
          ref={frameSequenceRef}
          frameCount={151} 
          framePath="/assets/hero-frames/frame_" 
          frameExtension=".jpg" 
          padLength={4} 
        />
      </div>

      {/* Typographic Mask Layer - Restored mix-blend-difference */}
      <div className="relative z-30 w-full flex items-center justify-center pointer-events-none px-4">
        <h1 ref={textWrapperRef} className="font-display text-[var(--color-cream)] text-[12vw] tracking-tighter leading-none flex whitespace-nowrap mix-blend-difference">
          {text.split('').map((char, i) => (
            <span 
              key={i} 
              ref={(el) => { lettersRef.current[i] = el; }}
              className="inline-block origin-center will-change-transform pointer-events-auto"
            >
              {/* Inner span handles the magnetic hover effect, isolating it from the scroll animation */}
              <span 
                ref={(el) => { innerLettersRef.current[i] = el; }}
                className="inline-block transition-transform duration-75"
              >
                {char}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce pointer-events-none z-40">
        <span className="text-[var(--color-cream)] text-sm tracking-widest uppercase font-sans mix-blend-difference">Scroll</span>
        <div className="w-[1px] h-12 bg-[var(--color-cream)] mix-blend-difference"></div>
      </div>
    </section>
  );
}
