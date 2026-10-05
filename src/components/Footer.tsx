"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [timeStr, setTimeStr] = useState("09:00 AM IST");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setTimeStr(`${now.toLocaleTimeString("en-IN", options)} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-[#FAF7F0] pt-16 sm:pt-20 pb-12 text-[#49585F] text-[0.92rem]">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16">
          {/* Column 1: Brand Wordmark, Mission, and Live Status Badge */}
          <div className="lg:col-span-4 flex flex-col justify-between pr-0 lg:pr-8">
            <div>
              <Link href="/" className="inline-block mb-5">
                <Image
                  src="/Logofinal.svg"
                  alt="WillDrafting.in - Online Will Drafting and Estate Succession Services in India"
                  width={260}
                  height={36}
                  className="h-8 sm:h-15 w-auto object-contain"
                  priority
                />
              </Link>

              <p className="text-[0.925rem] leading-[1.65] text-[#55636D] max-w-[340px] mb-8">
                Clear, legally binding Will drafting and succession planning under the Indian Succession Act, 1925. Protect your family and assets with ease.
              </p>
            </div>

            {/* Live Callback Status Indicator */}
            <div className="flex items-center gap-2.5 text-[0.725rem] font-bold tracking-[0.14em] uppercase text-[#3B484F]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Legal Desk Open</span>
              <span className="text-[#88949E] font-normal">|</span>
              <span className="text-[#6C7882] font-mono font-medium">{timeStr}</span>
            </div>
          </div>

          {/* Column 2: NAVIGATION */}
          <div className="lg:col-span-2">
            <p className="text-[0.75rem] font-bold tracking-[0.16em] uppercase text-[#172228] mb-5">
              Quick Links
            </p>
            <ul className="space-y-3.5 text-[0.90rem]">
              <li>
                <Link href="/" className="hover:text-[#172228] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/aboutus" className="hover:text-[#172228] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#172228] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/service" className="hover:text-[#172228] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#172228] transition-colors">
                  Pricing & Plans
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-[#172228] transition-colors">
                  Legal Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: WILL SERVICES */}
          <div className="lg:col-span-3">
            <p className="text-[0.75rem] font-bold tracking-[0.16em] uppercase text-[#172228] mb-5">
              Legal Solutions
            </p>
            <ul className="space-y-3.5 text-[0.90rem]">
              <li>
                <Link href="/start" className="hover:text-[#172228] transition-colors">
                  Draft Online Will in Minutes
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#172228] transition-colors">
                  Lawyer Review & Verification
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#172228] transition-colors">
                  Court-Ready PDF Printout
                </Link>
              </li>
              <li>
                <Link href="/contactus" className="hover:text-[#172228] transition-colors">
                  Will Registration Guidance
                </Link>
              </li>
              <li>
                <Link href="/contactus" className="hover:text-[#172228] transition-colors">
                  Probate & Succession Advice
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: REACH US */}
          <div className="lg:col-span-3">
            <p className="text-[0.75rem] font-bold tracking-[0.16em] uppercase text-[#172228] mb-5">
              Reach Us
            </p>
            <div className="space-y-4 text-[0.90rem] leading-relaxed">
              <p>
                <a href="tel:+919820098765" className="hover:text-[#172228] transition-colors font-medium">
                  +91 98200 98765
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@willdrafting.in"
                  className="font-medium text-[#172228] underline underline-offset-4 decoration-[#172228]/40 hover:decoration-[#172228] transition-colors"
                >
                  hello@willdrafting.in
                </a>
              </p>
              <div className="text-[#55636D] pt-1 text-xs leading-normal">
                <p>WillDrafting Legal Solutions</p>
                <p>New Delhi & Mumbai, India</p>
                <p className="mt-1">Mon – Sat, 9:00 AM – 8:00 PM IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1B2A4A]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#7B8791]">
          <div>
            © {new Date().getFullYear()} WillDrafting.in — All rights reserved.
          </div>

          <div className="text-center">
            Compliant with Section 63, Indian Succession Act, 1925
          </div>

          <div className="text-right">
            <Link href="/contactus" className="hover:underline">
              Terms & Legal Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
