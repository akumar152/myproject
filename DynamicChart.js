import React from 'react';
import ReactECharts from 'echarts-for-react';

const DynamicChart = ({ data }) => {
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{a}: {c}'
        },
        xAxis: {
            type: 'category',
            data: data.map(d => d.country),
            axisLabel: {
                interval: 0, // Display all labels
                rotate: 0,   // Set rotation to 0 degrees (horizontal)
                overflow: 'truncate', // Truncate overflowing labels
                align: 'center',
                verticalAlign: 'middle',
            }
        },
        yAxis: {
            type: 'value',
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '20%', // Increase space at the bottom for the legend
            containLabel: true,
        },
        series: [
            {
                name: 'Active',
                type: 'bar',
                data: data.map(d => d.active),
                barWidth: '40%',
            },
            {
                name: 'Inactive',
                type: 'bar',
                data: data.map(d => d.inactive),
                barWidth: '40%',
            }
        ]
    };

    // Color mapping for legend
    const colorMap = {
        'Active': '#4CAF50', // Green color for active
        'Inactive': '#FFC107' // Amber color for inactive
    };

    return (
        <div style={{
            width: '100%',
            height: '300px',
            boxSizing: 'border-box',
            padding: '0',
            marginBottom: '16px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{ flex: '1', position: 'relative' }}>
                <ReactECharts
                    option={option}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                />
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10px',
                gap: '10px',
            }}>
                {Object.entries(colorMap).map(([name, color]) => (
                    <div key={name} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '20px',
                    }}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: color,
                            border: '1px solid #ddd',
                            marginRight: '8px',
                        }} />
                        <span>{name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DynamicChart;
