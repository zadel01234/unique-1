import Link from "next/link";
import { Search, Home, Phone } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl mb-6">🚜</div>
        <h1 className="text-4xl font-heading font-bold text-primary mb-3">Page Not Found</h1>
        <p className="text-neutral-600 mb-8 leading-relaxed">
          Looks like the part you&apos;re looking for isn&apos;t here. But don&apos;t worry — our experts can help you find anything!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent transition-colors"
          >
            <Home size={18} />
            Go Home
          </Link>
          <Link
            href="/category"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            <Search size={18} />
            Browse Parts
          </Link>
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-hover transition-colors"
          >
            <Phone size={18} />
            Call Us
          </a>
        </div>
      </div>
    </div>
  );
}
