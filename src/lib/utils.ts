import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  brand?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: product.brand
      ? {
          "@type": "Brand",
          name: product.brand,
        }
      : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "NGN",
      seller: {
        "@type": "Organization",
        name: "Unique Truth Auto Limited",
      },
    },
  };
}

export function generateLocalBusinessSchema() {
  // Import lazily to avoid circular deps — values already come from env via data.ts
  // We re-read the env directly here so this works in RSC context too
  const phone = process.env.NEXT_PUBLIC_PHONE || "";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || "";
  const email = process.env.NEXT_PUBLIC_EMAIL || "";
  const address = process.env.NEXT_PUBLIC_ADDRESS || "";
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://uniquetruthautolimited.com";

  return {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: "Unique Truth Auto Limited",
    description:
      "Nigeria's leading distributor of agricultural tractor spare parts and accessories since 1998.",
    url: BASE_URL,
    ...(phone && { telephone: phone }),
    ...(email && { email }),
    ...(address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressCountry: "NG",
      },
    }),
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.5535,
      longitude: 3.3583,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "16:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tractor Parts & Agricultural Equipment",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Engine Parts" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Tires & Wheels" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Hydraulic Systems" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Electrical Parts" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Implements" } },
      ],
    },
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
