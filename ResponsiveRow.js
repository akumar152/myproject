import React from 'react';

const ResponsiveRow = ({ views, dropdownOptions }) => {
    return (
        <div style={styles.container}>
            {views.map((view, index) => (
                <div key={index} style={styles.buttonView}>
                    <div style={styles.name}>{view.name}</div>
                    <div style={styles.value}>{view.value}</div>
                </div>
            ))}
            <div style={styles.dropdownContainer}>
                <select style={styles.dropdown}>
                    {dropdownOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'nowrap', // Prevents wrapping to the next line
        justifyContent: 'space-between', // Adds space between items
        alignItems: 'center',
        padding: '10px',
        gap: '10px',
        width: '100%',
        boxSizing: 'border-box',
    },
    buttonView: {
        flex: '1 1 18%', // Adjust size to fit 4 views and 1 dropdown in the same row
        padding: '10px 15px',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '5px',
        textAlign: 'center',
        border: 'none',
        boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
        minWidth: '100px', // Minimum width for each view
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
        flex: '1 1 18%', // Same size as the buttonView to fit evenly in the row
        display: 'flex',
        justifyContent: 'center',
    },
    dropdown: {
        width: '100%',
        padding: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
    },
};

export default ResponsiveRow;
