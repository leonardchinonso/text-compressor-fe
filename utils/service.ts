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
