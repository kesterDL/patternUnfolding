import React, { useState } from 'react';
import PersonForm from './CreatePersonalConnections';
import PlaceForm from './Add_Thing_To_Person';
import ThingForm from './Add_Thing_To_Person';

const FormSelector: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState('person');

  const renderForm = () => {
    switch (selectedForm) {
      case 'person':
        return <PersonForm />;
      case 'place':
        return <PlaceForm />;
      case 'thing':
        return <ThingForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      <label htmlFor="formSelect">Select a form:</label>
      <select
        id="formSelect"
        value={selectedForm}
        onChange={(e) => setSelectedForm(e.target.value)}
      >
        <option value="person">Person</option>
        <option value="place">Place</option>
        <option value="thing">Thing</option>
      </select>
      {renderForm()}
    </div>
  );
};

export default FormSelector;
