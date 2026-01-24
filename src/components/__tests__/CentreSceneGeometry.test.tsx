import { render, screen } from "@testing-library/react";
import { describe, beforeEach, vi, it, expect } from "vitest";
import { CenterSceneGeometry } from "../CentreSceneGeometry";

describe("CenterSceneGeometry", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render center scene geo element", () => {
    render(<CenterSceneGeometry />);
    const icosahedron = screen.getByTestId("center-icosahedron");
    const ringSmall = screen.getByTestId("center-ring-small");
    const ringLarge = screen.getByTestId("center-ring-large");

    expect(icosahedron).toBeDefined();
    expect(ringSmall).toBeDefined();
    expect(ringLarge).toBeDefined();
  });

  it("should render without errors", () => {
    expect(() => render(<CenterSceneGeometry />)).not.toThrow();
  });
});
