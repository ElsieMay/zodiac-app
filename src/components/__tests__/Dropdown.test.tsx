import { render, screen, waitFor } from "@testing-library/react";
import { describe, beforeEach, vi, it, expect } from "vitest";
import Dropdown from "../Dropdown";
import { mockDropdownProps } from "../__mocks__/sample";
import userEvent from "@testing-library/user-event";

describe("Dropdown", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the dropdown component", () => {
    render(<Dropdown {...mockDropdownProps} />);
    const dropdownTrigger = screen.getByTestId("dropdown-trigger");
    expect(dropdownTrigger).toBeDefined();
  });

  it("should display the correct number of items", async () => {
    const user = userEvent.setup();
    render(<Dropdown {...mockDropdownProps} />);

    const dropdownTrigger = screen.getByTestId("dropdown-trigger");
    await user.click(dropdownTrigger);

    // Wait for the portal content to appear
    await waitFor(() => {
      expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
    });

    const items = mockDropdownProps.items;
    for (let index = 0; index < items.length; index++) {
      const dropdownItem = await screen.findByTestId(`dropdown-item-${index}`);
      expect(dropdownItem).toBeInTheDocument();

      const itemText = screen.getByTestId(`dropdown-item-text-${index}`);
      expect(itemText.textContent).toBe(items[index]);
    }
  });

  it("should render without errors", () => {
    expect(() => render(<Dropdown {...mockDropdownProps} />)).not.toThrow();
  });
});
