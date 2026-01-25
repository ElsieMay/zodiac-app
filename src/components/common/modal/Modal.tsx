import type { ModalProps } from "../../../types";
import Button from "../Button";
import styles from "./Modal.module.css";

function Modal({ isOpen, onClose, children, backgroundImage }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      data-testid="modal-overlay"
    >
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-content"
      >
        {backgroundImage && (
          <div
            className={styles.background}
            style={{ backgroundImage: `url(${backgroundImage})` }}
            data-testid="modal-background"
          />
        )}
        <div className={styles.close} data-testid="modal-close">
          <Button onPress={() => onClose()} text="Close" />
        </div>
        <div className={styles.body} data-testid="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
