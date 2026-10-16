'use client';
import { useRef, useMemo, useState, MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Procedural City Generator - Architectural Grade
function ArchitecturalCity() {
  const podiumsRef = useRef<THREE.InstancedMesh>(null);
  const towersRef = useRef<THREE.InstancedMesh>(null);
  const accentsRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate urban planning data
  const { podiums, towers, accents, totalBuildings } = useMemo(() => {
    const pData = [];
    const tData = [];
    const aData = [];
    
    const gridSize = 40;
    const spacing = 1.4; 
    let count = 0;
    
    for (let i = -gridSize/2; i < gridSize/2; i++) {
      for (let j = -gridSize/2; j < gridSize/2; j++) {
        
        // Urban Planning: Avenues and Streets
        const isAvenue = Math.abs(i) % 6 === 0;
        const isStreet = Math.abs(j) % 4 === 0;
        
        // Leave gaps for roads and intersections
        if (isAvenue || isStreet) continue;
        
        // Create parks/empty lots randomly
        if (Math.random() > 0.85) continue;

        const x = i * spacing;
        const z = j * spacing;
        
        // Zoning: Downtown Core vs Suburbs
        const distanceToCenter = Math.sqrt(x * x + z * z);
        const isDowntown = distanceToCenter < 12;
        
        // Calculate Height based on zone
        let heightBase = Math.max(0.2, 12 - distanceToCenter * 0.8);
        if (isDowntown && Math.random() > 0.5) heightBase += Math.random() * 8; // Skyscrapers
        
        const totalHeight = heightBase + Math.random() * 2;
        
        // Architecture: Podium (Base)
        const podiumHeight = totalHeight * 0.3;
        const podiumWidth = 1.1;
        pData.push({ x, y: podiumHeight / 2, z, w: podiumWidth, h: podiumHeight });
        
        // Architecture: Tower (Top)
        if (totalHeight > 1.5) {
          const towerHeight = totalHeight * 0.7;
          const towerWidth = 0.75 + Math.random() * 0.2; // Varied slimness
          tData.push({ x, y: podiumHeight + (towerHeight / 2), z, w: towerWidth, h: towerHeight });
          
          // Accents: Glowing architectural details on some tall buildings
          if (isDowntown && Math.random() > 0.7) {
            aData.push({ x, y: totalHeight + 0.1, z, w: towerWidth * 0.5, h: 0.2 });
          }
        }
        
        count++;
      }
    }
    return { podiums: pData, towers: tData, accents: aData, totalBuildings: count };
  }, []);

  useFrame(() => {
    if (!podiumsRef.current || !towersRef.current || !accentsRef.current) return;
    
    // Update Podiums
    podiums.forEach((b, i) => {
      dummy.position.set(b.x, b.y, b.z);
      dummy.scale.set(b.w, b.h, b.w);
      dummy.updateMatrix();
      podiumsRef.current!.setMatrixAt(i, dummy.matrix);
    });
    podiumsRef.current.instanceMatrix.needsUpdate = true;

    // Update Towers
    towers.forEach((b, i) => {
      dummy.position.set(b.x, b.y, b.z);
      dummy.scale.set(b.w, b.h, b.w);
      dummy.updateMatrix();
      towersRef.current!.setMatrixAt(i, dummy.matrix);
    });
    towersRef.current.instanceMatrix.needsUpdate = true;
    
    // Update Accents
    accents.forEach((b, i) => {
      dummy.position.set(b.x, b.y, b.z);
      dummy.scale.set(b.w, b.h, b.w);
      dummy.updateMatrix();
      accentsRef.current!.setMatrixAt(i, dummy.matrix);
    });
    accentsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* Podiums - Darker, rougher base */}
      <instancedMesh ref={podiumsRef} args={[undefined, undefined, podiums.length]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#050505" metalness={0.6} roughness={0.7} />
      </instancedMesh>
      
      {/* Towers - Sleeker, reflective glass */}
      <instancedMesh ref={towersRef} args={[undefined, undefined, towers.length]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.1} envMapIntensity={1.5} />
      </instancedMesh>
      
      {/* Accents - Warm glowing caps */}
      <instancedMesh ref={accentsRef} args={[undefined, undefined, accents.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#ffb74d" toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

// Elegant Architectural Marker
function MarketMarker({ position, title, stat, trend, delay = 0 }: { position: [number, number, number], title: string, stat: string, trend: string, delay?: number }) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      // Gentle pulsing animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.15;
      ringRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <group position={position}>
      {/* Invisible hit area for easier hovering */}
      <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} visible={false}>
        <sphereGeometry args={[1.5, 8, 8]} />
        <meshBasicMaterial />
      </mesh>
      
      {/* Glowing Architectural Ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.02, 16, 32]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.8} />
      </mesh>
      
      {/* Center Dot */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffb74d" />
      </mesh>
      
      {/* Vertical Line connecting marker to building */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 2, 8]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.4} />
      </mesh>

      {/* HTML Tooltip */}
      <Html position={[0, 0.8, 0]} center className="pointer-events-none z-50">
        <div 
          className={`transition-all duration-400 ease-out transform ${hovered ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-2'} origin-bottom`}
        >
          <div className="bg-[#050505]/80 backdrop-blur-xl border border-[#d4af37]/30 p-5 rounded-sm w-56 text-white shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <h4 className="font-sans text-[10px] tracking-widest text-[#d4af37] uppercase mb-2">{title}</h4>
            <div className="flex justify-between items-baseline border-t border-white/10 pt-3">
              <span className="font-display text-2xl font-light tracking-tight">{stat}</span>
              <span className="text-green-400/90 font-sans text-xs tracking-wider">{trend}</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

// Camera Controller mapped to scroll
function CameraController({ scrollProgressRef }: { scrollProgressRef: MutableRefObject<number> }) {
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Cinematic Path: Start wide, high, and distant. Sweep low and deep into the avenue.
    const startX = 25;
    const startY = 20;
    const startZ = 35;
    
    const endX = 0;
    const endY = 2; // Very low, street level perspective
    const endZ = 12; // Deep into the city
    
    const scrollProgress = scrollProgressRef.current;
    
    const targetX = startX - (startX - endX) * scrollProgress;
    const targetY = startY - (startY - endY) * scrollProgress;
    const targetZ = startZ - (startZ - endZ) * scrollProgress;
    
    // Add subtle ambient drift
    const driftX = Math.sin(time * 0.1) * 2;
    const driftZ = Math.cos(time * 0.15) * 2;
    
    state.camera.position.lerp(new THREE.Vector3(
      targetX + (scrollProgress > 0.8 ? driftX : 0), 
      targetY, 
      targetZ + (scrollProgress > 0.8 ? driftZ : 0)
    ), 0.05);
    
    // Look at downtown core
    const lookTarget = new THREE.Vector3(0, 4, 0);
    // As we get closer, look slightly up at the skyscrapers
    if (scrollProgress > 0.5) {
      lookTarget.y += (scrollProgress - 0.5) * 10;
    }
    
    const currentLookAt = new THREE.Vector3(0,0,0);
    // Interpolate lookAt for smoothness
    state.camera.getWorldDirection(currentLookAt);
    currentLookAt.add(state.camera.position); // current look target
    currentLookAt.lerp(lookTarget, 0.05);
    state.camera.lookAt(currentLookAt);
  });
  
  return null;
}

export default function CityMap({ scrollProgressRef }: { scrollProgressRef: MutableRefObject<number> }) {
  return (
    <div className="w-full h-full bg-[#030303] cursor-crosshair">
      <Canvas shadows camera={{ position: [25, 20, 35], fov: 45 }}>
        <color attach="background" args={['#030303']} />
        
        {/* Deep, cinematic fog to blend the horizon */}
        <fogExp2 attach="fog" args={['#030303', 0.025]} />
        
        {/* Soft moonlight ambient */}
        <ambientLight intensity={0.2} color="#88aaff" />
        
        {/* Main directional light casting sharp architectural shadows */}
        <directionalLight 
          position={[20, 30, -10]} 
          intensity={1.5} 
          color="#ffffff"
          castShadow 
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        
        {/* Warm golden fill light representing city glow */}
        <pointLight position={[0, -2, 10]} intensity={1.2} color="#ffb74d" distance={30} />
        
        {/* Intense Downtown Hotspot Lights */}
        <pointLight position={[2, 1, 2]} intensity={2.5} color="#d4af37" distance={15} />
        <pointLight position={[-3, 2, -4]} intensity={2} color="#ff8c00" distance={20} />

        {/* Procedural Architectural City */}
        <ArchitecturalCity />
        
        {/* Ground Plane (Asphalt/Concrete) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#020202" roughness={0.9} metalness={0.1} />
        </mesh>

        {/* Subtle ground reflection */}
        <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={80} blur={1.5} far={10} color="#000000" />
        
        {/* Environment Map for hyper-realistic glass reflections */}
        <Environment preset="night" />
        
        {/* Interactive Architectural Markers */}
        <MarketMarker position={[3, 12, 1]} title="The Financial District" stat="$2.4B" trend="+18% YOY" delay={0} />
        <MarketMarker position={[-5, 9, -3]} title="Midtown Tech Hub" stat="$850M" trend="+12% YOY" delay={1} />
        <MarketMarker position={[0, 16, -6]} title="Central Penthouse Row" stat="$1.1B" trend="+24% YOY" delay={2} />

        {/* Camera Control mapped to scroll */}
        <CameraController scrollProgressRef={scrollProgressRef} />
      </Canvas>
    </div>
  );
}
