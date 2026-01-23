export interface SkillsConfig {
  class: string;
  symbol?: string;
  description: string;
  skillsOptions: SkillsOption;
}

export interface SkillsOption {
  skillList: string[];
  skillCount: number;
}

export const ZODIAC_SKILLS: Record<string, SkillsConfig> = {
  Aries: {
    class: "Barbarian",
    symbol: "♈",
    description:
      "The Barbarian channels the fiery, impulsive energy of Aries, representing raw courage, aggression, and leadership. Rage is flavored as a connection to the warrior spirit of Aries, granting unstoppable aggression in battle. They tap into fire-based abilities, representing Aries' connection to the element of fire, and can summon animal spirits like the ram or divine manifestations of an Aries warrior. \nPower through fury, instinct, and raw emotion. Rage is the soul igniting with primordial starfire. Seen as shock troops, champions, or living armoury. Strength through action, not restraint.",
    skillsOptions: {
      skillList: [
        "Animal Handling",
        "Athletics",
        "Intimidation",
        "Nature",
        "Perception",
        "Survival",
      ],
      skillCount: 2,
    },
  },
  Taurus: {
    class: "Warlock",
    symbol: "♉",
    description:
      "The Warlock channels Taurus' grounded, loyal, and material-driven nature, forming pacts with powerful entities to gain long-lasting, stable power. The Fiend or Archfey pact reflects Taurus' need for security and stability, drawing upon ancient, reliable forces. Their abilities are flavored around the earth, fertility, and wealth, with powers that enhance resilience, physicality, and prosperity. \nPower through ancient pacts and enduring bonds. Magic is stable, reliable, but comes at a cost. Patrons may be star-beasts, elder constellations. Loyalty is power—and power remembers.",
    skillsOptions: {
      skillList: [
        "Arcana",
        "Deception",
        "History",
        "Intimidation",
        "Investigation",
        "Nature",
        "Religion",
      ],
      skillCount: 2,
    },
  },
  Gemini: {
    class: "Wizard",
    symbol: "♊",
    description:
      "The Wizard channels the curiosity, adaptability, and communication skills of Gemini, specializing in mental magic and diversity. They focus on illusion magic, mind manipulation, and divination, reflecting Gemini's dual nature and adaptability. Their spells manipulate, outwit, or predict outcomes based on the duality of Gemini's intelligence and communication skills. \nPower through knowledge, adaptability, and intellect. Magic is learned, recorded, perfected. Often arcanists, researchers, tacticians. Truth has many faces, and they know them all.",
    skillsOptions: {
      skillList: [
        "Arcana",
        "History",
        "Insight",
        "Investigation",
        "Medicine",
        "Religion",
      ],
      skillCount: 2,
    },
  },
  Cancer: {
    class: "Druid",
    symbol: "♋",
    description:
      "The Druid takes on the role of the nurturer and protector, using the power of nature to safeguard others, much like Cancer's emotional depth and loyalty. They summon creatures with deep connections to the ocean or shells, like giant crabs or sea creatures. Their powers are centered around emotional connection, protection of loved ones, and deep intuitive magic. \nPower through emotional bonds and nature. Magic is protective, adaptive, and deeply personal. Shapeshifting reflects instinct and loyalty. Nature is family, not a resource.",
    skillsOptions: {
      skillList: [
        "Arcana",
        "Animal Handling",
        "Insight",
        "Medicine",
        "Nature",
        "Perception",
        "Religion",
        "Survival",
      ],
      skillCount: 2,
    },
  },
  Leo: {
    class: "Paladin",
    symbol: "♌",
    description:
      "The Paladin embodies Leo's courage, charisma, and leadership, standing as a shining beacon of hope and honor. Their Oath of Devotion reflects the radiance of Leo, with a focus on heroism, loyalty, and honor. Their powers reflect the sun (Leo's ruling planet), providing inspirational auras, flames, or summoned lion spirits. \nPower through conviction, honor, and leadership. Magic manifests as radiant force and inspiring presence. Often champions, holy warriors, or icons of hope. Their belief becomes law on the battlefield.",
    skillsOptions: {
      skillList: [
        "Athletics",
        "Insight",
        "Intimidation",
        "Medicine",
        "Persuasion",
        "Religion",
      ],
      skillCount: 2,
    },
  },
  Virgo: {
    class: "Cleric",
    symbol: "♍",
    description:
      "The Cleric represents Virgo's devotion to service, healing, and wisdom, embodying a nurturer, protector, and purifier. They focus on restoration magic and protection, with spells that cleanse and heal, drawing on Virgo's earth-based, practical nature. Their Domain of Life reflects a deep connection to the Earth, making them healers with a sacred bond to natural life. \nPower through service, care, and divine order. Magic manifests as restoration, purification, protection. Often medics, caretakers, sacred scholars. Belief is less about faith, more about responsibility.",
    skillsOptions: {
      skillList: ["History", "Insight", "Medicine", "Persuasion", "Religion"],
      skillCount: 2,
    },
  },
  Libra: {
    class: "Bard",
    symbol: "♎",
    description:
      "The Bard becomes a master of balance, diplomacy, and charming others, reflecting Libra's love for harmony and social justice. They focus on empathy, charming spells, and illusion to maintain peace and balance. Their College of Eloquence fits Libra's natural charm and negotiation skills, weaving the stars into their performances and drawing power from the cosmic balance of the universe. \nPower through words, emotion, and harmony. Magic is persuasion, art, and social gravity. Often diplomats, performers, judges, or revolutionaries. Can soothe wars—or start them—with a song.",
    skillsOptions: {
      skillList: [
        "Acrobatics",
        "Animal Handling",
        "Arcana",
        "Athletics",
        "Deception",
        "History",
        "Insight",
        "Intimidation",
      ],
      skillCount: 3,
    },
  },
  Scorpio: {
    class: "Rogue",
    symbol: "♏",
    description:
      "The Rogue embodies the secretive, cunning nature of Scorpio, mastering stealth, deception, and psychological manipulation. They excel at infiltration, poison, and psychic manipulation (like intimidation and charming others), reflecting Scorpio's mysterious and emotional depth. Their attacks involve psychic strikes, poisoned blades, or mind games that leave enemies unsure of who they're truly dealing with. \nPower through secrecy, precision, and emotional depth. Magic-adjacent skills: poison, shadow, fear. Often spies, assassins, saboteurs. Transformation through darkness is their gift.",
    skillsOptions: {
      skillList: [
        "Acrobatics",
        "Athletics",
        "Deception",
        "Insight",
        "Intimidation",
        "Investigation",
        "Perception",
        "Performance",
        "Persuasion",
        "Sleight of Hand",
        "Stealth",
      ],
      skillCount: 4,
    },
  },
  Sagittarius: {
    class: "Ranger",
    symbol: "♐",
    description:
      "The Ranger channels Sagittarius' adventurous spirit, focusing on exploration, freedom, and long-range combat. Their hunter's mark could be flavored as an astrological sign, tracking enemies based on their Zodiac traits or celestial position. Beast Master companions are spiritual animals drawn from Sagittarius' connection to the hunt, or even celestial beasts. \nPower through freedom, exploration, and precision. Magic enhances movement, tracking, and the hunt. Often scouts, explorers, monster hunters. No horizon is ever far enough.",
    skillsOptions: {
      skillList: [
        "Animal Handling",
        "Athletics",
        "Insight",
        "Investigation",
        "Nature",
        "Perception",
        "Stealth",
        "Survival",
      ],
      skillCount: 3,
    },
  },
  Capricorn: {
    class: "Fighter",
    symbol: "♑",
    description:
      "The Fighter becomes a methodical, disciplined warrior, embodying Capricorn's ambition, patience, and tactical planning. Their Battlemaster subclass reflects Capricorn's pragmatism, with tactical maneuvers that rely on preparation and long-term planning. They emphasize longevity and the ability to fight for what's earned, always training, improving, and preparing for battles ahead. \nPower through discipline, endurance, and mastery. Martial skill is honed through relentless effort. Often generals, knights, mercenaries. Victory is earned, never gifted.",
    skillsOptions: {
      skillList: [
        "Acrobatics",
        "Animal Handling",
        "Athletics",
        "History",
        "Insight",
        "Intimidation",
        "Perception",
        "Survival",
      ],
      skillCount: 2,
    },
  },
  Aquarius: {
    class: "Sorcerer",
    symbol: "♒",
    description:
      "The Sorcerer channels the eccentric, rebellious energy of Aquarius, with powers drawn from the stars, innovation, and individuality. Their Wild Magic or Storm Sorcery is flavored as cosmic energy, tapping into star power or unpredictable bursts of energy. Their spells reflect their intuitive, forward-thinking nature, creating force fields, lightning strikes, or telekinesis. \nPower through innate, unpredictable magic. Magic surges from cosmic alignment, not study. Often rebels, visionaries, anomalies. The future bends around them.",
    skillsOptions: {
      skillList: [
        "Arcana",
        "Deception",
        "Insight",
        "Intimidation",
        "Persuasion",
        "Religion",
      ],
      skillCount: 2,
    },
  },
  Pisces: {
    class: "Monk",
    symbol: "♓",
    description:
      "The Monk taps into the flowing, spiritual nature of Pisces, focusing on fluid combat styles and deep inner wisdom. Combat reflects water-based techniques, like wave-like movements or spiritual flow, reflecting Pisces' intuitive nature. Their Way of the Open Hand is flavored as a martial art inspired by water manipulation or dream magic, emphasizing empathy, spiritual insight, and connection to the subconscious. \nPower through inner balance and spiritual awareness. Combat resembles water—fluid, reactive, inevitable. Often mystics, wanderers, or spiritual guardians. Strength comes from surrender, not force.",
    skillsOptions: {
      skillList: [
        "Acrobatics",
        "Athletics",
        "History",
        "Insight",
        "Religion",
        "Stealth",
      ],
      skillCount: 2,
    },
  },
};
