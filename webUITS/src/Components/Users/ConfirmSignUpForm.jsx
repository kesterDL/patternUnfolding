import React, { useState } from "react";
import styles from "./UserSignUp.module.css";

const ConfirmSignUpForm = ({ onConfirm }) => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = () => {
    setErrors([]);
    onConfirm(confirmationCode);
  };

  return (
    <div className={styles.confirmationForm}>
      <h3>Confirm Your Registration</h3>
      <input
        className={styles.inputField}
        type="text"
        placeholder="Confirmation Code"
        value={confirmationCode}
        onChange={(e) => setConfirmationCode(e.target.value)}
      />
      <button className={styles.registerButton} onClick={handleSubmit}>
        Confirm
      </button>
      {errors.length > 0 && (
        <ul styles={{ color: "red" }}>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConfirmSignUpForm;
