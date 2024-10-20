import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import cognitoConfig from "./cognitoConfig";

const confirmSignUp = (username, confirmationCode) => {
  const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.UserPoolId,
    ClientId: cognitoConfig.ClientId,
  });

  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
    if (err) {
      console.error("Error confirming sign-up:", err.message);
      return;
    }
    console.log("Sign-up confirmed:", result);
  });
};

export default confirmSignUp;
