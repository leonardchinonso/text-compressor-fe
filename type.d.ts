interface ICompressionMetric {
    key: string
    algorithm: string
    timeTaken: string
    bitRate: string
    compressionRatio: string
    memoryUsed: string
}

// export interface ICompressionMetricState {
//     compressionMetrics: ICompressionMetric[]
// }

export type CompressionContextType = {
    compressionMetrics: ICompressionMetric[];
    updateCompressionMetrics: (compressionMetrics: ICompressionMetric[]) => void;
};

type CompressionMetricState = {
    compressionMetrics: ICompressionMetric[]
}

type CompressionMetricAction = {
    type: string
    compressionMetrics: ICompressionMetric[]
}

type DispatchType = (args: CompressionMetricAction) => CompressionMetricAction
