import React from 'react';

const Dropdown = ({ label, options, value, onChange, required = false }) => {
    return (
        <div style={styles.container}>
            <label style={styles.label}>
                {label} {required && <span style={styles.required}>*</span>}
            </label>
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
        </div>
    );
};

// Styles for the Dropdown component
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    required: {
        color: 'red',
    },
    select: {
        padding: '8px',
        fontSize: '16px',
        width: '150px', // Fixed width for dropdowns
    },
};

export default Dropdown;
