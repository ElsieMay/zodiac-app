import { vi } from "vitest";
import * as THREE from "three";
import type { CarouselGroupProps, CarouselSegmentProps } from "../../types";

export const mockCarouselGroupProps: CarouselGroupProps = {
  onSegmentClick: vi.fn(),
  items: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo"],
  isSpinning: false,
  mode: "zodiac",
};

export const mockCarouselSegmentProps: CarouselSegmentProps = {
  index: 0,
  angle: 0,
  texture: new THREE.Texture(),
  onSegmentClick: vi.fn(),
  itemName: "Aries",
  segAngle: Math.PI / 3,
  radius: 5,
  mode: "zodiac",
};
