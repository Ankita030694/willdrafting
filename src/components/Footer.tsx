"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [timeStr, setTimeStr] = useState<string>("3:54 AM PT");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString("en-US", {
          timeZone: "America/Los_Angeles",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        setTimeStr(`${formatted} PT`);
      } catch {
        setTimeStr("3:54 AM PT");
      }
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
                  src="Logofinal.svg"
                  alt="WillDrafting"
                  width={260}
                  height={36}
                  className="h-8 sm:h-15 w-auto object-contain"
                  priority
                />
              </Link>

              <p className="text-[0.925rem] leading-[1.65] text-[#55636D] max-w-[340px] mb-8">
                We take on the insurers, the paperwork and the phone calls, so you can get on with getting better.
              </p>
            </div>

            {/* Live Callback Status Indicator */}
            <div className="flex items-center gap-2.5 text-[0.725rem] font-bold tracking-[0.14em] uppercase text-[#3B484F]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>We Call Back First Thing</span>
              <span className="text-[#88949E] font-normal">|</span>
              <span className="text-[#6C7882] font-mono font-medium">{timeStr}</span>
            </div>
          </div>

          {/* Column 2: SITE */}
          <div className="lg:col-span-2">
            <p className="text-[0.75rem] font-bold tracking-[0.16em] uppercase text-[#172228] mb-5">
              Site
            </p>
            <ul className="space-y-3.5 text-[0.90rem]">
              <li>
                <Link href="/how-it-works" className="hover:text-[#172228] transition-colors">
                  Practice areas
                </Link>
              </li>
              <li>
                <Link href="/authority" className="hover:text-[#172228] transition-colors">
                  Case results
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#172228] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#172228] transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/authority/blogs" className="hover:text-[#172228] transition-colors">
                  Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: WHAT WE TAKE ON */}
          <div className="lg:col-span-3">
            <p className="text-[0.75rem] font-bold tracking-[0.16em] uppercase text-[#172228] mb-5">
              What We Take On
            </p>
            <ul className="space-y-3.5 text-[0.90rem]">
              <li>
                <Link href="/start" className="hover:text-[#172228] transition-colors">
                  Collisions
                </Link>
              </li>
              <li>
                <Link href="/start" className="hover:text-[#172228] transition-colors">
                  Workplace injury
                </Link>
              </li>
              <li>
                <Link href="/start" className="hover:text-[#172228] transition-colors">
                  Pedestrian and cyclist
                </Link>
              </li>
              <li>
                <Link href="/start" className="hover:text-[#172228] transition-colors">
                  Unsafe premises
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
                <a href="tel:4155550148" className="hover:text-[#172228] transition-colors">
                  (415) 555 0148
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@willdrafting.com"
                  className="font-medium text-[#172228] underline underline-offset-4 decoration-[#172228]/40 hover:decoration-[#172228] transition-colors"
                >
                  hello@willdrafting.com
                </a>
              </p>
              <div className="text-[#55636D] pt-1">
                <p>1 Sansome Street, Suite 3500</p>
                <p>San Francisco, CA 94104</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1B2A4A]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#7B8791]">
          <div>
            © {new Date().getFullYear()} WillDrafting LLP
          </div>

          <div className="text-center">
            Attorney advertising
          </div>

          <div className="text-right">
            Past results do not guarantee a similar outcome.
          </div>
        </div>
      </div>
    </footer>
  );
}
