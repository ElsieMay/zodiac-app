import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  updateRotation,
  CENTER_GEOMETRY_CONFIG,
} from "../../helpers/centerGeoUtils";

export function CenterSceneGeometry() {
  const icosahedronRef = useRef<THREE.Mesh>(null);
  const ringSmallRef = useRef<THREE.Mesh>(null);
  const ringLargeRef = useRef<THREE.Mesh>(null);

  /* istanbul ignore next -- @preserve useFrame callback tested via updateRotation */
  useFrame(() => {
    updateRotation(
      icosahedronRef.current?.rotation,
      CENTER_GEOMETRY_CONFIG.icosahedronRotationSpeed,
    );
    updateRotation(
      ringSmallRef.current?.rotation,
      CENTER_GEOMETRY_CONFIG.ringSmallRotationSpeed,
    );
    updateRotation(
      ringLargeRef.current?.rotation,
      CENTER_GEOMETRY_CONFIG.ringLargeRotationSpeed,
    );
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
