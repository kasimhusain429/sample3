'use client';
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

interface FrameSequenceCanvasProps {
  frameCount: number;
  framePath: string; // e.g. "/assets/hero-frames/frame_"
  frameExtension: string; // e.g. ".jpg"
  padLength: number; // e.g. 4 for "0001"
}

export interface FrameSequenceHandle {
  renderFrame: (index: number) => void;
}

const FrameSequenceCanvas = forwardRef<FrameSequenceHandle, FrameSequenceCanvasProps>(({
  frameCount,
  framePath,
  frameExtension,
  padLength,
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Expose renderFrame to parent
  useImperativeHandle(ref, () => ({
    renderFrame: (index: number) => {
      targetFrameRef.current = index;
      const canvas = canvasRef.current;
      const ctx = contextRef.current;
      if (!canvas || !ctx || !imagesRef.current[index]) return;

      const img = imagesRef.current[index];
      // Do not attempt to draw an incomplete image, it will be drawn in onload
      if (!img.complete || img.naturalWidth === 0) return;
      
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  }));

  // Load images
  useEffect(() => {
    imagesRef.current = [];
    let loaded = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(padLength, '0');
      img.src = `${framePath}${paddedIndex}${frameExtension}`;
      img.onload = () => {
        loaded++;
        if (loaded === frameCount) {
          setIsLoaded(true);
        }
        
        // Render if this image is the one currently requested by the scroll position (late-load fix)
        // Note: i goes from 1 to frameCount, but targetFrameRef goes from 0 to frameCount - 1
        if (i - 1 === targetFrameRef.current && contextRef.current && canvasRef.current) {
          const canvas = canvasRef.current;
          
          // Ensure canvas is sized correctly on first render
          if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
          }
          
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width / 2) - (img.width / 2) * scale;
          const y = (canvas.height / 2) - (img.height / 2) * scale;
          contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
          contextRef.current.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
      };
      imagesRef.current.push(img);
    }
  }, [frameCount, framePath, frameExtension, padLength]);

  // Handle Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    contextRef.current = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Redraw frame 0 on resize
      if (imagesRef.current[0]) {
        const img = imagesRef.current[0];
        const ctx = contextRef.current;
        if (ctx) {
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width / 2) - (img.width / 2) * scale;
          const y = (canvas.height / 2) - (img.height / 2) * scale;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
    />
  );
});

FrameSequenceCanvas.displayName = 'FrameSequenceCanvas';
export default FrameSequenceCanvas;
