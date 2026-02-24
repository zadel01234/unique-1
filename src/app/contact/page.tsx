"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { trackEvent } from "@/components/GoogleAnalytics";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    productInterest: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Derived helpers
  const waHref = siteConfig.whatsapp
    ? `https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent("Hello! I need help finding tractor parts.")}`
    : null;
  const hasPhone = siteConfig.phone && siteConfig.phone !== "—";

  // Build contact items — only include ones that have values
  const contactItems = [
    siteConfig.address && {
      icon: MapPin,
      title: "Visit Us",
      content: siteConfig.address,
      link: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`,
      external: true,
    },
    hasPhone && {
      icon: Phone,
      title: "Call Us",
      content: siteConfig.phone,
      link: `tel:${siteConfig.phone}`,
      external: false,
    },
    siteConfig.email && {
      icon: Mail,
      title: "Email Us",
      content: siteConfig.email,
      link: `mailto:${siteConfig.email}`,
      external: false,
    },
    siteConfig.hours && {
      icon: Clock,
      title: "Working Hours",
      content: siteConfig.hours,
      link: null,
      external: false,
    },
  ].filter(Boolean) as {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    title: string;
    content: string;
    link: string | null;
    external: boolean;
  }[];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: Replace with real backend / EmailJS / Formspree integration
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setSubmitting(false);
    trackEvent.contactUs("contact-form");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/80">
            Our tractor parts experts are ready to help you find exactly what you need
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Left: contact info ── */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-6">Get In Touch</h2>

            {contactItems.length > 0 && (
              <div className="space-y-6 mb-8">
                {contactItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-800 text-sm">{item.title}</div>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-neutral-600 text-sm hover:text-primary transition-colors"
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                        >
                          {item.content}
                        </a>
                      ) : (
                        <div className="text-neutral-600 text-sm">{item.content}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* WhatsApp CTA — only when number is configured */}
            {waHref && (
              <>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-green-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors w-full"
                  onClick={() => trackEvent.contactUs("whatsapp-contact-page")}
                >
                  <MessageCircle size={20} />
                  WhatsApp Us for Faster Response
                </a>
                <p className="text-xs text-neutral-400 text-center mt-2">
                  Typically responds within 30 minutes during business hours
                </p>
              </>
            )}
          </div>

          {/* ── Right: form ── */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-12 text-center">
                <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-neutral-800 mb-2">Message Sent!</h3>
                <p className="text-neutral-600 mb-6">
                  Thank you for contacting us. Our team will get back to you within 2 hours
                  during business hours.
                </p>
                {hasPhone && (
                  <p className="text-sm text-neutral-500 mb-6">
                    For faster response, call us directly: {siteConfig.phone}
                  </p>
                )}
                <Link href="/category" className="btn-primary inline-flex">
                  Browse Parts While You Wait
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
                <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="08XX XXX XXXX"
                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="parts-inquiry">Parts Inquiry</option>
                      <option value="quote-request">Request a Quote</option>
                      <option value="order-status">Order Status</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="bulk-order">Bulk Order Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Tractor Make/Model (if applicable)
                    </label>
                    <input
                      type="text"
                      name="productInterest"
                      value={formData.productInterest}
                      onChange={handleChange}
                      placeholder="e.g., John Deere 5055E, Massey Ferguson 290"
                      className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe the parts you need, the part number if known, and your delivery location..."
                      className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 px-6 rounded-xl font-semibold hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
