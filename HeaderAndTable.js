import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const formatDataForDataTable = (data) => {
  const rowLabels = ["count", "uniqueCount", "datatype", "min", "max"];

  // Create a row for each label and assign the corresponding values
  const formattedData = rowLabels.map((label) => {
    const row = { label }; // Each row starts with the label
    data.forEach((item) => {
      row[item.var] = item[label]; // Dynamically assign column values
    });
    return row;
  });

  return formattedData;
};


// Sample input data
const data = [
  { var: "id", count: 200, uniqueCount: 120, datatype: "int", min: 1, max: 999 },
  { var: "name", count: 300, uniqueCount: 280, datatype: "string", min: "-", max: "-" },
  { var: "email", count: 150, uniqueCount: 145, datatype: "string", min: "-", max: "-" },
  { var: "age", count: 100, uniqueCount: 85, datatype: "int", min: 18, max: 75 },
  { var: "gender", count: 250, uniqueCount: 2, datatype: "string", min: "-", max: "-" },
  { var: "address", count: 500, uniqueCount: 450, datatype: "string", min: "-", max: "-" },
  { var: "phone", count: 320, uniqueCount: 300, datatype: "string", min: "-", max: "-" },
];

// Format data
const formattedData = formatDataForDataTable(data);

// Extract column headers from the original data
const columns = data.map((item) => item.var);

const Table = () => {
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <DataTable value={formattedData} scrollable scrollDirection="horizontal">
        {/* First column for row labels */}
        <Column field="label" header="Label" style={{ fontWeight: "bold" }} />

        {/* Generate columns dynamically from the formatted data */}
        {columns.map((col) => (
          <Column key={col} field={col} header={col} style={{ textAlign: "center" }} />
        ))}
      </DataTable>
    </div>
  );
};

export default Table;
