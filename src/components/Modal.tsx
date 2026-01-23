import type { ReactNode } from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  sign?: string;
  backgroundImage?: string;
}

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
