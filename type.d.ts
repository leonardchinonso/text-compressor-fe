interface ICompressionMetric {
    key: string
    algorithm: string
    timeTaken: string
    bitRate: string
    compressionRatio: string
    memoryUsed: string
}

export interface ICompressionMetricState {
    singleThreadMetrics: ICompressionMetric[]
    multiThreadMetrics: ICompressionMetric[],
}

// export type CompressionContextType = {
//     compressionMetrics: ICompressionMetric[];
//     updateCompressionMetrics: (compressionMetrics: ICompressionMetric[]) => void;
// };

export type CompressionContextType = {
    compressionMetrics: ICompressionMetricState;
    updateCompressionMetrics: (compressionMetricState: ICompressionMetricState) => void;
};

// type CompressionMetricState = {
//     compressionMetrics: ICompressionMetric[]
// }

// type CompressionMetricAction = {
//     type: string
//     compressionMetrics: ICompressionMetric[]
// }

// type DispatchType = (args: CompressionMetricAction) => CompressionMetricAction
