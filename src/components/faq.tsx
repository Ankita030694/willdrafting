"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "What is Will drafting and why do I need it?",
    answer:
      "Will drafting is the process of legally documenting how you want your assets and property to be dealt with after your death. A professionally drafted Will can clearly identify beneficiaries, appoint an executor and include provisions for your family and minor children.",
  },
  {
    id: 2,
    question: "Is a Will legally valid in India?",
    answer:
      "A Will must meet the applicable legal requirements for execution and attestation. For an ordinary unprivileged Will, Section 63 of the Indian Succession Act, 1925 requires the Will to be signed or marked by the testator and attested by two or more witnesses as prescribed by law.",
  },
  {
    id: 3,
    question: "Do I need a lawyer to make a Will in India?",
    answer:
      "You can make a Will without a lawyer, but professional Will drafting can help when you have multiple assets, beneficiaries, properties, minor children or complex family circumstances. A professionally structured Will can also help avoid ambiguity and common drafting mistakes.",
  },
  {
    id: 4,
    question: "Is Will registration mandatory in India?",
    answer:
      "Registration of a Will is generally not mandatory. However, you may choose to register your Will depending on your circumstances. The important thing is that the Will is properly drafted and executed according to applicable law.",
  },
  {
    id: 5,
    question: "How many witnesses are required for a Will?",
    answer:
      "For an ordinary unprivileged Will covered by Section 63 of the Indian Succession Act, the Will must be attested by two or more witnesses in accordance with the statutory requirements.",
  },
  {
    id: 6,
    question: "Can I change my Will after making it?",
    answer:
      "Yes. A Will can generally be changed or revoked while you have the testamentary capacity to do so. It is also important to review your Will after significant changes in your family, property or financial circumstances.",
  },
  {
    id: 7,
    question: "What happens if I die without a Will?",
    answer:
      "If you die without a Will, your estate is generally distributed according to the succession law applicable to your circumstances rather than according to your personal wishes. This can create uncertainty for your family regarding property, investments and other assets.",
  },
  {
    id: 8,
    question: "Can I make a Will for my property and bank accounts?",
    answer:
      "Yes. Your Will can address your legally disposable interests in property, bank accounts, investments, shares, jewellery and other assets, subject to the nature of the asset and applicable law.",
  },
  {
    id: 9,
    question: "How long does it take to make a Will?",
    answer:
      "A straightforward Will can be prepared relatively quickly once the necessary family, beneficiary and asset information is available. The time required depends on the complexity of your estate and the provisions required.",
  },
  {
    id: 10,
    question: "What if I don't know where to start?",
    answer:
      "You don't have to figure it all out alone. Start by telling us about your family, assets and wishes. We'll help you understand the important provisions that may need to be included in your Will.",
  },
];

export default function FAQ() {
  // Item 2 is open by default to match the reference design screenshot
  const [openId, setOpenId] = useState<number | null>(2);

  const toggleFAQ = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-[#FAF7F0] py-16 sm:py-24 lg:py-28 flex justify-center">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: Eyebrow, Editorial Heading, and Desktop Card
              ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              {/* Eyebrow badge */}
              <div className="flex items-center gap-2 mb-5 sm:mb-6">
            
                <span className="text-[0.75rem] font-bold tracking-[0.16em] uppercase text-[#C65378]">
                  FAQ
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] font-medium text-[#172228] leading-[1.08] tracking-tight">
                The Answers You Need Before You Put Your Family’s Future in Writing.

              </h2>
              <p className="text-[1rem] sm:text-[1.1rem] text-[#55636D] leading-relaxed max-w-2xl mt-4">Making a Will can feel overwhelming. These are the questions people ask before taking the first step toward protecting their family, property and wishes.</p>
            </div>

            {/* Desktop-only: "Ready to start?" Card */}
            <div className="hidden lg:block mt-16 xl:mt-24">
              <div className="bg-[#EBE7DF] rounded-2xl sm:rounded-[22px] p-6 sm:p-7 max-w-[420px]">
                <h3 className="text-[1.2rem] sm:text-[1.32rem] font-semibold text-[#172228] mb-2.5">
                  Ready to protect your family?
                </h3>
                <p className="text-[0.88rem] sm:text-[0.92rem] text-[#55636D] leading-[1.65] mb-6">
                  Your family shouldn&apos;t have to guess what you wanted.
                </p>
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#172228] px-5 py-2.5 text-[0.88rem] font-semibold text-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:bg-[#2D3A41] transition-all active:scale-95"
                >
                  <span>Start Your Will</span>
                  <ArrowUpRight size={16} strokeWidth={2.2} />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile-only: "Ready to start?" Card placed directly below headline */}
          <div className="block lg:hidden mt-6 mb-8">
            <div className="bg-[#EBE7DF] rounded-2xl p-6 max-w-full">
              <h3 className="text-[1.2rem] font-semibold text-[#172228] mb-2.5">
                Ready to protect your family?
              </h3>
              <p className="text-[0.88rem] text-[#55636D] leading-[1.6] mb-5">
                Your family shouldn&apos;t have to guess what you wanted.
              </p>
              <Link
                href="/start"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#172228] px-5 py-2.5 text-[0.88rem] font-semibold text-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:bg-[#2D3A41] transition-all active:scale-95"
              >
                <span>Start Your Will</span>
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </Link>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Interactive Accordion Cards
              ========================================================================= */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl sm:rounded-[20px] p-5 sm:p-6 border border-[#1B2A4A]/5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen
                      ? "shadow-[0_4px_20px_rgba(0,0,0,0.04)] ring-1 ring-[#172228]/5"
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.03)]"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer select-none group"
                  >
                    <span className="text-[1.12rem] sm:text-[1.22rem] font-semibold text-[#172228] tracking-tight leading-snug">
                      {faq.question}
                    </span>

                    {/* Smooth morphing Plus/Minus icon */}
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3F0EB] flex items-center justify-center text-[#55636D] shrink-0 transition-colors duration-300 group-hover:bg-[#EBE7DF]">
                      <span className="relative w-3.5 h-3.5 flex items-center justify-center">
                        {/* Horizontal line (always present) */}
                        <span className="absolute w-3.5 h-[1.75px] bg-[#55636D] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                        {/* Vertical line (smoothly scales to 0 and dissolves into horizontal line) */}
                        <span
                          className={`absolute w-[1.75px] h-3.5 bg-[#55636D] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen
                              ? "scale-y-0 rotate-90 opacity-0"
                              : "scale-y-100 rotate-0 opacity-100"
                          }`}
                        />
                      </span>
                    </span>
                  </button>

                  {/* Smooth animated accordion dropdown */}
                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <div
                        className="text-[0.88rem] sm:text-[0.92rem] text-[#55636D] leading-[1.65] pt-3.5 sm:pt-4 max-w-[620px] transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{
                          transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                        }}
                      >
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
