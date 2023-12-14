import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const HuffmanEncoding = 'Huffman Encoding';
export const LempelZivWelch = 'Lempel Ziv Welch';
export const BurrowsWheelerTransform = 'Burrows Wheeler Transform';
export const RunLengthEncoding = 'Run Length Encoding';
export const BurrowsWheelerRunLength = 'Burrows Wheeler Run Length';
export const Algorithms = [
    HuffmanEncoding,
    BurrowsWheelerTransform,
    RunLengthEncoding,
    BurrowsWheelerRunLength,
    LempelZivWelch
];