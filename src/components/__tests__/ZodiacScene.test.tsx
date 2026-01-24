import { fireEvent, render, screen } from "@testing-library/react";
import { describe, beforeEach, vi, it, expect } from "vitest";
import { mockSceneProps } from "../__mocks__/sample";
import { ZodiacScene } from "../ZodiacScene";

describe("ZodiacScene", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the zodiac modal component", () => {
    render(<ZodiacScene {...mockSceneProps} />);
    const modalContent = screen.getByTestId("zodiac-scene");
    expect(modalContent).toBeInTheDocument();
    const carouselGroup = screen.getByTestId("carousel-group");
    expect(carouselGroup).toBeInTheDocument();
    const orbitControls = screen.getByTestId("orbit-controls");
    expect(orbitControls).toBeInTheDocument();
  });

  it("should call onSegmentClick when a segment is clicked", () => {
    const onSegmentClickMock = vi.fn();
    render(
      <ZodiacScene {...mockSceneProps} onSegmentClick={onSegmentClickMock} />,
    );
    const firstSegment = screen.getByTestId("carousel-segment-0");
    fireEvent.click(firstSegment);

    expect(onSegmentClickMock).toHaveBeenCalledWith("Aries");
  });

  it("should render without errors", () => {
    expect(() => render(<ZodiacScene {...mockSceneProps} />)).not.toThrow();
  });
});
