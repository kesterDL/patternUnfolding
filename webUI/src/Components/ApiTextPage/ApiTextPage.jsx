import React, { useState } from "react";
import { useAuth } from "../../user/AuthContext";

function ApiTextPage() {
  const [text, setText] = useState("Default text");
  const { currentUser } = useAuth();
  const jwt = currentUser.idToken;

  const handleClick = async () => {
    if (!jwt) {
      setText("User is not authenticated. Please sign in.");
      return;
    }
    try {
      const response = await fetch(
        "https://ueatce1tt1.execute-api.us-east-1.amazonaws.com/v1/simpleText",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.text();
      setText(data);
    } catch (error) {
      setText(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{text}</h1>
      <button onClick={handleClick}>Load API Text</button>
    </div>
  );
}

export default ApiTextPage;
