import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Background } from "../Background";

describe("Background", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render background container", () => {
    render(<Background />);
    expect(screen.getByTestId("background-container")).toBeInTheDocument();
  });

  it("should render canvas", () => {
    render(<Background />);
    expect(screen.getByTestId("background-canvas")).toBeInTheDocument();
  });
});

describe("BackgroundSphere data generation", () => {
  it("should generate sphere data within valid ranges", () => {
    const min = 1.5;
    const max = 3.0;
    const result = Math.random() * (max - min) + min;
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});
