import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const data = [
  { var: "id", count: 20, uniqueCount: 10, datatype: "int" },
  { var: "name", count: 30, uniqueCount: 10, datatype: "string" },
  { var: "score", count: "4/4", uniqueCount: "3/4", datatype: "string" }, // Example with "4/4" format
];

const DataTableComponent = () => {
  // Step 1: Ensure that data is not empty or undefined and extract keys (count, uniqueCount, datatype)
  const fields = ['count', 'uniqueCount', 'datatype'];  // These are the fixed keys
  
  // Step 2: Prepare the columns dynamically based on the 'var' field
  const columns = data.map(item => ({
    field: item.var, // Column field will be based on 'var' values
    header: item.var  // Column header will be based on 'var' values
  }));

  // Step 3: Prepare rows based on the 'fields' (count, uniqueCount, datatype)
  const rows = fields.map(field => ({
    field, 
    values: data.map(item => item[field] ?? '-') // Fallback to '-' if value is undefined or null
  }));

  // Step 4: Format the data for DataTable
  const formattedData = rows.map(row => {
    const formattedRow = { key: row.field }; // Start with the row key (count, uniqueCount, datatype)
    row.values.forEach((value, index) => {
      // Check if value exists and is a string before calling split
      if (typeof value === 'string' && value.includes('/')) {
        formattedRow[data[index]?.var] = value.split('/')[0]; // Split value (for example "4/4" -> "4")
      } else {
        formattedRow[data[index]?.var] = value; // If no split needed, use value as is
      }
    });
    return formattedRow;
  });

  return (
    <div>
      <h1>Pivot Table using PrimeReact DataTable</h1>
      <DataTable value={formattedData} responsive>
        <Column field="key" header="" /> {/* No header for the first column */}
        {columns.map((col, index) => (
          <Column key={index} field={col.field} header={col.header} />
        ))}
      </DataTable>
    </div>
  );
};

export default DataTableComponent;
