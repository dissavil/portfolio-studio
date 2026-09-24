import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import SmoothScroll from "@/components/layout/SmoothScroll/SmoothScroll";
import ScrollBackground from "@/components/animation/ScrollBackground/ScrollBackground";
import { site } from "@/lib/site";

import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase обязателен: без него относительные OG-картинки ломаются.
  metadataBase: new URL(site.url),

  title: {
    default: site.title,
    // На дочерних страницах достаточно вернуть title: "Кейсы"
    template: `%s — ${site.name}`,
  },

  description: site.description,

  keywords: [
    "сайт для жилого комплекса",
    "сайт для застройщика",
    "сайт архитектурного бюро",
    "разработка сайтов Алматы",
    "Next.js разработка",
  ],

  authors: [{ name: site.name, url: site.url }],
  creator: site.name,

  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },

  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#080A0D",
  colorScheme: "dark",
};

/** Разметка для поисковиков: кто мы, где находимся, чем занимаемся. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description: site.description,
  areaServed: "KZ",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: site.country,
  },
  email: site.email,
  telephone: site.phone,
  sameAs: [site.socials.instagram, site.socials.telegram, site.socials.github],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {/* Пропуск навигации для клавиатуры и скринридеров. */}
        <a href="#main" className="skip-link">
          Перейти к содержимому
        </a>

        <ScrollBackground />

        <SmoothScroll>{children}</SmoothScroll>

        <script
          type="application/ld+json"
          // Данные наши, не пользовательские — инъекции здесь нет.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </body>
    </html>
  );
}
