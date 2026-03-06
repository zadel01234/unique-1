"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts, useCategories } from "@/hooks/useProducts";
import ProductCard from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data";

// ── Responsive items-per-page hook ──────────────────────────────────
function useItemsPerPage() {
  const getCount = useCallback(() => {
    if (typeof window === "undefined") return 12;
    const w = window.innerWidth;
    if (w >= 1024) return 12;  // lg
    if (w >= 768) return 8;    // md
    return 6;                  // sm
  }, []);

  const [itemsPerPage, setItemsPerPage] = useState(getCount);

  useEffect(() => {
    const handle = () => setItemsPerPage(getCount());
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [getCount]);

  return itemsPerPage;
}

export default function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = useItemsPerPage();

  const { data: products, isLoading } = useProducts(selectedCategory);

  // Reset to page 1 when any filter / sort / category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, selectedCategory, itemsPerPage]);

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

  // ── Pagination logic ──────────────────────────────────────────────
  const totalItems = sortedProducts?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(
    () => sortedProducts?.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage) ?? [],
    [sortedProducts, safePage, itemsPerPage]
  );

  // Build visible page numbers (show max 5 with ellipsis)
  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safePage > 3) pages.push("ellipsis");
      const start = Math.max(2, safePage - 1);
      const end = Math.min(totalPages - 1, safePage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (safePage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, safePage]);

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
            {totalItems} products available
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
            <div className="lg:hidden flex flex-wrap gap-2 mb-6">
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
                {[...Array(itemsPerPage)].map((_, i) => (
                  <div key={i} className="bg-neutral-100 rounded-2xl h-72 animate-pulse" />
                ))}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* ── Pagination Controls ─────────────────────────── */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1.5 mt-10">
                    {/* Previous */}
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={safePage === 1}
                      className={cn(
                        "inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-medium transition-all",
                        safePage === 1
                          ? "text-neutral-300 cursor-not-allowed"
                          : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                      )}
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {/* Page numbers */}
                    {pageNumbers.map((p, idx) =>
                      p === "ellipsis" ? (
                        <span key={`e-${idx}`} className="w-10 h-10 flex items-center justify-center text-neutral-400 text-sm select-none">
                          …
                        </span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setCurrentPage(p)}
                          className={cn(
                            "inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-medium transition-all",
                            p === safePage
                              ? "bg-primary text-white shadow-md shadow-primary/25"
                              : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                          )}
                          aria-current={p === safePage ? "page" : undefined}
                        >
                          {p}
                        </button>
                      )
                    )}

                    {/* Next */}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={safePage === totalPages}
                      className={cn(
                        "inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-medium transition-all",
                        safePage === totalPages
                          ? "text-neutral-300 cursor-not-allowed"
                          : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                      )}
                      aria-label="Next page"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}

                {/* Page info */}
                {totalPages > 1 && (
                  <p className="text-center text-xs text-neutral-400 mt-3">
                    Showing {(safePage - 1) * itemsPerPage + 1}–{Math.min(safePage * itemsPerPage, totalItems)} of {totalItems} products
                  </p>
                )}
              </>
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
