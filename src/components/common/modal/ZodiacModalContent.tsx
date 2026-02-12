import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { ZODIAC_ARMOURY } from "../../../../public/content/armoury_options";
import { ZODIAC_SKILLS } from "../../../../public/content/skills_options";
import { ORDERS } from "../../../../public/content/order_options";
import { allBackgrounds } from "../../../../public/content/background";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import type {
  ZodiacModalContentProps,
  DisplayData,
  ZodiacDisplayData,
  BackgroundDisplayData,
} from "../../../types/component.types";
import styles from "./ZodiacModalContent.module.css";
import LineageAccordion from "../accordion/Accordion";

const DEFAULT_ZODIAC_DATA: ZodiacDisplayData = {
  kind: "zodiac",
  iconPath: "",
  displayName: "",
  symbol: "",
  title: "",
  subtitle: "",
  description: "",
  skillsList: [],
  skillsCount: 0,
  armouryItems: [],
  armourySlots: 0,
};

const DEFAULT_BACKGROUND_DATA: BackgroundDisplayData = {
  kind: "background",
  iconPath: "",
  displayName: "",
  title: "",
  description: "",
  featureName: "",
  featureDescription: "",
  characteristics: [],
};

function buildDisplayData(
  sign: string,
  order: string,
  background: string,
  mode: string,
): DisplayData {
  const zodiacData = ZODIAC_SKILLS[sign];
  const armouryData = ZODIAC_ARMOURY[sign];
  const orderData = ORDERS[order];
  const backgroundData = allBackgrounds.find((b) => b.id === background);

  if (mode === "zodiac") {
    return {
      kind: "zodiac",
      iconPath: `/zodiacs/icons/sketched/${sign.toLowerCase()}.png`,
      displayName: sign,
      symbol: zodiacData?.symbol ?? "",
      title: `${zodiacData?.symbol ?? ""} ${sign}`,
      subtitle: zodiacData?.class ?? "",
      description: zodiacData?.description ?? "",
      skillsList: zodiacData?.skillsOptions?.skillList ?? [],
      skillsCount: zodiacData?.skillsOptions?.skillCount ?? 0,
      armouryItems:
        armouryData?.availableArmoury?.map(
          (w) => `${w.name} (${w.property})`,
        ) ?? [],
      armourySlots: armouryData?.slots ?? 0,
    };
  } else if (mode === "backgrounds") {
    return {
      kind: "background",
      iconPath: `/zodiacs/icons/sketched-backgrounds/${background}.png`,
      displayName: backgroundData?.name ?? background,
      title: backgroundData?.name ?? background,
      description: backgroundData?.description ?? "",
      featureName: backgroundData?.feature?.name ?? "",
      featureDescription: backgroundData?.feature?.description ?? "",
      characteristics: backgroundData?.characteristics ?? [],
    };
  } else {
    return {
      kind: "species",
      iconPath: `/zodiacs/icons/sketched-orders/${order}.png`,
      displayName: order,
      title: order,
      subtitle: orderData?.order ?? "",
      description: orderData?.description ?? "",
      size: orderData?.size ?? "",
      speed: orderData?.speed ?? "",
      specialAbilities: orderData?.specialAbilities ?? [],
      languages: orderData?.languages ?? [],
      lineage: orderData?.lineage ?? [],
    };
  }
}

function useDisplayData(
  mode: "zodiac" | "species" | "backgrounds",
  selectedSign?: string,
  selectedOrder?: string | null,
  selectedBackground?: string | null,
): DisplayData {
  return useMemo(() => {
    const sign = selectedSign ?? "";
    const order = selectedOrder ?? "";
    const background = selectedBackground ?? "";

    if (mode === "zodiac" && sign) {
      return buildDisplayData(sign, order, background, mode);
    } else if (mode === "backgrounds" && background) {
      return buildDisplayData(sign, order, background, mode);
    } else if (mode === "species" && order) {
      return buildDisplayData(sign, order, background, mode);
    }

    // Return appropriate default based on mode
    if (mode === "backgrounds") {
      return DEFAULT_BACKGROUND_DATA;
    }
    return DEFAULT_ZODIAC_DATA;
  }, [mode, selectedSign, selectedOrder, selectedBackground]);
}

export function ZodiacModalContent({
  selectedSign,
  mode,
  selectedSkills,
  selectedArmoury,
  selectedLanguages,
  selectedOrder,
  selectedBackground,
  selectedLineage,
  onSkillsChange,
  onArmouryChange,
  onLanguageChange,
  onLineageChange,
  onAwaken,
}: ZodiacModalContentProps) {
  const displayData = useDisplayData(
    mode,
    selectedSign,
    selectedOrder,
    selectedBackground,
  );
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
      {(displayData.kind === "zodiac" || displayData.kind === "species") && (
        <h3 data-testid="zodiac-subtitle">{displayData.subtitle}</h3>
      )}
      <div className={styles.classDescription} data-testid="class-description">
        <ReactMarkdown>{displayData.description}</ReactMarkdown>
      </div>
      {displayData.kind === "zodiac" && (
        <>
          <h3 data-testid="skills-heading">
            Choose {displayData.skillsCount} Skills
          </h3>
          <Dropdown
            data-testid="skills-dropdown"
            items={displayData.skillsList}
            selectionCount={displayData.skillsCount}
            selectedItems={selectedSkills}
            onSelectionChange={onSkillsChange}
          />
          <h3 data-testid="armoury-heading">
            Choose {displayData.armourySlots} Armoury Mastery Slots
          </h3>
          <Dropdown
            data-testid="armoury-dropdown"
            items={displayData.armouryItems}
            selectionCount={displayData.armourySlots}
            selectedItems={selectedArmoury}
            onSelectionChange={onArmouryChange}
          />
        </>
      )}
      {displayData.kind === "species" && (
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
          <LineageAccordion
            lineage={displayData.lineage}
            onSelect={onLineageChange}
          />
          <h3 data-testid="species-languages">Choose 2 languages</h3>
          <Dropdown
            data-testid="species-languages-dropdown"
            items={displayData.languages}
            selectionCount={2}
            selectedItems={selectedLanguages}
            onSelectionChange={onLanguageChange}
          />
        </>
      )}
      {displayData.kind === "background" && (
        <>
          <h3 data-testid="background-feature-heading">
            Feature: {displayData.featureName}
          </h3>
          <div
            className={styles.classDescription}
            data-testid="background-feature-description"
          >
            <ReactMarkdown>{displayData.featureDescription}</ReactMarkdown>
          </div>
          <h3 data-testid="background-characteristics-heading">
            Characteristics:
          </h3>
          <ul data-testid="background-characteristics-list">
            {displayData.characteristics.map((characteristic, idx) => (
              <li key={idx} data-testid={`background-characteristic-${idx}`}>
                {characteristic}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className={styles.modalButton} data-testid="modal-button-container">
        <Button
          data-testid="awaken-button"
          onPress={onAwaken}
          text={`Select ${displayData.displayName}${displayData.kind === "zodiac" ? " Zodiac" : displayData.kind === "background" ? " Background" : " Species"}`}
          disabled={
            (displayData.kind === "zodiac" &&
              (selectedSkills.length < displayData.skillsCount ||
                selectedArmoury.length < displayData.armourySlots)) ||
            (displayData.kind === "species" &&
              (selectedLanguages.length < 2 || selectedLineage === undefined))
          }
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
