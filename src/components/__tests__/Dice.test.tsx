import { render, screen } from "@testing-library/react";
import { describe, beforeEach, vi, it, expect } from "vitest";
import Dice from "../Dice";

describe("Dice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the dice component", () => {
    render(<Dice />);
    const diceContainer = screen.getByTestId("dice-container");
    expect(diceContainer).toBeDefined();
  });

  it("should render without errors", () => {
    expect(() => render(<Dice />)).not.toThrow();
  });
});
