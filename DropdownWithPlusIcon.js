import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa'; // Import the settings icon from react-icons

const DropdownWithSettingsIcon = ({ options, setCurrentOption, currentOption }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option) => {
        setCurrentOption(option); // Set the selected option in the parent component
        setIsOpen(false);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
                onClick={handleToggleDropdown}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    marginTop: 10,
                    width: 40,
                    height: 40, // Adjust height for better alignment
                    fontSize: '20px' // Adjust font size for icon
                }}
            >
                <FaCog />
            </button>

            {isOpen && (
                <ul
                    style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        listStyle: 'none',
                        padding: '5px',
                        marginTop: '5px',
                        zIndex: 1,
                        width: '150px', // Set width to control layout
                    }}
                >
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionSelect(option)}
                            style={{
                                padding: '8px',
                                backgroundColor: option === currentOption ? '#007bff' : '#fff',
                                color: option === currentOption ? '#fff' : '#000',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                whiteSpace: 'nowrap', // Prevents text from wrapping
                            }}
                        >
                            {`Option ${index + 1}`} {/* Display option name */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownWithSettingsIcon;
