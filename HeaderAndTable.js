import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const data = [
  { var: "id", count: 20, uniqueCount: 10, datatype: "int" },
  { var: "name", count: 30, uniqueCount: 10, datatype: "string" }
];

const DataTableComponent = () => {
  // Step 1: Extract the keys (count, uniqueCount, datatype) from the data
  const keys = Object.keys(data[0]).filter(key => key !== 'var'); // Remove 'var' key

  // Step 2: Prepare rows (using keys as rows)
  const rows = keys.map(key => ({
    key, 
    values: data.map(item => item[key]) // Extract the value for each var (column)
  }));

  // Step 3: Prepare columns dynamically (using var values as columns)
  const columns = data.map(item => ({
    field: item.var, // Column field will be based on 'var' values
    header: item.var  // Column header will be based on 'var' values
  }));

  // Step 4: Format the data for DataTable (creating a structure that includes each row with corresponding var values)
  const formattedData = rows.map(row => {
    const formattedRow = { key: row.key }; // Start with the row key (count, uniqueCount, datatype)
    row.values.forEach((value, index) => {
      formattedRow[data[index].var] = value; // Add the value for each var column
    });
    return formattedRow;
  });

  return (
    <div>
      <h1>Pivot Table using PrimeReact DataTable</h1>
      <DataTable value={formattedData} responsive>
        {columns.map((col, index) => (
          <Column key={index} field={col.field} header={col.header} />
        ))}
      </DataTable>
    </div>
  );
};

export default DataTableComponent;
