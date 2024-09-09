import React, { useState } from "react";

const CreatePersonalConnections: React.FC = () => {
  const [personName, setPersonName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Person Name:", personName);
    // Handle the form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="personName">Person Name:</label>
        <input
          type="text"
          id="personName"
          name="personName"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreatePersonalConnections;
