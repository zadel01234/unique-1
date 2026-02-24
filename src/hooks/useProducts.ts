import { useQuery } from "@tanstack/react-query";
import { products, categories, reviews } from "@/lib/data";
import type { Product, Category } from "@/types";

// Simulated API calls - replace with actual API endpoints in production
const fetchProducts = async (categorySlug?: string): Promise<Product[]> => {
  await new Promise((r) => setTimeout(r, 100)); // Simulate network
  if (categorySlug) {
    return products.filter((p) => p.categorySlug === categorySlug);
  }
  return products;
};

const fetchProduct = async (slug: string): Promise<Product | null> => {
  await new Promise((r) => setTimeout(r, 100));
  return products.find((p) => p.slug === slug) || null;
};

const fetchCategories = async (): Promise<Category[]> => {
  await new Promise((r) => setTimeout(r, 100));
  return categories;
};

const fetchFeaturedProducts = async (): Promise<Product[]> => {
  await new Promise((r) => setTimeout(r, 100));
  return products.filter((p) => p.featured);
};

// React Query Hooks
export const useProducts = (categorySlug?: string) => {
  return useQuery({
    queryKey: ["products", categorySlug],
    queryFn: () => fetchProducts(categorySlug),
    staleTime: 1000 * 60 * 5,
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProduct(slug),
    staleTime: 1000 * 60 * 10,
    enabled: !!slug,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 30, // 30 min - categories don't change often
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: fetchFeaturedProducts,
    staleTime: 1000 * 60 * 5,
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ["search-products", query],
    queryFn: async (): Promise<Product[]> => {
      if (!query.trim()) return [];
      const q = query.toLowerCase();
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          p.category.toLowerCase().includes(q) ||
          (p.compatibility && p.compatibility.toLowerCase().includes(q))
      );
    },
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 2,
  });
};

export { reviews };
