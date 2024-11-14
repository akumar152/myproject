import React, { useState, useEffect, useRef } from 'react';
import { STATUSES } from '../data';  // Assuming this contains status data

// Color Icon component to show color squares
const ColorIcon = ({ color }) => (
  <div
    style={{
      width: '12px',
      height: '12px',
      backgroundColor: color,
      borderRadius: '3px',
      display: 'inline-block',
      marginRight: '8px',
    }}
  />
);

const StatusCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;
  
  const [isOpen, setIsOpen] = useState(false);  // To toggle the dropdown
  const [selectedStatus, setSelectedStatus] = useState({ name, color });
  const menuRef = useRef(null);  // To detect clicks outside

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    updateData(row.index, column.id, status);  // Update the status in the table
    setIsOpen(false);  // Close the menu after selection
  };

  return (
    <div style={{ position: 'relative', width: '100%' }} ref={menuRef}>
      {/* Button that toggles the dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '8px',
          textAlign: 'left',
          backgroundColor: selectedStatus.color || 'transparent',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ColorIcon color={selectedStatus.color} />
          {selectedStatus.name}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            margin: '0',
            padding: '0',
            listStyleType: 'none',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            zIndex: '1000',
            width: '100%',
          }}
        >
          <li
            onClick={() => handleStatusChange({ name: 'None', color: 'transparent' })}
            style={{ padding: '8px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <ColorIcon color="transparent" />
            None
          </li>
          {STATUSES.map((status) => (
            <li
              key={status.id}
              onClick={() => handleStatusChange(status)}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: status.color === selectedStatus.color ? '#f0f0f0' : 'transparent',
              }}
            >
              <ColorIcon color={status.color} />
              {status.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusCell;
