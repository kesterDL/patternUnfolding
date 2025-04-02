import React, { useState } from "react";
import { signUp, confirmSignUp } from "../../user/signUpService";
import styles from "./SignUpPage.module.css";
import Header from "../Header/Header";
import SignUpForm from "./SignUpForm";
import ConfirmSignUpForm from "./ConfirmSignUpForm";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSignUp = (email, password, username) => {
    signUp(email, password, username)
      .then(() => {
        setEmail(email);
        setIsRegistered(true);
      })
      .catch((err) => {
        setErrors([err.message]);
      });
  };

  const handleConfirmSignUp = (confirmationCode) => {
    confirmSignUp(email, confirmationCode)
      .then(() => {
        setIsConfirmed(true);
      })
      .catch((err) => {
        setErrors([err.message]);
      });
  };

  return (
    <>
      <Header />
      <div className={styles.signUpPage}>
        {isConfirmed ? (
          <div className={styles.successfulRegistration}>
            <h3>Registration Confirmed!</h3>
            <p>You can now sign in with your credentials.</p>
          </div>
        ) : isRegistered ? (
          <ConfirmSignUpForm onConfirm={handleConfirmSignUp} />
        ) : (
          <SignUpForm onSignUp={handleSignUp} />
        )}
        {errors.length > 0 && (
          <ul styles={{ color: "red" }}>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SignUpPage;
