import React from 'react';

const data = [
  { var: "id", count: 20, uniqueCount: 10, datatype: "int" },
  { var: "name", count: 30, uniqueCount: 10, datatype: "string" }
];

const DataTable = () => {
  // Step 1: Extract keys (count, uniqueCount, datatype)
  const keys = Object.keys(data[0]).filter(key => key !== 'var'); // Skip 'var' key

  // Step 2: Create a pivoted structure for rendering the table
  const rows = keys.map(key => {
    return {
      key, // the row name (count, uniqueCount, datatype)
      values: data.map(item => item[key]) // the values for each column
    };
  });

  return (
    <div>
      <h1>Pivot Table</h1>
      <table border="1" cellPadding="5">
        <tbody>
          {/* Render the first row with the "var" values as columns */}
          <tr>
            {data.map(item => (
              <td key={item.var}>{item.var}</td> // Column headers (id, name)
            ))}
          </tr>

          {/* Render the other rows (count, uniqueCount, datatype) */}
          {rows.map(row => (
            <tr key={row.key}>
              <td>{row.key}</td> {/* Row label (count, uniqueCount, datatype) */}
              {row.values.map((value, idx) => (
                <td key={idx}>{value}</td> // Cell values for each column
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
