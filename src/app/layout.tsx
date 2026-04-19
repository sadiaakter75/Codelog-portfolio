import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/navigation/Header";
import LoadingScreen from "@/components/LoadingScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Website Development Agency",
  description: "A stunning website development agency hero section.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body 
        className="min-h-full flex flex-col bg-zinc-950 text-white font-sans overflow-x-hidden"
        suppressHydrationWarning
      >
        <LoadingScreen />
        <Header />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
