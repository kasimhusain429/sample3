"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-espresso border-t border-antique-gold/15 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B8883A' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-hindi text-3xl text-antique-gold mb-4">सिद्ध लक्ष्मी</h3>
            <div className="line-gold w-12 mb-5" />
            <p className="text-mist/70 text-sm leading-relaxed mb-7">
              Where every stitch tells a story. Jaipur&rsquo;s premium boutique for bespoke tailoring and design.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full border border-antique-gold/30 flex items-center justify-center text-mist/70 hover:text-antique-gold hover:border-antique-gold transition-all duration-200 hover:scale-110">
                <MessageCircle size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-antique-gold/30 flex items-center justify-center text-mist/70 hover:text-antique-gold hover:border-antique-gold transition-all duration-200 hover:scale-110">
                <Share2 size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-ivory/90 font-medium mb-5 text-sm uppercase tracking-widest">Explore</h4>
            <ul className="flex flex-col gap-3">
              {[
                { href: "#craft", label: "Our Craft" },
                { href: "#services", label: "Services" },
                { href: "#portfolio", label: "Portfolio" },
                { href: "#testimonials", label: "Testimonials" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-mist/60 text-sm hover:text-antique-gold transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h4 className="text-ivory/90 font-medium mb-5 text-sm uppercase tracking-widest">Services</h4>
            <ul className="flex flex-col gap-3">
              {["Custom Stitching", "Blouse Design", "Bridal Lehenga", "Alterations", "Urgent Orders"].map((svc) => (
                <li key={svc} className="text-mist/60 text-sm hover:text-dusty-rose transition-colors duration-200 cursor-default">
                  {svc}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h4 className="text-ivory/90 font-medium mb-5 text-sm uppercase tracking-widest">Contact</h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-antique-gold shrink-0 mt-0.5" />
                <span className="text-mist/60 text-sm leading-relaxed">
                  Shop No. 131, Palika Bazar,<br />
                  Sector 9, Malviya Nagar,<br />
                  Jaipur, Rajasthan 302017
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-antique-gold shrink-0" />
                <a href="tel:+919571542617" className="text-mist/60 text-sm hover:text-antique-gold transition-colors">
                  +91 95715 42617
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-antique-gold shrink-0" />
                <span className="text-mist/60 text-sm">hello@siddhlaxmistudio.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-antique-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-mist/40 text-sm">
            © {new Date().getFullYear()} Siddh Laxmi Studio. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-antique-gold/60 text-sm hover:text-antique-gold transition-colors hover:underline"
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
