import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartResumeCard from "@/components/start/StartResumeCard";
import WillWalkthroughVideo from "@/components/WillWalkthroughVideo";
import WatchWalkthroughButton from "@/components/WatchWalkthroughButton";
import { buildWalkthroughVideoSchema } from "@/lib/videoSchema";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Scale,
  FileText,
  Users,
  Building,
  CheckCircle2,
  Lock,
  HelpCircle,
  BookOpen,
  ChevronRight,
  LayoutDashboard,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Online Will Drafting Questionnaire | WillDrafting.in",
  },
  description:
    "Complete your online will drafting questionnaire step by step with instant legal validation and advocate support across India.",
  alternates: {
    canonical: "https://www.willdrafting.in/start",
    languages: {
      "en-IN": "https://www.willdrafting.in/start",
      "x-default": "https://www.willdrafting.in/start",
    },
  },
  openGraph: {
    title: "Online Will Drafting Questionnaire | WillDrafting.in",
    description:
      "Complete your online will drafting questionnaire step by step with instant legal validation and advocate support across India.",
    url: "https://www.willdrafting.in/start",
    siteName: "WillDrafting.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.willdrafting.in/desktopusp.jpg",
        width: 1200,
        height: 630,
        alt: "Online Will Drafting Questionnaire India - WillDrafting.in",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Will Drafting Questionnaire | WillDrafting.in",
    description:
      "Complete your online will drafting questionnaire step by step with instant legal validation and advocate support across India.",
    images: ["https://www.willdrafting.in/desktopusp.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const ROADMAP_STEPS = [
  {
    step: "01",
    title: "1. Personal & Family Details",
    desc: "Enter your full name, religion, marital status, and family members. Add your spouse, children, or parents with clear details. This step establishes your legal background and prevents future disputes.",
    href: "/start/01",
    icon: Users,
    time: "3 mins",
  },
  {
    step: "02",
    title: "2. Assets & Property Register",
    desc: "List your self-acquired assets. Add your flats, plots of land, bank accounts, and fixed deposits. You can also include gold jewellery, mutual funds, company shares, and vehicle details.",
    href: "/start/03",
    icon: Building,
    time: "4 mins",
  },
  {
    step: "03",
    title: "3. Asset Shares & Executors",
    desc: "Decide exact percentage shares for each heir. Name one or two trusted adults as your Will executors. If you have young children, name testamentary guardians to care for them.",
    href: "/start/04",
    icon: Scale,
    time: "3 mins",
  },
  {
    step: "04",
    title: "4. Legal Audit & Final Will",
    desc: "Our smart engine checks your Will for legal gaps. Review all clauses on screen. Download your court-ready PDF instantly. Print the document on plain paper and sign with two adult witnesses.",
    href: "/start/14",
    icon: FileText,
    time: "2 mins",
  },
];

const PRE_CHECKLIST = [
  "Your full legal name, permanent address, and basic identity details.",
  "Names and relations of your spouse, children, parents, or chosen heirs.",
  "Rough details of your property, house address, or flat registration numbers.",
  "Names of banks where you hold savings accounts, fixed deposits, or lockers.",
  "Names of one or two trusted adults who can act as executors of your Will.",
];

const LEGAL_BENEFITS = [
  {
    title: "100% Legally Binding in Indian Courts",
    desc: "Drafted strictly under Section 63 of the Indian Succession Act, 1925. Valid across every state and union territory in India.",
  },
  {
    title: "No Costly Lawyer Office Visits",
    desc: "Save thousands of rupees in deed writer fees. Create an advocate-grade legal Will from the comfort of your home.",
  },
  {
    title: "Edit and Update Any Time",
    desc: "Your life circumstances change over time. Return to your secure account whenever you wish to add new assets or update heirs.",
  },
  {
    title: "Private Browser Storage",
    desc: "Your family records and financial details stay confidential. We protect your entries with high-grade security standards.",
  },
];

const FAQS = [
  {
    q: "Is an online Will legally valid in India?",
    a: "Yes. An online Will made on WillDrafting.in is fully valid under Section 63 of the Indian Succession Act, 1925. Once printed and signed in front of two adult witnesses, your Will has complete legal standing in all Indian courts.",
  },
  {
    q: "Do I need stamp paper to create my Will?",
    a: "No. Indian law does not require stamp paper for a Will. You can print your completed Will on normal A4 white paper. It becomes legally effective once you and your two witnesses sign it.",
  },
  {
    q: "Who can act as an executor of my Will?",
    a: "An executor is the trusted person who carries out the instructions in your Will after your death. You can name your spouse, an adult child, a trusted relative, a friend, or an advocate. You can also name a backup executor.",
  },
  {
    q: "Is registration of a Will mandatory in India?",
    a: "No. Will registration is optional under Section 18 of the Registration Act, 1908. An unregistered Will is completely legal if executed properly. However, registration adds strong evidentiary proof in case of future court disputes.",
  },
  {
    q: "How much does it cost to draft a Will online?",
    a: "Our plans start at ₹2,490 for the self-drafted plan, ₹4,990 for advocate verification, and ₹9,990 for comprehensive advocate drafting with video consultation. You can view all features on our pricing page.",
  },
  {
    q: "What happens if I die without writing a Will?",
    a: "If you pass away without a Will, your estate is divided strictly by religious personal succession laws. This often leads to family disputes, frozen bank accounts, and lengthy court delays. Writing a Will protects your family.",
  },
];

const START_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.willdrafting.in/start#webpage",
      url: "https://www.willdrafting.in/start",
      name: "Online Will Drafting Questionnaire | WillDrafting.in",
      description:
        "Complete your online will drafting questionnaire step by step with instant legal validation and advocate support across India.",
      video: {
        "@id": "https://www.willdrafting.in/start#walkthrough-video",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.willdrafting.in/start#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.willdrafting.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Start Will Questionnaire",
          item: "https://www.willdrafting.in/start",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.willdrafting.in/start#faq",
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
    buildWalkthroughVideoSchema("https://www.willdrafting.in/start"),
  ],
};

