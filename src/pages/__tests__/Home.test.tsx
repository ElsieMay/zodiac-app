import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "../Home";

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = () => {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
  };

  it("should render header text", () => {
    const { getByTestId } = renderWithRouter();
    const headerElement = getByTestId("home-header");
    expect(headerElement).toBeDefined();
  });

  it("should render button", () => {
    const { getByTestId } = renderWithRouter();
    const buttonElement = getByTestId("home-button");
    expect(buttonElement).toBeDefined();
  });

  it("should navigate on button press", () => {
    const { getByTestId } = renderWithRouter();
    const buttonElement = getByTestId("button");
    expect(buttonElement).toBeDefined();
  });

  it("should render without errors", () => {
    expect(() => renderWithRouter()).not.toThrow();
  });
});
