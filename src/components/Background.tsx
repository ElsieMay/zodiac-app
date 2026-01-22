import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function randomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface SphereData {
  posY: number;
  radius: number;
  phase: number;
  speed: number;
  twinkleSpeed: number;
  twinklePhase: number;
  baseIntensity: number;
  starColor: THREE.Color;
  scale: number;
}

function BackgroundSphere({ data }: { data: SphereData }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.elapsedTime;
    const a = data.speed * t + data.phase;
    meshRef.current.position
      .set(Math.cos(a), 0, -Math.sin(a))
      .multiplyScalar(data.radius)
      .setY(data.posY);

    // Twinkling effect
    const twinkle =
      Math.sin(t * data.twinkleSpeed + data.twinklePhase) * 0.5 + 0.5;
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = data.baseIntensity * (twinkle * 0.4 + 0.2);

    // Subtle scale pulsing for sparkle effect
    const scalePulse =
      1 + Math.sin(t * data.twinkleSpeed * 2 + data.twinklePhase) * 0.1;
    meshRef.current.scale.setScalar(data.scale * scalePulse);
  });

  return (
    <mesh ref={meshRef}>
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
    <>
      {spheresData.map((data, i) => (
        <BackgroundSphere key={i} data={data} />
      ))}
    </>
  );
}

export function Background() {
  return (
    <div className="player-container">
      <Canvas
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
