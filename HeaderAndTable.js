import React from "react";




const Table = ({ maxWidth = "200%", maxHeight = "300px" }) => {
  // Extract keys from the first object (excluding 'var')

  const data = [
    { var: "id", count: 200, uniqueCount: 120, datatype: "int", min: 1, max: 999 },
    { var: "name", count: 300, uniqueCount: 280, datatype: "string", min: "-", max: "-" },
    { var: "email", count: 150, uniqueCount: 145, datatype: "string", min: "-", max: "-" },
    { var: "age", count: 100, uniqueCount: 85, datatype: "int", min: 18, max: 75 },
    { var: "salary", count: 75, uniqueCount: 70, datatype: "float", min: 30000, max: 120000 },
    { var: "address", count: 250, uniqueCount: 240, datatype: "string", min: "-", max: "-" },
    { var: "phone", count: 180, uniqueCount: 175, datatype: "string", min: "0000000000", max: "9999999999" },
    { var: "zipcode", count: 90, uniqueCount: 88, datatype: "int", min: 10000, max: 99999 },
    { var: "status", count: 50, uniqueCount: 3, datatype: "enum", min: "Active", max: "Inactive" },
    { var: "dob", count: 100, uniqueCount: 90, datatype: "date", min: "1990-01-01", max: "2023-01-01" },
    { var: "rating", count: 70, uniqueCount: 50, datatype: "float", min: 1.0, max: 5.0 },
    { var: "department", count: 200, uniqueCount: 10, datatype: "string", min: "-", max: "-" },
    { var: "country", count: 220, uniqueCount: 50, datatype: "string", min: "-", max: "-" },
    { var: "region", count: 80, uniqueCount: 20, datatype: "string", min: "-", max: "-" },
    { var: "joinDate", count: 150, uniqueCount: 140, datatype: "date", min: "2000-01-01", max: "2023-11-01" },
  ];
  
  
  if (!data || data.length === 0) return <p>No data available</p>;

  // Extract 'var' column values for table headers
  const columns = data.map((item) => item.var);

  // Extract rows for the separate box
  const rowLabels = ["count", "uniqueCount", "datatype", "min", "max"];

  const cellStyle = {
    border: "1px solid black",
    padding: "8px", // Match padding with table
    textAlign: "center",
    height: "40px", // Uniform height for all cells
    background: "#f9f9f9",
  };

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
      }}
    >
      {/* Separate box for row labels */}
      <div
        style={{
          marginTop: "38px", // Offset height to match the table header
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            {rowLabels.map((label, index) => (
              <tr key={label}>
                <td
                  style={{
                    ...cellStyle,
                    background: index % 2 === 0 ? "#f9f9f9" : "#fff",
                  }}
                >
                  {label}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Main table */}
      <div
        style={{
          overflow: "auto",
          maxWidth,
          maxHeight,
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              {/* Render column headers */}
              {columns.map((col) => (
                <th
                  key={col}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                    background: "#f0f0f0",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Render row data */}
            {rowLabels.map((rowKey, index) => (
              <tr key={rowKey}>
                {data.map((item) => (
                  <td
                    key={`${rowKey}-${item.var}`}
                    style={{
                      ...cellStyle,
                      background: index % 2 === 0 ? "#f9f9f9" : "#fff",
                    }}
                  >
                    {item[rowKey]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

// Example usage



