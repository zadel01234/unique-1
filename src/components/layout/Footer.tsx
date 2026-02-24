import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, MessageCircle } from "lucide-react";
import { siteConfig, siteImages, categories } from "@/lib/data";

export default function Footer() {
  const { socialMedia, phone, email, address, hours, whatsapp } = siteConfig;

  // WhatsApp href helper
  const waHref = whatsapp
    ? `https://wa.me/${whatsapp.replace("+", "")}`
    : null;

  // Social icons — only rendered when a URL is provided
  const socials = [
    { url: socialMedia.facebook, Icon: Facebook, label: "Facebook" },
    { url: socialMedia.twitter, Icon: Twitter, label: "Twitter" },
    { url: socialMedia.instagram, Icon: Instagram, label: "Instagram" },
    { url: waHref, Icon: MessageCircle, label: "WhatsApp", hoverClass: "hover:bg-green-600" },
  ].filter((s) => !!s.url);

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center overflow-hidden">
                {siteImages.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={siteImages.logo}
                    alt="Unique Truth Auto Limited"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg leading-none">🚜</span>
                )}
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-tight">Unique Truth</div>
                <div className="text-xs text-neutral-400 -mt-0.5">Auto Limited</div>
              </div>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Nigeria&apos;s trusted supplier of quality tractor parts and agricultural equipment since{" "}
              {siteConfig.founded}.
            </p>

            {/* Social icons — only shown when URLs exist */}
            {socials.length > 0 && (
              <div className="flex gap-3">
                {socials.map(({ url, Icon, label, hoverClass }) => (
                  <a
                    key={label}
                    href={url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 bg-neutral-800 ${hoverClass ?? "hover:bg-accent"} rounded-full flex items-center justify-center transition-colors`}
                    aria-label={label}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href="/category"
                    className="text-neutral-400 hover:text-accent transition-colors text-sm"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/category" className="text-neutral-400 hover:text-accent transition-colors text-sm">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact Us" },
                { href: "/contact#quote", label: "Request a Quote" },
                { href: "/sitemap.xml", label: "Sitemap" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-accent transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info — only shows fields that have values */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact Info</h3>
            <ul className="space-y-3">
              {address && (
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-400 text-sm">{address}</span>
                </li>
              )}
              {phone && phone !== "—" && (
                <li>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 text-neutral-400 hover:text-accent transition-colors text-sm"
                  >
                    <Phone size={16} className="text-accent flex-shrink-0" />
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-neutral-400 hover:text-accent transition-colors text-sm break-all"
                  >
                    <Mail size={16} className="text-accent flex-shrink-0" />
                    {email}
                  </a>
                </li>
              )}
              {hours && (
                <li className="flex items-start gap-3">
                  <Clock size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-400 text-sm">{hours}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span>🇳🇬 Made for Nigerian farmers</span>
            <span>•</span>
            <span>Delivering nationwide since {siteConfig.founded}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
