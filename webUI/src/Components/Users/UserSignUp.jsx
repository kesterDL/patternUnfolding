import React, { useState } from "react";
import signUp from "../../user/signUp";

const UserSignUp = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
    signUp(email, password)
      .then(() => {
        // If sign-up is successful, update state to show success message
        setIsRegistered(true);
      })
      .catch((err) => {
        // If there's an error, show it in the errors array
        setErrors([err.message]);
      });
  };

  return (
    <div>
      {/* If the user is registered, display a success message */}
      {isRegistered ? (
        <div style={{ color: "green" }}>
          <h3>Registration Successful!</h3>
          <p>
            Please check your email to confirm your account before logging in.
          </p>
        </div>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>

          {/* Display all error messages */}
          {errors.length > 0 && (
            <ul style={{ color: "red" }}>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default UserSignUp;
