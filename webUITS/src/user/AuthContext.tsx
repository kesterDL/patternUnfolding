import React, { createContext, useState, useContext, useEffect } from "react";
import AuthService from "./AuthService";
import { Children } from "../react-app-env";

const AuthContext = createContext({});

type CurrentUser = { idToken: string; accessToken: string } | null;

export const AuthProvider = ({ children }: { children: Children }) => {
  const [currentUser, setCurrentUser]: [CurrentUser, Function] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

  const authService = new AuthService();

  // Check for a persisted session on mount
  useEffect(() => {
    const storedIdToken = localStorage.getItem("idToken");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedUsername = localStorage.getItem("username");

    if (
      storedIdToken &&
      storedAccessToken &&
      storedRefreshToken &&
      storedUsername
    ) {
      setCurrentUser({
        idToken: storedIdToken,
        accessToken: storedAccessToken,
        refreshToken: storedRefreshToken,
        username: storedUsername,
      });
    }
  }, []);

  const login = async (username: string, password: string) => {
    setAuthLoading(true);
    setError(null);
    try {
      const userData = await authService.signIn(username, password);
      setCurrentUser({
        idToken: userData.idToken,
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
        username: userData.username,
      });
      setAuthLoading(false);
    } catch (err: unknown) {
      //@ts-ignore
      setError(err.message);
      setAuthLoading(false);
      throw err;
    }
  };

  const logout = () => {
    authService.signOut();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, authLoading, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
