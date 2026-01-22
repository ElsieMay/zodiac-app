import * as React from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import "../index.css";

interface DropdownProps {
  title: string;
  items: string[];
}

interface DropdownItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
  disabled?: boolean;
}

const Dropdown = ({ title, items }: DropdownProps) => (
  <Select.Root>
    <Select.Trigger className="dropdown-trigger" aria-label="skills">
      <Select.Value placeholder="Choose Player Skills" />
      <Select.Icon className="dropdown-icon">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="dropdown-content">
        <Select.ScrollUpButton className="dropdown-scroll-button">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="dropdown-viewport">
          <Select.Group>
            <Select.Label className="dropdown-label">{title}</Select.Label>
            {items.map((e) => (
              <SelectItem value={e} key={e}>
                {e}
              </SelectItem>
            ))}
          </Select.Group>
          {/* /* <Select.Separator className="dropdown-separator" /> */}
        </Select.Viewport>
        <Select.ScrollDownButton className="dropdown-scroll-button">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, className, disabled, value }, forwardedRef) => {
    return (
      <Select.Item
        className={`dropdown-item ${className || ""}`}
        value={value}
        disabled={disabled}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="dropdown-indicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);

SelectItem.displayName = "SelectItem";

export default Dropdown;
