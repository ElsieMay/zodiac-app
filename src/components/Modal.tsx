import type { ModalProps } from "../types/component.types";
import Button from "./Button";

function Modal({ isOpen, onClose, children, backgroundImage }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {backgroundImage && (
          <div
            className="modal-background"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        <div className="modal-close">
          <Button onPress={() => onClose()} text="Close" />
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
