import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import CategorySection from "@/components/sections/CategorySection";
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Tractor Parts & Agricultural Equipment Nigeria`,
  description:
    "Buy genuine tractor parts in Nigeria. John Deere, Massey Ferguson, New Holland, Kubota parts. Engine, hydraulics, tires, electrical & implements. Fast nationwide delivery from Lagos.",
  keywords: siteConfig.keywords,
  openGraph: {
    title: "Unique Truth Auto Limited | Nigeria's #1 Tractor Parts Supplier",
    description:
      "Premium tractor parts for all major brands. 15,000+ parts in stock, nationwide delivery, expert support. Serving Nigerian farmers since 1998.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProductsSection />
      <WhyChooseSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
