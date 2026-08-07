"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Share2, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-warm-void border-t border-gold/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-hindi text-3xl text-gold mb-4">सिद्ध लक्ष्मी</h3>
            <p className="text-sand text-sm leading-relaxed mb-6">
              Where every stitch tells a story. Jaipur's premium boutique for bespoke tailoring and design.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-cream hover:text-gold transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="text-cream hover:text-gold transition-colors">
                <Share2 size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-cream font-medium mb-4">Explore</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="#craft" className="text-sand text-sm hover:text-gold transition-colors">Our Craft</Link></li>
              <li><Link href="#services" className="text-sand text-sm hover:text-gold transition-colors">Services</Link></li>
              <li><Link href="#portfolio" className="text-sand text-sm hover:text-gold transition-colors">Portfolio</Link></li>
              <li><Link href="#testimonials" className="text-sand text-sm hover:text-gold transition-colors">Testimonials</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h4 className="text-cream font-medium mb-4">Services</h4>
            <ul className="flex flex-col gap-2">
              <li className="text-sand text-sm">Custom Stitching</li>
              <li className="text-sand text-sm">Blouse Design</li>
              <li className="text-sand text-sm">Bridal Lehenga</li>
              <li className="text-sand text-sm">Alterations</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h4 className="text-cream font-medium mb-4">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                <span className="text-sand text-sm leading-relaxed">
                  Shop No. 131, Palika Bazar,<br />
                  Sector 9, Malviya Nagar,<br />
                  Jaipur, Rajasthan 302017
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold shrink-0" />
                <span className="text-sand text-sm">+91 95715 42617</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold shrink-0" />
                <span className="text-sand text-sm">hello@siddhlaxmistudio.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sand text-sm">
            © {new Date().getFullYear()} Siddh Laxmi Studio. All rights reserved.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-gold text-sm hover:underline"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
