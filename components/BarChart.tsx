import React, {useState, useEffect, useContext} from 'react';
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
import * as _ from "lodash";
import { computeDatasets, IBarchart } from '@/utils/barChart';
import { CompressionContext } from '@/context/context';
import { CompressionContextType } from '@/type';

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
    const [chartsData, setChartsData] = useState<IBarchart[] | null>(null);
    const [chartOptions, setChartOptions] = useState<ChartOptions[]>([]);
    let { compressionMetrics } = useContext(CompressionContext) as CompressionContextType;

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
    
    const serverChartsData = computeDatasets(compressionMetrics);

    // set chart options
    const chartOpts: ChartOptions[] = [];
    serverChartsData.forEach(function (chartData) {
        const opts = _.cloneDeep(defaultOpts);
        opts.plugins.title.text = chartData.title
        chartOpts.push(opts);
    });

    useEffect(() => {
        setChartsData(serverChartsData)
        setChartOptions(chartOpts)
    }, [])

    return (
        <div className="grid sm:grid-cols-2 grid-cols-2 gap-x-40 gap-y-20 pt-20 justify-between px-10">
            {chartsData?.map((chartData, idx) => (
                <div key={idx}>
                    <Bar data={chartData.data} options={chartOptions[idx]}/>
                </div>
            ))}
        </div>
    );
};

export default BarChart;

