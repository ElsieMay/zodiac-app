import { render, screen } from "@testing-library/react";
import { describe, beforeEach, vi, it, expect } from "vitest";
import { mockModalProps } from "../../__mocks__/sample";
import Modal from "./Modal";
import userEvent from "@testing-library/user-event";

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

  it("should not render when isOpen is false", () => {
    render(<Modal {...mockModalProps} isOpen={false} />);
    const modalOverlay = screen.queryByTestId("modal-overlay");
    expect(modalOverlay).toBeNull();
  });

  it("should call onClose when overlay is clicked", async () => {
    const user = userEvent.setup();
    render(<Modal {...mockModalProps} />);
    const modalOverlay = screen.getByTestId("modal-overlay");
    await user.click(modalOverlay);
    expect(mockModalProps.onClose).toHaveBeenCalled();
  });

  it("should not call onClose when modal content is clicked", async () => {
    const user = userEvent.setup();
    render(<Modal {...mockModalProps} />);
    const modalContent = screen.getByTestId("modal-content");
    await user.click(modalContent);
    expect(mockModalProps.onClose).not.toHaveBeenCalled();
  });

  it("should call onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<Modal {...mockModalProps} />);
    const closeButton = screen.getByTestId("button");
    await user.click(closeButton);
    expect(mockModalProps.onClose).toHaveBeenCalled();
  });

  it("should render without errors", () => {
    expect(() => render(<Modal {...mockModalProps} />)).not.toThrow();
  });
});
