import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { SphereData } from "../types/component.types";
import { calculateSpherePosition } from "../helpers";

function randomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function BackgroundSphere({ data }: { data: SphereData }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.elapsedTime;
    calculateSpherePosition(t, data, meshRef.current);
  });

  return (
    <mesh ref={meshRef} data-testid="background-sphere">
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color={data.starColor}
        emissive={data.starColor}
        emissiveIntensity={data.baseIntensity * 0.5}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
}

function BackgroundSpheres({ count = 340 }: { count?: number }) {
  const [spheresData] = useState(() => {
    return Array.from({ length: count }, () => ({
      posY: THREE.MathUtils.randFloat(-10, 10),
      radius: THREE.MathUtils.randFloat(5, 10),
      phase: Math.random() * Math.PI * 2,
      speed: (0.1 - Math.random() * 0.2) * Math.PI,
      twinkleSpeed: Math.random() * 3 + 0.5,
      twinklePhase: Math.random() * Math.PI * 2,
      baseIntensity: randomArbitrary(1.5, 3.0),
      starColor: new THREE.Color(
        1,
        randomArbitrary(230, 255) / 255,
        randomArbitrary(180, 220) / 255,
      ),
      scale: THREE.MathUtils.randFloat(0.01, 0.03),
    }));
  });

  return (
    <group data-testid="background-spheres">
      {spheresData.map((data, i) => (
        <BackgroundSphere key={i} data={data} />
      ))}
    </group>
  );
}

export function Background() {
  return (
    <div className="player-container" data-testid="background-container">
      <Canvas
        data-testid="background-canvas"
        camera={{ position: [0, 0, 3], fov: 60, near: 1, far: 2000 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <BackgroundSpheres count={340} />
      </Canvas>
    </div>
  );
}
