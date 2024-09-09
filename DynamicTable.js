import React, { useState } from 'react';

// Sample data and columns
const columns = [
    { id: 'market', header: 'Market' },
    { id: 'bronze', header: 'Bronze' },
    { id: 'bronzeTarget', header: 'Bronze Target' },
    { id: 'silver', header: 'Silver' },
    { id: 'silverTarget', header: 'Silver Target' },
    { id: 'gold', header: 'Gold' },
    { id: 'goldTarget', header: 'Gold Target' },
];

const colorMap = {
    'Not Started': 'lightgray',
    'In-progress': 'green',
    'completed': 'blue',
    'Older Modal': 'black',
    'Lost Data': 'red'
};

const legendColors = {
    'Not Started': 'lightgray',
    'In-progress': 'green',
    'completed': 'blue',
    'Older Modal': 'black',
    'Lost Data': 'red'
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

    return (
        <div style={{ width: '100%', overflowX: 'auto', marginBottom: '16px' }}>
            <div style={{ marginBottom: '16px', width: '100%' }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th
                                    key={column.id}
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        textAlign: 'left',
                                        backgroundColor: 'pink', // Pink background for headers
                                        whiteSpace: 'nowrap', // Prevent text wrapping
                                        overflow: 'hidden', // Prevent overflow
                                        textOverflow: 'ellipsis', // Ellipsis for overflow text
                                    }}
                                >
                                    <button
                                        onClick={() => handleSort(column.id)}
                                        style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                                    >
                                        {column.header}
                                        {sortColumn === column.id && (sortDirection === 'asc' ? ' 🔼' : ' 🔽')}
                                    </button>
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
                                            border: '1px solid #ddd',
                                            padding: '8px',
                                            backgroundColor: col.id !== 'market' ? colorMap[row[col.id]] || 'transparent' : (rowIndex % 2 === 0 ? 'pink' : 'lightpink'),
                                            color: col.id === 'market' ? 'black' : 'transparent', // Show text only in Market column
                                            whiteSpace: 'nowrap', // Prevent text wrapping
                                            overflow: 'hidden', // Prevent overflow
                                            textOverflow: 'ellipsis', // Ellipsis for overflow text
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
            </div>
            <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '8px' }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    gap: '16px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {Object.entries(legendColors).map(([status, color]) => (
                        <div key={status} style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '8px',
                            flex: '1 1 auto'
                        }}>
                            <div
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: color,
                                    border: '1px solid #ddd',
                                    marginRight: '8px'
                                }}
                            />
                            <span>{status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TableComponent;
