import React from 'react';
import ReactECharts from 'echarts-for-react';

const StackedBarChart = ({ data }) => {
    const xAxisData = data.map(item => item.id);
    const statuses = [...new Set(data.flatMap(item => item.data.map(d => d.x)))];

    // Define colors for each status
    const statusColors = {
        'Critical': '#FF0000',  // Red for Critical
        'Not Started': '#A9A9A9', // Gray for Not Started
        'Pending': '#FFA500',     // Orange for Pending
        'In Process': '#008000',  // Green for In Process
        // Add more colors as needed
    };

    const seriesData = statuses.map(status => ({
        name: status,
        type: 'bar',
        stack: 'total',
        data: xAxisData.map(country => {
            const countryData = data.find(item => item.id === country);
            const statusData = countryData ? countryData.data.find(d => d.x === status) : null;
            return statusData ? statusData.y : 0;
        }),
        label: {
            show: true,
            position: 'inside',
        },
        itemStyle: {
            color: statusColors[status] || '#999' // Use the color from statusColors, or default to gray
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
            bottom: '15%',
            top: '10%',
            containLabel: true,
        },
        legend: {
            data: statuses,
            bottom: 10,
            padding: [10, 0, 0, 0],
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
                interval: 0,
                rotate: 0,
            },
        },
        yAxis: {
            type: 'value',
        },
        series: seriesData,
    };

    return (
        <div style={{
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden',
        }}>
            <ReactECharts
                option={option}
                style={{
                    height: '400px',
                    width: '100%',
                    maxWidth: '100%',
                }}
            />
        </div>
    );
};

export default StackedBarChart;
