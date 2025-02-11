import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../user/AuthContext";
import styles from "./SignIn.module.css";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, authLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // Redirect to home or another protected route
    } catch (err) {
      // Error is available in AuthContext state
    }
  };

  return (
    <div className={styles.signInContainer}>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn} className={styles.signInForm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          className={styles.inputField}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className={styles.inputField}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className={styles.signInButton}
          disabled={authLoading}
        >
          {authLoading ? "Signing In..." : "Sign In"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default SignInPage;
