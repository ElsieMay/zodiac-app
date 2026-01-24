import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Carousel from "../Carousel";

describe("Carousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render carousel container", () => {
    render(<Carousel />);
    expect(screen.getByTestId("carousel-container")).toBeInTheDocument();
  });

  it("should render canvas", () => {
    render(<Carousel />);
    expect(screen.getByTestId("carousel-canvas")).toBeInTheDocument();
  });

  it("should render zodiac scene", () => {
    render(<Carousel />);
    expect(screen.getByTestId("zodiac-scene")).toBeInTheDocument();
  });
});
