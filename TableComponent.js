import React from 'react';
import {
    useReactTable,
    createColumnHelper,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';
import { rankItem, compareItems } from '@tanstack/match-sorter-utils';

// Define column helper
const columnHelper = createColumnHelper();

const TableComponent = ({ columns, data }) => {
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [sorting, setSorting] = React.useState([]);
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });

    // Define a custom filter function
    const customFilterFn = (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId);
        return cellValue?.toLowerCase().includes(filterValue.toLowerCase());
    };

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            sorting,
            pagination,
        },
        globalFilterFn: customFilterFn,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search all columns..."
                    value={globalFilter || ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                const isSorted = header.column.getIsSorted();
                                const isSortedDesc = isSorted === 'desc';

                                return (
                                    <th key={header.id}>
                                        <button
                                            onClick={() => header.column.getToggleSortingHandler()}
                                            style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                                        >
                                            {header.column.columnDef.header}
                                            <span>
                                                {isSorted
                                                    ? isSortedDesc
                                                        ? ' 🔽'
                                                        : ' 🔼'
                                                    : ''}
                                            </span>
                                        </button>
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>{' '}
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>{' '}
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>{' '}
                <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>{' '}
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                >
                    {[10, 20, 30, 40, 50].map(size => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TableComponent;
