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
  title: "MBTI에 맞는 해외 여행지 추천",
  description: "MBTI에 맞는 해외 여행지를 추천합니다.",
  openGraph: {
    title: "MBTI에 맞는 해외 여행지 추천",
    description: "MBTI에 맞는 해외 여행지를 추천합니다.",
    url: "https://mbti-to-trip.vercel.app",
    siteName: "MBTI to Trip",
    images: [
      {
        url: "https://mbti-to-trip.vercel.app/airplane.png",
        width: 1200,
        height: 630,
        alt: "MBTI 여행지 추천 썸네일",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MBTI에 맞는 해외 여행지 추천",
    description: "MBTI에 맞는 해외 여행지를 추천합니다.",
    images: ["https://mbti-to-trip.vercel.app/airplane.png"],
  },
  icons: {
    icon: '/airplane.png'
  }
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
      >
        {children}
      </body>
    </html>
  );
}
