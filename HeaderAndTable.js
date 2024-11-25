import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* Space between cards */
`;

const Card = styled.div`
  height: 300px;
  width: 75%;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden; /* Prevent content overflow */
  display: flex;
  flex-direction: column;
`;

const ScrollableWrapper = styled.div`
  flex: 1;
  overflow-x: ${({ hideScrollbar }) => (hideScrollbar ? "hidden" : "auto")};
  overflow-y: hidden;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: ${({ hideScrollbar }) => (hideScrollbar ? "none" : "initial")};
  }
`;

const StyledDataTable = styled(DataTable)`
  min-width: ${({ minWidth }) => minWidth}px; /* Dynamic min-width based on column count */
`;

const SynchronizedTablesDynamicWidth = () => {
  const table1Ref = useRef(null);
  const table2Ref = useRef(null);
  const table3Ref = useRef(null);

  const [minWidth, setMinWidth] = useState(0);

  // Generate multiple columns for testing
  const columns = Array.from({ length: 20 }, (_, i) => ({
    field: `field${i + 1}`,
    header: `Header ${i + 1}`,
  }));

  // Generate sample data
  const data = Array.from({ length: 15 }, (_, i) => {
    const row = {};
    columns.forEach((col) => {
      row[col.field] = `Value ${i + 1}.${col.field}`;
    });
    return row;
  });

  // Calculate dynamic min-width
  useEffect(() => {
    const columnWidth = 150; // Average width of a column
    setMinWidth(columns.length * columnWidth);
  }, [columns]);

  // Synchronize scroll positions
  const syncScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    if (table1Ref.current) table1Ref.current.scrollLeft = scrollLeft;
    if (table2Ref.current) table2Ref.current.scrollLeft = scrollLeft;
  };

  useEffect(() => {
    const table3 = table3Ref.current;
    if (table3) {
      table3.addEventListener("scroll", syncScroll);
    }
    return () => {
      if (table3) {
        table3.removeEventListener("scroll", syncScroll);
      }
    };
  }, []);

  const renderTableWithPagination = (ref, data) => (
    <ScrollableWrapper ref={ref} hideScrollbar>
      <StyledDataTable
        value={data}
        scrollable
        scrollHeight="calc(100% - 40px)"
        paginator
        rows={5}
        scrollDirection="horizontal"
        minWidth={minWidth}
      >
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
      </StyledDataTable>
    </ScrollableWrapper>
  );

  const renderTable = (ref, data, hideScrollbar = false) => (
    <ScrollableWrapper ref={ref} hideScrollbar={hideScrollbar}>
      <StyledDataTable
        value={data}
        scrollable
        scrollHeight="calc(100% - 10px)"
        scrollDirection="horizontal"
        minWidth={minWidth}
      >
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
      </StyledDataTable>
    </ScrollableWrapper>
  );

  return (
    <Container>
      <Card>{renderTableWithPagination(table1Ref, data)}</Card>
      <Card>{renderTable(table2Ref, data, true)}</Card>
      <Card>{renderTable(table3Ref, data)}</Card>
    </Container>
  );
};

export default SynchronizedTablesDynamicWidth;
