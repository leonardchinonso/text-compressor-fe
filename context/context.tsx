import React, { createContext, useContext, useState } from "react";
import { CompressionContextType, ICompressionMetric } from "../type";

// const initialState = {
//   compressionMetricState: {} as CompressionMetricState,
//   setCompressionMetricState: (s: CompressionMetricState) => void,
// }

// interface IContext {
//   compressionMetricState: CompressionMetricState;
//   setCompressionMetricState: React.Dispatch<React.SetStateAction<CompressionMetricState>>;
// }

export const CompressionContext = React.createContext<CompressionContextType | null>(null);

// const CompressionMetricData = createContext(initialState);

const CompressionContextProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [compressionMetrics, setCompressionMetrics] = useState<(ICompressionMetric[])>([
      {
        key: "1",
        algorithm: "Huffman Encoding",
        compressionRatio: "1.57783",
        timeTaken: "40390ms",
        bitRate: "3.75mb/s",
        memoryUsed: "751KB",
      },
      {
        key: "2",
        algorithm: "Burrows-Wheeler Transform",
        compressionRatio: "2.2948",
        timeTaken: "34300ms",
        bitRate: "1.05mb/s",
        memoryUsed: "500KB",
      },
    ]);

    const updateCompressionMetrics = (compressionMetrics: ICompressionMetric[]) => {
      setCompressionMetrics(compressionMetrics);
    }

    return (
        <CompressionContext.Provider value={{compressionMetrics, updateCompressionMetrics}}>
        {children}
        </CompressionContext.Provider>
    );
}

export const useCompressionContext = () => useContext(CompressionContext);

export default CompressionContextProvider;
