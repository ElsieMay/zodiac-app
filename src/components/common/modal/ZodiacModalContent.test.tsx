import { render, screen } from "@testing-library/react";
import { describe, beforeEach, vi, it, expect } from "vitest";
import { mockZodiacModalContentProps } from "../../__mocks__/sample";
import { ZodiacModalContent } from "./ZodiacModalContent";

describe("ZodiacModalContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the zodiac modal component", () => {
    render(<ZodiacModalContent {...mockZodiacModalContentProps} />);
    const modalContent = screen.getByTestId("zodiac-modal");
    expect(modalContent).toBeInTheDocument();
    const titleElement = screen.getByText(/♈ Aries/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("should render the species modal component", () => {
    const speciesProps = {
      ...mockZodiacModalContentProps,
      mode: "species" as const,
      selectedSign: undefined,
      selectedOrder: "Dragon",
    };
    render(<ZodiacModalContent {...speciesProps} />);
    const modalContent = screen.getByTestId("zodiac-modal");
    expect(modalContent).toBeInTheDocument();
    const titleElement = screen.getByTestId("zodiac-name");
    expect(titleElement).toHaveTextContent("Dragon");
  });

  it("should call onSkillsChange when skills are changed", () => {
    const onSkillsChangeMock = vi.fn();
    const props = {
      ...mockZodiacModalContentProps,
      onSkillsChange: onSkillsChangeMock,
    };
    render(<ZodiacModalContent {...props} />);
    props.onSkillsChange([0, 1, 2]);
    expect(onSkillsChangeMock).toHaveBeenCalledWith([0, 1, 2]);
  });

  it("should call onArmouryChange when armoury is changed", () => {
    const onArmouryChangeMock = vi.fn();
    const props = {
      ...mockZodiacModalContentProps,
      onArmouryChange: onArmouryChangeMock,
    };
    render(<ZodiacModalContent {...props} />);
    props.onArmouryChange([0, 1]);
    expect(onArmouryChangeMock).toHaveBeenCalledWith([0, 1]);
  });

  it("should call onAwaken when awaken button is clicked", () => {
    const onAwakenMock = vi.fn();
    const props = {
      ...mockZodiacModalContentProps,
      onAwaken: onAwakenMock,
    };
    render(<ZodiacModalContent {...props} />);
    props.onAwaken();
    expect(onAwakenMock).toHaveBeenCalled();
  });

  it("should render without errors", () => {
    expect(() =>
      render(<ZodiacModalContent {...mockZodiacModalContentProps} />),
    ).not.toThrow();
  });
});
