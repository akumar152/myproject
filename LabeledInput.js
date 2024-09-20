import React from 'react';

const LabeledInput = ({ label, value, onChange, required = false, type = 'text' }) => {
    return (
        <div style={styles.container}>
            <label style={styles.label}>
                {label} {required && <span style={styles.required}>*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={`Enter ${label.toLowerCase()}`}
                style={styles.input}
            />
        </div>
    );
};

// Styles for the LabeledInput component
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
    input: {
        padding: '8px',
        fontSize: '16px',
        width: '250px', // Fixed width for input
    },
};

export default LabeledInput;
