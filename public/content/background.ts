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

export const starbornHeir: CharacterBackground = {
  id: "starborn-heir",
  name: "Starborn Heir",
  description:
    "You were not raised in palaces. You lived as ordinary—perhaps even overlooked. Then you Awakened, and the stars answered differently for you. Your magic reacted in a way it only does for royal blood. Ancient wards responded. Old oaths stirred. Prophecies whispered your name. You are descended from the throne—and someone very powerful would have preferred that remain secret.",
  feature: {
    name: "Blood of the Crown",
    description:
      "You have advantage on saving throws against being charmed by creatures of noble or royal status. Once per long rest, when you fail a Charisma-based check, you may reroll it. Those aware of your heritage react strongly—either deference or hostility—and you can request an audience with political figures tied to the throne.",
  },
  characteristics: [
    "Imposter syndrome mixed with sudden authority",
    "Anger at a lost childhood, or refusal to be controlled",
    "Destiny vs free will—the weight of legacy you never asked for",
  ],
};

export const oracleSister: CharacterBackground = {
  id: "oracle-sister",
  name: "Oracle Sister",
  description:
    "You are one of the fabled Oracle Sisters, or your lineage and training mirror theirs. Your powers are tied to perception, speech, and the hidden threads of fate. Whether you see, speak, or hear the truths of the cosmos, your connection to celestial knowledge is profound—and isolating. Your gifts are revered, feared, or misunderstood. Few can comprehend the weight of prophecy or the subtlety of your insight.",
  feature: {
    name: "Sisterly Gift",
    description:
      "Choose your Oracle Path: Vidi (Sight of the Stars)—cast Augury or Divination once per long rest without components, advantage on Insight checks for hidden truths. Loqui (Tongue of Fate)—grant an ally a reroll once per long rest, proficiency in Persuasion and Deception. Audire (Whisper of Destiny)—detect lies or overhear secret whispers once per long rest, proficiency in Perception and Investigation.",
  },
  characteristics: [
    "Burdened by knowledge others cannot bear",
    "Isolated yet drawn to connection—truths can hurt allies or enemies",
    "Torn between duty to fate and personal desire",
  ],
};

export const benevolentNymph: CharacterBackground = {
  id: "benevolent-nymph",
  name: "Benevolent Nymph",
  description:
    "You are a nymph in service of nature, magic, or the celestial balance—but unlike the shadow-touched or politically ambitious, you use your gifts for good. Your presence calms those around you, your magic nurtures life, and your counsel is sought by those in trouble. Though your intentions are pure, your compassion can make you a target—not everyone trusts kindness in a world full of ambition and intrigue.",
  feature: {
    name: "Nurturing Presence",
    description:
      "You gain advantage on Persuasion or Insight checks when helping, consoling, or negotiating peacefully. Once per long rest, you can heal or stabilize an ally for 1d8 + proficiency modifier through innate nymph magic. Creatures of good or neutral alignment feel instinctive trust toward you, easing social interactions.",
  },
  characteristics: [
    "Compassion in a cruel world—a symbol of hope in dark times",
    "Balancing neutrality and intervention; the moral cost of always helping",
    "Innocence meeting experience; kindness that others may exploit",
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
  oracleSister,
  benevolentNymph,
];
