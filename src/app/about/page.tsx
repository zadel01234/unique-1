import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone, MessageCircle, Award, Users, Globe, Package } from "lucide-react";
import { siteConfig, siteImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us | Unique Truth Auto Limited - Tractor Parts Nigeria",
  description:
    "Learn about Unique Truth Auto Limited, Nigeria's leading tractor parts distributor since 1998. 25+ years of experience, 15,000+ parts in stock, serving farmers across all 36 states.",
  keywords: [
    "tractor parts company Nigeria",
    "agricultural parts distributor Lagos",
    "Unique Truth Auto Limited",
    "tractor parts supplier Nigeria history",
    "about us tractor parts Nigeria",
  ],
  alternates: { canonical: "/about" },
};

const milestones = [
  { year: "1998", title: "Founded", desc: "Started as a small tractor parts shop in Ikeja, Lagos" },
  { year: "2005", title: "Expansion", desc: "Opened our first large warehouse and expanded product range to 5,000+ parts" },
  { year: "2012", title: "Nationwide", desc: "Established delivery partnerships to reach all 36 Nigerian states" },
  { year: "2020", title: "Online", desc: "Launched digital catalog to serve customers more efficiently" },
  { year: "2024", title: "15,000+", desc: "Now stocking over 15,000 parts with 5,000+ satisfied customers" },
];

const team = [
  { name: "Biodun Adeleke", role: "Founder & CEO", exp: "30+ years in agricultural machinery" },
  { name: "Chidi Nwosu", role: "Technical Director", exp: "John Deere certified technician" },
  { name: "Amaka Okafor", role: "Head of Logistics", exp: "Expert in nationwide parts delivery" },
  { name: "Ibrahim Bello", role: "Parts Specialist", exp: "Specialist in Massey Ferguson & New Holland" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            About Unique Truth Auto Limited
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Nigeria&apos;s leading independent distributor of agricultural tractor spare parts since {siteConfig.founded}
          </p>
        </div>
      </div>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Package, value: "15,000+", label: "Parts in Stock" },
              { icon: Users, value: "5,000+", label: "Happy Customers" },
              { icon: Globe, value: "36", label: "States Covered" },
              { icon: Award, value: "25+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-neutral-50 rounded-2xl">
                <stat.icon size={32} className="text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-neutral-600 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Story</h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  Founded in {siteConfig.founded} by agricultural machinery enthusiasts with deep roots in Nigerian farming,
                  Unique Truth Auto Limited began as a modest parts shop in Ikeja, Lagos. Our founders recognized
                  a critical gap: Nigerian farmers were paying premium prices for parts or waiting weeks for
                  imports that could be sourced locally at fair prices.
                </p>
                <p>
                  Over 25 years, we&apos;ve grown into Nigeria&apos;s most trusted independent distributor of tractor
                  spare parts. We stock genuine OEM parts and high-quality aftermarket alternatives for
                  John Deere, Massey Ferguson, New Holland, Kubota, Ford, and many other leading brands.
                </p>
                <p>
                  Our mission remains unchanged: to keep Nigerian farms productive by ensuring farmers
                  always have access to the right parts at the right time, at prices that make sense
                  for the Nigerian agricultural economy.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  "Genuine and aftermarket parts rigorously quality-tested",
                  "Direct partnerships with leading manufacturers",
                  "Technical support from certified tractor specialists",
                  "Nationwide delivery to all 36 states",
                  "Bulk order discounts for dealers and cooperatives",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                    <span className="text-neutral-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src={siteImages.about}
                alt="Unique Truth Auto Limited warehouse - Nigeria tractor parts"
                className="rounded-2xl shadow-2xl w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-white rounded-2xl p-4 shadow-lg">
                <div className="text-3xl font-bold">1998</div>
                <div className="text-sm opacity-90">Proudly serving Nigeria</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex items-center gap-6 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4 inline-block max-w-xs">
                      <div className="font-semibold text-neutral-800">{milestone.title}</div>
                      <div className="text-sm text-neutral-500 mt-1">{milestone.desc}</div>
                    </div>
                  </div>
                  <div className="relative z-10 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {milestone.year.slice(2)}
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Contact our expert team today and find the right parts for your tractor.
          </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {siteConfig.whatsapp && (
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3.5 rounded-xl font-semibold hover:bg-accent hover:text-white transition-colors"
            >
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          )}
          <Link
            href="/category"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white hover:text-primary transition-colors"
          >
            Browse Parts
          </Link>
        </div>
        </div>
      </section>
    </div>
  );
}
