import { vi } from "vitest";

class MockVector3 {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
}

class MockEuler {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class MockCylinderGeometry {
  parameters: {
    radiusTop: number;
    radiusBottom: number;
    height: number;
    radialSegments: number;
    heightSegments: number;
    openEnded: boolean;
    thetaStart: number;
    thetaLength: number;
  };

  constructor(
    radiusTop = 1,
    radiusBottom = 1,
    height = 1,
    radialSegments = 8,
    heightSegments = 1,
    openEnded = false,
    thetaStart = 0,
    thetaLength = Math.PI * 2,
  ) {
    this.parameters = {
      radiusTop,
      radiusBottom,
      height,
      radialSegments,
      heightSegments,
      openEnded,
      thetaStart,
      thetaLength,
    };
  }
}

const mockThree = {
  Scene: vi.fn(() => ({ add: vi.fn(), children: [] })),
  PerspectiveCamera: vi.fn(() => ({ position: { set: vi.fn() } })),
  WebGLRenderer: vi.fn(() => ({
    render: vi.fn(),
    domElement: document.createElement("canvas"),
  })),
  Mesh: vi.fn(),
  Vector3: MockVector3,
  Euler: MockEuler,
  CylinderGeometry: MockCylinderGeometry,
  Clock: vi.fn(() => ({ getElapsedTime: vi.fn(() => 0) })),
  DoubleSide: 2,
};

export default mockThree;
export const {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  Vector3,
  Euler,
  CylinderGeometry,
  Clock,
  DoubleSide,
} = mockThree;
