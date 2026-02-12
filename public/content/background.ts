export interface BackgroundFeature {
  name: string;
  description: string;
}

export interface CharacterDetails {
  alignment?: string;
  faith?: string;
  lifestyle?: string;
}

export interface PhysicalCharacteristics {
  hair?: string;
  skin?: string;
  eyes?: string;
  height?: string;
  weight?: string;
  age?: string;
  gender?: string;
  distinguishingMarks?: string;
}

export interface PersonalityCharacteristics {
  traits?: string[];
  ideals?: string[];
  bonds?: string[];
  flaws?: string[];
}

export interface Notes {
  organisations?: string[];
  allies?: string[];
  enemies?: string[];
  backstory?: string;
  other?: string;
}

export interface CharacterBackground {
  id: string;
  name: string;
  description: string;
  feature: BackgroundFeature;
  characteristics?: string[];
  characterDetails?: CharacterDetails;
  physicalCharacteristics?: PhysicalCharacteristics;
  personalityCharacteristics?: PersonalityCharacteristics;
  notes?: Notes;
}

export const heirOfCelestialHouses: CharacterBackground = {
  id: "heir-of-celestial-houses",
  name: "Heir of the Celestial Houses",
  description:
    "You were born into one of the Great Houses tied to a celestial order. Power is your birthright—but so is scrutiny.",
  feature: {
    name: "Birthright Authority",
    description:
      "Lesser nobles, servants, and institutions recognize your status. You can gain audiences, favors, or shelter—but rivals will absolutely notice you.",
  },
  characteristics: [
    "Used to being obeyed, not trusted",
    "Failure feels catastrophic",
    "Other players may resent or rely on you",
  ],
};

export const awakenedLate: CharacterBackground = {
  id: "awakened-late",
  name: "Awakened Late",
  description:
    "You discovered your magic far later than everyone else—and were thrown into a world that assumes you should already know the rules.",
  feature: {
    name: "Unpredictable Potential",
    description:
      "People underestimate you. Once per social encounter, you can surprise others with competence or raw power they didn't expect.",
  },
  characteristics: [
    "Ask 'stupid' questions that expose hypocrisy",
    "Emotionally scrappy",
    "Don't buy into old traditions easily",
  ],
};

export const academySurvivor: CharacterBackground = {
  id: "academy-survivor",
  name: "Academy Survivor",
  description:
    "Your education wasn't safe—it was a battlefield. You learned fast, or you didn't survive.",
  feature: {
    name: "Trial by Fire",
    description:
      "You're accustomed to high-pressure situations. When chaos breaks out, you instinctively know where to stand, hide, or strike.",
  },
  characteristics: [
    "Trust is earned slowly",
    "Hyper-aware of power dynamics",
    "May struggle to relax",
  ],
};

export const boundToTheStars: CharacterBackground = {
  id: "bound-to-the-stars",
  name: "Bound to the Stars",
  description:
    "The cosmos has taken a personal interest in you. Fate nudges your life in dramatic, inconvenient ways.",
  feature: {
    name: "Whispers of Fate",
    description:
      "The DM may give you symbolic dreams, omens, or gut feelings about important choices—cryptic, never complete.",
  },
  characteristics: [
    "Question free will",
    "Feel watched (because you are)",
    "Big 'chosen, but tired of it' energy",
  ],
};

export const shadowCourtInitiate: CharacterBackground = {
  id: "shadow-court-initiate",
  name: "Shadow Court Initiate",
  description:
    "You were trained—or recruited—by a secretive power structure that values results over morality.",
  feature: {
    name: "Underworld Contacts",
    description:
      "You know how to find illicit magic, black-market favors, or people who don't ask questions.",
  },
  characteristics: [
    "Justify questionable choices",
    "Loyalty matters more than law",
    "Redemption or corruption arc potential",
  ],
};

export const celestialOutcast: CharacterBackground = {
  id: "celestial-outcast",
  name: "Celestial Outcast",
  description:
    "You once belonged—but lost your place due to betrayal, scandal, or failure.",
  feature: {
    name: "Nothing Left to Lose",
    description:
      "You're hard to intimidate when threats involve status or reputation—you already lost them.",
  },
  characteristics: [
    "Bitter or quietly determined",
    "Obsessed with reclaiming or rejecting your past",
    "Strong emotional hooks for the DM",
  ],
};

export const shadowInfluenced: CharacterBackground = {
  id: "shadow-influenced",
  name: "Shadow-Influenced",
  description:
    "At some point, the darkness noticed you—and you didn't look away. Whether through desperation, ambition, or survival, you accepted the shadow's touch and pledged yourself (knowingly or not) to Lavinia's influence. The shadows protect you… but they also watch.",
  feature: {
    name: "Marked by Shadow",
    description:
      "Those attuned to darkness sense you instinctively. Shadow creatures, cultists, corrupted mages, and morally flexible factions are more inclined to hear you out rather than attack immediately. Once per session, you may call in a minor favor from a shadow-aligned NPC or gain safe passage through a dangerous area tied to dark magic.",
  },
  characteristics: [
    "Calm when others panic",
    "Speaks carefully; listens more than talks",
    "Views morality as situational",
  ],
};

export const allBackgrounds: CharacterBackground[] = [
  heirOfCelestialHouses,
  awakenedLate,
  academySurvivor,
  boundToTheStars,
  shadowCourtInitiate,
  celestialOutcast,
  shadowInfluenced,
];
