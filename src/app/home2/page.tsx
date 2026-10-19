import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home2Content from "@/components/home2/Home2Content";

export const metadata: Metadata = {
  title: {
    absolute: "India's First Online Will Drafting Platform | Create Your Will Online",
  },
  description:
    "Plan with love, protect with Will. Answer simple questions in Hindi or English, create your legally valid Indian Will online in 15 minutes, backed by AMA Legal Solutions.",
  alternates: {
    canonical: "https://www.willdrafting.in/home2",
  },
};

export default function Home2Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#2C221E]">
      <Navbar />
      <main id="main-content" className="flex-1 w-full">
        <Home2Content />
      </main>
      <Footer />
    </div>
  );
}
