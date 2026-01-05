import type { ReactNode } from "react";
import img from "../public/images/galaxy.png";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Base background image */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: `url(${img})`, 
          backgroundSize: '440%',
          backgroundPosition: 'center',
          opacity: 0.4,
          borderRadius: '12px',
          zIndex: 0
        }} />
        {/* Inner area overlay */}
        <div style={{ 
          position: 'absolute', 
          inset: '20px',
          backgroundColor: 'rgba(8, 0, 72, 0.5)',
          borderRadius: '8px',
          zIndex: 0
        }} />
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
