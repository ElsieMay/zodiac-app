import { useRef, useState, useMemo } from "react";
import { Text3D } from "@react-three/drei";
import * as THREE from "three";
import { ZODIAC_SIGNS, ORDER_SPECIES } from "../constants/config";
import { CAROUSEL_CONFIG } from "./Carousel";

interface CarouselSegmentProps {
  index: number;
  angle: number;
  texture: THREE.Texture;
  onSegmentClick?: (sign: string) => void;
  itemName: string;
  segAngle: number;
  radius: number;
  mode: "zodiac" | "species";
}

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

  const textAngle = angle + segAngle / 2;
  const textPosition = new THREE.Vector3(
    Math.sin(textAngle) * radius,
    CAROUSEL_CONFIG.textYOffset,
    Math.cos(textAngle) * radius,
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
      <Text3D
        font="/fonts/Cormorant_Unicase_Light_Regular.json"
        size={0.08}
        height={0.01}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.002}
        bevelSize={0.001}
        bevelSegments={5}
        position={textPosition}
        rotation={textRotation}
        onUpdate={(self) => {
          self.geometry.center();
        }}
      >
        {mode == "zodiac" ? ZODIAC_SIGNS[index] : ORDER_SPECIES[index]}
        <meshStandardMaterial
          color={0xe9d491}
          metalness={0.8}
          roughness={0.5}
        />
      </Text3D>
    </>
  );
}
