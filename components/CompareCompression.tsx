"use client";

import { useRouter } from 'next/navigation';
import { useContext } from "react";
import { CompressionContext } from "@/context/context";
import { CompressionContextType } from "@/type";
import { DTextArea } from "./ui/doubleTextArea";


const CompareCompression = () => {
    const router = useRouter();
    let { compressionMetrics } = useContext(CompressionContext) as CompressionContextType;

    const handleViewResults = () => {
        router.push('/result');
    }

    let originalText = compressionMetrics.singleThreadMetrics[0].decoded;

    return (
        <div className="mx-8 my-8 w-1000 h-1000">
            {compressionMetrics.singleThreadMetrics.map((item, _) => (
                <div className="my-8">
                    <p className="my-2">{item.algorithm}</p>
                    <DTextArea leftString={originalText} rightString={item.encoded}></DTextArea>
                </div>
            ))}
            <button
                onClick={() => handleViewResults()}
                className={`border p-2 rounded-2xl bg-black text-white cursor-pointer w-64 mx-auto block`}
            >
                View Results
            </button>
        </div>
    )
}

export default CompareCompression;
