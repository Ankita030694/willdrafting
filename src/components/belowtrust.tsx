"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

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
    lawRef: "Indian Succession Jurisprudence",
    badge: "Testamentary Capacity",
    summary:
      "Clearly establishes your testamentary capacity and voluntary intention while expressly revoking previous Wills, codicils and testamentary dispositions to help avoid conflicting succession claims.",
    legalSnippet:
      "I hereby declare that I am of sound mind, memory, and understanding, and that I make this last Will voluntarily without any undue influence, coercion, or misrepresentation. I hereby revoke all prior Wills, codicils, and testamentary dispositions made by me at any time.",
    image: "/images/senior-couple.jpg",
    points: [
      "Explicit revocation of previous Wills & codicils.",
      "Records testamentary capacity & sound disposing mind.",
      "Helps address concerns regarding coercion or undue influence.",
    ],
  },
  {
    id: "clause-2",
    number: "2/",
    title: "Appointment of Executors & Administrators",
    lawRef: "Estate Administration Framework",
    badge: "Estate Administration",
    summary:
      "Appoints a primary and alternate executor to administer your estate, represent the estate where legally required, obtain probate where applicable, and distribute assets according to your Will.",
    legalSnippet:
      "I hereby appoint [PRIMARY EXECUTOR NAME], residing at [ADDRESS], to be the sole Executor of this my Will. In the event they predecease me or decline to act, I appoint [ALTERNATE EXECUTOR NAME] as alternate Executor with appropriate powers.",
    image: "/images/advocate.jpg",
    points: [
      "Primary and alternate executor provisions.",
      "Authority to administer estate assets.",
      "Powers concerning debts, expenses and distribution of assets",
    ],
  },
  {
    id: "clause-3",
    number: "3/",
    title: "Specific Asset Bequests & Residual Estate",
    lawRef: "Statutory Bequests Framework",
    badge: "Asset Distribution",
    summary:
      "Clearly identifies how immovable property, bank accounts, investments, demat holdings, jewellery and other assets should pass to your beneficiaries, supported by a residuary clause for assets not specifically mentioned.",
    legalSnippet:
      "I bequeath my residential flat situated at [PROPERTY ADDRESS] unto [BENEFICIARY NAME] absolutely. All my bank deposits, mutual fund holdings, demat portfolios, and residual movable assets shall devolve upon [RESIDUARY BENEFICIARY] in accordance with this Will.",
    image: "/images/asset-bequests.jpg",
    points: [
      "Clear separation of immovable & movable assets.",
      "Residuary clause for assets not specifically listed.",
      "Can address investments, digital assets and other property.",
    ],
  },
  {
    id: "clause-4",
    number: "4/",
    title: "Guardianship for Minor Children",
    lawRef: "Guardians and Wards Act, 1890",
    badge: "Minor Protection",
    summary:
      "Allows parents to express their wishes regarding a testamentary guardian for minor children and include appropriate provisions for management of assets intended for them, subject to applicable law.",
    legalSnippet:
      "In the event of my demise while any child of mine is a minor, I nominate and appoint [GUARDIAN NAME] as the testamentary guardian of my minor child/children, subject to applicable law.",
    image: "/images/hero-family.jpg",
    points: [
      "Testamentary guardian provision.",
      "Alternate guardian where appropriate.",
      "Provisions concerning assets intended for minor children.",
    ],
  },
  {
    id: "clause-5",
    number: "5/",
    title: "Execution & Two-Witness Attestation",
    lawRef: "Statutory Dual-Witness Attestation",
    badge: "Will Execution",
    summary:
      "Follows the applicable execution and attestation requirements for an ordinary Will, including signing by the testator and attestation by two or more witnesses as prescribed by law.",
    legalSnippet:
      "Signed by the Testator in our joint presence, and attested by each of us in the presence of the Testator and each other, all being present at the same time.",
    image: "/hero.jpeg",
    points: [
      "Two-witness physical attestation.",
      "Proper signing and attestation process.",
      "Helps avoid common Will execution errors.",
    ],
  },
];

