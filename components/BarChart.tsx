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
import { CompressionContextType, ICompressionMetric } from '@/type';

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

const BarChart = ({threadType}: {threadType: "single" | "multi"}) => {
    const [chartsData, setChartsData] = useState<IBarchart[] | null>(null);
    const [chartOptions, setChartOptions] = useState<ChartOptions[]>([]);
    let { compressionMetrics } = useContext(CompressionContext) as CompressionContextType;

    let serverChartsData: IBarchart[] = [];
    threadType === "single" ? serverChartsData = computeDatasets(compressionMetrics.singleThreadMetrics) : computeDatasets(compressionMetrics.multiThreadMetrics);

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

    // set chart options
    const chartOpts: ChartOptions[] = [];
    serverChartsData.forEach(function (chartData) {
        const opts = _.cloneDeep(defaultOpts);
        opts.plugins.title.text = chartData.title
        chartOpts.push(opts);
    });

    // setChartsData(serverChartsData);
    // setChartOptions(chartOpts);

    useEffect(() => {
        // console.log("SERVER CHARTS DATA: ", serverChartsData);
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

