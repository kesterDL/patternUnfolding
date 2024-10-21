import React, { useState } from "react";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";
import cognitoConfig from "../../user/cognitoConfig";
import styles from "./SignIn.module.css";
import signInImage from "../../images/peter-robbins-zfKCB92H2ZI-unsplash_small.jpg";

const SignIn = ({ onSignInSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = () => {
    const userPool = new CognitoUserPool({
      UserPoolId: cognitoConfig.UserPoolId,
      ClientId: cognitoConfig.ClientId,
    });

    const userData = {
      Username: email, // Use the email or username for signing in
      Pool: userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email, // Use the email here
      Password: password,
    });

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log("Access Token:", result.getAccessToken().getJwtToken());

        // Fetch user attributes to get preferred_username
        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            setError("Error fetching user attributes");
            console.error(err);
            return;
          }

          // Find preferred_username (or fallback to email if not available)
          const usernameAttr = attributes.find(
            (attr) => attr.Name === "preferred_username"
          );
          const username = usernameAttr ? usernameAttr.Value : email;

          // Call the callback with the username
          onSignInSuccess(username);
        });
      },
      onFailure: (err) => {
        setError("Sign-in failed: " + err.message);
      },
    });
  };

  return (
    <div className={styles.signInForm}>
      <div className={styles.signInImage}>
        <img src={signInImage} alt={`Photo by Peter Robbins on Unsplash`} />
        <div className={styles.signInOverlayText}>Sign In</div>
      </div>
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
      <button className={styles.signInButton} onClick={handleSignIn}>
        Sign In
      </button>

      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default SignIn;
