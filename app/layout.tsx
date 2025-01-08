import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Laundromat",
  description: "A professional laundry service website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="relative">
              <div className="sticky top-0 z-50 bg-navy-900 shadow-md">
              <Navbar />
              </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
