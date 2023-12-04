export interface BenchmarkRequest {
    file_path: string;
    algorithm: string;
}

export interface BenchmarkResponse {
    bit_rate: string;
    compression_ratio: string;
}