import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { generateLocalBusinessSchema } from "@/lib/utils";
import { siteConfig, siteImages } from "@/lib/data";

const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://uniquetruthautolimited.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${siteConfig.name} | Tractor Parts Nigeria`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Favicon: use env-provided file, else fall back to the inline SVG tractor defined below
  icons: siteImages.favicon
    ? {
        icon: siteImages.favicon,
        apple: siteImages.favicon,
      }
    : undefined, // inline SVG injected in <head> below when no env var
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: BASE_URL,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Your Trusted Tractor Parts Supplier in Nigeria`,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Unique Truth Auto Limited - Tractor Parts Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Tractor Parts Nigeria`,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "agriculture",
};

/**
 * Inline SVG tractor favicon (data URI). Used as fallback when
 * NEXT_PUBLIC_FAVICON_URL is not set — no file upload needed.
 */
const tractorFaviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#1a3a5c"/>
  <!-- tractor body -->
  <rect x="30" y="38" width="38" height="20" rx="4" fill="#e67e22"/>
  <!-- cab -->
  <rect x="48" y="28" width="18" height="18" rx="3" fill="#e67e22"/>
  <!-- exhaust -->
  <rect x="62" y="20" width="4" height="12" rx="2" fill="#ccc"/>
  <!-- rear wheel (large) -->
  <circle cx="38" cy="62" r="16" fill="#2c2c2c"/>
  <circle cx="38" cy="62" r="9" fill="#555"/>
  <circle cx="38" cy="62" r="3" fill="#ccc"/>
  <!-- front wheel (small) -->
  <circle cx="62" cy="65" r="9" fill="#2c2c2c"/>
  <circle cx="62" cy="65" r="5" fill="#555"/>
  <circle cx="62" cy="65" r="2" fill="#ccc"/>
</svg>`;

const tractorFaviconDataUri = `data:image/svg+xml,${encodeURIComponent(tractorFaviconSvg)}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = generateLocalBusinessSchema();

  // WhatsApp FAB — only shown when number is configured
  const waHref = siteConfig.whatsapp
    ? `https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent("Hello! I need help finding tractor parts.")}`
    : null;

  return (
    <html lang="en-NG">
      <head>
        {/* Inline SVG favicon fallback (overridden by metadata.icons when env var is set) */}
        {!siteImages.favicon && (
          <link rel="icon" type="image/svg+xml" href={tractorFaviconDataUri} />
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}
      </head>
      <body
        className={`${heading.variable} ${body.variable} font-body antialiased bg-white text-neutral-800`}
      >
        <GoogleAnalytics />
        <ReactQueryProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </ReactQueryProvider>

        {/* WhatsApp floating action button — hidden when no number is set */}
        {waHref && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
            aria-label="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        )}
      </body>
    </html>
  );
}
