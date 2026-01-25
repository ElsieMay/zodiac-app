import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { ZODIAC_ARMOURY } from "../../../../public/content/armoury_options";
import { ZODIAC_SKILLS } from "../../../../public/content/skills_options";
import { ORDERS } from "../../../../public/content/order_options";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import type {
  ZodiacModalContentProps,
  DisplayData,
  ZodiacDisplayData,
} from "../../../types/component.types";
import styles from "./ZodiacModalContent.module.css";

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

function buildDisplayData(
  sign: string,
  order: string,
  mode: string,
): DisplayData {
  const zodiacData = ZODIAC_SKILLS[sign];
  const armouryData = ZODIAC_ARMOURY[sign];
  const orderData = ORDERS[order];
  const modeType = mode === "zodiac" ? "zodiac" : "species";

  if (modeType === "zodiac") {
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
    };
  }
}

function useDisplayData(
  mode: "zodiac" | "species",
  selectedSign?: string,
  selectedOrder?: string | null,
): DisplayData {
  return useMemo(() => {
    const sign = selectedSign ?? "";
    const order = selectedOrder ?? "";

    if (mode === "zodiac" && sign) {
      return buildDisplayData(sign, order, mode);
    } else if (mode === "species" && order) {
      return buildDisplayData(sign, order, mode);
    }

    return DEFAULT_ZODIAC_DATA;
  }, [mode, selectedSign, selectedOrder]);
}

export function ZodiacModalContent({
  selectedSign,
  mode,
  selectedSkills,
  selectedArmoury,
  selectedOrder,
  onSkillsChange,
  onArmouryChange,
  onAwaken,
}: ZodiacModalContentProps) {
  const displayData = useDisplayData(mode, selectedSign, selectedOrder);
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
          <Dropdown
            data-testid="skills-dropdown"
            items={displayData.skillsList}
            selectionCount={displayData.skillsCount}
            selectedItems={selectedSkills}
            onSelectionChange={onSkillsChange}
          />
          <h3 data-testid="armoury-heading">Choose Armoury Mastery</h3>
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
          <h3 data-testid="species-languages">
            Languages: {displayData.languages.join(", ")}
          </h3>
        </>
      )}
      <div className={styles.modalButton} data-testid="modal-button-container">
        <Button
          data-testid="awaken-button"
          onPress={onAwaken}
          text={`Awaken as ${displayData.displayName}`}
          disabled={
            displayData.kind === "zodiac" &&
            (selectedSkills.length < displayData.skillsCount ||
              selectedArmoury.length < displayData.armourySlots)
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
