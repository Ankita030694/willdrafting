import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AssetCoverage from "@/components/AssetCoverage";
import EstateComparison from "@/components/EstateComparison";
import HowItWorks from "@/components/HowItWorks";
import WillPreviewSection from "@/components/WillPreviewSection";
import LegalValidity from "@/components/LegalValidity";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingNotice from "@/components/PricingNotice";
import FAQSection from "@/components/FAQSection";
import CallToActionBanner from "@/components/CallToActionBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: "1 0 auto" }}>
        <Hero />
        <AssetCoverage />
        <EstateComparison />
        <HowItWorks />
        <WillPreviewSection />
        <LegalValidity />
        <TestimonialsSection />
        <PricingNotice />
        <FAQSection />
        <CallToActionBanner />
      </main>
      <Footer />
    </div>
  );
}
