import React, { useState } from 'react';

// Sample data and columns
const columns = [
    { id: 'market', header: 'Market' },
    { id: 'bronze', header: 'Bronze (Raw)' },
    { id: 'bronzeTarget', header: 'Bronze (Raw THDM)' },
    { id: 'silver', header: 'Silver (Enriched)' },
    { id: 'silverTarget', header: 'Silver (Denormalized)' },
    { id: 'gold', header: 'Gold (Reporting)' },
    { id: 'goldTarget', header: 'Gold Target (Feature Store)' },
];

const colorMap = {
    'Not Started': 'lightgray',
    'completed': 'blue',
    'In-progress': 'green',
    'Older Modal': 'yellow',
    'Lost Data': 'black'
};

const legendColors = {
    'Not Started': 'lightgray',
    'completed': 'blue',
    'In-progress': 'green',
    'Older Modal': 'yellow',
    'Lost Data': 'black'
};

const TableComponent = ({ data }) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [filter, setFilter] = useState('');

    const handleSort = (columnId) => {
        setSortDirection(sortColumn === columnId && sortDirection === 'asc' ? 'desc' : 'asc');
        setSortColumn(columnId);
    };

    const filteredData = data.filter(row => {
        return Object.values(row).some(value => value.toLowerCase().includes(filter.toLowerCase()));
    });

    const sortedData = [...filteredData].sort((a, b) => {
        if (sortColumn) {
            if (sortDirection === 'asc') {
                return a[sortColumn].localeCompare(b[sortColumn]);
            } else {
                return b[sortColumn].localeCompare(a[sortColumn]);
            }
        }
        return 0;
    });

    const tableContainerStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        tableLayout: 'fixed',
    };

    const cellStyle = {
        border: '1px solid #ddd',
        padding: '4px',
        textAlign: 'left',
        fontSize: '12px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    const headerStyle = {
        backgroundColor: 'pink',
        cursor: 'pointer',
        textAlign: 'left',
        wordWrap: 'break-word', // Allow wrapping
        wordBreak: 'break-word', // Force break long words if needed
        whiteSpace: 'normal', // Allow text to wrap
        fontWeight: 'bold',
    };

    const searchInputStyle = {
        width: '100%',
        padding: '8px',
        marginBottom: '4px', // Reduced margin
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxSizing: 'border-box',
    };

    return (
        <div style={tableContainerStyle}>
            <input
                type="text"
                placeholder="Search..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={searchInputStyle}
            />
            <table style={tableStyle}>
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th
                                key={column.id}
                                style={{ ...cellStyle, ...headerStyle }}
                                onClick={() => handleSort(column.id)}
                            >
                                {column.header}
                                {sortColumn === column.id && (sortDirection === 'asc' ? ' 🔼' : ' 🔽')}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map(col => (
                                <td
                                    key={col.id}
                                    style={{
                                        ...cellStyle,
                                        backgroundColor: col.id !== 'market' ? colorMap[row[col.id]] || 'transparent' : (rowIndex % 2 === 0 ? 'pink' : 'lightpink'),
                                        color: col.id === 'market' ? 'black' : 'transparent',
                                    }}
                                    title={col.id !== 'market' ? row[col.id] : ''}
                                >
                                    {col.id === 'market' ? row[col.id] : ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '8px' }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    justifyContent: 'space-between',
                }}>
                    {Object.entries(legendColors).map(([status, color]) => (
                        <div key={status} style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: color,
                                    marginRight: '4px',
                                    border: '1px solid #ddd',
                                }}
                            />
                            <span style={{ fontSize: '10px' }}>{status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TableComponent;
