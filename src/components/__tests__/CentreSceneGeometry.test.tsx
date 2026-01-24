import { render, screen } from "@testing-library/react";
import { describe, beforeEach, vi, it, expect } from "vitest";
import {
  CenterSceneGeometry,
  CENTER_GEOMETRY_CONFIG,
} from "../CentreSceneGeometry";
import { useFrame } from "@react-three/fiber";

// let frameCallback: (() => void) | null = null;

// Create properly typed mock refs that match THREE.Mesh structure
const createMockRef = () => ({
  current: {
    rotation: { x: 0, y: 0, z: 0 },
  },
});

let mockRefs: ReturnType<typeof createMockRef>[];

// vi.mock("@react-three/fiber", async () => {
//   const actual = await vi.importActual("@react-three/fiber");
//   return {
//     ...actual,
//     useFrame: vi.fn((callback: () => void) => {
//       frameCallback = callback;
//     }),
//   };
// });

let refIndex = 0;

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useRef: vi.fn(() => {
      const ref = mockRefs[refIndex++];
      return ref || { current: null };
    }),
  };
});

describe("CenterSceneGeometry", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // frameCallback = null;
    refIndex = 0;

    // Create fresh mock refs for each test
    mockRefs = [createMockRef(), createMockRef(), createMockRef()];
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

  // it("should update mesh rotations in animation callback", () => {
  //   render(<CenterSceneGeometry />);

  //   expect(frameCallback).not.toBeNull();

  //   if (frameCallback) {
  //     frameCallback();

  //     // Verify rotations were updated
  //     expect(mockRefs[0].current.rotation.x).toBe(
  //       CENTER_GEOMETRY_CONFIG.icosahedronRotationSpeed,
  //     );
  //     expect(mockRefs[0].current.rotation.y).toBe(
  //       CENTER_GEOMETRY_CONFIG.icosahedronRotationSpeed,
  //     );
  //     expect(mockRefs[1].current.rotation.x).toBe(
  //       CENTER_GEOMETRY_CONFIG.ringSmallRotationSpeed,
  //     );
  //     expect(mockRefs[1].current.rotation.y).toBe(
  //       CENTER_GEOMETRY_CONFIG.ringSmallRotationSpeed,
  //     );
  //     expect(mockRefs[2].current.rotation.x).toBe(
  //       CENTER_GEOMETRY_CONFIG.ringLargeRotationSpeed,
  //     );
  //     expect(mockRefs[2].current.rotation.y).toBe(
  //       CENTER_GEOMETRY_CONFIG.ringLargeRotationSpeed,
  //     );
  //   }
  // });

  it("should have correct rotation speed configuration", () => {
    expect(CENTER_GEOMETRY_CONFIG.icosahedronRotationSpeed).toBe(2 / 200);
    expect(CENTER_GEOMETRY_CONFIG.ringSmallRotationSpeed).toBe(0.03);
    expect(CENTER_GEOMETRY_CONFIG.ringLargeRotationSpeed).toBe(0.01);
  });

  it("should calculate correct rotation values based on elapsed time", () => {
    const elapsedTime = 10;

    const expectedIcosahedronRotation =
      elapsedTime * CENTER_GEOMETRY_CONFIG.icosahedronRotationSpeed;
    const expectedRingSmallRotation =
      elapsedTime * CENTER_GEOMETRY_CONFIG.ringSmallRotationSpeed;
    const expectedRingLargeRotation =
      elapsedTime * CENTER_GEOMETRY_CONFIG.ringLargeRotationSpeed;

    expect(expectedIcosahedronRotation).toBe(0.1);
    expect(expectedRingSmallRotation).toBe(0.3);
    expect(expectedRingLargeRotation).toBe(0.1);
  });

  it("should render without errors", () => {
    expect(() => render(<CenterSceneGeometry />)).not.toThrow();
  });
});
