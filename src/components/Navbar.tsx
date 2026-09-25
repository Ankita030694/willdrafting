"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        hamburgerBtnRef.current &&
        !hamburgerBtnRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setDropdownOpen(false);
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Full Screen Height Background Blur Overlay behind Navbar when Mobile Menu is Open */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-md h-[100dvh] w-screen pointer-events-auto md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className="fixed top-5 left-0 right-0 z-50 w-full px-4 sm:px-6 flex justify-center pointer-events-none">
        {/* Floating Pill Nav with Backdrop Blur */}
        <nav 
          className="pointer-events-auto flex h-[62px] w-full max-w-[1080px] items-center justify-between rounded-full border border-white/60 bg-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300"
          style={{ paddingLeft: "1.25rem", paddingRight: "0.65rem" }}
        >
          {/* Left: Brand Logo with Dedicated Left Padding */}
          <div className="flex items-center md:min-w-[130px] pl-2 sm:pl-4">
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

          {/* Center: Navigation Links (Strict Center Alignment & Distinct Gap on Desktop only) */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-8">
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

                  {/* Desktop Dropdown Menu */}
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

          {/* Right: CTA Button on Desktop */}
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

          {/* Mobile Hamburger Button (Positioned on the Right) */}
          <div className="flex md:hidden items-center pr-1 sm:pr-2">
            <button
              ref={hamburgerBtnRef}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#1c282e] hover:bg-black/5 active:scale-95 focus:outline-none transition-all duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close-icon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <X size={22} className="text-[#1c282e]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu-icon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <Menu size={22} className="text-[#1c282e]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown with Smooth Motion Animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-dropdown"
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1], // Smooth fluid ease-out curve
              }}
              className="pointer-events-auto absolute left-4 right-4 top-[74px] mx-auto max-w-[1080px] rounded-3xl border border-white/60 bg-white/95 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl md:hidden z-50 origin-top"
            >
              <div className="flex flex-col space-y-1 text-left">
                {NAV_ITEMS.map((item, idx) =>
                  item.hasDropdown ? (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.04 + idx * 0.04,
                        duration: 0.22,
                        ease: "easeOut",
                      }}
                      className="border-b border-slate-100 pb-2 mb-1 text-left"
                    >
                      <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400 text-left">
                        {item.label}
                      </div>
                      <div className="ml-2 mt-1 flex flex-col space-y-1 text-left">
                        {item.dropdownItems?.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-left w-full rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-black transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.04 + idx * 0.04,
                        duration: 0.22,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-left w-full rounded-2xl px-4 py-3 text-[15px] font-medium text-[#1c282e] hover:bg-slate-100/80 hover:text-black transition-colors block"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                )}

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.04 + NAV_ITEMS.length * 0.04,
                    duration: 0.22,
                    ease: "easeOut",
                  }}
                  className="pt-3 border-t border-slate-100/80 mt-1"
                >
                  <Link
                    href="/start"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-full bg-[#C65378] py-3 text-[14px] font-medium text-[#FFFFFF] shadow-[0_4px_12px_rgba(198,83,120,0.25)] transition-all active:scale-[0.98]"
                  >
                    Book a call
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
