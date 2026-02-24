import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/data";
import { generateProductSchema } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";
import ProductCard from "@/components/ui/ProductCard";
import { siteConfig, siteImages } from "@/lib/data";
import { MessageCircle, Phone, CheckCircle2, Package, Truck, Shield } from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};

  const title = `${product.name} | ${product.category} Tractor Parts Nigeria`;
  const description = `Buy ${product.name} in Nigeria. ${product.shortDescription}. ${product.compatibility ? `Compatible with: ${product.compatibility}.` : ""} Fast nationwide delivery. Get a quote from Unique Truth Auto Limited.`;

  return {
    title,
    description,
    keywords: [
      ...product.tags,
      `${product.name} Nigeria`,
      `buy ${product.name.toLowerCase()}`,
      "tractor parts Nigeria",
      "agricultural parts Lagos",
      product.brand || "",
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      images: [{ url: product.image, width: 600, height: 400, alt: product.name }],
      type: "website",
    },
    alternates: {
      canonical: `/product/${params.slug}`,
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  // Related products
  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const productSchema = generateProductSchema(product);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://uniquetruthautolimited.com" },
      { "@type": "ListItem", position: 2, name: product.category, item: `https://uniquetruthautolimited.com/category/${product.categorySlug}` },
      { "@type": "ListItem", position: 3, name: product.name },
    ],
  };

  const whatsappMessage = encodeURIComponent(
    `Hello! I'm interested in getting a quote for:\n\n*${product.name}*\n${product.compatibility ? `Compatibility: ${product.compatibility}\n` : ""}${product.brand ? `Brand: ${product.brand}\n` : ""}\nPlease send me pricing and availability.`
  );

  const quoteHref = siteConfig.whatsapp
    ? `https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${whatsappMessage}`
    : "/contact";

  const hasPhone = siteConfig.phone && siteConfig.phone !== "—";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-neutral-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="text-sm text-neutral-500 flex items-center gap-2">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link href={`/category/${product.categorySlug}`} className="hover:text-primary">{product.category}</Link>
              <span>/</span>
              <span className="text-neutral-700 line-clamp-1">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image */}
            <div>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 aspect-square">
                <img
                  src={product.image}
                  alt={`${product.name} - Tractor Part`}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.badge && (
                <div className="mt-4">
                  <span className="bg-accent text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <Link
                href={`/category/${product.categorySlug}`}
                className="text-sm text-primary font-medium hover:underline"
              >
                {product.category}
              </Link>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mt-2 mb-4">
                {product.name}
              </h1>

              <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" className="mb-4" />

              {product.brand && (
                <div className="text-sm text-neutral-600 mb-2">
                  <span className="font-medium">Brand:</span> {product.brand}
                </div>
              )}
              {product.compatibility && (
                <div className="text-sm text-neutral-600 mb-6 bg-primary/5 border border-primary/20 rounded-xl p-3">
                  <span className="font-medium text-primary">✓ Compatible with:</span>{" "}
                  {product.compatibility}
                </div>
              )}

              <p className="text-neutral-600 leading-relaxed mb-8">{product.description}</p>

              {/* Stock status */}
              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                    <CheckCircle2 size={16} />
                    In Stock — Ready for Dispatch
                  </span>
                ) : (
                  <span className="text-red-500 text-sm font-medium">Out of Stock</span>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a
                  href={quoteHref}
                  target={siteConfig.whatsapp ? "_blank" : "_self"}
                  rel={siteConfig.whatsapp ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-accent transition-colors text-center"
                >
                  <MessageCircle size={18} />
                  {siteConfig.whatsapp ? "Request a Quote on WhatsApp" : "Request a Quote"}
                </a>
                {hasPhone && (
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3.5 rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors text-center"
                  >
                    <Phone size={18} />
                    Call Us
                  </a>
                )}
                {!hasPhone && !siteConfig.whatsapp && (
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3.5 rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors text-center"
                  >
                    Contact Us
                  </Link>
                )}
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Shield, label: "Genuine Parts", sub: "OEM Verified" },
                  { icon: Truck, label: "Fast Delivery", sub: "Nationwide" },
                  { icon: Package, label: "Bulk Discount", sub: "Available" },
                ].map((item) => (
                  <div key={item.label} className="bg-neutral-50 rounded-xl p-3 text-center">
                    <item.icon size={20} className="text-primary mx-auto mb-1" />
                    <div className="text-xs font-semibold text-neutral-700">{item.label}</div>
                    <div className="text-xs text-neutral-500">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 mb-16">
              <h2 className="text-xl font-heading font-semibold text-neutral-800 mb-6">Technical Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-neutral-50">
                    <span className="text-neutral-500 text-sm">{key}</span>
                    <span className="font-medium text-neutral-800 text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-heading font-semibold text-neutral-800">
                  More {product.category}
                </h2>
                <Link
                  href={`/category/${product.categorySlug}`}
                  className="text-primary text-sm font-medium hover:text-accent transition-colors"
                >
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
