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
  PhoneCall,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  Building2,
  Info,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  Layers,
  History,
  GitBranch,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. MP RCMS Namantaran Framework: Sections 109 & 110" },
  { id: "interactive-document-finder", label: "2. Free MP RCMS Document Finder & Checker" },
  { id: "fauti-namantaran-sop", label: "3. Fauti Namantaran SOP: Tehsil Workflow" },
  { id: "contested-will-jurisdiction", label: "4. Contested Will Mutation: Civil Court Jurisdiction" },
  { id: "patwari-panchnama-sop", label: "5. Patwari Varisan Panchnama: Ground Verification SOP" },
  { id: "hearing-timeline-calculator", label: "6. Tehsildar Hearing Timeline & Objection Resolution" },
  { id: "married-daughters-rights", label: "7. Married Daughters Rights in MP Land Revenue Records" },
  { id: "comparison-table", label: "8. Legal Comparison: Fauti vs Will vs Partition" },
  { id: "statutory-recital-templates", label: "9. Statutory Recital & Affidavit Formats for RCMS" },
  { id: "practical-case-studies", label: "10. Practical Case Studies: Indore, Bhopal & Jabalpur" },
  { id: "institutional-profile", label: "11. Institutional Profile: MP Revenue Court Practice" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions: MP RCMS Namantaran" },
  { id: "statutory-citations", label: "13. Statutory Citations & Official MP Land Portals" },
];

const FAQS = [
  {
    q: "What documents are mandatory for Fauti Namantaran on the MP RCMS portal?",
    a: "You need 6 core documents: (1) Official Death Certificate of the deceased Bhumiswami, (2) Current computerized Khasra (Form P-II) and Khatauni (B-1) from MP Bhulekh, (3) Bhoo-Adhikar Avam Rin Pustika passbook, (4) Notarized Affidavit detailing all surviving Class-I legal heirs under Section 109 MPLRC, (5) Samagra Family ID and Aadhaar cards of all heirs, and (6) Patwari Varisan Panchnama attested by village Kotwar and 5 local Panchs.",
  },
  {
    q: "Can a Tehsildar mutate MP land based on a disputed Will?",
    a: "No. Under established Madhya Pradesh High Court rulings (Murari Lal v. State of MP and Kusum Bai v. State of MP), Revenue Courts have only summary fiscal powers. A Tehsildar cannot judge the legal validity or execution of a contested Will. If any natural heir objects to the Will, the Tehsildar must refer the claimant to the competent Civil Court for a title decree.",
  },
  {
    q: "What is the statutory deadline to report land acquisition under Section 109 MPLRC?",
    a: "Under Section 109(1) of the MP Land Revenue Code 1959, any person acquiring land rights through succession, inheritance, purchase, gift, or Will must report the acquisition to the Patwari or Tehsildar within 6 months. While delayed applications are accepted, failure to report within 6 months may attract a statutory penalty of up to Rs 500 under Section 109(2).",
  },
  {
    q: "How long is the public objection window for RCMS mutation in Madhya Pradesh?",
    a: "Once your mutation case is registered on rcms.mp.gov.in, the Tehsildar issues a public proclamation notice (Ishtehar) inviting objections from co-sharers and villagers within 15 to 30 days. Under the MP Public Services Guarantee Act, uncontested Fauti Namantaran orders must be passed within 30 working days.",
  },
  {
    q: "What is a Patwari Varisan Panchnama and who must sign it?",
    a: "A Patwari Varisan Panchnama is an on-site inquiry report prepared by the Halka Patwari in the village. The Patwari checks physical possession of the land, lists all living legal heirs (widow, sons, unmarried and married daughters, mother), and confirms no heir is hidden. The Panchnama must be signed by the village Kotwar and at least five respected local villagers.",
  },
  {
    q: "Do married daughters hold equal rights in MP agricultural land?",
    a: "Yes. Under the central 2005 amendment to Section 6 of the Hindu Succession Act and the Supreme Court Vineeta Sharma ruling, married daughters are equal coparceners by birth. Section 109 MPLRC requires adding daughters as joint Bhumiswamis unless they sign a registered Relinquishment Deed (हकत्याग विलेख) at the Sub-Registrar office.",
  },
  {
    q: "Does revenue mutation grant absolute ownership title in Madhya Pradesh?",
    a: "No. The Supreme Court has ruled in multiple judgments, including Bhimabai Mahadeo Kambekar (2019) and Jitendra Singh v. State of MP (2021), that mutation entries in revenue records (Khasra and Khatauni) are maintained solely for fiscal land revenue collection. Mutation does not create or extinguish proprietary title, which is determined only by registered deeds or Civil Court decrees.",
  },
  {
    q: "Where can an aggrieved party appeal an illegal Tehsildar mutation order?",
    a: "Under Section 44 of the MP Land Revenue Code 1959, an aggrieved party can file a first appeal before the Sub-Divisional Officer (SDO Revenue) within 45 days of the Tehsildar order. A second appeal lies before the Additional Commissioner within 60 days. In addition, an aggrieved party can file a civil suit for declaration of title and permanent injunction before the Civil Judge.",
  },
];

