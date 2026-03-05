// "use client";

// import Link from "next/link";
// import { MessageCircle } from "lucide-react";
// import { Product } from "@/types";
// import StarRating from "./StarRating";
// import { cn } from "@/lib/utils";
// import { trackEvent } from "@/components/GoogleAnalytics";
// import { siteConfig } from "@/lib/data";

// interface ProductCardProps {
//   product: Product;
//   className?: string;
// }

// const badgeColors = {
//   "Best Seller": "bg-accent text-white",
//   "New Arrival": "bg-accent text-white",
//   "Top Rated": "bg-accent text-white",
//   "Sale": "bg-red-500 text-white",
// };

// export default function ProductCard({ product, className }: ProductCardProps) {
//   const handleQuoteClick = () => {
//     trackEvent.requestQuote(product.name);
//   };

//   const handleProductClick = () => {
//     trackEvent.viewProduct(product.name, product.category);
//   };

//   const whatsappMessage = encodeURIComponent(
//     `Hello! I'm interested in getting a quote for: ${product.name}\n\nCompatibility: ${product.compatibility || "Please advise"}\n\nPlease send me pricing and availability.`
//   );

//   const quoteHref = siteConfig.whatsapp
//     ? `https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${whatsappMessage}`
//     : "/contact";

//   return (
//     <div
//       className={cn(
//         "bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group",
//         className
//       )}
//     >
//       {/* Image */}
//       <Link href={`/product/${product.slug}`} onClick={handleProductClick} className="block relative overflow-hidden">
//         <div className="aspect-[4/3] bg-neutral-50 relative">
//           <img
//             src={product.image}
//             alt={`${product.name} - Tractor Part`}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             loading="lazy"
//           />
//           {product.badge && (
//             <span
//               className={cn(
//                 "absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full",
//                 badgeColors[product.badge]
//               )}
//             >
//               {product.badge}
//             </span>
//           )}
//           {!product.inStock && (
//             <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
//               <span className="bg-neutral-700 text-white text-sm font-medium px-3 py-1 rounded-full">
//                 Out of Stock
//               </span>
//             </div>
//           )}
//         </div>
//       </Link>

//       {/* Content */}
//       <div className="p-4">
//         <Link href={`/product/${product.slug}`} onClick={handleProductClick}>
//           <h3 className="font-semibold text-neutral-800 hover:text-primary transition-colors line-clamp-2 mb-1 leading-snug">
//             {product.name}
//           </h3>
//         </Link>
//         {product.shortDescription && (
//           <p className="text-xs text-neutral-500 mb-2 line-clamp-1">{product.shortDescription}</p>
//         )}
//         <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" className="mb-3" />
//         <a
//           href={quoteHref}
//           target={siteConfig.whatsapp ? "_blank" : "_self"}
//           rel={siteConfig.whatsapp ? "noopener noreferrer" : undefined}
//           onClick={handleQuoteClick}
//           className={cn(
//             "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200",
//             product.inStock
//               ? "bg-primary text-white hover:bg-accent"
//               : "bg-neutral-100 text-neutral-400 cursor-not-allowed pointer-events-none"
//           )}
//         >
//           <MessageCircle size={15} />
//           Get a Quote
//         </a>
//       </div>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Product } from "@/types";
import StarRating from "./StarRating";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/components/GoogleAnalytics";
import { siteConfig } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const badgeColors = {
  "Best Seller": "bg-accent text-white",
  "New Arrival": "bg-accent text-white",
  "Top Rated": "bg-accent text-white",
  "Sale": "bg-red-500 text-white",
};

// Build these once at module load time (same value on server & client)
// so the rendered HTML is always identical.
const WA_NUMBER = (siteConfig.whatsapp || "").replace("+", "");

export default function ProductCard({ product, className }: ProductCardProps) {
  const handleQuoteClick = () => {
    trackEvent.requestQuote(product.name);
  };

  const handleProductClick = () => {
    trackEvent.viewProduct(product.name, product.category);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello! I'm interested in getting a quote for: ${product.name}\n\nCompatibility: ${product.compatibility || "Please advise"}\n\nPlease send me pricing and availability.`
  );

  // Always an <a href> — just the destination changes.
  // Using a stable ternary at module scope (WA_NUMBER) means server and
  // client always agree on which branch to take.
  const quoteHref = WA_NUMBER
    ? `https://wa.me/${WA_NUMBER}?text=${whatsappMessage}`
    : "/contact";

  const isExternal = !!WA_NUMBER;

  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group",
        className
      )}
    >
      {/* Image */}
      <Link href={`/product/${product.slug}`} onClick={handleProductClick} className="block relative overflow-hidden">
        <div className="aspect-[4/3] bg-neutral-50 relative">
          <img
            src={product.image}
            alt={`${product.name} - Tractor Part`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {product.badge && (
            <span
              className={cn(
                "absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full",
                badgeColors[product.badge as keyof typeof badgeColors]
              )}
            >
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="bg-neutral-700 text-white text-sm font-medium px-3 py-1 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`} onClick={handleProductClick}>
          <h3 className="font-semibold text-neutral-800 hover:text-primary transition-colors line-clamp-2 mb-1 leading-snug">
            {product.name}
          </h3>
        </Link>
        {product.shortDescription && (
          <p className="text-xs text-neutral-500 mb-2 line-clamp-1">{product.shortDescription}</p>
        )}
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" className="mb-3" />

        {/* 
          Always rendered as <a> with consistent attributes.
          target and rel are now unconditional — no server/client mismatch.
        */}
        <a
          href={quoteHref}
          target={isExternal ? "_blank" : "_self"}
          rel="noopener noreferrer"
          onClick={handleQuoteClick}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200",
            product.inStock
              ? "bg-primary text-white hover:bg-accent"
              : "bg-neutral-100 text-neutral-400 cursor-not-allowed pointer-events-none"
          )}
        >
          <MessageCircle size={15} />
          Get a Quote
        </a>
      </div>
    </div>
  );
}