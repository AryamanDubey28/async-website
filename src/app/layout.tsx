import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
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
  metadataBase: new URL('https://asyncstudios.co.uk'),
  title: {
    default: "Async Studios | AI Agents. Private. Built for you", // Default title for the site
    template: "%s | Async Studios", // Template for page-specific titles
  },
  description: "AI Consultancy helping businesses integrate AI. We build custom AI applications and provide expert consultancy services.",
  keywords: ["AI", "Artificial Intelligence", "AI Agents", "AI Consultancy", "AI Development", "Skynet Chat", "Skynet Agents"],
  icons: {
    icon: [
      { url: './favicon.ico?v=' + Date.now() }
    ]
  },
  openGraph: {
    title: "Async Studios | AI Agents. Private. Built for you",
    description: "AI Consultancy helping businesses integrate AI. We build custom AI applications and provide expert consultancy services.",
    url: 'https://asyncstudios.co.uk',
    siteName: 'Async Studios',
    images: [
      {
        url: '/og-image.png', // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: 'Async Studios Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Async Studios | AI Agents. Private. Built for you",
    description: "AI Consultancy helping businesses integrate AI. We build custom AI applications and provide expert consultancy services.",
    // siteId: 'YourTwitterSiteID', // Optional: Your Twitter site ID
    // creator: '@YourTwitterHandle', // Optional: Your Twitter handle
    // creatorId: 'YourTwitterCreatorID', // Optional: Your Twitter creator ID
    images: ['/og-image.png'], // Replace with your actual OG image path
  },
  robots: { // Default robots configuration
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://asyncstudios.co.uk',
    // languages: { // If you have multiple languages
    //   'en-US': 'https://your-domain.com/en-US',
    //   'es-ES': 'https://your-domain.com/es-ES',
    // },
  },
  // verification: { // Optional: For Google Search Console, etc.
  //   google: 'your-google-site-verification-code',
  //   yandex: 'your-yandex-verification-code',
  //   yahoo: 'your-yahoo-verification-code',
  //   other: {
  //     me: ['my-email@example.com', 'my-link'],
  //   },
  // },
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
        <Analytics />
     
      </body>
    </html>
  );
}
