"use client";

import React, { useState } from "react";
import { Phone } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "How do you communicate with clients?",
    answer:
      "We communicate with complete clarity and regular updates through direct phone calls, secure messages, and scheduled progress reviews. You’ll always know exactly where your documents and filings stand without having to chase us down.",
  },
  {
    id: 2,
    question: "What makes your firm different?",
    answer:
      "We’re a boutique with big-firm results: former prosecutors, board-certified specialists, and a 98% success rate. That means you get the firepower of a large firm without the bureaucracy—every case gets partner-level attention from day one. And our track record isn’t just a number; it’s backed by relentless preparation and a strategy tailored to your unique situation, so you can face every step with confidence.",
  },
  {
    id: 3,
    question: "I’m not sure I have a case. Should I still call?",
    answer:
      "Every initial consultation is confidential and obligation-free. Even if you're unsure whether you need formal legal representation or an estate plan, we will review your circumstances, answer your questions plainly, and point you in the right direction.",
  },
  {
    id: 4,
    question: "How long does a typical case take?",
    answer:
      "Timelines depend on the complexity of your legal matter and whether all parties are aligned. Standard will drafting and trust formation can be completed in as little as a few days to two weeks, while complex estates or contested matters may take longer.",
  },
  {
    id: 5,
    question: "Is the initial consultation really free?",
    answer:
      "Yes, completely free. There are no surprise fees, hidden retainers, or commitments required. Our goal is to provide honest answers and determine the best path forward for you and your family.",
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
              <h2 className="text-[2.35rem] sm:text-[3.2rem] lg:text-[3.65rem] font-bold text-[#172228] leading-[1.08] tracking-tight">
                The Answers You
                Need Before You <span className="italic font-normal">Even Ask Questions.</span>

              </h2>
            </div>

            {/* Desktop-only: "Not sure what to ask first?" Card */}
            <div className="hidden lg:block mt-16 xl:mt-24">
              <div className="bg-[#EBE7DF] rounded-2xl sm:rounded-[22px] p-6 sm:p-7 max-w-[420px]">
                <h3 className="text-[1.2rem] sm:text-[1.32rem] font-semibold text-[#172228] mb-2.5">
                  Not sure what to ask first?
                </h3>
                <p className="text-[0.88rem] sm:text-[0.92rem] text-[#55636D] leading-[1.65] mb-6">
                  Every strong case starts with an honest, pressure-free conversation. We listen to your situation, answer your questions plainly, and help you figure out.
                </p>
                <a
                  href="tel:+1234567890"
                  className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-[0.88rem] font-semibold text-[#172228] shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:bg-[#FAF7F0] transition-all active:scale-95"
                >
                  <Phone size={14} className="text-[#172228] fill-[#172228]" />
                  <span>+1 234 567 890</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile-only: "Not sure what to ask first?" Card placed directly below headline */}
          <div className="block lg:hidden">
            <div className="bg-[#EBE7DF] rounded-2xl p-6 max-w-full">
              <h3 className="text-[1.2rem] font-semibold text-[#172228] mb-2.5">
                Not sure what to ask first?
              </h3>
              <p className="text-[0.88rem] text-[#55636D] leading-[1.6] mb-5">
                Every strong case starts with an honest, pressure-free conversation. We listen to your situation, answer your questions plainly, and help you figure out.
              </p>
              <a
                href="tel:+1234567890"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-[0.88rem] font-semibold text-[#172228] shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:bg-[#FAF7F0] transition-all active:scale-95"
              >
                <Phone size={14} className="text-[#172228] fill-[#172228]" />
                <span>+1 234 567 890</span>
              </a>
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
