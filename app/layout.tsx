import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Serif_Devanagari, Dancing_Script } from "next/font/google";
import "./globals.css";

import LenisProvider from "./components/layout/LenisProvider";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const tiro = Noto_Serif_Devanagari({
  variable: "--font-tiro",
  subsets: ["devanagari"],
  weight: ["400"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Siddh Laxmi Studio | Premium Boutique & Tailor in Malviya Nagar, Jaipur",
  description: "5★ rated boutique tailor in Jaipur. Expert stitching, blouse design, lehenga, sharara, alterations & urgent service. Near Balaji Mandir, Palika Bazar. Call 95715 42617.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${tiro.variable} ${dancing.variable} antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <LenisProvider>
          <Navigation />
          <main className="flex-1 w-full relative z-10">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
