import ReactMarkdown from "react-markdown";
import { ZODIAC_ARMOURY } from "../../public/content/armoury_options";
import { ZODIAC_SKILLS } from "../../public/content/skills_options";
import { ORDERS } from "../../public/content/order_options";
import Button from "./Button";
import Dropdown from "./Dropdown";
import type {
  ZodiacModalContentProps,
  DisplayData,
} from "../types/component.types";

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
  // Display data based on mode
  const displayData: DisplayData =
    mode === "zodiac"
      ? {
          kind: "zodiac",
          iconPath: `/zodiacs/icons/sketched/${selectedSign?.toLowerCase()}.png`,
          displayName: selectedSign ?? "",
          symbol: ZODIAC_SKILLS[selectedSign ?? ""].symbol ?? "",
          title: `${ZODIAC_SKILLS[selectedSign ?? ""].symbol ?? ""} ${selectedSign}`,
          subtitle: ZODIAC_SKILLS[selectedSign ?? ""].class,
          description: ZODIAC_SKILLS[selectedSign ?? ""].description,
          skillsList: ZODIAC_SKILLS[selectedSign ?? ""].skillsOptions.skillList,
          skillsCount:
            ZODIAC_SKILLS[selectedSign ?? ""].skillsOptions.skillCount,
          armouryItems:
            ZODIAC_ARMOURY[selectedSign ?? ""]?.availableArmoury.map(
              (w) => `${w.name} (${w.property})`,
            ) || [],
          armourySlots: ZODIAC_ARMOURY[selectedSign ?? ""]?.slots || 0,
          showArmoury:
            ZODIAC_ARMOURY[selectedSign ?? ""]?.availableArmoury.length > 0,
        }
      : {
          kind: "species",
          iconPath: `/zodiacs/icons/sketched-orders/${selectedOrder}.png`,
          displayName: selectedOrder ?? "",
          title: selectedOrder ?? "",
          subtitle: ORDERS[selectedOrder ?? ""].order,
          description: ORDERS[selectedOrder ?? ""].description,
          size: ORDERS[selectedOrder ?? ""].size,
          speed: ORDERS[selectedOrder ?? ""].speed,
          specialAbilities: ORDERS[selectedOrder ?? ""].specialAbilities,
          languages: ORDERS[selectedOrder ?? ""].languages,
        };

  return (
    <div className="zodiac-modal-content">
      <img
        src={displayData.iconPath}
        alt={displayData.displayName}
        id="modal-zodiac-icon"
      />
      <img
        src="/images/fg.png"
        id="modal-zodiac-edges"
        alt="Modal decorative edges"
      />

      <h2 className="zodiac-name">{displayData.title}</h2>
      <h3>{displayData.subtitle}</h3>

      <div className="class-description">
        <ReactMarkdown>{displayData.description}</ReactMarkdown>
      </div>

      {displayData.kind === "zodiac" && (
        <>
          <h3>Choose {displayData.skillsCount} Skills</h3>
          <Dropdown
            items={displayData.skillsList}
            selectionCount={displayData.skillsCount}
            selectedItems={selectedSkills}
            onSelectionChange={onSkillsChange}
          />

          {displayData.showArmoury && (
            <>
              <h3>Choose Armoury Mastery</h3>
              <Dropdown
                items={displayData.armouryItems}
                selectionCount={displayData.armourySlots}
                selectedItems={selectedArmoury}
                onSelectionChange={onArmouryChange}
              />
            </>
          )}
        </>
      )}

      {displayData.kind === "species" && (
        <>
          <h3>Size: {displayData.size}</h3>
          <h3>Speed: {displayData.speed}</h3>
          <h3>Special Abilities:</h3>
          <ul>
            {displayData.specialAbilities.map((ability, idx) => (
              <li key={idx}>{ability}</li>
            ))}
          </ul>
          <h3>Languages: {displayData.languages.join(", ")}</h3>
        </>
      )}

      <div className="modal-button">
        <Button
          onPress={onAwaken}
          text={`Awaken as ${displayData.displayName}`}
        />
      </div>

      <img
        src="/images/lg.png"
        id="modal-zodiac-bottom"
        alt="Modal decorative bottom"
      />
    </div>
  );
}
