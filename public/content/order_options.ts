export interface OrderConfig {
  order: string;
  description: string;
  size: string;
  speed: string;
  damageResistance: string;
  specialAbilities: string[];
  darkVision: boolean;
  languages: string[];
  lineage: ancestryConfig[];
}

export interface ancestryConfig {
  type: string;
  features: string;
  damageType: string;
}

export const ORDERS: Record<string, OrderConfig> = {
  Basilisk: {
    description:
      "The Basilisk Assassin is a master of lethal precision and petrifying fear. Born from the legendary serpent whose gaze turns victims to stone, these warriors strike from shadows with venomous efficiency. Their abilities channel the basilisk's deadly nature—poisoned blades that corrupt flesh, a paralyzing stare that freezes enemies mid-strike, and the capacity to move unseen like a serpent through grass. \nPower through stealth, toxins, and terror. Combat is surgical—one strike, one kill. Masters of infiltration and elimination, they leave only statues and corpses in their wake.",
    order: "Monstrosity",
    size: "You are Medium (about 5-6 feet tall).",
    speed: "Your speed is 30 ft.",
    damageResistance: "",
    specialAbilities: [
      "Petrifying Gaze - Creatures that meet its eyes must succeed on a Con save or begin turning to stone (restrained → petrified).",
    ],
    darkVision: true,
    languages: ["Common", "Draconic", "Abyssal"],
    lineage: [
      {
        type: "Serpentfolk",
        features:
          "Poisonous bite, serpentine flexibility, petrifying gaze resistance",
        damageType: "Poison",
      },
      {
        type: "Reptilian Humanoids",
        features: "Scaled armor, cold-blooded resilience, enhanced stealth",
        damageType: "Acid",
      },
    ],
  },
  Eagle: {
    description:
      "The Caucasian Eagle Ranger embodies relentless pursuit and divine punishment. Named for Zeus's eagle that tormented Prometheus, these warriors are hunters who never abandon their prey. They command the skies, wielding storm-infused arrows and summoning aerial strikes. Their tracking abilities are supernatural—once they mark a target, escape becomes impossible. \nPower through persistence, precision, and aerial dominance. They are the wrath of the heavens made manifest, patient hunters who strike from above with thunderous force.",
    order: "Beastfolk (Avian)",
    size: "You are Medium (about 5-6 feet tall with a 12-foot wingspan).",
    speed: "Your speed is 20 ft., Fly 60 ft.",
    damageResistance: "",
    specialAbilities: [
      "Keen Sight & Flyby - Advantage on Perception checks relying on sight; does not provoke opportunity attacks after flying past enemies.",
    ],
    darkVision: true,
    languages: ["Common", "Auran", "Celestial"],
    lineage: [
      {
        type: "Avian Humanoids",
        features: "Keen eyesight, aerial agility, taloned strikes",
        damageType: "Lightning",
      },
      {
        type: "Skyborn",
        features: "Storm calling, divine connection, relentless pursuit",
        damageType: "Thunder",
      },
    ],
  },
  Centaur: {
    description:
      "The Centaur Cavalry Archer merges human intellect with bestial power, embodying both the scholar and the warrior. These half-human, half-horse beings possess unmatched mobility and versatility in combat. They excel at hit-and-run tactics, combining archery with devastating charges, while their deep connection to nature grants them wisdom and healing abilities. \nPower through mobility, versatility, and natural harmony. They are philosophers who fight, healers who hunt, bridging civilization and wilderness with every gallop.",
    order: "Fey or Monstrosity",
    size: "You are Large (about 7-8 feet tall from hoof to head).",
    speed: "Your speed is 50 ft.",
    damageResistance: "",
    specialAbilities: [
      "Charging Trample - If the centaur moves at least 30 ft straight toward a target, it can make a bonus hoof attack that may knock the target prone.",
    ],
    darkVision: true,
    languages: ["Common", "Elvish", "Sylvan"],
    lineage: [
      {
        type: "Equine Humanoids",
        features: "Powerful charge, natural athleticism, hooved strikes",
        damageType: "Bludgeoning",
      },
      {
        type: "Feyborn",
        features: "Natural magic, healing touch, wilderness bond",
        damageType: "Radiant",
      },
    ],
  },
  Cerberus: {
    description:
      "The Cerberus Guardian is the ultimate protector, modeled after the three-headed hound that guards the gates of Hades. These warriors possess supernatural awareness, able to watch multiple directions simultaneously. They excel at defensive combat, area denial, and protecting allies. Their abilities channel hellfire and primal fury, making them nearly impossible to bypass. \nPower through vigilance, endurance, and territorial dominance. They are immovable objects, sentinels who hold the line against any threat, living fortresses that devour those foolish enough to advance.",
    order: "Fiend",
    size: "You are Large (about 8-10 feet tall at the shoulder).",
    speed: "Your speed is 40 ft.",
    damageResistance: "",
    specialAbilities: [
      "Triple Watcher - Advantage on Perception checks; cannot be surprised. Can make multiple bite reactions per round.",
    ],
    darkVision: true,
    languages: ["Common", "Infernal", "Abyssal"],
    lineage: [
      {
        type: "Canine Humanoids",
        features: "Multi-directional awareness, pack tactics, savage bite",
        damageType: "Fire",
      },
      {
        type: "Fiendish Kin",
        features: "Hellfire resistance, infernal presence, guardian's fury",
        damageType: "Necrotic",
      },
    ],
  },
  Cyclops: {
    description:
      "The Cyclops Forgemaster combines overwhelming physical might with legendary craftsmanship. These one-eyed giants were the original smiths of the gods, forging Zeus's thunderbolts. In battle, they wield massive armoury of their own creation, crush enemies with raw strength, and can reshape the battlefield itself. Their singular eye grants focused power but limited peripheral vision. \nPower through craftsmanship and brute force. Magic flows through hammer and forge, creating legendary armoury and impenetrable armor. They are living siege engines, smiths who fight with the same intensity they forge.",
    order: "Giant",
    size: "You are Huge (about 15-20 feet tall).",
    speed: "Your speed is 30 ft.",
    damageResistance: "",
    specialAbilities: [
      "Devastating Slam - Heavy melee attacks deal bonus damage; structures and objects take double damage.",
    ],
    darkVision: true,
    languages: ["Common", "Giant", "Primordial"],
    lineage: [
      {
        type: "Giantkin",
        features: "Immense strength, stone-like durability, powerful build",
        damageType: "Bludgeoning",
      },
      {
        type: "Earthborn",
        features: "Forge mastery, focused vision, earth manipulation",
        damageType: "Force",
      },
    ],
  },
  Dragon: {
    description:
      "The Dragon Sorcerer embodies the ultimate magical power, channeling the essence of the most legendary creatures in all mythology. Dragons command all elements, possess devastating breath armoury, and radiate an aura of primordial terror. These sorcerers can partially transform, gaining scales, wings, and claws, becoming living armoury of mass destruction. \nPower through raw magical supremacy and ancient knowledge. They are the apex of arcane might, beings who bend reality through sheer force of will and draconic heritage.",
    order: "Dragonborn (Expanded / True Dragon)",
    size: "You are Large (about 8-12 feet tall, larger in full dragon form).",
    speed: "Your speed is 30 ft., Fly 60 ft.",
    damageResistance: "",
    specialAbilities: [
      "Elemental Breath Weapon - Exhales destructive elemental energy in a cone or line; recharge on a roll.",
      "Frightful Presence - Nearby creatures must save or become frightened.",
    ],
    darkVision: true,
    languages: ["Common", "Draconic", "Primordial", "Infernal"],
    lineage: [
      {
        type: "Red",
        features: "Fire breath, heat-resistant scales, tyrannical presence",
        damageType: "Fire",
      },
      {
        type: "Gold",
        features: "Fire breath, radiant scales, draconic majesty",
        damageType: "Fire",
      },
      {
        type: "White",
        features: "Frost breath, ice-hardened scales, arctic resilience",
        damageType: "Cold",
      },
      {
        type: "Silver",
        features: "Frost breath, reflective scales, noble bearing",
        damageType: "Cold",
      },
      {
        type: "Blue",
        features: "Lightning breath, crackling scales, storm affinity",
        damageType: "Lightning",
      },
      {
        type: "Bronze",
        features: "Lightning breath, ocean-hardened scales, vigilant nature",
        damageType: "Lightning",
      },
      {
        type: "Black",
        features: "Acid breath, corrosive scales, swamp adaptation",
        damageType: "Acid",
      },
      {
        type: "Copper",
        features: "Acid breath, metallic scales, trickster instincts",
        damageType: "Acid",
      },
      {
        type: "Green",
        features: "Poison breath, toxin-resistant scales, manipulative aura",
        damageType: "Poison",
      },
    ],
  },
  Griffin: {
    description:
      "The Griffin Sky Knight merges the king of beasts with the king of birds, embodying nobility, courage, and divine justice. These warriors are mounted champions who patrol the skies, defending the innocent and punishing the wicked. They combine aerial superiority with righteous fury, wielding blessed armoury and commanding the respect of all who witness their golden wings. \nPower through honor, aerial dominance, and divine mandate. They are the embodiment of chivalric virtue, champions who fight not for glory but for justice itself.",
    order: "Monstrosity",
    size: "You are Large (about 8-9 feet long from beak to tail).",
    speed: "Your speed is 30 ft., Fly 80 ft.",
    damageResistance: "",
    specialAbilities: [
      "Sky Predator - Can grapple Medium or smaller creatures while flying and carry them aloft.",
    ],
    darkVision: true,
    languages: ["Common", "Celestial", "Auran"],
    lineage: [
      {
        type: "Avian Humanoids",
        features: "Eagle vision, aerial mastery, divine blessing",
        damageType: "Radiant",
      },
      {
        type: "Noble Kin",
        features: "Righteous fury, protective instinct, honor-bound strength",
        damageType: "Slashing",
      },
    ],
  },
  Harpy: {
    description:
      "The Harpy Storm Caller is a fierce warrior who commands the fury of tempests and the terror of the skies. Part woman, part bird of prey, these beings were known as snatchers who punished the wicked. They unleash devastating wind magic, sonic attacks that shatter formations, and lightning strikes from above. Their shriek alone can drive enemies mad with fear. \nPower through chaos, fury, and the raw force of nature's wrath. They are the storm personified, unpredictable and devastating, leaving destruction in their wake.",
    order: "Monstrosity",
    size: "You are Medium (about 5-6 feet tall with a 10-foot wingspan).",
    speed: "Your speed is 20 ft., Fly 50 ft.",
    damageResistance: "",
    specialAbilities: [
      "Luring Song - Enemies who hear the song must save or be charmed and compelled to move toward the harpy.",
    ],
    darkVision: false,
    languages: ["Common", "Auran", "Primordial"],
    lineage: [
      {
        type: "Avian Humanoids",
        features: "Sonic shriek, wind manipulation, aerial predator",
        damageType: "Thunder",
      },
      {
        type: "Stormborn",
        features: "Storm summoning, chaotic nature, lightning strikes",
        damageType: "Lightning",
      },
    ],
  },
  Hydra: {
    description:
      "The Hydra Regenerator embodies relentless adaptation and nearly immortal endurance. Like the legendary multi-headed serpent, these warriors grow stronger as the battle continues. Each wound spawns new power, each defeat becomes a lesson, and death itself is merely temporary. They command poison, regeneration, and overwhelming multi-target capabilities. \nPower through adaptation, persistence, and overwhelming force through numbers. They cannot be defeated through attrition, only through overwhelming them before they adapt to every strategy.",
    order: "Monstrosity",
    size: "You are Huge (about 20-30 feet long from head to tail).",
    speed: "Your speed is 30 ft., Swim 30 ft.",
    damageResistance: "",
    specialAbilities: [
      "Regenerative Heads - When a head is severed, two grow back unless fire damage is dealt that round.",
    ],
    darkVision: true,
    languages: ["Common", "Draconic", "Aquan"],
    lineage: [
      {
        type: "Serpentfolk",
        features: "Multiple heads, regenerative power, venomous attacks",
        damageType: "Poison",
      },
      {
        type: "Regenerative Kin",
        features: "Rapid healing, adaptive evolution, immortal endurance",
        damageType: "Acid",
      },
    ],
  },
  Kraken: {
    description:
      "The Kraken Deep Mage channels the terrifying power of the ocean's greatest monster. These beings command crushing pressures, drowning mists, and tentacles that drag enemies into watery graves. Masters of aquatic combat and weather manipulation, they can summon storms, create whirlpools, and instill the primal fear of the deep. On land, they wield water as a armoury, reshaping the battlefield into their domain. \nPower through overwhelming force and environmental control. They are the ocean's wrath given form, dragging civilization back into the depths from which it emerged.",
    order: "Monstrosity or Elemental",
    size: "You are Gargantuan (about 40-60 feet long including tentacles).",
    speed: "Your speed is 20 ft., Swim 60 ft.",
    damageResistance: "",
    specialAbilities: [
      "Titanic Tentacles - Can grapple multiple creatures at long reach and restrain or fling them.",
      "Storm Sovereign - Controls wind, waves, and lightning in its vicinity.",
    ],
    darkVision: true,
    languages: ["Common", "Aquan", "Primordial", "Deep Speech"],
    lineage: [
      {
        type: "Aquatic Humanoids",
        features: "Tentacle attacks, crushing grip, aquatic supremacy",
        damageType: "Cold",
      },
      {
        type: "Deep Kin",
        features: "Pressure resistance, storm calling, abyssal connection",
        damageType: "Lightning",
      },
    ],
  },
  Medusa: {
    description:
      "The Medusa Petrifier wields one of mythology's most feared powers—the ability to turn living beings to stone with a mere glance. Once a beautiful maiden cursed by the gods, Medusa represents tragic power and isolation. These warriors master petrification magic, serpentine summons, and curse manipulation. They are tactical controllers who reshape the battlefield by transforming enemies into obstacles. \nPower through fear, transformation, and tactical control. Enemies must fight without looking, making every engagement psychological warfare. They are masters of the battlefield, turning foes into statues and allies into believers.",
    order: "Monstrosity",
    size: "You are Medium (about 5-6 feet tall).",
    speed: "Your speed is 30 ft.",
    damageResistance: "",
    specialAbilities: [
      "Cursed Gaze - Creatures that fail a save against her gaze are restrained, then petrified.",
      "Serpentine Reflexes - Advantage on Dexterity saves.",
    ],
    darkVision: true,
    languages: ["Common", "Abyssal", "Undercommon"],
    lineage: [
      {
        type: "Serpentfolk",
        features: "Petrifying gaze, serpent hair, cursed beauty",
        damageType: "Poison",
      },
      {
        type: "Cursed Kin",
        features: "Curse manipulation, tragic power, tactical control",
        damageType: "Necrotic",
      },
    ],
  },
  Minotaur: {
    description:
      "The Minotaur Labyrinth Warden combines bestial rage with supernatural spatial awareness. Born of the legendary creature that dwelt in the Cretan labyrinth, these warriors never lose their way and can navigate any terrain with perfect recall. They channel primal fury through devastating charges, earth-shaking strikes, and an uncanny ability to trap enemies in confusing magical mazes. \nPower through rage, territorial dominance, and the fury of the bull. They are unstoppable in close combat, transforming any battlefield into their personal labyrinth where they reign supreme.",
    order: "Monstrosity",
    size: "You are Large (about 7-8 feet tall).",
    speed: "Your speed is 40 ft.",
    damageResistance: "",
    specialAbilities: [
      "Labyrinthine Charge - Gains bonus damage when charging in confined spaces; can shove targets prone.",
    ],
    darkVision: true,
    languages: ["Common", "Abyssal", "Infernal"],
    lineage: [
      {
        type: "Bovine Humanoids",
        features: "Powerful charge, goring horns, bestial rage",
        damageType: "Piercing",
      },
      {
        type: "Labyrinth Kin",
        features: "Perfect navigation, maze creation, territorial dominance",
        damageType: "Psychic",
      },
    ],
  },
  Lion: {
    description:
      "The Nemean Lion Warrior embodies absolute physical supremacy and legendary invulnerability. Named for the beast whose hide could not be pierced by any mortal armoury, these warriors possess nearly impenetrable defenses. Their golden fur deflects blades, their roar shatters morale, and their strength tears through armor as if it were parchment. They are living fortresses, walking symbols of unconquerable will. \nPower through invincibility, raw strength, and overwhelming presence. Normal armoury cannot harm them, forcing enemies to seek alternative strategies or face inevitable defeat.",
    order: "Beastfolk (Leonin)",
    size: "You are Large (about 6-7 feet tall at the shoulder).",
    speed: "Your speed is 40 ft.",
    damageResistance: "",
    specialAbilities: [
      "Pounce - If the lion moves at least 20 ft before attacking, it can knock the target prone and make a bonus bite.",
    ],
    darkVision: true,
    languages: ["Common", "Celestial", "Leonine"],
    lineage: [
      {
        type: "Leonin",
        features: "Impenetrable hide, fearsome roar, predator's strength",
        damageType: "Slashing",
      },
      {
        type: "Beastkin",
        features: "Natural armor, savage ferocity, pack leadership",
        damageType: "Bludgeoning",
      },
    ],
  },
  Pegasus: {
    description:
      "The Pegasus Sky Dancer channels the grace and majesty of the divine winged horse. Born from Medusa's blood, Pegasus represents freedom, inspiration, and the transcendence of earthly limitations. These warriors are unmatched in aerial mobility, wielding light-based magic and inspirational auras. They move like lightning across the battlefield, striking with precision before vanishing into the clouds. \nPower through speed, grace, and divine inspiration. They are poetry in motion, warriors who fight not with brutality but with elegance, inspiring allies while frustrating enemies who can never catch them.",
    order: "Celestial",
    size: "You are Large (about 7-8 feet tall at the shoulder with a 20-foot wingspan).",
    speed: "Your speed is 40 ft., Fly 90 ft.",
    damageResistance: "",
    specialAbilities: [
      "Heavenly Flight - Magical flying speed; can carry riders safely over dangerous terrain.",
      "Radiant Hooves - Hoof attacks deal radiant damage.",
    ],
    darkVision: false,
    languages: ["Common", "Celestial", "Auran", "Elvish"],
    lineage: [
      {
        type: "Equine Humanoids",
        features: "Divine grace, inspiring presence, swift hooves",
        damageType: "Radiant",
      },
      {
        type: "Celestial Kin",
        features: "Light magic, freedom incarnate, heavenly speed",
        damageType: "Force",
      },
    ],
  },
  Phoenix: {
    description:
      "The Phoenix Eternal Flame is the ultimate survivor, embodying the cycle of death and rebirth. These warriors cannot truly die—when struck down, they burst into flames and are reborn from their own ashes, often stronger than before. They command sacred fire that both destroys and heals, purging corruption while cauterizing wounds. Their presence alone brings hope to allies and despair to enemies who realize death is not an option. \nPower through immortality, transformation, and eternal flames. They are living symbols of resilience and renewal, warriors who become stronger with each defeat, embodying the truth that what doesn't kill them literally makes them stronger.",
    order: "Elemental (Fire)",
    size: "You are Large (about 8-10 feet tall with a 25-foot wingspan).",
    speed: "Your speed is 20 ft., Fly 80 ft.",
    damageResistance: "",
    specialAbilities: [
      "Immolation Aura - Creatures nearby take fire damage each round.",
      "Rebirth from Ash - Upon death, explodes in flame and reforms after a set time.",
    ],
    darkVision: false,
    languages: ["Common", "Celestial", "Ignan", "Primordial"],
    lineage: [
      {
        type: "Avian Humanoids",
        features: "Immortal rebirth, sacred flames, fiery aura",
        damageType: "Fire",
      },
      {
        type: "Elemental Kin",
        features: "Purifying fire, healing flames, eternal renewal",
        damageType: "Radiant",
      },
    ],
  },
  "Tiberian Rat": {
    description:
      "The Tiberian Rat Plague Bringer commands the power of pestilence and overwhelming numbers. Like the rats that spread plague through medieval cities, these warriors control disease, summon swarms, and corrupt the battlefield itself. They are masters of biological warfare, weakening enemies through disease while their summoned hordes consume everything in their path. One becomes many, weakness becomes epidemic. \nPower through disease, swarm tactics, and attrition. They do not need to kill enemies directly—only weaken them enough for the swarm to finish. They are the inevitable decay, the collapse of health and sanity.",
    order: "Beastfolk (Mutated Ratfolk)",
    size: "You are Small (about 3-4 feet tall).",
    speed: "Your speed is 25 ft., Climb 25 ft.",
    damageResistance: "",
    specialAbilities: [
      "Toxic Infestation - Bite inflicts poison or disease; swarms gain strength as allies fall.",
      "Radiation Scurry - Advantage on stealth and survival in corrupted terrain.",
    ],
    darkVision: true,
    languages: ["Common", "Undercommon", "Abyssal"],
    lineage: [
      {
        type: "Rodentfolk",
        features: "Swarm summoning, disease immunity, pack tactics",
        damageType: "Poison",
      },
      {
        type: "Plague Kin",
        features:
          "Pestilence control, corrupting presence, overwhelming numbers",
        damageType: "Necrotic",
      },
    ],
  },
  Vampire: {
    description:
      "The Vampire Blood Lord is a creature of eternal night, wielding the dark powers of blood magic and shadow manipulation. These immortal predators combine supernatural speed, hypnotic charm, and life-draining abilities. They grow stronger by consuming the life force of enemies, transforming into mist or bats, and commanding lesser undead. Masters of both social manipulation and brutal combat, they are as dangerous in court as on the battlefield. \nPower through blood, charm, and eternal life. They are aristocrats of darkness, sophisticated predators who see mortals as prey and blood as currency. Immortality grants them patience—they can wait centuries for the perfect moment to strike.",
    order: "Undead",
    size: "You are Medium (about 5-6 feet tall).",
    speed: "Your speed is 30 ft., Climb 30 ft.",
    damageResistance: "",
    specialAbilities: [
      "Life Drain - Melee attacks heal the vampire for damage dealt.",
      "Mist Form - Can transform into mist to escape danger.",
    ],
    darkVision: true,
    languages: [
      "Common",
      "Infernal",
      "Abyssal",
      "any two languages of your choice",
    ],
    lineage: [
      {
        type: "Humanoid (Vampiric)",
        features: "Blood drain, hypnotic charm, supernatural speed",
        damageType: "Necrotic",
      },
      {
        type: "Undead Kin",
        features: "Shapeshifting, shadow manipulation, immortal aristocracy",
        damageType: "Cold",
      },
    ],
  },
  Werewolf: {
    description:
      "The Werewolf Lunar Berserker channels the savage power of the beast within, transforming under the moon's influence into an unstoppable force of primal fury. These warriors straddle the line between civilization and savagery, humanity and beast. Their transformation grants supernatural strength, regeneration, and predatory senses. They hunt in packs, their howls synchronizing attacks and striking terror into prey. \nPower through transformation, pack tactics, and primal instinct. They surrender reason for strength, civilization for survival, embodying the eternal conflict between human and animal nature.",
    order: "Humanoid (Shapechanger)",
    size: "You are Medium (about 6-7 feet tall in hybrid form).",
    speed: "Your speed is 40 ft.",
    damageResistance: "",
    specialAbilities: [
      "Lycanthropic Regeneration - Rapid healing unless damaged by silver or magic.",
      "Feral Frenzy - Gains extra attacks while bloodied.",
    ],
    darkVision: true,
    languages: ["Common", "Sylvan", "any one language of your choice"],
    lineage: [
      {
        type: "Humanoid (Lycanthropic)",
        features: "Lunar transformation, regeneration, enhanced senses",
        damageType: "Slashing",
      },
      {
        type: "Beast Kin",
        features: "Pack bond, primal fury, predatory instinct",
        damageType: "Piercing",
      },
    ],
  },
};
