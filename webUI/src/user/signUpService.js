import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import cognitoConfig from "./cognitoConfig";

const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.UserPoolId,
  ClientId: cognitoConfig.ClientId,
});

export const signUp = (email, password, preferredUsername) => {
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
      [attributeEmail, attributePreferredUsername],
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

export const confirmSignUp = (email, confirmationCode) => {
  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        console.error("Error confirming sign-up:", err.message);
        reject(err);
      } else {
        console.log("Sign-up confirmed:", result);
        resolve(result);
      }
    });
  });
};
