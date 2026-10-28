"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Scale,
  Sparkles,
  Landmark,
  Check,
  X,
  Info,
  Copy,
  CheckCheck,
  TrendingUp,
  FileCheck,
  Layers,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Lock,
  PhoneCall,
  Calendar,
  FileSignature,
  Trash2,
  FileQuestion,
  Users,
  Compass,
  Building,
  Clock,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-grounds", label: "1. Section 70 Estate Act Grounds" },
  { id: "revocation-vs-new-will", label: "2. Revocation Deed vs Making New Will" },
  { id: "decision-diagnostic", label: "3. Free Route Assessment" },
  { id: "standalone-deed-template", label: "4. Standalone Revocation Deed Format" },
  { id: "express-clause-template", label: "5. Express Clause for a New Will" },
  { id: "sub-registrar-protocol", label: "6. SRO Cancellation Protocol" },
  { id: "step-by-step-sop", label: "7. Step-by-Step Revocation SOP" },
  { id: "practical-case-studies", label: "8. Practical Case Studies" },
  { id: "common-revocation-mistakes", label: "9. Common Pitfalls to Avoid" },
  { id: "sro-intimation-notice", label: "10. SRO Notice & Paper Checklist" },
  { id: "advocate-verification", label: "11. Senior Lawyer Legal Review" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-citations", label: "13. Legal Citations & Resources" },
];

const FAQS = [
  {
    q: "Can a filed Will be cancelled in India?",
    a: "Yes. Under Section 62 and Section 70 of the Indian Succession Act, 1925, any Will can be revoked or modified at any time by the Will maker during their lifetime, as long as they are of sound mind. Filing under the Filing Act, 1908 does not make a Will permanent or irrevocable.",
  },
  {
    q: "What is the best way to revoke an old filed Will in India?",
    a: "The most practical and secure method is to draft and register a brand new Will containing an express revocation clause. A new Will automatically invalidates all previous Wills and Will instruments while establishing a fresh asset split, avoiding the risk of no-Will estate.",
  },
  {
    q: "Can I cancel a filed Will simply by tearing or burning it?",
    a: "While Section 70 recognises destruction with intent (animus revocandi) as valid revocation, doing this for a filed Will is risky. A certified copy remains on file in Book 3 at the SRO office. Disappointed heirs could attempt to enforce this copy after your death. A formal written instrument or new filed Will is far safer.",
  },
  {
    q: "Is filing of a Deed of Revocation needed at the SRO office?",
    a: "Filing is a choice under Section 18 of the Filing Act, 1908. However, if your original Will was filed, registering your revocation deed or your new replacement Will at the same SRO office is crucial to update SRO Book 3 index records.",
  },
  {
    q: "How many witnesses must attest a Deed of Revocation of Will?",
    a: "Under Section 70 read with Section 63 of the Indian Succession Act, 1925, a written revocation deed must be signed by the Will maker in the presence of at least two independent signing witnesses who see the Will maker sign, just like an original Will.",
  },
  {
    q: "Can an NRI cancel an Indian registered Will while residing abroad?",
    a: "Yes. An NRI can execute a new Indian Will or a standalone Deed of Revocation abroad. The paper should be attested by two witnesses, notarized, and attested by the Indian Embassy/Consulate or apostilled under the Hague Apostille Convention.",
  },
  {
    q: "What happens if I revoke my filed Will without making a new one?",
    a: "If you cancel your Will without a replacement, you will die no-Will. All your assets will be divided according to the personal estate laws applicable to your religion (such as the Hindu Succession Act, 1956 or Indian Succession Act, 1925) equally among Class I legal heirs.",
  },
  {
    q: "Can heirs fight my revocation of a Will during my lifetime?",
    a: "No. Heirs have no legal claim or asset rights while the Will maker is alive. A Will takes effect only upon the death of the Will maker. Therefore, heirs cannot fight your decision to cancel or alter your Will while you are alive.",
  },
];

