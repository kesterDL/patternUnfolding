import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import cognitoConfig from "./cognitoConfig";

const signIn = (username, password) => {
  const authenticationData = {
    Username: username,
    Password: password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.UserPoolId,
    ClientId: cognitoConfig.ClientId,
  });

  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log("Access token:", result.getAccessToken().getJwtToken());
      console.log("ID token:", result.getIdToken().getJwtToken());
      console.log("Refresh token:", result.getRefreshToken().getToken());
    },
    onFailure: (err) => {
      console.error("Error signing in:", err.message);
    },
  });
};

export default signIn;
