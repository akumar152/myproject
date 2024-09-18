import React, { useState } from 'react';

type DropdownProps = {
    options: string[];
};

const DropdownWithPlusIcon: React.FC<DropdownProps> = ({ options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
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
                    fontSize: '28px'
                }}
            >
                +
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
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => handleOptionSelect(option)}
                            style={{
                                padding: '8px',
                                backgroundColor: option === selectedOption ? '#007bff' : '#fff',
                                color: option === selectedOption ? '#fff' : '#000',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                whiteSpace: 'nowrap', // Prevents text from wrapping
                            }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownWithPlusIcon;
