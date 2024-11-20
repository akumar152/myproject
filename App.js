import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Container, ContentWrapper, Component, TitleBox, TableContainer, FormContainer, Button } from './styles';

// Dummy data for the table (can be replaced by API data)
const dummyData = [
  { id: 1, name: "John Doe", age: 30, location: "New York", email: "john@example.com", phone: "555-1234", address: "123 Main St", city: "New York", state: "NY", country: "USA" },
  { id: 2, name: "Jane Smith", age: 25, location: "London", email: "jane@example.com", phone: "555-5678", address: "456 Elm St", city: "London", state: "LDN", country: "UK" },
  { id: 3, name: "Mark Johnson", age: 40, location: "Los Angeles", email: "mark@example.com", phone: "555-9012", address: "789 Oak St", city: "Los Angeles", state: "CA", country: "USA" },
  // Add more rows as needed
];

function App() {
  const [data, setData] = useState(dummyData);

  // Function to export table data to Excel
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data); // Convert data to sheet format
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Append the sheet to the workbook

    // Export the workbook to Excel file
    XLSX.writeFile(wb, "table_data.xlsx");
  };

  return (
    <Container>
      <ContentWrapper>
        <Component>
          <TitleBox>
            <h2>Table Title</h2>
          </TitleBox>
          <TableContainer>
            {/* Export Button aligned to the right */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
              <Button onClick={handleExport}>Export to Excel</Button>
            </div>

            {/* Table */}
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Location</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.age}</td>
                    <td>{row.location}</td>
                    <td>{row.email}</td>
                    <td>{row.phone}</td>
                    <td>{row.address}</td>
                    <td>{row.city}</td>
                    <td>{row.state}</td>
                    <td>{row.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </Component>
      </ContentWrapper>

      {/* Form Section */}
      <FormContainer>
        <h3>Form Section</h3>
        {/* Add your form elements here */}
      </FormContainer>
    </Container>
  );
}

export default App;
