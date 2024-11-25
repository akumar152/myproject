import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
    overflow-x: ${({ hideScrollbar }) => (hideScrollbar ? 'hidden' : 'auto')};
    overflow-y: hidden;
    white-space: nowrap;
    /* Hide scrollbars when needed */
    ::-webkit-scrollbar {
        display: ${({ hideScrollbar }) => (hideScrollbar ? 'none' : 'initial')};
    }
    -ms-overflow-style: ${({ hideScrollbar }) => (hideScrollbar ? 'none' : 'auto')};
    scrollbar-width: ${({ hideScrollbar }) => (hideScrollbar ? 'none' : 'auto')};
`;

const StyledDataTable = styled(DataTable)`
    min-width: 1500px; /* Ensure horizontal scrolling for wide tables */
`;

const SynchronizedTablesSingleScrollbar = () => {
    const table1Ref = useRef(null);
    const table2Ref = useRef(null);
    const table3Ref = useRef(null);

    // Generate multiple columns for testing
    const columns = Array.from({ length: 20 }, (_, i) => ({
        field: `field${i + 1}`,
        header: `Header ${i + 1}`,
    }));

    // Generate sample data
    const data = Array.from({ length: 10 }, (_, i) => {
        const row = {};
        columns.forEach((col) => {
            row[col.field] = `Value ${i + 1}.${col.field}`;
        });
        return row;
    });

    // Synchronize scroll positions
    const syncScroll = (event) => {
        const scrollLeft = event.target.scrollLeft;
        if (table1Ref.current) table1Ref.current.scrollLeft = scrollLeft;
        if (table2Ref.current) table2Ref.current.scrollLeft = scrollLeft;
    };

    useEffect(() => {
        const table3 = table3Ref.current;
        if (table3) {
            table3.addEventListener('scroll', syncScroll);
        }
        return () => {
            if (table3) {
                table3.removeEventListener('scroll', syncScroll);
            }
        };
    }, []);

    const renderTable = (ref, data, showPagination, hideScrollbar = false) => (
        <ScrollableWrapper ref={ref} hideScrollbar={hideScrollbar}>
            <StyledDataTable
                value={data}
                scrollable
                scrollHeight="100%" // Adjust height to fit within the card
                paginator={showPagination}
                rows={5}
                scrollDirection="horizontal"
            >
                {columns.map((col) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </StyledDataTable>
        </ScrollableWrapper>
    );

    return (
        <Container>
            <Card>{renderTable(table1Ref, data, true, true)}</Card> {/* First table (hidden scrollbar) */}
            <Card>{renderTable(table2Ref, data, false, true)}</Card> {/* Second table (hidden scrollbar) */}
            <Card>{renderTable(table3Ref, data, false)}</Card> {/* Third table (scrollbar visible) */}
        </Container>
    );
};

export default SynchronizedTablesSingleScrollbar;
