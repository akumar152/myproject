import React from 'react';

const Legend = ({ data }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}> {/* Changed to column direction */}
            {Object.entries(data).map(([label, color], index) => (
                <div
                    key={index}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px', // Gap between the color view and the text
                    }}
                >
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: color,
                            borderRadius: '50%',
                            flexShrink: 0, // Prevents shrinking of the color view
                        }}
                    ></div>
                    <span>{label}</span>
                </div>
            ))}
        </div>
    );
};

export default Legend;
