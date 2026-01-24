import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckboxIcon, ArrowDownIcon, BoxIcon } from "@radix-ui/react-icons";
import "../index.css";
import type { DropdownProps } from "../types/component.types";

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
        className="dropdown-trigger"
        data-testid="dropdown-trigger"
      >
        <ArrowDownIcon />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="dropdown-content"
          data-testid="dropdown-content"
        >
          {items.map((item, index) => (
            <DropdownMenu.CheckboxItem
              key={index}
              className="dropdown-item"
              checked={selectedItems.includes(index)}
              onSelect={(e) => {
                e.preventDefault();
                toggleIndex(index);
              }}
              data-testid={`dropdown-item-${index}`}
            >
              <span
                className="dropdown-indicator"
                data-testid={`dropdown-indicator-${index}`}
              >
                {selectedItems.includes(index) ? <CheckboxIcon /> : <BoxIcon />}
              </span>
              <span data-testid={`dropdown-item-text-${index}`}>{item}</span>
            </DropdownMenu.CheckboxItem>
          ))}
          <DropdownMenu.Arrow
            className="dropdown-arrow"
            data-testid="dropdown-arrow"
          />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
