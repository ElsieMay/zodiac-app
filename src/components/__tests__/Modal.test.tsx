import { render, screen } from "@testing-library/react";
import { describe, beforeEach, vi, it, expect } from "vitest";
import { mockModalProps } from "../__mocks__/sample";
import Modal from "../Modal";

describe("Modal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the modal component", () => {
    render(<Modal {...mockModalProps} />);
    const modalOverlay = screen.getByTestId("modal-overlay");
    expect(modalOverlay).toBeDefined();
    const modalContent = screen.getByTestId("modal-content");
    expect(modalContent).toBeDefined();
    const modalBackground = screen.getByTestId("modal-background");
    expect(modalBackground).toBeDefined();
    const modalClose = screen.getByTestId("modal-close");
    expect(modalClose).toBeDefined();
    const modalBody = screen.getByTestId("modal-body");
    expect(modalBody).toBeDefined();
  });

  it("should render without errors", () => {
    expect(() => render(<Modal {...mockModalProps} />)).not.toThrow();
  });
});