export default function BelowTrust() {
  const [activeId, setActiveId] = useState<string>(CLAUSE_ITEMS[0].id);
  const activeIdx = CLAUSE_ITEMS.findIndex((c) => c.id === activeId);
  const active = CLAUSE_ITEMS[activeIdx];

  return (
    <section className="w-full bg-[#FAF7F0] pt-8 pb-8 sm:pt-11 sm:pb-11">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-4 sm:mb-7">
          <div className="max-w-[760px]">
            <span className="block text-[11px] font-bold tracking-[0.14em] uppercase text-[#C65378] mb-1.5">
              Legally Structured Will Clauses
            </span>
            <h2 className="text-[1.45rem] sm:text-[1.85rem] lg:text-[2.15rem] font-medium text-[#172228] leading-[1.15] tracking-tight">
              Support tailored to your estate, family & succession wishes.
            </h2>
          </div>

          <div className="shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#172228]/20 bg-white/70 px-4 py-2 text-[13px] sm:text-[13.5px] font-medium text-[#172228] shadow-sm transition-all hover:bg-white hover:border-[#172228]/40 active:scale-95"
            >
              <span>Explore services</span>
              <ArrowUpRight size={15} strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* Mobile: all clause cards stacked one below another */}
        <div className="flex lg:hidden flex-col gap-4">
          {CLAUSE_ITEMS.map((item, idx) => (
            <div key={item.id} className="bg-white rounded-3xl p-4 sm:p-5">
              <div className="relative h-40 sm:h-48 rounded-2xl overflow-hidden bg-slate-100 border border-[#1B2A4A]/10 mb-3.5">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                )}
              </div>

              <div className="flex items-center justify-between gap-3 mb-2.5">
                <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#C65378]/10 text-[#C65378]">
                  {item.badge}
                </span>
                <span className="text-[11px] font-mono text-[#83919C]">
                  Clause {idx + 1} of {CLAUSE_ITEMS.length}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#172228] mb-1 tracking-tight">{item.title}</h3>
              <p className="text-[11px] font-medium text-[#5F7E75] mb-2">{item.lawRef}</p>
              <p className="text-[0.80rem] sm:text-[0.84rem] leading-relaxed text-[#49585F] mb-3">{item.summary}</p>

              <ul className="space-y-1.5 mb-3.5">
                {item.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] text-[#2D3A41]">
                    <CheckCircle2 size={15} className="text-[#5F7E75] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#C65378] hover:text-[#a13c5d] transition-colors"
              >
                <span>See More</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>

        {/* Desktop: tabbed layout */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
          {/* Desktop: clause list */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-white rounded-3xl p-5 h-full">
              <p className="text-[11px] font-bold tracking-wider uppercase text-[#8C98A4] mb-2.5">
                Core Clauses in Your Will
              </p>
              <div className="flex flex-col divide-y divide-gray-100">
                {CLAUSE_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className={`flex items-center justify-between py-2.5 text-left transition-colors group ${
                        isActive ? "text-[#172228] font-semibold" : "text-[#5C6A72] hover:text-[#172228]"
                      }`}
                    >
                      <div className="flex items-start gap-2.5 pr-2">
                        <span className={`text-[12px] font-mono ${isActive ? "text-[#C65378]" : "text-[#9DA8B0]"}`}>
                          {item.number}
                        </span>
                        <span className="text-[13.5px] leading-snug">{item.title}</span>
                      </div>
                      <ArrowRight
                        size={15}
                        className={`shrink-0 transition-opacity ${isActive ? "opacity-100 text-[#C65378]" : "opacity-0"}`}
                      />
                    </button>
                  );
                })}
              </div>
              <div className="mt-3.5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-[11.5px] text-[#6C7882]">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <ShieldCheck size={15} className="text-[#5F7E75]" />
                  Indian Legal Standards
                </span>
                <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#C65378]">Verified</span>
              </div>
            </div>
          </div>

          {/* Active clause panel */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-5 sm:p-6 h-full flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-6 mb-4">
                {/* Clause image: short banner on mobile, side column on larger screens */}
                <div className="relative order-first md:order-last md:col-span-2 h-40 sm:h-48 md:h-auto md:min-h-[240px] rounded-2xl overflow-hidden bg-slate-100 border border-[#1B2A4A]/10">
                  {active.image && (
                    <Image
                      key={active.id}
                      src={active.image}
                      alt={active.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover object-center"
                    />
                  )}
                </div>

                <div className="md:col-span-3">
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#C65378]/10 text-[#C65378]">
                      {active.badge}
                    </span>
                    <span className="text-[11px] font-mono text-[#83919C]">
                      Clause {activeIdx + 1} of {CLAUSE_ITEMS.length}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#172228] mb-1 tracking-tight">
                    {active.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-medium text-[#5F7E75] mb-2.5">{active.lawRef}</p>

                  <p className="text-[0.80rem] sm:text-[0.85rem] leading-relaxed text-[#49585F] mb-3.5">
                    {active.summary}
                  </p>

                  <ul className="space-y-1.5">
                    {active.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12px] sm:text-[13px] text-[#2D3A41]">
                        <CheckCircle2 size={15} className="text-[#5F7E75] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto pt-3.5 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#C65378] hover:text-[#a13c5d] transition-colors"
                >
                  <span>See More</span>
                  <ArrowRight size={13} />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveId(CLAUSE_ITEMS[Math.max(0, activeIdx - 1)].id)}
                    disabled={activeIdx === 0}
                    aria-label="Previous clause"
                    className="w-9 h-9 rounded-full border border-[#172228]/15 bg-white flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveId(CLAUSE_ITEMS[Math.min(CLAUSE_ITEMS.length - 1, activeIdx + 1)].id)}
                    disabled={activeIdx === CLAUSE_ITEMS.length - 1}
                    aria-label="Next clause"
                    className="w-9 h-9 rounded-full border border-[#172228]/15 bg-white flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
