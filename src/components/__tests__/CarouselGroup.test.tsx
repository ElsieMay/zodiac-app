import { render } from "@testing-library/react";
import { describe, beforeEach, vi, it, expect } from "vitest";
import { CarouselGroup } from "../CarouselGroup";
import { mockCarouselGroupProps } from "../__mocks__/sample";

describe("CarouselGroup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render carousel group", () => {
    render(
      <CarouselGroup
        items={mockCarouselGroupProps.items}
        isSpinning={mockCarouselGroupProps.isSpinning}
        mode={mockCarouselGroupProps.mode}
      />,
    );
    expect(
      document.querySelector('[data-testid="carousel-group"]'),
    ).toBeInTheDocument();
  });

  it("should render correct number of segments", () => {
    render(
      <CarouselGroup
        items={mockCarouselGroupProps.items}
        isSpinning={mockCarouselGroupProps.isSpinning}
        mode={mockCarouselGroupProps.mode}
      />,
    );
    const segments = document.querySelectorAll("mesh");
    expect(segments.length).toBe(mockCarouselGroupProps.items.length);
  });
});
