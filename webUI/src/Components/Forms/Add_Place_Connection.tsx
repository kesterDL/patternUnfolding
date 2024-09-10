import React, { useState } from 'react';

const AddPlaceConnection: React.FC = () => {
  const [placeName, setPlaceName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Place Name:', placeName);
    // Handle the form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="placeName">Place Name:</label>
        <input
          type="text"
          id="placeName"
          name="placeName"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPlaceConnection;
