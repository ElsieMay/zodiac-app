import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// ResizeObserver polyfill for @react-three/fiber tests
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock @react-three/fiber
vi.mock("@react-three/fiber", () => ({
  Canvas: ({
    children,
    ...props
  }: {
    children?: React.ReactNode;
    [key: string]: unknown;
  }) =>
    React.createElement(
      "div",
      { "data-testid": "canvas-mock", ...props },
      children,
    ),
  useFrame: vi.fn(),
  useLoader: vi.fn(() => []),
  useThree: vi.fn(() => ({
    camera: {},
    scene: {},
    gl: {},
  })),
}));

// Mock @react-three/drei
vi.mock("@react-three/drei", () => ({
  OrbitControls: (props: unknown) =>
    React.createElement("orbitControls", props as React.Attributes),
  useTexture: vi.fn(() => ({})),
  Text3D: (props: unknown) =>
    React.createElement("text3D", props as React.Attributes),
}));

// Use the centralised Three.js mock
vi.mock("three", async () => {
  const mockThree = await import("../components/__mocks__/three.module");
  return {
    ...mockThree.default,
    Color: class Color {
      r: number;
      g: number;
      b: number;
      constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
      }
    },
    MathUtils: {
      randFloat: (min: number, max: number) => (min + max) / 2,
    },
    ACESFilmicToneMapping: 4,
  };
});

(globalThis as unknown as Record<string, unknown>).sphereGeometry = () => null;
(globalThis as unknown as Record<string, unknown>).meshStandardMaterial = () =>
  null;
(globalThis as unknown as Record<string, unknown>).mesh = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
  [key: string]: unknown;
}) => React.createElement("div", props, children);
(globalThis as unknown as Record<string, unknown>).group = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
  [key: string]: unknown;
}) => React.createElement("div", props, children);
