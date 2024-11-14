import React, { useState, useEffect, useRef } from "react";

const ColorIcon = ({ color }) => (
  <div
    style={{
      width: "12px",
      height: "12px",
      backgroundColor: color,
      borderRadius: "50%",
      display: "inline-block",
      marginRight: "8px",
      transition: "background-color 0.2s ease",
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
          borderRadius: "8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          boxSizing: "border-box",
          transition: "background-color 0.2s, border-color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#f5f5f5";
          e.target.style.borderColor = "#888";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = selectedStatus.color || "transparent";
          e.target.style.borderColor = "#ccc";
        }}
      >
        <ColorIcon color={selectedStatus.color} />
        <span style={{ flex: 1 }}>{selectedStatus.name || "Select Status"}</span>
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
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(-10px)",
          }}
        >
          {/* Option to reset status */}
          <div
            onClick={() => handleStatusChange({ name: "None", color: "transparent" })}
            style={{
              padding: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              borderRadius: "6px",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
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
                padding: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
                borderRadius: "6px",
                backgroundColor:
                  status.color === selectedStatus.color ? "#e6f7ff" : "transparent",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
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
