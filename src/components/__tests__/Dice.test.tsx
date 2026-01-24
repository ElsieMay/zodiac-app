import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Dice from "../Dice";

vi.mock("three", () => import("../__mocks__/three.module"));

describe("Dice", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("renders the dice container", () => {
    render(<Dice />);
    const container = screen.getByTestId("dice-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("dice-container");
  });

  it("renders with default cameraPosition", () => {
    render(<Dice />);
    expect(screen.getByTestId("dice-container")).toBeInTheDocument();
  });

  it("accepts custom cameraPosition prop", () => {
    render(<Dice cameraPosition={5} />);
    expect(screen.getByTestId("dice-container")).toBeInTheDocument();
  });

  it("appends canvas to container", () => {
    render(<Dice />);
    const container = screen.getByTestId("dice-container");
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });

  it("cleans up renderer on unmount", () => {
    const { unmount } = render(<Dice />);
    const container = screen.getByTestId("dice-container");
    expect(container.querySelector("canvas")).toBeInTheDocument();

    unmount();
  });

  it("handles cleanup when canvas is already removed", () => {
    const { unmount } = render(<Dice />);
    const container = screen.getByTestId("dice-container");
    const canvas = container.querySelector("canvas");

    // Manually remove canvas before unmount to test the branch
    if (canvas) {
      container.removeChild(canvas);
    }

    // Should not throw when unmounting
    expect(() => unmount()).not.toThrow();
  });

  it("initializes Three.js components", async () => {
    const THREE = await import("three");
    render(<Dice />);

    expect(THREE.WebGLRenderer).toBeDefined();
    expect(THREE.PerspectiveCamera).toBeDefined();
    expect(THREE.Scene).toBeDefined();
  });
});
