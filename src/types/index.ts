export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price?: string;
  category: string;
  categorySlug: string;
  brand?: string;
  compatibility?: string;
  rating: number;
  reviewCount: number;
  badge?: "Best Seller" | "New Arrival" | "Top Rated" | "Sale";
  image: string;
  featured: boolean;
  inStock: boolean;
  specs?: Record<string, string>;
  tags: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  image: string;
  icon?: string;
}

export interface Review {
  id: number;
  author: string;
  role: string;
  location: string;
  rating: number;
  content: string;
  avatar?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  productInterest?: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  productId: number;
  productName: string;
  quantity: number;
  message?: string;
}
