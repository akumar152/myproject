import React, { useState, useEffect } from 'react';
import MapComponent from './components/WorldMap';
import TableComponent from './components/DynamicTable';
import HeatMapComponent from './components/HeatMapChart';
import BarChartComponent from './components/DynamicChart';

const data = [
  { "id": 1, "type": "map", "name": "worldMap" },
  {
    "id": 2, "type": "table", "name": "table", "data": [
      { market: 'India', bronze: 'Not Started', bronzeTarget: 'In-progress', silver: 'completed', silverTarget: 'Older Modal', gold: 'Lost Data', goldTarget: 'Not Started' },
      { market: 'Indonesia', bronze: 'In-progress', bronzeTarget: 'completed', silver: 'Older Modal', silverTarget: 'Lost Data', gold: 'Not Started', goldTarget: 'In-progress' },
      { market: 'Hong Kong', bronze: 'completed', bronzeTarget: 'Older Modal', silver: 'Lost Data', silverTarget: 'Not Started', gold: 'In-progress', goldTarget: 'completed' },
      { market: 'Malaysia', bronze: 'Older Modal', bronzeTarget: 'Lost Data', silver: 'Not Started', silverTarget: 'In-progress', gold: 'completed', goldTarget: 'Older Modal' },
      { market: 'Philippines', bronze: 'Lost Data', bronzeTarget: 'Not Started', silver: 'In-progress', silverTarget: 'completed', gold: 'Older Modal', goldTarget: 'Lost Data' }
    ]
  },
  {
    "id": 3, "type": "chart", "name": "HeatMap", "data": [
      { id: "Malaysia", data: [{ x: "Critical", y: 50 }, { x: "Pending", y: 80 }, { x: "In-Progress", y: 90 }, { x: "Not Started", y: 70 }] },
      { id: "Indonesia", data: [{ x: "Critical", y: 25 }, { x: "Pending", y: 80 }, { x: "In-Progress", y: 60 }, { x: "Not Started", y: 20 }] },
      { id: "Hong Kong", data: [{ x: "Critical", y: 30 }, { x: "Pending", y: 10 }, { x: "In-Progress", y: 50 }, { x: "Not Started", y: 45 }] },
      { id: "Philippines", data: [{ x: "Critical", y: 90 }, { x: "Pending", y: 80 }, { x: "In-Progress", y: 100 }, { x: "Not Started", y: 70 }] }
    ]
  },
  {
    "id": 4, "type": "chart", "name": "barchart", "data": [
      { country: 'Malaysia', active: 13000, inactive: 5000 },
      { country: 'Indonesia', active: 20000, inactive: 8000 },
      { country: 'Hong Kong', active: 15000, inactive: 6000 },
      { country: 'Philippines', active: 9000, inactive: 4000 }
    ]
  }
];

const SectionList = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
