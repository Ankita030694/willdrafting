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
    question: "What basic details do I need to keep ready before I start?",
    answer:
      "You only need everyday details—your full name, date of birth, address, PAN or Aadhaar number, and the names of your immediate family members (such as your spouse, children, or parents). You do not need to upload bulky property deeds just to draft your Will.",
  },
  {
    id: 2,
    question: "What kinds of property, bank accounts, and savings can I include in my Will?",
    answer:
      "You can include your house, flat, or land, bank savings and fixed deposits, mutual funds, Demat shares, life insurance policies, gold and jewellery, vehicles, business interests, and even digital accounts. You can list as many assets as you own.",
  },
  {
    id: 3,
    question: "What if my house or car still has an ongoing bank loan?",
    answer:
      "That is completely fine. While adding an asset, you can simply select that it has an active loan and mention the bank or loan details so your Will clearly records how it should be handled for your family.",
  },
  {
    id: 4,
    question: "Can I divide a single property or bank account among multiple family members?",
    answer:
      "Yes. For every asset, you can choose who receives it and split it in any percentage you like (for example, 50% each to two children, or 100% to your spouse). You can also name a backup person for any asset just in case.",
  },
  {
    id: 5,
    question: "What happens to assets I buy in the future after making this Will?",
    answer:
      "During the questionnaire, you will choose who should receive any remaining or future assets not separately listed. This ensures that even if you open a new bank account or buy minor items later, they are automatically covered.",
  },
  {
    id: 6,
    question: "Who is an Executor, and whom should I name?",
    answer:
      "An Executor is simply the trusted person who will make sure your wishes in the Will are carried out smoothly. Most people choose their spouse, an adult child, a sibling, or a trusted family friend. You can also name an alternate person as a backup.",
  },
  {
    id: 7,
    question: "How can I make sure my children are cared for if they are under 18?",
    answer:
      "If you have minor children, our guided flow includes a dedicated step where you can name a trusted Guardian (and a backup Guardian) to look after their upbringing and protect their share until they turn 18.",
  },
  {
    id: 8,
    question: "Can I add personal wishes or special instructions for specific family items?",
    answer:
      "Yes. You can write specific notes for individual assets (such as family heirlooms or jewellery), mention any pending loans or obligations, and include your personal funeral or charitable wishes.",
  },
  {
    id: 9,
    question: "How do I know I haven't missed anything, and can anyone edit my Will later?",
    answer:
      "Before generating your final Will, you review all your details section by section and confirm them with a one-time password (OTP) sent to your email. Once you verify with the OTP, your Will is locked so nobody can alter your wishes, and our automatic check makes sure all shares add up to 100%.",
  },
  {
    id: 10,
    question: "Once I download my Will PDF, how do I make it legally valid?",
    answer:
      "Simply print the downloaded PDF on plain A4 paper, sign it in the presence of two adult witnesses (who are not beneficiaries in your Will), and have both witnesses sign alongside you. Your Will is immediately valid, and you can also register it at your local Sub-Registrar's office if you wish.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

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
                  Frequently Asked Questions
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] font-medium text-[#111827] leading-[1.12] tracking-tight mb-6">
                Simple answers to common questions.
              </h2>

              <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#55636D] max-w-[420px] mb-8">
                Everything you need to know about filling in your family and asset details, verifying your Will, and signing it at home.
              </p>
            </div>

            {/* Support Card on Left */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs max-w-[420px]">
              <h3 className="text-base font-semibold text-[#111827] mb-2">
                Have a specific question about your estate?
              </h3>
              <p className="text-xs text-[#55636D] leading-relaxed mb-5">
                Our legal team is here to assist with drafting, executor nominations, and registration guidance.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#172228] hover:text-[#C65378] transition-colors group"
              >
                <span>Talk to our legal desk</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Interactive Accordion List
              ========================================================================= */}
          <div className="lg:col-span-7 divide-y divide-[#172228]/10 border-t border-b border-[#172228]/10">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="py-5 sm:py-6 transition-colors">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer focus:outline-hidden"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[1.08rem] sm:text-[1.2rem] font-medium text-[#111827] group-hover:text-[#C65378] transition-colors duration-200">
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full border border-[#172228]/15 flex items-center justify-center text-[#172228] transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-[#C65378] border-[#C65378] text-white" : "bg-white"
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-4 pr-10 text-[0.94rem] sm:text-[1rem] leading-[1.7] text-[#55636D] animate-fadeIn">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
