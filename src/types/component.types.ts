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
  mode: "zodiac" | "species" | "backgrounds";
}

export interface DropdownProps {
  items: string[];
  selectionCount: number;
  selectedItems: string[];
  onSelectionChange: (selected: string[]) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  sign?: string;
  backgroundImage?: string;
  isClosing?: boolean;
}

export interface ZodiacModalContentProps {
  selectedSign?: string;
  mode: "zodiac" | "species" | "backgrounds";
  selectedSkills: string[];
  selectedArmoury: string[];
  selectedLanguages: string[];
  selectedOrder?: string | null;
  selectedBackground?: string | null;
  selectedLineage?: ancestryConfig;
  onSkillsChange: (skills: string[]) => void;
  onArmouryChange: (armoury: string[]) => void;
  onLanguageChange: (languages: string[]) => void;
  onLineageChange: (lineage: ancestryConfig) => void;
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

// Background Data Types
export interface BackgroundDisplayData {
  kind: "background";
  iconPath: string;
  displayName: string;
  title: string;
  description: string;
  featureName: string;
  featureDescription: string;
  characteristics: string[];
}

export interface DetailsDisplayData {
  title: string;
  subtitle: string;
  description: string;
}

export type DisplayData =
  | ZodiacDisplayData
  | SpeciesDisplayData
  | BackgroundDisplayData;

export interface SceneProps {
  onSegmentClick?: (sign: string) => void;
  items: string[];
  isSpinning: boolean;
  mode: "zodiac" | "species" | "backgrounds";
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
  mode: "zodiac" | "species" | "backgrounds";
}

export interface ImageGeneratorProps {
  onGenerate: number;
  userPrompt: string;
}
