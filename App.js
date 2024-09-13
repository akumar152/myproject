import React, { useState, useEffect } from 'react';
import MapComponent from './components/WorldMap';
import TableComponent from './components/DynamicTable';
import HeatMapComponent from './components/HeatMapChart';
import BarChartComponent from './components/DynamicChart';

const data = [
  { "id": 1, "type": "map", "name": "worldMap" },
  {
    "id": 2, "type": "table", "name": "table", "data": [
      { market: 'Malaysia', bronze: 'completed', bronzeTarget: 'In-progress', silver: 'Older Modal', silverTarget: 'Older Modal', gold: 'Older Modal', goldTarget: 'Older Modal' },
      { market: 'Hong Kong', bronze: 'In-progress', bronzeTarget: 'In-progress', silver: 'In-progress', silverTarget: 'In-progress', gold: 'Not Started', goldTarget: 'Not Started' }, 
      { market: 'Indonesia', bronze: 'In-progress', bronzeTarget: 'In-progress', silver: 'Not Started', silverTarget: 'Not Started', gold: 'Not Started', goldTarget: 'Not Started' },  
      { market: 'Singapore', bronze: 'Lost Data', bronzeTarget: 'Lost Data', silver: 'Lost Data', silverTarget: 'Lost Data', gold: 'Not Started', goldTarget: 'Not Started' },
      { market: 'Philippines', bronze: 'Not Started', bronzeTarget: 'Not Started', silver: 'Not Started', silverTarget: 'Not Started', gold: 'Not Started', goldTarget: 'Not Started' },    
      { market: 'Thailand', bronze: 'Not Started', bronzeTarget: 'Not Started', silver: 'Not Started', silverTarget: 'Not Started', gold: 'Not Started', goldTarget: 'Not Started' }
    ]

  },
  {
    "id": 3, "type": "chart", "name": "HeatMap", "data": [
      { id: "Malaysia", data: [{ x: "Critical", y: 50 }, { x: "Pending", y: 80 }, { x: "In-Progress", y: 90 }, { x: "Not Started", y: 70 }] },
      { id: "Indonesia", data: [{ x: "Critical", y: 25 }, { x: "Pending", y: 80 }, { x: "In-Progress", y: 60 }, { x: "Not Started", y: 20 }] },
      { id: "Hong Kong", data: [{ x: "Critical", y: 30 }, { x: "Pending", y: 10 }, { x: "In-Progress", y: 50 }, { x: "Not Started", y: 45 }] },
      { id: "Philippines", data: [{ x: "Critical", y: 90 }, { x: "Pending", y: 80 }, { x: "In-Progress", y: 100 }, { x: "Not Started", y: 70 }] },
      { id: "Singapore", data: [{ x: "Critical", y: 40 }, { x: "Pending", y: 60 }, { x: "In-Progress", y: 75 }, { x: "Not Started", y: 55 }] },
      { id: "Thailand", data: [{ x: "Critical", y: 35 }, { x: "Pending", y: 45 }, { x: "In-Progress", y: 85 }, { x: "Not Started", y: 65 }] }
    ]
  },
  {
    "id": 4, "type": "chart", "name": "barchart", "data": [
      { country: 'Malaysia', active: 13000, inactive: 5000 },
      { country: 'Indonesia', active: 20000, inactive: 8000 },
      { country: 'Hong Kong', active: 15000, inactive: 6000 },
      { country: 'Philippines', active: 9000, inactive: 4000 },
      { country: 'Singapore', active: 12000, inactive: 4500 },
      { country: 'Thailand', active: 10000, inactive: 3000 }
    ]

  }
];

const SectionList = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const SectionList = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const views = [
    { name: 'Age', value: '25' },
    { name: 'Score', value: '89' },
    { name: 'Height', value: '6ft' },
    { name: 'Weight', value: '75kg' },
  ];

  const dropdownOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: '20px',
    padding: '20px',
    boxSizing: 'border-box',
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '400px', // Restrict maximum height
    maxWidth: '100%',   // Restrict maximum width
    overflow: 'hidden',
  };

  const titleStyle = {
    margin: '0 0 10px',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const contentStyle = {
    flex: '1',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const mapStyle = {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '300px',  // Limit map height to fit in card
    objectFit: 'contain',
  };

  const tableStyle = {
    width: '100%',
    overflowX: 'auto',
  };

  return (
    <div style={containerStyle}>
      {data.map(item => {
        const { id, type, name, data } = item;
        let Component;

        switch (type) {
          case 'map':
            Component = () => <MapComponent style={mapStyle} />;
            break;
          case 'table':
            Component = () => <TableComponent data={data} style={tableStyle} />;
            break;
          case 'chart':
            if (name === 'HeatMap') {
              Component = () => <HeatMapComponent data={data} />;
            } else if (name === 'barchart') {
              Component = () => <BarChartComponent data={data} />;
            }
            break;
          default:
            return null;
        }

        return (
          <div key={id} style={cardStyle}>
            <h2 style={titleStyle}>{name}</h2>
            <div style={contentStyle}>
              <Component />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SectionList;
