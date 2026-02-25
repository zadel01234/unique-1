import { ShieldCheck, Truck, DollarSign, HeadphonesIcon } from "lucide-react";
import { siteConfig} from "@/lib/data";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Premium Quality Parts",
    description: "We source only the highest quality parts that meet or exceed OEM specifications for all major tractor brands.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day dispatch for Oyo state orders, regionwide delivery within 3-5 working days anywhere.",
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    description: "Direct-from-factory prices with no middleman markups. Bulk order discounts available for mechanics and dealers.",
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Support",
    description: "Our team of tractor specialists can help you find the right part for your needs. Call or WhatsApp us anytime.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-20 bg-neutral-50" aria-label="Why Choose Us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title">Why Choose Unique Truth Auto Limited?</h2>
          <p className="section-subtitle mx-auto text-center">
            Over {siteConfig.yearsExperience} years of serving Nigerian farmers with quality tractor parts and unmatched service
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <reason.icon size={28} className="text-primary" />
              </div>
              <h3 className="font-semibold text-neutral-800 mb-3 text-base">{reason.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
