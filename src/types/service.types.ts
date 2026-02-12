export interface CharacterLineage {
  name: string;
  description: string;
  bonuses: string[];
}

export interface CharacterSelection {
  id: string;
  zodiac_sign: string;
  order_species: string;
  skills: string[];
  armoury: string[];
  languages: string[];
  lineage?: CharacterLineage;
  created_at?: string;
  updated_at?: string;
}

export interface SaveCharacterResponse {
  success: boolean;
  id: string;
  meta?: {
    duration: number;
    changes: number;
  };
}
