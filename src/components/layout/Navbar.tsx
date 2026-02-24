"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, Phone, ShoppingBag } from "lucide-react";
import { siteConfig, siteImages } from "@/lib/data";
import { useSearchProducts } from "@/hooks/useProducts";
import { trackEvent } from "@/components/GoogleAnalytics";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: searchResults } = useSearchProducts(searchQuery);

  // WhatsApp href — only renders if number is configured
  const waHref = siteConfig.whatsapp
    ? `https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent("Hello! I need help finding tractor parts.")}`
    : null;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      trackEvent.searchParts(searchQuery);
      router.push(`/category?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  // All nav items — Category goes straight to /category (no dropdown)
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/category", label: "Category" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* ── Top announcement bar ──────────────────────────────────── */}
      <div className="bg-primary-600 text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>🚚 Fast Nationwide Delivery • Same-day dispatch for Lagos orders</span>
          <div className="flex items-center gap-4">
            {siteConfig.phone && siteConfig.phone !== "—" && (
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-1 hover:text-accent-light transition-colors"
              >
                <Phone size={12} />
                {siteConfig.phone}
              </a>
            )}
            <span className="text-neutral-300">{siteConfig.hours}</span>
          </div>
        </div>
      </div>

      {/* ── Sticky header ─────────────────────────────────────────── */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white shadow-sm"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-primary group-hover:bg-accent transition-colors flex items-center justify-center text-white">
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src="/logo.avif"
                    alt="Unique Truth Auto Limited logo"
                    className="w-full h-full object-cover"
                  />
              </div>
              <div>
                <span className="font-heading font-bold text-primary text-lg leading-tight block">
                  Unique Truth
                </span>
                <span className="text-xs text-neutral-600 -mt-1 block">Auto Limited</span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-neutral-700 hover:text-primary font-medium transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right-side actions */}
            <div className="flex items-center gap-3">

              {/* Search popover */}
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-neutral-600 hover:text-primary hover:bg-neutral-100 rounded-lg transition-colors"
                  aria-label="Search parts"
                >
                  <Search size={20} />
                </button>

                {searchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-neutral-100 z-50">
                    <form onSubmit={handleSearch} className="p-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Search tractor parts..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                        >
                          <Search size={16} />
                        </button>
                      </div>
                    </form>

                    {searchResults && searchResults.length > 0 && (
                      <div className="border-t border-neutral-100 max-h-64 overflow-y-auto">
                        {searchResults.slice(0, 5).map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors"
                            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                          >
                            <div className="w-10 h-10 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-lg">🔧</span>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-neutral-800 line-clamp-1">{product.name}</p>
                              <p className="text-xs text-neutral-500">{product.category}</p>
                            </div>
                          </Link>
                        ))}
                        {searchResults.length > 5 && (
                          <button
                            onClick={() => {
                              router.push(`/category?search=${encodeURIComponent(searchQuery)}`);
                              setSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="w-full py-2.5 text-sm text-primary font-medium hover:bg-neutral-50 transition-colors border-t border-neutral-100"
                          >
                            View all {searchResults.length} results
                          </button>
                        )}
                      </div>
                    )}

                    {searchQuery.length > 2 && searchResults?.length === 0 && (
                      <div className="p-4 text-sm text-neutral-500 text-center border-t border-neutral-100">
                        No parts found.{" "}
                        <Link href="/contact" className="text-primary font-medium">
                          Ask an expert →
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* WhatsApp CTA — hidden if no number configured */}
              {waHref && (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
                  onClick={() => trackEvent.contactUs("whatsapp")}
                >
                  <ShoppingBag size={16} />
                  Get a Quote
                </a>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-neutral-600 hover:text-primary hover:bg-neutral-100 rounded-lg transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile drawer */}
          {mobileOpen && (
            <div className="md:hidden border-t border-neutral-100 py-4">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2.5 text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-lg transition-colors font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {siteConfig.phone && siteConfig.phone !== "—" && (
                  <div className="px-4 pt-3">
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg text-sm font-medium"
                    >
                      <Phone size={16} /> {siteConfig.phone}
                    </a>
                  </div>
                )}

                {waHref && (
                  <div className="px-4 pt-2">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-green-500 text-white py-2.5 rounded-lg text-sm font-medium"
                    >
                      💬 WhatsApp Us
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
