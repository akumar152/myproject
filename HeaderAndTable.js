import React, { useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
        <div
            ref={ref}
            style={{
                overflowX: hideScrollbar ? 'hidden' : 'auto',
                whiteSpace: 'nowrap',
            }}
        >
            <DataTable
                value={data}
                scrollable
                scrollHeight="200px"
                paginator={showPagination}
                rows={5}
                scrollDirection="horizontal"
                style={{ minWidth: '1500px' }} // Ensure the table is wide enough for horizontal scrolling
            >
                {columns.map((col) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {renderTable(table1Ref, data, true, true)} {/* First table (hidden scrollbar) */}
            {renderTable(table2Ref, data, false, true)} {/* Second table (hidden scrollbar) */}
            {renderTable(table3Ref, data, false)} {/* Third table (scrollbar visible) */}
        </div>
    );
};

export default SynchronizedTablesSingleScrollbar;
