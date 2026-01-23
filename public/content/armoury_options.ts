export interface Armoury {
  name: string;
  property: string;
  category: string;
}

export interface ZodiacArmouryConfig {
  slots: number;
  restriction: string;
  availableArmoury: Armoury[];
}

export const ZODIAC_ARMOURY: Record<string, ZodiacArmouryConfig> = {
  Aries: {
    slots: 3,
    restriction: "Melee only",
    availableArmoury: [
      { name: "Bloodsteel Greataxe", property: "Cleave", category: "melee" },
      { name: "Ram's Maul", property: "Topple", category: "melee" },
      { name: "Warhammer", property: "Push", category: "melee" },
      { name: "Battleaxe", property: "Topple", category: "melee" },
      { name: "Longsword", property: "Sap", category: "melee" },
      { name: "Greatsword", property: "Graze", category: "melee" },
      { name: "Flail", property: "Sap", category: "melee" },
      { name: "Morningstar", property: "Sap", category: "melee" },
    ],
  },
  Taurus: {
    slots: 2,
    restriction: "Heavy only",
    availableArmoury: [
      { name: "Obsidian Maul", property: "Topple", category: "heavy" },
      { name: "Bull Greatclub", property: "Push", category: "heavy" },
      { name: "Greatsword", property: "Graze", category: "heavy" },
      { name: "Greataxe", property: "Cleave", category: "heavy" },
      { name: "Maul", property: "Topple", category: "heavy" },
      { name: "Pike", property: "Push", category: "heavy" },
      { name: "Heavy Crossbow", property: "Push", category: "heavy" },
      { name: "Glaive", property: "Graze", category: "heavy" },
    ],
  },
  Gemini: {
    slots: 2,
    restriction: "Light/Finesse",
    availableArmoury: [
      { name: "Twin Daggers", property: "Nick", category: "light" },
      { name: "Quickthrow Handaxes", property: "Vex", category: "light" },
      { name: "Shortsword", property: "Vex", category: "finesse" },
      { name: "Scimitar", property: "Nick", category: "finesse" },
      { name: "Rapier", property: "Vex", category: "finesse" },
      { name: "Dagger", property: "Nick", category: "light" },
      { name: "Light Hammer", property: "Nick", category: "light" },
      { name: "Sickle", property: "Nick", category: "light" },
    ],
  },
  Cancer: {
    slots: 2,
    restriction: "Defensive",
    availableArmoury: [
      { name: "Moonsilver Flail", property: "Sap", category: "defensive" },
      { name: "Shell Mace", property: "Sap", category: "defensive" },
      { name: "Warhammer", property: "Push", category: "defensive" },
      { name: "Morningstar", property: "Sap", category: "defensive" },
      { name: "Quarterstaff", property: "Topple", category: "defensive" },
      { name: "Spear", property: "Sap", category: "defensive" },
      { name: "Trident", property: "Topple", category: "defensive" },
      { name: "Club", property: "Slow", category: "defensive" },
    ],
  },
  Leo: {
    slots: 3,
    restriction: "Any Armoury",
    availableArmoury: [
      { name: "Solar Greatsword", property: "Graze", category: "any" },
      { name: "Lion's Claw", property: "Graze", category: "any" },
      { name: "Longsword", property: "Sap", category: "any" },
      { name: "Greataxe", property: "Cleave", category: "any" },
      { name: "Lance", property: "Topple", category: "any" },
      { name: "Longbow", property: "Slow", category: "any" },
      { name: "Warhammer", property: "Push", category: "any" },
      { name: "Javelin", property: "Slow", category: "any" },
    ],
  },
  Virgo: {
    slots: 2,
    restriction: "Finesse",
    availableArmoury: [
      { name: "Precision Rapier", property: "Vex", category: "finesse" },
      { name: "Analyst's Dagger", property: "Nick", category: "finesse" },
      { name: "Shortsword", property: "Vex", category: "finesse" },
      { name: "Scimitar", property: "Nick", category: "finesse" },
      { name: "Whip", property: "Slow", category: "finesse" },
      { name: "Dart", property: "Vex", category: "finesse" },
      { name: "Dagger", property: "Nick", category: "finesse" },
      { name: "Sickle", property: "Nick", category: "finesse" },
    ],
  },
  Libra: {
    slots: 2,
    restriction: "Polearms",
    availableArmoury: [
      { name: "Balance Pike", property: "Push", category: "polearm" },
      { name: "Scale Halberd", property: "Push", category: "polearm" },
      { name: "Glaive", property: "Graze", category: "polearm" },
      { name: "Spear", property: "Sap", category: "polearm" },
      { name: "Quarterstaff", property: "Topple", category: "polearm" },
      { name: "Trident", property: "Topple", category: "polearm" },
      { name: "Lance", property: "Topple", category: "polearm" },
      { name: "Javelin", property: "Slow", category: "polearm" },
    ],
  },
  Scorpio: {
    slots: 2,
    restriction: "Slow/Vex",
    availableArmoury: [
      { name: "Venom Whip", property: "Slow", category: "slow" },
      { name: "Stinger Rapier", property: "Vex", category: "vex" },
      { name: "Dart", property: "Vex", category: "vex" },
      { name: "Shortsword", property: "Vex", category: "vex" },
      { name: "Club", property: "Slow", category: "slow" },
      { name: "Longbow", property: "Slow", category: "slow" },
      { name: "Crossbow", property: "Slow", category: "slow" },
      { name: "Sling", property: "Slow", category: "slow" },
    ],
  },
  Sagittarius: {
    slots: 2,
    restriction: "Ranged",
    availableArmoury: [
      { name: "Starfire Longbow", property: "Slow", category: "ranged" },
      { name: "Archer's Javelin", property: "Slow", category: "ranged" },
      { name: "Shortbow", property: "Vex", category: "ranged" },
      { name: "Light Crossbow", property: "Slow", category: "ranged" },
      { name: "Heavy Crossbow", property: "Push", category: "ranged" },
      { name: "Hand Crossbow", property: "Vex", category: "ranged" },
      { name: "Dart", property: "Vex", category: "ranged" },
      { name: "Sling", property: "Slow", category: "ranged" },
    ],
  },
  Capricorn: {
    slots: 3,
    restriction: "Martial",
    availableArmoury: [
      { name: "Mountain Warhammer", property: "Topple", category: "martial" },
      { name: "Goat Battleaxe", property: "Cleave", category: "martial" },
      { name: "Longsword", property: "Sap", category: "martial" },
      { name: "Greatsword", property: "Graze", category: "martial" },
      { name: "Pike", property: "Push", category: "martial" },
      { name: "Glaive", property: "Graze", category: "martial" },
      { name: "Lance", property: "Topple", category: "martial" },
      { name: "Morningstar", property: "Sap", category: "martial" },
    ],
  },
  Aquarius: {
    slots: 2,
    restriction: "Thrown",
    availableArmoury: [
      { name: "Lightning Handaxe", property: "Vex", category: "thrown" },
      { name: "Storm Javelin", property: "Slow", category: "thrown" },
      { name: "Javelin", property: "Slow", category: "thrown" },
      { name: "Handaxe", property: "Vex", category: "thrown" },
      { name: "Spear", property: "Sap", category: "thrown" },
      { name: "Trident", property: "Topple", category: "thrown" },
      { name: "Dagger", property: "Nick", category: "thrown" },
      { name: "Light Hammer", property: "Nick", category: "thrown" },
    ],
  },
  Pisces: {
    slots: 2,
    restriction: "Trident/Whip",
    availableArmoury: [
      { name: "Tidal Trident", property: "Push", category: "trident" },
      { name: "Wave Whip", property: "Slow", category: "whip" },
      { name: "Trident", property: "Topple", category: "trident" },
      { name: "Whip", property: "Slow", category: "whip" },
      { name: "Coral Trident", property: "Sap", category: "trident" },
      { name: "Seaweed Whip", property: "Vex", category: "whip" },
      { name: "Net", property: "Slow", category: "special" },
      { name: "Harpoon", property: "Push", category: "special" },
    ],
  },
};
