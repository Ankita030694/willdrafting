"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Scale,
  Building,
  UserCheck,
  Lock,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  X,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  FileText,
  Layers,
  ShieldAlert,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Basics: Joint vs Mirror Wills" },
  { id: "supreme-court-precedents", label: "2. Supreme Court Precedents: Kochu Govindan" },
  { id: "comparative-analysis", label: "3. Comparative Table: Joint vs Mutual vs Mirror" },
  { id: "why-paired-mirror-wills", label: "4. Why Indian Couples Need Mirror Wills" },
  { id: "free-mirror-will-formats", label: "5. Paired Mirror Will Drafts: Husband & Wife" },
  { id: "key-clauses-spousal-wills", label: "6. Key Clauses Every Spousal Will Needs" },
  { id: "interactive-assessment", label: "7. Couple Will Structure Assessment Tool" },
  { id: "step-by-step-sop", label: "8. Step-by-Step SOP: Signing Protocol" },
  { id: "common-drafting-mistakes", label: "9. Common Pitfalls to Avoid in India" },
  { id: "institutional-profile", label: "10. Legal Review by AMA Legal Solutions" },
  { id: "frequently-asked-questions", label: "11. Frequently Asked Questions" },
  { id: "statutory-citations", label: "12. Legal Citations & Reference Guides" },
];

const FAQS = [
  {
    q: "Can husband and wife write a single joint Will on one paper in India?",
    a: "Yes, you can write one joint Will on a single paper. But lawyers strongly advise against it. The Supreme Court explained in Kochu Govindan (1959) that a joint Will is two Wills on one paper. It causes big delays in court when the first spouse dies. Land offices and banks often refuse to transfer asset until both spouses pass away.",
  },
  {
    q: "What is a Mirror Will, and why is it best for Indian couples?",
    a: "Mirror Wills are two separate Wills made by husband and wife. The husband leaves his assets to his wife first. If she dies before him, his assets go to their children. The wife writes the exact same terms for her husband. Each spouse signs their own paper. This avoids court delays and allows fast asset transfer.",
  },
  {
    q: "What is the difference between a Joint Will and a Mutual Will?",
    a: "A Joint Will is one paper signed by two people. A Mutual Will is two separate Wills made with a binding promise not to change them. In Dilharshankar (1986), the Supreme Court ruled that a Mutual Will binds the surviving partner. The survivor cannot change their Will later, even if family needs change.",
  },
  {
    q: "Can the surviving spouse change their Will after the first spouse dies?",
    a: "Yes, with standard Mirror Wills. Section 62 of the Indian Succession Act gives you the right to change your Will anytime during your life. The surviving partner can update the Will for medical costs or family changes. But with a Mutual Will, changing the terms can lead to lawsuits from relatives.",
  },
  {
    q: "What is a 30-day survivorship clause in a spousal Will?",
    a: "A 30-day survivorship clause requires a spouse to live for at least 30 days after the Will maker to inherit. If both spouses die in the same accident, the assets pass directly to the children. This saves your family from paying court fees and probate charges twice on the same assets.",
  },
  {
    q: "Do husband and wife need to register their Mirror Wills at the registry office?",
    a: "No, filing is voluntary under Section 18 of the Filing Act. A Will written on plain white paper with two witnesses is 100% legal. However, registering both Mirror Wills before the SRO provides strong proof if relatives fight the paper later.",
  },
  {
    q: "Can husband and wife witness each other's Will?",
    a: "No, never sign as a witness for your spouse. Under Section 67 of the Indian Succession Act, any gift to an signing witness is void. If you witness your spouse's Will, you lose your estate. You must use two independent adult witnesses who get no share in the estate.",
  },
  {
    q: "How is jointly owned asset handled in spousal Mirror Wills?",
    a: "In India, joint owners hold asset in shares, usually 50% each. You can only give away your own share in your Will. A Mirror Will gives your 50% share to your surviving spouse. This gives your partner full 100% ownership of the family home without fights.",
  },
  {
    q: "Can a couple appoint the same executor for both Mirror Wills?",
    a: "Yes. Spouses usually name each other as primary executor. The husband names his wife, and the wife names her husband. Both Wills should also name the same trusted adult child or relative as backup executor if both spouses pass away together.",
  },
  {
    q: "Does a spousal Mirror Will override bank nominations?",
    a: "Yes. In Shakti Yezdani (2023), the Supreme Court ruled that a nominee is only a temporary caretaker. The nominee must hand over all money to the heirs named in the Will. The person named in the Will is the true legal owner of the funds.",
  },
];

