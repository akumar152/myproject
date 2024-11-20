import React, { useState, useEffect } from 'react';
import { TableContainer } from './styles';

function Table({ data, columns }) {
  // If there's no data or columns, show a loading state or empty table
  if (!data || !columns) {
    return (
      <TableContainer>
        <p>Loading...</p>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            {/* Render dynamic headers */}
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render dynamic rows based on data */}
          {data.map((row, index) => (
            <tr key={index}>
              {/* Render dynamic columns based on each row's data */}
              {Object.values(row).map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
}

export default Table;
