import "@testing-library/jest-dom";

// ResizeObserver polyfill for @react-three/fiber tests
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