export default function StartPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] font-sans flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(START_PAGE_SCHEMA) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-[#172228]/8 bg-white/70 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <nav className="flex items-center gap-2 text-xs text-[#49585F]" aria-label="Breadcrumb">
              <Link href="/" className="transition hover:text-[#C65378]">
                Home
              </Link>
              <ChevronRight size={13} className="opacity-50" />
              <span className="font-semibold text-[#172228]" aria-current="page">
                Start Will Questionnaire
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[#C65378]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Sparkles size={14} />
                <span>Certified Online Will Drafting in India</span>
              </div>

              {/* Strict Single H1 Tag (<= 70 chars) */}
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-[#172228] leading-tight">
                Start Your Legally Valid Online Will in India
              </h1>

              {/* Plain-English Hero Summary */}
              <p className="mt-4 text-base sm:text-lg text-[#49585F] leading-relaxed">
                Making a Will is an act of love to protect your family. It takes only ten to fifteen minutes to complete. Answer simple questions about your loved ones and property. Download your court-ready Will with lawyer verification today.
              </p>

              {/* Dynamic Draft Resume Banner (Client side) */}
              <div className="mt-6 text-left">
                <StartResumeCard />
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/start/01"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#C65378] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C65378]/25 transition hover:bg-[#b04568] sm:w-auto"
                >
                  <span>Begin Will Questionnaire (Step 1)</span>
                  <ArrowRight size={16} />
                </Link>

                <WatchWalkthroughButton label="Watch 1-Min How-To Video" />

                <Link
                  href="/start/dashboard"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#172228]/15 bg-white px-6 py-3.5 text-sm font-bold text-[#172228] shadow-sm transition hover:border-[#172228] hover:bg-[#FAF7F0] sm:w-auto"
                >
                  <LayoutDashboard size={16} />
                  <span>Open Estate Wealth Dashboard</span>
                </Link>

                <Link
                  href="/pricing"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold text-[#49585F] transition hover:text-[#172228] sm:w-auto"
                >
                  <span>Compare Plans (from ₹2,490)</span>
                  <ChevronRight size={14} />
                </Link>
              </div>

              {/* Trust Signal Badges */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 text-left">
                <div className="flex items-center gap-2.5 rounded-xl border border-[#172228]/8 bg-white p-3 shadow-xs">
                  <Clock size={18} className="text-[#C65378] shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#172228]">10-15 Minutes</div>
                    <div className="text-[11px] text-[#49585F]">Quick step-by-step form</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-xl border border-[#172228]/8 bg-white p-3 shadow-xs">
                  <Scale size={18} className="text-[#059669] shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#172228]">ISA 1925 Compliant</div>
                    <div className="text-[11px] text-[#49585F]">100% legal in India</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-xl border border-[#172228]/8 bg-white p-3 shadow-xs">
                  <Lock size={18} className="text-[#172228] shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#172228]">100% Private</div>
                    <div className="text-[11px] text-[#49585F]">Encrypted browser vault</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-xl border border-[#172228]/8 bg-white p-3 shadow-xs">
                  <ShieldCheck size={18} className="text-[#C65378] shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#172228]">Advocate Verified</div>
                    <div className="text-[11px] text-[#49585F]">High Court lawyers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section with Strict Single H2 Tag (<= 70 chars) */}
        <section className="border-t border-[#172228]/8 bg-white py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                Simple Questionnaire Steps
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#172228]">
                Simple 4-Step Process to Create Your Valid Will
              </h2>
              <p className="mt-2 text-sm text-[#49585F]">
                Follow our clear roadmap. You can complete each section at your own pace without confusing legal terms.
              </p>
            </div>

            {/* Interactive 60-Second Video Walkthrough (Placed after H2) */}
            <div className="mt-8 sm:mt-10">
              <WillWalkthroughVideo
                eyebrow="Interactive Step-by-Step Guide"
                heading="Watch How to Fill Your Will Questionnaire in 60 Seconds"
                subheading="Not sure what happens next? Watch this quick guide or tap any step chapter below to see how you add family, list assets, split shares, and sign on plain paper."
                ctaText="Start Step 1: Personal & Family Details"
                ctaHref="/start/01"
              />
            </div>

            {/* 4 Cards with H3 headings */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ROADMAP_STEPS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.step}
                    className="flex flex-col justify-between rounded-2xl border border-[#172228]/8 bg-[#FAF7F0] p-6 shadow-xs transition hover:border-[#C65378]/40 hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#172228] shadow-xs">
                          <IconComponent size={20} />
                        </div>
                        <span className="rounded-full bg-[#172228]/5 px-2.5 py-1 text-xs font-bold text-[#C65378]">
                          {item.time}
                        </span>
                      </div>
                      <h3 className="mt-4 text-base font-bold text-[#172228]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#49585F]">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#172228]/8">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#b04568]"
                      >
                        <span>Start this step</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* In-Section Call to Action */}
            <div className="mt-10 text-center">
              <Link
                href="/start/01"
                className="inline-flex items-center gap-2 rounded-xl bg-[#172228] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#253640]"
              >
                <span>Start Step 1: Personal &amp; Family Details</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* What to Keep Handy Checklist */}
        <section className="border-t border-[#172228]/8 py-14 bg-[#FAF7F0]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                  Quick Preparation
                </span>
                <h3 className="mt-2 text-2xl font-extrabold text-[#172228]">
                  What You Need Before Starting
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#49585F]">
                  You do not need heavy files or complicated paperwork right now. Basic details are enough to complete your draft. Keep these simple points in mind:
                </p>

                <ul className="mt-5 space-y-3">
                  {PRE_CHECKLIST.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#059669]/10 text-[#059669]">
                        <Check size={13} strokeWidth={3} />
                      </div>
                      <span className="text-xs leading-relaxed text-[#172228] font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/start/01"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#C65378] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#b04568]"
                  >
                    <span>I Am Ready to Start →</span>
                  </Link>
                  <Link
                    href="/tools/will-checklist"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#49585F] hover:text-[#172228]"
                  >
                    <BookOpen size={14} />
                    <span>View Full Will Preparation Checklist</span>
                  </Link>
                </div>
              </div>

              {/* Side Card: Key Assurances */}
              <div className="rounded-2xl border border-[#172228]/8 bg-white p-7 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C65378]/10 text-[#C65378]">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      Legal Security
                    </div>
                    <div className="text-sm font-extrabold text-[#172228]">
                      Backed by AMA Legal Solutions
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3.5 border-t border-[#172228]/8 pt-5 text-xs text-[#49585F]">
                  <p>
                    Every clause generated follows the Indian Succession Act, 1925. Our advocates have vetted thousands of testamentary instruments for Indian families and global NRIs.
                  </p>
                  <p>
                    Your document is court-ready. After printing, sign it before two adult witnesses. You do not need to visit a sub-registrar unless you choose to register.
                  </p>
                </div>

                <div className="mt-6 rounded-xl bg-[#FAF7F0] p-4 text-xs">
                  <div className="font-bold text-[#172228]">Need custom advocate advice?</div>
                  <p className="mt-1 text-[#49585F]">
                    Our legal team can draft custom trust clauses, life interests, or NRI power of attorney documents.
                  </p>
                  <div className="mt-3">
                    <Link
                      href="/contact"
                      className="font-bold text-[#C65378] hover:underline"
                    >
                      Speak with our legal advocates →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="border-t border-[#172228]/8 bg-white py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                Why Choose WillDrafting.in
              </span>
              <h3 className="mt-2 text-2xl font-extrabold text-[#172228]">
                Key Benefits of Online Will Drafting
              </h3>
              <p className="mt-2 text-sm text-[#49585F]">
                Protect your loved ones with a modern, simple, and legally sound solution.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {LEGAL_BENEFITS.map((b, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#172228]/8 bg-[#FAF7F0] p-6 shadow-xs"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#059669]/10 text-[#059669]">
                    <CheckCircle2 size={18} />
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[#172228]">
                    {b.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#49585F]">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Validity Guidance & Acts */}
        <section className="border-t border-[#172228]/8 py-14 bg-[#FAF7F0]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-3xl border border-[#172228]/8 bg-white p-8 sm:p-10 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                Statutory Framework
              </span>
              <h3 className="mt-2 text-2xl font-extrabold text-[#172228]">
                Legal Validity Under the Indian Succession Act, 1925
              </h3>

              <div className="mt-4 grid gap-6 md:grid-cols-2 text-xs leading-relaxed text-[#49585F]">
                <div>
                  <p>
                    Under Section 63 of the Indian Succession Act, 1925, any adult person of sound mind can make a Will. You can bequeath all self-acquired properties to any person or charity of your choice.
                  </p>
                  <p className="mt-3">
                    A handwritten or printed Will on plain paper is completely valid in India. Stamp paper is not required by law. The essential legal requirement is the signature of the Will maker and two competent adult witnesses who observe the signing.
                  </p>
                </div>
                <div>
                  <p>
                    Will registration under Section 18 of the Registration Act, 1908 is optional. A properly executed unregistered Will carries equal legal authority. However, registration prevents false claims of forgery or coercion.
                  </p>
                  <p className="mt-3">
                    For Muslim citizens, testamentary succession is governed by Muslim Personal Law (Shariat), where a person can will up to one-third of their estate to non-heirs. For Hindus, Sikhs, Jains, and Buddhists, the Hindu Succession Act, 1956 applies.
                  </p>
                </div>
              </div>

              {/* Contextual Internal Links */}
              <div className="mt-8 border-t border-[#172228]/8 pt-6">
                <div className="text-xs font-bold text-[#172228] mb-3">
                  Related Legal Guides &amp; Resources:
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    href="/blogs/legally-valid-will-in-india"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#172228]/10 bg-[#FAF7F0] px-3 py-1.5 text-xs font-semibold text-[#172228] hover:border-[#C65378] hover:text-[#C65378]"
                  >
                    <span>Legal Validity Guide</span>
                    <ArrowRight size={11} />
                  </Link>
                  <Link
                    href="/services/will-registration"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#172228]/10 bg-[#FAF7F0] px-3 py-1.5 text-xs font-semibold text-[#172228] hover:border-[#C65378] hover:text-[#C65378]"
                  >
                    <span>Will Registration in India</span>
                    <ArrowRight size={11} />
                  </Link>
                  <Link
                    href="/templates/will-format-india"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#172228]/10 bg-[#FAF7F0] px-3 py-1.5 text-xs font-semibold text-[#172228] hover:border-[#C65378] hover:text-[#C65378]"
                  >
                    <span>Sample Will Format</span>
                    <ArrowRight size={11} />
                  </Link>
                  <Link
                    href="/services/nri-will-india"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#172228]/10 bg-[#FAF7F0] px-3 py-1.5 text-xs font-semibold text-[#172228] hover:border-[#C65378] hover:text-[#C65378]"
                  >
                    <span>NRI Will Drafting</span>
                    <ArrowRight size={11} />
                  </Link>
                  <Link
                    href="/tools/succession-calculator"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#172228]/10 bg-[#FAF7F0] px-3 py-1.5 text-xs font-semibold text-[#172228] hover:border-[#C65378] hover:text-[#C65378]"
                  >
                    <span>Legal Heir Calculator</span>
                    <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="border-t border-[#172228]/8 bg-white py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                Common Questions
              </span>
              <h3 className="mt-2 text-2xl font-extrabold text-[#172228]">
                Frequently Asked Questions About Starting a Will
              </h3>
              <p className="mt-2 text-sm text-[#49585F]">
                Here are plain-English answers to questions most clients ask before drafting their Will.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#172228]/8 bg-[#FAF7F0] p-5 shadow-xs"
                >
                  <div className="flex items-start gap-2.5">
                    <HelpCircle size={16} className="text-[#C65378] mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-[#172228]">
                        {faq.q}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-[#49585F]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-[#FAF7F0] p-6 border border-[#172228]/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-[#172228]">Have a question not answered here?</div>
                <p className="mt-0.5 text-xs text-[#49585F]">
                  Check our plans on the pricing page or speak directly with our senior advocates.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#172228]/15 bg-white px-4 py-2 text-xs font-bold text-[#172228] hover:border-[#172228]"
                >
                  <span>View Pricing</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#172228] px-4 py-2 text-xs font-bold text-white hover:bg-[#253640]"
                >
                  <span>Contact Lawyers</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="border-t border-[#172228]/8 bg-[#172228] py-14 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
              Take Action Today
            </span>
            <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Protect Your Family’s Financial Future?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-gray-300 leading-relaxed">
              Do not leave your hard-earned assets to uncertain disputes. Complete your online Will drafting questionnaire in 10 minutes.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/start/01"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C65378] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#b04568] sm:w-auto"
              >
                <span>Start Your Will Now (Step 1)</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/start/dashboard"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/20 sm:w-auto"
              >
                <LayoutDashboard size={16} />
                <span>Open Asset Dashboard</span>
              </Link>
              <Link
                href="/about-us"
                className="inline-flex w-full items-center justify-center gap-1.5 px-5 py-3 text-sm font-semibold text-gray-300 hover:text-white sm:w-auto"
              >
                <span>About AMA Legal Solutions</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
