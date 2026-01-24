import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const CENTER_GEOMETRY_CONFIG = {
  icosahedronRotationSpeed: 2 / 200,
  ringSmallRotationSpeed: 0.03,
  ringLargeRotationSpeed: 0.01,
} as const;

export function CenterSceneGeometry() {
  const icosahedronRef = useRef<THREE.Mesh>(null);
  const ringSmallRef = useRef<THREE.Mesh>(null);
  const ringLargeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x +=
        CENTER_GEOMETRY_CONFIG.icosahedronRotationSpeed;
      icosahedronRef.current.rotation.y +=
        CENTER_GEOMETRY_CONFIG.icosahedronRotationSpeed;
    }
    if (ringSmallRef.current) {
      ringSmallRef.current.rotation.x +=
        CENTER_GEOMETRY_CONFIG.ringSmallRotationSpeed;
      ringSmallRef.current.rotation.y +=
        CENTER_GEOMETRY_CONFIG.ringSmallRotationSpeed;
    }
    if (ringLargeRef.current) {
      ringLargeRef.current.rotation.x +=
        CENTER_GEOMETRY_CONFIG.ringLargeRotationSpeed;
      ringLargeRef.current.rotation.y +=
        CENTER_GEOMETRY_CONFIG.ringLargeRotationSpeed;
    }
  });

  return (
    <>
      <mesh ref={icosahedronRef} scale={0.5} data-testid="center-icosahedron">
        <icosahedronGeometry args={[0.5]} />
        <meshPhongMaterial
          color={0x860808}
          shininess={100}
          specular={0xaaaaaa}
        />
      </mesh>
      <mesh ref={ringSmallRef} data-testid="center-ring-small">
        <torusGeometry args={[0.6, 0.02, 16, 100]} />
        <meshStandardMaterial metalness={1} roughness={0.5} color={0xe9d491} />
      </mesh>
      <mesh ref={ringLargeRef} data-testid="center-ring-large">
        <torusGeometry args={[1.2, 0.01, 16, 100]} />
        <meshStandardMaterial metalness={1} roughness={0.5} color={0xe9d491} />
      </mesh>
    </>
  );
}
