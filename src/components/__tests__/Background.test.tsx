import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Background } from "../Background";
import { calculateSpherePosition } from "../../helpers";
import { mockSphereData, mockMesh } from "../__mocks__/sample";
import { useFrame } from "@react-three/fiber";

describe("Background", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render background container", () => {
    render(<Background />);
    expect(screen.getByTestId("background-container")).toBeInTheDocument();
    expect(useFrame).toBeDefined();
    expect(calculateSpherePosition).toBeDefined();
  });

  it("should render canvas", () => {
    render(<Background />);
    expect(screen.getByTestId("background-canvas")).toBeInTheDocument();
    expect(screen.getByTestId("background-spheres")).toBeInTheDocument();
    const spheres = screen.getAllByTestId("background-sphere");
    expect(spheres.length).toBeGreaterThan(0);
  });

  it("should not crash on render", () => {
    expect(() => render(<Background />)).not.toThrow();
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

  it("should generate sphere position correctly", () => {
    const t = 1; // elapsed time

    calculateSpherePosition(t, mockSphereData, mockMesh);

    expect(mockMesh.position.set).toHaveBeenCalled();
    expect(mockMesh.position.multiplyScalar).toHaveBeenCalledWith(
      mockSphereData.radius,
    );
    expect(mockMesh.position.setY).toHaveBeenCalledWith(mockSphereData.posY);
    expect(mockMesh.scale.setScalar).toHaveBeenCalled();
  });
});
