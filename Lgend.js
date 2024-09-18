import React from 'react';


const Legend = ({ data }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.entries(data).map(([label, color], index) => (
                <div
                    key={index}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <span>{label}</span>
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: color,
                            borderRadius: '50%',
                        }}
                    ></div>
                    
                </div>
            ))}
        </div>
    );
};

export default Legend;
