"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, ChevronDown } from "lucide-react";
import { useProducts, useCategories } from "@/hooks/useProducts";
import ProductCard from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data";

export default function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const { data: products, isLoading } = useProducts(selectedCategory);

  const filteredProducts = products?.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      (p.compatibility && p.compatibility.toLowerCase().includes(q))
    );
  });

  const sortedProducts = filteredProducts?.sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">All Products</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            {selectedCategory
              ? categories.find((c) => c.slug === selectedCategory)?.name || "Products"
              : "All Tractor Parts"}
          </h1>
          <p className="text-white/80 mt-2">
            {sortedProducts?.length || 0} products available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search tractor parts, brand, model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-neutral-200 rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sticky top-24">
              <h3 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                <Filter size={16} className="text-primary" /> Categories
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory(undefined)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    !selectedCategory
                      ? "bg-primary text-white"
                      : "text-neutral-600 hover:bg-neutral-50"
                  )}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between",
                      selectedCategory === cat.slug
                        ? "bg-primary text-white"
                        : "text-neutral-600 hover:bg-neutral-50"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      {cat.name}
                    </span>
                    <span className={cn(
                      "text-xs",
                      selectedCategory === cat.slug ? "text-white/70" : "text-neutral-400"
                    )}>
                      {cat.productCount}+
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {/* Mobile category filter */}
            <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory(undefined)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors",
                  !selectedCategory ? "bg-primary text-white" : "bg-white border border-neutral-200 text-neutral-600"
                )}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors",
                    selectedCategory === cat.slug
                      ? "bg-primary text-white"
                      : "bg-white border border-neutral-200 text-neutral-600"
                  )}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-neutral-100 rounded-2xl h-72 animate-pulse" />
                ))}
              </div>
            ) : sortedProducts && sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-neutral-700 mb-2">No parts found</h3>
                <p className="text-neutral-500 mb-6">Try adjusting your search or contact our experts for help</p>
                <Link href="/contact" className="btn-primary inline-flex">
                  Contact Expert
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
