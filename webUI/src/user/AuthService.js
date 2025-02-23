import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import cognitoConfig from "./cognitoConfig";

class AuthService {
  constructor(storageService = localStorage) {
    this.storageService = storageService;
    this.userPool = new CognitoUserPool({
      UserPoolId: cognitoConfig.UserPoolId,
      ClientId: cognitoConfig.ClientId,
    });
  }

  signIn(username, password) {
    return new Promise((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: this.userPool,
      });
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const idToken = result.getIdToken().getJwtToken();
          const accessToken = result.getAccessToken().getJwtToken();
          const refreshToken = result.getRefreshToken().getToken();
          // Extract preferred username from the token payload if available
          const payload = result.getIdToken().decodePayload();
          const preferredUsername = payload.preferred_username || username;

          // Persist tokens and username using the injected storage service
          this.storageService.setItem("idToken", idToken);
          this.storageService.setItem("accessToken", accessToken);
          this.storageService.setItem("refreshToken", refreshToken);
          this.storageService.setItem("username", preferredUsername);

          resolve({
            idToken,
            accessToken,
            refreshToken,
            username: preferredUsername,
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  signOut() {
    // Clear persisted session data
    this.storageService.removeItem("idToken");
    this.storageService.removeItem("accessToken");
    this.storageService.removeItem("refreshToken");
    this.storageService.removeItem("username");
  }
}

export default AuthService;
