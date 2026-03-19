import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Gnomad Studio | Small Business Web Design Muskogee, OK | The 918 Renaissance",
  description: "Muskogee's MBA-led, mission-first digital studio. Professional websites and local SEO for Muskogee small businesses — from 'Pay What You Can' for solopreneurs to full enterprise builds. Serving the 918 / Green Country.",
  keywords: ["website design Muskogee OK", "small business web design Muskogee", "local SEO Muskogee", "Muskogee digital marketing", "918 web design", "Green Country small business", "non-profit web studio Oklahoma"],
  authors: [{ name: "David Cole" }],
  openGraph: {
    title: "Gnomad Studio | Small Business Web Design — Muskogee, OK",
    description: "Silicon Valley engineering. Muskogee soul. Premium websites for local businesses at accessible, mission-first rates.",
    url: "https://gnomadstudio.org",
    siteName: "Gnomad Studio",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://gnomadstudio.org/assets/david_logo.webp", width: 1200, height: 630, alt: "Gnomad Studio Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gnomad Studio | Small Business Web Design Muskogee OK",
    description: "Premium websites for Muskogee small businesses at mission-first rates.",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/favicon.ico' }],
  },
  alternates: { canonical: "https://gnomadstudio.org" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "NGO", "ProfessionalService"],
  name: "Gnomad Studio",
  url: "https://gnomadstudio.org",
  logo: "https://gnomadstudio.org/assets/david_logo.webp",
  description: "MBA-led, mission-first digital studio providing high-performance web design and local SEO for small businesses in Muskogee, OK and the 918 region.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Muskogee",
    addressRegion: "OK",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.7479,
    longitude: -95.3696,
  },
  areaServed: [
    { "@type": "City", name: "Muskogee", containedIn: "Oklahoma" },
    { "@type": "City", name: "Fort Gibson", containedIn: "Oklahoma" },
    { "@type": "City", name: "Tahlequah", containedIn: "Oklahoma" },
  ],
  priceRange: "$–$$$",
  founder: { "@type": "Person", name: "David Cole" },
  knowsAbout: ["Web Design", "Local SEO", "Google Business Profile", "Small Business Consulting", "Digital Marketing"],
  sameAs: [
    "https://davidthegnomad.org",
    "https://gnomad.studio",
  ],
};

// GA4 Measurement ID — safe to expose publicly
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-E1RZ70YGNE";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 — loads after hydration to not block LCP */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
