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
    <div className="zodiac-modal" data-testid="zodiac-modal">
      <img
        src={displayData.iconPath}
        alt={displayData.displayName}
        id="modal-zodiac-icon"
        data-testid="modal-zodiac-icon"
      />
      <img
        src="/images/fg.png"
        id="modal-zodiac-edges"
        alt="Modal decorative edges"
        data-testid="modal-zodiac-edges"
      />

      <h2 className="zodiac-name" data-testid="zodiac-name">
        {displayData.title}
      </h2>
      <h3 data-testid="zodiac-subtitle">{displayData.subtitle}</h3>

      <div className="class-description" data-testid="class-description">
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

          {displayData.showArmoury && (
            <>
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
      <div className="modal-button" data-testid="modal-button-container">
        <Button
          data-testid="awaken-button"
          onPress={onAwaken}
          text={`Awaken as ${displayData.displayName}`}
        />
      </div>
      <img
        src="/images/lg.png"
        id="modal-zodiac-bottom"
        alt="Modal decorative bottom"
        data-testid="modal-zodiac-bottom"
      />
    </div>
  );
}
