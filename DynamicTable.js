import React, { useState } from 'react';
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

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

// Map each status to an icon
const iconMap = {
    'Not Started': <FaHourglassHalf style={{ color: 'lightgray' }} />,
    'completed': <FaCheckCircle style={{ color: 'blue' }} />,
    'In-progress': <FaCheckCircle style={{ color: 'green' }} />,
    'Older Modal': <FaExclamationTriangle style={{ color: 'yellow' }} />,
    'Lost Data': <FaTimesCircle style={{ color: 'black' }} />
};

// Country flag URLs
const countryFlags = {
    Malaysia: 'https://flagcdn.com/w320/my.png',
    Singapore: 'https://flagcdn.com/w320/sg.png',
    'Hong Kong': 'https://flagcdn.com/w320/hk.png',
    Indonesia: 'https://flagcdn.com/w320/id.png',
    Philippines: 'https://flagcdn.com/w320/ph.png',
    Thailand: 'https://flagcdn.com/w320/th.png',
};

// For the legend, use the same icons
const legendIcons = {
    'Not Started': <FaHourglassHalf style={{ color: 'lightgray' }} />,
    'completed': <FaCheckCircle style={{ color: 'blue' }} />,
    'In-progress': <FaCheckCircle style={{ color: 'green' }} />,
    'Older Modal': <FaExclamationTriangle style={{ color: 'yellow' }} />,
    'Lost Data': <FaTimesCircle style={{ color: 'black' }} />
};

const TableComponent = ({ data }) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = (columnId) => {
        setSortDirection(sortColumn === columnId && sortDirection === 'asc' ? 'desc' : 'asc');
        setSortColumn(columnId);
    };

    const sortedData = [...data].sort((a, b) => {
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
        padding: '12px',
        textAlign: 'left',
        fontSize: '12px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    const headerStyle = {
        backgroundColor: 'pink',
        cursor: 'pointer',
        textAlign: 'center',
        wordWrap: 'break-word',
        wordBreak: 'break-word',
        whiteSpace: 'normal',
        fontWeight: 'bold',
    };

    return (
        <div style={tableContainerStyle}>
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
                                        backgroundColor: col.id === 'market' ? (rowIndex % 2 === 0 ? 'pink' : 'lightpink') : 'transparent',
                                        textAlign: 'center',
                                    }}
                                    title={col.id !== 'market' ? row[col.id] : ''}
                                >
                                    {/* Market column with flag and country name */}
                                    {col.id === 'market' ? (
                                        <>
                                            <img
                                                src={countryFlags[row[col.id]]}
                                                alt={row[col.id]}
                                                style={{ width: '16px', height: '16px', marginRight: '8px' }}
                                            />
                                            {row[col.id]}
                                        </>
                                    ) : (
                                        iconMap[row[col.id]] // Icon for other columns
                                    )}
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
                    {Object.entries(legendIcons).map(([status, icon]) => (
                        <div key={status} style={{ display: 'flex', alignItems: 'center' }}>
                            {icon}
                            <span style={{ fontSize: '10px', marginLeft: '4px' }}>{status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TableComponent;
