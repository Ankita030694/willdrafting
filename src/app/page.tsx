import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyTrust from "@/components/whytrust";
import BelowTrust from "@/components/belowtrust";
import WhatWeDo from "@/components/whatwedo";
import Process from "@/components/process";
import EstateComparison from "@/components/EstateComparison";
import LegalValidity from "@/components/LegalValidity";
import Pricing from "@/components/pricing";
import Testimonial from "@/components/testimonial";
import FAQ from "@/components/faq";
import CTA from "@/components/cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: "1 0 auto" }}>
        <Hero />
        <WhyTrust />
        <BelowTrust />
        <WhatWeDo />
        <Process />
        <EstateComparison />
        
        <Pricing />
        <Testimonial />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
