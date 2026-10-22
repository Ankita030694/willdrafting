"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";

interface DropdownItem {
  label: string;
  href: string;
  badge?: string;
  isComingSoon?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Services",
    href: "/services",
    hasDropdown: true,
    dropdownItems: [
      { label: "All Will Services", href: "/services" },
      { label: "NRI & OCI Indian Will", href: "/services/nri-will-india" },
      { label: "Succession Calculator", href: "/tools/succession-calculator" },
      { label: "Legal Heir", href: "/services/legal-heir" },
      { label: "Relinquishment Deed", href: "/services/relinquishment-deed" },
      { label: "Survivor Member Certificate", href: "/services/survivor-member-certificate" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const openSignup = () => window.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      if (typeof window !== "undefined") {
        if ("scrollRestoration" in window.history) {
          window.history.scrollRestoration = "manual";
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        if (window.location.hash || window.location.search) {
          window.location.href = "/";
        } else {
          window.location.reload();
        }
      }
    }
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 280);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        if (dropdownTimeoutRef.current) {
          clearTimeout(dropdownTimeoutRef.current);
        }
        setDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        hamburgerBtnRef.current &&
        !hamburgerBtnRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
        setOpenMobileDropdown(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (dropdownTimeoutRef.current) {
          clearTimeout(dropdownTimeoutRef.current);
        }
        setMobileMenuOpen(false);
        setDropdownOpen(false);
        setOpenMobileDropdown(null);
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setOpenMobileDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setOpenMobileDropdown(null);
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
              onClick={handleHomeClick}
              className="flex items-center transition-opacity hover:opacity-80"
            >
              <Image
                src="/Logofinal.svg"
                alt="WillDrafting.in Logo - Legally Valid Online Wills in India"
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
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (dropdownTimeoutRef.current) {
                        clearTimeout(dropdownTimeoutRef.current);
                      }
                      setDropdownOpen((prev) => !prev);
                    }}
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

                  {/* Desktop Dropdown Menu with bridging padding */}
                  {dropdownOpen && (
                    <div
                      className="absolute left-1/2 top-full pt-2 -translate-x-1/2 z-50"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="w-64 rounded-2xl border border-white/80 bg-white/95 p-1.5 shadow-xl backdrop-blur-lg animate-in fade-in zoom-in-95 duration-150">
                        {item.dropdownItems?.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            onClick={() => {
                              if (dropdownTimeoutRef.current) {
                                clearTimeout(dropdownTimeoutRef.current);
                              }
                              setDropdownOpen(false);
                            }}
                            className="flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-black transition-colors"
                          >
                            <span>{subItem.label}</span>
                            {subItem.badge && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-[#C65378] bg-[#F5EBF4] px-1.5 py-0.5 rounded">
                                {subItem.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={item.href === "/" ? handleHomeClick : undefined}
                  className="text-[14px] font-medium text-[#1c282e] hover:text-black transition-colors py-1.5"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Right: Login & CTA Buttons on Desktop */}
          <div className="hidden md:flex items-center justify-end gap-2.5 min-w-[200px] pr-2 sm:pr-3">
            {isAuthenticated ? (
              <Link
                href="/start/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-[#C65378] px-5 py-2 text-[13.5px] font-medium text-[#FFFFFF] transition-all duration-200 active:scale-95 hover:bg-[#b04567]"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#1c282e]/25 bg-white/60 px-4 py-2 text-[13.5px] font-semibold text-[#1c282e] hover:bg-white hover:border-[#1c282e]/50 transition-all duration-200"
                >
                  <LogIn size={14} />
                  <span>Login</span>
                </Link>
                <button
                  type="button"
                  onClick={openSignup}
                  className="inline-flex items-center justify-center rounded-full bg-[#C65378] px-5 py-2 text-[13.5px] font-medium text-[#FFFFFF] transition-all duration-200 active:scale-95 hover:bg-[#b04567] cursor-pointer"
                >
                  Start now
                </button>
              </>
            )}
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
              className="pointer-events-auto absolute left-4 right-4 top-[74px] mx-auto max-w-[1080px] max-h-[calc(100dvh-95px)] overflow-y-auto rounded-3xl border border-white/60 bg-white/95 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl md:hidden z-50 origin-top"
            >
              <div className="flex flex-col space-y-1 text-left">
                {NAV_ITEMS.map((item, idx) => {
                  const isItemOpen = openMobileDropdown === item.label;

                  return item.hasDropdown ? (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.04 + idx * 0.04,
                        duration: 0.22,
                        ease: "easeOut",
                      }}
                      className="w-full text-left"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMobileDropdown((prev) =>
                            prev === item.label ? null : item.label
                          )
                        }
                        aria-expanded={isItemOpen}
                        className="flex items-center justify-between text-left w-full rounded-2xl px-4 py-3 text-[15px] font-medium text-[#1c282e] hover:bg-slate-100/80 hover:text-black transition-colors focus:outline-none"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={18}
                          strokeWidth={2.2}
                          className={`text-[#2d3a41] transition-transform duration-200 ${
                            isItemOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isItemOpen && (
                          <motion.div
                            key={`dropdown-${item.label}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.25,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="mx-1 my-1 flex flex-col space-y-1 rounded-2xl bg-slate-50/80 p-1.5 border border-slate-100/80">
                              {item.dropdownItems?.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    setOpenMobileDropdown(null);
                                  }}
                                  className="flex items-center justify-between text-left w-full rounded-xl px-3.5 py-2.5 text-[14px] font-medium text-slate-700 hover:bg-white hover:text-black transition-colors"
                                >
                                  <span>{sub.label}</span>
                                  {sub.badge && (
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#C65378] bg-[#F5EBF4] px-2 py-0.5 rounded">
                                      {sub.badge}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
                        onClick={(e) => {
                          setMobileMenuOpen(false);
                          if (item.href === "/") {
                            handleHomeClick(e);
                          }
                        }}
                        className="text-left w-full rounded-2xl px-4 py-3 text-[15px] font-medium text-[#1c282e] hover:bg-slate-100/80 hover:text-black transition-colors block"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.04 + NAV_ITEMS.length * 0.04,
                    duration: 0.22,
                    ease: "easeOut",
                  }}
                  className="pt-3 border-t border-slate-100/80 mt-1 flex flex-col gap-2.5"
                >
                  {isAuthenticated ? (
                    <Link
                      href="/start/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex w-full items-center justify-center rounded-full bg-[#C65378] py-2.5 text-[14px] font-medium text-[#FFFFFF] shadow-[0_4px_12px_rgba(198,83,120,0.25)] transition-all active:scale-[0.98]"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex w-full items-center justify-center gap-1.5 rounded-full border border-[#1c282e]/25 bg-slate-50 py-2.5 text-[14px] font-semibold text-[#1c282e] transition-all"
                      >
                        <LogIn size={15} />
                        <span>Login</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          openSignup();
                        }}
                        className="flex w-full items-center justify-center rounded-full bg-[#C65378] py-2.5 text-[14px] font-medium text-[#FFFFFF] shadow-[0_4px_12px_rgba(198,83,120,0.25)] transition-all active:scale-[0.98] cursor-pointer"
                      >
                        Start now
                      </button>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
