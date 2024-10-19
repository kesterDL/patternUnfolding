import { CognitoUserPool } from "amazon-cognito-identity-js";
import cognitoConfig from "./cognitoConfig";

const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.UserPoolId,
  ClientId: cognitoConfig.ClientId,
});

const signUp = (email, password) => {
  const attributeEmail = {
    Name: "email",
    Value: email,
  };

  // Return a Promise to handle the asynchronous sign-up process
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, [attributeEmail], null, (err, result) => {
      if (err) {
        reject(err); // Reject the Promise with the error
      } else {
        resolve(result); // Resolve the Promise with the result
      }
    });
  });
};

export default signUp;
