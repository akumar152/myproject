import React, { useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import DATA from '../data';
import { ReactTooltip } from 'react-tooltip'; // Corrected import
import { FaPen } from 'react-icons/fa'; // Import pencil icon from react-icons

// Tooltip Content logic
const TooltipContent = ({ content, customContent, cellValue }) => {
  const customContentLines = customContent.split(','); // Assuming customContent is a comma-separated string

  return (
    <div
      data-tip
      data-for="tooltip"
      style={{ position: "relative" }}
    >
      <p>{cellValue}</p>
      {/* Tooltip will be triggered when hovering over this p element */}
      <ReactTooltip
        id="tooltip"
        place="top"
        effect="solid"
        multiline={true}
        backgroundColor="#333"
        textColor="#fff"
        className="custom-tooltip"
        delayHide={500}
        delayShow={300}
      >
        {customContentLines.map((line, index) => (
          <div key={index}>{line}</div> // Render each line in the tooltip
        ))}
      </ReactTooltip>
    </div>
  );
};

// Edit Icon Component (Using react-icons)
const EditIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#007bff',
      fontSize: '20px',
    }}
  >
    <FaPen /> {/* Pencil icon from react-icons */}
  </button>
);

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
  {
    accessorKey: "edit",
    header: "Edit",
    cell: (props) => {
      const handleEdit = () => {
        const rowData = props.row.original;
        // Trigger your edit logic here, for example, open an edit modal
        alert(`Edit row with task: ${rowData.task}`);
      };
      return <EditIcon onClick={handleEdit} />;
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
