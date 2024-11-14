import { useState } from "react";
import { STATUSES } from "../data";

// A simple ColorIcon component that renders a square with a given color
export const ColorIcon = ({ color, ...props }) => (
  <div
    style={{
      width: '12px',
      height: '12px',
      backgroundColor: color,
      borderRadius: '3px',
      display: 'inline-block',
      marginRight: '8px',
      ...props.style,
    }}
  />
);

const StatusCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track if the menu is open

  return (
    <div
      style={{
        position: 'relative', 
        display: 'inline-block',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle the menu visibility
        style={{
          width: '100%',
          height: '100%',
          padding: '8px',
          textAlign: 'left',
          backgroundColor: color || 'transparent',
          color: 'gray',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {name}
      </button>

      {/* Menu List */}
      {isMenuOpen && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            margin: '0',
            padding: '0',
            listStyleType: 'none',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            zIndex: '1000',
          }}
        >
          <li
            onClick={() => {
              updateData(row.index, column.id, null);
              setIsMenuOpen(false); // Close the menu after selection
            }}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ColorIcon color="red" />
            None
          </li>
          {STATUSES.map((status) => (
            <li
              key={status.id}
              onClick={() => {
                updateData(row.index, column.id, status);
                setIsMenuOpen(false); // Close the menu after selection
              }}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
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
