import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckboxIcon, ArrowDownIcon, BoxIcon } from "@radix-ui/react-icons";
import type { DropdownProps } from "../../../types/component.types";
import styles from "./Dropdown.module.css";

const Dropdown = ({
  items,
  selectionCount,
  selectedItems,
  onSelectionChange,
}: DropdownProps) => {
  const toggleIndex = (idx: number) => {
    const newSelection = selectedItems.includes(idx)
      ? selectedItems.filter((i) => i !== idx)
      : selectedItems.length < selectionCount
        ? [...selectedItems, idx]
        : selectedItems;

    onSelectionChange(newSelection);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={styles.trigger}
        data-testid="dropdown-trigger"
      >
        <ArrowDownIcon />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.content}
          data-testid="dropdown-content"
        >
          {items.map((item, index) => (
            <DropdownMenu.CheckboxItem
              key={index}
              className={styles.item}
              checked={selectedItems.includes(index)}
              onSelect={(e) => {
                e.preventDefault();
                toggleIndex(index);
              }}
              data-testid={`dropdown-item-${index}`}
            >
              <span
                className={styles.indicator}
                data-testid={`dropdown-indicator-${index}`}
              >
                {selectedItems.includes(index) ? <CheckboxIcon /> : <BoxIcon />}
              </span>
              <span>{item}</span>
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
