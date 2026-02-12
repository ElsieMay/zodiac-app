import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import type { CarouselGroupProps } from "../../types/component.types";
import { CAROUSEL_CONFIG } from "./Carousel";
import { CarouselSegment } from "./CarouselSegment";

export function CarouselGroup({
  onSegmentClick,
  items,
  isSpinning,
  mode,
}: CarouselGroupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const spinSpeed = useRef(0);
  const len = items.length * CAROUSEL_CONFIG.spacing;
  const radius = len / (Math.PI * 2);
  const segAngle = (Math.PI * 2) / len / CAROUSEL_CONFIG.spacing;

  useFrame(() => {
    if (groupRef.current && isSpinning) {
      spinSpeed.current = Math.min(spinSpeed.current + 0.002, 0.15);
      groupRef.current.rotation.y += spinSpeed.current;
    } else if (groupRef.current && !isSpinning && spinSpeed.current > 0) {
      spinSpeed.current = Math.max(spinSpeed.current - 0.005, 0);
      groupRef.current.rotation.y += spinSpeed.current;
    }
  });

  const textures = useLoader(
    TextureLoader,
    items.map((item) =>
      mode === "zodiac"
        ? `/zodiacs/icons/${item.toLowerCase()}.png`
        : mode === "species"
          ? `/zodiacs/orders/${item}.png`
          : `/zodiacs/backgrounds/${item}.png`,
    ),
  );

  textures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
  });

  return (
    <group ref={groupRef} data-testid="carousel-group">
      {items.map((_, i) => {
        const angle = ((Math.PI * 2) / items.length) * i;
        return (
          <CarouselSegment
            key={i}
            index={i}
            angle={angle}
            texture={textures[i]}
            onSegmentClick={onSegmentClick}
            itemName={items[i]}
            segAngle={segAngle}
            radius={radius}
            mode={mode}
          />
        );
      })}
    </group>
  );
}
