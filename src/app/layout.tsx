import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import SmoothScroll from "@/components/layout/SmoothScroll/SmoothScroll";

import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "OnLabs — Digital Studio",
  description:
    "Создаём digital-продукты, которые работают.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geist.variable} ${geistMono.variable}`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}