export default function RevocationDeedClient() {
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

  const [activeId, setActiveId] = useState<string>("legal-grounds");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);

  // Diagnostic tool state
  const [selectedRoute, setSelectedRoute] = useState<"replace" | "intestate" | "pause">("replace");

  // Scroll spy for TOC
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const item = TOC_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(item.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyTemplateToClipboard = () => {
    const text = `DEED OF REVOCATION OF WILL
(Under Section 70 of the Indian Succession Act, 1925)

THIS DEED OF REVOCATION is made and executed on this ______ day of ____________, 20____, at ________________________,

BY:
[Full Legal Name of Testator], son/daughter/wife of [Father's / Husband's Name], aged about _____ years, Indian Inhabitant, residing at [Complete Residential Address], holding Aadhaar No. ________________________ and PAN ________________________ (hereinafter referred to as the "TESTATOR", which expression shall unless repugnant to the context include my heirs, executors, administrators, and assigns).

IN FAVOUR OF:
THE GENERAL PUBLIC AND ALL CONCERNED.

WHEREAS:
1. The Testator had previously made and executed a Last Will and Testament dated [Date of Earlier Will], registered / unregistered in the Office of the Sub-Registrar at [SRO Location], on [Date of Registration], recorded in Book No. III, Volume No. _______, at Pages _______ to _______, bearing Document Registration No. ________________________ of [Year] (hereinafter referred to as the "EARLIER WILL").

2. Under the terms of the said Earlier Will, the Testator had bequeathed certain movable and immovable properties, including [Brief summary of property, e.g. Residential Flat No. ___, Plot No. ___], in favour of [Name(s) of Previous Beneficiaries].

3. Circumstances have since changed, and the Testator no longer wishes the disposition of properties outlined in the Earlier Will to take effect upon his/her demise.

4. The Testator is in sound disposing state of mind, enjoying full physical and mental capacity, free from any coercion, fraud, undue influence, or misrepresentation from any person.

NOW THIS DEED OF REVOCATION WITNESSETH AS FOLLOWS:

1. ABSOLUTE REVOCATION AND ANNULMENT:
In exercise of the powers conferred under Section 62 and Section 70 of the Indian Succession Act, 1925, the Testator hereby unconditionally, irrevocably, and completely REVOKES, CANCELS, ANNULS, AND RECALLS the said Earlier Will dated [Date of Earlier Will] (registered under Document No. ________________________), along with every bequest, appointment of executor, legacy, and provision contained therein.

2. CANCELLATION OF LEGAL EFFECT:
The Testator declares that the said Earlier Will dated [Date of Earlier Will] shall hereafter be treated as entirely null, void, and of no legal consequence whatsoever, as if the same had never been drafted or executed.

3. NOTICE TO SUB-REGISTRAR:
The Testator requests the Sub-Registrar at [SRO Location] to make a necessary note, entry, and endorsement of this revocation in Book No. III and relevant indices, recording the cancellation of Document No. ________________________ of [Year].

4. FUTURE TESTAMENTARY FREEDOM:
The Testator retains full, unfettered right and testamentary liberty to execute a new Last Will and Testament at any subsequent date or, alternatively, to allow his/her estate to devolve by rules of intestate succession under applicable personal succession laws.

IN WITNESS WHEREOF, the Testator has set his/her hands and signatures to this Deed of Revocation on the day, month, and year first above written in the presence of the attesting witnesses below.

________________________________________
[Signature / Thumb Impression of Testator]
Name: [Full Legal Name of Testator]

ATTESTATION CLAUSE
Signed and declared by the above-named Testator, [Name of Testator], as his/her Deed of Revocation of Will, in the joint presence of us, who in his/her presence, at his/her request, and in the presence of each other, have hereunto subscribed our names as attesting witnesses:

WITNESS 1:
Signature: ______________________________
Name: [Full Legal Name of Witness 1]
Father's Name: __________________________
Address: _______________________________
Aadhaar No.: ___________________________

WITNESS 2:
Signature: ______________________________
Name: [Full Legal Name of Witness 2]
Father's Name: __________________________
Address: _______________________________
Aadhaar No.: ___________________________`;
    navigator.clipboard.writeText(text);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 3000);
  };

  const copyClauseToClipboard = () => {
    const text = `GOLD-STANDARD EXPRESS REVOCATION CLAUSE FOR A NEW WILL:

"1. REVOCATION OF ALL PRIOR WILLS AND CODICILS:
I hereby absolutely revoke, cancel, annul, and set aside all my former Wills, Codicils, testamentary instruments, and dispositions of every kind made by me at any time heretofore, including specifically my registered / unregistered Will dated [Date of Earlier Will], registered on [Date] in the Office of the Sub-Registrar at [SRO Office Name] under Document No. [Registration Number], Book No. III, Volume No. [Volume], at Pages [Pages]. I declare this present instrument to be my absolute, sole, and last subsisting Will and Testament."`;
    navigator.clipboard.writeText(text);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyNoticeToClipboard = () => {
    const text = `FORMAL INTIMATION LETTER TO SUB-REGISTRAR FOR CANCELLATION OF REGISTERED WILL

Date: ______________
To,
The Sub-Registrar of Assurances,
Office of the Sub-Registrar,
[Sub-District / City / Location],
[State, PIN Code].

Subject: Formal Intimation of Revocation and Cancellation of Registered Will bearing Document No. ____________ of [Year], Registered in Book III.

Respected Sir/Madam,

I, [Full Legal Name of Testator], son/daughter/wife of [Father's / Husband's Name], residing at [Complete Residential Address], holding Aadhaar No. ________________________, do hereby respectfully state as follows:

1. I had previously registered a Will in your esteemed office on [Date of Registration], which was duly recorded in Book No. III, Volume No. ________, at Pages ________ to ________, bearing Document Registration No. ________________________ of [Year].

2. Under the statutory provisions of Section 62 and Section 70 of the Indian Succession Act, 1925, I possess the absolute legal right to revoke, cancel, or modify my Will at any time during my lifetime.

3. I have on this date executed a formal Deed of Revocation of Will / a New Last Will and Testament dated [Date], whereby the earlier registered Will stands completely revoked, nullified, and voided.

4. I enclose herewith:
   (a) Self-attested copy of the Earlier Registered Will (Doc No. ________________________).
   (b) Original / Certified Copy of the Deed of Revocation / New Will dated [Date].
   (c) Self-attested copies of my Aadhaar Card and PAN Card.

5. I kindly request your office to make an appropriate note, memorandum, and index entry in Book No. III and Index II records, confirming the cancellation of the said Earlier Will.

Thanking you,

Yours faithfully,

________________________________________
[Signature of Testator]
Name: [Full Legal Name of Testator]
Contact Address: [Complete Address]`;
    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Matching Tool Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTIONS 70 &amp; 72 • REGISTRATION ACT, 1908</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            How to Cancel a Filed Will in India: Deed Format
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Learn how to cancel an old filed Will under Section 70 of the Indian Succession Act. Compare a standalone revocation deed against making a new Will. Download checked formats for SRO cancellation.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#standalone-deed-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileSignature className="w-4 h-4" />
              <span>Explore Revocation Deed Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Fight-Proof New Will</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 70</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ISA 1925 STATUTORY BASIS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Book 3 SRO</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SUB-REGISTRAR INDEX CANCELLATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">2 Witnesses</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION 63 ATTESTATION RULE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Animus Revocandi</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                INTENTION TO REVOKE PRECEDENT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Tool)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] xl:grid-cols-[270px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-24 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>TABLE OF CONTENTS</span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-1.5 px-2.5 rounded-lg transition-colors leading-snug ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Statutory Authority Badge */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Legal Office</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 62, 70 &amp; 72 of the Indian Succession Act, 1925, and Sections 17 &amp; 18 of the
                Filing Act, 1908. Interpreted by the Supreme Court of India in <em>Babu Singh v. Ram Sahai</em> and <em>Thakur Balwant Singh</em>.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: WILL CANCELLATION RULES IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Filed Wills Are Not Permanent:</strong> Under Section 62 of the Indian Succession Act, a Will is
                    ambulatory. You can revoke it at any point in your lifetime as long as you are mentally capable.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Two Legal Pathways Exist:</strong> Under Section 70, you can cancel an old Will either by signing a
                    standalone Deed of Revocation or by drafting a new Will with an express revocation clause.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Why a New Will is Safer:</strong> A standalone revocation deed leaves you without a Will. If you pass away
                    before drafting a new one, your family faces no-Will estate fights. A new filed Will replaces the old one seamlessly.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>SRO Record Clean-Up:</strong> Registering the revocation or new Will at the SRO office ensures
                    Book 3 index records are updated, preventing disinherited heirs from misusing certified copies.
                  </span>
                </li>
              </ul>
            </div>

            {/* FEATURED EDITORIAL IMAGE (Middle Scrollable Content) */}
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-2.5 sm:p-3 shadow-md">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/revocation-of-will-deed-format-india-og.jpg"
                  alt="Deed of Revocation of Will Format India Legal Cancellation Template and SRO Guidelines"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 850px"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>
                    Official Deed of Revocation of Will Anatomy: Section 70 Indian Succession Act, SRO Book 3 Indexation &amp; Animus Revocandi
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 1: STATUTORY GROUNDS */}
            <section id="statutory-grounds" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Grounds: Section 70 Indian Succession Act
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many Indian families mistakenly believe that once a Will is filed before a SRO, it becomes permanent.
                  That belief is legally incorrect. Under Section 62 of the Indian Succession Act, 1925, a Will is defined as an
                  ambulatory paper. This means it takes effect only upon the Will maker&apos;s death and carries zero legal finality during their lifetime.
                </p>
                <p>
                  Section 70 of the Indian Succession Act, 1925 specifies the exact legal methods by which an unprivileged Will may be revoked:
                </p>
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2 text-xs sm:text-sm">
                  <div className="font-bold text-slate-900">Section 70 Legal Methods of Revocation:</div>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                    <li>
                      <strong>By Marriage:</strong> Automatic legal revocation under personal estate law (subject to legal exceptions).
                    </li>
                    <li>
                      <strong>By Subsequent Will or Codicil:</strong> Signing a later Will that expressly or impliedly revokes the earlier testament.
                    </li>
                    <li>
                      <strong>By Written Declaration of Intention:</strong> Signing a formal written paper declaring an intention to revoke, signed with the same two-witness solemnity as a Will under Section 63.
                    </li>
                    <li>
                      <strong>By Physical Destruction:</strong> Burning, tearing, or destroying the instrument by the Will maker, or in their presence, with genuine intent to revoke (<em>animus revocandi</em>).
                    </li>
                  </ul>
                </div>
                <p>
                  In the landmark case of <em>Babu Singh v. Ram Sahai (2008) 14 SCC 754</em>, the Supreme Court of India ruled that
                  mere physical destruction is insufficient without clear proof of <em>animus revocandi</em>. Similarly, the Allahabad High Court
                  in <em>Thakur Balwant Singh v. Rao Maharaj Singh</em> confirmed that filing adds no legal irrevocability to a Will.
                  The Will maker remains fully empowered to revoke a filed Will at their sole discretion.
                </p>
              </div>
            </section>

            {/* SECTION 2: COMPARISON TABLE */}
            <section id="revocation-vs-new-will" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>COMPARATIVE ANALYSIS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Comparison: Standalone Revocation Deed vs Making New Will
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under Section 70, you have two primary legal instruments to nullify an earlier Will. Understanding the differences is
                crucial before deciding your next step.
              </p>

              {/* Structured HTML Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                  <thead className="bg-[#172228] text-white text-[11px] sm:text-xs uppercase tracking-wider font-extrabold">
                    <tr>
                      <th className="py-3 px-4">Evaluation Criteria</th>
                      <th className="py-3 px-4 bg-slate-800">Standalone Revocation Deed</th>
                      <th className="py-3 px-4 bg-[#C65378]">Signing a New Will (Recommended)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">Primary Legal Objective</td>
                      <td className="py-3 px-4">Cancels the previous Will without specifying new heirs.</td>
                      <td className="py-3 px-4 font-semibold text-emerald-800 bg-emerald-50/40">
                        Cancels the previous Will and establishes a complete new asset plan.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">Estate Devolution Outcome</td>
                      <td className="py-3 px-4 text-rose-700 font-semibold">
                        Leaves you no-Will (no Will). Asset divides equally among all legal heirs.
                      </td>
                      <td className="py-3 px-4 text-emerald-800 font-semibold bg-emerald-50/40">
                        Testate estate preserved. Your chosen heirs inherit exactly as specified.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">SRO Step</td>
                      <td className="py-3 px-4">Filed under Book 3 as a Deed of Cancellation.</td>
                      <td className="py-3 px-4 bg-emerald-50/40">
                        Filed under Book 3 as a fresh Will with explicit prior cancellation clause.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">Witness Signing Rule</td>
                      <td className="py-3 px-4">Needed 2 independent signing witnesses (Sec. 63 &amp; 70).</td>
                      <td className="py-3 px-4 bg-emerald-50/40">
                        Needed 2 independent signing witnesses (Sec. 63).
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">Risk of Family Court Fights</td>
                      <td className="py-3 px-4 text-amber-700">
                        High risk if you die before making a new Will; leads to split suits among heirs.
                      </td>
                      <td className="py-3 px-4 text-emerald-800 font-semibold bg-emerald-50/40">
                        Extremely low risk; clear paper trail supersedes earlier bequests.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">Best Used When</td>
                      <td className="py-3 px-4">
                        You want your estate to go strictly to all legal heirs by law, or need immediate cancellation.
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#C65378] bg-emerald-50/40">
                        You want to redistribute assets to your spouse, children, or specific heirs.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: INTERACTIVE DIAGNOSTIC ASSESSMENT */}
            <section id="decision-diagnostic" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Compass className="w-4 h-4" />
                <span>DECISION MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Free Route Assessment: Which Method Fits You?
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your primary goal below to see the recommended legal pathway under Indian succession law.
              </p>

              {/* Interactive Selector Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRoute("replace")}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedRoute === "replace"
                        ? "border-[#C65378] bg-rose-50/50 shadow-xs ring-1 ring-[#C65378]"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Sparkles className="w-5 h-5 text-[#C65378]" />
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Recommended
                      </span>
                    </div>
                    <div className="font-extrabold text-sm text-slate-900">Change Heirs</div>
                    <div className="text-xs text-slate-600 mt-1 leading-snug">
                      I want to change who gets my assets and remove old heirs.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRoute("intestate")}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedRoute === "intestate"
                        ? "border-[#C65378] bg-rose-50/50 shadow-xs ring-1 ring-[#C65378]"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-5 h-5 text-[#5F7E75]" />
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        Legal Heirs
                      </span>
                    </div>
                    <div className="font-extrabold text-sm text-slate-900">Equal Division by Law</div>
                    <div className="text-xs text-slate-600 mt-1 leading-snug">
                      I want my asset divided equally among all legal heirs under Hindu / Indian law.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRoute("pause")}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedRoute === "pause"
                        ? "border-[#C65378] bg-rose-50/50 shadow-xs ring-1 ring-[#C65378]"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Trash2 className="w-5 h-5 text-amber-600" />
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        Standalone
                      </span>
                    </div>
                    <div className="font-extrabold text-sm text-slate-900">Cancel Right away</div>
                    <div className="text-xs text-slate-600 mt-1 leading-snug">
                      I need to revoke my old Will right now, but I have not finalized my new Will.
                    </div>
                  </button>
                </div>

                {/* Tailored Advice Box */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 text-xs sm:text-sm text-slate-700">
                  {selectedRoute === "replace" && (
                    <>
                      <div className="font-extrabold text-slate-900 text-base flex items-center gap-2 text-emerald-800">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Recommended Route: Draft a New Filed Will</span>
                      </div>
                      <p>
                        Signing a new Will containing an explicit revocation clause is the gold standard under Indian law. It automatically supersedes your old filed Will. You avoid the dangerous gap of dying without a Will, and your family avoids probate fights.
                      </p>
                      <div className="pt-2 flex items-center gap-3">
                        <button
                          onClick={handleStartDraft}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Draft Your New Will Online</span>
                        </button>
                        <a
                          href="#express-clause-template"
                          className="text-xs font-bold text-slate-700 hover:text-[#C65378] underline"
                        >
                          View Revocation Clause
                        </a>
                      </div>
                    </>
                  )}

                  {selectedRoute === "intestate" && (
                    <>
                      <div className="font-extrabold text-slate-900 text-base flex items-center gap-2 text-blue-800">
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        <span>Recommended Route: Execute a Standalone Deed of Revocation</span>
                      </div>
                      <p>
                        A Standalone Deed of Revocation explicitly cancels the previous Will without establishing new bequests. Upon your demise, your assets will be distributed under Section 8 of the Hindu Succession Act (or Section 33 of ISA) equally among Class I legal heirs.
                      </p>
                      <div className="pt-2 flex items-center gap-3">
                        <a
                          href="#standalone-deed-template"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md"
                        >
                          <FileSignature className="w-3.5 h-3.5" />
                          <span>View Revocation Deed Template</span>
                        </a>
                        <Link
                          href="/tools/succession-calculator"
                          className="text-xs font-bold text-slate-700 hover:text-[#C65378] underline"
                        >
                          Check Legal Heir Shares
                        </Link>
                      </div>
                    </>
                  )}

                  {selectedRoute === "pause" && (
                    <>
                      <div className="font-extrabold text-slate-900 text-base flex items-center gap-2 text-amber-800">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                        <span>Recommended Route: Register Revocation Deed, Then Promptly Execute New Will</span>
                      </div>
                      <p>
                        Execute the Standalone Deed of Revocation right away on non-judicial stamp paper with two witnesses and submit it to the SRO. However, schedule the drafting of your replacement Will promptly to prevent indefinite intestacy risks.
                      </p>
                      <div className="pt-2 flex items-center gap-3">
                        <a
                          href="#standalone-deed-template"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Standalone Deed Format</span>
                        </a>
                        <Link
                          href="/contact"
                          className="text-xs font-bold text-slate-700 hover:text-[#C65378] underline"
                        >
                          Consult Estate Lawyer
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* SECTION 4: STANDALONE DEED TEMPLATE */}
            <section id="standalone-deed-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSignature className="w-4 h-4" />
                <span>LAWYER-VETTED LEGAL DRAFT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Standalone Deed of Revocation of Will Format (Full Text)
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                This complete legal format is compliant with Section 70 of the Indian Succession Act, 1925 and Section 18 of the
                Filing Act, 1908. It can be printed on non-judicial stamp paper of appropriate value as per state stamp rules.
              </p>

              {/* Template Box */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Legal Deed of Revocation of Will Format</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyTemplateToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedTemplate ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied Full Deed!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Complete Deed</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[500px]">
{`DEED OF REVOCATION OF WILL
(Under Section 70 of the Indian Succession Act, 1925)

THIS DEED OF REVOCATION is made and executed on this ______ day of ____________, 20____, at ________________________,

BY:
[Full Legal Name of Testator], son/daughter/wife of [Father's / Husband's Name], aged about _____ years, Indian Inhabitant, residing at [Complete Residential Address], holding Aadhaar No. ________________________ and PAN ________________________ (hereinafter referred to as the "TESTATOR", which expression shall unless repugnant to the context include my heirs, executors, administrators, and assigns).

IN FAVOUR OF:
THE GENERAL PUBLIC AND ALL CONCERNED.

WHEREAS:
1. The Testator had previously made and executed a Last Will and Testament dated [Date of Earlier Will], registered / unregistered in the Office of the Sub-Registrar at [SRO Location], on [Date of Registration], recorded in Book No. III, Volume No. _______, at Pages _______ to _______, bearing Document Registration No. ________________________ of [Year] (hereinafter referred to as the "EARLIER WILL").

2. Under the terms of the said Earlier Will, the Testator had bequeathed certain movable and immovable properties, including [Brief summary of property, e.g. Residential Flat No. ___, Plot No. ___], in favour of [Name(s) of Previous Beneficiaries].

3. Circumstances have since changed, and the Testator no longer wishes the disposition of properties outlined in the Earlier Will to take effect upon his/her demise.

4. The Testator is in sound disposing state of mind, enjoying full physical and mental capacity, free from any coercion, fraud, undue influence, or misrepresentation from any person.

NOW THIS DEED OF REVOCATION WITNESSETH AS FOLLOWS:

1. ABSOLUTE REVOCATION AND ANNULMENT:
In exercise of the powers conferred under Section 62 and Section 70 of the Indian Succession Act, 1925, the Testator hereby unconditionally, irrevocably, and completely REVOKES, CANCELS, ANNULS, AND RECALLS the said Earlier Will dated [Date of Earlier Will] (registered under Document No. ________________________), along with every bequest, appointment of executor, legacy, and provision contained therein.

2. CANCELLATION OF LEGAL EFFECT:
The Testator declares that the said Earlier Will dated [Date of Earlier Will] shall hereafter be treated as entirely null, void, and of no legal consequence whatsoever, as if the same had never been drafted or executed.

3. NOTICE TO SUB-REGISTRAR:
The Testator requests the Sub-Registrar at [SRO Location] to make a necessary note, entry, and endorsement of this revocation in Book No. III and relevant indices, recording the cancellation of Document No. ________________________ of [Year].

4. FUTURE TESTAMENTARY FREEDOM:
The Testator retains full, unfettered right and testamentary liberty to execute a new Last Will and Testament at any subsequent date or, alternatively, to allow his/her estate to devolve by rules of intestate succession under applicable personal succession laws.

IN WITNESS WHEREOF, the Testator has set his/her hands and signatures to this Deed of Revocation on the day, month, and year first above written in the presence of the attesting witnesses below.

________________________________________
[Signature / Thumb Impression of Testator]
Name: [Full Legal Name of Testator]

ATTESTATION CLAUSE
Signed and declared by the above-named Testator, [Name of Testator], as his/her Deed of Revocation of Will, in the joint presence of us, who in his/her presence, at his/her request, and in the presence of each other, have hereunto subscribed our names as attesting witnesses:

WITNESS 1:
Signature: ______________________________
Name: [Full Legal Name of Witness 1]
Father's Name: __________________________
Address: _______________________________
Aadhaar No.: ___________________________

WITNESS 2:
Signature: ______________________________
Name: [Full Legal Name of Witness 2]
Father's Name: __________________________
Address: _______________________________
Aadhaar No.: ___________________________`}
                </pre>
              </div>
            </section>

            {/* SECTION 5: EXPRESS CLAUSE TEMPLATE */}
            <section id="express-clause-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXPRESS REVOCATION CLAUSE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Express Revocation Clause to Insert into a New Will
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                If you are creating a new Will, inserting this express revocation clause at the beginning ensures that all prior filed
                or plain Wills and codicils are legally superseded and extinguished.
              </p>

              {/* Clause Box */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-sm text-slate-900">
                    Gold-Standard Revocation Clause for a New Will
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied Clause!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"1. REVOCATION OF ALL PRIOR WILLS AND CODICILS:
I hereby absolutely revoke, cancel, annul, and set aside all my former Wills, Codicils, testamentary instruments, and dispositions of every kind made by me at any time heretofore, including specifically my registered / unregistered Will dated [Date of Earlier Will], registered on [Date] in the Office of the Sub-Registrar at [SRO Office Name] under Document No. [Registration Number], Book No. III, Volume No. [Volume], at Pages [Pages]. I declare this present instrument to be my absolute, sole, and last subsisting Will and Testament."`}
                </pre>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-600">
                  <span>Drafting your entire Will takes 15 minutes on WillDrafting.</span>
                  <button
                    onClick={handleStartDraft}
                    className="font-bold text-[#C65378] hover:text-[#a33b5c] underline"
                  >
                    Start Free Will Drafting &rarr;
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 6: SRO PROTOCOL */}
            <section id="sub-registrar-protocol" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>SUB-REGISTRAR OFFICE PROCEDURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. SRO Cancellation Protocol: Notifying the SRO
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  While registering a Will is a choice under Section 18(e) of the Filing Act, 1908, cancelling an already-filed
                  Will requires extra care. If the earlier Will is filed in SRO Book 3, disappointed heirs can still apply
                  for certified copies of that paper.
                </p>
                <p>
                  To prevent unauthorized use of the old filed Will, follow the SRO Cancellation Protocol:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-[#C65378]" />
                      <span>Same SRO Area</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Visit the exact SRO office where the earlier Will was filed. Present the Deed of Revocation or your
                      new Will. The SRO cross-references Book 3, Volume, and Paper Number, making a note in Index II.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-[#5F7E75]" />
                      <span>Relocation to Another City</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If you moved to a new city, register your new Will or Revocation Deed at your current local SRO. Send a filed
                      speed-post intimation with an acknowledgment due (RPAD) to the original SRO office citing the cancellation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>PROCEDURAL PLAYBOOK</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Step-by-Step SOP: Cancelling an Old Filed Will
              </h3>

              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    title: "Locate Earlier Will Details & Registration Particulars",
                    desc: "Obtain the date of signing, Paper Number, Book Number (Book 3), Volume, and Page Numbers from your earlier filed Will copy.",
                  },
                  {
                    step: "2",
                    title: "Choose Between a Standalone Deed and a Replacement Will",
                    desc: "If you want to appoint new heirs, draft a replacement Will. If you want assets to devolve equally to legal heirs, choose a standalone deed.",
                  },
                  {
                    step: "3",
                    title: "Print on Non-Judicial Stamp Paper with Attestation Clauses",
                    desc: "Print the Deed of Revocation or new Will on state-specific non-judicial stamp paper (typically ₹100 or as prescribed by state rules).",
                  },
                  {
                    step: "4",
                    title: "Execute Before Two Independent Attesting Witnesses",
                    desc: "Sign or thumb-impress the paper in the presence of two witnesses who are not heirs under the estate, complying with Section 63.",
                  },
                  {
                    step: "5",
                    title: "Book SRO Biometric Appointment for Registration",
                    desc: "Book an appointment at the SRO office via the state e-filing portal (e.g., Kaveri, IGR Maharashtra, NGDRS, or StockHolding).",
                  },
                  {
                    step: "6",
                    title: "Serve Written Notice to SRO & Update Bank Nominees",
                    desc: "Submit a written intimation letter to the SRO and update nomination forms in banks, housing societies, and demat accounts.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 8: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <TrendingUp className="w-4 h-4" />
                <span>REAL-WORLD SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Practical Case Studies: Delhi, Bengaluru &amp; Mumbai SROs
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Case 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Case A: South Delhi Senior Citizen (Estranged Brother)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Delhi SRO
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A retired central government officer filed a Will in 2012 leaving his Hauz Khas flat to his brother. After
                    marrying and having two children, the brother refused financial support during a medical crisis. The officer drafted a
                    new filed Will in 2024 with an express revocation clause in favour of his wife and daughters.
                  </p>
                  <div className="p-3 bg-emerald-50 rounded-xl text-xs space-y-1 text-emerald-900">
                    <div className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Legal Outcome: Old Will 100% Extinguished</span>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      The later filed Will completely nullified the brother&apos;s claim. Under Section 70, the brother has zero legal right to petition for probate on the 2012 paper.
                    </p>
                  </div>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Case B: NRI Will maker in London (Bengaluru Asset)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Bengaluru SRO
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An IT executive residing in London had filed a Will in Bengaluru in 2016. Due to work commitments, he could not
                    travel to India to revoke it. He signed a new Indian Will in London before two witnesses, had it attested at the High
                    Commission of India in London, and filed the probate-ready copy.
                  </p>
                  <div className="p-3 bg-emerald-50 rounded-xl text-xs space-y-1 text-emerald-900">
                    <div className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Legal Outcome: Valid Consular Signing</span>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      The new Will complied with Section 70 and Diplomatic and Consular Officers (Oaths and Fees) Act, effectively revoking the Bengaluru filed Will without requiring an India visit.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: COMMON MISTAKES */}
            <section id="common-revocation-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>LEGAL PITFALLS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Common Mistakes When Revoking a Filed Will in India
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-rose-200/80 shadow-2xs space-y-2">
                  <div className="font-bold text-rose-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Writing &apos;Cancelled&apos; on a Photocopy</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Scribbling &apos;Void&apos; or &apos;Cancelled&apos; across a photocopy does not revoke a filed Will. The certified original remains safely logged in SRO archives.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-rose-200/80 shadow-2xs space-y-2">
                  <div className="font-bold text-rose-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Oral Revocation or WhatsApp Messages</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Oral statements, audio recordings, or WhatsApp chats stating you disinherit someone have zero legal validity under Section 70 of the Indian Succession Act.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-rose-200/80 shadow-2xs space-y-2">
                  <div className="font-bold text-rose-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Signing an Plain Hand-Written Note</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An informal note lacking two signing witnesses violates Section 63. Courts will dismiss it and enforce the earlier filed Will.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-rose-200/80 shadow-2xs space-y-2">
                  <div className="font-bold text-rose-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Forgetting to Update Bank and Society Nominees</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Revoking your Will without updating nominee forms in your housing society or mutual funds can cause prolonged transfer delays for your new heirs.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: SRO NOTICE & CHECKLIST */}
            <section id="sro-intimation-notice" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>INTIMATION NOTICE &amp; CHECKLIST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. SRO Revocation Notice &amp; Check Checklist
              </h3>

              {/* Template Box: Notice to SRO */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-sm text-slate-900">
                    Formal Intimation Letter to SRO (Book 3 Cancellation)
                  </div>
                  <button
                    type="button"
                    onClick={copyNoticeToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedNotice ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied Notice!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Notice</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[350px]">
{`Date: ______________
To,
The Sub-Registrar of Assurances,
Office of the Sub-Registrar,
[Sub-District / City / Location],
[State, PIN Code].

Subject: Formal Intimation of Revocation and Cancellation of Registered Will bearing Document No. ____________ of [Year], Registered in Book III.

Respected Sir/Madam,

I, [Full Legal Name of Testator], son/daughter/wife of [Father's / Husband's Name], residing at [Complete Residential Address], holding Aadhaar No. ________________________, do hereby respectfully state as follows:

1. I had previously registered a Will in your esteemed office on [Date of Registration], which was duly recorded in Book No. III, Volume No. ________, at Pages ________ to ________, bearing Document Registration No. ________________________ of [Year].

2. Under the statutory provisions of Section 62 and Section 70 of the Indian Succession Act, 1925, I possess the absolute legal right to revoke, cancel, or modify my Will at any time during my lifetime.

3. I have on this date executed a formal Deed of Revocation of Will / a New Last Will and Testament dated [Date], whereby the earlier registered Will stands completely revoked, nullified, and voided.

4. I enclose herewith:
   (a) Self-attested copy of the Earlier Registered Will (Doc No. ________________________).
   (b) Original / Certified Copy of the Deed of Revocation / New Will dated [Date].
   (c) Self-attested copies of my Aadhaar Card and PAN Card.

5. I kindly request your office to make an appropriate note, memorandum, and index entry in Book No. III and Index II records, confirming the cancellation of the said Earlier Will.

Thanking you,

Yours faithfully,

________________________________________
[Signature of Testator]
Name: [Full Legal Name of Testator]`}
                </pre>
              </div>

              {/* SRO Checklist */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                <div className="font-extrabold text-slate-900 text-sm">
                  Required Papers Checklist for SRO Submission:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Original or certified copy of Earlier Filed Will</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Deed of Revocation / New Will on Stamp Paper</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Aadhaar Card and PAN Card of Will maker</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>KYC &amp; Aadhaar copies of 2 Signing Witnesses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Doctor&apos;s Fitness Paper (if Will maker is senior citizen)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Filing fee challan (typically ₹100–₹500)</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL TOOLS PROMO */}
            <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-[#172228] text-white p-6 sm:p-8 shadow-md space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                <Sparkles className="w-3 h-3 text-[#C65378]" />
                <span>SUCCESSION TOOLS &amp; DIAGNOSTICS</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                Explore Free Free Estate &amp; Estate Tools
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
                Check whether your estate requires needed probate, calculate legal heir percentage shares under personal estate law, or compute inherited asset capital gains tax.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  href="/tools/probate-checker"
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                >
                  Probate Rule Checker &rarr;
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                >
                  Hindu Legal Heir Share Tool &rarr;
                </Link>
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                >
                  Inherited Asset Capital Gains Tool &rarr;
                </Link>
              </div>
            </div>

            {/* SECTION 11: ADVOCATE REVIEW */}
            <section id="advocate-verification" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>INSTITUTIONAL CREDENTIALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Checked Legal Backing &amp; Senior Lawyer Review
              </h3>

              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-base flex items-center justify-center shrink-0">
                    AAM
                  </div>
                  <div className="space-y-1">
                    <div className="font-extrabold text-slate-900 text-base">Lawyer Anuj Anand Malik</div>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Estate Counsel, AMA Legal Solutions
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      Over 16 years of legal practice specializing in Indian testamentary jurisprudence, High Court probate court fights,
                      Will fight resolution, and cross-border NRI estate structuring across Delhi, Mumbai, Bengaluru, and Punjab.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-2">
                  <div className="font-bold text-slate-900">Counsel Check Note:</div>
                  <p className="leading-relaxed">
                    &quot;Under Section 70 of the Indian Succession Act, revocation of a filed Will is a unilateral legal right of
                    the living Will maker. In our court fights experience, Will makers who simply tear their copy or rely on oral discussions
                    leave their heirs vulnerable to probate lawsuits based on SRO certified copies. Signing a fresh, filed Will with
                    an clear revocation clause is the most robust preventive measure available under Indian law.&quot;
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileQuestion className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Cancelling a Will in India
              </h3>

              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#C65378]"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY CITATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Legal Citations &amp; Official Estate Portals
              </h3>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 text-xs">
                <div className="font-extrabold text-slate-900 mb-1">
                  Governing Legal Rules:
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>
                    <strong>Indian Succession Act, 1925 s. 62:</strong> Inherent revocability and alteration of Wills during Will maker lifetime.
                  </li>
                  <li>
                    <strong>Indian Succession Act, 1925 s. 70:</strong> Revocation of unprivileged Will or codicil by subsequent testament, writing, or destruction.
                  </li>
                  <li>
                    <strong>Indian Succession Act, 1925 s. 72:</strong> Revocation of privileged Wills.
                  </li>
                  <li>
                    <strong>Filing Act, 1908 s. 18(e):</strong> A Choice filing of Wills and revocation instruments in Book 3.
                  </li>
                  <li>
                    <strong>Filing Act, 1908 s. 32 &amp; 33:</strong> Persons eligible to present papers for filing.
                  </li>
                </ul>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>India Code: Indian Succession Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://ecourts.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>e-Courts India Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Templates &amp; Estate Guides:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Legal Will Format India
                    </Link>
                    <Link
                      href="/templates/codicil-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Codicil Format India (Will Amendment)
                    </Link>
                    <Link
                      href="/services/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      SRO Will Filing Service
                    </Link>
                    <Link
                      href="/tools/will-checklist"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Paper Checklist
                    </Link>
                  </div>
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
              RIGHT COLUMN: STICKY SIDEBAR
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR BIO CARD */}
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
                Expert in Indian testamentary law, High Court probate fights, SRO filing compliance, and Section 70 Will revocation strategies.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Checked Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>SAFEST METHOD UNDER SECTION 70</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  The Best Way to Revoke an Old Will is to Make a New Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Drafting a fresh Will automatically invalidates all previous filed testaments, guarantees your chosen heirs inherit, and prevents no-Will family fights.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your New Will Online</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>SUB-REGISTRAR DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Help Cancelling a Filed Will at the SRO?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our estate lawyers assist with SRO Book 3 record updates, legal notices, and fight-proof replacement Wills pan-India.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Lawyer Talk</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Families Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 70 Compliance:</strong> Strictly follows Indian Succession Act revocation rules.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>SRO Endorsement:</strong> Complete notice format for SRO Book 3 records.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Intestacy Risk:</strong> Seamless transition to fresh, legally binding Will.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FLOATING MOBILE ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 shadow-lg flex items-center justify-between gap-3">
        <a
          href="#standalone-deed-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileSignature className="w-3.5 h-3.5" />
          <span>View Format</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft New Will</span>
        </button>
      </div>
    </div>
  );
}
