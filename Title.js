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

  const thirdTableData = [
    {
        "case_id":{
            id:1,
            name:'John Doe',
            age:30,
            location:"New York",
            email:"jane@example.com",
            phone:"555-1234",
            address:"123 Main St",
            city:"New York",
            state:"NY",
            country:"USA"
        },
        "claim_id":{
            id:2,
            name:'Jane Smith',
            age:30,
            location:"New York",
            email:"jane@example.com",
            phone:"555-1234",
            address:"123 Main St",
            city:"New York",
            state:"NY",
            country:"USA"
        },
        "container_id":{
            id:3,
            name:'Mark Johnson',
            age:30,
            location:"New York",
            email:"jane@example.com",
            phone:"555-1234",
            address:"123 Main St",
            city:"New York",
            state:"NY",
            country:"USA"
        },

        }
  ];

  const thirdColumnData = [
    { id: 1, value: "name" },
    { id: 2, value: "location" },
    { id: 3, value: "country" },
    { id: 4, value: "state" },
    { id: 5, value: "city" },
    { id: 5, value: "comments" }
  ];

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

  const renderthirdOneTable = (ref, data) => (
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

  const handleEdit = (rowIndex, field, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][field] = value;
    // setData(updatedData); // Assuming you are managing the `data` state
  };

  const dropdownOptions = [
    { value: 'Option1', label: 'Option 1' },
    { value: 'Option2', label: 'Option 2' },
    { value: 'Option3', label: 'Option 3' },
  ];

  const handleDropdownChange = (rowIndex, field, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][field] = value;
    // setData(updatedData); // Assuming you are managing the `data` state
  };
  
  

  const RenderTable3 = (ref, data, columns) => {
    const [searchFilters, setSearchFilters] = useState({});
    const [buttonStates, setButtonStates] = useState({}); // State to track button statuses
  
    // Update search filter value for a column
    const handleSearchChange = (field, value) => {
      setSearchFilters((prev) => ({
        ...prev,
        [field]: value.toLowerCase(),
      }));
    };
  
    // Handle button click and update states
    const handleButtonClick = (field, type) => {
      setButtonStates((prev) => ({
        ...prev,
        [field]: type === "Submit" ? "Submitted" : "Review Completed",
      }));
    };
  
    // Determine button styles dynamically
    const getButtonStyle = (field, type) => {
      const status = buttonStates[field];
      if (type === "Submit" && status === "Submitted") {
        return { backgroundColor: "lightgreen", color: "black" };
      }
      if (type === "Review not started" && status === "Review Completed") {
        return { backgroundColor: "darkgreen", color: "white" };
      }
      return {};
    };
  
    // Filter rows based on search inputs
    const filteredData = data.filter((row) =>
      columns.every((col) =>
        searchFilters[col.field]
          ? String(row[col.field]).toLowerCase().includes(searchFilters[col.field])
          : true
      )
    );
  
    return (
      <ScrollableWrapper ref={ref}>
        <StyledDataTable
          value={filteredData} // Use filtered data here
          scrollable
          showGridlines
          stripedRows
          scrollHeight="calc(100% - 10px)"
          scrollDirection="horizontal"
          minWidth={minWidth}
          size="small"
          style={{ width: "200px" }}
        >
          {columns.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={
                <input
                  type="text"
                  placeholder={`Search ${col.header}`}
                  onChange={(e) => handleSearchChange(col.field, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "4px",
                    boxSizing: "border-box",
                  }}
                />
              }
              body={(rowData, { rowIndex }) =>
                [1, 3, 4].includes(rowIndex) ? (
                  <input
                    type="text"
                    value={rowData[col.field]}
                    onChange={(e) =>
                      handleEdit(rowIndex, col.field, e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "4px",
                      boxSizing: "border-box",
                    }}
                  />
                ) : (
                  rowData[col.field]
                )
              }
              footer={
                <div style={{ textAlign: "center" }}>
                  <Button
                    label={buttonStates[col.field] === "Submitted" ? "Submitted" : "Submit"}
                    onClick={() => handleButtonClick(col.field, "Submit")}
                    className="p-button-sm"
                    style={{
                      ...getButtonStyle(col.field, "Submit"),
                      fontSize: "8px",
                      padding: "4px 4px",
                      height: "24px",
                    }}
                  />
                  <Button
                    label={
                      buttonStates[col.field] === "Review Completed"
                        ? "Review Completed"
                        : "Review not started"
                    }
                    onClick={() => handleButtonClick(col.field, "Review not started")}
                    className="p-button-sm p-button-secondary"
                    style={{
                      ...getButtonStyle(col.field, "Review not started"),
                      fontSize: "8px",
                      padding: "4px 4px",
                      height: "24px",
                      marginLeft: "5px",
                    }}
                  />
                </div>
              }
              headerStyle={{ width: "10rem" }}
            />
          ))}
        </StyledDataTable>
      </ScrollableWrapper>
    );
  };

  
  
  
  
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
            {renderthirdOneTable(deltaTableRef, thirdColumnData)} {/* Delta small table */}
          </div>
          <div style={{ width: '80%' }}>
            {RenderTable3(table3Ref, data, columns)} {/* Delta large table with pagination */}
          </div>
        </TableWrapper>
      </Card>
    </Container>
  );
};

export default SynchronizedTablesDynamicWidth;
