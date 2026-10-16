import Section01Hero from "@/components/sections/Section01Hero";
import Section02Blueprint from "@/components/sections/Section02Blueprint";
import Section03Urban from "@/components/sections/Section03Urban";
import Section04Spotlight from "@/components/sections/Section04Spotlight";
import Section05Footer from "@/components/sections/Section05Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] block">
      <Section01Hero />
      <Section02Blueprint />
      <Section03Urban />
      <Section04Spotlight />
      <Section05Footer />
    </main>
  );
}
