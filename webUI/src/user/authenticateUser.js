import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import cognitoConfig from "./cognitoConfig";

const signIn = (username, password) => {
  return new Promise((resolve, reject) => {
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
        // Get session tokens
        const accessToken = result.getAccessToken().getJwtToken();
        const idToken = result.getIdToken().getJwtToken();

        console.log("Access token:", accessToken);
        console.log("ID token:", idToken);

        // Store sign-in status and username in localStorage
        localStorage.setItem("isSignedIn", true);
        localStorage.setItem("username", username);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("idToken", idToken);

        resolve(result);
      },
      onFailure: (err) => {
        console.error("Error signing in:", err.message);
        reject(err);
      },
    });
  });
};

export default signIn;
