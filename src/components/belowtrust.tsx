"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ShieldCheck, FileCheck, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

interface ClauseItem {
  id: string;
  number: string;
  title: string;
  lawRef: string;
  badge: string;
  summary: string;
  legalSnippet: string;
  image?: string;
  points: string[];
}

const CLAUSE_ITEMS: ClauseItem[] = [
  {
    id: "clause-1",
    number: "1/",
    title: "Declaration of Sound Mind & Revocation",
    lawRef: "Indian Succession Act, 1925 · Section 59 & Section 62",
    badge: "Testamentary Capacity",
    summary:
      "Explicitly establishes voluntary testamentary capacity and automatically supersedes any previous wills, codicils, or oral declarations to avoid conflicting claims.",
    legalSnippet:
      "I hereby declare that I am of sound mind, memory, and understanding, and that I make this last Will voluntarily without any undue influence, coercion, or misrepresentation. I hereby revoke all prior Wills, codicils, and testamentary dispositions made by me at any time.",
    image: "/images/senior-couple.jpg",
    points: [
      "Explicit revocation of all prior wills & codicils",
      "Confirms mental capacity under Section 59",
      "Preempts disputes regarding coercion or duress",
    ],
  },
  {
    id: "clause-2",
    number: "2/",
    title: "Appointment of Executors & Administrators",
    lawRef: "Indian Succession Act, 1925 · Section 222",
    badge: "Estate Administration",
    summary:
      "Appoints primary and alternate executors with full legal authority to represent your estate, obtain probate where required, and distribute assets precisely as intended.",
    legalSnippet:
      "I hereby appoint [PRIMARY EXECUTOR NAME], residing at [ADDRESS], to be the sole Executor of this my Will. In the event they predecease me or decline to act, I appoint [ALTERNATE EXECUTOR NAME] as alternate Executor with identical powers.",
    image: "/images/advocate.jpg",
    points: [
      "Sole and alternate executor contingency",
      "Immediate legal authority to access & manage accounts",
      "Powers to clear debts, funeral expenses & distribute shares",
    ],
  },
  {
    id: "clause-3",
    number: "3/",
    title: "Specific Asset Devolutions & Residual Estate",
    lawRef: "Indian Succession Act, 1925 · Part VI, Chapters I–VII",
    badge: "Asset Distribution",
    summary:
      "Categorizes immovable properties, financial investments, demat accounts, gold, and digital keys, backed by an all-inclusive residuary clause that catches omitted assets.",
    legalSnippet:
      "I bequeath my residential flat situated at [PROPERTY ADDRESS] unto [BENEFICIARY NAME] absolutely. All my bank deposits, mutual fund holdings, demat portfolios, and residual movable assets shall devolve upon [RESIDUARY BENEFICIARY] free from encumbrances.",
    image: "/images/preview-navy.png",
    points: [
      "Clear separation of immovable & movable holdings",
      "Comprehensive residuary clause prevents partial intestacy",
      "Addresses digital assets, crypto wallets & lockers",
    ],
  },
  {
    id: "clause-4",
    number: "4/",
    title: "Guardianship for Minor Children",
    lawRef: "Guardians and Wards Act, 1890",
    badge: "Minor Protection",
    summary:
      "Designates trusted testamentary guardians for minor children and establishes trust management for funds until they attain financial maturity at age 21 or 25.",
    legalSnippet:
      "In the event of demise of both myself and my spouse while any child of ours is a minor, I nominate and appoint [GUARDIAN NAME] to be the legal and physical Guardian of the person and property of my minor children.",
    image: "/images/hero-family.jpg",
    points: [
      "Prevents court-appointed stranger guardians",
      "Trust arrangement protects children's educational funds",
      "Alternate guardian fallback clause",
    ],
  },
  {
    id: "clause-5",
    number: "5/",
    title: "Execution & Two-Witness Attestation",
    lawRef: "Indian Succession Act, 1925 · Section 63(c)",
    badge: "Execution Validity",
    summary:
      "Adheres strictly to the mandatory two-witness attestation rule with standard attestation clauses certifying that both witnesses observed the testator sign in their presence.",
    legalSnippet:
      "Signed by the Testator in our joint presence, and attested by each of us in the presence of the Testator and each other, all being present at the same time. Neither witness is a beneficiary nor spouse of a beneficiary under this Will.",
    image: "/hero.jpeg",
    points: [
      "Strict compliance with Section 63(c) dual-witness rule",
      "Beneficiary disqualification verification",
      "Plain-paper attestation valid without stamp duty",
    ],
  },
];

