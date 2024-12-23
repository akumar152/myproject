import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Checkbox } from 'primereact/checkbox';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`;

const TableCard = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
  margin-bottom: 20px;
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
  z-index: 10;
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

const Button = styled.button`
  background: #007ad9;
  border: none;
  color: white;
  font-size: 14px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;

  &:hover {
    background: #005a99;
  }
`;

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

const dummyData1 = generateDummyData(10, 30);
const dummyData2 = generateDummyData(15, 30);
const dummyData3 = generateDummyData(12, 30);

const TablesWithColumnPagination = () => {
    const [columns, setColumns] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const columnsPerPage = 7;

    useEffect(() => {
        const tableColumns = Array.from({ length: 30 }, (_, index) => ({
            field: `col${index + 1}`,
            header: `Column ${index + 1}`,
        }));
        setColumns(tableColumns);

        const initialColumns = tableColumns.slice(0, columnsPerPage);
        setVisibleColumns(initialColumns);
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const start = page * columnsPerPage;
        const end = start + columnsPerPage;
        setVisibleColumns(columns.slice(start, end));
        setSelectAll(false);
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const currentFields = visibleColumns.map((col) => col.field);
        if (!selectAll) {
            setSelectedColumns((prev) => [...prev, ...currentFields]);
        } else {
            setSelectedColumns((prev) => prev.filter((field) => !currentFields.includes(field)));
        }
    };

    const handleColumnSelect = (field) => {
        setSelectedColumns((prev) =>
            prev.includes(field) ? prev.filter((col) => col !== field) : [...prev, field]
        );
    };

    const renderColumns = (withCheckbox = false) => {
        return visibleColumns.map((col) => (
            <Column
                key={col.field}
                field={col.field}
                header={
                    withCheckbox ? (
                        <div>
                            {/* <input
                                type="checkbox"
                                checked={selectedColumns.includes(col.field)}
                                onChange={() => handleColumnSelect(col.field)}
                            /> */}
                            <Checkbox
                                checked={selectedColumns.includes(col.field)}
                                onChange={() => handleColumnSelect(col.field)}
                            />

                            {col.header}
                        </div>
                    ) : (
                        col.header
                    )
                }
            />
        ));
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(columns.length / columnsPerPage);
        return (
            <StyledPagination>
                <ArrowButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                    ←
                </ArrowButton>
                <PaginationInfo>
                    Page {currentPage + 1} of {totalPages}
                </PaginationInfo>
                <ArrowButton
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    →
                </ArrowButton>
            </StyledPagination>
        );
    };

    const handleSubmit = () => {
        console.log("Selected Columns for Submission:", selectedColumns);
    };

    return (
        <PageContainer>
            {[dummyData1, dummyData2].map((tableData, index) => (
                <TableCard key={index}>
                    <DataTable value={tableData} responsiveLayout="scroll">
                        {renderColumns()}
                    </DataTable>
                </TableCard>
            ))}

            <TableCard>
                {/* <div>
                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    Select All Columns
                </div> */}
                <div>
                    <Checkbox
                        checked={selectAll}
                        onChange={handleSelectAll}
                    />
                    <span>Select All (Current Page)</span>
                </div>
                <DataTable value={dummyData3} responsiveLayout="scroll">
                    {renderColumns(true)}
                </DataTable>
                <Button onClick={handleSubmit}>Submit</Button>
            </TableCard>

            <StickyFooter>{renderPagination()}</StickyFooter>
        </PageContainer>
    );
};

export default TablesWithColumnPagination;
