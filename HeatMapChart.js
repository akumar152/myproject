import React from 'react';
import ReactECharts from 'echarts-for-react';

const HeatMapComponent = ({ data }) => {
    const option = {
        tooltip: {
            position: 'top'
        },
        grid: {
            left: 50,
            right: 10,
            bottom: 50,
            top: 50,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: data[0].data.map(item => item.x),
            axisLabel: {
                interval: 0
            }
        },
        yAxis: {
            type: 'category',
            data: data.map(item => item.id),
            axisLabel: {
                interval: 0,
                overflow: 'break'
            }
        },
        visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            inRange: {
                color: ['#fff5f5', '#ffcccc', '#ff9999', '#ff6666', '#ff4d4d', '#ff3333']
            }
        },
        series: [
            {
                name: 'Heatmap',
                type: 'heatmap',
                data: data.flatMap(item => item.data.map(d => [d.x, item.id, d.y])),
                label: {
                    show: true
                }
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

export default HeatMapComponent;
