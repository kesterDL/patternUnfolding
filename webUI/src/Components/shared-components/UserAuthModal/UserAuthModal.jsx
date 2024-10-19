import React from "react";
import styles from "./UserAuthModal.module.css";

function UserAuthModal({ show, onClose, children }) {
  if (!show) return null; // Now checking for "show"

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default UserAuthModal;
