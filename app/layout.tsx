import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TouchNav } from "@/components/navigation/TouchNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Emory Crossing 40s - Digital Sales Office",
  description: "Explore new homes at Emory Crossing 40s in Hutto, TX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <TouchNav />
        <main className="pt-20 min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}
