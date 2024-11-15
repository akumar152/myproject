import React, { useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import DATA from '../data';

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
        maxWidth: "200px", // Optional to limit width of tooltip
        whiteSpace: "normal", // Allow content to wrap
        wordBreak: "break-word", // Break long words
        display: "flex",
        flexDirection: "column", // Stack content vertically
        maxHeight: "150px", // Optional, max height of the tooltip
        overflowY: "auto", // Make tooltip scrollable if content exceeds maxHeight
      }}
    >
      {content}
    </div>
  );
};

// Tooltip Content logic
const TooltipContent = ({ content, customContent, cellValue }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Split customContent into lines if you want each piece of content to be displayed on a new line
  const customContentLines = customContent.split(','); // Assuming customContent is a comma-separated string

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: "relative" }}
    >
      <p>{cellValue}</p>
      <Tooltip content={customContentLines.map((line, index) => <div key={index}>{line}</div>)} visible={isHovered} />
    </div>
  );
};

// Column definitions
const columns = [
  {
    accessorKey: "task",
    header: "Task",
    size: 225,
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => <p>{props.getValue()?.name}</p>,
  },
  {
    accessorKey: "due",
    header: "Due",
    cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: (props) => {
      // You can pass custom content to Tooltip here
      const { description, taskId } = props.row.original; // Assuming you have `description` and `taskId` in your data
      return (
        <TooltipContent
          content={props.getValue()}
          customContent={`Task ID: ${taskId}, Description: ${description}`} // Custom value for the tooltip
          cellValue={props.getValue()}
        />
      );
    },
  },
];

function TableComponent(props) {
  const [data, setData] = useState(DATA);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table" style={{ position: "relative" }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} style={{ width: header.getSize() }}>
                  {header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={{ width: cell.column.getSize(), position: "relative" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

TableComponent.propTypes = {};

export default TableComponent;
