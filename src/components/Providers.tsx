'use client';
import { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Providers({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    
    // Sync ScrollTrigger with Lenis's scroll updates
    const onScroll = () => ScrollTrigger.update();
    lenisRef.current?.lenis?.on('scroll', onScroll);

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.lenis?.off('scroll', onScroll);
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={{ lerp: 0.1 }}>
      {children}
    </ReactLenis>
  );
}
