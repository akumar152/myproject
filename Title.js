import React, { useState } from 'react';
import Select from 'react-select';

const DropdownComponent = ({ options, placeholder, onValueChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Convert string options to { value, label } format
  const formattedOptions = options.map((option) => ({
    value: option,
    label: option,
  }));

  // Handle option selection
  const handleChange = (selected) => {
    setSelectedOption(selected);
    if (onValueChange) {
      onValueChange(selected ? selected.value : null); // Pass the string value
    }
  };

  // Styles for React-Select
  const customStyles = {
    control: (base) => ({
      ...base,
      border: '1px solid #ced4da',
      borderRadius: '4px',
      padding: '5px',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #80bdff',
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 1050, // Ensure it appears above other elements
    }),
  };

  return (
    <div className="dropdown-container" style={{ maxWidth: '300px', margin: '10px auto' }}>
      <label htmlFor="custom-dropdown" className="form-label">
        Select an Option:
      </label>
      <Select
        id="custom-dropdown"
        options={formattedOptions}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder}
        styles={customStyles}
        isClearable
        isSearchable
      />
    </div>
  );
};

export default DropdownComponent;
