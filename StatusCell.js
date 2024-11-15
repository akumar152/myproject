import React, { useState } from "react";
import { useTable } from "@tanstack/react-table";

// Tooltip Component
const Tooltip = ({ content, visible }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "8px",
        backgroundColor: "#333",
        color: "#fff",
        borderRadius: "4px",
        fontSize: "12px",
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
        transition: "opacity 0.2s ease",
        zIndex: 1000,
        whiteSpace: "nowrap",
      }}
    >
      {content}
    </div>
  );
};

// Tooltip Content logic
const TooltipContent = ({ content, customContent, cellValue }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: "relative" }}
    >
      <p>{cellValue}</p>
      <Tooltip content={customContent} visible={isHovered} />
    </div>
  );
};

// Table Component
const TableComponent = ({ columns, data }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.accessorKey}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
                backgroundColor: "#f9f9f9",
              }}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => {
              const cellValue = row[column.accessorKey];
              return (
                <td
                  key={column.accessorKey}
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    position: "relative",
                  }}
                >
                  {/* Passing custom content to the Tooltip */}
                  <TooltipContent
                    content={cellValue}
                    customContent={row[column.customContentKey]} // Custom content from row data
                    cellValue={cellValue}
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Example usage of the TableComponent
const App = () => {
  const columns = [
    {
      accessorKey: "task",
      header: "Task",
      size: 225,
      cell: (props) => <TooltipContent content={props.getValue()} cellValue={props.getValue()} />,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (props) => <TooltipContent content={props.getValue()?.name} cellValue={props.getValue()?.name} />,
    },
    {
      accessorKey: "due",
      header: "Due",
      cell: (props) => <TooltipContent content={props.getValue()?.toLocaleTimeString()} cellValue={props.getValue()?.toLocaleTimeString()} />,
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: (props) => <TooltipContent content={props.getValue()} cellValue={props.getValue()} />,
    },
  ];

  // Add custom content to the rows (additional data, like 'description' or 'taskId')
  const data = [
    { 
      task: "Task 1", 
      status: { name: "In Progress" }, 
      due: new Date(), 
      notes: "Note for task 1",
      taskId: 1, // Custom value to show in tooltip
      description: "This is a detailed description for Task 1",
    },
    { 
      task: "Task 2", 
      status: { name: "Completed" }, 
      due: new Date(), 
      notes: "Note for task 2",
      taskId: 2, 
      description: "This is a detailed description for Task 2",
    },
    { 
      task: "Task 3", 
      status: { name: "Pending" }, 
      due: new Date(), 
      notes: "Note for task 3",
      taskId: 3, 
      description: "This is a detailed description for Task 3",
    },
  ];

  return (
    <div>
      <h1>Interactive Table with Custom Tooltips</h1>
      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default App;
