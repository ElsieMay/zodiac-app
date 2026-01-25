import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import Carousel from "./Carousel";

// Mock of the ZodiacScene component -> to control segment clicks
vi.mock("../ZodiacScene", () => ({
  ZodiacScene: ({
    onSegmentClick,
  }: {
    onSegmentClick: (sign: string) => void;
    mode?: string;
  }) => (
    <div data-testid="zodiac-scene">
      <button
        data-testid="mock-zodiac-segment"
        onClick={() => onSegmentClick("Aries")}
      >
        Click Aries
      </button>
    </div>
  ),
}));

// Mock of the ZodiacModalContent component -> to control awaken action
vi.mock("../ZodiacModalContent", () => ({
  ZodiacModalContent: ({
    onAwaken,
    selectedSign,
  }: {
    onAwaken: () => void;
    selectedSign: string;
    mode?: string;
  }) => (
    <div data-testid="zodiac-modal-content">
      <p>Selected: {selectedSign}</p>
      <button data-testid="mock-awaken-button" onClick={onAwaken}>
        Awaken
      </button>
    </div>
  ),
}));

// Mock of the Modal component -> to control open/close behavior
vi.mock("../Modal", () => ({
  default: ({
    isOpen,
    children,
    onClose,
  }: {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
  }) => (
    <div data-testid="carousel-modal">
      {isOpen && (
        <div>
          <button data-testid="mock-close-button" onClick={onClose}>
            Close
          </button>
          {children}
        </div>
      )}
    </div>
  ),
}));

describe("Carousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render carousel container", () => {
    render(<Carousel />);
    expect(screen.getByTestId("carousel-container")).toBeInTheDocument();
    expect(screen.getByTestId("carousel-canvas")).toBeInTheDocument();
    expect(screen.getByTestId("zodiac-scene")).toBeInTheDocument();
  });

  it("should not display modal content initially", () => {
    render(<Carousel />);
    expect(
      screen.queryByTestId("zodiac-modal-content"),
    ).not.toBeInTheDocument();
  });

  it("should open modal when zodiac segment is clicked", () => {
    render(<Carousel />);

    const segmentButton = screen.getByTestId("mock-zodiac-segment");
    fireEvent.click(segmentButton);

    expect(screen.getByTestId("zodiac-modal-content")).toBeInTheDocument();
    expect(screen.getByText("Selected: Aries")).toBeInTheDocument();
  });

  it("should close modal when close button is clicked", () => {
    render(<Carousel />);

    const segmentButton = screen.getByTestId("mock-zodiac-segment");
    fireEvent.click(segmentButton);
    expect(screen.getByTestId("zodiac-modal-content")).toBeInTheDocument();
    const closeButton = screen.getByTestId("mock-close-button");
    fireEvent.click(closeButton);
    expect(
      screen.queryByTestId("zodiac-modal-content"),
    ).not.toBeInTheDocument();
  });
});

describe("Carousel mode transitions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("should execute handleModeTransition when Awaken button is clicked", () => {
    render(<Carousel />);

    const segmentButton = screen.getByTestId("mock-zodiac-segment");
    fireEvent.click(segmentButton);
    const awakenButton = screen.getByTestId("mock-awaken-button");
    fireEvent.click(awakenButton);
    // Selected sign should be cleared
    expect(
      screen.queryByTestId("zodiac-modal-content"),
    ).not.toBeInTheDocument();
  });

  it("should reset selections when mode transition starts", () => {
    render(<Carousel />);

    // Test zodiac mode -> species mode
    fireEvent.click(screen.getByTestId("mock-zodiac-segment"));
    expect(screen.getByTestId("zodiac-modal-content")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("mock-awaken-button"));
    expect(
      screen.queryByTestId("zodiac-modal-content"),
    ).not.toBeInTheDocument();

    vi.advanceTimersByTime(3000);

    // Test species mode -> zodiac mode
    fireEvent.click(screen.getByTestId("mock-zodiac-segment"));
    fireEvent.click(screen.getByTestId("mock-awaken-button"));
    vi.advanceTimersByTime(3000);

    // After transition, clicking a segment should open modal again
    fireEvent.click(screen.getByTestId("mock-zodiac-segment"));
    expect(screen.getByTestId("zodiac-modal-content")).toBeInTheDocument();
  });
});
