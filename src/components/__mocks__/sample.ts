import { vi } from "vitest";
import * as THREE from "three";
import type {
  CarouselGroupProps,
  CarouselSegmentProps,
  ModalProps,
  DropdownProps,
  ZodiacModalContentProps,
  SceneProps,
} from "../../types";

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

export const mockDropdownProps: DropdownProps = {
  items: ["Option 1", "Option 2", "Option 3"],
  selectionCount: 2,
  selectedItems: [0],
  onSelectionChange: vi.fn(),
};

export const mockModalProps: ModalProps = {
  isOpen: true,
  onClose: vi.fn(),
  children: "Modal Content",
  sign: "Aries",
  backgroundImage: "path/to/image.jpg",
};

export const mockZodiacModalContentProps: ZodiacModalContentProps = {
  selectedSign: "Aries",
  mode: "zodiac" as const,
  selectedSkills: [0, 1],
  selectedArmoury: [0],
  onSkillsChange: vi.fn(),
  onArmouryChange: vi.fn(),
  onAwaken: vi.fn(),
};

export const mockSceneProps: SceneProps = {
  onSegmentClick: vi.fn(),
  items: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo"],
  isSpinning: false,
  mode: "zodiac" as const,
};
