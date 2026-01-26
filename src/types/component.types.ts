import * as THREE from "three";
import type { ReactNode } from "react";
import type { ancestryConfig } from "../../public/content/order_options";

export interface SphereData {
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

export interface CarouselSegmentProps {
  index: number;
  angle: number;
  texture: THREE.Texture;
  onSegmentClick?: (sign: string) => void;
  itemName: string;
  segAngle: number;
  radius: number;
  mode: "zodiac" | "species";
}

export interface DropdownProps {
  items: string[];
  selectionCount: number;
  selectedItems: number[];
  onSelectionChange: (selected: number[]) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  sign?: string;
  backgroundImage?: string;
}

export interface ZodiacModalContentProps {
  selectedSign?: string;
  mode: "zodiac" | "species";
  selectedSkills: number[];
  selectedArmoury: number[];
  selectedOrder?: string | null;
  onSkillsChange: (skills: number[]) => void;
  onArmouryChange: (armoury: number[]) => void;
  onAwaken: () => void;
}

// Zodiac Data Types
export interface ZodiacDisplayData {
  kind: "zodiac";
  iconPath: string;
  displayName: string;
  symbol: string;
  title: string;
  subtitle: string;
  description: string;
  skillsList: string[];
  skillsCount: number;
  armouryItems: string[];
  armourySlots: number;
  // showArmoury: boolean;
}

// Species Data Types
export interface SpeciesDisplayData {
  kind: "species";
  iconPath: string;
  displayName: string;
  title: string;
  subtitle: string;
  description: string;
  size: string;
  speed: string;
  specialAbilities: string[];
  languages: string[];
  lineage: ancestryConfig[];
}

export type DisplayData = ZodiacDisplayData | SpeciesDisplayData;

export interface SceneProps {
  onSegmentClick?: (sign: string) => void;
  items: string[];
  isSpinning: boolean;
  mode: "zodiac" | "species";
}

export interface ButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
}

export interface CarouselGroupProps {
  onSegmentClick?: (sign: string) => void;
  items: string[];
  isSpinning: boolean;
  mode: "zodiac" | "species";
}

export interface ImageGeneratorProps {
  onGenerate: number;
  userPrompt: string;
}
