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
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Active',
                type: 'bar',
                data: data.map(d => d.active),
            },
            {
                name: 'Inactive',
                type: 'bar',
                data: data.map(d => d.inactive),
            }
        ]
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '100%', // Ensure it doesn't exceed the container width
            overflowX: 'auto', // Enable horizontal scrolling when needed
            boxSizing: 'border-box' // Ensure padding and border are included in width
        }}>
            <ReactECharts
                option={option}
                style={{
                    height: '300px',
                    width: '100%', // Ensure the chart takes up full width of its container
                    minWidth: '600px' // Set a minimum width to ensure scroll when necessary
                }}
            />
        </div>
    );
};

export default DynamicChart;
