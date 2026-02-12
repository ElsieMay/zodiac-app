import { useRef, useState, useMemo } from "react";
import { Text3D, Center } from "@react-three/drei";
import * as THREE from "three";
import {
  ZODIAC_SIGNS,
  ORDER_SPECIES,
  BACKGROUNDS,
  BACKGROUND_LABELS,
} from "../../constants/config";
import type { CarouselSegmentProps } from "../../types/component.types";
import { CAROUSEL_CONFIG } from "./Carousel";

export function CarouselSegment({
  index,
  angle,
  texture,
  onSegmentClick,
  itemName,
  segAngle,
  radius,
  mode,
}: CarouselSegmentProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const geom = new THREE.CylinderGeometry(
      radius,
      radius,
      CAROUSEL_CONFIG.cylinderHeight,
      10,
      1,
      true,
      0,
      segAngle,
    );
    return geom;
  }, [radius, segAngle]);

  // The actual angular spacing between segments (full circle / number of items)
  // segAngle is smaller (the cylinder arc), so we center text within the placement spacing
  const itemCount =
    mode === "zodiac"
      ? ZODIAC_SIGNS.length
      : mode === "species"
        ? ORDER_SPECIES.length
        : BACKGROUNDS.length;
  const placementAngle = (Math.PI * 2) / itemCount;
  const textAngle = angle + placementAngle / 2;
  const textRadius = radius * 1.01; // Slightly outside the cylinder
  const textPosition = new THREE.Vector3(
    Math.sin(textAngle) * textRadius,
    CAROUSEL_CONFIG.textYOffset,
    Math.cos(textAngle) * textRadius,
  );
  const textRotation = new THREE.Euler(0, textAngle, 0);

  return (
    <>
      <mesh
        ref={meshRef}
        geometry={geometry}
        rotation={[0, angle, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSegmentClick?.(itemName)}
        userData={{ segmentIndex: index, className: itemName }}
        data-testid={`carousel-segment-${index}`}
      >
        <meshStandardMaterial
          side={THREE.DoubleSide}
          map={texture}
          emissive={hovered ? 0x860808 : 0x000000}
          emissiveIntensity={hovered ? 0.25 : 0}
          alphaTest={0.5}
          transparent
        />
      </mesh>
      <group position={textPosition} rotation={textRotation}>
        <Center>
          <Text3D
            font="/fonts/Cormorant_Unicase_Light_Regular.json"
            size={0.08}
            height={0.01}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.002}
            bevelSize={0.001}
            bevelSegments={5}
            data-testid={`carousel-text-${index}`}
          >
            {mode === "zodiac"
              ? ZODIAC_SIGNS[index]
              : mode === "species"
                ? ORDER_SPECIES[index]
                : BACKGROUND_LABELS[BACKGROUNDS[index]]}
            <meshStandardMaterial
              color={0xe9d491}
              metalness={0.8}
              roughness={0.5}
            />
          </Text3D>
        </Center>
      </group>
    </>
  );
}
