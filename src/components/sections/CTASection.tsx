import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function CTASection() {
  const waHref = siteConfig.whatsapp
    ? `https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent("Hello! I can't find the tractor part I need. Can you help?")}`
    : null;

  const hasPhone = siteConfig.phone && siteConfig.phone !== "—";

  return (
    <section className="py-20 bg-primary relative overflow-hidden" aria-label="Contact Us">
      {/* Background circles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Can&apos;t Find the Part You Need?
        </h2>
        <p className="text-xl text-white/80 mb-8 leading-relaxed">
          Our tractor parts experts are ready to help. With 15,000+ parts in stock and direct
          supplier relationships, we can source any part you need.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {hasPhone && (
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent hover:text-white transition-all hover:scale-105 shadow-lg"
            >
              <Phone size={20} />
              Call {siteConfig.phone}
            </a>
          )}

          {waHref ? (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-600 transition-all hover:scale-105 shadow-lg"
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </a>
          ) : (
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent hover:text-white transition-all hover:scale-105 shadow-lg"
            >
              Contact Us
            </Link>
          )}
        </div>

        {/* Address + hours — only shown if configured */}
        {(siteConfig.address || siteConfig.hours) && (
          <p className="text-white/60 text-sm mt-6">
            {siteConfig.address && <>📍 {siteConfig.address}</>}
            {siteConfig.address && siteConfig.hours && <>&nbsp;•&nbsp;</>}
            {siteConfig.hours && <>🕐 {siteConfig.hours}</>}
          </p>
        )}
      </div>
    </section>
  );
}
