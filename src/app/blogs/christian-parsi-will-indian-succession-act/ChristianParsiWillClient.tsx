"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Clock,
  Sparkles,
  HelpCircle,
  AlertCircle,
  FileCheck,
  Landmark,
  ShieldAlert,
  Sliders,
  Lock,
  PhoneCall,
  Shield,
  Users,
  Compass,
  Anchor,
  Cross,
} from "lucide-react";

interface ComparisonRow {
  parameter: string;
  christianLaw: string;
  parsiLaw: string;
  hinduLaw: string;
  muslimLaw: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    parameter: "Governing Statute",
    christianLaw: "Indian Succession Act 1925 (Part V, ss. 31-49)",
    parsiLaw: "Indian Succession Act 1925 (Part V, ss. 50-56)",
    hinduLaw: "Hindu Succession Act 1956 (Amended 2005)",
    muslimLaw: "Muslim Personal Law (Shariat Application Act 1937)",
  },
  {
    parameter: "Spouse Intestate Share (With Children)",
    christianLaw: "1/3 share fixed (Section 33(a))",
    parsiLaw: "Equal share with each surviving child (Section 51(1))",
    hinduLaw: "1 equal share along with Class I heirs",
    muslimLaw: "Widow: 1/8 share; Widower: 1/4 share",
  },
  {
    parameter: "Gender Parity for Children",
    christianLaw: "100% equal shares between sons and daughters",
    parsiLaw: "100% equal shares (reformed by 1991 Amendment Act)",
    hinduLaw: "100% equal coparcenary rights (2005 Amendment)",
    muslimLaw: "Son receives twice the share of a daughter (2:1 ratio)",
  },
  {
    parameter: "Parents' Intestate Rights (With Children)",
    christianLaw: "Nil (children exclude parents completely under s. 33)",
    parsiLaw: "Father & mother each get 1/2 of child's share (male deceased)",
    hinduLaw: "Mother is Class I heir; Father is Class II heir",
    muslimLaw: "Both father & mother get 1/6 share each as Quranic heirs",
  },
  {
    parameter: "Testamentary Bequest Freedom",
    christianLaw: "100% unrestricted (can Will entire estate to anyone)",
    parsiLaw: "100% unrestricted (no statutory restrictions)",
    hinduLaw: "100% for self-acquired; coparcenary limited to undivided share",
    muslimLaw: "Strictly limited to 1/3 estate without legal heirs' consent",
  },
  {
    parameter: "Coparcenary or Birthright Claims",
    christianLaw: "Zero birthright concept; all property held absolutely",
    parsiLaw: "Zero birthright concept; all property held absolutely",
    hinduLaw: "Mitakshara coparcenary applies to ancestral property",
    muslimLaw: "Zero birthright concept; rights arise only upon death",
  },
  {
    parameter: "Privileged Wills for Armed Forces",
    christianLaw: "Allowed under Sections 65-66 (oral or informal)",
    parsiLaw: "Allowed under Sections 65-66 (oral or informal)",
    hinduLaw: "Allowed under Sections 65-66 ISA",
    muslimLaw: "Governed by oral Will rules under personal law",
  },
];

