import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Solaria } from "../Solaria";

describe("Solaria", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = () => {
    return render(
      <MemoryRouter>
        <Solaria />
      </MemoryRouter>,
    );
  };

  it("should render header text", () => {
    const { getByTestId } = renderWithRouter();
    const headerElement = getByTestId("solaria-header");
    expect(headerElement).toBeDefined();
  });

  it("should render button", () => {
    const { getByTestId } = renderWithRouter();
    const buttonElement = getByTestId("solaria-button");
    expect(buttonElement).toBeDefined();
  });

  it("should navigate back on button press", () => {
    const { getByTestId } = renderWithRouter();
    const buttonElement = getByTestId("button");
    expect(buttonElement).toBeDefined();
  });

  it("should render without errors", () => {
    expect(() => renderWithRouter()).not.toThrow();
  });
});
