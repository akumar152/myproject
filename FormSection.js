import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css';  // Optional theme
import 'primereact/resources/primereact.min.css';         // PrimeReact styles
import 'primeicons/primeicons.css';                      // PrimeIcons

const PercentageInput = () => {
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace('%', ''); // Remove `%` for validation
    const numericValue = parseInt(inputValue, 10);

    // Allow only valid numbers within range or empty input
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 100) {
      setValue(`${numericValue}%`);
    } else if (inputValue === '') {
      setValue(''); // Allow clearing the input
    }
  };

  const handleKeyDown = (e) => {
    // Allow only numeric keys, backspace, delete, arrow keys, and tab
    const allowedKeys = [
      'Backspace',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
    ];
    if (
      !/^\d$/.test(e.key) && // Allow digits (0-9)
      !allowedKeys.includes(e.key) // Allow functional keys
    ) {
      e.preventDefault();
    }
  };

  return (
    <div style={{ width: '200px', margin: '0 auto' }}>
      <InputText
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter percentage"
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default PercentageInput;