export default function JointMutualMirrorWillClient() {
  const { status } = useSession();
  const router = useRouter();

  const handleStartDraft = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (status === "authenticated") {
      router.push("/start/dashboard");
    } else {
      window.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
    }
  };

  const [activeId, setActiveId] = useState<string>("legal-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"husband" | "wife" | "survivorship" | "executor" | "warning">("husband");
  const [copiedState, setCopiedState] = useState<string | null>(null);

  // Assessment Quiz State
  const [quizPropertyOwnership, setQuizPropertyOwnership] = useState<"joint" | "individual" | "both">("both");
  const [quizChildrenStatus, setQuizChildrenStatus] = useState<"adults" | "minors" | "no_children">("adults");
  const [quizFutureFlexibility, setQuizFutureFlexibility] = useState<"flexible" | "locked">("flexible");

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-100px 0px -40% 0px",
      threshold: 0.05,
    });

    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(label);
    setTimeout(() => setCopiedState(null), 3000);
  };

  const husbandWillText = `LAST WILL AND TESTAMENT OF [FULL NAME OF HUSBAND]

I, [Full Name of Husband], son of Late [Father's Name], aged [Age] years, residing at [Residential Address], holding PAN [PAN] and Aadhaar [Aadhaar], do hereby revoke all my earlier Wills and codicils. I declare this as my Last Will and Testament executed this [Day] day of [Month], [Year].

1. SOUND MIND:
I declare that I am in good health and sound mind. I make this Will out of my own free will, without any pressure, force, or fraud from anyone.

2. APPOINTMENT OF EXECUTOR:
I appoint my wife, [Full Name of Wife], as the sole Executrix of this Will. If she dies before me or cannot act, I appoint [Alternate Executor Name], residing at [Address], as the alternate Executor.

3. GIFT OF ESTATE TO WIFE:
Subject to clause 4 below, I give all my property, including houses, bank accounts, deposits, shares, and personal items, to my wife, [Full Name of Wife], as full owner.

4. 30-DAY SURVIVAL RULE:
My wife will inherit my estate only if she lives for at least 30 clear days after my death. If she dies before me or within 30 days of my death, this gift to her will cancel.

5. GIFT TO CHILDREN IF WIFE DIES FIRST:
If my wife dies before me or does not survive me by 30 days, my estate will be divided equally among our surviving children:
a) [Name of Child 1], holding an equal share.
b) [Name of Child 2], holding an equal share.

6. REMAINING ASSETS:
Any other asset belonging to me that is not listed here will pass to my wife, and if she does not survive me by 30 days, equally to our children.

Signed by me, [Husband's Name], on this [Day] day of [Month], [Year].

___________________________
TESTATOR: [Husband's Full Name]

WITNESSES:
Signed by the Testator in our presence. We sign our names as witnesses in his presence and at his request:

Witness 1:
Signature: ______________________
Name: [Full Name of Witness 1]
Address: [Full Address]
Aadhaar/PAN: [ID Number]

Witness 2:
Signature: ______________________
Name: [Full Name of Witness 2]
Address: [Full Address]
Aadhaar/PAN: [ID Number]`;

  const wifeWillText = `LAST WILL AND TESTAMENT OF [FULL NAME OF WIFE]

I, [Full Name of Wife], daughter of Late [Father's Name] and wife of [Full Name of Husband], aged [Age] years, residing at [Residential Address], holding PAN [PAN] and Aadhaar [Aadhaar], do hereby revoke all my earlier Wills and codicils. I declare this as my Last Will and Testament executed this [Day] day of [Month], [Year].

1. SOUND MIND:
I declare that I am in good health and sound mind. I make this Will freely and without any force, fraud, or pressure from any person.

2. APPOINTMENT OF EXECUTOR:
I appoint my husband, [Full Name of Husband], as the sole Executor of this Will. If he dies before me or cannot act, I appoint [Alternate Executor Name], residing at [Address], as the alternate Executor.

3. GIFT OF ESTATE TO HUSBAND:
Subject to clause 4 below, I give all my property, including my self-acquired assets, jewelry, bank accounts, shares, and my share in joint property, to my husband, [Full Name of Husband], as full owner.

4. 30-DAY SURVIVAL RULE:
My husband will inherit my estate only if he lives for at least 30 clear days after my death. If he dies before me or within 30 days of my death, this gift to him will cancel.

5. GIFT TO CHILDREN IF HUSBAND DIES FIRST:
If my husband dies before me or does not survive me by 30 days, my estate will pass equally to our surviving children:
a) [Name of Child 1], holding an equal share.
b) [Name of Child 2], holding an equal share.

6. REMAINING ASSETS:
Any other property belonging to me that is not listed here will pass to my husband, and if he does not survive me by 30 days, equally to our children.

Signed by me, [Wife's Name], on this [Day] day of [Month], [Year].

___________________________
TESTATRIX: [Wife's Full Name]

WITNESSES:
Signed by the Testatrix in our presence. We sign our names as witnesses in her presence and at her request:

Witness 1:
Signature: ______________________
Name: [Full Name of Witness 1]
Address: [Full Address]
Aadhaar/PAN: [ID Number]

Witness 2:
Signature: ______________________
Name: [Full Name of Witness 2]
Address: [Full Address]
Aadhaar/PAN: [ID Number]`;

  const survivorshipClauseText = `30-DAY SURVIVORSHIP CLAUSE:
"Any person named in this Will who does not live for at least 30 clear days after my death will be treated as having died before me. All gifts under this Will shall take effect accordingly. This clause prevents double court fees and duplicate probate costs if both spouses die in a common accident."`;

  const executorClauseText = `APPOINTMENT OF EXECUTORS AND GUARDIANS:
"I appoint my spouse, [Spouse Full Name], as the primary Executor of this Will.
If my spouse dies before me or cannot act, I appoint [Alternate Executor Full Name], residing at [Address], as the backup Executor.
If any of my children are under 18 years of age when I die and my spouse has also died, I appoint [Guardian Name], residing at [Address], as the legal guardian of my minor children."`;

  const warningJointWillText = `RISKY CLAUSE FOUND IN OLD JOINT WILL TEMPLATES (DO NOT USE):
"We, Husband and Wife, make this single joint Will together. We direct that our property will pass to the survivor only after both of us pass away, and neither of us can cancel this Will without the written consent of the other..."

WHY THIS CAUSES PROBLEMS UNDER INDIAN LAW:
1. Section 62 Conflict: You have a legal right to cancel your Will at any time. A clause that blocks cancellation leads to court disputes.
2. Probate Hurdle: Civil courts in India cannot easily probate a joint Will when only one spouse has died.
3. Office Rejections: Banks, land registries, and housing societies often refuse to transfer ownership while one person named on the joint Will is still alive.`;

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTIONS 62 &amp; 70 COMPLIANT</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Joint and Mirror Will Format for Husband and Wife in India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Protect your spouse and children with checked paired Mirror Wills. Compare Joint,
            Mutual, and Mirror formats under the Supreme Court ruling in Kochu Govindan. Avoid
            court delays and asset transfer fights.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#free-mirror-will-formats"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Free Mirror Formats</span>
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-rose-300" />
              <span>Draft Couple Wills Online</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (WillDrafting Social Proof & Trust Metrics)
          ========================================================================= */}
      <section className="w-full bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] border-y border-[#172228]/10 py-5 sm:py-6 shadow-[0_2px_10px_rgba(23,34,40,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-x-3 gap-y-6 md:gap-0">
            {/* Stat 1: Legal Experience */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                15+ Years
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Legal Experience
              </span>
            </div>

            {/* Stat 2: Cases Handled */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                10,000+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Cases Handled
              </span>
            </div>

            {/* Stat 3: Assets Protected */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹2,500Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Assets Protected
              </span>
            </div>

            {/* Stat 4: Google Rating & Reviews */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 px-1 sm:px-4 md:border-l md:border-[#172228]/12">
              <svg
                className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7 sm:w-8 sm:h-8 shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              <div className="flex items-baseline">
                <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                  4.9/5
                </span>
              </div>

              <div className="flex flex-col text-left leading-tight">
                <span className="text-[11px] sm:text-xs font-bold text-[#172228]">
                  1,300+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#55636D] font-semibold">
                  Reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Matching Reference Tool Structure)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px] xl:grid-cols-[280px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-6 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-[#172228]">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  TABLE OF CONTENTS
                </span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {TOC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-xs py-2 px-3 rounded-lg transition-all leading-snug ${
                      activeId === item.id
                        ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Statutory Compliance Badge in Left Sidebar */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Legal Office</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Drafted under Sections 62, 63 &amp; 70 of Indian Succession Act, 1925, and Supreme
                Court rulings in Kochu Govindan &amp; Dilharshankar.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE SECTIONS
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* EXECUTIVE SUMMARY BOX (Matching Screenshot) */}
            <div className="rounded-2xl bg-white border border-slate-200/90 border-l-[6px] border-l-[#C65378] p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  QUICK SUMMARY: 4 GOLDEN RULES OF SPOUSAL WILLS IN INDIA
                </span>
              </div>
              <div className="text-lg font-bold text-slate-900 mb-3">
                Essential Rules Every Indian Couple Should Know
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Two separate Wills are best:</strong> Husband and wife should each execute
                    their own Will on plain paper. Writing one single joint paper leads to court
                    and bank delays.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Spouses must NOT witness each other:</strong> Under Section 67, if a spouse
                    signs as a witness, their estate is cancelled. Use two non-heir adult
                    witnesses.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Include a 30-day survival rule:</strong> If both partners pass away in a common
                    accident, the estate passes straight to children. This prevents double court fees.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Filing is a choice:</strong> An plain Will written on plain white
                    A4 paper is 100% legal. SRO filing is voluntary under Section 18.
                  </span>
                </li>
              </ul>
            </div>

            {/* Visual Featured Image Card (OG Image Display - Non-flowchart) */}
            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#172228]/10 shadow-xs overflow-hidden">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-[#172228]/5 bg-[#172228]/5">
                <Image
                  src="/images/joint-mutual-mirror-will-format-husband-wife-og.jpg"
                  alt="Joint and Mirror Will Format for Husband and Wife in India with paired folios and"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="pt-3 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#49585F]">
                <span className="font-semibold text-[#172228]">
                  Paired Spousal Mirror Will Formats: Husband and Wife Estate in India
                </span>
                <span className="inline-flex items-center gap-1 text-[#5F7E75]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Checked under Indian Succession Act, 1925
                </span>
              </div>
            </div>

            {/* SECTION 1 */}
            <section id="statutory-foundation" className="scroll-mt-28 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C65378]/10 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                <Scale className="w-3.5 h-3.5" />
                <span>Legal Foundations</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#172228]">
                1. Joint Will vs Mirror Will: Understanding the Legal Basics
              </h2>
              <p className="text-sm sm:text-base text-[#49585F] leading-relaxed">
                Many married couples in India want to write one combined Will together. A single
                paper signed by both partners looks simple at first. But under Indian succession
                law, writing one shared Will creates big legal traps.
              </p>
              <p className="text-sm sm:text-base text-[#49585F] leading-relaxed">
                Under the Indian Succession Act, each person owns asset as a separate owner. A
                Will states what must happen to your own assets after death. Putting two people&apos;s
                wishes on one paper leads to confusion in civil courts and registry offices.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <div className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">
                    Single Joint Will
                  </div>
                  <div className="text-sm font-bold text-[#172228] mb-1">One Shared Paper</div>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    Both spouses sign one paper. It causes court delays because courts cannot easily
                    prove it until both spouses die.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <div className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-1">
                    Mutual Will
                  </div>
                  <div className="text-sm font-bold text-[#172228] mb-1">Binding Pact</div>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    Two Wills made with a binding promise not to change them. The surviving spouse
                    cannot update terms if family needs change.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 shadow-2xs">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-1">
                    Paired Mirror Wills
                  </div>
                  <div className="text-sm font-bold text-[#172228] mb-1">Recommended Pathway</div>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    Two separate Wills that match each other. Each spouse gives assets to the other
                    first, then to children. Safe, flexible, and simple to prove.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2 */}
            <section id="supreme-court-precedents" className="scroll-mt-28 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5F7E75]/10 text-[#3d5951] text-xs font-bold uppercase tracking-wider">
                <Gavel className="w-3.5 h-3.5" />
                <span>Judicial Office</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                2. Supreme Court Precedents: Kochu Govindan &amp; Dilharshankar
              </h3>
              <p className="text-sm sm:text-base text-[#49585F] leading-relaxed">
                The Supreme Court of India has examined joint and mutual wills in two landmark
                cases. These judgments show why separate Mirror Wills are the safest path for
                married couples.
              </p>

              <div className="space-y-4 pt-1">
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                      AIR 1959 SC 71
                    </span>
                    <span className="text-xs font-medium text-[#49585F]">3-Judge Bench</span>
                  </div>
                  <h3 className="text-base font-bold text-[#172228] mb-2">
                    Kochu Govindan Kaimal v. Thayankoot Thekkot Lakshmi Amma
                  </h3>
                  <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed mb-3">
                    The Supreme Court held that a joint Will is simply two separate Wills written on
                    one sheet of paper. Each person can change their part during their life.
                    However, proving one person&apos;s Will while the other is still alive causes great
                    difficulty in court.
                  </p>
                  <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/5 text-xs text-[#172228] font-medium">
                    <strong>Rule:</strong> A joint Will is not a single act. It operates as two
                    separate Wills. Putting them on one paper creates unnecessary delays in registry
                    offices and courts.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                      (1986) 1 SCC 701
                    </span>
                    <span className="text-xs font-medium text-[#49585F]">Division Bench</span>
                  </div>
                  <h3 className="text-base font-bold text-[#172228] mb-2">
                    Dilharshankar C. Bhachech v. Controller of Estate Duty, Ahmedabad
                  </h3>
                  <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed mb-3">
                    The Supreme Court ruled on mutual wills. If spouses agree not to change their
                    Wills, the surviving partner holds the asset in trust. The survivor cannot
                    change the split later, even if family situations change.
                  </p>
                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-950 font-medium">
                    <strong>Warning:</strong> A Mutual Will locks your asset. If the survivor
                    faces high medical bills or needs money in old age, relatives can block asset
                    sales in court.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3 */}
            <section id="comparative-analysis" className="scroll-mt-28 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C65378]/10 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>Feature Comparison</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                3. Comparative Analysis: Joint vs Mutual vs Mirror Wills
              </h3>
              <p className="text-sm sm:text-base text-[#49585F] leading-relaxed">
                Before choosing a format, see how these three options compare in Indian civil
                courts, land offices, and banks.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-[#172228]/10 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="py-3 px-4 font-bold border-b border-white/10 w-1/4">Feature</th>
                      <th className="py-3 px-4 font-bold border-b border-white/10 w-1/4">
                        Joint Will (Single Deed)
                      </th>
                      <th className="py-3 px-4 font-bold border-b border-white/10 w-1/4">
                        Mutual Will (Binding Contract)
                      </th>
                      <th className="py-3 px-4 font-bold border-b border-white/10 w-1/4 bg-[#C65378]">
                        Paired Mirror Wills (Best)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#172228]/10 text-[#49585F]">
                    <tr className="hover:bg-[#FAF7F0]/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-[#172228]">Papers</td>
                      <td className="py-3 px-4">1 single paper signed by both</td>
                      <td className="py-3 px-4">2 separate papers with contract</td>
                      <td className="py-3 px-4 font-semibold text-emerald-800 bg-emerald-50/30">
                        2 separate independent papers
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F0]/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-[#172228]">Right to Change (Sec 62)</td>
                      <td className="py-3 px-4">Each can change own part</td>
                      <td className="py-3 px-4">Breaks pact if changed</td>
                      <td className="py-3 px-4 font-semibold text-emerald-800 bg-emerald-50/30">
                        100% free to change anytime
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F0]/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-[#172228]">Changes After 1st Death</td>
                      <td className="py-3 px-4">Creates fights on joint assets</td>
                      <td className="py-3 px-4">Survivor cannot change terms</td>
                      <td className="py-3 px-4 font-semibold text-emerald-800 bg-emerald-50/30">
                        Survivor can adapt to emergencies
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F0]/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-[#172228]">Court Approval (Probate)</td>
                      <td className="py-3 px-4 text-rose-700 font-medium">
                        Difficult on first death
                      </td>
                      <td className="py-3 px-4">Must prove terms in court</td>
                      <td className="py-3 px-4 font-semibold text-emerald-800 bg-emerald-50/30">
                        Fast and simple court process
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F0]/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-[#172228]">Bank &amp; Land Transfer</td>
                      <td className="py-3 px-4 text-rose-700 font-medium">
                        Frequent objections by officers
                      </td>
                      <td className="py-3 px-4">Can face fights by heirs</td>
                      <td className="py-3 px-4 font-semibold text-emerald-800 bg-emerald-50/30">
                        Smooth and standard acceptance
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F0]/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-[#172228]">Double Court Fee Check</td>
                      <td className="py-3 px-4">No built-in protection</td>
                      <td className="py-3 px-4">Depends on exact drafting</td>
                      <td className="py-3 px-4 font-semibold text-emerald-800 bg-emerald-50/30">
                        Includes 30-day survival rule
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4 */}
            <section id="why-paired-mirror-wills" className="scroll-mt-28 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>The Joint Will Trap</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                4. Why Indian Couples Need Paired Mirror Wills Instead
              </h3>
              <p className="text-sm sm:text-base text-[#49585F] leading-relaxed">
                Generic joint Will templates found online cause serious practical problems in India.
                Here are four reasons why married couples should write two separate Mirror Wills
                instead:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm mb-3">
                    1
                  </div>
                  <h3 className="text-sm font-bold text-[#172228] mb-1.5">
                    Land and Society Transfer Delays
                  </h3>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    When the first spouse passes away, the survivor must update city records
                    and society papers. Officers often refuse transfer if the living spouse is named
                    as co-Will maker on the same physical deed.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm mb-3">
                    2
                  </div>
                  <h3 className="text-sm font-bold text-[#172228] mb-1.5">
                    High Court Probate Roadblocks
                  </h3>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    In cities like Mumbai, Kolkata, and Chennai, probate is required under Section
                    213. Court clerks raise objections when asked to probate a joint paper while
                    one spouse is still alive.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm mb-3">
                    3
                  </div>
                  <h3 className="text-sm font-bold text-[#172228] mb-1.5">
                    Locked Asset in Old Age
                  </h3>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    A Mutual Will can lock your assets. If the surviving spouse needs money for
                    healthcare 10 years later, children or in-laws can go to court to block asset
                    sales.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm mb-3">
                    4
                  </div>
                  <h3 className="text-sm font-bold text-[#172228] mb-1.5">
                    Double Court Fees on Joint Calamity
                  </h3>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    If both spouses die together in an accident without a 30-day survival rule,
                    asset passes to the second spouse briefly before going to children. The
                    family pays court fees twice on the same assets.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5 */}
            <section id="free-mirror-will-formats" className="scroll-mt-28 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C65378]/10 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Copy-Paste Legal Templates</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                5. Free Paired Mirror Will Formats: Husband &amp; Wife Drafts
              </h3>
              <p className="text-sm sm:text-base text-[#49585F] leading-relaxed">
                Use these checked templates to prepare separate Mirror Wills on plain white paper.
                Each partner must execute their own paper before two independent adult
                witnesses.
              </p>

              <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                <button
                  onClick={() => setActiveTab("husband")}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "husband"
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "text-[#49585F] hover:bg-[#FAF7F0] hover:text-[#172228]"
                  }`}
                >
                  Husband&apos;s Mirror Will
                </button>
                <button
                  onClick={() => setActiveTab("wife")}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "wife"
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "text-[#49585F] hover:bg-[#FAF7F0] hover:text-[#172228]"
                  }`}
                >
                  Wife&apos;s Mirror Will
                </button>
                <button
                  onClick={() => setActiveTab("survivorship")}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "survivorship"
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "text-[#49585F] hover:bg-[#FAF7F0] hover:text-[#172228]"
                  }`}
                >
                  30-Day Survival Clause
                </button>
                <button
                  onClick={() => setActiveTab("executor")}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "executor"
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "text-[#49585F] hover:bg-[#FAF7F0] hover:text-[#172228]"
                  }`}
                >
                  Executor &amp; Guardian Clause
                </button>
                <button
                  onClick={() => setActiveTab("warning")}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "warning"
                      ? "bg-rose-900 text-white shadow-xs"
                      : "text-rose-700 hover:bg-rose-50"
                  }`}
                >
                  Joint Will Warning Box
                </button>
              </div>

              <div className="relative rounded-2xl bg-[#172228] text-white p-5 sm:p-6 shadow-md border border-white/10 font-mono text-xs sm:text-[13px] leading-relaxed">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-white/70 font-sans">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-rose-300" />
                    <span className="text-xs font-semibold">
                      {activeTab === "husband" && "Format 1: Husband's Last Will and Testament"}
                      {activeTab === "wife" && "Format 2: Wife's Last Will and Testament"}
                      {activeTab === "survivorship" && "30-Day Survival Clause"}
                      {activeTab === "executor" && "Executor & Guardian Nomination"}
                      {activeTab === "warning" && "Warning: The Joint Will Pitfall"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (activeTab === "husband") copyToClipboard(husbandWillText, "husband");
                      if (activeTab === "wife") copyToClipboard(wifeWillText, "wife");
                      if (activeTab === "survivorship")
                        copyToClipboard(survivorshipClauseText, "survivorship");
                      if (activeTab === "executor")
                        copyToClipboard(executorClauseText, "executor");
                      if (activeTab === "warning") copyToClipboard(warningJointWillText, "warning");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                  >
                    {copiedState ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Format</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto pr-2 space-y-3 whitespace-pre-wrap text-white/90">
                  {activeTab === "husband" && husbandWillText}
                  {activeTab === "wife" && wifeWillText}
                  {activeTab === "survivorship" && survivorshipClauseText}
                  {activeTab === "executor" && executorClauseText}
                  {activeTab === "warning" && warningJointWillText}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Tip:</strong> Print on plain white A4 paper. No stamp paper is required
                  under the Indian Stamp Act. Spouses must not witness each other&apos;s Will. Use
                  two adult witnesses who get no share in the asset.
                </div>
              </div>
            </section>

            {/* SECTION 6 */}
            <section id="key-clauses-spousal-wills" className="scroll-mt-28 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5F7E75]/10 text-[#3d5951] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Drafting Anatomy</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                6. Key Clauses Every Spousal Will Must Include in India
              </h3>
              <p className="text-sm sm:text-base text-[#49585F] leading-relaxed">
                To protect your surviving partner from future fights, include these five core
                clauses in your Mirror Wills:
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <h3 className="text-sm font-bold text-[#172228] mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#C65378]/10 text-[#C65378] text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <span>Clause Canceling Old Wills (Sections 62 &amp; 70)</span>
                  </h3>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    State clearly that all prior Wills and notes are canceled. This stops relatives
                    from bringing up old drafts during court proceedings.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <h3 className="text-sm font-bold text-[#172228] mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#C65378]/10 text-[#C65378] text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    <span>Full Ownership vs Life Interest</span>
                  </h3>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    State if the surviving spouse gets full ownership with the right to sell, or
                    only the right to live in the house for life. Full ownership is common in first
                    marriages.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <h3 className="text-sm font-bold text-[#172228] mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#C65378]/10 text-[#C65378] text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    <span>30-Day Survival Rule</span>
                  </h3>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    If both spouses die in a shared accident, this clause prevents the assets from
                    passing to the second spouse for a few hours. It saves paying court fees twice.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <h3 className="text-sm font-bold text-[#172228] mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#C65378]/10 text-[#C65378] text-xs flex items-center justify-center font-bold">
                      4
                    </span>
                    <span>Backup Executor and Child Guardian</span>
                  </h3>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    Always name a backup executor and child guardian. If both spouses pass away, the
                    backup executor manages finances and the guardian protects your minor children.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <h3 className="text-sm font-bold text-[#172228] mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#C65378]/10 text-[#C65378] text-xs flex items-center justify-center font-bold">
                      5
                    </span>
                    <span>Remaining Assets Clause</span>
                  </h3>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    This clause covers future asset, forgotten bank accounts, and tax refunds
                    not listed in your asset schedules. It ensures nothing is left out.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7 */}
            <section id="interactive-assessment" className="scroll-mt-28 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C65378]/10 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" />
                <span>Couple Will Assessment Tool</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                7. Free Assessment: Find the Right Will for Couples
              </h3>
              <p className="text-sm sm:text-base text-[#49585F] leading-relaxed">
                Answer three quick questions to see whether standard Mirror Wills or a Life
                Interest clause fits your family:
              </p>

              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#172228]/10 shadow-xs space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#172228] mb-2 uppercase tracking-wide">
                    Question 1: How is your family asset owned?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setQuizPropertyOwnership("joint")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        quizPropertyOwnership === "joint"
                          ? "border-[#C65378] bg-[#C65378]/10 text-[#172228] font-bold"
                          : "border-[#172228]/10 text-[#49585F] hover:bg-[#FAF7F0]"
                      }`}
                    >
                      Jointly Owned Flat or Land
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuizPropertyOwnership("individual")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        quizPropertyOwnership === "individual"
                          ? "border-[#C65378] bg-[#C65378]/10 text-[#172228] font-bold"
                          : "border-[#172228]/10 text-[#49585F] hover:bg-[#FAF7F0]"
                      }`}
                    >
                      Individually Owned Asset
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuizPropertyOwnership("both")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        quizPropertyOwnership === "both"
                          ? "border-[#C65378] bg-[#C65378]/10 text-[#172228] font-bold"
                          : "border-[#172228]/10 text-[#49585F] hover:bg-[#FAF7F0]"
                      }`}
                    >
                      Mix of Joint and Sole Assets
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172228] mb-2 uppercase tracking-wide">
                    Question 2: What is your children&apos;s status?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setQuizChildrenStatus("adults")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        quizChildrenStatus === "adults"
                          ? "border-[#C65378] bg-[#C65378]/10 text-[#172228] font-bold"
                          : "border-[#172228]/10 text-[#49585F] hover:bg-[#FAF7F0]"
                      }`}
                    >
                      Adult Children (18+ years)
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuizChildrenStatus("minors")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        quizChildrenStatus === "minors"
                          ? "border-[#C65378] bg-[#C65378]/10 text-[#172228] font-bold"
                          : "border-[#172228]/10 text-[#49585F] hover:bg-[#FAF7F0]"
                      }`}
                    >
                      Minor Children (Under 18)
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuizChildrenStatus("no_children")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        quizChildrenStatus === "no_children"
                          ? "border-[#C65378] bg-[#C65378]/10 text-[#172228] font-bold"
                          : "border-[#172228]/10 text-[#49585F] hover:bg-[#FAF7F0]"
                      }`}
                    >
                      No Children or Second Marriage
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172228] mb-2 uppercase tracking-wide">
                    Question 3: Should the survivor have freedom to update terms later?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setQuizFutureFlexibility("flexible")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        quizFutureFlexibility === "flexible"
                          ? "border-[#C65378] bg-[#C65378]/10 text-[#172228] font-bold"
                          : "border-[#172228]/10 text-[#49585F] hover:bg-[#FAF7F0]"
                      }`}
                    >
                      Yes, survivor needs full freedom (Mirror Will)
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuizFutureFlexibility("locked")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        quizFutureFlexibility === "locked"
                          ? "border-[#C65378] bg-[#C65378]/10 text-[#172228] font-bold"
                          : "border-[#172228]/10 text-[#49585F] hover:bg-[#FAF7F0]"
                      }`}
                    >
                      No, asset must stay with children (Life Interest)
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C65378] uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Recommended Legal Setup</span>
                  </div>
                  <h4 className="text-base font-bold text-[#172228]">
                    {quizFutureFlexibility === "flexible"
                      ? "Paired Independent Mirror Wills with 30-Day Survival Rule"
                      : "Mirror Wills with a Life Interest Clause"}
                  </h4>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    {quizFutureFlexibility === "flexible" ? (
                      <>
                        Make two separate Mirror Wills. Each spouse gives their share to the
                        survivor with full ownership. If both die, property divides equally among
                        your{" "}
                        {quizChildrenStatus === "minors" ? "minor children (name a guardian!)" : "children"}
                        . Never use a single shared Will paper.
                      </>
                    ) : (
                      <>
                        Make paired Mirror Wills with a <strong>Life Interest</strong>. The survivor
                        can live in the home and take rent for life, but cannot sell the capital.
                        The asset passes directly to your children after the survivor dies.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* Contextual Calculator Callout Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wide">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Estate Planning Tool</span>
                </div>
                <h3 className="text-sm font-bold text-[#172228]">
                  Estimate Probate Court Fees and Estate Tax in India
                </h3>
                <p className="text-xs text-[#49585F] leading-relaxed max-w-xl">
                  Check probate fees across High Courts (Mumbai, Delhi, Calcutta, Madras) or
                  calculate capital gains tax on inherited family assets before signing
                  your family estate plan.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0 w-full sm:w-auto">
                <Link
                  href="/tools/probate-court-fee-timeline-calculator"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold transition-colors text-center"
                >
                  <span>Probate Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-teal-300 hover:bg-teal-50 text-teal-900 text-xs font-bold transition-colors text-center"
                >
                  <span>Tax Tool</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* SECTION 8 */}
            <section id="step-by-step-sop" className="scroll-mt-28 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5F7E75]/10 text-[#3d5951] text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Signing Protocol</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                8. Step-by-Step SOP: Signing Your Mirror Wills Legally
              </h3>
              <p className="text-sm sm:text-base text-[#49585F] leading-relaxed">
                Follow these six steps to execute your spousal Wills properly under Section 63 of
                the Indian Succession Act:
              </p>

              <div className="space-y-4 pt-1">
                <div className="flex gap-4 p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#172228] mb-1">
                      Make an Asset Inventory
                    </h3>
                    <p className="text-xs text-[#49585F] leading-relaxed">
                      List all asset details, registry numbers, bank accounts, deposits, and
                      insurance policies. Note which assets are owned jointly versus solely.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#172228] mb-1">
                      Print Two Separate Papers on Plain Paper
                    </h3>
                    <p className="text-xs text-[#49585F] leading-relaxed">
                      Do not merge both spouses into one Will. Print one paper for the husband and
                      one for the wife on plain white A4 paper. No stamp paper is required.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#172228] mb-1">
                      Pick Two Independent Witnesses
                    </h3>
                    <p className="text-xs text-[#49585F] leading-relaxed">
                      Choose two adult witnesses who get no share in the asset. Spouses must
                      never witness each other&apos;s Will, as doing so voids the bequest under Section 67.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#172228] mb-1">
                      Sign in the Presence of Both Witnesses
                    </h3>
                    <p className="text-xs text-[#49585F] leading-relaxed">
                      Sign the bottom of every page in front of both witnesses. Both witnesses must
                      then sign and write their full names, addresses, and ID numbers.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#172228] mb-1">
                      Attach a Doctor&apos;s Fitness Paper
                    </h3>
                    <p className="text-xs text-[#49585F] leading-relaxed">
                      If either spouse is 60 or older, get an MBBS doctor to sign a paper of
                      sound mind. This stops future false claims of illness or mental weakness.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    6
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#172228] mb-1">
                      A Choice Filing at SRO office
                    </h3>
                    <p className="text-xs text-[#49585F] leading-relaxed">
                      Filing is a choice under Section 18 of the Filing Act. But
                      registering your Mirror Wills creates an official government record that stops
                      fights.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9 */}
            <section id="common-drafting-mistakes" className="scroll-mt-28 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Risk Prevention</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                9. Common Mistakes to Avoid in Spousal Will Drafting
              </h3>
              <p className="text-sm sm:text-base text-[#49585F] leading-relaxed">
                Avoid these four common mistakes when preparing spousal Wills in India:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-white border border-rose-100 shadow-2xs">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase mb-1">
                    <X className="w-4 h-4" />
                    <span>Mistake 1: Signing as Witness</span>
                  </div>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    Husband witnesses the wife&apos;s Will, or wife witnesses the husband&apos;s Will.
                    Under Section 67, any gift to a witness is void. The spouse loses their entire
                    estate.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-rose-100 shadow-2xs">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase mb-1">
                    <X className="w-4 h-4" />
                    <span>Mistake 2: Missing 30-Day Rule</span>
                  </div>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    Leaving out the survival period. If both spouses die days apart in an accident,
                    the family pays court fees and probate charges twice on the exact same assets.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-rose-100 shadow-2xs">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase mb-1">
                    <X className="w-4 h-4" />
                    <span>Mistake 3: Relying on Bank Nominees</span>
                  </div>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    Thinking a bank nominee becomes the owner. The Supreme Court ruled in Shakti
                    Yezdani (2023) that nominees must hand over all funds to the heirs named in the
                    Will.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-rose-100 shadow-2xs">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase mb-1">
                    <X className="w-4 h-4" />
                    <span>Mistake 4: Disinheriting Without Reasons</span>
                  </div>
                  <p className="text-xs text-[#49585F] leading-relaxed">
                    Excluding a child without giving a clear factual reason. Unexplained exclusions
                    create doubts in probate court proceedings.
                  </p>
                </div>
              </div>
            </section>

            {/* Mid-Article Dual Conversion CTA Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#172228] text-white shadow-lg space-y-6">
              <div className="max-w-2xl">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-widest">
                  Secure Your Family Future Today
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold mt-1 mb-2 text-white">
                  Ready to Draft Compliant Spousal Mirror Wills?
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Avoid generic joint will templates that get rejected by land offices. Create
                  paired, lawyer-vetted Mirror Wills customized for your assets, children, and
                  survival terms in 15 minutes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-sm transition-transform hover:-translate-y-0.5 shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Self-Serve Drafting Online</span>
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Consult an Estate Lawyer</span>
                </Link>
              </div>
            </div>

            {/* SECTION 10 */}
            <section id="institutional-profile" className="scroll-mt-28 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5F7E75]/10 text-[#3d5951] text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>Legal Office</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                10. Professional Legal Support from AMA Legal Solutions
              </h3>
              <p className="text-sm sm:text-base text-[#49585F] leading-relaxed">
                WillDrafting.in is supported by <strong>AMA Legal Solutions</strong>, an Indian law
                firm focused on estate planning, family trusts, High Court probate petitions, and
                asset estate.
              </p>

              <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C65378]/10 text-[#C65378] flex items-center justify-center shrink-0">
                  <Building className="w-6 h-6" />
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-[#49585F]">
                  <h3 className="text-base font-bold text-[#172228]">
                    Estate Lawyers &amp; Will Solicitors
                  </h3>
                  <p className="leading-relaxed">
                    Our lawyers are enrolled with the Bar Council of Delhi, High Court Bar
                    Associations, and the Supreme Court Bar Association. We have assisted hundreds
                    of couples across Delhi NCR, Mumbai, Bengaluru, Hyderabad, and Chennai in
                    structuring clear estate plans and registering paired mirror wills.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3 text-xs text-[#172228] font-semibold">
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Supreme Court &amp; High Court Experience
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Section 63 Witness Signing Guidance
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      SRO Will Filing Services
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11 */}
            <section id="frequently-asked-questions" className="scroll-mt-28 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C65378]/10 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Clear Answers</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                11. Frequently Asked Questions on Spousal Wills in India
              </h3>
              <p className="text-sm sm:text-base text-[#49585F] leading-relaxed">
                Find clear answers to common questions about drafting spousal wills, mirror
                instruments, and protecting joint family assets in India.
              </p>

              <div className="space-y-3 pt-1">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#172228]/10 bg-white shadow-2xs overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between gap-4 p-4 text-left font-bold text-sm text-[#172228] hover:bg-[#FAF7F0]/50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-200 ${
                          openFaq === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#49585F] leading-relaxed border-t border-[#172228]/5 bg-[#FAF7F0]/30">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 12 */}
            <section id="statutory-citations" className="scroll-mt-28 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5F7E75]/10 text-[#3d5951] text-xs font-bold uppercase tracking-wider">
                <Landmark className="w-3.5 h-3.5" />
                <span>Legal Office</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172228]">
                12. Legal Rules &amp; Legal Citation Directory
              </h3>
              <p className="text-sm sm:text-base text-[#49585F] leading-relaxed">
                Review the primary legal rules and court offices governing spousal
                wills and asset estate in India:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-[#172228]/10">
                  <div className="font-bold text-[#172228] mb-0.5">
                    Section 62, Indian Succession Act, 1925
                  </div>
                  <div className="text-[#49585F]">
                    Confirms that you can change or cancel your Will at any time during your life
                    while of sound mind.
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#172228]/10">
                  <div className="font-bold text-[#172228] mb-0.5">
                    Section 63, Indian Succession Act, 1925
                  </div>
                  <div className="text-[#49585F]">
                    Sets signing rules: signed by the Will maker and witnessed by at least two adult
                    witnesses.
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#172228]/10">
                  <div className="font-bold text-[#172228] mb-0.5">
                    Section 67, Indian Succession Act, 1925
                  </div>
                  <div className="text-[#49585F]">
                    Makes any gift void if given to a witness or to the husband or wife of a
                    witness.
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#172228]/10">
                  <div className="font-bold text-[#172228] mb-0.5">
                    Section 18(e), Filing Act, 1908
                  </div>
                  <div className="text-[#49585F]">
                    States that registering a Will is voluntary. A Will written on plain paper is
                    100% legal in India.
                  </div>
                </div>
              </div>

              {/* Related Internal Links Hub */}
              <div className="pt-4 border-t border-[#172228]/10">
                <div className="text-xs font-bold uppercase tracking-wider text-[#49585F] mb-3">
                  Related Estate Guides &amp; Services
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/templates"
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#172228]/10 hover:border-[#C65378] text-[#172228] font-medium transition-colors"
                  >
                    All Legal Templates
                  </Link>
                  <Link
                    href="/templates/will-format-india"
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#172228]/10 hover:border-[#C65378] text-[#172228] font-medium transition-colors"
                  >
                    Standard Will Format India
                  </Link>
                  <Link
                    href="/services/mirror-wills-for-couples"
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#172228]/10 hover:border-[#C65378] text-[#172228] font-medium transition-colors"
                  >
                    Mirror Wills Service
                  </Link>
                  <Link
                    href="/services/will-registration"
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#172228]/10 hover:border-[#C65378] text-[#172228] font-medium transition-colors"
                  >
                    SRO Will Filing
                  </Link>
                  <Link
                    href="/tools/probate-court-fee-timeline-calculator"
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#172228]/10 hover:border-[#C65378] text-[#172228] font-medium transition-colors"
                  >
                    Probate Court Fee Tool
                  </Link>
                </div>
              </div>
            </section>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                A clear Will keeps your spouse and kids safe. It stops long court fights. You pick who gets your house, land, shop, gold, and bank cash. Do not wait to put your plan in writing.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                You can write a Will on plain white paper. No stamp paper is needed in India. Sign it in front of two adult witnesses. Each witness signs in your view to make it valid.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team checks your asset list and tax bills. We write your Will in clear words with no mix-ups. Then we guide you step by step so your heirs get their share fast.
              </p>
            </div>
          </div>

      </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Matching Exact User Layout)
              ===================================================================== */}
          <aside className="space-y-6 sticky top-6">
            {/* CARD 1: ADVOCATE REVIEWER PROFILE CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Lawyer Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bar Council enrolled lawyer with 18+ years of expertise in Will court fights,
                probate matters, and estate structuring at AMA Legal Solutions.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Checked Legal Review</span>
                </span>
                <span className="text-slate-500">AMA Legal</span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: BRAND NAVY CARD - WILL DRAFTING WIZARD */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>CONFIDENTIAL &amp; SECURE</span>
                </div>
                <h3 className="text-lg font-bold leading-snug">
                  Want Your Custom Will Drafted in 15 Minutes?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Avoid drafting errors. Use our guided step-by-step wizard to produce an lawyer-checked,
                  court-ready Will for your family.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Free Draft</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="pt-1 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: ADVOCATE CONSULTATION CARD (NO MOBILE NUMBERS) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>SPOUSAL WILL &amp; SRO DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Custom Paired Mirror Wills for You &amp; Your Spouse?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our estate lawyers structure joint asset clauses, 30-day survivorship terms,
                  and SRO filing across India.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5 text-rose-300" />
                  <span>Schedule Lawyer Talk</span>
                </Link>
              </div>

              {/* CARD 4: TRUST / BENEFITS CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Choose Paired Mirror Wills?
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>100% Plain Paper Legal:</strong> Zero stamp duty required anywhere in India.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Independent Revocability:</strong> Section 62 freedom to alter terms without court friction.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>30-Day Anti-Commorientes:</strong> Protects family from double probate and duplicate court fees.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Smooth SRO &amp; Bank Name Change:</strong> Standard acceptance by Sub-Registrars and societies.
                    </span>
                  </li>
                </ul>
              </div>

              {/* CARD 5: RELATED RESOURCES */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Related Free Resources
                </h4>
                <div className="space-y-2">
                  <Link
                    href="/templates/will-format-india"
                    className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                  >
                    <div className="font-bold text-xs text-slate-900">Standard Will Format (India)</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Plain paper legal template in English &rarr;
                    </div>
                  </Link>
                  <Link
                    href="/templates/codicil-format-india"
                    className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                  >
                    <div className="font-bold text-xs text-slate-900">Codicil Format (Amend a Will)</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      How to alter an existing Will lawfully &rarr;
                    </div>
                  </Link>
                  <Link
                    href="/services/mirror-wills-for-couples"
                    className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                  >
                    <div className="font-bold text-xs text-slate-900">Mirror Wills for Couples</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Lawyer-assisted couple estate package &rarr;
                    </div>
                  </Link>
                  <Link
                    href="/tools/probate-court-fee-timeline-calculator"
                    className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                  >
                    <div className="font-bold text-xs text-slate-900">Probate Court Fee Tool</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Calculate High Court court fees &rarr;
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FLOATING MOBILE ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 shadow-lg flex items-center justify-between gap-3">
        <a
          href="#free-mirror-will-formats"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View Formats</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft a Will</span>
        </button>
      </div>
    </div>
  );
}
