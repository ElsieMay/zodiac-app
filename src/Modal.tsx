import type { ReactNode } from "react";
// import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  sign?: string;
  backgroundImage?: string;
}

function Modal({
  isOpen,
  onClose,
  children,
  sign,
  backgroundImage,
}: ModalProps) {
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
        <div className="modal-body">
          {sign && (
            <div className="modal-zodiac-container">
              <img
                src={`/zodiacs/icons/sketched/${sign.toLowerCase()}.png`}
                alt={sign}
                id="modal-zodiac-icon"
              />
              <img
                src={`../public/images/fg.png`}
                alt={sign}
                id="modal-zodiac-edges"
              />
            </div>
          )}
          {children}
          <img
            src={`../public/images/lg.png`}
            alt={sign}
            id="modal-zodiac-bottom"
          />
        </div>
      </div>
      {/* <div className="button-right">
        <Button onPress={() => onClose()} text="Xxxxxxxxxx" />
      </div> */}
    </div>
  );
}

export default Modal;
