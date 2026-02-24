import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, products } from "@/lib/data";
import CategoryPageClient from "./CategoryPageClient";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return {};

  return {
    title: `${category.name} | Tractor Parts Nigeria`,
    description: `Buy ${category.name.toLowerCase()} for tractors in Nigeria. ${category.description} ${category.productCount}+ products in stock with fast nationwide delivery.`,
    keywords: [
      `${category.name.toLowerCase()} Nigeria`,
      `tractor ${category.name.toLowerCase()}`,
      `buy ${category.name.toLowerCase()} Nigeria`,
      `${category.name.toLowerCase()} John Deere`,
      `${category.name.toLowerCase()} Massey Ferguson`,
      "tractor parts Lagos",
      "agricultural parts Nigeria",
    ],
    openGraph: {
      title: `${category.name} - Tractor Parts | Unique Truth Auto Limited`,
      description: category.description,
      images: [{ url: category.image, width: 600, height: 400 }],
    },
    alternates: {
      canonical: `/category/${params.slug}`,
    },
  };
}

export default function CategorySlugPage({ params }: Props) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const categoryProducts = products.filter((p) => p.categorySlug === params.slug);

  // JSON-LD structured data for category
  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} - Tractor Parts Nigeria`,
    description: category.description,
    url: `https://uniquetruthautolimited.com/category/${params.slug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://uniquetruthautolimited.com" },
        { "@type": "ListItem", position: 2, name: "Products", item: "https://uniquetruthautolimited.com/category" },
        { "@type": "ListItem", position: 3, name: category.name },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <CategoryPageClient category={category} products={categoryProducts} />
    </>
  );
}
