import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import type { ancestryConfig } from "../../../../public/content/order_options";
import styles from "./Accordion.module.css";
import Button from "../button/Button";

interface LineageAccordionProps {
  lineage: ancestryConfig[];
  onSelect?: (selected: ancestryConfig) => void;
}

const LineageAccordion = ({ lineage, onSelect }: LineageAccordionProps) => {
  const [openItem, setOpenItem] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (item: ancestryConfig, index: number) => {
    setSelectedIndex(index);
    setOpenItem("");
    (document.activeElement as HTMLElement)?.blur();
    onSelect?.(item);
  };

  return (
    <Accordion.Root
      type="single"
      collapsible
      value={openItem}
      onValueChange={setOpenItem}
      className={styles.accordionRoot}
      data-testid="lineage-accordion"
    >
      {lineage.map((item, index) => (
        <Accordion.Item
          key={index}
          value={`lineage-${index}`}
          className={styles.accordionItem}
          data-testid={`lineage-item-${index}`}
          data-selected={selectedIndex === index}
        >
          <Accordion.Header className={styles.accordionHeader}>
            <Accordion.Trigger
              className={styles.accordionTrigger}
              data-testid={`lineage-trigger-${index}`}
              data-selected={selectedIndex === index}
            >
              <span className={styles.triggerContent}>
                {selectedIndex === index && (
                  <CheckIcon className={styles.checkIcon} aria-hidden />
                )}
                {item.type}
              </span>
              <ChevronDownIcon
                className={styles.accordionChevron}
                aria-hidden
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            className={styles.accordionContent}
            data-testid={`lineage-content-${index}`}
          >
            <div className={styles.accordionContentText}>
              <p className={styles.lineageFeatures}>{item.features}</p>
              <span className={styles.lineageDamageType}>
                Damage Type: {item.damageType}
              </span>
              <div>
                <Button
                  onPress={() => handleSelect(item, index)}
                  text={"Select"}
                />
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default LineageAccordion;
