"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import CodeDemo from "@/components/CodeDemo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="loomed-landing min-h-screen bg-[var(--color-bg)]">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-[var(--color-text)] px-4 py-2 text-sm font-bold text-[var(--color-surface)] transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <FeatureCards />
        <CodeDemo />
      </main>
      <Footer />
    </div>
  );
}
