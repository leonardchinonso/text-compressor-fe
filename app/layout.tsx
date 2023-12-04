'use client'
import './globals.css'
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import {NextUIProvider} from "@nextui-org/react";

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
          <main>{children}</main>
      </NextUIProvider>
      <Footer/>
      </body>
    </html>
  )
}
