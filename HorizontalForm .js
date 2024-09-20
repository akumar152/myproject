import React, { useState } from 'react';
import Dropdown from './Dropdown'; // Import the Dropdown component
import LabeledInput from './LabeledInput'; // Import the LabeledInput component

const AddUserComponent = () => {
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');

    const handleRoleChange = (e) => setRole(e.target.value);
    const handleDepartmentChange = (e) => setDepartment(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleAddUser = () => {
        console.log('Adding User:', { role, department, email });
        // Add logic to handle adding the user here
    };

    return (
        <div style={styles.container}>
            <div style={styles.formGroup}>
                {/* Role Dropdown */}
                <Dropdown
                    label="Role"
                    options={[
                        { value: 'admin', label: 'Admin' },
                        { value: 'user', label: 'User' },
                        { value: 'guest', label: 'Guest' },
                    ]}
                    value={role}
                    onChange={handleRoleChange}
                    required
                />

                {/* Department Dropdown */}
                <Dropdown
                    label="Department"
                    options={[
                        { value: 'hr', label: 'HR' },
                        { value: 'engineering', label: 'Engineering' },
                        { value: 'marketing', label: 'Marketing' },
                    ]}
                    value={department}
                    onChange={handleDepartmentChange}
                    required
                />

                {/* Email Input */}
                <LabeledInput
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    type="email"
                />
            </div>

            {/* Add User Button at the end */}
            <button onClick={handleAddUser} style={styles.button}>
                Add User
            </button>
        </div>
    );
};

// Inline styles for the component
const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Space between formGroup and button
        padding: '10px',
        gap: '10px', // Space between elements in container
    },
    formGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px', // Space between dropdowns and input
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        whiteSpace: 'nowrap', // Prevent text from wrapping
        marginLeft: 'auto', // Push the button to the right
    },
};

export default AddUserComponent;
