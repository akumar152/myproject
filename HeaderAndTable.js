import React, { useState } from 'react';
import { useTable } from 'react-table';

const MyTable = () => {
  const data = React.useMemo(
    () => [
      { name: "John Doe", description: "This is a very long description that should be truncated with ellipsis." },
      { name: "Jane Smith", description: "Another description that goes on and on and should be trimmed." },
      { name: "Bob Brown", description: "Short description." },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
        Cell: ({ value }) => {
          // Return the cell with custom tooltip logic
          return (
            <div
              style={{
                maxWidth: '200px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'center',  // Center align text
                cursor: 'pointer',    // Show pointer on hover
              }}
              onMouseEnter={(e) => {
                const tooltip = document.createElement('div');
                tooltip.id = 'custom-tooltip';
                tooltip.style.position = 'absolute';
                tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Dark background
                tooltip.style.color = 'white'; // White text
                tooltip.style.padding = '5px 10px';
                tooltip.style.borderRadius = '5px';
                tooltip.style.whiteSpace = 'normal'; // Allow text to wrap
                tooltip.style.maxWidth = '300px'; // Maximum width of the tooltip
                tooltip.style.zIndex = '9999';
                tooltip.innerText = value;

                document.body.appendChild(tooltip);

                // Position the tooltip above the element
                const rect = e.target.getBoundingClientRect();
                tooltip.style.top = `${rect.top - tooltip.offsetHeight}px`;
                tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
              }}
              onMouseLeave={() => {
                const tooltip = document.getElementById('custom-tooltip');
                if (tooltip) tooltip.remove(); // Remove tooltip on mouse leave
              }}
            >
              {value}
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div>
      <table {...getTableProps()} style={{ width: '100%' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyTable;
