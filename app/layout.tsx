'use client'
import './globals.css'
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import {NextUIProvider} from "@nextui-org/react";
import CompressionContextProvider from "../context/context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <NextUIProvider>
          <CompressionContextProvider>
            <main>{children}</main>
          </CompressionContextProvider>
        </NextUIProvider>
        <Footer/>
      </body>
    </html>
  )
}