export default function BelowTrust() {
  const [activeId, setActiveId] = useState<string>(CLAUSE_ITEMS[0].id);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);

  // IntersectionObserver to sync left pointers as right cards scroll (on desktop)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0.1,
      }
    );

    CLAUSE_ITEMS.forEach((item) => {
      const el = cardRefs.current[item.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Update activeId on mobile horizontal scroll
  const handleCarouselScroll = () => {
    const el = mobileCarouselRef.current;
    if (!el || window.innerWidth >= 1024) return;
    const scrollLeft = el.scrollLeft;
    const gap = window.innerWidth >= 640 ? 24 : 16;
    const stride = el.offsetWidth + gap;
    if (stride <= 0) return;
    const activeIndex = Math.min(
      CLAUSE_ITEMS.length - 1,
      Math.max(0, Math.round(scrollLeft / stride))
    );
    if (CLAUSE_ITEMS[activeIndex]) {
      setActiveId(CLAUSE_ITEMS[activeIndex].id);
    }
  };

  const handlePointerClick = (id: string) => {
    setActiveId(id);
    const targetElement = cardRefs.current[id];
    if (targetElement) {
      if (window.innerWidth >= 1024) {
        // Desktop: scroll page smoothly
        const yOffset = -105;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else if (mobileCarouselRef.current) {
        // Mobile: scroll horizontal carousel to exact single card with gap
        const cardIndex = CLAUSE_ITEMS.findIndex((c) => c.id === id);
        if (cardIndex !== -1) {
          const gap = window.innerWidth >= 640 ? 24 : 16;
          const stride = mobileCarouselRef.current.offsetWidth + gap;
          mobileCarouselRef.current.scrollTo({
            left: cardIndex * stride,
            behavior: "smooth",
          });
        }
      }
    }
  };

  // Mouse Drag Handlers for mobile horizontal carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    if (window.innerWidth >= 1024) return;
    const el = mobileCarouselRef.current;
    if (!el) return;
    setIsDragging(true);
    dragStartX.current = e.pageX;
    dragStartScrollLeft.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = mobileCarouselRef.current;
    if (!el) return;
    e.preventDefault();
    const walk = (e.pageX - dragStartX.current) * 1.3;
    el.scrollLeft = dragStartScrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section
      className="w-full bg-[#FAF7F0] pt-10 pb-16 sm:pb-24"
      style={{ paddingTop: "5rem" }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Top Right Action Pill */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16 lg:mb-20">
          <div className="max-w-[760px]">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4 text-left">
              <span className="text-xs font-bold tracking-[0.14em] uppercase text-[#C65378]">
                Court-Tested Clauses
              </span>
            </div>

            {/* Main Section Heading */}
            <h2 className="text-[2.2rem] sm:text-[2.85rem] lg:text-[3.35rem] font-normal font-playfair font-heading text-[#172228] leading-[1.12] tracking-tight">
              Support shaped around what your estate requires.
            </h2>
          </div>

          {/* Right Action Pill */}
          <div className="shrink-0">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 rounded-full border border-[#172228]/20 bg-white/70 backdrop-blur-sm px-6 py-2.5 text-[14px] font-medium text-[#172228] shadow-sm transition-all hover:bg-white hover:border-[#172228]/40 hover:shadow active:scale-95"
            >
              <span>Explore services</span>
              <ArrowUpRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* 2-Column Sticky Layout on Desktop; Single Horizontal Carousel on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative items-start">
          
          {/* Left Column: Sticky Navigation Card (HIDDEN ON MOBILE, visible on desktop lg+) */}
          <div
            className="hidden lg:block lg:col-span-4 lg:sticky z-20 self-start"
            style={{
              position: "sticky",
              top: "96px",
              alignSelf: "flex-start",
            }}
          >
            <div className="bg-white rounded-3xl p-6 sm:p-7">
              <p className="text-xs font-bold tracking-wider uppercase text-[#8C98A4] mb-4">
                Core Clauses in Your Will
              </p>

              <div className="flex flex-col divide-y divide-gray-100">
                {CLAUSE_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handlePointerClick(item.id)}
                      className={`flex items-center justify-between py-4 text-left transition-all duration-200 group ${
                        isActive
                          ? "text-[#172228] font-semibold"
                          : "text-[#5C6A72] hover:text-[#172228]"
                      }`}
                    >
                      <div className="flex items-start gap-3 pr-2">
                        <span
                          className={`text-[13px] font-mono font-medium transition-colors ${
                            isActive ? "text-[#C65378]" : "text-[#9DA8B0] group-hover:text-[#172228]"
                          }`}
                        >
                          {item.number}
                        </span>
                        <span className="text-[15px] leading-snug">
                          {item.title}
                        </span>
                      </div>

                      {/* Right Pointer Arrow */}
                      <span
                        className={`transition-all duration-200 shrink-0 ${
                          isActive
                            ? "opacity-100 translate-x-0 text-[#C65378]"
                            : "opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 text-[#172228]"
                        }`}
                      >
                        <ArrowRight size={18} strokeWidth={2} />
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Support Badge inside sticky card */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-xs text-[#6C7882]">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <ShieldCheck size={16} className="text-[#5F7E75]" />
                  Indian Succession Act 1925
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C65378]">
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (Desktop: vertical stack; Mobile: horizontal draggable carousel) */}
          <div className="w-full lg:col-span-8 overflow-hidden">
            <div
              ref={mobileCarouselRef}
              onScroll={handleCarouselScroll}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-4 sm:gap-6 lg:gap-14 pb-4 pt-1 lg:p-0 scrollbar-none snap-x snap-mandatory lg:snap-none cursor-grab active:cursor-grabbing lg:cursor-default w-full"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {CLAUSE_ITEMS.map((item, idx) => {
                return (
                  <div
                    key={item.id}
                    id={item.id}
                    ref={(el) => {
                      cardRefs.current[item.id] = el;
                    }}
                    className="w-full min-w-full lg:min-w-0 shrink-0 lg:shrink snap-center lg:snap-align-none bg-white rounded-3xl p-6 sm:p-8 lg:p-10 scroll-mt-28 transition-all flex flex-col justify-between"
                  >
                  {/* Top Header of Card */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C65378]/10 text-[#C65378]">
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-[#83919C]">
                      Clause {idx + 1} of {CLAUSE_ITEMS.length}
                    </span>
                  </div>

                  {/* Title & Law Reference */}
                  <h3 className="text-2xl sm:text-3xl font-bold font-sans text-[#172228] mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#5F7E75] mb-6">
                    {item.lawRef}
                  </p>

                  {/* Summary */}
                  <p className="text-[0.98rem] sm:text-[1.05rem] leading-relaxed text-[#49585F] mb-8">
                    {item.summary}
                  </p>

                  {/* Split Preview: Legal Clause Text + High-res Visual Media */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-8">
                    
                    {/* Legal Clause Box */}
                    <div className="bg-[#FAF7F0] rounded-2xl p-5 sm:p-6 border border-[#1B2A4A]/10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <FileCheck size={18} className="text-[#C65378]" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#172228]">
                            Exact Draft Language
                          </span>
                        </div>
                        <p className="text-xs sm:text-[13px] leading-relaxed text-[#3B484F] font-serif italic border-l-2 border-[#C65378] pl-3.5 my-2">
                          "{item.legalSnippet}"
                        </p>
                      </div>

                      <span className="text-[11px] text-[#7E8B94] mt-4 font-mono">
                        ✓ Tailored dynamically based on your inputs
                      </span>
                    </div>

                    {/* Accompanying Photo / Visual Card */}
                    <div className="relative rounded-2xl overflow-hidden min-h-[220px] bg-slate-100 border border-[#1B2A4A]/10">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover object-center"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#FAF7F0] text-slate-400">
                          <ShieldCheck size={48} strokeWidth={1.5} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <ul className="space-y-2">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2 text-xs sm:text-sm text-[#2D3A41]">
                          <CheckCircle2 size={16} className="text-[#5F7E75] shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/start"
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] transition-colors py-2 whitespace-nowrap self-start sm:self-auto"
                    >
                      <span>Draft this clause</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
            </div>

            {/* Mobile Carousel Controls: Prev/Next Buttons + Swipe Dots */}
            <div className="flex lg:hidden items-center justify-between mt-5 px-2">
              <button
                type="button"
                onClick={() => {
                  const currIdx = CLAUSE_ITEMS.findIndex((c) => c.id === activeId);
                  const prevIdx = Math.max(0, currIdx - 1);
                  handlePointerClick(CLAUSE_ITEMS[prevIdx].id);
                }}
                disabled={activeId === CLAUSE_ITEMS[0].id}
                className="w-9 h-9 rounded-full border border-[#172228]/15 bg-white text-[#172228] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed shadow-sm active:scale-95 transition-all cursor-pointer"
                aria-label="Previous clause"
              >
                <ChevronLeft size={18} strokeWidth={2.2} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {CLAUSE_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handlePointerClick(item.id)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeId === item.id ? "w-6 bg-[#C65378]" : "w-2 bg-[#172228]/20"
                    }`}
                    aria-label={`Go to clause ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  const currIdx = CLAUSE_ITEMS.findIndex((c) => c.id === activeId);
                  const nextIdx = Math.min(CLAUSE_ITEMS.length - 1, currIdx + 1);
                  handlePointerClick(CLAUSE_ITEMS[nextIdx].id);
                }}
                disabled={activeId === CLAUSE_ITEMS[CLAUSE_ITEMS.length - 1].id}
                className="w-9 h-9 rounded-full border border-[#172228]/15 bg-white text-[#172228] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed shadow-sm active:scale-95 transition-all cursor-pointer"
                aria-label="Next clause"
              >
                <ChevronRight size={18} strokeWidth={2.2} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
