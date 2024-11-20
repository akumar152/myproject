import styled from 'styled-components';

// Container for the whole layout
export const Container = styled.div`
  display: flex;
  height: 100vh; // Full viewport height
  flex-direction: row; // Horizontal layout by default
  
  @media (max-width: 768px) {
    flex-direction: column; // Stack vertically on smaller screens
    height: auto;  // Auto height when stacking vertically
  }
`;

// Wrapper for the content section (title + table sections)
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;  // Stack components vertically
  width: 70%; // Content (title + table) takes 70% of the width on larger screens
  padding: 20px;
  overflow-x: auto; // Allow horizontal scrolling for the table if needed

  @media (max-width: 768px) {
    width: 100%;  // Take full width on smaller screens
    padding: 10px; // Adjust padding on small screens
  }
`;

// Individual component styling for horizontal layout (title + table)
export const Component = styled.div`
  display: flex;
  flex-direction: row;  // Ensure the title and table are next to each other horizontally
  align-items: flex-start; // Align title and table to the top
  margin-bottom: 20px; // Space between components

  @media (max-width: 768px) {
    flex-direction: column;  // Stack vertically on small screens
    margin-bottom: 15px; // Adjust space for small screens
  }
`;

// Title box styling (aligned left with background color and border radius)
export const TitleBox = styled.div`
  background-color: #007bff; // Background color for the title box
  border-radius: 8px; // Border radius for rounded corners
  padding: 10px 20px; // Padding for some spacing inside the title box
  color: white; // White color for the text
  margin-right: 20px; // Add space between title and table

  h2 {
    margin: 0; // Remove default margin for heading
    font-size: 24px; // Adjust font size if necessary
  }

  @media (max-width: 768px) {
    margin-bottom: 15px; // Reduce margin on small screens
    padding: 8px 15px; // Adjust padding on small screens
    font-size: 20px; // Adjust font size for small screens
  }
`;

// Table styling with scroll functionality
export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; // Horizontal scrolling enabled for the table

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 12px; // Adjust padding for table cells on small screens
    }
  }
`;

// Form section container aligned to the right side and takes full height
export const FormContainer = styled.div`
  width: 30%;  // Form takes up 30% of the screen width on larger screens
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;  // Align form section to top
  height: 100vh; // Full height of the viewport
  position: sticky;
  top: 0;  // Ensure it stays fixed as you scroll the content
  
  background-color: #f4f4f4; // Light gray background for the form
  border-radius: 10px; // Rounded corners for the form container
  
  // Media query adjustments for smaller screens
  @media (max-width: 768px) {
    width: 100%; // Take full width on smaller screens
    height: auto; // Auto height for form on small screens
    position: relative; // Positioning change for small screens
    margin-top: 20px; // Add space between form and table content on smaller screens
  }
`;

// Form Section container
export const FormSectionContainer = styled.div`
  margin-top: 20px;

  h3 {
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    margin-top: 15px; // Adjust space on small screens
  }
`;

// Form group styling
export const FormGroup = styled.div`
  margin-bottom: 10px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input, select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    margin-bottom: 8px; // Adjust space between inputs on small screens
  }
`;

// Button styling
export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 12px; // Adjust padding on small screens
  }
`;
