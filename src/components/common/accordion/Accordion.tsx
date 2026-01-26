import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import type { ancestryConfig } from "../../../../public/content/order_options";
import styles from "./Accordion.module.css";

interface LineageAccordionProps {
  lineage: ancestryConfig[];
}

const LineageAccordion = ({ lineage }: LineageAccordionProps) => (
  <Accordion.Root
    type="single"
    collapsible
    className={styles.accordionRoot}
    data-testid="lineage-accordion"
  >
    {lineage.map((item, index) => (
      <Accordion.Item
        key={index}
        value={`lineage-${index}`}
        className={styles.accordionItem}
        data-testid={`lineage-item-${index}`}
      >
        <Accordion.Header className={styles.accordionHeader}>
          <Accordion.Trigger
            className={styles.accordionTrigger}
            data-testid={`lineage-trigger-${index}`}
          >
            {item.type}
            <ChevronDownIcon className={styles.accordionChevron} aria-hidden />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content
          className={styles.accordionContent}
          data-testid={`lineage-content-${index}`}
        >
          <div className={styles.accordionContentText}>
            <p className={styles.lineageFeatures}>{item.features}</p>
            <span className={styles.lineageDamageType}>
              Damage: {item.damageType}
            </span>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    ))}
  </Accordion.Root>
);

export default LineageAccordion;
