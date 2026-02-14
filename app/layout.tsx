import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/components/AppWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Smart Campus Assistant",
  description: "Your AI-powered campus companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-slate-50 text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900 h-full`}>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
