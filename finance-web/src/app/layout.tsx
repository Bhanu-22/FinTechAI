import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackgroundBlobs from "@/components/BackgroundBlobs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Artha - Financial Intelligence",
  description: "Experience the future of finance with Artha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackgroundBlobs />
        <div className="relative z-0 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {children}
        </div>
      </body>
    </html>
  );
}
