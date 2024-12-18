import React, { useState } from "react";
import styled from "styled-components";
import SynchronizedTablesDynamicWidth from "./components/DataTables";
import Modal from "./components/Modal";

// Dummy data
const dummyData = [
  { id: 1, name: "John Doe", age: 30, location: "New York", email: "john@example.com", phone: "555-1234" },
  { id: 2, name: "Jane Smith", age: 25, location: "London", email: "jane@example.com", phone: "555-5678" },
  { id: 3, name: "Mark Johnson", age: 40, location: "Los Angeles", email: "mark@example.com", phone: "555-9012" },
];

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  gap: 10px;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between; /* This positions buttons on opposite ends */
  width: 100%;
  margin-bottom: 10px;
`;

const LeftSection = styled.div`
  display: flex;
  gap: 10px;
  margin-left:90px;
`;

const RightSection = styled.div`
  display: flex;
  gap: 10px; /* Space between Filter and Form buttons */
`;

const TablesContainer = styled.div`
  width: 100%;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;

function App() {
  const [data] = useState(dummyData);
  const [showModal, setShowModal] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => setShowModal(!showModal);

  return (
    <AppContainer>
      {/* Top Section: Back button left, Form and Filter buttons right */}
      <TopSection>
        <LeftSection>
          <Button onClick={() => alert("Back button clicked!")}>Back</Button>
        </LeftSection>

        <RightSection>
          <Button onClick={() => alert("Filter button clicked!")}>Filter</Button>
          <Button onClick={toggleModal}>Open Form</Button>
        </RightSection>
      </TopSection>

      {/* Table Container */}
      <TablesContainer>
        <SynchronizedTablesDynamicWidth data={data} />
      </TablesContainer>

      {/* Modal */}
      {showModal && <Modal onClose={toggleModal} />}
    </AppContainer>
  );
}

export default App;
