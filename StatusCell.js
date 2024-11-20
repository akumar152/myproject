
import React from "react";
import styled from "styled-components";

const MyPage = () => {
  return (
    <Container>
      {/* First Section */}
      <RedBox>Red Box</RedBox>

      {/* Second Section - Table */}
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>25</td>
              <td>USA</td>
            </tr>
            <tr>
              <td>Jane</td>
              <td>30</td>
              <td>Canada</td>
            </tr>
            <tr>
              <td>Sam</td>
              <td>22</td>
              <td>UK</td>
            </tr>
          </tbody>
        </Table>
      </TableContainer>

      {/* Third Section */}
      <ItemBox>
        <p>Item 1</p>
        <p>Item 2</p>
        <p>Item 3</p>
      </ItemBox>
    </Container>
  );
};

export default MyPage;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;

  /* Responsive Design */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const RedBox = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const TableContainer = styled.div`
  flex: 1;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f4f4f4;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;

  /* Responsive Design */
  @media (max-width: 768px) {
    align-items: center;
  }
`;
