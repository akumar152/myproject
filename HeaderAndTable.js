import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState([]);

  // Fetch the data from the API
  useEffect(() => {
    axios.get('your-api-endpoint-here')
      .then(response => {
        const fetchedData = response.data;

        // Sort the data by denominator (the value after "/") in descending order
        const sortedData = fetchedData.sort((a, b) => {
          const denominatorA = parseInt(a.columnName.split('/')[1], 10); // Get the denominator of a
          const denominatorB = parseInt(b.columnName.split('/')[1], 10); // Get the denominator of b

          // Compare denominators and return the result in descending order
          return denominatorB - denominatorA;
        });

        // Set the sorted data
        setData(sortedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Sorted Data</h1>
      <table>
        <thead>
          <tr>
            <th>Var</th>
            <th>Count</th>
            <th>Unique Count</th>
            <th>Datatype</th>
            <th>Column Name</th> {/* This is the column you want to sort */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.var}</td>
              <td>{item.count}</td>
              <td>{item.uniqueCount}</td>
              <td>{item.datatype}</td>
              <td>{item.columnName}</td> {/* Display the value with "4/4", "2/4" etc */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyComponent;
