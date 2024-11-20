import React,{useState,useEffect} from 'react';
import Title from './components/Title';         // Title component
import Table from './components/HeaderAndTable';         // Table component
import FormSection from './components/FormSection'; // Form Section component
import { Container, ContentWrapper, Component, FormContainer } from './components/styles'; // Import styled-components

function App() {

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // Fetch API data here
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Replace with your API URL
        const result = await response.json();

        // Example: Setting dynamic columns (based on the keys in your API data)
        const columnNames = Object.keys(result[0] || {}).map(col => col.charAt(0).toUpperCase() + col.slice(1)); // Capitalize headers
        
        setColumns(columnNames);  // Set dynamic headers based on the keys of the fetched data
        setData(result);  // Set the data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const dummyData = [
    { id: 1, name: 'John Doe', age: 30, location: 'New York', email: 'johndoe@gmail.com', phone: '123-456-7890', country: 'USA', occupation: 'Developer', company: 'TechCorp', status: 'Active' },
    { id: 2, name: 'Jane Smith', age: 25, location: 'London', email: 'janesmith@gmail.com', phone: '123-456-7891', country: 'UK', occupation: 'Designer', company: 'CreativeLabs', status: 'Inactive' },
    { id: 3, name: 'Mike Johnson', age: 35, location: 'Paris', email: 'mikej@gmail.com', phone: '123-456-7892', country: 'France', occupation: 'Manager', company: 'BusinessCo', status: 'Active' },
    { id: 4, name: 'Emily Davis', age: 40, location: 'Berlin', email: 'emilyd@gmail.com', phone: '123-456-7893', country: 'Germany', occupation: 'Engineer', company: 'TechWorks', status: 'Active' },
    { id: 5, name: 'Chris Brown', age: 28, location: 'Sydney', email: 'chrisb@gmail.com', phone: '123-456-7894', country: 'Australia', occupation: 'Marketer', company: 'MarketPro', status: 'Inactive' },
    { id: 6, name: 'Sarah Miller', age: 32, location: 'Toronto', email: 'sarahm@gmail.com', phone: '123-456-7895', country: 'Canada', occupation: 'Consultant', company: 'ConsultCo', status: 'Active' },
    { id: 7, name: 'David Wilson', age: 45, location: 'Los Angeles', email: 'davidw@gmail.com', phone: '123-456-7896', country: 'USA', occupation: 'Director', company: 'FilmCorp', status: 'Active' },
    { id: 8, name: 'Sophia Martinez', age: 38, location: 'Madrid', email: 'sophiam@gmail.com', phone: '123-456-7897', country: 'Spain', occupation: 'Photographer', company: 'PhotoCo', status: 'Inactive' },
    { id: 9, name: 'Daniel Lee', age: 22, location: 'Hong Kong', email: 'daniellee@gmail.com', phone: '123-456-7898', country: 'China', occupation: 'Student', company: 'N/A', status: 'Active' },
    { id: 10, name: 'Olivia Harris', age: 29, location: 'Tokyo', email: 'oliviah@gmail.com', phone: '123-456-7899', country: 'Japan', occupation: 'Teacher', company: 'SchoolCo', status: 'Active' },
  ];

  // Column names for the table (10 columns)
  const column = ['Id', 'Name', 'Age', 'Location', 'Email', 'Phone', 'Country', 'Occupation', 'Company', 'Status'];
  return (
    <Container>
      <ContentWrapper>
        {/* Component 1 */}
        <Component>
          <div style={{marginTop:0, alignItems:'flex-start'}}>
            <Title />
          </div>

          <Table data={dummyData} columns={column} />
        </Component>

        {/* Component 2 */}
        <Component>
          <Title />
          <Table />
        </Component>

        {/* Component 3 */}
        <Component>
          <Title />
          <Table />
        </Component>
      </ContentWrapper>

      {/* Form Section */}
      <FormContainer>
        <FormSection type="component1" />
      </FormContainer>
    </Container>
  );
}

export default App;
