import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Async Studios | AI Agents. Private. Built for you",
  description: "AI Consultancy helping businesses integrate AI. We build custom AI applications and provide expert consultancy services.",
  keywords: ["AI", "Artificial Intelligence", "AI Agents", "AI Consultancy", "AI Development", "Skynet Chat", "Skynet Agents"],
  icons: {
    icon: [
      { url: './favicon.ico?v=' + Date.now() }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
