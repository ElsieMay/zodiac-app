import type { ModalProps } from "../types/component.types";
import Button from "./Button";

function Modal({ isOpen, onClose, children, backgroundImage }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      data-testid="modal-overlay"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-content"
      >
        {backgroundImage && (
          <div
            className="modal-background"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            data-testid="modal-background"
          />
        )}
        <div className="modal-close" data-testid="modal-close">
          <Button onPress={() => onClose()} text="Close" />
        </div>
        <div className="modal-body" data-testid="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
