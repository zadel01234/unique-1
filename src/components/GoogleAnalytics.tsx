"use client";

import Script from "next/script";

// Replace GA_MEASUREMENT_ID with your actual Google Analytics 4 Measurement ID
// e.g., "G-XXXXXXXXXX"
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Analytics event tracking utilities
export const trackEvent = {
  viewProduct: (productName: string, category: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "view_item", {
        items: [{ item_name: productName, item_category: category }],
      });
    }
  },
  requestQuote: (productName: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_lead", {
        event_category: "Quote Request",
        event_label: productName,
      });
    }
  },
  searchParts: (searchTerm: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "search", {
        search_term: searchTerm,
      });
    }
  },
  contactUs: (method: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "contact", {
        event_category: "Contact",
        event_label: method,
      });
    }
  },
  viewCategory: (categoryName: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "view_item_list", {
        item_list_name: categoryName,
      });
    }
  },
};
