import React, { useState } from 'react';
import { FormSectionContainer, FormGroup, Button } from './styles';

function FormSection({ type }) {
  const [textInput, setTextInput] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');

  const handleInputChange = (e) => setTextInput(e.target.value);
  const handleDropdownChange = (e) => setDropdownValue(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted with input: ${textInput} and dropdown: ${dropdownValue}`);
  };

  return (
    <FormSectionContainer>
      <h3>{type === 'component1' ? 'Form for Component 1' : type === 'component2' ? 'Form for Component 2' : 'Form for Component 3'}</h3>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Text Input:</label>
          <input
            type="text"
            value={textInput}
            onChange={handleInputChange}
            placeholder="Enter some text"
          />
        </FormGroup>
        <FormGroup>
          <label>Dropdown:</label>
          <select value={dropdownValue} onChange={handleDropdownChange}>
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </form>
    </FormSectionContainer>
  );
}

export default FormSection;
