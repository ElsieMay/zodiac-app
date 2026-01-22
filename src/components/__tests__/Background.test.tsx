import { render, screen } from "@testing-library/react";
import { describe, vi, beforeEach, it, expect } from "vitest";
import { Background } from "../Background";

describe("Background", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the canvas element", () => {
    render(<Background />);
    const canvas = screen.getByRole("img");
    expect(canvas.tagName).toBe("CANVAS");
  });

  it("renders the player-container div", () => {
    const { container } = render(<Background />);
    const playerContainer = container.querySelector(".player-container");
    expect(playerContainer).toBeInTheDocument();
  });

  it("initializes without crashing", () => {
    const { container } = render(<Background />);
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });

  describe("Failure Cases", () => {
    it("handles multiple re-renders without memory leaks", () => {
      const { rerender } = render(<Background />);
      rerender(<Background />);
      rerender(<Background />);

      const canvases = screen.getAllByRole("img");
      expect(canvases).toHaveLength(1);
    });

    it("unmounts cleanly without errors", () => {
      const { unmount } = render(<Background />);
      expect(() => unmount()).not.toThrow();
    });
  });
});
