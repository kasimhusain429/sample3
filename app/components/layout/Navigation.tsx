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
        scrolled ? "bg-warm-void/90 backdrop-blur-md py-4 shadow-lg" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="font-hindi text-2xl text-gold">
          सिद्ध लक्ष्मी
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="#craft" className="text-sm font-medium hover:text-gold transition-colors">
            Our Craft
          </Link>
          <Link href="#services" className="text-sm font-medium hover:text-gold transition-colors">
            Services
          </Link>
          <Link href="#portfolio" className="text-sm font-medium hover:text-gold transition-colors">
            Portfolio
          </Link>
          <Link href="#contact" className="text-sm font-medium px-4 py-2 border border-gold/30 rounded-full hover:bg-gold/10 transition-colors text-gold">
            Book Consultation
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-cream"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-void border-t border-gold/10 p-6 flex flex-col gap-4">
          <Link href="#craft" className="text-lg hover:text-gold" onClick={() => setMobileMenuOpen(false)}>
            Our Craft
          </Link>
          <Link href="#services" className="text-lg hover:text-gold" onClick={() => setMobileMenuOpen(false)}>
            Services
          </Link>
          <Link href="#portfolio" className="text-lg hover:text-gold" onClick={() => setMobileMenuOpen(false)}>
            Portfolio
          </Link>
          <Link href="#contact" className="text-lg text-gold" onClick={() => setMobileMenuOpen(false)}>
            Book Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
