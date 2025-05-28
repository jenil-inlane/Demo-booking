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
  title: {
    default: "Learn to Drive - Professional Driving Lessons",
    template: "%s | Learn to Drive"
  },
  description: "Professional driving lessons to unlock your independence and confidence on the road. Learn to drive with experienced instructors in HSR Layout, Koramangala, and Electronic City.",
  keywords: ["driving lessons", "learn to drive", "driving school", "HSR Layout", "Koramangala", "Electronic City", "Bangalore", "driving instructor", "4-wheeler license"],
  authors: [{ name: "Learn to Drive" }],
  creator: "Learn to Drive",
  publisher: "Learn to Drive",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yourdomainname.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Learn to Drive - Professional Driving Lessons",
    description: "Professional driving lessons to unlock your independence and confidence on the road. Expert instructors, flexible timings, affordable rates.",
    url: 'https://yourdomainname.com', // Replace with your actual domain
    siteName: 'Learn to Drive',
    images: [
      {
        url: '/car-banner.png', // Your existing banner image
        width: 600,
        height: 300,
        alt: 'Professional Driving Lessons',
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Learn to Drive - Professional Driving Lessons",
    description: "Professional driving lessons to unlock your independence and confidence on the road.",
    images: ['/car-banner.png'],
  },
  robots: {
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
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
    // yandex: 'your-yandex-verification',
    // bing: 'your-bing-verification',
  },
  category: 'education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
