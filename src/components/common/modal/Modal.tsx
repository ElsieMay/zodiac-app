import { useEffect } from "react";
import type { ModalProps } from "../../../types";
import Button from "../button/Button";
import styles from "./Modal.module.css";

function Modal({ isOpen, onClose, children, backgroundImage }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling and zooming on the background
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.touchAction = "none";
    }

    return () => {
      // Restore scrolling when modal closes
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      data-testid="modalOverlay"
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        data-testid="modalContent"
      >
        {backgroundImage && (
          <div
            className={styles.modalBackground}
            style={{ backgroundImage: `url(${backgroundImage})` }}
            data-testid="modalBackground"
          />
        )}
        <div className={styles.modalClose} data-testid="modalClose">
          <Button onPress={() => onClose()} text="Close" />
        </div>
        <div className={styles.modalBody} data-testid="modalBody">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
