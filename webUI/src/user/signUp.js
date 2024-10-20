import { CognitoUserPool } from "amazon-cognito-identity-js";
import cognitoConfig from "./cognitoConfig";

const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.UserPoolId,
  ClientId: cognitoConfig.ClientId,
});

const signUp = (email, password, preferredUsername) => {
  const attributeEmail = {
    Name: "email",
    Value: email,
  };

  const attributePreferredUsername = {
    Name: "preferred_username",
    Value: preferredUsername,
  };

  return new Promise((resolve, reject) => {
    userPool.signUp(
      email,
      password,
      [attributeEmail, attributePreferredUsername], // Add preferred_username to attributes
      null,
      (err, result) => {
        if (err) {
          console.error("Error signing up:", err.message);
          reject(err);
        } else {
          console.log("Confirmation needed", result);
          resolve(result);
        }
      }
    );
  });
};

export default signUp;
