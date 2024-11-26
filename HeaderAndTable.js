import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Button } from 'primereact/button';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* Space between cards */
`;

const Card = styled.div`
  height: 300px;
  width: 90%;
  overflow: hidden; /* Prevent content overflow */
  display: flex;
  flex-direction: column;
  gap: 10px; /* Space between the tables */
`;

const TableWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0px; /* Space between tables */
`;

const ScrollableWrapper = styled.div`
  flex: 1;
  overflow-x: auto; /* Allow horizontal scrolling */
  overflow-y: hidden;
  white-space: nowrap;
  width: 100%; /* Ensure full width for scrolling */

  ::-webkit-scrollbar {
    display: ${({ hideScrollbar }) => (hideScrollbar ? "none" : "initial")};
  }
`;

const StyledDataTable = styled(DataTable)`
  min-width: ${({ minWidth }) => minWidth}px; /* Dynamic min-width based on column count */
  max-width: 100%;  /* Prevent overflow beyond the parent container */

  /* Custom styling for centering the text in headers and body */
  .p-datatable-thead > tr > th,
  .p-datatable-tbody > tr > td {
    font-size: 12px !important; /* Set font size */
    text-align: center !important; /* Center-align the text in both header and body cells */
    padding: 8px !important; /* Add padding for better spacing */
  }

  /* Adjust for table responsiveness */
  .p-datatable-wrapper {
    display: flex;
    justify-content: center;
  }
`;

