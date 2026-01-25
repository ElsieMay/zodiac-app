import { render, screen } from "@testing-library/react";
import { describe, beforeEach, vi, it, expect } from "vitest";
import { mockCarouselSegmentProps } from "../__mocks__/sample";
import { CarouselSegment } from "./CarouselSegment";

describe("CarouselSegment", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render carousel segment", () => {
    render(<CarouselSegment {...mockCarouselSegmentProps} />);
    expect(screen.getByTestId("carousel-segment-0")).toBeInTheDocument();
  });

  it("should handle segment click", () => {
    render(<CarouselSegment {...mockCarouselSegmentProps} />);
    const segment = screen.getByTestId("carousel-segment-0");
    segment.click();
    expect(mockCarouselSegmentProps.onSegmentClick).toHaveBeenCalledWith(
      "Aries",
    );
  });

  it("should change emissive color on hover", () => {
    render(<CarouselSegment {...mockCarouselSegmentProps} />);
    const segment = screen.getByTestId("carousel-segment-0");
    // Simulate hover
    segment.dispatchEvent(new MouseEvent("pointerover", { bubbles: true }));
    // Simulate hover out
    segment.dispatchEvent(new MouseEvent("pointerout", { bubbles: true }));
  });
});
