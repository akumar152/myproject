import React from 'react';
import ReactECharts from 'echarts-for-react';

const BarLineChart = () => {
    const option = {

        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Infra cost', 'Resource cost'],
            top: '10%'
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        },
        yAxis: [
            {
                type: 'value',
                name: 'Infra cost',
            },
            {
                type: 'value',
                name: 'Resource cost',
            }
        ],
        series: [
            {
                name: 'Infra cost',
                type: 'bar',
                data: [320, 332, 301, 334, 390, 330, 320],
                itemStyle: {
                    color: '#73c0de'
                }
            },
            {
                name: 'Resource cost',
                type: 'line',
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                yAxisIndex: 1, // Use second y-axis for the line chart
                itemStyle: {
                    color: '#f39c12'
                }
            }
        ]
    };

    return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />;
};

export default BarLineChart;
