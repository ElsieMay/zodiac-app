import ReactMarkdown from "react-markdown";
import { ZODIAC_ARMOURY } from "../../public/content/armoury_options";
import { ZODIAC_SKILLS } from "../../public/content/skills_options";
import Button from "./Button";
import Dropdown from "./Dropdown";

interface ZodiacModalContentProps {
  selectedSign?: string;
  mode: "zodiac" | "species";
  selectedSkills: number[];
  selectedArmoury: number[];
  selectedOrder?: string | null;
  onSkillsChange: (skills: number[]) => void;
  onArmouryChange: (armoury: number[]) => void;
  onAwaken: () => void;
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
  console.log("Rendering ZodiacModalContent for:", selectedSign);

  function renderContent() {
    // const skills = ZODIAC_SKILLS[selectedSign];
    // const masteryArray = ZODIAC_ARMOURY[selectedSign].availableArmoury.map(
    //   (w) => `${w.name} (${w.property})`,
    // );
    // const slotCount = ZODIAC_ARMOURY[selectedSign].slots;
    // const order = selectedOrder ? selectedOrder : "N/A";

    return (
      <>
        <img
          src={
            mode === "zodiac"
              ? `/zodiacs/icons/sketched/${selectedSign?.toLowerCase()}.png`
              : `/zodiacs/icons/sketched-orders/${selectedSign}.png`
          }
          alt={selectedSign}
          id="modal-zodiac-icon"
        />
        <img
          src="/images/fg.png"
          id="modal-zodiac-edges"
          alt="Modal decorative edges"
        />
        <h2 className="zodiac-name">
          {ZODIAC_SKILLS[selectedSign ?? ""].symbol} {selectedSign}{" "}
          {selectedOrder}
        </h2>
        <h3>{ZODIAC_SKILLS[selectedSign ?? ""].class}</h3>
        <div className="class-description">
          <ReactMarkdown>
            {ZODIAC_SKILLS[selectedSign ?? ""].description}
          </ReactMarkdown>
        </div>
        <>
          <h3>
            Choose {ZODIAC_SKILLS[selectedSign ?? ""].skillsOptions.skillCount}{" "}
            Skills
          </h3>
          <Dropdown
            items={ZODIAC_SKILLS[selectedSign ?? ""].skillsOptions.skillList}
            selectionCount={
              ZODIAC_SKILLS[selectedSign ?? ""].skillsOptions.skillCount
            }
            selectedItems={selectedSkills}
            onSelectionChange={onSkillsChange}
          />
        </>
        {ZODIAC_ARMOURY[selectedSign ?? ""].availableArmoury.length > 0 && (
          <>
            <h3>Choose Armoury Mastery</h3>
            <Dropdown
              items={ZODIAC_ARMOURY[selectedSign ?? ""].availableArmoury.map(
                (w) => `${w.name} (${w.property})`,
              )}
              selectionCount={ZODIAC_ARMOURY[selectedSign ?? ""].slots}
              selectedItems={selectedArmoury}
              onSelectionChange={onArmouryChange}
            />
          </>
        )}
        <div className="modal-button">
          <Button onPress={onAwaken} text={`Awaken as ${selectedSign}`} />
        </div>
        <img
          src="/images/lg.png"
          id="modal-zodiac-bottom"
          alt="Modal decorative bottom"
        />
      </>
    );
  }

  return <div className="zodiac-modal-content">{renderContent()}</div>;
}
