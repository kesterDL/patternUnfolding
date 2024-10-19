import React, { useState } from "react";
import confirmSignUp from "../../user/confirmSignUp";

const ConfirmSignUp = () => {
  const [username, setUsername] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleConfirmSignUp = () => {
    confirmSignUp(username, confirmationCode);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Confirmation Code"
        onChange={(e) => setConfirmationCode(e.target.value)}
      />
      <button onClick={handleConfirmSignUp}>Confirm Sign Up</button>
    </div>
  );
};

export default ConfirmSignUp;
