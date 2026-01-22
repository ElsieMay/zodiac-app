import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";

function buttonRender(mockFn: () => void) {
  return render(
    <Button
      onPress={mockFn}
      text="Click Me"
      bgColour="#080048"
      colour="white"
    />,
  );
}

describe("Button", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with correct text", () => {
    const mockFn = vi.fn();
    buttonRender(mockFn);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onPress when clicked", async () => {
    const mockFn = vi.fn();
    const user = userEvent.setup();
    buttonRender(mockFn);
    await user.click(screen.getByText("Click Me"));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("applies correct data attributes", () => {
    const mockFn = vi.fn();
    buttonRender(mockFn);
    const button = screen.getByText("Click Me");
    expect(button).toHaveAttribute("data-bg-colour", "#080048");
    expect(button).toHaveAttribute("data-text-colour", "white");
  });
});
