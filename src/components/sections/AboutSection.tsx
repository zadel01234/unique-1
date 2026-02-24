import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { siteConfig, siteImages } from "@/lib/data";

const highlights = [
  "Genuine and aftermarket parts available",
  "Technical support for all products",
  "Bulk order discounts available",
  "Nationwide delivery to all 36 states",
  "25+ years of industry experience",
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-white" aria-label="About Unique Truth Auto Limited">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-accent/10 text-accent font-semibold text-sm px-4 py-2 rounded-full mb-4">
              About Us
            </div>
            <h2 className="section-title mb-2">About Unique Truth Auto Limited</h2>
            <p className="text-accent font-semibold text-lg mb-6">
              With Over {siteConfig.yearsExperience} Years&apos; Experience in Agricultural Parts
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              We are Nigeria&apos;s leading independent distributor of agricultural tractor spare parts and accessories,
              serving farmers and mechanics across the country since {siteConfig.founded}. Our deep expertise
              and vast inventory ensure you always find the right part at the right price.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { value: siteConfig.stats.partsInStock, label: "Parts in Stock" },
                { value: siteConfig.stats.satisfiedCustomers, label: "Satisfied Customers" },
                { value: siteConfig.stats.statesCovered, label: "States Covered" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                  <span className="text-neutral-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all"
            >
              Learn More About Us
            </Link>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={siteImages.about}
                alt="Unique Truth Auto Limited warehouse - tractor parts storage in Lagos Nigeria"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
            {/* Badge */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent text-white rounded-full flex flex-col items-center justify-center shadow-xl">
              <div className="text-2xl font-bold">{siteConfig.yearsExperience}+</div>
              <div className="text-xs text-center leading-tight">Years Experience</div>
            </div>
            {/* Small accent card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-neutral-100">
              <div className="text-2xl font-bold text-primary">{siteConfig.stats.partsInStock}</div>
              <div className="text-xs text-neutral-500">Parts Available Now</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
