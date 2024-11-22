const Table = ({ maxWidth = "200%", maxHeight = "300px" }) => {
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
  ];

  if (!data || data.length === 0) return <p>No data available</p>;

  const columns = data.map((item) => item.var);
  const rowLabels = ["count", "uniqueCount", "datatype", "min", "max"];

  const getLabelColor = (label) => {
    switch (label) {
      case "count":
        return "#d8eaff"; // Light blue
      case "uniqueCount":
        return "#e9ffd8"; // Light green
      case "datatype":
        return "#ffecd8"; // Light orange
      case "min":
        return "#ffd8d8"; // Light red
      case "max":
        return "#e5d8ff"; // Light purple
      default:
        return "#f9f9f9"; // Default
    }
  };

  const cellStyle = {
    border: "1px solid black",
    padding: "8px",
    textAlign: "center",
    height: "40px",
  };

  return (
    <div style={{ display: "flex", position: "relative" }}>
      {/* Separate box for row labels */}
      <div style={{ marginTop: "38px" }}>
        <table style={{ borderCollapse: "collapse" }}>
          <tbody>
            {rowLabels.map((label) => (
              <tr key={label}>
                <td
                  style={{
                    ...cellStyle,
                    background: getLabelColor(label),
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
      <div style={{ overflow: "auto", maxWidth, maxHeight }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead>
            <tr>
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
