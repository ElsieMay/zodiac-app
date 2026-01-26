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
  const toggleItem = (idx: number) => {
    const item = items[idx];
    const isSelected = selectedItems.includes(item);

    if (isSelected) {
      onSelectionChange(selectedItems.filter((i) => i !== item));
    } else if (selectedItems.length < selectionCount) {
      onSelectionChange([...selectedItems, item]);
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={styles.dropdownTrigger}
        data-testid="dropdown-trigger"
      >
        <ArrowDownIcon />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.dropdownContent}
          data-testid="dropdown-content"
        >
          {items.map((item, index) => (
            <DropdownMenu.CheckboxItem
              key={index}
              className={styles.dropdownItem}
              checked={selectedItems.includes(item)}
              onSelect={(e) => {
                e.preventDefault();
                toggleItem(index);
              }}
              data-testid={`dropdown-item-${index}`}
            >
              <span
                className={styles.dropdownIndicator}
                data-testid={`dropdown-indicator-${index}`}
              >
                {selectedItems.includes(item) ? <CheckboxIcon /> : <BoxIcon />}
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
