// "use client";

// import Link from "next/link";
// import { Search, ChevronDown } from "lucide-react";
// import { useState } from "react";
// import { Category, Product } from "@/types";
// import ProductCard from "@/components/ui/ProductCard";
// import { cn } from "@/lib/utils";

// interface Props {
//   category: Category;
//   products: Product[];
// }

// export default function CategoryPageClient({ category, products }: Props) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("featured");

//   const filtered = products
//     .filter((p) => {
//       if (!searchQuery) return true;
//       const q = searchQuery.toLowerCase();
//       return (
//         p.name.toLowerCase().includes(q) ||
//         (p.compatibility && p.compatibility.toLowerCase().includes(q)) ||
//         p.tags.some((t) => t.includes(q))
//       );
//     })
//     .sort((a, b) => {
//       if (sortBy === "rating") return b.rating - a.rating;
//       if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
//       return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
//     });

//   return (
//     <div className="min-h-screen bg-neutral-50">
//       {/* Header */}
//       <div className="bg-primary text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <nav className="text-sm mb-4 text-white/70">
//             <Link href="/" className="hover:text-white">Home</Link>
//             <span className="mx-2">/</span>
//             <Link href="/category" className="hover:text-white">Products</Link>
//             <span className="mx-2">/</span>
//             <span className="text-white">{category.name}</span>
//           </nav>
//           <div className="flex items-center gap-4">
//             <span className="text-4xl">{category.icon}</span>
//             <div>
//               <h1 className="text-3xl md:text-4xl font-heading font-bold">{category.name}</h1>
//               <p className="text-white/80 mt-1">{category.productCount}+ products available</p>
//             </div>
//           </div>
//           <p className="text-white/70 mt-4 max-w-2xl">{category.description}</p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <div className="relative flex-1">
//             <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
//             <input
//               type="text"
//               placeholder={`Search ${category.name.toLowerCase()}...`}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
//             />
//           </div>
//           <div className="relative">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="appearance-none bg-white border border-neutral-200 rounded-xl px-4 py-2.5 pr-10 focus:outline-none text-sm cursor-pointer"
//             >
//               <option value="featured">Featured</option>
//               <option value="rating">Highest Rated</option>
//               <option value="reviews">Most Reviewed</option>
//             </select>
//             <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
//           </div>
//         </div>

//         {filtered.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//             {filtered.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <div className="text-6xl mb-4">{category.icon}</div>
//             <h3 className="text-xl font-semibold text-neutral-700 mb-2">No parts match your search</h3>
//             <p className="text-neutral-500 mb-6">Contact our experts — we can source any tractor part</p>
//             <Link href="/contact" className="btn-primary inline-flex">Contact Expert</Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Category, Product } from "@/types";
import ProductCard from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";

interface Props {
  category: Category;
  products: Product[];
}

export default function CategoryPageClient({ category, products }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const Icon = category.icon;

  const filtered = products
    .filter((p) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        (p.compatibility && p.compatibility.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.includes(q))
      );
    })
    .sort((a, b) => {
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
            <Link href="/category" className="hover:text-white">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{category.name}</span>
          </nav>
          <div className="flex items-center gap-4">
            {Icon && <Icon className="w-10 h-10" />}
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold">{category.name}</h1>
              <p className="text-white/80 mt-1">{category.productCount}+ products available</p>
            </div>
          </div>
          <p className="text-white/70 mt-4 max-w-2xl">{category.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={`Search ${category.name.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
            />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-neutral-200 rounded-xl px-4 py-2.5 pr-10 focus:outline-none text-sm cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            {Icon && <Icon className="w-16 h-16 mx-auto mb-4 text-neutral-300" />}
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">No parts match your search</h3>
            <p className="text-neutral-500 mb-6">Contact our experts — we can source any tractor part</p>
            <Link href="/contact" className="btn-primary inline-flex">Contact Expert</Link>
          </div>
        )}
      </div>
    </div>
  );
}