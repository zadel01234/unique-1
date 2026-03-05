import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";

export default function CategorySection() {
  return (
    <section className="py-20 bg-neutral-50" aria-label="Shop by Category">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find the exact parts you need for your tractor</p>
          </div>
          <Link
            href="/category"
            className="hidden md:flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors text-sm"
          >
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(0, 4).map((cat, index) => (
            <Link
              key={cat.id}
              href="/category"
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={`${cat.name} for tractors`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4">
                <div className="text-2xl mb-1"></div>
                <h3 className="font-semibold text-neutral-800 group-hover:text-primary transition-colors text-sm md:text-base">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">{cat.productCount}+ products</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            href="/category"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
          >
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
