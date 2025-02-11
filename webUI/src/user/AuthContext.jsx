import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";
import cognitoConfig from "./cognitoConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cognitoUserInstance, setCognitoUserInstance] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper to decode the JWT token (only payload, not signature verification)
  const getTokenExpiration = (jwt) => {
    try {
      const payload = JSON.parse(atob(jwt.split(".")[1]));
      return payload.exp * 1000; // convert to milliseconds
    } catch (e) {
      return null;
    }
  };

  // Schedules token refresh 1 minute before actual expiration
  const scheduleRefresh = useCallback((jwtToken) => {
    const exp = getTokenExpiration(jwtToken);
    if (exp) {
      const now = Date.now();
      const timeout = exp - now - 60000; // 1 minute before expiration
      if (timeout > 0) {
        setTimeout(() => {
          refreshSession();
        }, timeout);
      }
    }
  }, []);

  const login = (email, password) => {
    setAuthLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
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
          const accessToken = result.getAccessToken().getJwtToken();
          const idToken = result.getIdToken().getJwtToken();
          const refreshToken = result.getRefreshToken().getToken();

          setCurrentUser({ email, accessToken, idToken, refreshToken });
          setCognitoUserInstance(cognitoUser);
          scheduleRefresh(idToken);
          setAuthLoading(false);
          resolve(result);
        },
        onFailure: (err) => {
          setError(err.message);
          setAuthLoading(false);
          reject(err);
        },
      });
    });
  };

  const refreshSession = () => {
    if (cognitoUserInstance && currentUser.refreshToken) {
      cognitoUserInstance.refreshSession(
        { RefreshToken: currentUser.refreshToken },
        (err, session) => {
          if (err) {
            setError(err.message);
            logout(); // Log out in case of error during refresh
            return;
          }
          const newAccessToken = session.getAccessToken().getJwtToken();
          const newIdToken = session.getIdToken().getJwtToken();
          // Update current user tokens in memory
          setCurrentUser((prev) => ({
            ...prev,
            accessToken: newAccessToken,
            idToken: newIdToken,
          }));
          scheduleRefresh(newIdToken);
        }
      );
    }
  };

  const logout = () => {
    if (cognitoUserInstance) {
      // Optionally call cognitoUserInstance.signOut() here.
      setCognitoUserInstance(null);
    }
    setCurrentUser(null);
  };

  // Optional: On mount, you can check for an existing session stored in memory
  // and schedule token refresh if available.

  return (
    <AuthContext.Provider
      value={{ currentUser, authLoading, error, login, logout, refreshSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
