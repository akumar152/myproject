import styled from 'styled-components';

// Wrapper for the entire content (Title + Table + other tiles)
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;

  /* Custom Scrollbar Styling */
  &::-webkit-scrollbar {
    width: 10px; /* Adjust scrollbar width */
    background-color: #f0f0f0; /* Light gray background */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c0c0c0; /* Slightly darker gray for the thumb */
    border-radius: 5px; /* Rounded corners */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a0; /* Darker gray on hover */
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0; /* Track background */
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;
