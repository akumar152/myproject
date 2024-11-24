import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'react-bootstrap'; // Import Card from react-bootstrap

// Sample data with long text
const data = [
  { id: 1, name: "A very long name that needs to be truncated", description: "This is a description with some long text that needs to be truncated." },
  { id: 2, name: "Short Name", description: "Another description" },
  { id: 3, name: "Another very long name example", description: "This is a description with a lot of details and information that will be truncated." }
];

const TableComponent = () => {
  const [tooltip, setTooltip] = useState(null); // To manage tooltip visibility and content
  const columns = [
    { field: "name", header: "Name" },
    { field: "description", header: "Description" }
  ];

  // Function to handle tooltip visibility on hover
  const handleMouseEnter = (e, value) => {
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
  };

  // Function to remove tooltip on mouse leave
  const handleMouseLeave = () => {
    const tooltip = document.getElementById('custom-tooltip');
    if (tooltip) tooltip.remove(); // Remove tooltip on mouse leave
  };

  return (
    <div>
      {/* Card with a title and custom background color */}
      <Card style={{ height: '250px', width: '800px', borderRadius: '10px', marginTop: '20px' }}>
        <Card.Header style={{ backgroundColor: '#007bff', color: 'white', padding: '15px', fontSize: '1.25rem' }}>
          <h4>DataTable with Custom Tooltip on Hover</h4>
        </Card.Header>
        <Card.Body>
          {/* DataTable with custom styling */}
          <div style={{ marginTop: '20px', overflow: 'auto', height: 'calc(100% - 60px)' }}>
            <DataTable value={data} responsive>
              {columns.map((col, index) => (
                <Column
                  key={index}
                  field={col.field}
                  header={col.header}
                  body={(rowData) => (
                    <div
                      style={{
                        maxWidth: '200px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'center',  // Center align text
                        cursor: 'pointer',    // Show pointer on hover
                      }}
                      onMouseEnter={(e) => handleMouseEnter(e, rowData[col.field])}  // Show tooltip
                      onMouseLeave={handleMouseLeave}  // Hide tooltip
                    >
                      {rowData[col.field]}
                    </div>
                  )}
                  headerStyle={{
                    backgroundColor: '#f4f4f4',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    padding: '10px'
                  }}
                  bodyStyle={{
                    textAlign: 'center',
                    padding: '10px',
                    fontSize: '14px',
                    borderBottom: '1px solid #ddd'
                  }}
                />
              ))}
            </DataTable>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TableComponent;
