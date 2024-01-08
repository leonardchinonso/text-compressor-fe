import React, { createContext, useContext, useState } from "react";
import { CompressionContextType, ICompressionMetric, ICompressionMetricState } from "../type";


export const CompressionContext = React.createContext<CompressionContextType | null>(null);

const CompressionContextProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [compressionMetrics, setCompressionMetrics] = useState<(ICompressionMetricState)>({
      singleThreadMetrics: [
        {
          key: "1",
          algorithm: "Huffman Encoding",
          encoded: "abcdef",
          decoded: "010111",
          compressionRatio: "1.57783",
          timeTaken: "40390ms",
          bitRate: "3.75mb/s",
          memoryUsed: "751KB",
        },
        {
          key: "2",
          algorithm: "Burrows-Wheeler Transform",
          encoded: "abcdef",
          decoded: "fbadec$",
          compressionRatio: "2.2948",
          timeTaken: "34300ms",
          bitRate: "1.05mb/s",
          memoryUsed: "500KB",
        },
      ],
      multiThreadMetrics: [
        {
          key: "1",
          algorithm: "Huffman Encoding",
          encoded: "abcdef",
          decoded: "010111",
          compressionRatio: "1.57783",
          timeTaken: "40390ms",
          bitRate: "3.75mb/s",
          memoryUsed: "751KB",
        },
        {
          key: "2",
          algorithm: "Burrows-Wheeler Transform",
          compressionRatio: "2.2948",
          encoded: "abcdef",
          decoded: "fbadec$",
          timeTaken: "34300ms",
          bitRate: "1.05mb/s",
          memoryUsed: "500KB",
        },
      ]
    });

    const updateCompressionMetrics = (compressionMetrics: ICompressionMetricState) => {
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
