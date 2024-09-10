import React, { useState } from 'react';

const ThingForm: React.FC = () => {
  const [thingName, setThingName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Thing Name:', thingName);
    // Handle the form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="thingName">Thing Name:</label>
        <input
          type="text"
          id="thingName"
          name="thingName"
          value={thingName}
          onChange={(e) => setThingName(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ThingForm;
