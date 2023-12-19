import { ICompressionMetric } from "@/type";

type BarchartLabel = string[];

interface BarchartDataset {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
}

interface BarchartData {
    labels: BarchartLabel
    datasets: BarchartDataset[]
}

export interface IBarchart {
    title: string
    data: BarchartData
}

export function computeDatasets(metrics: ICompressionMetric[]): IBarchart[] {
    const backgroundColors = ['rgba(125,0,166,0.7)', 'rgba(166,69,0,0.7)', 'rgba(0,166,58,0.7)', 'rgba(0,116,166,0.7)'];
    const algorithms: BarchartLabel = [];
    const bitRateData: number[] = [];
    const compressionRatioData: number[] = [];
    const memoryUsedData: number[] = [];
    const timeTakenData: number[] = [];
    const borderColor = 'rgb(19,19,19)';

    metrics.forEach((metric) => {
        algorithms.push(metric.algorithm);
        bitRateData.push(parseFloat(metric.bitRate));
        compressionRatioData.push(parseFloat(metric.compressionRatio));
        memoryUsedData.push(parseFloat(metric.memoryUsed));
        timeTakenData.push(parseFloat(metric.timeTaken));
    });

    const barchartInformation: IBarchart[] = [
        {
            title: "Bit Rate",
            data: {
                labels: algorithms,
                datasets: [{
                    label: "mb/s",
                    data: bitRateData,
                    borderColor: borderColor,
                    backgroundColor: backgroundColors[0],
                }]
            }
        },
        {
            title: "Compression Ratio",
            data: {
                labels: algorithms,
                datasets: [{
                    label: "",
                    data: compressionRatioData,
                    borderColor: borderColor,
                    backgroundColor: backgroundColors[1],
                }]
            }
        },
        {
            title: "Time Taken",
            data: {
                labels: algorithms,
                datasets: [{
                    label: "ms",
                    data: timeTakenData,
                    borderColor: borderColor,
                    backgroundColor: backgroundColors[2],
                }]
            }
        },
        {
            title: "Memory Used",
            data: {
                labels: algorithms,
                datasets: [{
                    label: "Bytes",
                    data: bitRateData,
                    borderColor: borderColor,
                    backgroundColor: backgroundColors[3],
                }]
            }
        }
    ];

    return barchartInformation;
}