import { CompressionMetricState, ICompressionMetric } from "@/type";

export interface BenchmarkRequest {
    text: string;
    multithread: boolean;
}

export interface BenchmarkResponse {
    algorithm: string;
    encoded: string;
    decoded: string;
    time_taken: string;
    bit_rate: string;
    compression_ratio: string;
    memory_used: string;
}

function intoCompressionMetric(response: BenchmarkResponse, index: number): ICompressionMetric {
    return {
        key: index.toString(),
        algorithm: response.algorithm,
        timeTaken: response.time_taken,
        bitRate: response.bit_rate,
        compressionRatio: response.compression_ratio,
        memoryUsed: response.memory_used,
    };
}

export function intoCompressionMetrics(responses: BenchmarkResponse[]): ICompressionMetric[] {
    return responses.map((response, index) => intoCompressionMetric(response, index));
}

export function formatCompressionMetrics(metrics: ICompressionMetric[]): ICompressionMetric[] {
    return metrics.map((metric) => {
        return {
            ...metric,
            timeTaken: metric.timeTaken + " ns",
            bitRate: metric.bitRate + " mb/s",
            memoryUsed: metric.memoryUsed + " bytes",
        };
    });
}
