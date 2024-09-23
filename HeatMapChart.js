import React from 'react';
import ReactECharts from 'echarts-for-react';

const StackedBarChart = ({ data }) => {
    // Extract unique country names for the x-axis
    const xAxisData = data.map(item => item.id);

    // Extract unique statuses for the legend and series
    const statuses = [...new Set(data.flatMap(item => item.data.map(d => d.x)))];

    // Generate series data for each status
    const seriesData = statuses.map(status => ({
        name: status,
        type: 'bar',
        stack: 'total', // Stack bars on top of each other
        data: xAxisData.map(country => {
            // Find the corresponding y value for each status and country
            const countryData = data.find(item => item.id === country);
            const statusData = countryData ? countryData.data.find(d => d.x === status) : null;
            return statusData ? statusData.y : 0;
        }),
        label: {
            show: true,
            position: 'inside', // Position labels inside the bar
        }
    }));

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '15%', // Adjust bottom to create more space between the chart and the legend
            top: '10%',
            containLabel: true,
        },
        legend: {
            data: statuses,
            bottom: 10, // Position the legend above the bottom, creating some gap
            padding: [10, 0, 0, 0], // Add padding on the top to give some space above the legend
        },
        xAxis: {
            type: 'category',
            data: xAxisData, // Country names on the x-axis
            axisLabel: {
                interval: 0,
                rotate: 0, // Keep the labels horizontal
            },
        },
        yAxis: {
            type: 'value',
        },
        series: seriesData, // Status-specific data for each country
    };

    return (
        <div style={{
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden', // Prevent overflow issues
        }}>
            <ReactECharts
                option={option}
                style={{
                    height: '400px', // Adjust height as needed
                    width: '100%', // Let the chart take up full width of the container
                    maxWidth: '100%', // Ensure it doesn't exceed the container
                }}
            />
        </div>
    );
};

export default StackedBarChart;
