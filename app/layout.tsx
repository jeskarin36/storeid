import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";

import { Poppins } from 'next/font/google';


 const poppins = Poppins({
  weight: ['400', '700'], // Specify desired weights
      subsets: ['latin'],
      variable: '--font-poppins', 
 })

export const metadata: Metadata = {
  title: "StoreIt",
  description: "StoreIt - The only storage soluction you need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins`}
      >
        {children}
      </body>
    </html>
  );
}
