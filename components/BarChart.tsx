import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Algorithms} from "@/utils/utils";
import * as _ from "lodash";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ChartOptions {
    plugins: {
        legend: {
            position: "top" | "center" | "left" | "right" | "bottom" | "chartArea"
        }, title: { display: boolean, text: string } },
    maintainAspectRatio: boolean,
    responsive: boolean
}

const BarChart = () => {
    let chartOpts: ChartOptions[] = [];
    const initLabels: string[] = ["Sample1", "Sample2", "Sample3"];
    const [chartsData, setChartsData] = useState([
        {
            data: {
                labels: initLabels,
                datasets: [{
                    label: 'mb/s',
                    data: [3.75, 1.05, 3, 0.5],
                    borderColor: 'rgb(19,19,19)',
                    backgroundColor: 'rgb(0,116,166)',
                }]
            },
            title: "Sample 1"
        },
        {
            data: {
                labels: initLabels,
                datasets: [{
                    label: 'mb/s',
                    data: [1, 2, 3, 3],
                    borderColor: 'rgb(19,19,19)',
                    backgroundColor: 'rgb(0,116,166)',
                }]
            },
            title: "Sample 2"
        },
        {
            data: {
                labels: initLabels,
                datasets: [{
                    label: 'mb/s',
                    data: [1, 2, 3, 3],
                    borderColor: 'rgb(19,19,19)',
                    backgroundColor: 'rgb(0,116,166)',
                }]
            },
            title: "Sample 3"
        },
        {
            data: {
                labels: initLabels,
                datasets: [{
                    label: 'mb/s',
                    data: [1, 2, 3, 3],
                    borderColor: 'rgb(19,19,19)',
                    backgroundColor: 'rgb(0,116,166)',
                }]
            },
            title: "Sample 4"
        },
    ]);

    const defaultOpts: ChartOptions = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: ''
            }
        },
        maintainAspectRatio: true,
        responsive: true
    }

    const [chartOptions, setChartOptions] = useState(chartOpts);

    // get datasets from API
    const bitRateDataset = {
        data: {
            labels: Algorithms,
            datasets: [{
                label: 'mb/s',
                data: [3.75, 1.05, 3, 0.5],
                borderColor: 'rgb(19,19,19)',
                backgroundColor: 'rgba(125,0,166,0.7)',
            }]
        },
        title: "Bit Rate"
    };

    const compressionTimeDataset = {
        data: {
            labels: Algorithms,
            datasets: [{
                label: 'ms',
                data: [40390, 34300, 78933, 19000],
                borderColor: 'rgb(19,19,19)',
                backgroundColor: 'rgba(166,69,0,0.7)',
            }]
        },
        title: "Compression Time"
    };

    const decompressionTimeDataset = {
        data: {
            labels: Algorithms,
            datasets: [{
                label: 'ms',
                data: [23700, 12400, 20000, 23700],
                borderColor: 'rgb(19,19,19)',
                backgroundColor: 'rgba(0,166,58,0.7)',
            }]
        },
        title: "Decompression Time"
    };

    const memoryUsageDataset = {
        data: {
            labels: Algorithms,
            datasets: [{
                label: 'KB',
                data: [751, 500, 1251, 1024],
                borderColor: 'rgb(19,19,19)',
                backgroundColor: 'rgba(0,116,166,0.7)',
            }]
        },
        title: "Memory Usage"
    };

    // get charts data from API
    const serverChartsData = [bitRateDataset, compressionTimeDataset, decompressionTimeDataset, memoryUsageDataset];

    // set chart options
    serverChartsData.forEach(function (chartData) {
        const opts = _.cloneDeep(defaultOpts);
        opts.plugins.title.text = chartData.title
        chartOpts.push(opts);
    })

    useEffect(() => {
        setChartsData(serverChartsData)
        setChartOptions(chartOpts)
    }, [])

    return (
        <div className="grid sm:grid-cols-2 grid-cols-2 gap-x-40 gap-y-20 pt-20 justify-between px-10">
            {chartsData.map((chartData, idx) => (
                <div key={idx}>
                    <Bar data={chartData.data} options={chartOptions[idx]}/>
                </div>
            ))}
        </div>
    );
};

export default BarChart;