const TOC_ITEMS = [
  { id: "executive-brief", label: "Executive Summary" },
  { id: "legal-scope", label: "1. Legal Framework & Scope" },
  { id: "christian-rules", label: "2. Christian Succession Rules" },
  { id: "parsi-rules", label: "3. Parsi Succession & 1991 Reform" },
  { id: "succession-matrix", label: "4. Personal Law Comparison Matrix" },
  { id: "testamentary-freedom", label: "5. Testamentary Freedom vs Intestacy" },
  { id: "statutory-blueprint", label: "6. Visual Blueprint & Anatomy" },
  { id: "step-by-step-sop", label: "7. 6-Stage Will Execution SOP" },
  { id: "privileged-wills", label: "8. Privileged Wills for Armed Forces" },
  { id: "share-calculator", label: "9. Interactive Succession Calculator" },
  { id: "common-mistakes", label: "10. Four Invalidation Risks" },
  { id: "specialized-scenarios", label: "11. Specialized Scenarios & Inter-Faith" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-citations", label: "13. Official Legal Authorities" },
];

const FAQS = [
  {
    q: "Which law governs Wills made by Christians and Parsis in India?",
    a: "Testamentary succession (making a Will) for both Christians and Parsis is governed by Part VI of the Indian Succession Act, 1925 (Sections 59 to 191). If a person dies intestate without leaving a Will, Christian succession is governed by Part V Chapter II (Sections 31 to 49), while Parsi intestate succession is governed by Part V Chapter III (Sections 50 to 56).",
  },
  {
    q: "Can a Christian or Parsi individual bequeath 100% of their property by Will?",
    a: "Yes. Unlike Muslim personal law, which restricts bequests to one-third of the estate without heir consent, and Hindu coparcenary law, which grants birthrights in ancestral property, Christians and Parsis have complete testamentary freedom. Under Section 59 of the Indian Succession Act, you can bequeath 100% of your self-acquired and inherited property to any chosen beneficiary, trust, or charity.",
  },
  {
    q: "What is a Christian widow or widower's legal share if there is no Will?",
    a: "Under Section 33 of the Indian Succession Act, 1925, if an intestate leaves a surviving spouse and lineal descendants (children or grandchildren), the spouse receives one-third (1/3) of the estate and children divide the remaining two-thirds (2/3). If there are no children but kindred survive (parents or siblings), the spouse receives one-half (1/2). If neither descendants nor kindred exist, the surviving spouse takes the entire 100% estate.",
  },
  {
    q: "Do Parsi sons and daughters have equal inheritance rights?",
    a: "Yes. Prior to the Indian Succession (Amendment) Act, 1991, sons received twice the share of daughters in a Parsi father's estate. The 1991 amendment eliminated this disparity. Under Section 51(1) of the Indian Succession Act, daughters and sons now receive identical, equal shares in the intestate estate of either parent.",
  },
  {
    q: "Do parents receive a share in a Parsi person's intestate property?",
    a: "Yes, when a male Parsi dies intestate. Under Section 51(2) of the Indian Succession Act, 1925, when a male Parsi dies leaving a widow and children, his father and mother each receive a share equal to half the share of each child. However, when a female Parsi dies leaving a widower and children, her estate is divided equally between widower and children without an automatic statutory share for her parents.",
  },
  {
    q: "Is probate of a Will compulsory for Christians and Parsis in India?",
    a: "Probate is not mandatory for Christians across India. The Supreme Court in Clarence Pais v. Union of India (2001) established that Section 213 does not require mandatory probate for Indian Christian Wills. For Parsis, probate was historically required only for Wills made within or concerning properties in the Ordinary Original Civil Jurisdiction of Bombay, Calcutta, or Madras High Courts. However, probate or registration speeds up bank transmissions and mutations everywhere.",
  },
  {
    q: "What is a Privileged Will under the Indian Succession Act, 1925?",
    a: "Under Sections 65 and 66 of the Indian Succession Act, a Privileged Will is an informal Will permitted exclusively to soldiers, airmen engaged in actual warfare or expeditions, and mariners at sea who are at least 18 years old. Such Wills can be executed orally before two witnesses, written entirely in the testator's hand without witnesses, or signed without attestation. Ordinary civilians must execute standard unprivileged Wills under Section 63 with two witnesses.",
  },
  {
    q: "Can an attesting witness inherit property under a Christian or Parsi Will?",
    a: "No. Under Section 67 of the Indian Succession Act, 1925, any bequest or legacy made to an attesting witness, or to the husband or wife of an attesting witness, is completely void. However, the witness's attestation remains valid. To protect your beneficiaries, always ensure that your two attesting witnesses are independent adults who receive nothing under the Will.",
  },
  {
    q: "Does the concept of Ancestral Property apply to Christians or Parsis?",
    a: "No. The Mitakshara coparcenary concept of ancestral property and birthrights applies exclusively to Hindus, Buddhists, Jains, and Sikhs governed by Hindu law. In Christian and Parsi succession, there is no coparcenary or right by birth. Any property inherited from parents or ancestors becomes the absolute personal property of the recipient, which can be transferred or willed away freely.",
  },
  {
    q: "How can I calculate legal heir shares for an intestate Christian or Parsi estate?",
    a: "You can use the WillDrafting Succession Calculator at /tools/succession-calculator. By selecting religion (Christian or Parsi), gender, marital status, and surviving family members, our algorithmic engine calculates exact percentage shares and rupee allocations according to Sections 33, 42, 51, and 54 of the Indian Succession Act, 1925.",
  },
];

export default function ChristianParsiWillClient() {
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

  const [activeId, setActiveId] = useState<string>("executive-brief");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive Quick Succession Share Simulator State
  const [calcReligion, setCalcReligion] = useState<"christian" | "parsi">("christian");
  const [calcDeceasedGender, setCalcDeceasedGender] = useState<"male" | "female">("male");
  const [hasSpouse, setHasSpouse] = useState<boolean>(true);
  const [childCount, setChildCount] = useState<number>(2);
  const [hasMother, setHasMother] = useState<boolean>(true);
  const [hasFather, setHasFather] = useState<boolean>(true);

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

    const elements = document.querySelectorAll("section[id], div[id].scroll-target");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Live Succession Shares Calculation
  const calculateShares = () => {
    if (calcReligion === "christian") {
      // Christian Succession Rules (ISA Part V, ss. 31-49)
      if (hasSpouse && childCount > 0) {
        const spouseShare = 1 / 3;
        const perChildShare = (2 / 3) / childCount;
        return {
          spouse: (spouseShare * 100).toFixed(1),
          perChild: (perChildShare * 100).toFixed(1),
          totalChildren: ((2 / 3) * 100).toFixed(1),
          mother: "0.0",
          father: "0.0",
          rule: "Section 33(a): Spouse takes 1/3; remaining 2/3 divided equally among children. Parents excluded.",
        };
      } else if (hasSpouse && childCount === 0) {
        const hasKindred = hasMother || hasFather;
        if (hasKindred) {
          const spouseShare = 50.0;
          let motherShare = 0;
          let fatherShare = 0;
          if (hasFather) {
            fatherShare = 50.0;
          } else if (hasMother) {
            motherShare = 50.0;
          }
          return {
            spouse: spouseShare.toFixed(1),
            perChild: "0.0",
            totalChildren: "0.0",
            mother: motherShare.toFixed(1),
            father: fatherShare.toFixed(1),
            rule: "Section 33(b) & Section 42: Spouse takes 1/2. Remaining 1/2 goes to Father; if Father deceased, Mother and siblings share.",
          };
        } else {
          return {
            spouse: "100.0",
            perChild: "0.0",
            totalChildren: "0.0",
            mother: "0.0",
            father: "0.0",
            rule: "Section 33(c): With neither children nor kindred surviving, spouse takes 100% of the estate.",
          };
        }
      } else if (!hasSpouse && childCount > 0) {
        return {
          spouse: "0.0",
          perChild: (100 / childCount).toFixed(1),
          totalChildren: "100.0",
          mother: "0.0",
          father: "0.0",
          rule: "Section 36: Estate divided equally among surviving children. Parents excluded.",
        };
      } else {
        const fatherShare = hasFather ? 100.0 : 0.0;
        const motherShare = !hasFather && hasMother ? 100.0 : 0.0;
        return {
          spouse: "0.0",
          perChild: "0.0",
          totalChildren: "0.0",
          mother: motherShare.toFixed(1),
          father: fatherShare.toFixed(1),
          rule: "Section 42-43: Father takes 100%; if father deceased, mother and siblings share equally.",
        };
      }
    } else {
      // Parsi Succession Rules (ISA Part V, ss. 50-56)
      if (calcDeceasedGender === "male") {
        if (hasSpouse && childCount > 0) {
          let parentUnits = 0;
          if (hasFather) parentUnits += 0.5;
          if (hasMother) parentUnits += 0.5;
          const totalUnits = 1 + childCount + parentUnits;
          const unitPercent = 100 / totalUnits;
          return {
            spouse: unitPercent.toFixed(1),
            perChild: unitPercent.toFixed(1),
            totalChildren: (unitPercent * childCount).toFixed(1),
            mother: hasMother ? (unitPercent * 0.5).toFixed(1) : "0.0",
            father: hasFather ? (unitPercent * 0.5).toFixed(1) : "0.0",
            rule: "Section 51(1)(b) & (2): Widow and each child take equal shares. Father and Mother each take half of a child's share.",
          };
        } else if (hasSpouse && childCount === 0) {
          return {
            spouse: "50.0",
            perChild: "0.0",
            totalChildren: "0.0",
            mother: hasMother ? "25.0" : "0.0",
            father: hasFather ? "25.0" : "0.0",
            rule: "Section 54(a): Widow takes 1/2; remaining 1/2 divided among surviving parents or relatives in Schedule II.",
          };
        } else if (!hasSpouse && childCount > 0) {
          return {
            spouse: "0.0",
            perChild: (100 / childCount).toFixed(1),
            totalChildren: "100.0",
            mother: "0.0",
            father: "0.0",
            rule: "Section 51(1)(a): Estate divided equally among all surviving children.",
          };
        } else {
          return {
            spouse: "0.0",
            perChild: "0.0",
            totalChildren: "0.0",
            mother: hasMother ? "50.0" : "0.0",
            father: hasFather ? "50.0" : "0.0",
            rule: "Section 55: If no lineal descendants or spouse survive, estate divides equally among surviving parents.",
          };
        }
      } else {
        // Female Parsi
        if (hasSpouse && childCount > 0) {
          const totalUnits = 1 + childCount;
          const unitPercent = 100 / totalUnits;
          return {
            spouse: unitPercent.toFixed(1),
            perChild: unitPercent.toFixed(1),
            totalChildren: (unitPercent * childCount).toFixed(1),
            mother: "0.0",
            father: "0.0",
            rule: "Section 51(1): Widower and each child divide estate equally. Parents of deceased female do not take automatic statutory share.",
          };
        } else if (hasSpouse && childCount === 0) {
          return {
            spouse: "50.0",
            perChild: "0.0",
            totalChildren: "0.0",
            mother: hasMother ? "25.0" : "0.0",
            father: hasFather ? "25.0" : "0.0",
            rule: "Section 54: Widower takes 1/2; remaining 1/2 divides among parents or Schedule II relatives.",
          };
        } else if (!hasSpouse && childCount > 0) {
          return {
            spouse: "0.0",
            perChild: (100 / childCount).toFixed(1),
            totalChildren: "100.0",
            mother: "0.0",
            father: "0.0",
            rule: "Section 51(1)(a): All children share equally in deceased mother's estate.",
          };
        } else {
          return {
            spouse: "0.0",
            perChild: "0.0",
            totalChildren: "0.0",
            mother: hasMother ? "50.0" : "0.0",
            father: hasFather ? "50.0" : "0.0",
            rule: "Section 55: Deceased female estate divides equally between surviving parents.",
          };
        }
      }
    }
  };

  const calculatedResult = calculateShares();

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy #172228)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial glow accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <Scale className="w-4 h-4 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT 1925 &bull; PERSONAL LAW SERIES</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Christian &amp; Parsi Will Rules: Indian Succession Act
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Understand testamentary freedom, intestate shares under Part V (Sections 31 to 56), and privileged Wills for defense personnel. Safeguard your family inheritance with advocate-verified estate planning.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer text-sm sm:text-base"
            >
              <span>Draft Your Will Online</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#christian-rules"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all text-sm sm:text-base"
            >
              <span>Explore Succession Rules</span>
            </a>
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
                Succession Expertise
              </span>
            </div>

            {/* Stat 2: Wills Handled */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                10,000+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Wills Drafted
              </span>
            </div>

            {/* Stat 3: Value Protected */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹2,500Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Assets Secured
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
          LAYER 3: THREE-COLUMN GRID (Main Content Area)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px] xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 xl:gap-8 items-start">
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

            {/* Statutory Compliance Badge */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed by Indian Succession Act, 1925 (Part V ss. 31-56, Part VI ss. 59-191). Affirmed by Supreme Court in Clarence Pais (2001).
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE SUMMARY BOX */}
            <div
              id="executive-brief"
              className="scroll-target scroll-mt-28 rounded-2xl bg-white border border-slate-200/90 border-l-[6px] border-l-[#C65378] p-6 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  EXECUTIVE BRIEF: 4 KEY SUCCESSION PRINCIPLES
                </span>
              </div>
              <div className="text-lg font-bold text-slate-900 mb-3">
                Christian and Parsi Succession Framework in India
              </div>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Testamentary Freedom:</strong> Unlike Muslim personal law (1/3 bequest cap) or Hindu coparcenary law (birthright claims), Christians and Parsis can bequeath their entire estate to anyone via a valid Will.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Christian Intestate Rules (ss. 31-49):</strong> If no Will exists, a surviving spouse receives 1/3 if children survive, 1/2 if only parents or siblings survive, and 100% if no kindred survive. Children share equally regardless of gender.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Parsi Intestate Rules (ss. 50-56):</strong> Reformed in 1991 to establish strict equality between sons and daughters. In a male Parsi intestate estate, parents receive a statutory share equal to half of each child&apos;s share.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Probate Clarity:</strong> The Supreme Court in <em>Clarence Pais v. Union of India</em> confirmed that probate is not mandatory for Indian Christians, eliminating long-standing administrative confusion.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: LEGAL SCOPE */}
            <section id="legal-scope" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTION 1: STATUTORY ARCHITECTURE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Scope: Christian &amp; Parsi Succession Framework
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                In India, inheritance and succession are partitioned along religious personal laws. While Hindus, Sikhs, Buddhists, and Jains are governed by the Hindu Succession Act 1956, and Muslims are governed by uncodified Shariat principles, Indian Christians and Parsis are governed directly by the <strong>Indian Succession Act, 1925 (Act No. 39 of 1925)</strong>.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                The Indian Succession Act (ISA) divides succession into two distinct operational branches:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Testamentary Succession (Part VI)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Governed by Sections 59 to 191. Applies uniformly to Christians and Parsis when a person executes a valid Last Will and Testament. Provides complete autonomy to distribute assets without statutory interference.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#5F7E75]" />
                    <span>Intestate Succession (Part V)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Applies automatically when a person dies without a Will. Chapter II (Sections 31 to 49) governs Christians, while Chapter III (Sections 50 to 56) provides specialized rules for Parsis.
                  </p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Understanding these distinct statutory provisions is crucial. If you execute a Will, you bypass rigid intestate statutory formulas. If you fail to execute a Will, state-mandated formulas dictate exact rupee and percentage splits among your legal heirs.
              </p>
            </section>

            {/* SECTION 2: CHRISTIAN SUCCESSION RULES */}
            <section id="christian-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>SECTION 2: CHRISTIAN INTESTACY</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Christian Succession: Legal Heirs &amp; Share Allocations
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                When an Indian Christian passes away without leaving a Will, property devolves under Sections 31 to 49 of the Indian Succession Act, 1925. The statute makes no distinction between ancestral and self-acquired property; all assets merge into one unified estate.
              </p>

              {/* Statutory Rules Accordion-style Grid */}
              <div className="space-y-3">
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <h4 className="font-bold text-sm text-slate-900 mb-1 flex items-center justify-between">
                    <span>A. Surviving Spouse with Lineal Descendants (Section 33(a))</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378]">
                      Widow 1/3 &bull; Children 2/3
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The surviving widow or widower receives exactly one-third (1/3) of the estate. The remaining two-thirds (2/3) is distributed equally among the surviving children under Section 36. If a child has predeceased leaving grandchildren, those grandchildren inherit their parent&apos;s share per stirpes (by representation). Parents receive zero share in this scenario.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <h4 className="font-bold text-sm text-slate-900 mb-1 flex items-center justify-between">
                    <span>B. Surviving Spouse with Kindred, No Children (Section 33(b))</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800">
                      Widow 1/2 &bull; Kindred 1/2
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If the deceased left no children or grandchildren, but has surviving kindred (father, mother, brothers, sisters, or nephews/nieces), the surviving spouse inherits exactly one-half (1/2). The other half passes to the kindred according to degree of consanguinity under Section 42.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <h4 className="font-bold text-sm text-slate-900 mb-1 flex items-center justify-between">
                    <span>C. Surviving Spouse with No Kindred (Section 33(c))</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                      Widow 100%
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Where the intestate leaves neither children nor any distant blood relatives, the surviving spouse inherits the entire 100% estate absolutely.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <h4 className="font-bold text-sm text-slate-900 mb-1 flex items-center justify-between">
                    <span>D. Rights of Husband vs Wife (Section 35)</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800">
                      Equal Spousal Rights
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Section 35 explicitly states that a widower has the exact same rights in respect of his deceased wife&apos;s property as a widow has in respect of her deceased husband&apos;s property.
                  </p>
                </div>
              </div>

              {/* Representative Calculation Table */}
              <div className="pt-2">
                <h4 className="font-bold text-sm text-slate-900 mb-2">
                  Representative Distribution Table: Christian Intestate Estate (₹1.20 Crore)
                </h4>
                <div className="rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm text-left">
                      <thead className="bg-[#172228] text-white">
                        <tr>
                          <th className="py-2.5 px-4 font-semibold">Legal Heir Category</th>
                          <th className="py-2.5 px-4 font-semibold">Statutory Authority</th>
                          <th className="py-2.5 px-4 font-semibold">Fractional Share</th>
                          <th className="py-2.5 px-4 font-semibold text-right">Rupee Allocation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        <tr>
                          <td className="py-2.5 px-4 font-medium text-slate-900">Surviving Spouse (Widow/Widower)</td>
                          <td className="py-2.5 px-4 text-slate-600 font-mono text-xs">Section 33(a)</td>
                          <td className="py-2.5 px-4 text-slate-700 font-semibold">1/3 (33.33%)</td>
                          <td className="py-2.5 px-4 text-right font-bold text-slate-900">₹40,00,000</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-medium text-slate-900">Son 1</td>
                          <td className="py-2.5 px-4 text-slate-600 font-mono text-xs">Section 36</td>
                          <td className="py-2.5 px-4 text-slate-700 font-semibold">1/3 of remainder (33.33%)</td>
                          <td className="py-2.5 px-4 text-right font-bold text-slate-900">₹40,00,000</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-medium text-slate-900">Daughter 1</td>
                          <td className="py-2.5 px-4 text-slate-600 font-mono text-xs">Section 36</td>
                          <td className="py-2.5 px-4 text-slate-700 font-semibold">1/3 of remainder (33.33%)</td>
                          <td className="py-2.5 px-4 text-right font-bold text-slate-900">₹40,00,000</td>
                        </tr>
                        <tr className="bg-slate-50">
                          <td className="py-2.5 px-4 font-medium text-slate-600">Surviving Parents / Siblings</td>
                          <td className="py-2.5 px-4 text-slate-500 font-mono text-xs">Section 33 &bull; Excluded</td>
                          <td className="py-2.5 px-4 text-slate-500 font-semibold">0%</td>
                          <td className="py-2.5 px-4 text-right font-semibold text-slate-500">₹0</td>
                        </tr>
                        <tr className="bg-rose-50/60 font-bold border-t-2 border-slate-200">
                          <td className="py-2.5 px-4 text-slate-900" colSpan={2}>
                            Total Consolidated Net Estate
                          </td>
                          <td className="py-2.5 px-4 text-[#C65378]">100%</td>
                          <td className="py-2.5 px-4 text-right text-[#C65378]">₹1,20,00,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Landmark Supreme Court Mary Roy Note */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                  <span>Landmark Supreme Court Precedent: Mary Roy v. State of Kerala (1986)</span>
                </div>
                <p className="leading-relaxed">
                  Historically, Syrian Christian women in Travancore and Cochin were restricted to a dowry fraction (streedhanam) of ₹5,000 or one-third of the son&apos;s share under customary state acts. In the historic <em>Mary Roy v. State of Kerala (1986 AIR 1011)</em> ruling, the Supreme Court struck down the Travancore Christian Succession Act 1916 and Cochin Christian Succession Act 1921. The Court held that Chapter II of Part V of the Indian Succession Act 1925 applies universally, granting female Christian heirs equal rights with sons.
                </p>
              </div>
            </section>

            {/* SECTION 3: PARSI SUCCESSION & 1991 REFORMS */}
            <section id="parsi-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTION 3: PARSI INTESTACY</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Parsi Succession Rules: 1991 Reforms &amp; Heir Shares
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Parsi intestate succession is regulated by Sections 50 to 56 of the Indian Succession Act, 1925. Parsi succession contains unique statutory features, especially concerning parents&apos; inheritance rights and the historic gender equality reforms of 1991.
              </p>

              {/* The 1991 Amendment Highlight */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-1.5">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>The 1991 Legislative Milestone (Act 51 of 1991)</span>
                </div>
                <p className="leading-relaxed text-amber-900">
                  Prior to the <strong>Indian Succession (Amendment) Act, 1991</strong>, Section 51 mandated that a son received <strong>twice the share of a daughter</strong> in a Parsi father&apos;s intestate property. The 1991 reform repealed this gender discrimination completely. Today, sons and daughters inherit identical, equal shares in both maternal and paternal estates.
                </p>
              </div>

              {/* Current Parsi Distribution Formulas */}
              <div className="space-y-3 pt-1">
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <h4 className="font-bold text-sm text-slate-900 mb-1 flex items-center justify-between">
                    <span>A. Male Parsi Dies Leaving Widow, Children, and Parents (Section 51(1)(b) &amp; (2))</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                      Equal Spouse &amp; Kids &bull; Half to Parents
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 51(1)(b), the widow and each surviving child receive an equal share. Furthermore, under Section 51(2), the <strong>father and mother of the deceased male Parsi each receive a share equal to half the share of each child</strong>. This unique provision ensures elderly parents of a deceased son retain financial protection.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <h4 className="font-bold text-sm text-slate-900 mb-1 flex items-center justify-between">
                    <span>B. Female Parsi Dies Leaving Widower and Children (Section 51(1))</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                      Equal Widower &amp; Children
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    When a female Parsi dies intestate leaving a widower and children, the property is divided equally among the widower and each child. Notably, the parents of a deceased female Parsi do not receive an automatic half-share under Section 51(2).
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <h4 className="font-bold text-sm text-slate-900 mb-1 flex items-center justify-between">
                    <span>C. Parsi Dies with No Lineal Descendants (Sections 54 to 56)</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                      Spouse 1/2 &bull; Schedule II Heirs 1/2
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If an intestate Parsi leaves a surviving spouse but no children or grandchildren, the spouse receives one-half (1/2) of the estate. The other half passes to relatives listed in <strong>Schedule II, Part I</strong> (parents, siblings, paternal/maternal grandparents). If no relatives in Schedule II survive, the spouse takes the whole estate.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: COMPARISON MATRIX TABLE */}
            <section id="succession-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>SECTION 4: COMPARATIVE ANALYSIS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Intestacy Matrix: Christian vs Parsi vs Hindu Rules
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Understanding how Christian and Parsi succession compares to Hindu and Muslim inheritance laws illustrates why personal-law literacy is vital for multi-religious families and estate planning.
              </p>

              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm text-left min-w-[700px]">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="py-3 px-4 font-semibold">Succession Feature</th>
                        <th className="py-3 px-4 font-semibold text-rose-200">Christian Succession</th>
                        <th className="py-3 px-4 font-semibold text-amber-200">Parsi Succession</th>
                        <th className="py-3 px-4 font-semibold">Hindu Succession</th>
                        <th className="py-3 px-4 font-semibold">Muslim Succession</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {COMPARISON_DATA.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="py-3 px-4 font-bold text-slate-900">{row.parameter}</td>
                          <td className="py-3 px-4 text-slate-700">{row.christianLaw}</td>
                          <td className="py-3 px-4 text-slate-700">{row.parsiLaw}</td>
                          <td className="py-3 px-4 text-slate-600">{row.hinduLaw}</td>
                          <td className="py-3 px-4 text-slate-600">{row.muslimLaw}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 5: TESTAMENTARY FREEDOM VS INTESTACY */}
            <section id="testamentary-freedom" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Shield className="w-4 h-4" />
                <span>SECTION 5: TESTAMENTARY FREEDOM</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Testamentary Freedom: No Coparcenary Restrictions
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                One of the greatest legal advantages enjoyed by Indian Christians and Parsis under the Indian Succession Act, 1925, is <strong>complete, unrestricted testamentary freedom</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <h4 className="font-bold text-sm text-slate-900 mb-1 text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>No Hindu Coparcenary Restrictions</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Hindu law, children acquire an automatic birthright (coparcenary interest) in ancestral properties from birth, limiting what a father or mother can Will away. For Christians and Parsis, the concept of joint family coparcenary does not exist. All property is held absolutely.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <h4 className="font-bold text-sm text-slate-900 mb-1 text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>No Islamic 1/3 Limit or Heir Restrictions</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Muslim law, a testator cannot bequeath more than one-third (1/3) of their net estate without the explicit consent of legal heirs, and cannot favor one heir over another. Under Section 59 of the ISA, a Christian or Parsi individual can bequeath 100% of their estate to anyone they choose.
                  </p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                However, complete freedom carries profound responsibility. If you do not exercise this freedom by drafting a Will, your estate defaults to the rigid intestate formulas described above, leading to involuntary co-ownership, disputes among siblings, and prolonged legal heir certificate delays.
              </p>
            </section>

            {/* SECTION 6: STATUTORY BLUEPRINT & VISUAL ANATOMY */}
            <section id="statutory-blueprint" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>SECTION 6: VISUAL ANATOMY</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Statutory Blueprint: Execution Under Succession Act
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                A valid Will under the Indian Succession Act, 1925, harmonizes statutory compliance across Part V and Part VI. The graphic below illustrates the essential statutory foundations for Christian and Parsi estate planning.
              </p>

              {/* Infographic Image Container */}
              <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-5 shadow-xs">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src="/images/christian-parsi-will-indian-succession-act.jpg"
                    alt="Indian Succession Act Part V Sections 31 to 56 Christian and Parsi Will Rules"
                    width={1200} height={675}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-[1.01]"
                  />
                </div>
                <div className="pt-3 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                  <span className="font-medium">
                    Figure 1: Statutory Framework of Part V (ss. 31-56) &amp; Part VI (ss. 59-191) of the Indian Succession Act, 1925.
                  </span>
                  <a
                    href="/images/christian-parsi-will-indian-succession-act.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C65378] font-semibold hover:underline"
                  >
                    <span>View High-Resolution</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>SECTION 7: PROCEDURAL GUIDE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. 6-Stage Protocol: Drafting an Enforceable Indian Will
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                To guarantee your Will withstands scrutiny under Section 63 of the Indian Succession Act, follow this advocate-approved 6-stage protocol:
              </p>

              <div className="space-y-3.5">
                {[
                  {
                    num: "1",
                    title: "Comprehensive Asset Audit & Schedules",
                    desc: "List all immovable properties (survey numbers, flat deeds), movable wealth (bank accounts, demat folios, mutual funds), and digital assets. Attach these in a detailed Annexure or Schedule of Properties.",
                  },
                  {
                    num: "2",
                    title: "Appointing a Capable Executor (Section 211)",
                    desc: "Name a trusted primary executor and at least one alternate backup executor. The executor acts as your legal representative upon death, responsible for collecting assets and settling debts.",
                  },
                  {
                    num: "3",
                    title: "Clear Bequests & Residuary Clause (Section 102)",
                    desc: "Specify exact bequests for identified beneficiaries. Always conclude with a comprehensive Residuary Clause covering all future, omitted, or undisposed assets.",
                  },
                  {
                    num: "4",
                    title: "Execution & Signatures by Testator (Section 63(a)-(b))",
                    desc: "Sign or place your thumb impression at the foot of each page and date the document. Declare sound disposing state of mind and freedom from coercion or undue influence.",
                  },
                  {
                    num: "5",
                    title: "Independent Attestation by Two Witnesses (Section 63(c))",
                    desc: "Two adult witnesses must watch you sign and then sign in your presence. CRITICAL: Under Section 67, neither witness nor their spouse may be a beneficiary under the Will.",
                  },
                  {
                    num: "6",
                    title: "Optional Sub-Registrar Registration & Safe Custody",
                    desc: "While registration under Section 18(e) of the Registration Act 1908 is optional, registering your Will at the Sub-Registrar Office creates an incontestable public record.",
                  },
                ].map((step) => (
                  <div key={step.num} className="bg-white rounded-xl border border-slate-200 p-4 flex gap-3.5 items-start">
                    <div className="w-7 h-7 rounded-full bg-rose-50 border border-rose-200 text-[#C65378] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 mb-1">{step.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 8: PRIVILEGED WILLS FOR ARMED FORCES */}
            <section id="privileged-wills" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Anchor className="w-4 h-4" />
                <span>SECTION 8: ARMED FORCES EXEMPTIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Privileged Wills: Armed Forces &amp; Mariners Framework
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Recognizing the hazardous conditions of active warfare and seafaring, the Indian Succession Act provides a specialized legal exception known as a <strong>Privileged Will</strong> under Sections 65 and 66.
              </p>

              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <ShieldAlert className="w-4 h-4 text-[#C65378]" />
                  <span>Who Qualifies for a Privileged Will? (Section 65)</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                  <li>Any soldier or airman being in an actual expedition or engaged in actual warfare.</li>
                  <li>Any mariner or sailor being at sea.</li>
                  <li>The testator must have completed 18 years of age.</li>
                </ul>

                <div className="pt-2 border-t border-slate-100">
                  <div className="font-bold text-slate-900 text-sm mb-1.5">
                    Relaxed Execution Modes Under Section 66:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-900 block mb-0.5">Handwritten Without Witnesses</span>
                      A Privileged Will written entirely by the soldier&apos;s own hand does not require any signature or attestation.
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-900 block mb-0.5">Oral / Spoken Will</span>
                      A soldier in combat can declare their testamentary intentions orally in the physical hearing of two witnesses.
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-950 font-medium">
                  <strong>Civilian Note:</strong> Civilians, including corporate executives, merchant seafarers in domestic ports, and non-combatants, CANNOT use privileged wills. They must strictly comply with Section 63 (written Will with two witnesses).
                </div>
              </div>
            </section>

            {/* SECTION 9: INTERACTIVE SUCCESSION CALCULATOR */}
            <section id="share-calculator" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sliders className="w-4 h-4" />
                <span>SECTION 9: INTERACTIVE AUDIT TOOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Share Calculator: Instant Estate Division Audit
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Test your family scenario below. Toggle between Christian and Parsi rules to see how the Indian Succession Act divides an intestate estate without a Will.
              </p>

              {/* Calculator Simulator Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
                {/* Control Row 1: Religion & Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Personal Law Regime
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCalcReligion("christian")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                          calcReligion === "christian"
                            ? "bg-[#C65378] text-white border-[#C65378] shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Christian (ss. 31-49)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcReligion("parsi")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                          calcReligion === "parsi"
                            ? "bg-[#C65378] text-white border-[#C65378] shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Parsi (ss. 50-56)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Gender of Deceased
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCalcDeceasedGender("male")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                          calcDeceasedGender === "male"
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Male Intestate
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcDeceasedGender("female")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                          calcDeceasedGender === "female"
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Female Intestate
                      </button>
                    </div>
                  </div>
                </div>

                {/* Control Row 2: Surviving Family Members */}
                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Surviving Spouse?
                    </label>
                    <button
                      type="button"
                      onClick={() => setHasSpouse(!hasSpouse)}
                      className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold border ${
                        hasSpouse
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold"
                          : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}
                    >
                      {hasSpouse ? "Yes (Surviving)" : "No (Predeceased)"}
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Number of Children
                    </label>
                    <select
                      value={childCount}
                      onChange={(e) => setChildCount(Number(e.target.value))}
                      className="w-full py-1.5 px-2.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white"
                    >
                      <option value={0}>0 Children</option>
                      <option value={1}>1 Child</option>
                      <option value={2}>2 Children</option>
                      <option value={3}>3 Children</option>
                      <option value={4}>4 Children</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Mother Surviving?
                    </label>
                    <button
                      type="button"
                      onClick={() => setHasMother(!hasMother)}
                      className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold border ${
                        hasMother
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold"
                          : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}
                    >
                      {hasMother ? "Yes" : "No"}
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Father Surviving?
                    </label>
                    <button
                      type="button"
                      onClick={() => setHasFather(!hasFather)}
                      className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold border ${
                        hasFather
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold"
                          : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}
                    >
                      {hasFather ? "Yes" : "No"}
                    </button>
                  </div>
                </div>

                {/* Live Simulation Results */}
                <div className="pt-3 border-t border-slate-100 bg-slate-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Statutory Share Allocation Breakdown:
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Simulated on ₹1,00,00,000 Estate
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Spouse</div>
                      <div className="text-base font-extrabold text-[#C65378]">{calculatedResult.spouse}%</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Per Child</div>
                      <div className="text-base font-extrabold text-slate-900">{calculatedResult.perChild}%</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Mother</div>
                      <div className="text-base font-extrabold text-slate-700">{calculatedResult.mother}%</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Father</div>
                      <div className="text-base font-extrabold text-slate-700">{calculatedResult.father}%</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 bg-white rounded-lg p-2.5 border border-slate-200 leading-relaxed">
                    <strong>Applicable Law:</strong> {calculatedResult.rule}
                  </div>

                  {/* Calculator Bridge Link */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-slate-600">
                      Need complex multi-generation share calculations?
                    </span>
                    <Link
                      href="/tools/succession-calculator"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#C65378] text-white text-xs font-bold transition-all"
                    >
                      <span>Open Full Succession Calculator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: COMMON MISTAKES TO AVOID */}
            <section id="common-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>SECTION 10: INVALIDATION DEFENSE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Four Common Traps: Testamentary Invalidation Risks
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Even sophisticated testators frequently make avoidable legal errors that result in court challenges, forfeiture of bequests, or prolonged litigation:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>1. Beneficiary Witness Invalidation (s. 67)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 67 of the ISA, if a beneficiary or their spouse signs as an attesting witness, the entire bequest made to them becomes completely void. The Will remains valid, but your intended heir gets ₹0. Always use independent third-party witnesses.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>2. Omitting Alternate Executors</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Naming only one elderly executor poses massive risks. If the executor predeceases you or becomes incapacitated, your heirs must undergo expensive Letters of Administration proceedings in District Court under Section 234.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>3. Forgetting Digital &amp; Demat Assets</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Many Wills focus exclusively on real estate while ignoring demat holdings, mutual fund SIPs, crypto wallets, and overseas accounts. Always include a comprehensive schedule and a catch-all residuary clause.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>4. Misunderstanding Probate Mandates</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    While the Supreme Court in Clarence Pais (2001) confirmed probate is not mandatory for Christians, banks and housing societies in metropolitan areas often insist on registered documents or advocate probate clearances for large transfers.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: SPECIALIZED SCENARIOS & INTER-FAITH */}
            <section id="specialized-scenarios" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Compass className="w-4 h-4" />
                <span>SECTION 11: COMPLEX SCENARIOS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Specialized Scenarios: Interfaith &amp; Global Estates
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Cross-border investments and inter-faith marriages introduce unique jurisdictional overlaps under Indian succession jurisprudence:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <h4 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>Special Marriage Act (Section 21 vs 21A)</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When individuals of different religions marry under the Special Marriage Act 1954, Section 21 mandates that succession to their property is governed by the Indian Succession Act, 1925 (not their customary personal laws). Drafting a Will prevents unexpected intestate consequences.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <h4 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-[#5F7E75]" />
                    <span>NRI Christians &amp; Parsis with Indian Assets</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Indian private international law (lex situs), succession to immovable property in India is strictly governed by Indian law, regardless of the testator&apos;s overseas citizenship. A separate, jurisdiction-specific Indian Will is strongly recommended.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <h4 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Childless Couples &amp; Kindred Protection</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If a married Christian or Parsi couple has no children, intestacy forces 50% of the estate to distant kindred or in-laws. Mirror Wills ensure 100% of the estate transfers to the surviving spouse before passing to chosen successors.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <h4 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-1.5">
                    <Cross className="w-4 h-4 text-[#5F7E75]" />
                    <span>Charitable &amp; Church Bequests (Section 118)</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Historically, Section 118 restricted bequests to religious or charitable causes unless executed 12 months prior to death. In <em>John Vallamattom v. Union of India (2003)</em>, the Supreme Court struck down Section 118 as unconstitutional, granting Christians full freedom to make charitable bequests without time bars.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQ ACCORDION (10 Questions) */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions: Christian &amp; Parsi Wills
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Clear answers to common questions regarding Christian and Parsi inheritance laws, testamentary rights, and execution requirements under the Indian Succession Act.
              </p>

              <div className="space-y-3 pt-2">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
                      >
                        <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 bg-[#FAF7F0]/30">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: CITATIONS & AUTHORITY LINKS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 pt-6 border-t border-slate-200 space-y-5">
              <div className="space-y-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Statutory References &amp; Official Succession Authorities
                </h2>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
                  <li>Indian Succession Act, 1925 (Act No. 39 of 1925), Part V (ss. 31-56) &amp; Part VI (ss. 59-191).</li>
                  <li>Indian Succession (Amendment) Act, 1991 (Act 51 of 1991) &bull; Equal shares for Parsi sons and daughters.</li>
                  <li>Supreme Court of India: <em>Clarence Pais &amp; Ors v. Union of India (2001) 4 SCC 325</em> &bull; Probate non-compulsory for Christians.</li>
                  <li>Supreme Court of India: <em>Mary Roy v. State of Kerala (1986 AIR 1011)</em> &bull; Equal inheritance for Syrian Christian women.</li>
                  <li>Supreme Court of India: <em>John Vallamattom v. Union of India (2003) 6 SCC 611</em> &bull; Striking down Section 118 restrictions on charitable gifts.</li>
                </ul>
              </div>

              {/* Verified Portals Badges */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Verified Government Portals:
                </span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors inline-flex items-center gap-1 font-medium"
                  >
                    <span>India Code: Indian Succession Act 1925</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors inline-flex items-center gap-1 font-medium"
                  >
                    <span>Supreme Court of India Judgments</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://lawcommissionofindia.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors inline-flex items-center gap-1 font-medium"
                  >
                    <span>Law Commission of India Reports</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Related Internal Topic Links */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Related Internal Legal Guides &amp; Tools:
                </span>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/tools/succession-calculator"
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-[#C65378] transition-colors"
                  >
                    Succession Calculator &rarr;
                  </Link>
                  <Link
                    href="/blogs/property-transfer-after-death-without-will-india"
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-[#C65378] transition-colors"
                  >
                    Property Transfer Without Will Guide &rarr;
                  </Link>
                  <Link
                    href="/templates/will-format-india"
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-[#C65378] transition-colors"
                  >
                    Standard Will Format in India &rarr;
                  </Link>
                  <Link
                    href="/services/will-registration"
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-[#C65378] transition-colors"
                  >
                    Will Registration Service &rarr;
                  </Link>
                  <Link
                    href="/blogs/how-to-challenge-a-will-in-india"
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-[#C65378] transition-colors"
                  >
                    How to Challenge a Will &rarr;
                  </Link>
                  <Link
                    href="/blogs/notarized-will-vs-registered-will-india"
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-[#C65378] transition-colors"
                  >
                    Notarized vs Registered Will &rarr;
                  </Link>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR
              ===================================================================== */}
          <aside className="space-y-5 sticky top-6">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378] font-bold text-sm font-bold shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">
                    <a
                      href="https://www.linkedin.com/in/iamanujmalik/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#C65378] transition-colors"
                    >
                      Advocate Anuj Anand Malik
                    </a>
                  </div>
                  <div className="text-[11px] font-semibold text-[#C65378]">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bar Council enrolled advocate with 15+ years of expertise in testamentary litigation, probate matters, and estate structuring at WillDrafting.in.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5F7E75]" />
                  <span>Verified Legal Review</span>
                </span>
                <a
                  href="https://www.linkedin.com/in/iamanujmalik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#C65378] hover:underline"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* CARD 2: EMERGENCY CTA CARD */}
            <div className="hidden lg:block bg-[#172228] rounded-3xl p-6 text-white text-center shadow-lg shadow-slate-900/10 space-y-4">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold tracking-wider uppercase text-rose-200">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>CONFIDENTIAL &amp; LEGALLY ENFORCEABLE</span>
              </div>
              <h3 className="text-lg font-bold leading-snug">
                Protect Your Family with an Advocate-Drafted Will
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Do not leave your estate to complex personal law formulas. Create your custom, court-ready Will in 15 minutes.
              </p>
              <Link
                href="/start"
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] text-white font-bold text-sm hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-md cursor-pointer"
              >
                <span>Draft Your Will Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                <PhoneCall className="w-3.5 h-3.5 text-[#5F7E75]" />
                <span>Confidential legal assistance</span>
              </div>
            </div>

            {/* CARD 3: TRUST & BENEFITS CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Why Draft with WillDrafting?
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Plain Paper Legal:</strong> Zero stamp duty required across India under Indian Stamp Act Schedule I.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 63 Compliant:</strong> Built-in two-witness attestation and sound mind verification.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Personal Law Aligned:</strong> Customized clauses tailored for Christian and Parsi estates.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Dispute-Proofing:</strong> Eliminates statutory intestacy fractional disputes among legal heirs.
                  </span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED FREE RESOURCES */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Related Legal Resources
              </h4>
              <div className="space-y-2">
                <Link
                  href="/tools/succession-calculator"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Succession Calculator</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Compute legal heir shares &rarr;
                  </div>
                </Link>
                <Link
                  href="/templates/will-format-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Will Format in India</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Standard English Will template &rarr;
                  </div>
                </Link>
                <Link
                  href="/blogs/property-transfer-after-death-without-will-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Property Transfer Without Will</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Legal heir certificate &amp; mutation &rarr;
                  </div>
                </Link>
                <Link
                  href="/services/will-registration"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Will Registration Service</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Sub-Registrar appointment assistance &rarr;
                  </div>
                </Link>
              </div>
            </div>
            </div>

            {/* MOBILE ONLY: Related WillDrafting Guides */}
            <div className="pt-4 border-t border-slate-100 block lg:hidden">
              <span className="text-xs font-bold text-[#172228] block mb-2">Related WillDrafting Guides:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/templates/will-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Free Indian Will Format
                </Link>
                <Link
                  href="/services/will-registration"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will Registration Service
                </Link>
                <Link
                  href="/blogs/property-transfer-after-death-without-will-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Property Transfer After Death
                </Link>
                <Link
                  href="/tools/probate-checker"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Is Probate Required in India?
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
