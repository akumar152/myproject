import React, { useState } from "react";
import Select from "react-select"; // Import React Select

const StatusCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;

  const [selectedStatus, setSelectedStatus] = useState({ name, color });

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
    updateData(row.index, column.id, selectedOption);
  };

  const statusOptions = STATUSES.map((status) => ({
    value: status.id,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <ColorIcon color={status.color} />
        {status.name}
      </div>
    ),
    color: status.color,
  }));

  return (
    <div style={{ width: "100%" }}>
      <Select
        value={{
          value: selectedStatus.id,
          label: (
            <div style={{ display: "flex", alignItems: "center" }}>
              <ColorIcon color={selectedStatus.color} />
              {selectedStatus.name}
            </div>
          ),
        }}
        options={statusOptions}
        onChange={handleStatusChange}
        getOptionLabel={(e) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <ColorIcon color={e.color} />
            {e.label}
          </div>
        )}
        isClearable={true}
        placeholder="Select Status"
      />
    </div>
  );
};

export default StatusCell;