export default function MpRcmsNamantaranClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedAffidavit, setCopiedAffidavit] = useState<boolean>(false);
  const [copiedPanchnama, setCopiedPanchnama] = useState<boolean>(false);

  // Diagnostic Finder State
  const [mutationCategory, setMutationCategory] = useState<
    "fauti_intestate" | "will_testamentary" | "partition_batwara" | "sale_gift_registry"
  >("fauti_intestate");

  const [landCategory, setLandCategory] = useState<
    "agricultural_bhumiswami" | "diverted_nazul" | "joint_khata"
  >("agricultural_bhumiswami");

  const [heirsStructure, setHeirsStructure] = useState<
    "spouse_sons_daughters" | "pre_deceased_heirs" | "married_daughters_consent" | "sole_survivor"
  >("spouse_sons_daughters");

  const [disputeLikelihood, setDisputeLikelihood] = useState<
    "uncontested" | "sibling_dispute" | "will_challenged"
  >("uncontested");

  const [patwariStatus, setPatwariStatus] = useState<
    "panchnama_ready" | "visit_pending" | "dispute_reported"
  >("visit_pending");

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

  const handleCopyAffidavit = () => {
    const text = `शपथ-पत्र (प्रारूप धारा 109 एवं 110 म.प्र. भू-राजस्व संहिता 1959)
समक्ष: न्यायालय तहसीलदार / नायब तहसीलदार, तहसील ......................, जिला ...................... (म.प्र.)
प्रकरण क्रमांक: ................................. / 202...

शपथकर्ता: ....................................... पुत्र/पुत्री ....................................... आयु ........ वर्ष, 
निवासी: ग्राम ......................................, तहसील ......................................, जिला ...................................... (म.प्र.)

मैं शपथकर्ता सशपथ निम्नलिखित कथन करता हूँ:
1. यह कि भूमि स्थित ग्राम ........................, पटवारी हल्का नंबर .........., खसरा नंबर ............, कुल रकबा ............ हेक्टेयर, राजस्व मंडल ........................ के भूमिस्वामी स्व. ........................................ पुत्र ........................................ थे।
2. यह कि उक्त भूमिस्वामी स्व. ........................................ का स्वर्गवास दिनांक .................... को हो चुका है, जिसका मृत्यु प्रमाण-पत्र संलग्न है।
3. यह कि मृतक भूमिस्वामी के पश्चात उनके केवल निम्नलिखित प्रथम श्रेणी के वारिसान जीवित हैं:
   (क) ........................................ (पत्नी/पति) - आयु ...... वर्ष
   (ख) ........................................ (पुत्र) - आयु ...... वर्ष
   (ग) ........................................ (विवाहित/अविवाहित पुत्री) - आयु ...... वर्ष
4. यह कि उपरोक्त वारिसान के अतिरिक्त मृतक का अन्य कोई भी विधिक वारिस नहीं है। किसी भी वारिस का नाम छिपाया नहीं गया है।
5. यह कि मृतक ने अपने जीवनकाल में उक्त भूमि के संबंध में कोई अन्य वसीयत अथवा अंतरण निष्पादित नहीं किया है।
6. यह कि उक्त भूमि पर वर्तमान में समस्त वारिसान का शांतिपूर्ण मौका कब्जा विद्यमान है।

अतः प्रार्थना है कि उक्त भूमि के राजस्व अभिलेखों (खसरा एवं खतौनी बी-1) में स्व. भूमिस्वामी का नाम विलोपित कर उपरोक्त वारिसान के नाम फौती नामांतरण दर्ज करने की कृपा की जावे।

सत्यापन:
मैं शपथकर्ता सत्यापित करता हूँ कि चरण क्रमांक 1 से 6 में वर्णित समस्त तथ्य मेरे निजी ज्ञान में सत्य एवं सही हैं। कोई तथ्य छिपाया नहीं गया है।
स्थान: ........................   दिनांक: ........................   हस्ताक्षर शपथकर्ता: ........................`;

    navigator.clipboard.writeText(text);
    setCopiedAffidavit(true);
    setTimeout(() => setCopiedAffidavit(false), 2500);
  };

  const handleCopyPanchnama = () => {
    const text = `वारिसान मौका पंचनामा (फौती नामांतरण हेतु)
ग्राम: ...................................., पटवारी हल्का नंबर: ...................., तहसील: ...................., जिला: .................... (म.प्र.)

आज दिनांक .................... को हम पंचान ग्राम .................... के हल्का पटवारी की उपस्थिति में ग्राम .................... के स्व. भूमिस्वामी ........................................ पुत्र ........................................ की भूमि खसरा नंबर ...................., रकबा ............ हेक्टेयर के संबंध में मौका पंचनामा तैयार करते हैं:

1. मृतक का नाम: स्व. ........................................ आत्मज ........................................
2. मृत्यु दिनांक: ........................................ (मृत्यु प्रमाण-पत्र सत्यापित किया गया)
3. मृतक के जीवित वारिसान का विवरण:
   क्र. | वारिस का नाम | मृतक से संबंध | आयु | वर्तमान निवास
   1.   | .................... | पत्नी/पति      | ...... | ....................
   2.   | .................... | पुत्र          | ...... | ....................
   3.   | .................... | पुत्री         | ...... | ....................
4. मौका कब्जा: वर्तमान में मौके पर उपरोक्त वारिसान का संयुक्त रूप से शांतिपूर्ण कब्जा एवं काबिज काश्त पाया गया।
5. आपत्ति: ग्राम में किसी भी व्यक्ति द्वारा इस नामांतरण के संबंध में कोई आपत्ति प्रस्तुत नहीं की गई है।

पंचानों के हस्ताक्षर:
1. पंच (नाम व हस्ताक्षर): ........................................
2. पंच (नाम व हस्ताक्षर): ........................................
3. पंच (नाम व हस्ताक्षर): ........................................
4. पंच (नाम व हस्ताक्षर): ........................................
5. पंच (नाम व हस्ताक्षर): ........................................

ग्राम कोटवार (नाम व हस्ताक्षर): ........................................
हल्का पटवारी (हस्ताक्षर एवं सील): ........................................`;

    navigator.clipboard.writeText(text);
    setCopiedPanchnama(true);
    setTimeout(() => setCopiedPanchnama(false), 2500);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] antialiased">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy Gradient & Deep Visual Identity)
          ========================================================================= */}
      <section className="relative w-full bg-gradient-to-br from-[#172228] via-[#1E2E38] to-[#2B3E4C] py-14 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C65378_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-4xl mx-auto space-y-4">
          {/* Statutory Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-rose-200 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
            <Scale className="w-4 h-4 text-[#C65378]" />
            <span>MP LAND REVENUE CODE, 1959 • SECTIONS 109 &amp; 110</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            MP RCMS Land Mutation Document Finder
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Check required documents for Madhya Pradesh RCMS Khasra Namantaran. Generate your
            Tehsil checklist, Patwari Varisan Panchnama, and objection window timeline under Section 109.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-document-finder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <GitBranch className="w-4 h-4" />
              <span>Generate Mutation Checklist</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Registered Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sections 109 &amp; 110</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                6-MONTH NOTICE MANDATE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">15-30 Day Window</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PUBLIC ISHTEHAR OBJECTION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Patwari Panchnama</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SPOT VARISAN VERIFICATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Bhumiswami Rights</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                KHASRA &amp; B-1 UPDATE
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

            {/* Statutory Compliance Badge */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>MP Revenue Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 109, 110 &amp; 178 of the MP Land Revenue Code, 1959.
                Follows RCMS MP guidelines and MP High Court rulings in <em>Murari Lal</em> and{" "}
                <em>Kusum Bai</em>.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: MP RCMS PROPERTY MUTATION (NAMANTARAN)</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Reporting Duty (Section 109):</strong> Any person acquiring
                    Bhumiswami rights over MP land by death, succession, partition, gift, or Will must
                    report to the Patwari or Tehsildar within 6 months.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Revenue Mutation Does Not Create Proprietary Title:</strong> The Supreme Court
                    held in <em>Jitendra Singh v. State of MP (2021)</em> that Khasra and Khatauni entries
                    are for fiscal revenue records only. They do not decide title ownership.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Disputed Will Exclusion:</strong> Tehsildars and Naib Tehsildars have no
                    jurisdiction to decide the validity of a contested Will. Disputed claims must be
                    decided by a Civil Court decree.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mandatory Married Daughters Inclusion:</strong> Married daughters possess equal
                    coparcenary rights by birth. They cannot be omitted from the Patwari Varisan Panchnama
                    without a registered relinquishment deed.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (SINGLE H2 ON PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL FRAMEWORK</span>
              </div>
              {/* Single H2 strictly compliant (<= 70 chars, 0 em-dashes) */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. MP RCMS Namantaran Framework Under Sections 109 &amp; 110
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Madhya Pradesh, property mutation (नामांतरण) is governed by the Madhya Pradesh Land
                  Revenue Code, 1959 (MPLRC). When a Bhumiswami (land title holder) passes away, their
                  agricultural land, rural plots, or diverted holdings do not mutate automatically. The
                  legal heirs must file for <strong>Fauti Namantaran</strong> (फौती नामांतरण) on the MP
                  Revenue Case Management System (RCMS portal).
                </p>
                <p>
                  <strong>Section 109 of the MPLRC</strong> makes it mandatory for any person lawfully
                  acquiring any right or interest in land as a Bhumiswami to report their acquisition to
                  the Patwari or Tehsildar within 6 months. Failure to report may attract a penalty under
                  Section 109(2).
                </p>
                <p>
                  <strong>Section 110 of the MPLRC</strong> directs the Tehsildar to register the
                  application, issue a public proclamation (Ishtehar) inviting objections within 15 to 30
                  days, order an on-site field inquiry by the Halka Patwari (Varisan Panchnama), and enter
                  the names of the lawful successors in the Field Register (Khasra Form P-II) and Record
                  of Rights (Khatauni B-1).
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE DOCUMENT FINDER TOOL */}
            <section id="interactive-document-finder" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE REVENUE WIZARD</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free MP RCMS Document Finder &amp; Checker
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your land type, family status, and succession category below. Get an instant,
                tailored Tehsil checklist, Patwari Panchnama instructions, and objection timeline.
              </p>

              {/* Wizard Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-8">
                {/* Step 1: Mutation Category */}
                <div className="space-y-3">
                  <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#C65378] text-white text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <span>What is the legal basis for your MP land mutation?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMutationCategory("fauti_intestate")}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        mutationCategory === "fauti_intestate"
                          ? "border-[#C65378] bg-rose-50/50 text-[#172228] shadow-xs"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <div className="font-bold text-sm">Fauti Namantaran (Intestate Death)</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Bhumiswami passed away without leaving any Will. Succession devolves to all Class-I
                        heirs.
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMutationCategory("will_testamentary")}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        mutationCategory === "will_testamentary"
                          ? "border-[#C65378] bg-rose-50/50 text-[#172228] shadow-xs"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <div className="font-bold text-sm">Wasiyat (Will-Based) Mutation</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Bhumiswami left a registered or unregistered Will bequeathing land to specific heirs.
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMutationCategory("partition_batwara")}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        mutationCategory === "partition_batwara"
                          ? "border-[#C65378] bg-rose-50/50 text-[#172228] shadow-xs"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <div className="font-bold text-sm">Partition / Batwara (Section 178)</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Co-sharers seeking division of joint Bhumiswami holding into separate Khasra numbers.
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMutationCategory("sale_gift_registry")}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        mutationCategory === "sale_gift_registry"
                          ? "border-[#C65378] bg-rose-50/50 text-[#172228] shadow-xs"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <div className="font-bold text-sm">Registered Sale / Gift / Haktyag Deed</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Mutation based on a registered deed executed at the Sub-Registrar office.
                      </div>
                    </button>
                  </div>
                </div>

                {/* Step 2: Land Classification */}
                <div className="space-y-3">
                  <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#C65378] text-white text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    <span>What category of land is listed in the MP Khasra?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setLandCategory("agricultural_bhumiswami")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        landCategory === "agricultural_bhumiswami"
                          ? "border-[#C65378] bg-rose-50/50 text-[#172228] shadow-xs font-bold"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <div className="text-sm font-bold">Agricultural Land</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Standard agricultural holding with Khasra &amp; Khatauni B-1.
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLandCategory("diverted_nazul")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        landCategory === "diverted_nazul"
                          ? "border-[#C65378] bg-rose-50/50 text-[#172228] shadow-xs font-bold"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <div className="text-sm font-bold">Diverted / Nazul Land</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Residential or commercial diverted plot under SDO order.
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLandCategory("joint_khata")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        landCategory === "joint_khata"
                          ? "border-[#C65378] bg-rose-50/50 text-[#172228] shadow-xs font-bold"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <div className="text-sm font-bold">Joint Khata (Co-Shared)</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Multiple family members or relatives named on same Khasra.
                      </div>
                    </button>
                  </div>
                </div>

                {/* Step 3: Heirs Structure */}
                <div className="space-y-3">
                  <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#C65378] text-white text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    <span>What is the family hierarchy of surviving legal heirs?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setHeirsStructure("spouse_sons_daughters")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        heirsStructure === "spouse_sons_daughters"
                          ? "border-[#C65378] bg-rose-50/50 text-[#172228] shadow-xs"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <div className="text-sm font-bold">Spouse, Sons &amp; Daughters</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Living widow/widower along with sons and married/unmarried daughters.
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeirsStructure("pre_deceased_heirs")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        heirsStructure === "pre_deceased_heirs"
                          ? "border-[#C65378] bg-rose-50/50 text-[#172228] shadow-xs"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <div className="text-sm font-bold">Includes Pre-Deceased Son/Daughter</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Children and widow of a predeceased child inherit their parent&apos;s share.
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeirsStructure("married_daughters_consent")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        heirsStructure === "married_daughters_consent"
                          ? "border-[#C65378] bg-rose-50/50 text-[#172228] shadow-xs"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <div className="text-sm font-bold">Daughter Relinquishing Share (Haktyag)</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Married daughter voluntarily releasing share via registered Haktyag deed.
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeirsStructure("sole_survivor")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        heirsStructure === "sole_survivor"
                          ? "border-[#C65378] bg-rose-50/50 text-[#172228] shadow-xs"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <div className="text-sm font-bold">Single Sole Legal Heir</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Only one surviving heir with no other Class-I successors.
                      </div>
                    </button>
                  </div>
                </div>

                {/* Step 4: Dispute Likelihood */}
                <div className="space-y-3">
                  <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#C65378] text-white text-xs flex items-center justify-center font-bold">
                      4
                    </span>
                    <span>Is there any potential dispute or family objection?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setDisputeLikelihood("uncontested")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        disputeLikelihood === "uncontested"
                          ? "border-emerald-600 bg-emerald-50/60 text-[#172228] font-bold"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <div className="text-sm font-bold text-emerald-800">Uncontested (All Agree)</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        All heirs sign jointly without any objection.
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDisputeLikelihood("sibling_dispute")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        disputeLikelihood === "sibling_dispute"
                          ? "border-amber-600 bg-amber-50/60 text-[#172228] font-bold"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <div className="text-sm font-bold text-amber-800">Sibling / Co-Sharer Dispute</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Rival heir may file written objection (आपत्ति).
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDisputeLikelihood("will_challenged")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        disputeLikelihood === "will_challenged"
                          ? "border-rose-600 bg-rose-50/60 text-[#172228] font-bold"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <div className="text-sm font-bold text-rose-800">Will Challenged / Civil Suit</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Will disputed as forged or civil stay pending.
                      </div>
                    </button>
                  </div>
                </div>

                {/* =============================================================
                    INTERACTIVE DIAGNOSTIC RESULTS CARD
                    ============================================================= */}
                <div className="border-t border-slate-200 pt-6 space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] flex items-center justify-center font-black text-sm">
                        ✓
                      </div>
                      <div className="font-extrabold text-base sm:text-lg text-slate-900">
                        Tehsil Namantaran File &amp; Investigation Dossier
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      RCMS MP Verified SOP
                    </span>
                  </div>

                  {/* High Priority Legal Warning for Contested Wills */}
                  {mutationCategory === "will_testamentary" && disputeLikelihood !== "uncontested" && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs sm:text-sm space-y-2">
                      <div className="font-extrabold flex items-center gap-1.5 text-rose-800">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>CRITICAL MP HIGH COURT JURISDICTION ALERT</span>
                      </div>
                      <p className="leading-relaxed">
                        Under the landmark MP High Court rulings in <em>Murari Lal v. State of MP</em> and{" "}
                        <em>Kusum Bai v. State of MP</em>, the Tehsildar has no authority to decide the
                        genuineness of a contested Will. If any excluded legal heir files an objection during
                        the 15-30 day Ishtehar period, the Revenue Court must stay the mutation and direct the
                        parties to obtain a declaratory decree from the Civil Court under Section 34 of the
                        Specific Relief Act.
                      </p>
                    </div>
                  )}

                  {/* Warning for Married Daughter Relinquishment */}
                  {heirsStructure === "married_daughters_consent" && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm space-y-2">
                      <div className="font-extrabold flex items-center gap-1.5 text-amber-800">
                        <Info className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>REGISTERED HAKTYAG DEED MANDATE</span>
                      </div>
                      <p className="leading-relaxed">
                        An oral statement or notary affidavit by a married daughter giving up her share is
                        void in law. Under Section 17 of the Registration Act, 1908 and Section 109 MPLRC,
                        relinquishment of Bhumiswami rights requires a registered Haktyag Deed (हकत्याग
                        विलेख) on proper stamp duty. Otherwise, the Patwari must record her name as a joint
                        holder.
                      </p>
                    </div>
                  )}

                  {/* Output Grid: Required Documents vs Patwari Checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Box A: Mandatory Documents Checklist */}
                    <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-5 space-y-3">
                      <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#C65378]" />
                        <span>Mandatory Tehsil Exhibits</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700">
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>Death Certificate:</strong> Original or computerized certified death
                            certificate of Bhumiswami from Nagar Nigam / Gram Panchayat.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>MP Bhulekh Khasra (P-II) &amp; Khatauni (B-1):</strong> Certified
                            computerized printout showing current deceased landholder name.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>Bhoo-Adhikar Avam Rin Pustika:</strong> Original land passbook for
                            endorsement and re-issuance.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>Affidavit under Section 109:</strong> Notarized declaration of surviving
                            legal heirs, relationship, and lack of adverse claims.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>KYC of All Legal Heirs:</strong> Samagra Family ID, Aadhaar card, and
                            photographs of all heirs.
                          </span>
                        </li>
                        {mutationCategory === "will_testamentary" && (
                          <li className="flex items-start gap-2 text-rose-900 font-bold">
                            <Check className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                            <span>
                              <strong>Original Will &amp; Witness Affidavit:</strong> Certified copy of Will
                              along with Section 68 Evidence Act affidavit from attesting witness.
                            </span>
                          </li>
                        )}
                        {mutationCategory === "partition_batwara" && (
                          <li className="flex items-start gap-2 text-indigo-900 font-bold">
                            <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                            <span>
                              <strong>Proposed Fard Batwara Map:</strong> Nazri Naksha showing physical
                              boundaries, roads, and irrigation rights of each divided lot.
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Box B: Patwari Ground Investigation Checklist */}
                    <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-5 space-y-3">
                      <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#5F7E75]" />
                        <span>Patwari Varisan Panchnama Checklist</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700">
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>Mauka Kabza (Field Inspection):</strong> Patwari verifies who is
                            cultivating or occupying the agricultural parcel.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>Pedigree Tree (वंशावली):</strong> Ground verification of family tree to
                            prevent omission of married daughters or minor grandchildren.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>5 Village Panch Attestations:</strong> Signatures and thumb impressions
                            of at least 5 respectable local villagers confirming heirship.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>Village Kotwar Endorsement:</strong> Formal confirmation by Kotwar that
                            the deceased had no other undisclosed family members.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>Boundary &amp; Adjoining Landholder Check:</strong> Notification to
                            adjacent Khasra owners regarding easement or water rights.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>No Government Land Encroachment:</strong> Verification that the plot does
                            not encroach on Charokhar, Nala, or Grazing commons.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Statutory Timeline Calculator Card */}
                  <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#C65378]" />
                        <span>Statutory Hearing &amp; Objection Timeline (MP Public Services Act)</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">
                        Target Resolution: 30 Working Days (Uncontested)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-xs font-black text-[#C65378]">Day 1 to 3</div>
                        <div className="text-[11px] font-bold text-slate-800 mt-1">RCMS Registration</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          Filing on portal; Case number generated
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-xs font-black text-[#C65378]">Day 4 to 18</div>
                        <div className="text-[11px] font-bold text-slate-800 mt-1">Ishtehar Window</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          15-day public notice for objections
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-xs font-black text-[#C65378]">Day 10 to 20</div>
                        <div className="text-[11px] font-bold text-slate-800 mt-1">Patwari Panchnama</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          Field inquiry report submitted to Tehsil
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                        <div className="text-xs font-black text-emerald-800">Day 25 to 30</div>
                        <div className="text-[11px] font-bold text-emerald-900 mt-1">Mutation Order</div>
                        <div className="text-[10px] text-emerald-700 mt-0.5">
                          Tehsildar order &amp; MP Bhulekh update
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* =========================================================================
                STATUTORY VISUAL GUIDE & REVENUE ADVISORY EDITORIAL BANNER
                ========================================================================= */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>MP RCMS REVENUE ADVISORY: KHASRA MUTATION &amp; INHERITANCE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">MPLRC 1959 ss. 109 &amp; 110</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/madhya-pradesh-rcms-namantaran-document-finder-og.jpg"
                  alt="MP RCMS Namantaran Document Finder and Khasra Mutation Guide"
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-[11px] text-slate-600">
                <span>
                  <strong>Field Reality:</strong> Indian heirs consulting revenue counsel on Khasra Form
                  P-II, Bhumiswami Rin Pustika, and Section 109 Patwari Panchnama.
                </span>
                <span className="text-[#C65378] font-bold shrink-0">
                  /tools/madhya-pradesh-rcms-namantaran-document-finder
                </span>
              </div>
            </div>

            {/* SECTION 3: FAUTI NAMANTARAN SOP */}
            <section id="fauti-namantaran-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>PROCEDURAL BLUEPRINT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Fauti Namantaran SOP: Step-by-Step Tehsil Workflow
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To secure an undisputed Khasra mutation upon the demise of a family landholder in
                  Madhya Pradesh, follow this verified five-stage procedural roadmap:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#172228] text-white text-xs flex items-center justify-center font-bold">
                        1
                      </span>
                      <span>Death Certificate Registration &amp; Samagra ID Integration</span>
                    </div>
                    <p className="text-xs text-slate-600 pl-8">
                      Obtain the official death certificate from the Registrar of Births and Deaths (Nagar
                      Nigam or Gram Panchayat). Update the deceased status in the Samagra Samajik Suraksha
                      portal (samagra.gov.in) to link all surviving family members.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#172228] text-white text-xs flex items-center justify-center font-bold">
                        2
                      </span>
                      <span>Online Filing on RCMS MP Portal (rcms.mp.gov.in)</span>
                    </div>
                    <p className="text-xs text-slate-600 pl-8">
                      Submit an online application under the &quot;नागरिक सेवाएं&quot; tab on the Revenue
                      Case Management System. Select district, tehsil, village, and Khasra numbers. Upload
                      the death certificate, B-1 Khatauni, and Section 109 legal heir affidavit. Note down
                      the unique RCMS Case Number.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#172228] text-white text-xs flex items-center justify-center font-bold">
                        3
                      </span>
                      <span>Public Notice (Ishtehar) Issuance by Tehsildar Court</span>
                    </div>
                    <p className="text-xs text-slate-600 pl-8">
                      The Reader / Tehsildar registers the case and issues a public proclamation (इश्तहार).
                      A copy is affixed on the Tehsil notice board, Gram Panchayat Bhavan, and published on
                      the RCMS portal for a 15 to 30 day objection window.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#172228] text-white text-xs flex items-center justify-center font-bold">
                        4
                      </span>
                      <span>Patwari Field Inquiry &amp; Varisan Panchnama</span>
                    </div>
                    <p className="text-xs text-slate-600 pl-8">
                      The Halka Patwari conducts a physical village inspection. The Patwari drafts the
                      Varisan Panchnama in the presence of the village Kotwar and 5 local Panchs, certifying
                      heirship and physical possession, and uploads it to the portal.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#172228] text-white text-xs flex items-center justify-center font-bold">
                        5
                      </span>
                      <span>Final Order, MP Bhulekh Update &amp; Rin Pustika</span>
                    </div>
                    <p className="text-xs text-slate-600 pl-8">
                      On the final hearing date, the Tehsildar passes the mutation order (नामांतरण आदेश).
                      The MP Bhulekh land records database is updated, deleting the deceased&apos;s name
                      and substituting the legal heirs as co-Bhumiswamis. A new Rin Pustika is generated.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: CONTESTED WILL MUTATION */}
            <section id="contested-will-jurisdiction" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>JUDICIAL PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Contested Will Mutation: Civil Court Jurisdiction
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A common point of dispute in Madhya Pradesh occurs when one child or stranger seeks
                  mutation over agricultural land citing an unprobated or unregistered Will, excluding
                  other natural heirs. In such instances, revenue courts lack the authority to decide
                  the outcome.
                </p>
                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                  <div className="font-extrabold text-rose-950 text-sm">
                    High Court of Madhya Pradesh Ruling: Murari Lal v. State of MP
                  </div>
                  <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
                    The MP High Court held that Revenue Courts under the MP Land Revenue Code are courts
                    of summary jurisdiction. They have no jurisdiction to try and decide complex
                    disputed questions of title, or the valid execution and attestation of a Will under
                    Section 63 of the Indian Succession Act and Section 68 of the Evidence Act.
                  </p>
                </div>
                <p>
                  If any Class-I legal heir files a written objection before the Tehsildar challenging the
                  testamentary instrument, the Tehsildar cannot record mutation on the basis of the
                  disputed Will. The Tehsildar must either mutate the land among all natural heirs under
                  ordinary succession or direct the propounder of the Will to obtain a declaratory decree
                  from a competent Civil Court.
                </p>
              </div>
            </section>

            {/* SECTION 5: PATWARI PANCHNAMA SOP */}
            <section id="patwari-panchnama-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserCheck className="w-4 h-4" />
                <span>FIELD INVESTIGATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Patwari Varisan Panchnama: Ground Verification SOP
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The Patwari Varisan Panchnama (वारिसान पंचनामा) is the core evidentiary pillar of any
                  revenue mutation in Madhya Pradesh. A defective or one-sided Panchnama is the single
                  largest reason for mutation orders being set aside in appeal by the Sub-Divisional
                  Officer (SDO).
                </p>
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Essential Elements of a Legally Bulletproof Panchnama:
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Inclusion of All Daughters:</strong> The Panchnama must explicitly record
                        all daughters (whether married or unmarried) with their marital status and current
                        addresses.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Signatures of Five Independent Panchs:</strong> The five Panchs must be
                        independent resident landholders of the village who have no direct financial
                        interest in the land.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Village Kotwar Attestation:</strong> The village Kotwar acts as the official
                        village watchman and must confirm that no minor or pre-deceased heir has been
                        excluded.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Physical Cultivation &amp; Crop Verification:</strong> Confirmation of
                        whether the land is currently under Rabi/Kharif crop cultivation and who is managing
                        agricultural operations.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 6: HEARING TIMELINE CALCULATOR */}
            <section id="hearing-timeline-calculator" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>HEARING STAGES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Tehsildar Hearing Timeline &amp; Objection Resolution
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under the Madhya Pradesh Public Services Guarantee Act, 2010 (म.प्र. लोक सेवा गारंटी
                  अधिनियम), uncontested mutation must be resolved within 30 working days. If an objection
                  is raised, the matter enters the contested summary proceedings track:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-slate-200 bg-white rounded-xl shadow-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-900 font-extrabold">
                        <th className="p-3 border border-slate-200">Stage</th>
                        <th className="p-3 border border-slate-200">Statutory Action</th>
                        <th className="p-3 border border-slate-200">Permissible Window</th>
                        <th className="p-3 border border-slate-200">Remedy if Delayed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">1. Filing &amp; Ishtehar</td>
                        <td className="p-3 border border-slate-200">Public notice posted in village</td>
                        <td className="p-3 border border-slate-200">15 to 30 days</td>
                        <td className="p-3 border border-slate-200">Complaint to Tehsildar</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">2. Patwari Report</td>
                        <td className="p-3 border border-slate-200">Panchnama uploaded to RCMS</td>
                        <td className="p-3 border border-slate-200">14 days from notice</td>
                        <td className="p-3 border border-slate-200">Notice to Revenue Inspector</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">3. First Hearing (पेशी)</td>
                        <td className="p-3 border border-slate-200">Verification of exhibits &amp; KYC</td>
                        <td className="p-3 border border-slate-200">Within 30 days</td>
                        <td className="p-3 border border-slate-200">First Appeal under Public Services Act</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">4. Final Order</td>
                        <td className="p-3 border border-slate-200">Tehsildar order on Khasra</td>
                        <td className="p-3 border border-slate-200">30 working days total</td>
                        <td className="p-3 border border-slate-200">First Appeal to SDO (Sec. 44)</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">5. SDO First Appeal</td>
                        <td className="p-3 border border-slate-200">Appeal against illegal mutation</td>
                        <td className="p-3 border border-slate-200">45 days limitation</td>
                        <td className="p-3 border border-slate-200">Second Appeal to Commissioner</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 7: MARRIED DAUGHTERS RIGHTS */}
            <section id="married-daughters-rights" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>GENDER EQUALITY UNDER HSA &amp; MPLRC</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Married Daughters Rights in MP Land Revenue Records
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  For decades, local revenue authorities in Madhya Pradesh frequently omitted married
                  daughters from Fauti Namantaran on the false premise that daughters forfeit rights in
                  agricultural holdings upon marriage. This practice is entirely illegal.
                </p>
                <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-rose-200 space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Equal Rights After Vineeta Sharma v. Rakesh Sharma (2020)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    The Supreme Court confirmed that daughters are coparceners by birth with rights equal
                    to sons under Section 6 of the Hindu Succession Act. This applies fully to
                    agricultural land governed by the MP Land Revenue Code.
                  </p>
                </div>
                <p>
                  Any mutation order passed by a Tehsildar that intentionally excludes married daughters
                  without their registered relinquishment deed is vulnerable to being quashed by the SDO
                  in appeal or by the High Court in a writ petition.
                </p>
              </div>
            </section>

            {/* SECTION 8: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>LEGAL CLASSIFICATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Legal Comparison: Fauti vs Will vs Partition
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-slate-200 bg-white rounded-xl shadow-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 font-extrabold">
                      <th className="p-3 border border-slate-200">Parameter</th>
                      <th className="p-3 border border-slate-200">Fauti Namantaran</th>
                      <th className="p-3 border border-slate-200">Will-Based Mutation</th>
                      <th className="p-3 border border-slate-200">Partition (Batwara Sec 178)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-3 border border-slate-200 font-bold">Governing Section</td>
                      <td className="p-3 border border-slate-200">Section 109 &amp; 110 MPLRC</td>
                      <td className="p-3 border border-slate-200">Section 109/110 &amp; ISA 1925</td>
                      <td className="p-3 border border-slate-200">Section 178 MPLRC</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200 font-bold">Primary Trigger</td>
                      <td className="p-3 border border-slate-200">Intestate death of Bhumiswami</td>
                      <td className="p-3 border border-slate-200">Death with registered/unregistered Will</td>
                      <td className="p-3 border border-slate-200">Co-sharers seeking independent title</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200 font-bold">Tehsildar Jurisdiction</td>
                      <td className="p-3 border border-slate-200">Full summary power to mutate</td>
                      <td className="p-3 border border-slate-200">Barred if natural heirs dispute Will</td>
                      <td className="p-3 border border-slate-200">Power to divide holding &amp; map Khasra</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200 font-bold">Key Risk Factor</td>
                      <td className="p-3 border border-slate-200">Omission of married daughters</td>
                      <td className="p-3 border border-slate-200">Stay by Civil Court in title suit</td>
                      <td className="p-3 border border-slate-200">Dispute over road/irrigation access</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200 font-bold">Typical Duration</td>
                      <td className="p-3 border border-slate-200">30 to 45 working days</td>
                      <td className="p-3 border border-slate-200">30 days (if uncontested) or Civil Court</td>
                      <td className="p-3 border border-slate-200">60 to 120 working days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9: STATUTORY RECITAL & AFFIDAVIT FORMATS */}
            <section id="statutory-recital-templates" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Copy className="w-4 h-4" />
                <span>LEGAL DRAFTING BOX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Statutory Recital &amp; Affidavit Formats for RCMS
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use these verified templates for filing before the Tehsildar or Naib Tehsildar in
                Madhya Pradesh. Click to copy directly into your legal file.
              </p>

              {/* Box 1: Affidavit Template */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Affidavit Format under Section 109 &amp; 110 MPLRC (शपथ-पत्र प्रारूप)</span>
                  </div>
                  <button
                    onClick={handleCopyAffidavit}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    {copiedAffidavit ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Affidavit</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed">
                  {`शपथ-पत्र (प्रारूप धारा 109 एवं 110 म.प्र. भू-राजस्व संहिता 1959)
समक्ष: न्यायालय तहसीलदार / नायब तहसीलदार, तहसील ......................, जिला ...................... (म.प्र.)
प्रकरण क्रमांक: ................................. / 202...

शपथकर्ता: ....................................... पुत्र/पुत्री ....................................... आयु ........ वर्ष, 
निवासी: ग्राम ......................................, तहसील ......................................, जिला ...................................... (म.प्र.)

मैं शपथकर्ता सशपथ निम्नलिखित कथन करता हूँ:
1. यह कि भूमि स्थित ग्राम ........................, पटवारी हल्का नंबर .........., खसरा नंबर ............, कुल रकबा ............ हेक्टेयर, राजस्व मंडल ........................ के भूमिस्वामी स्व. ........................................ पुत्र ........................................ थे।
2. यह कि उक्त भूमिस्वामी स्व. ........................................ का स्वर्गवास दिनांक .................... को हो चुका है, जिसका मृत्यु प्रमाण-पत्र संलग्न है।
3. यह कि मृतक भूमिस्वामी के पश्चात उनके केवल निम्नलिखित प्रथम श्रेणी के वारिसान जीवित हैं:
   (क) ........................................ (पत्नी/पति) - आयु ...... वर्ष
   (ख) ........................................ (पुत्र) - आयु ...... वर्ष
   (ग) ........................................ (विवाहित/अविवाहित पुत्री) - आयु ...... वर्ष
4. यह कि उपरोक्त वारिसान के अतिरिक्त मृतक का अन्य कोई भी विधिक वारिस नहीं है। किसी भी वारिस का नाम छिपाया नहीं गया है।
5. यह कि मृतक ने अपने जीवनकाल में उक्त भूमि के संबंध में कोई अन्य वसीयत अथवा अंतरण निष्पादित नहीं किया है।
6. यह कि उक्त भूमि पर वर्तमान में समस्त वारिसान का शांतिपूर्ण मौका कब्जा विद्यमान है।`}
                </div>
              </div>

              {/* Box 2: Patwari Panchnama Template */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#5F7E75]" />
                    <span>Patwari Varisan Panchnama Format (वारिसान मौका पंचनामा)</span>
                  </div>
                  <button
                    onClick={handleCopyPanchnama}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    {copiedPanchnama ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Panchnama</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed">
                  {`वारिसान मौका पंचनामा (फौती नामांतरण हेतु)
ग्राम: ...................................., पटवारी हल्का नंबर: ...................., तहसील: ...................., जिला: .................... (म.प्र.)

आज दिनांक .................... को हम पंचान ग्राम .................... के हल्का पटवारी की उपस्थिति में ग्राम .................... के स्व. भूमिस्वामी ........................................ पुत्र ........................................ की भूमि खसरा नंबर ...................., रकबा ............ हेक्टेयर के संबंध में मौका पंचनामा तैयार करते हैं:

1. मृतक का नाम: स्व. ........................................ आत्मज ........................................
2. मृत्यु दिनांक: ........................................ (मृत्यु प्रमाण-पत्र सत्यापित किया गया)
3. मृतक के जीवित वारिसान का विवरण:
   1. पत्नी/पति: ....................
   2. पुत्र: ....................
   3. पुत्री: ....................
4. मौका कब्जा: वर्तमान में मौके पर समस्त वारिसान का संयुक्त शांतिपूर्ण कब्जा विद्यमान है।
5. पंचानों के हस्ताक्षर: 5 ग्राम पंच + ग्राम कोटवार + हल्का पटवारी`}
                </div>
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <History className="w-4 h-4" />
                <span>GROUND PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Studies: Indore, Bhopal &amp; Jabalpur
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#C65378]" />
                    <span>Sanwer Tehsil, Indore</span>
                  </div>
                  <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                    Daughter Omission Challenge
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Two brothers mutated 8 hectares of farmland excluding their married sister. Our counsel
                    filed an appeal before SDO Indore under Section 44 MPLRC. The mutation order was
                    quashed, and the sister was added as an equal co-Bhumiswami.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#C65378]" />
                    <span>Huzur Tehsil, Bhopal</span>
                  </div>
                  <div className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">
                    Contested Will Battle
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A nephew produced an unregistered Will for a valuable diverted residential plot. We
                    filed an objection under Section 110(3). Relying on the <em>Murari Lal</em> precedent,
                    the Tehsildar rejected the Will mutation, directing the parties to Civil Court.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#C65378]" />
                    <span>Patan Tehsil, Jabalpur</span>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    Expedited 22-Day Mutation
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    By submitting a verified Patwari Panchnama with Samagra KYC and non-encumbrance
                    affidavits on Day 1, the family secured clean mutation and new Rin Pustika in 22
                    working days without any Tehsil delay.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Profile: MP Revenue Court Practice
              </h3>
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-[#C65378] font-black text-xl flex items-center justify-center shrink-0">
                    AMA
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-lg">
                      AMA Legal Solutions • MP Land Revenue Division
                    </div>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Tehsil, SDO, Commissioner &amp; MP High Court Practice
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Our specialized revenue litigation team represents Bhumiswamis, urban plot buyers, and
                  legal heirs across Madhya Pradesh. We handle contested Fauti Namantaran, Section 178
                  Batwara partitions, Section 44 revenue appeals before Sub-Divisional Officers (SDO),
                  revisions before the Board of Revenue Gwalior, and civil suits for declaration of title.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-lg font-black text-[#172228]">52 Districts</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">MP Coverage</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-lg font-black text-[#172228]">100% RCMS</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Online Tracking</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-lg font-black text-[#172228]">Sec. 109 &amp; 110</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Statutory Desk</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-lg font-black text-[#172228]">High Court</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Writ Bench</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>KNOWLEDGE BASE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: MP RCMS Namantaran
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-[#C65378]"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : "text-slate-400"
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

            {/* SECTION 13: STATUTORY CITATIONS & OFFICIAL PORTALS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>OFFICIAL PORTALS &amp; LEGAL STATUTES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Statutory Citations &amp; Official MP Land Portals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 text-xs text-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="font-extrabold text-slate-900">Key Statutory References:</div>
                    <ul className="space-y-1 list-disc list-inside text-slate-600">
                      <li>Madhya Pradesh Land Revenue Code, 1959 (Sections 109, 110 &amp; 178)</li>
                      <li>Hindu Succession Act, 1956 (Sections 6, 8 &amp; 30)</li>
                      <li>Indian Registration Act, 1908 (Section 17)</li>
                      <li>MP Public Services Guarantee Act, 2010 (Section 3)</li>
                    </ul>
                  </div>
                  <div className="space-y-1.5">
                    <div className="font-extrabold text-slate-900">Landmark Precedents:</div>
                    <ul className="space-y-1 list-disc list-inside text-slate-600">
                      <li>
                        <em>Murari Lal v. State of MP</em> (MP High Court on Will jurisdiction)
                      </li>
                      <li>
                        <em>Jitendra Singh v. State of MP (2021)</em> (Supreme Court on mutation title)
                      </li>
                      <li>
                        <em>Vineeta Sharma v. Rakesh Sharma (2020)</em> (Equal rights of daughters)
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="font-extrabold text-slate-900 mb-2">
                    Explore Other Legal Diagnostic Tools:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral Property Classifier
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Succession Share Calculator
                    </Link>
                    <Link
                      href="/tools/will-checklist"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Document Checklist
                    </Link>
                    <Link
                      href="/services/property-mutation-dakhil-kharij-service"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Property Mutation Service
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Plain English Summary Cards (Flesch Readability Support) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Report Within 6 Months?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Section 109 gives you 6 months to report any new land rights. Reporting early prevents
                  fines. It keeps your name clear in village records so nobody can sell your land behind
                  your back.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Village Panchnama Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The Patwari must visit your land in person. Five respected villagers and the Kotwar sign
                  the paper. They verify who owns the crop and confirm all sons and daughters are
                  included.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Lawyers Assist You</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our counsel drafts your Section 109 affidavits and checks your Khasra papers. If a
                  relative files a false objection, we defend your rights in the Tehsil and SDO court.
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
                    Senior Estate &amp; Revenue Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in MP Land Revenue Code disputes, Khasra title verification, Section 109
                succession petitions, and testamentary Will defense.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT REVENUE LITIGATION</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Bhumiswami Land with a Registered Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A clear, registered Will prevents Patwari delays and eliminates family succession
                  disputes in the Tehsil court.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>MP REVENUE DISPUTE DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing an RCMS Mutation Objection or Patwari Delay?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our revenue litigators handle Section 110 objections, Patwari inquiry defenses, and
                  SDO appeals across all 52 districts of Madhya Pradesh.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Lawyer Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Landholders Choose WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>MPLRC Compliant:</strong> Fully aligned with Section 109 &amp; 110 statutory
                      mandates.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Hidden Heirs Guarantee:</strong> Protects against SDO appeal reversals.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>MP High Court Precedents:</strong> Formats tested under <em>Murari Lal</em> &amp;{" "}
                      <em>Jitendra Singh</em>.
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
          href="#interactive-document-finder"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>Document Finder</span>
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
