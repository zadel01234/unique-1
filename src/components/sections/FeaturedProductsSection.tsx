"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useFeaturedProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ui/ProductCard";

export default function FeaturedProductsSection() {
  const { data: products, isLoading } = useFeaturedProducts();

  return (
    <section className="py-20 bg-white" aria-label="Featured Products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Our most popular tractor parts, trusted by farmers across Nigeria</p>
          </div>
          <Link
            href="/category"
            className="hidden md:flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors text-sm"
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-neutral-100 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products?.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/category"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-accent transition-colors"
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