const SynchronizedTablesDynamicWidth = ({ data, deltaData }) => {
  const table1Ref = useRef(null);
  const table2Ref = useRef(null);
  const table3Ref = useRef(null);
  const deltaTableRef = useRef(null);  // Reference for the delta table

  const [minWidth, setMinWidth] = useState(0);
  const [first, setFirst] = useState(0);  // Track first (page) index
  const [rows, setRows] = useState(5);    // Number of rows per page

  // Columns for main table
  const columns = [
    { field: "static", header: "Static Column" }, // Static column
    ...Object.keys(data[0] || {}).map((key) => ({
      field: key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
    })),
  ];

  // Columns for delta table
  const deltaColumns = [
    { field: "id", header: "ID" },
    { field: "deltaValue", header: "Delta Value" },
    { field: "description", header: "Description" },
  ];

  // Calculate dynamic min-width
  useEffect(() => {
    const columnWidth = 150; // Average width of a column
    setMinWidth(columns.length * columnWidth + 100); // Add extra space to avoid clipping
  }, [columns]);

  // Synchronize horizontal scroll positions
  const syncScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    if (table1Ref.current) table1Ref.current.scrollLeft = scrollLeft;
    if (table2Ref.current) table2Ref.current.scrollLeft = scrollLeft;
    if (table3Ref.current) table3Ref.current.scrollLeft = scrollLeft;
  };

  useEffect(() => {
    const table1 = table1Ref.current;
    const table2 = table2Ref.current;
    const table3 = table3Ref.current;

    if (table1) table1.addEventListener("scroll", syncScroll);
    if (table2) table2.addEventListener("scroll", syncScroll);
    if (table3) table3.addEventListener("scroll", syncScroll);

    return () => {
      if (table1) table1.removeEventListener("scroll", syncScroll);
      if (table2) table2.removeEventListener("scroll", syncScroll);
      if (table3) table3.removeEventListener("scroll", syncScroll);
    };
  }, []);

  // Renderer for static column
  const staticColumnBody = (rowData) => {
    return <span>Static Value</span>;
  };

  const oneColumnData = [
    { id: 1, value: "Row 1" },
    { id: 2, value: "Row 2" },
    { id: 3, value: "Row 3" },
    { id: 4, value: "Row 4" },
    { id: 5, value: "Row 5" }
  ];

  const renderOneColumnTable = (ref, data) => (
    <ScrollableWrapper ref={ref}>
      <StyledDataTable
        value={data}
        showGridlines
        stripedRows
        scrollDirection="horizontal"
        minWidth={150} // Set a minimum width for the single column table
        size="small"
      >
        <Column field="value" header="Single Column" />
      </StyledDataTable>
    </ScrollableWrapper>
  );

  // Table rendering function with pagination
  const renderTableWithPagination = (ref, data, columns) => (
    <ScrollableWrapper ref={ref}>
      <StyledDataTable
        value={data}
        scrollable
        scrollHeight="calc(100% - 40px)"
        paginator
        rows={rows}
        first={first}
        size="small"
        showGridlines
        stripedRows
        scrollDirection="horizontal"
        minWidth={minWidth}
        paginatorTemplate={"RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"}
        currentPageReportTemplate="{last} of {totalRecords}"
        onPage={(e) => {
          setFirst(e.first);
          setRows(e.rows);
        }}
      >
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            headerStyle={{ width: '10rem' }}
          />
        ))}
      </StyledDataTable>
    </ScrollableWrapper>
  );

  // Table rendering function for small tables
  const renderTable = (ref, data, columns) => (
    <ScrollableWrapper ref={ref}>
      <StyledDataTable
        value={data}
        scrollable
        showGridlines
        stripedRows
        scrollHeight="calc(100% - 10px)"
        scrollDirection="horizontal"
        minWidth={minWidth}
        size="small"
      >
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            headerStyle={{ width: '10rem' }}
            // body={col.field === "static" ? staticColumnBody : undefined} // Use static content for the first column
            // frozen={col.field === "static"}
          />
        ))}
      </StyledDataTable>
    </ScrollableWrapper>
  );

  const handleButtonClick = (field, buttonNumber) => {
    console.log(`Button ${buttonNumber} clicked for column: ${field}`);
  };

  const renderTable3 = (ref, data, columns) => (
    <ScrollableWrapper ref={ref}>
      <StyledDataTable
        value={data}
        scrollable
        showGridlines
        stripedRows
        scrollHeight="calc(100% - 10px)"
        scrollDirection="horizontal"
        minWidth={minWidth}
        size="small"
        style={{width:'200px'}}
      >
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            // body={col.field === "static" ? staticColumnBody : undefined}
            // frozen={col.field === "static"}
            footer={
                <div style={{ textAlign: "center" }}>
                  <Button
                    label="Action 1"
                    onClick={() => handleButtonClick(col.field, "Action 1")}
                    className="p-button-sm"
                    style={{ fontSize: "10px", padding: "4px 8px", height: "24px" }}
                  />
                  <Button
                    label="Action 2"
                    onClick={() => handleButtonClick(col.field, "Action 2")}
                    className="p-button-sm p-button-secondary"
                    style={{ fontSize: "10px", padding: "4px 8px", height: "24px", marginLeft: "5px" }}
                  />
                </div>
              }
              headerStyle={{ width: '10rem' }}
              
          />
        ))}
      </StyledDataTable>
    </ScrollableWrapper>
  );
  return (
    <Container>
      <Card>
        <TableWrapper>
          <div style={{ width: '20%' }}>
            {renderOneColumnTable(deltaTableRef, oneColumnData)} {/* Delta small table */}
          </div>
          <div style={{ width: '80%' }}>
            {renderTableWithPagination(table1Ref, data, columns)} {/* Large table with pagination */}
          </div>
        </TableWrapper>
      </Card>

      <Card>
        <TableWrapper>
          <div style={{ width: '20%' }}>
          {renderOneColumnTable(deltaTableRef, oneColumnData)} {/* Delta small table */}
          </div>
          <div style={{ width: '80%' }}>
            {renderTable(table2Ref, data, columns)} {/* Large table with pagination */}
          </div>
        </TableWrapper>
      </Card>

      <Card>
        <TableWrapper>
          <div style={{ width: '20%' }}>
            {renderOneColumnTable(deltaTableRef, oneColumnData)} {/* Delta small table */}
          </div>
          <div style={{ width: '80%' }}>
            {renderTable3(table3Ref, data, columns)} {/* Delta large table with pagination */}
          </div>
        </TableWrapper>
      </Card>
    </Container>
  );
};

export default SynchronizedTablesDynamicWidth;
