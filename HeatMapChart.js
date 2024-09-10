import React from 'react';
import ReactECharts from 'echarts-for-react';

const StackedBarChart = ({ data }) => {
    // Extract unique categories for the x-axis (statuses like "Critical", "Pending", etc.)
    const xAxisData = [...new Set(data.flatMap(item => item.data.map(d => d.x)))];

    // Generate series data for each country
    const seriesData = data.map(item => ({
        name: item.id,
        type: 'bar',
        stack: 'total', // Stack bars on top of each other
        data: xAxisData.map(status => {
            // Find the corresponding y value for each status
            const statusData = item.data.find(d => d.x === status);
            return statusData ? statusData.y : 0;
        }),
        label: {
            show: true,
            position: 'inside',
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
            bottom: '20%', // Adjust bottom to create more space between the chart and the legend
            top: '10%',
            containLabel: true
        },
        legend: {
            data: data.map(item => item.id),
            bottom: 10, // Position the legend above the bottom, creating some gap
            padding: [10, 0, 0, 0] // Add padding on the top to give some space above the legend
        },
        xAxis: {
            type: 'category',
            data: xAxisData, // Status categories on the x-axis
            axisLabel: {
                interval: 0,
                rotate: 0, // Keep the labels horizontal
            }
        },
        yAxis: {
            type: 'value'
        },
        series: seriesData // Country-specific data for each status
    };

    return (
        <div style={{
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden' // Prevent overflow issues
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
