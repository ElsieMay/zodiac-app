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
  const toggleItem = (item: string) => {
    const newSelection = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : selectedItems.length < selectionCount
        ? [...selectedItems, item]
        : selectedItems;

    onSelectionChange(newSelection);
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
                toggleItem(item);
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
