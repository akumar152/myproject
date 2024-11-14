import React, { useState, useEffect, useRef } from "react";

const ColorIcon = ({ color }) => (
  <div
    style={{
      width: "12px",
      height: "12px",
      backgroundColor: color,
      borderRadius: "3px",
      display: "inline-block",
      marginRight: "8px",
    }}
  />
);

const StatusCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({ name, color });
  const menuRef = useRef(null); // To detect clicks outside the menu

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    updateData(row.index, column.id, status); // Update the status
    setIsOpen(false); // Close the menu after selection
  };

  return (
    <div style={{ position: "relative", width: "100%" }} ref={menuRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "8px",
          textAlign: "left",
          backgroundColor: selectedStatus.color || "transparent",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ColorIcon color={selectedStatus.color} />
        {selectedStatus.name || "Select Status"}
      </button>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            padding: "10px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            width: "100%",
            transition: "opacity 0.3s ease",
            opacity: isOpen ? 1 : 0, // Fade in/fade out animation
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {/* Option to reset status */}
          <div
            onClick={() => handleStatusChange({ name: "None", color: "transparent" })}
            style={{
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              backgroundColor: "transparent",
            }}
          >
            <ColorIcon color="transparent" />
            None
          </div>

          {/* List of status options */}
          {STATUSES.map((status) => (
            <div
              key={status.id}
              onClick={() => handleStatusChange(status)}
              style={{
                padding: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                backgroundColor: status.color === selectedStatus.color ? "#f0f0f0" : "transparent",
                borderBottom: "1px solid #ccc",
              }}
            >
              <ColorIcon color={status.color} />
              {status.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusCell;
