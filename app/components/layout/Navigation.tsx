"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-ivory/95 backdrop-blur-md py-4 shadow-[0_1px_24px_rgba(28,20,16,0.08)] border-b border-mist/60"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className={cn(
            "font-hindi text-2xl transition-colors duration-300",
            scrolled ? "text-wine" : "text-antique-gold"
          )}
        >
          सिद्ध लक्ष्मी
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {["#craft", "#services", "#portfolio"].map((href, i) => {
            const labels = ["Our Craft", "Services", "Portfolio"];
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors duration-200",
                  scrolled
                    ? "text-walnut hover:text-wine"
                    : "text-ivory/90 hover:text-antique-gold"
                )}
              >
                {labels[i]}
              </Link>
            );
          })}
          <Link
            href="#contact"
            className={cn(
              "text-sm font-medium px-5 py-2.5 rounded-sm transition-all duration-300",
              scrolled
                ? "bg-wine text-ivory hover:bg-wine-light border border-wine"
                : "bg-antique-gold/15 text-antique-gold border border-antique-gold/40 hover:bg-antique-gold hover:text-ivory"
            )}
          >
            Book Consultation
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className={cn(
            "md:hidden transition-colors",
            scrolled ? "text-walnut" : "text-ivory"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-ivory/98 backdrop-blur-xl border-t border-mist shadow-lg p-6 flex flex-col gap-5">
          {[
            { href: "#craft", label: "Our Craft" },
            { href: "#services", label: "Services" },
            { href: "#portfolio", label: "Portfolio" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-lg text-walnut hover:text-wine transition-colors font-display"
              onClick={() => setMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="text-lg text-ivory bg-wine px-4 py-3 rounded-sm text-center font-medium hover:bg-wine-light transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
