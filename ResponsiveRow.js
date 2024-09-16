import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Chevron icons

// Map country names to their flag image URLs
const countryIcons = {
    Malaysia: 'https://flagcdn.com/w320/my.png',
    Singapore: 'https://flagcdn.com/w320/sg.png',
    HongKong: 'https://flagcdn.com/w320/hk.png',
    Indonesia: 'https://flagcdn.com/w320/id.png',
    Philippines: 'https://flagcdn.com/w320/ph.png',
    Thailand: 'https://flagcdn.com/w320/th.png',
};

const ResponsiveRow = ({ views, dropdownOptions }) => {
    const [selectedOption, setSelectedOption] = useState(dropdownOptions[0]); // Default to the first option
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false); // Close the dropdown when an option is selected
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
    };

    return (
        <div style={styles.container}>
            {views.map((view, index) => (
                <div key={index} style={styles.buttonView}>
                    <div style={styles.name}>{view.name}</div>
                    <div style={styles.value}>{view.value}</div>
                </div>
            ))}
            <div style={styles.dropdownContainer}>
                <div style={styles.customDropdown} onClick={toggleDropdown}>
                    <div style={styles.selectedOption}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src={countryIcons[selectedOption]}
                                alt={`${selectedOption} flag`}
                                style={styles.flagIcon}
                            /> {/* Display selected country's flag */}
                            <span style={{ marginLeft: '10px' }}>{selectedOption}</span>
                        </div>
                        <div>
                            {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />} {/* Chevron icon */}
                        </div>
                    </div>
                    {isDropdownOpen && (
                        <div style={styles.dropdownMenu}>
                            {dropdownOptions.map((option, index) => (
                                <div
                                    key={index}
                                    style={styles.dropdownItem}
                                    onClick={() => handleSelect(option)}
                                >
                                    <img
                                        src={countryIcons[option]}
                                        alt={`${option} flag`}
                                        style={styles.flagIcon}
                                    /> {/* Display country flag */}
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        gap: '10px',
        width: '100%',
        boxSizing: 'border-box',
    },
    buttonView: {
        flex: '1 1 18%',
        padding: '10px 15px',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '5px',
        textAlign: 'center',
        border: 'none',
        boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
        minWidth: '100px',
    },
    name: {
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '5px',
    },
    value: {
        fontSize: '16px',
        backgroundColor: '#ffffff20',
        padding: '5px',
        borderRadius: '3px',
    },
    dropdownContainer: {
        flex: '1 1 18%',
        display: 'flex',
        justifyContent: 'center',
    },
    customDropdown: {
        position: 'relative',
        width: '100%',
        cursor: 'pointer',
    },
    selectedOption: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
        backgroundColor: '#fff',
    },
    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
        zIndex: 1000,
    },
    dropdownItem: {
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#fff',
        transition: 'background-color 0.2s ease',
    },
    flagIcon: {
        width: '24px',
        height: '16px',
        marginRight: '10px',
    },
};

export default ResponsiveRow;
