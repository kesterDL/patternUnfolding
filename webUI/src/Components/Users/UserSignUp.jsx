import React, { useState } from "react";
import styles from "./UserSignUp.module.css";
import signUp from "../../user/signUp";
import register from "../../images/jan-kahanek-fVUl6kzIvLg-unsplash_small.jpg";
import skyline from "../../images/mountain_skyline.svg";

const UserSignUp = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false); // Track registration status

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

  const handleSignUp = () => {
    const validationErrors = validatePassword(password);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    // Call AWS Cognito sign-up function
    signUp(email, password, username) // Pass the username (preferred_username)
      .then(() => {
        setIsRegistered(true);
      })
      .catch((err) => {
        setErrors([err.message]);
      });
  };

  return (
    <div>
      {/* If the user is registered, display a success message */}
      {isRegistered ? (
        <div className={styles.successfulRegistration}>
          <h3>Registration Successful!</h3>
          <p>
            Please check your email to confirm your account before logging in.
          </p>
        </div>
      ) : (
        <div className={styles.registrationForm}>
          <div className={styles.registerationImage}>
            <img src={register} alt={`Photo named tabel day`} />
          </div>
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
          <button className={styles.registerButton} onClick={handleSignUp}>
            Create Account
          </button>

          {/* Display all error messages */}
          {errors.length > 0 && (
            <ul styles={{ color: "red" }}>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSignUp;
