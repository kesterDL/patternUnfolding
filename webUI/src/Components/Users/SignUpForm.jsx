import React, { useState } from "react";
import styles from "./SignUpForm.module.css";

const SignUpForm = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);

  const validatePassword = (password) => {
    const passwordRequirements = [
      { regex: /[0-9]/, message: "At least 1 number" },
      { regex: /[!@#$%^&*]/, message: "At least 1 special character" },
      { regex: /[A-Z]/, message: "At least 1 uppercase letter" },
      { regex: /[a-z]/, message: "At least 1 lowercase letter" },
      { regex: /.{8,}/, message: "Minimum of 8 characters" },
    ];

    const failedRequirements = passwordRequirements
      .filter((requirement) => !requirement.regex.test(password))
      .map((requirement) => requirement.message);

    return failedRequirements;
  };

  const handleSubmit = () => {
    const validationErrors = validatePassword(password);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    onSignUp(email, password, username);
  };

  return (
    <div className={styles.registrationForm}>
      <input
        className={styles.inputField}
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={styles.inputField}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.inputField}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.registerButton} onClick={handleSubmit}>
        Create Account
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

export default SignUpForm;
