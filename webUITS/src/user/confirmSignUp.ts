import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import cognitoConfig from "./cognitoConfig";

const confirmSignUp = (username:string , confirmationCode:string) => {
  const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.UserPoolId,
    ClientId: cognitoConfig.ClientId,
  });

  //TODO: wtf is going on with Prefered here?
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
    //@ts-ignore
    Prefered,
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
