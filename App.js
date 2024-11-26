import React, { useState } from "react";
import styled from "styled-components";
import SynchronizedTablesDynamicWidth from "./components/DataTables";
import FormSection from './components/FormSection';

// Dummy data for the table (can be replaced by API data)
const dummyData = [
  { id: 1, name: "John Doe", age: 30, location: "New York", email: "john@example.com", phone: "555-1234", address: "123 Main St", city: "New York", state: "NY", country: "USA" },
  { id: 2, name: "Jane Smith", age: 25, location: "London", email: "jane@example.com", phone: "555-5678", address: "456 Elm St", city: "London", state: "LDN", country: "UK" },
  { id: 3, name: "Mark Johnson", age: 40, location: "Los Angeles", email: "mark@example.com", phone: "555-9012", address: "789 Oak St", city: "Los Angeles", state: "CA", country: "USA" },
 
  // Add more rows as needed
];

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 80vh;
  padding: 10px;
  box-sizing: border-box;
  gap: 10px;
`;

const TitleContainer = styled.div`
  flex: 1;
  // max-width: 30%;
  width: 100px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TablesContainer = styled.div`
  flex: 3;
  min-width: 80%;
`;

const FormContainer = styled.div`
  flex: 1;
  max-width: 20%;
  min-width: 250px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

function App() {
  const [data, setData] = useState(dummyData);

  return (
    <AppContainer>
      {/* Title Component */}
      {/* <TitleContainer>
        <h2>Title Component</h2>
        <p>This is the title or description section.</p>
      </TitleContainer> */}

      {/* SynchronizedTablesDynamicWidth */}
      <TablesContainer>
        <SynchronizedTablesDynamicWidth data={data} />
      </TablesContainer>

      {/* Form Component */}
      <FormContainer>
      <FormSection/>
      </FormContainer>
    </AppContainer>
  );
}

export default App;
