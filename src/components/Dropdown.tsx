import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckboxIcon, ArrowDownIcon, BoxIcon } from "@radix-ui/react-icons";
import "../index.css";

interface DropdownProps {
  items: string[];
  selectionCount: number;
}

const Dropdown = ({ items, selectionCount }: DropdownProps) => {
  const [selectedValue, setSelectedValue] = React.useState<number[]>([]);

  const toggleIndex = (idx: number) => {
    setSelectedValue((prev) => {
      if (prev.includes(idx)) {
        return prev.filter((i) => i !== idx);
      }
      if (!selectionCount || prev.length < selectionCount) {
        return [...prev, idx];
      }
      return prev;
    });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="dropdown-trigger">
        <ArrowDownIcon />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="dropdown-content">
          {items.map((item, index) => (
            <DropdownMenu.CheckboxItem
              key={index}
              className="dropdown-item"
              checked={selectedValue.includes(index)}
              onSelect={(e) => {
                e.preventDefault();
                toggleIndex(index);
              }}
            >
              <span className="dropdown-indicator">
                {selectedValue.includes(index) ? <CheckboxIcon /> : <BoxIcon />}
              </span>
              <span>{item}</span>
            </DropdownMenu.CheckboxItem>
          ))}
          <DropdownMenu.Arrow className="dropdown-arrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
