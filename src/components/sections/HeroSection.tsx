// "use client";

// import Link from "next/link";
// import { MessageCircle, ShieldCheck, Truck, Headphones } from "lucide-react";
// import { siteConfig, siteImages } from "@/lib/data";
// import { trackEvent } from "@/components/GoogleAnalytics";

// const trustBadges = [
//   { icon: Truck, label: "Send a message to order now", desc: "3-5 days anywhere in our Region" },
//   { icon: ShieldCheck, label: "Genuine Parts Guarantee", desc: "100% authentic OEM & aftermarket" },
//   { icon: Headphones, label: "Support available", desc: "Tractor specialists on call" },
// ];

// export default function HeroSection() {
//   const waHref = siteConfig.whatsapp
//     ? `https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent("Hello! I need help finding tractor parts.")}`
//     : null;

//   return (
//     <section
//       className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden"
//       aria-label="Hero"
//     >
//       {/* Background image — env-supplied or Unsplash fallback */}
//       <div className="absolute inset-0 z-0">
//         <img
//           src={siteImages.hero}
//           alt="Tractor in Nigerian farmland"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32">
//         <div className="max-w-2xl">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm mb-6">
//             <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//             Ibadan&apos;s #1 Tractor Parts Distributor Since {siteConfig.founded}
//           </div>

//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
//             Your Trusted Source for{" "}
//             <span className="text-accent-light">Tractor Parts</span>{" "}
//             in Nigeria
//           </h1>

//           <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed max-w-xl">
//             Premium quality parts for all major tractor brands — John Deere, Massey Ferguson,
//             New Holland, Kubota — with fast nationwide delivery.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4">
//             <Link
//               href="/category"
//               className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-primary-700 transition-all hover:scale-105 shadow-lg"
//               onClick={() => trackEvent.viewCategory("All Products")}
//             >
//               Shop Now
//             </Link>

//             {/* WhatsApp CTA — only rendered when number exists */}
//             {waHref ? (
//               <a
//                 href={waHref}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-accent-hover transition-all hover:scale-105 shadow-lg"
//                 onClick={() => trackEvent.contactUs("whatsapp-hero")}
//               >
//                 <MessageCircle size={18} />
//                 Contact Our Experts
//               </a>
//             ) : (
//               <Link
//                 href="/contact"
//                 className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-accent-hover transition-all hover:scale-105 shadow-lg"
//               >
//                 Contact Our Experts
//               </Link>
//             )}
//           </div>

//           {/* Stats */}
//           <div className="flex gap-8 mt-10">
//             {[
//               { value: siteConfig.stats.partsInStock, label: "Parts in Stock" },
//               { value: siteConfig.stats.satisfiedCustomers, label: "Happy Customers" },
//               { value: siteConfig.stats.statesCovered, label: "States Covered" },
//             ].map((stat) => (
//               <div key={stat.label}>
//                 <div className="text-2xl font-bold text-accent-light">{stat.value}</div>
//                 <div className="text-white/70 text-sm">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Trust badges */}
//       <div className="absolute bottom-0 left-0 right-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-white rounded-t-2xl shadow-xl overflow-hidden">
//           {trustBadges.map((badge) => (
//             <div
//               key={badge.label}
//               className="flex items-center gap-3 px-6 py-4 hover:bg-neutral-50 transition-colors group"
//             >
//               <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
//                 <badge.icon size={20} className="text-primary" />
//               </div>
//               <div>
//                 <div className="font-semibold text-neutral-800 text-sm">{badge.label}</div>
//                 <div className="text-xs text-neutral-500">{badge.desc}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Link from "next/link";
import { MessageCircle, ShieldCheck, Truck, Headphones } from "lucide-react";
import { siteConfig, siteImages } from "@/lib/data";
import { trackEvent } from "@/components/GoogleAnalytics";

const trustBadges = [
  { icon: Truck, label: "Send a message to order now", desc: "3-5 days anywhere in our Region" },
  { icon: ShieldCheck, label: "Genuine Parts Guarantee", desc: "100% authentic OEM & aftermarket" },
  { icon: Headphones, label: "Support available", desc: "Tractor specialists on call" },
];

export default function HeroSection() {
  const waHref = siteConfig.whatsapp
    ? `https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent("Hello! I need help finding tractor parts.")}`
    : null;

  return (
    <section className="relative flex flex-col overflow-hidden" aria-label="Hero">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={siteImages.hero}
          alt="Tractor in Nigerian farmland"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pb-20 min-h-[75vh] flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Ibadan&apos;s #1 Tractor Parts Distributor Since {siteConfig.founded}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
            Your Trusted Source for{" "}
            <span className="text-accent-light">Tractor Parts</span>{" "}
            in Nigeria
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/85 mb-8 leading-relaxed max-w-xl">
            Premium quality parts for all major tractor brands — John Deere, Massey Ferguson,
            New Holland, Kubota — with fast nationwide delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/category"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-primary-700 transition-all hover:scale-105 shadow-lg"
              onClick={() => trackEvent.viewCategory("All Products")}
            >
              Shop Now
            </Link>

            {waHref ? (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-accent-hover transition-all hover:scale-105 shadow-lg"
                onClick={() => trackEvent.contactUs("whatsapp-hero")}
              >
                <MessageCircle size={18} />
                Contact Our Experts
              </a>
            ) : (
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-accent-hover transition-all hover:scale-105 shadow-lg"
              >
                Contact Our Experts
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-6 sm:gap-8 mt-10">
            {[
              { value: siteConfig.stats.partsInStock, label: "Parts in Stock" },
              { value: siteConfig.stats.satisfiedCustomers, label: "Happy Customers" },
              { value: siteConfig.stats.statesCovered, label: "States Covered" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xl sm:text-2xl font-bold text-accent-light">{stat.value}</div>
                <div className="text-white/70 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust badges — in normal flow, not absolute, so they never overlap */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-neutral-100 rounded-t-2xl shadow-xl overflow-hidden">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-3 px-5 py-4 bg-white hover:bg-neutral-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <badge.icon size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-semibold text-neutral-800 text-sm">{badge.label}</div>
                <div className="text-xs text-neutral-500">{badge.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}