import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";
import cognitoConfig from "../../user/cognitoConfig";
import styles from "./SignIn.module.css";
import signInImage from "../../images/peter-robbins-zfKCB92H2ZI-unsplash_small.webp";
import {
  signInRequest,
  signInSuccess,
  signInFailure,
} from "../../redux/actions/authActions";

const SignIn = ({ onSignInSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSignIn = () => {
    dispatch(signInRequest());

    const userPool = new CognitoUserPool({
      UserPoolId: cognitoConfig.UserPoolId,
      ClientId: cognitoConfig.ClientId,
    });

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        dispatch(signInSuccess(result));
        onSignInSuccess(email); // Pass the email as the username
      },
      onFailure: (err) => {
        dispatch(signInFailure(err.message));
      },
    });
  };

  return (
    <div className={styles.signInContainer}>
      <div className={styles.signInImage}>
        <img src={signInImage} alt="Sign In" />
      </div>
      <div className={styles.signInForm}>
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
        <button
          className={styles.signInButton}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
