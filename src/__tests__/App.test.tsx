import { describe, it, expect, beforeEach, vi } from "vitest";
import App from "../App";
import { render } from "@testing-library/react";

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render without errors", () => {
    expect(() => render(<App />)).not.toThrow();
  });
});
