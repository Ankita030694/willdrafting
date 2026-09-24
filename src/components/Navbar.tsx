"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/how-it-works" },
  { label: "Blogs", href: "/authority/blogs" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-5 left-0 right-0 z-50 w-full px-4 sm:px-6 flex justify-center pointer-events-none">
      {/* Floating Pill Nav with Backdrop Blur */}
      <nav 
        className="pointer-events-auto flex h-[62px] w-full max-w-[1080px] items-center justify-between rounded-full border border-white/60 bg-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300"
        style={{ paddingLeft: "1.25rem", paddingRight: "0.65rem" }}
      >
        {/* Left: Brand Logo with Dedicated Left Padding */}
        <div className="flex items-center min-w-[130px] pl-3 sm:pl-4">
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/Without Text.svg"
              alt="Logo"
              width={34}
              height={34}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Center: Navigation Links (Strict Center Alignment & Distinct Gap) */}
        <div 
          className="hidden md:flex flex-1 items-center justify-center gap-7 lg:gap-8"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem" }}
        >
          {NAV_ITEMS.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.label}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#1c282e] hover:text-black transition-colors focus:outline-none py-1.5"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    size={14}
                    strokeWidth={2.2}
                    className={`text-[#2d3a41] transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute left-1/2 top-full mt-2.5 w-44 -translate-x-1/2 rounded-2xl border border-white/80 bg-white/95 p-1.5 shadow-xl backdrop-blur-lg animate-in fade-in zoom-in-95 duration-150 z-50">
                    {item.dropdownItems?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setDropdownOpen(false)}
                        className="block rounded-xl px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-black transition-colors"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-[14px] font-medium text-[#1c282e] hover:text-black transition-colors py-1.5"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Right: CTA Button with Generous Button Padding and Side Spacing */}
        <div className="hidden md:flex items-center justify-end min-w-[130px] pr-2 sm:pr-3">
          <Link
            href="/start"
            className="inline-flex items-center justify-center rounded-full bg-[#C65378] px-6 py-2.5 text-[14px] font-regular text-[#FFFFFF] transition-all duration-200 active:scale-95"
            style={{
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
              paddingTop: "0.65rem",
              paddingBottom: "0.65rem",
            }}
          >
            Book a call
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center pr-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="rounded-full p-2 text-slate-800 hover:bg-white/60 focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute left-4 right-4 top-20 mx-auto max-w-[1080px] rounded-3xl border border-white/60 bg-white/95 p-5 shadow-2xl backdrop-blur-xl md:hidden animate-in fade-in zoom-in-95 duration-200 z-50">
          <div className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) =>
              item.hasDropdown ? (
                <div key={item.label} className="border-b border-slate-100 pb-2">
                  <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                    {item.label}
                  </div>
                  <div className="ml-2 mt-1 flex flex-col space-y-1">
                    {item.dropdownItems?.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="pt-2">
              <Link
                href="/start"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-[#C65378] py-2.5 text-sm font-medium text-[#FFFFFF] shadow-sm transition-all"
              >
                Book a call
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
