import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px; /* To account for the sticky footer */
  position: relative;
`;

const TableCard = styled.div`
  width: 100%;
//   padding: 20px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
  margin-bottom: 10px;
`;

const CardHeader = styled.div`
  align-items: center;
  cursor: pointer;
  gap: 10px;
//   display: flex;
`;

const CardHeader1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  gap: 10px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 15px;
`;

const ChevronIcon = styled.span`
  font-size: 18px;
  transition: transform 0.3s ease;
  justify-content: flex-end;
  align-self: flex-end;
  transform: ${({ isCollapsed }) => (isCollapsed ? "rotate(90deg)" : "rotate(0deg)")};
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #007ad9;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #005a99;
  }
`;

const StickyFooter = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: white;
  border-top: 1px solid #ddd;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  justify-content: center;
  z-index: 10; /* Ensures the footer is on top */
`;

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 50%;
  background-color: white;
  color: #007ad9;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #007ad9;
    color: white;
    border-color: #005a99;
  }

  &:disabled {
    background-color: #f0f0f0;
    color: #ccc;
    cursor: not-allowed;
  }
`;

const PaginationInfo = styled.span`
  font-size: 14px;
  color: #333;
`;

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 0;
  font-size: 14px;
`;

// Dummy Data
const generateDummyData = (rows, columns) => {
    const data = [];
    for (let i = 0; i < rows; i++) {
        const row = {};
        for (let j = 1; j <= columns; j++) {
            row[`col${j}`] = `Value ${i + 1}-${j}`;
        }
        data.push(row);
    }
    return data;
};

const dummyData1 = generateDummyData(10, 30); // 10 rows, 30 columns
const dummyData2 = generateDummyData(15, 30);
const dummyData3 = generateDummyData(12, 30);

const TablesWithColumnPagination = () => {
    const [columns, setColumns] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [collapsedTables, setCollapsedTables] = useState([false, false]);

    const columnsPerPage = 7; // Reduced by 1 to accommodate the static column

    useEffect(() => {
        // Generate column definitions dynamically
        const tableColumns = Array.from({ length: 30 }, (_, index) => ({
            field: `col${index + 1}`,
            header: `Column ${index + 1}`,
        }));
        setColumns(tableColumns);

        // Set initial visible columns with the first column as static
        const initialColumns = [tableColumns[0], ...tableColumns.slice(1, columnsPerPage + 1)];
        setVisibleColumns(initialColumns);
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const start = page * columnsPerPage + 1; // Start after the static column
        const end = start + columnsPerPage;
        const paginatedColumns = columns.slice(start, end);

        // Always include the first column as static
        setVisibleColumns([columns[0], ...paginatedColumns]);
    };

    const renderColumns = () =>
        visibleColumns.map((col) => <Column key={col.field} field={col.field} header={col.header} />);

    const toggleCollapse = (index) => {
        setCollapsedTables((prev) =>
            prev.map((collapsed, i) => (i === index ? !collapsed : collapsed))
        );
    };

    const renderPagination = () => {
        const totalPages = Math.ceil((columns.length - 1) / columnsPerPage); // Exclude static column from pagination

        return (
            <StyledPagination>
                {/* Left Arrow */}
                <ArrowButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                    ←
                </ArrowButton>

                {/* Page Info */}
                <PaginationInfo>
                    Page {currentPage + 1} of {totalPages}
                </PaginationInfo>

                {/* Right Arrow */}
                <ArrowButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                    →
                </ArrowButton>
            </StyledPagination>
        );
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Products</span>
            <Button icon="pi pi-refresh" rounded raised color="red"/>
        </div>
    );

    return (
        <PageContainer>
            {[dummyData1, dummyData2].map((tableData, index) => (
                <TableCard
                    key={index}
                    style={{ position: index === 0 && collapsedTables[index] ? "sticky" : "relative", top: 0, zIndex: index === 0 ? 5 : 0 }}
                >
                    <CardHeader onClick={() => toggleCollapse(index)}>
                        <div style={{ height: "30px" }}></div>
                        {collapsedTables[index] && (
                            <DataTable value={[]} emptyMessage={<div style={{ height: "0px" }}></div>} showGridlines size="small" header={header}>
                                {renderColumns()}
                            </DataTable>
                        )}
                    </CardHeader>

                    {!collapsedTables[index] && (
                        <DataTable value={tableData} size="small" showGridlines stripedRows rowHover={true} showHeaders={index === 0 ? true : false}>
                            {renderColumns()}
                        </DataTable>
                    )}
                </TableCard>
            ))}
            {/* Table 3 - No collapse */}
            <TableCard>
                <CardHeader1>
                    <HeaderLeft>
                        <h3>Table 3</h3>
                    </HeaderLeft>
                    <HeaderRight>
                        <Button>Submit</Button>
                        <Button>Review</Button>
                        <Button>Reset</Button>
                    </HeaderRight>
                </CardHeader1>
                <DataTable value={dummyData3} size="small" showGridlines stripedRows>
                    {renderColumns()}
                </DataTable>
            </TableCard>
            <StickyFooter>{renderPagination()}</StickyFooter>
        </PageContainer>
    );
};

export default TablesWithColumnPagination;
