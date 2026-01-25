import { render, screen } from "@testing-library/react";
import { describe, beforeEach, vi, it, expect } from "vitest";
import { useFrame } from "@react-three/fiber";
import {
  CENTER_GEOMETRY_CONFIG,
  updateRotation,
} from "../../helpers/centerGeoUtils";
import { CenterSceneGeometry } from "../CentreSceneGeometry";
import { Euler } from "three";

vi.mock("@react-three/fiber", async () => {
  const actual = await vi.importActual("@react-three/fiber");
  return {
    ...actual,
    useFrame: vi.fn(),
  };
});

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

  it("should register animation callback with useFrame", () => {
    render(<CenterSceneGeometry />);

    expect(useFrame).toHaveBeenCalledTimes(1);
    expect(useFrame).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should have correct rotation speed configuration", () => {
    expect(CENTER_GEOMETRY_CONFIG.icosahedronRotationSpeed).toBe(2 / 200);
    expect(CENTER_GEOMETRY_CONFIG.ringSmallRotationSpeed).toBe(0.03);
    expect(CENTER_GEOMETRY_CONFIG.ringLargeRotationSpeed).toBe(0.01);
  });

  it("should render without errors", () => {
    expect(() => render(<CenterSceneGeometry />)).not.toThrow();
  });
});

describe("updateRotation", () => {
  it("should update rotation x and y by speed", () => {
    const rotation = new Euler(0, 0, 0);
    updateRotation(rotation, 0.01);

    expect(rotation.x).toBe(0.01);
    expect(rotation.y).toBe(0.01);
  });

  it("should accumulate rotation over multiple calls", () => {
    const rotation = new Euler(0, 0, 0);

    updateRotation(rotation, 0.01);
    updateRotation(rotation, 0.01);
    updateRotation(rotation, 0.01);

    expect(rotation.x).toBeCloseTo(0.03); // Use toBeCloseTo for floating point
    expect(rotation.y).toBeCloseTo(0.03);
  });

  it("should handle undefined rotation gracefully", () => {
    expect(() => updateRotation(undefined, 0.01)).not.toThrow();
  });

  it("should work with negative speeds", () => {
    const rotation = new Euler(1, 1, 0);
    updateRotation(rotation, -0.5);

    expect(rotation.x).toBe(0.5);
    expect(rotation.y).toBe(0.5);
  });

  it("should work with configured speeds", () => {
    const rotation = new Euler(0, 0, 0);

    updateRotation(rotation, CENTER_GEOMETRY_CONFIG.icosahedronRotationSpeed);

    expect(rotation.x).toBe(CENTER_GEOMETRY_CONFIG.icosahedronRotationSpeed);
    expect(rotation.y).toBe(CENTER_GEOMETRY_CONFIG.icosahedronRotationSpeed);
  });
});
