import React from 'react';
import { FiChevronDown } from 'react-icons/fi'; // Importing the Chevron Down icon

const Dropdown = ({ label, options, value, onChange, required = false }) => {
  return (
    <div style={styles.container}>
      <label style={styles.label}>
        {label} {required && <span style={styles.required}>*</span>}
      </label>
      <div style={styles.dropdownWrapper}>
        <select value={value} onChange={onChange} style={styles.select}>
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Chevron Icon from react-icons */}
        <FiChevronDown style={styles.chevron} />
      </div>
    </div>
  );
};

// Styles for the Dropdown component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  required: {
    color: 'red',
  },
  dropdownWrapper: {
    position: 'relative',
    display: 'inline-block',
    width: '160px',
  },
  select: {
    padding: '8px',
    fontSize: '16px',
    width: '100%',
    appearance: 'none', // Hide default arrow
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  chevron: {
    position: 'absolute',
    right: '10px', // Margin to the right of the chevron
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none', // Chevron doesn't block select clicks
    fontSize: '18px', // Size of the chevron icon
    color: '#000', // Color of the chevron icon
  },
};

export default Dropdown;
