import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import Button from "../button/Button";
// import Dropdown from "../dropdown/Dropdown";
import styles from "./ZodiacModalContent.module.css";
// import LineageAccordion from "../accordion/Accordion";

interface CharacterBackground {
  title: string;
  subtitle: string;
  description: string;
  iconPath: string;
  displayName?: string;
  kind: "zodiac" | "species";
  skillsCount?: number;
  skillsList?: string[];
  armourySlots?: number;
  armouryItems?: string[];
  size?: string;
  speed?: string;
  specialAbilities?: string[];
  lineage?: unknown[];
  languages?: string[];
}

interface DetailsModalContentProps {
  onContinue?: () => void;
  selectedSign?: string;
}

function useDisplayData(selectedSign?: string): CharacterBackground {
  const displayData = useMemo(() => {
    if (!selectedSign) {
      return {
        title: "",
        subtitle: "",
        description: "",
        iconPath: "",
        kind: "zodiac" as const,
        skillsCount: 0,
        skillsList: [],
        armourySlots: 0,
        armouryItems: [],
      };
    }

    // TODO: Add logic to build display data based on selectedSign
    return {
      title: "",
      subtitle: "",
      description: "",
      iconPath: "",
      kind: "zodiac" as const,
      skillsCount: 0,
      skillsList: [],
      armourySlots: 0,
      armouryItems: [],
    };
  }, [selectedSign]);

  return displayData;
}

export function DetailsModalContent({
  onContinue,
  selectedSign,
}: DetailsModalContentProps) {
  const displayData = useDisplayData(selectedSign);
  return (
    <div className={styles.zodiacModal} data-testid="zodiac-modal">
      <img
        src={displayData.iconPath}
        alt={displayData.displayName}
        id={styles.modalZodiacIcon}
        data-testid="modal-zodiac-icon"
      />
      <img
        src="/images/fg.png"
        id={styles.modalZodiacEdges}
        alt="Modal decorative edges"
        data-testid="modal-zodiac-edges"
      />
      <h2
        className={
          displayData.kind === "zodiac"
            ? styles.zodiacTitle
            : styles.speciesTitle
        }
        data-testid="zodiacName"
      >
        {displayData.title}
      </h2>
      <h3 data-testid="zodiac-subtitle">{displayData.subtitle}</h3>
      <div className={styles.classDescription} data-testid="class-description">
        <ReactMarkdown>{displayData.description}</ReactMarkdown>
      </div>
      {displayData.kind === "zodiac" && (
        <>
          <h3 data-testid="skills-heading">
            Choose {displayData.skillsCount} Skills
          </h3>
          {/* <Dropdown
            data-testid="skills-dropdown"
            items={displayData.skillsList}
            selectionCount={displayData.skillsCount}
            selectedItems={selectedSkills}
            onSelectionChange={onSkillsChange}
          /> */}
          <h3 data-testid="armoury-heading">
            Choose {displayData.armourySlots} Armoury Mastery Slots
          </h3>
          {/* <Dropdown
            data-testid="armoury-dropdown"
            items={displayData.armouryItems}
            selectionCount={displayData.armourySlots}
            selectedItems={selectedArmoury}
            onSelectionChange={onArmouryChange}
          /> */}
        </>
      )}
      {/* {displayData.kind === "species" && (
        <>
          <h3 data-testid="species-size">Size: {displayData.size}</h3>
          <h3 data-testid="species-speed">Speed: {displayData.speed}</h3>
          <h3 data-testid="special-abilities-heading">Special Abilities:</h3>
          <ul data-testid="special-abilities-list">
            {displayData.specialAbilities.map((ability, idx) => (
              <li key={idx} data-testid={`special-ability-${idx}`}>
                {ability}
              </li>
            ))}
          </ul>
          <h3 data-testid="species-lineage">Choose Lineage</h3>
          <LineageAccordion lineage={displayData.lineage} onSelect={() => {}} />
          <h3 data-testid="species-languages">Choose 2 languages</h3>
          <Dropdown
            data-testid="species-languages-dropdown"
            items={displayData.languages}
            selectionCount={2}
            selectedItems={[]}
            onSelectionChange={() => {}}
          />
        </>
      )} */}
      <div className={styles.modalButton} data-testid="modal-button-container">
        <Button
          data-testid="awaken-button"
          onPress={() => onContinue?.()}
          text={`Select ${displayData.displayName} Zodiac`}
          // disabled={
          //   (displayData.kind === "zodiac" &&
          //     (selectedSkills.length < displayData.skillsCount ||
          //       selectedArmoury.length < displayData.armourySlots)) ||
          //   (displayData.kind === "species" &&
          //     (selectedLanguages.length < 2 || selectedLineage === undefined))
          // }
        />
      </div>
      <img
        src="/images/lg.png"
        id={styles.modalZodiacBottom}
        alt="Modal decorative bottom"
        data-testid="modal-zodiac-bottom"
      />
    </div>
  );
}
