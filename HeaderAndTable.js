import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data like "4/4", "0/4", "3/6"
  useEffect(() => {
    // Sample API response or static data
    const apiData = [
      { id: 1, value: "4/4" },
      { id: 2, value: "0/4" },
      { id: 3, value: "3/6" },
    ];

    // Sort by ratio (numerator / denominator)
    const sortedData = apiData.sort((a, b) => {
      const [numA, denA] = a.value.split('/').map(Number);  // Parse "4/4" into [4, 4]
      const [numB, denB] = b.value.split('/').map(Number);  // Parse "0/4" into [0, 4]
      
      // Calculate the ratio (numerator / denominator)
      const ratioA = numA / denA;
      const ratioB = numB / denB;

      // Compare ratios in descending order
      return ratioB - ratioA;  // For ascending, use `ratioA - ratioB`
    });

    setData(sortedData);  // Update state with sorted data
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Sorted Data by Ratio</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.value} (Ratio: {parseFloat(item.value.split('/')[0]) / parseFloat(item.value.split('/')[1])})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
