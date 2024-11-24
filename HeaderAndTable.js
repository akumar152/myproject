import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'react-bootstrap'; // Import Card from react-bootstrap
import styled from 'styled-components';

// Sample data with long text
const data = [
  { id: 1, name: "A very long name that needs to be truncated", description: "This is a description with some long text that needs to be truncated." },
  { id: 2, name: "Short Name", description: "Another description" },
  { id: 3, name: "Another very long name example", description: "This is a description with a lot of details and information that will be truncated." }
];

// Styled components for custom styling
const StyledCard = styled(Card)`
  border-radius: 10px;
  margin-top: 20px;
`;

const CardHeader = styled(Card.Header)`
  background-color: #007bff;
  color: white;
  padding: 15px;
  font-size: 1.25rem;
`;

const TableContainer = styled.div`
  .p-datatable {
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    margin-top: 20px;
  }

  .p-datatable-header {
    background-color: #007bff;
    color: white;
    font-weight: bold;
  }

  .p-datatable-tbody td {
    padding: 12px 15px;
    text-align: center;
    border: 1px solid #ccc;
    max-width: 200px;  // Limit max width for better truncation
  }

  .p-column-header,
  .p-datatable-tbody td {
    text-align: center;
  }

  .p-datatable-tbody tr:hover {
    background-color: #e2e2e2;
  }

  .p-datatable-tbody tr {
    transition: background-color 0.3s ease;
  }
`;

// Tooltip styling
const Tooltip = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  white-space: nowrap;
  max-width: 300px;
  z-index: 9999;
  display: none;
`;

const TableComponent = () => {
  const [tooltipContent, setTooltipContent] = React.useState("");

  const handleMouseEnter = (e, value) => {
    const tooltip = document.getElementById("custom-tooltip");
    if (tooltip) {
      tooltip.style.display = "block";
      tooltip.style.top = `${e.target.getBoundingClientRect().top - tooltip.offsetHeight}px`;
      tooltip.style.left = `${e.target.getBoundingClientRect().left + (e.target.offsetWidth - tooltip.offsetWidth) / 2}px`;
      setTooltipContent(value); // Set content for tooltip
    }
  };

  const handleMouseLeave = () => {
    const tooltip = document.getElementById("custom-tooltip");
    if (tooltip) {
      tooltip.style.display = "none";
    }
  };

  const columns = [
    { field: "name", header: "Name" },
    { field: "description", header: "Description" }
  ];

  return (
    <div>
      {/* Card with a title and custom background color */}
      <StyledCard>
        <CardHeader>
          <h4>DataTable with Tooltip on Hover</h4>
        </CardHeader>
        <Card.Body>
          {/* DataTable with custom styling */}
          <TableContainer>
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
                        textAlign: 'center', // Center align text
                        cursor: 'pointer',   // Show pointer on hover
                      }}
                      onMouseEnter={(e) => handleMouseEnter(e, rowData[col.field])}
                      onMouseLeave={handleMouseLeave}
                    >
                      {rowData[col.field]}
                    </div>
                  )}
                />
              ))}
            </DataTable>
          </TableContainer>
        </Card.Body>
      </StyledCard>

      {/* Tooltip element */}
      <Tooltip id="custom-tooltip">{tooltipContent}</Tooltip>
    </div>
  );
};

export default TableComponent;
