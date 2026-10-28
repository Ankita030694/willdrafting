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
  Printer,
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
  RefreshCw,
  Landmark,
  Check,
  X,
  MapPin,
  Building2,
  Info,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  TrendingUp,
  Sliders,
  Users,
  FileText,
  Layers,
  Car,
  FileSignature,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Heir NOC: Meaning & Purpose" },
  { id: "interactive-noc-builder", label: "2. Interactive 4-in-1 NOC Generator" },
  { id: "supreme-court-warning", label: "3. When Plain NOC Fails: SC Precedent" },
  { id: "legal-comparison-matrix", label: "4. NOC vs Release Deed vs Settlement" },
  { id: "bank-deceased-claim-noc", label: "5. Bank Account & FD Claim NOC (RBI)" },
  { id: "municipal-mutation-noc", label: "6. Municipal Mutation & Electricity NOC" },
  { id: "rto-vehicle-transfer-noc", label: "7. RTO Form 31 Vehicle RC Transfer" },
  { id: "court-probate-consent-noc", label: "8. Court Probate & Succession Consent" },
  { id: "stamp-paper-notarization", label: "9. Stamp Paper & Notary Guidelines" },
  { id: "real-case-precedents", label: "10. Judicial Precedents & Disputes" },
  { id: "legal-clause-templates", label: "11. Ready-to-Use Copy-Paste NOC Texts" },
  { id: "institutional-profile", label: "12. Institutional Legal Backing: AMA" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Governing Statutes & Portals" },
];

const FAQS = [
  {
    q: "Is a plain NOC on stamp paper sufficient to give up my share in inherited property?",
    a: "No. Under Section 17(1)(b) of the Registration Act, 1908 and the Supreme Court ruling in Yellapu Uma Maheswari v. Buddha Jagadheeswararao (2015), any instrument that purports to extinguish, create, or transfer an undivided share in immovable property worth over Rs. 100 must be compulsorily registered. A simple NOC only permits administrative municipal mutation or utility transfer. To legally surrender co-ownership title, co-heirs must execute a registered Relinquishment Deed (Haq Tyag) or Gift Deed.",
  },
  {
    q: "What is the non-judicial stamp paper value required for a legal heir NOC affidavit?",
    a: "For administrative purposes like bank deceased claims, municipal mutation, or RTO vehicle transfer, a legal heir NOC affidavit is printed on non-judicial stamp paper of Rs. 10, Rs. 20, Rs. 50, or Rs. 100 depending on state stamp schedules (such as Rs. 100 in Maharashtra and Uttar Pradesh, Rs. 50 in Karnataka, and Rs. 10 in Delhi) and attested by a Notary Public or Oath Commissioner.",
  },
  {
    q: "Can a sibling who signed an NOC for property transfer later file a partition suit?",
    a: "Yes. Because an unregistered NOC does not extinguish title under the Transfer of Property Act, a sibling who signed an NOC for municipal mutation can file a partition suit in civil court within the 12-year limitation period. The Supreme Court has repeatedly held that mutation in municipal records does not confer or extinguish title. A registered Relinquishment Deed is required to permanently bar future partition claims.",
  },
  {
    q: "What are the RBI rules for legal heir NOC in deceased bank account claims?",
    a: "Under RBI Master Circular DBOD.No.Leg.BC.21/09.07.006/2014-15, when a deceased depositor leaves savings or fixed deposit accounts without nomination, banks permit settlement to one legal heir provided all other Class I legal heirs submit a notarized No Objection Certificate alongside an Indemnity Bond (Form Annexure-A) and Letter of Disclaimer (Annexure-C).",
  },
  {
    q: "How is an NOC from legal heirs used for RTO vehicle RC transfer after death?",
    a: "Under Rule 56 of the Central Motor Vehicles Rules, 1989 and Section 50 of the Motor Vehicles Act, 1988, legal heirs must apply via RTO Form 31 within 3 months of the owner's death. When multiple legal heirs survive, all other heirs must sign a joint No Objection Affidavit on stamp paper agreeing that the vehicle registration certificate (RC) be transferred to a single surviving heir.",
  },
  {
    q: "Is an NOC required from all legal heirs for electricity and water connection transfer?",
    a: "Yes. State power distribution companies and municipal water boards require an Indemnity Bond and a signed NOC on stamp paper from all other legal heirs before transferring an existing utility meter from the deceased parent's name to a single heir.",
  },
  {
    q: "Can an NRI legal heir execute a valid NOC from outside India?",
    a: "Yes. An NRI legal heir can execute the NOC affidavit in their overseas country of residence before a Notary Public or the Indian Embassy / Consulate. Once received in India, the document must be adjudicated and stamped under Section 18 of the Indian Stamp Act, 1899 within three months of arrival.",
  },
  {
    q: "What is the difference between a probate consent NOC and a property release deed?",
    a: "A probate consent NOC is an affidavit filed in the High Court or District Court confirming that the legal heir has no objection to the grant of probate or letters of administration under a specific Will. It validates testamentary execution. A Relinquishment Deed, by contrast, is an inter-vivos deed registered at the SRO when there is no Will, transferring an undivided ancestral share to a co-heir.",
  },
];

type NocType = "bank" | "property_mutation" | "rto_vehicle" | "probate_consent";

export default function NoObjectionCertificateClient() {
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
  const [copiedGeneratedNoc, setCopiedGeneratedNoc] = useState<boolean>(false);
  const [copiedBox1, setCopiedBox1] = useState<boolean>(false);
  const [copiedBox2, setCopiedBox2] = useState<boolean>(false);
  const [copiedBox3, setCopiedBox3] = useState<boolean>(false);
  const [copiedBox4, setCopiedBox4] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // 4-in-1 Interactive Generator State
  const [nocCategory, setNocCategory] = useState<NocType>("property_mutation");
  const [deceasedName, setDeceasedName] = useState<string>("Late Rameshwar Sharma");
  const [dateOfDeath, setDateOfDeath] = useState<string>("15-08-2024");
  const [placeOfDeath, setPlaceOfDeath] = useState<string>("New Delhi");
  const [beneficiaryName, setBeneficiaryName] = useState<string>("Vikram Sharma");
  const [beneficiaryRelation, setBeneficiaryRelation] = useState<string>("Son");
  const [heir1Name, setHeir1Name] = useState<string>("Sunita Sharma");
  const [heir1Relation, setHeir1Relation] = useState<string>("Daughter");
  const [heir1Age, setHeir1Age] = useState<string>("34");
  const [heir2Name, setHeir2Name] = useState<string>("Kavita Sharma");
  const [heir2Relation, setHeir2Relation] = useState<string>("Daughter");
  const [heir2Age, setHeir2Age] = useState<string>("31");
  const [assetDetails, setAssetDetails] = useState<string>(
    "Residential Flat No. B-402, Royal Palms Apartments, Sector 14, Dwarka, New Delhi 110078"
  );
  const [stateJurisdiction, setStateJurisdiction] = useState<string>("Delhi");

  // Track active section for Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const item of TOC_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleResetGenerator = () => {
    setNocCategory("property_mutation");
    setDeceasedName("Late Rameshwar Sharma");
    setDateOfDeath("15-08-2024");
    setPlaceOfDeath("New Delhi");
    setBeneficiaryName("Vikram Sharma");
    setBeneficiaryRelation("Son");
    setHeir1Name("Sunita Sharma");
    setHeir1Relation("Daughter");
    setHeir1Age("34");
    setHeir2Name("Kavita Sharma");
    setHeir2Relation("Daughter");
    setHeir2Age("31");
    setAssetDetails("Residential Flat No. B-402, Royal Palms Apartments, Sector 14, Dwarka, New Delhi 110078");
    setStateJurisdiction("Delhi");
  };

  // Generate dynamic certificate text based on inputs
  const getGeneratedCertificateText = () => {
    if (nocCategory === "property_mutation") {
      return `BEFORE THE MUNICIPAL COMMISSIONER / REVENUE AUTHORITY, ${stateJurisdiction.toUpperCase()}

AFFIDAVIT & NO OBJECTION CERTIFICATE (NOC) FOR PROPERTY MUTATION

We, the Deponents:
1. ${heir1Name}, ${heir1Relation} of ${deceasedName}, aged about ${heir1Age} years, resident of [Address 1],
2. ${heir2Name}, ${heir2Relation} of ${deceasedName}, aged about ${heir2Age} years, resident of [Address 2],

do hereby solemnly affirm, declare, and state on oath as under:

1. That the late ${deceasedName} departed this life on ${dateOfDeath} at ${placeOfDeath}, leaving behind the following surviving Class I legal heirs:
   (a) ${beneficiaryName} (${beneficiaryRelation}) - Beneficiary Deponent
   (b) ${heir1Name} (${heir1Relation}) - Deponent 1
   (c) ${heir2Name} (${heir2Relation}) - Deponent 2

2. That the deceased was the absolute, undisputed recorded owner of the immovable property situated at:
   "${assetDetails}".

3. That the deceased died intestate (without leaving any Will) / testamentary disposition, and all legal heirs have amicably agreed that the administrative mutation of the aforesaid property in municipal tax and revenue records be mutated solely in the name of our brother/family member, ${beneficiaryName}.

4. That we, the Deponents herein, have NO OBJECTION whatsoever if the said property is mutated in the name of ${beneficiaryName} in the property tax registers, municipal records, electricity meter, and water supply records.

5. [CRITICAL STATUTORY NOTE]: That this No Objection Certificate is executed purely for administrative mutation and civic tax assessment purposes and does not substitute a Registered Relinquishment Deed under Section 17(1)(b) of the Registration Act, 1908.

DEPONENTS

VERIFICATION:
Verified at ${stateJurisdiction} on this [Day] of [Month, Year], that the contents of paragraphs 1 to 5 of this Affidavit are true and correct to the best of our knowledge and belief, and nothing material has been concealed therefrom.

DEPONENTS
Attested by Notary Public / Oath Commissioner`;
    }

    if (nocCategory === "bank") {
      return `ANNEXURE-C: LETTER OF NO OBJECTION & DISCLAIMER FOR DECEASED CLAIM
(To be executed on non-judicial stamp paper of appropriate value as per RBI Master Circular)

To,
The Branch Manager,
[Name of Bank], [Branch Name & City]

Re: Deceased Claim in Account No(s): [Insert A/c Numbers] held by ${deceasedName}

Sir/Madam,

We, the undersigned Class I legal heirs of ${deceasedName}, who passed away on ${dateOfDeath} at ${placeOfDeath}:
1. ${heir1Name}, aged ${heir1Age} years (${heir1Relation})
2. ${heir2Name}, aged ${heir2Age} years (${heir2Relation})

1. We confirm that ${deceasedName} was maintaining savings/term deposit accounts and safe deposit lockers under Account/Deposit Details: "${assetDetails}".

2. We solemnly affirm that we have no objection whatsoever if the entire balance standing to the credit of the said deceased account(s), together with interest accrued thereon, is paid and settled solely in favor of ${beneficiaryName} (${beneficiaryRelation}), residing at [Address].

3. We hereby disclaim all our rights, title, and claims in respect of the credit balances in the said accounts, and agree that the discharge given by ${beneficiaryName} to the Bank shall be absolute, complete, and legally binding on us and our heirs.

4. We undertake to indemnify the Bank against any adverse third-party claim that may arise pursuant to this settlement.

Date: [Date]
Place: ${stateJurisdiction}

SIGNATURES OF RELEASING HEIRS:
1. ${heir1Name} (Deponent 1)
2. ${heir2Name} (Deponent 2)

Before Me:
NOTARY PUBLIC / MAGISTRATE WITH OFFICIAL STAMP`;
    }

    if (nocCategory === "rto_vehicle") {
      return `FORM OF NO OBJECTION AFFIDAVIT FOR VEHICLE RC TRANSFER
(Under Rule 56 of the Central Motor Vehicles Rules, 1989 read with Section 50 of the Motor Vehicles Act, 1988)

BEFORE THE REGISTERING AUTHORITY (RTO / DTO), ${stateJurisdiction.toUpperCase()}

We, the undersigned legal heirs of the registered owner ${deceasedName}:
1. ${heir1Name}, aged ${heir1Age} years (${heir1Relation})
2. ${heir2Name}, aged ${heir2Age} years (${heir2Relation})

Solemnly affirm and declare as follows:

1. That the late ${deceasedName} was the registered owner of Motor Vehicle details:
   "${assetDetails}".

2. That the said registered owner died on ${dateOfDeath} leaving behind ourselves and ${beneficiaryName} (${beneficiaryRelation}) as the sole surviving legal heirs.

3. That all surviving legal heirs have mutually agreed that the ownership of the said motor vehicle should be transferred into the name of ${beneficiaryName}.

4. That we have NO OBJECTION to the transfer of registration certificate (RC) of the aforesaid vehicle in the name of ${beneficiaryName} in RTO records.

DEPONENTS
1. ${heir1Name}
2. ${heir2Name}

Identified by Advocate: [Advocate Signature]
Attested before Notary Public`;
    }

    return `BEFORE THE HON'BLE DISTRICT JUDGE / HIGH COURT AT [BENCH]
TESTAMENTARY AND INTESTATE JURISDICTION
PETITION NO. [Insert No.] OF 2026

IN THE MATTER OF:
The Estate of the Late ${deceasedName}, deceased

CONSENT AFFIDAVIT & NO OBJECTION CERTIFICATE FROM LEGAL HEIRS

We, ${heir1Name} (${heir1Relation}) and ${heir2Name} (${heir2Relation}), do hereby solemnly affirm and state on oath:

1. That we are the Class I legal heirs of the late ${deceasedName}, who died on ${dateOfDeath}.
2. That we have perused the Petition for grant of Probate / Letters of Administration filed by the Petitioner, ${beneficiaryName}.
3. That we admit the genuineness and due execution of the Last Will and Testament dated [Date of Will] / intestate distribution.
4. That we have NO OBJECTION to the grant of Probate / Letters of Administration in favor of the Petitioner, and we hereby waive the issuance of formal court citations and notices upon us.

DEPONENTS
Verified on oath at [City] on [Date]`;
  };

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378]/15 selection:text-[#C65378]">
      {/* Decorative ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C65378]/[0.05] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-72 -left-20 w-80 h-80 rounded-full bg-[#5F7E75]/[0.05] blur-3xl"
      />

      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy #172228)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>REGISTRATION ACT, 1908 • SECTION 17(1)(b) &amp; RBI MASTER CIRCULAR</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            NOC Format from Legal Heirs for Property Transfer in India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download lawyer-vetted <strong>4-in-1 Legal Heir NOC templates</strong> for property
            mutation, bank account claims, and RTO vehicle RC transfer. Learn why an unregistered NOC
            fails to surrender property title without a <strong>Registered Relinquishment Deed</strong>.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-noc-builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileSignature className="w-4 h-4" />
              <span>Generate 4-in-1 Legal Heir NOC</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Challenge-Proof Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 17(1)(b)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                REGISTRATION ACT 1908
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">4-in-1 Pack</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                BANK • MUNICIPAL • RTO • COURT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">RBI 2014-15</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DECEASED DEPOSITOR RULES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rule 56 CMV</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                RTO FORM 31 HEIR PROTOCOL
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Matching Capital Gains Calculator Layout)
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
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Section 17(1)(b) of the Registration Act, 1908, Transfer of Property Act,
                1882, Banking Regulation Act, 1949 s. 45ZA-ZF, and Central Motor Vehicles Rules, 1989
                Rule 56, read with Supreme Court precedent Yellapu Uma Maheswari (2015).
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
                <span>EXECUTIVE BRIEF: LEGAL HEIR NOC &amp; TITLE TRANSFER RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Administrative vs Title Transfer:</strong> A No Objection Certificate (NOC)
                    is valid for administrative purposes like updating municipal property tax records,
                    settling deceased bank accounts, or transferring vehicle RC.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No Extinguishment of Property Rights:</strong> A plain NOC or notarized affidavit
                    does NOT extinguish ownership rights in immovable land, flats, or commercial buildings.
                    To surrender title, a <strong>registered Relinquishment Deed (Haq Tyag)</strong> is legally mandatory.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Supreme Court Precedent:</strong> Under <em>Yellapu Uma Maheswari (2015)</em>,
                    unregistered documents declaring relinquishment of property shares are strictly inadmissible
                    in evidence to prove title transfer under Section 49 of the Registration Act.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>4-in-1 Standard Pack:</strong> Legal heirs require tailored wording depending
                    on whether the asset is a bank deposit (RBI DBOD circular), vehicle (RTO Form 31),
                    civic utility connection, or court probate consent.
                  </span>
                </li>
              </ul>
            </div>

            {/* MANDATORY ON-PAGE VISUAL: PROMINENT OG BANNER IMAGE */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/no-objection-certificate-noc-legal-heirs-format-og.jpg"
                  alt="No Objection Certificate NOC from Legal Heirs Format for Property, Bank Claims, and"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 850px"
                />
              </div>
              <div className="p-4 bg-slate-900 text-slate-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="font-semibold">
                  Official Legal Heir NOC Framework compliant with Registration Act 1908 and RBI Master Circular.
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                  Verified Legal Asset
                </span>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Heir NOC: Meaning &amp; Statutory Purpose
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  When an individual passes away in India without leaving a registered Will (known in law as dying
                  intestate), their entire estate devolves upon their Class I legal heirs under Section 8 of the
                  Hindu Succession Act, 1956, or the respective personal succession laws. In practice, surviving family
                  members frequently agree that one specific legal heir—such as the surviving spouse, elder son, or
                  daughter—should manage or hold the property, claim bank accounts, or register the family vehicle.
                </p>
                <p>
                  To achieve this administrative consolidation, banks, municipal bodies, and the Regional Transport
                  Office (RTO) request a <strong>No Objection Certificate (NOC)</strong> or a <strong>No Objection Affidavit</strong>.
                  Through this document, the other legal heirs solemnly state that they have no objection to the asset
                  being recorded or disbursed in the applicant&apos;s name.
                </p>
                <p>
                  However, a widespread legal misunderstanding exists across India: <strong>many families assume that signing
                  an NOC on stamp paper permanently surrenders their legal ownership in family real estate</strong>. As detailed
                  below, Indian courts have repeatedly rejected this assumption. An NOC is strictly an administrative
                  discharge document; it cannot convey or extinguish title to immovable property.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE 4-IN-1 NOC BUILDER & LIVE PREVIEW */}
            <section id="interactive-noc-builder" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sliders className="w-4 h-4" />
                <span>INTERACTIVE LEGAL TOOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive 4-in-1 Legal Heir NOC Generator
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Select your required NOC category below, enter the deceased parent&apos;s details, releasing heirs, and
                asset identifiers. Our interactive engine instantly drafts the legally vetted certificate with state-specific
                stamp paper clauses.
              </p>

              {/* Category Tab Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setNocCategory("property_mutation")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                    nocCategory === "property_mutation"
                      ? "bg-white text-[#C65378] shadow-xs border border-rose-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Building2 className="w-4 h-4 mx-auto mb-1" />
                  Property Mutation
                </button>
                <button
                  type="button"
                  onClick={() => setNocCategory("bank")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                    nocCategory === "bank"
                      ? "bg-white text-[#C65378] shadow-xs border border-rose-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Landmark className="w-4 h-4 mx-auto mb-1" />
                  Bank Account / FD
                </button>
                <button
                  type="button"
                  onClick={() => setNocCategory("rto_vehicle")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                    nocCategory === "rto_vehicle"
                      ? "bg-white text-[#C65378] shadow-xs border border-rose-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Car className="w-4 h-4 mx-auto mb-1" />
                  RTO Vehicle RC
                </button>
                <button
                  type="button"
                  onClick={() => setNocCategory("probate_consent")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                    nocCategory === "probate_consent"
                      ? "bg-white text-[#C65378] shadow-xs border border-rose-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Scale className="w-4 h-4 mx-auto mb-1" />
                  Court Probate Consent
                </button>
              </div>

              {/* Form Input Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Deceased Person&apos;s Full Name
                    </label>
                    <input
                      type="text"
                      value={deceasedName}
                      onChange={(e) => setDeceasedName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378] outline-hidden"
                      placeholder="e.g. Late Rameshwar Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Date of Demise
                    </label>
                    <input
                      type="text"
                      value={dateOfDeath}
                      onChange={(e) => setDateOfDeath(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378] outline-hidden"
                      placeholder="e.g. 15-08-2024"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Place of Demise
                    </label>
                    <input
                      type="text"
                      value={placeOfDeath}
                      onChange={(e) => setPlaceOfDeath(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378] outline-hidden"
                      placeholder="e.g. New Delhi"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Beneficiary Legal Heir (Applicant)
                    </label>
                    <input
                      type="text"
                      value={beneficiaryName}
                      onChange={(e) => setBeneficiaryName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378] outline-hidden"
                      placeholder="e.g. Vikram Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Beneficiary Relationship
                    </label>
                    <select
                      value={beneficiaryRelation}
                      onChange={(e) => setBeneficiaryRelation(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378] outline-hidden bg-white"
                    >
                      <option value="Son">Son</option>
                      <option value="Daughter">Daughter</option>
                      <option value="Spouse">Spouse (Wife/Husband)</option>
                      <option value="Mother">Mother</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      State / Jurisdiction
                    </label>
                    <select
                      value={stateJurisdiction}
                      onChange={(e) => setStateJurisdiction(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378] outline-hidden bg-white"
                    >
                      <option value="Delhi">Delhi (Rs. 10 Stamp Paper)</option>
                      <option value="Maharashtra">Maharashtra (Rs. 100 Stamp Paper)</option>
                      <option value="Uttar Pradesh">Uttar Pradesh (Rs. 100 Stamp Paper)</option>
                      <option value="Karnataka">Karnataka (Rs. 50 Stamp Paper)</option>
                      <option value="Tamil Nadu">Tamil Nadu (Rs. 20-100 Stamp Paper)</option>
                      <option value="West Bengal">West Bengal (Rs. 10-50 Stamp Paper)</option>
                      <option value="Gujarat">Gujarat (Rs. 300 Affidavit Duty)</option>
                      <option value="Telangana">Telangana (Rs. 50-100 Stamp Paper)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Releasing Heir 1 (Name, Relation, Age)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={heir1Name}
                        onChange={(e) => setHeir1Name(e.target.value)}
                        className="w-2/3 text-xs p-2.5 rounded-xl border border-slate-200 outline-hidden"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={heir1Age}
                        onChange={(e) => setHeir1Age(e.target.value)}
                        className="w-1/3 text-xs p-2.5 rounded-xl border border-slate-200 outline-hidden"
                        placeholder="Age"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Releasing Heir 2 (Name, Relation, Age)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={heir2Name}
                        onChange={(e) => setHeir2Name(e.target.value)}
                        className="w-2/3 text-xs p-2.5 rounded-xl border border-slate-200 outline-hidden"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={heir2Age}
                        onChange={(e) => setHeir2Age(e.target.value)}
                        className="w-1/3 text-xs p-2.5 rounded-xl border border-slate-200 outline-hidden"
                        placeholder="Age"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Asset Identifier (Property Address / Bank A/c No / Vehicle Reg No)
                  </label>
                  <textarea
                    rows={2}
                    value={assetDetails}
                    onChange={(e) => setAssetDetails(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378] outline-hidden"
                  />
                </div>

                {/* Reset button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleResetGenerator}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Sample Values</span>
                  </button>
                </div>
              </div>

              {/* LEGAL VALIDITY STATUS GAUGE */}
              <div
                className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 ${
                  nocCategory === "property_mutation"
                    ? "bg-amber-50/80 border-amber-300 text-amber-950"
                    : "bg-emerald-50/80 border-emerald-300 text-emerald-950"
                }`}
              >
                <div className="flex items-center gap-2 font-black uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>
                    {nocCategory === "property_mutation"
                      ? "STATUTORY LIMITATION: ADMINISTRATIVE MUTATION ONLY"
                      : "LEGAL SUFFICIENCY: FULL DISCHARGE AUTHORIZED"}
                  </span>
                </div>
                <p>
                  {nocCategory === "property_mutation"
                    ? "Notice: This NOC enables the Municipal Corporation / Gram Panchayat to update property tax bills in the applicant's name. It DOES NOT extinguish title or transfer ownership of the property. To legally surrender land or house ownership, a registered Relinquishment Deed is required under Section 17(1)(b) of the Registration Act."
                    : nocCategory === "bank"
                    ? "RBI Master Circular DBOD.No.Leg.BC.21/09.07.006/2014-15 accepts this notarized No Objection letter along with Form Annexure-A (Indemnity Bond) for final settlement of deceased depositor funds."
                    : nocCategory === "rto_vehicle"
                    ? "Compliant with Rule 56 of the Central Motor Vehicles Rules, 1989. When combined with Form 31, this affidavit satisfies the RTO requirement for single-heir registration transfer."
                    : "Valid for filing in testamentary court petitions to dispense with individual citation summons under Indian Succession Act procedures."}
                </p>
              </div>

              {/* LIVE DOCUMENT PREVIEW & ACTION BAR */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Live Generated Certificate Preview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(getGeneratedCertificateText(), setCopiedGeneratedNoc)
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      {copiedGeneratedNoc ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-white" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Generated NOC</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                {/* Preformatted Legal Certificate Box */}
                <pre className="p-4 sm:p-6 rounded-2xl bg-slate-900 text-slate-100 text-[11px] sm:text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap border border-slate-800 shadow-inner">
                  {getGeneratedCertificateText()}
                </pre>
              </div>
            </section>

            {/* SECTION 3: SUPREME COURT WARNING & RELINQUISHMENT DEED MOAT */}
            <section id="supreme-court-warning" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LANDMARK JUDICIAL PRECEDENT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Supreme Court Precedent: When Plain NOC Fails
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  The biggest trap in Indian inheritance administration occurs when legal heirs assume that signing
                  an NOC at the local municipal corporation (e.g. MCD, BMC, BBMP, GHMC) permanently divests them of
                  their co-ownership in ancestral or parental real estate.
                </p>
                <p>
                  Under <strong>Section 17(1)(b) of the Registration Act, 1908</strong>, any non-testamentary instrument
                  that purports or operates to create, declare, assign, limit, or extinguish any right, title, or interest
                  of the value of one hundred rupees and upwards to or in immovable property <strong>must be compulsorily
                  registered</strong> at the Sub-Registrar Office (SRO).
                </p>
              </div>

              {/* CRITICAL ALERT CALLOUT BOX */}
              <div className="rounded-3xl bg-rose-50/90 border-2 border-rose-300 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-wider text-rose-900">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>SUPREME COURT RULING: YELLAPU UMA MAHESWARI (2015)</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
                  <p>
                    In the landmark verdict of <em>Yellapu Uma Maheswari &amp; Anr. v. Buddha Jagadheeswararao &amp; Ors. (2015) 16 SCC 787</em>,
                    the Hon&apos;ble Supreme Court held that:
                  </p>
                  <blockquote className="border-l-4 border-rose-500 pl-4 py-1 italic bg-white/70 rounded-r-xl text-slate-900">
                    &ldquo;An unregistered deed or affidavit relinquishing an undivided share in immovable property cannot
                    be received as evidence of any transaction affecting such property under Section 49 of the Registration
                    Act. Nomenclature is not decisive; the legal consequence of relinquishing rights requires mandatory
                    registration and payment of ad-valorem stamp duty.&rdquo;
                  </blockquote>
                  <p>
                    Furthermore, in <em>Suraj Lamp &amp; Industries Pvt. Ltd. v. State of Haryana (2012) 1 SCC 656</em> and
                    <em>Bhimabai Mahadeo Kambekar v. Arthur Import &amp; Export Co. (2011) 3 SCC 238</em>, the Apex Court affirmed
                    that <strong>mutation entries in municipal or revenue records do not confer, create, or extinguish title</strong>.
                    They exist purely for the fiscal purpose of collecting land revenue and property taxes.
                  </p>
                </div>

                <div className="pt-3 border-t border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs font-bold text-rose-950">
                    Need to surrender immovable property title safely?
                  </span>
                  <Link
                    href="/services/relinquishment-deed"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-extrabold shadow-xs transition-colors shrink-0"
                  >
                    <span>Relinquishment Deed Drafting Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 4: STRUCTURED HTML COMPARISON TABLE */}
            <section id="legal-comparison-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY COMPARISON</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Legal Comparison: NOC vs Release Deed vs FSA
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Understand the precise statutory differences between an informal NOC, a registered Relinquishment
                Deed, a Family Settlement Agreement (FSA), and a Gift Deed before executing any legal document.
              </p>

              <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white border-b border-slate-800">
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">Parameter</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">Plain Legal Heir NOC</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] text-rose-300">
                        Registered Release Deed
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">Family Settlement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">Legal Effect on Title</td>
                      <td className="p-3.5 text-rose-700 font-semibold">Zero title transfer (Admin only)</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Absolute title extinguishment</td>
                      <td className="p-3.5">Reallocates antecedent shares</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">Governing Statute</td>
                      <td className="p-3.5">Administrative Guidelines</td>
                      <td className="p-3.5">Registration Act Sec 17(1)(b)</td>
                      <td className="p-3.5">Indian Contract Act &amp; Kale Rule</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">Compulsory SRO Registration</td>
                      <td className="p-3.5">No (Notarized only)</td>
                      <td className="p-3.5 font-bold text-slate-900">Yes (Mandatory at SRO)</td>
                      <td className="p-3.5">Conditional (Deed vs Memo)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">Typical Stamp Duty</td>
                      <td className="p-3.5">Nominal (Rs. 10 to Rs. 100)</td>
                      <td className="p-3.5">State Concession (Rs. 1,000 to 2%)</td>
                      <td className="p-3.5">Nominal for Oral Memo</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">Revocability Risk</td>
                      <td className="p-3.5 text-rose-700 font-semibold">Heir can revoke or challenge anytime</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Completely Irrevocable</td>
                      <td className="p-3.5">Irrevocable if acting on it</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">Civil Partition Suit Risk</td>
                      <td className="p-3.5 text-rose-700 font-semibold">High risk within 12 years</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Zero risk (Permanently barred)</td>
                      <td className="p-3.5">Protected by Estoppel doctrine</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">Acceptance Scope</td>
                      <td className="p-3.5">Banks, RTO, Municipal tax</td>
                      <td className="p-3.5">Banks, SRO, Courts, Buyers</td>
                      <td className="p-3.5">Family members, Courts</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 5: BANK DECEASED CLAIM NOC */}
            <section id="bank-deceased-claim-noc" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>FINANCIAL INSTITUTION COMPLIANCE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Bank Account &amp; FD Claim NOC: RBI Guidelines
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  When a bank customer passes away without a registered nominee in their savings, current, or fixed
                  deposit accounts, settling the balance can become protracted. Under the Reserve Bank of India (RBI)
                  Master Circular on Customer Service (Circular DBOD.No.Leg.BC.21/09.07.006/2014-15), banks are mandated
                  to settle claims without insisting on a court-issued Succession Certificate up to internal threshold
                  limits (commonly Rs. 1 Lakh to Rs. 15 Lakhs depending on the bank).
                </p>
                <p>
                  In such non-nominee claims, the bank requires:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Deceased Claim Application:</strong> Submitted jointly by all Class I legal heirs or by one
                    heir with the explicit written consent of all other heirs.
                  </li>
                  <li>
                    <strong>No Objection Certificate (Annexure-C):</strong> Signed by all non-claiming heirs declaring
                    they waive rights to receive the payment and authorize payment to the designated applicant heir.
                  </li>
                  <li>
                    <strong>Indemnity Bond (Annexure-A):</strong> Executed on non-judicial stamp paper with one or two
                    solvent sureties guaranteeing to indemnify the bank against any future conflicting claims.
                  </li>
                  <li>
                    <strong>Legal Heir Certificate / Surviving Member Certificate:</strong> Issued by the local Tehsildar,
                    Revenue Sub-Divisional Magistrate (SDM), or District Court.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 6: MUNICIPAL MUTATION & UTILITY NOC */}
            <section id="municipal-mutation-noc" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>CIVIC BODY PROTOCOLS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Municipal Property Mutation &amp; Electricity NOC
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Municipal mutation (known variously as <em>Dakhil Kharij</em>, <em>Nagar Nigam Namantaran</em>, or
                  <em>Khata transfer</em>) is the administrative process of updating property tax records from the
                  deceased owner&apos;s name to the surviving legal heirs.
                </p>
                <p>
                  When one sibling or surviving spouse applies for mutation, civic corporations (such as MCD in Delhi,
                  BMC in Mumbai, BBMP in Bengaluru, or GHMC in Hyderabad) require an affidavit and NOC from all other
                  co-heirs confirming they consent to the name change. State power distribution companies (Discoms)
                  and water boards also require an identical NOC and indemnity bond to transfer electricity and water
                  meters.
                </p>
                <p>
                  <strong>Practical Warning:</strong> Municipal mutation simply changes the taxpayer&apos;s name on civic
                  records. If the property is subsequently sold to a third party or mortgaged for a bank loan, the buyer&apos;s
                  advocate will mandate registered title deeds from all legal heirs. An NOC in municipal files does not
                  suffice for property sale conveyancing!
                </p>
              </div>
            </section>

            {/* SECTION 7: RTO FORM 31 VEHICLE TRANSFER NOC */}
            <section id="rto-vehicle-transfer-noc" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Car className="w-4 h-4" />
                <span>MOTOR VEHICLES FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. RTO Form 31 Vehicle RC Transfer NOC Rules
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Transferring vehicle ownership upon the death of the registered owner is governed by <strong>Section 50
                  of the Motor Vehicles Act, 1988</strong> and <strong>Rule 56 of the Central Motor Vehicles Rules, 1989</strong>.
                </p>
                <p>
                  Under Rule 56:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    The person succeeding to the possession of the vehicle must inform the Registering Authority within
                    <strong> 30 days</strong> of the owner&apos;s death.
                  </li>
                  <li>
                    A formal application in <strong>RTO Form 31</strong> must be submitted within <strong>3 months</strong>
                    along with the original Registration Certificate (RC), death certificate, valid insurance, pollution certificate (PUC),
                    and proof of succession.
                  </li>
                  <li>
                    Where more than one legal heir exists, the RTO insists on an <strong>NOC Affidavit from all other legal
                    heirs</strong> consenting to the vehicle RC being transferred exclusively to the applicant.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 8: COURT PROBATE & SUCCESSION CERTIFICATE CONSENT */}
            <section id="court-probate-consent-noc" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>TESTAMENTARY JURISDICTION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Court Probate &amp; Succession Certificate Consent
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  When an executor files a petition for Probate under Section 276 of the Indian Succession Act, 1925,
                  or when legal heirs petition for a Succession Certificate under Section 372 for shares and mutual funds,
                  the court issues official citations (summons) to all Class I legal heirs.
                </p>
                <p>
                  To accelerate judicial proceedings and avoid contested litigation, legal heirs who agree with the Will&apos;s
                  bequest can file a <strong>Consent Affidavit / No Objection Affidavit</strong>. By submitting this document,
                  the heir explicitly admits the authenticity of the Will, confirms the mental soundness of the testator,
                  and waives formal publication notices, enabling the court to grant probate smoothly.
                </p>
              </div>

              {/* CONTEXTUAL INTERNAL LINK TO RELEVANT TOOLS */}
              <div className="rounded-2xl bg-gradient-to-r from-rose-50 to-emerald-50 border border-slate-200 p-5 space-y-2">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#C65378]" />
                  <span>Verify Succession &amp; Probate Requirements Online</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Unsure whether you need a Probate or how shares are split among siblings? Use our free legal tools:
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-xs font-bold">
                  <Link
                    href="/tools/probate-checker"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 hover:text-[#C65378] hover:border-rose-200 transition-colors shadow-2xs"
                  >
                    Check Probate Mandatory Status &rarr;
                  </Link>
                  <Link
                    href="/tools/succession-calculator"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 hover:text-[#C65378] hover:border-rose-200 transition-colors shadow-2xs"
                  >
                    Hindu Legal Heir Share Calculator &rarr;
                  </Link>
                  <Link
                    href="/tools/capital-gains-tax-calculator-inherited-property"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 hover:text-[#C65378] hover:border-rose-200 transition-colors shadow-2xs"
                  >
                    Inherited Property Capital Gains Calculator &rarr;
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 9: STAMP PAPER & NOTARIZATION GUIDELINES */}
            <section id="stamp-paper-notarization" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSignature className="w-4 h-4" />
                <span>STATE STAMP ACT COMPLIANCE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Stamp Paper Value, Notarization &amp; Affidavits
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  An administrative No Objection Certificate is typically drafted as an Affidavit and must be printed
                  on non-judicial stamp paper or e-stamp paper adhering to each state&apos;s Stamp Act:
                </p>
              </div>

              {/* State Stamp Duty Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                      <th className="p-3 font-bold">State / Territory</th>
                      <th className="p-3 font-bold">Recommended Stamp Paper</th>
                      <th className="p-3 font-bold">Attestation Authority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 font-medium">Delhi NCR</td>
                      <td className="p-3">Rs. 10 Non-Judicial e-Stamp</td>
                      <td className="p-3">Notary Public / Oath Commissioner</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Maharashtra</td>
                      <td className="p-3">Rs. 100 Non-Judicial Stamp</td>
                      <td className="p-3">Notary Public with Notarial Stamp</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Uttar Pradesh</td>
                      <td className="p-3">Rs. 100 Non-Judicial e-Stamp</td>
                      <td className="p-3">Notary Public / Tehsildar</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Karnataka</td>
                      <td className="p-3">Rs. 50 Non-Judicial e-Stamp</td>
                      <td className="p-3">Notary Public</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">West Bengal &amp; Gujarat</td>
                      <td className="p-3">Rs. 50 to Rs. 300 Affidavit Duty</td>
                      <td className="p-3">Notary Public / Executive Magistrate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 10: REAL CASE PRECEDENTS & LITIGATION DISPUTES */}
            <section id="real-case-precedents" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>CASE STUDY ANALYSIS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Judicial Precedents: Unregistered NOC Disputes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                {/* Case 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>The Mumbai Co-op Housing Society Trap</span>
                  </div>
                  <p className="text-slate-600">
                    In 2014, two sisters signed a notarized NOC allowing their brother to mutate their deceased father&apos;s
                    Bandra flat in the society share certificate. In 2023, when the brother attempted to sell the flat,
                    the buyer&apos;s legal team rejected the title. The sisters demanded their 1/3rd share each, citing that
                    society membership mutation does not extinguish title under the Maharashtra Co-operative Societies Act.
                    The brother was forced to pay Rs. 1.2 Crore to secure registered release deeds.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>The Delhi SRO Clean Relinquishment</span>
                  </div>
                  <p className="text-slate-600">
                    A family in South Delhi sought legal counsel before property mutation. Rather than relying on a
                    plain Rs. 10 NOC, our bench drafted and registered a formal Relinquishment Deed at the Sub-Registrar
                    Office under Section 17(1)(b). When the family later applied for a Rs. 3 Crore construction loan,
                    the bank approved the mortgage in 5 business days with zero title objections.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: READY-TO-USE COPY-PASTE NOC TEMPLATES */}
            <section id="legal-clause-templates" className="scroll-target scroll-mt-28 space-y-5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Copy className="w-4 h-4" />
                <span>COPY-PASTEABLE LEGAL CLAUSES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Ready-to-Use NOC Templates &amp; Verification Text
              </h2>

              {/* Template Box 1: Municipal Mutation NOC */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Standard Municipal Property Mutation NOC Format
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `BEFORE THE MUNICIPAL CORPORATION / REVENUE COMMISSIONER\n\nNO OBJECTION CERTIFICATE FROM LEGAL HEIRS\n\nWe, the undersigned legal heirs of Late [Deceased Name], do hereby state on solemn affirmation:\n1. That our parent Late [Deceased Name] died on [Date] leaving behind the property at [Property Address].\n2. That we have no objection whatsoever if the property tax records, water connection, and municipal assessment are mutated in the sole name of [Applicant Name].\n3. This NOC is for municipal administrative records.\n\nSignatures of Legal Heirs: [Heir 1], [Heir 2]`,
                        setCopiedBox1
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedBox1 ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Format</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`BEFORE THE MUNICIPAL CORPORATION / REVENUE COMMISSIONER

NO OBJECTION CERTIFICATE FROM LEGAL HEIRS

We, the undersigned legal heirs of Late [Deceased Name], do hereby state on solemn affirmation:
1. That our parent Late [Deceased Name] died on [Date] leaving behind the property at [Property Address].
2. That we have no objection whatsoever if the property tax records, water connection, and municipal assessment are mutated in the sole name of [Applicant Name].
3. This NOC is for municipal administrative records.

Signatures of Legal Heirs: [Heir 1], [Heir 2]`}
                </pre>
              </div>

              {/* Template Box 2: Bank Account Claim NOC */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Bank Deceased Claim No Objection &amp; Disclaimer Clause (RBI Compliant)
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `LETTER OF DISCLAIMER & NO OBJECTION FOR BANK CLAIM\n\nTo: The Branch Manager, [Bank Name]\n\nRe: Accounts of Late [Deceased Name], A/c No(s): [Insert Numbers]\n\nWe, [Heir 1] and [Heir 2], Class I legal heirs of the deceased, hereby disclaim all our interest in the credit balance of the above accounts and state that we have no objection to the Bank paying the entire sum to [Claimant Name]. The Bank's receipt to [Claimant Name] shall be a full discharge.\n\nSignatures of Legal Heirs: [1], [2]`,
                        setCopiedBox2
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedBox2 ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Format</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`LETTER OF DISCLAIMER & NO OBJECTION FOR BANK CLAIM

To: The Branch Manager, [Bank Name]

Re: Accounts of Late [Deceased Name], A/c No(s): [Insert Numbers]

We, [Heir 1] and [Heir 2], Class I legal heirs of the deceased, hereby disclaim all our interest in the credit balance of the above accounts and state that we have no objection to the Bank paying the entire sum to [Claimant Name]. The Bank's receipt to [Claimant Name] shall be a full discharge.

Signatures of Legal Heirs: [1], [2]`}
                </pre>
              </div>

              {/* Template Box 3: Notary Verification Clause */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Statutory Notary &amp; Oath Commissioner Verification Clause
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `VERIFICATION:\nVerified at [City] on this [Date] day of [Month], [Year], that the contents of paragraphs 1 to [X] of the above Affidavit are true and correct to the best of our knowledge and belief, and no part of it is false and nothing material has been concealed.\n\nDEPONENTS\n\nSolemnly affirmed before me on this day by the deponents who have been identified by Advocate [Name].\nNOTARY PUBLIC WITH SEAL`,
                        setCopiedBox3
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedBox3 ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Verification</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`VERIFICATION:
Verified at [City] on this [Date] day of [Month], [Year], that the contents of paragraphs 1 to [X] of the above Affidavit are true and correct to the best of our knowledge and belief, and no part of it is false and nothing material has been concealed.

DEPONENTS

Solemnly affirmed before me on this day by the deponents who have been identified by Advocate [Name].
NOTARY PUBLIC WITH SEAL`}
                </pre>
              </div>

              {/* Pre-Submission Checklist Box */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Pre-Submission Checklist: Documents Required with Legal Heir NOC
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `LEGAL HEIR NOC CHECKLIST:\n1. Original Death Certificate of deceased\n2. Legal Heir Certificate / Surviving Member Certificate from Revenue SDM/Tehsildar\n3. Self-attested Aadhaar Card and PAN Card copies of all legal heirs\n4. Registered Title Deed / Sale Deed / Share Certificate of property\n5. Non-judicial e-Stamp paper with appropriate state duty\n6. Notary Public attestation with register entry number`,
                        setCopiedChecklist
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Checklist</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Original Death Certificate from Municipal Registrar</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Legal Heir / Surviving Member Certificate</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Aadhaar &amp; PAN Card copies of all surviving heirs</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Non-judicial stamp paper with notary attestation</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Legal Backing: AMA Legal Solutions
              </h2>
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Succession &amp; Testamentary Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Advocates</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&apos;s leading legal technology platform for estate planning and succession
                  resolution, operated in strategic partnership with AMA Legal Solutions. Our senior testamentary
                  litigators, conveyancing counsels, and revenue advocates have structured over 15,000 challenge-proof
                  Wills and advised thousands of families on dispute-free property transmission, registered release deeds,
                  and High Court probate petitions.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/relinquishment-deed"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Relinquishment Deed Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/will-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>SRO Will Registration</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/contact"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Advocate Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Legal Heir NOCs
              </h2>

              <div className="space-y-3 pt-2">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50/70 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL CITATIONS &amp; PORTALS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Governing Statutes &amp; Official Legal Authorities
              </h2>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4 text-xs">
                <div className="space-y-2">
                  <div className="font-extrabold text-slate-900 mb-1">
                    Governing Statutory Framework:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Registration Act, 1908 s. 17(1)(b):</strong> Compulsory registration of instruments
                      extinguishing or transferring rights in immovable property worth over Rs. 100.
                    </li>
                    <li>
                      <strong>Transfer of Property Act, 1882 s. 122 &amp; 123:</strong> Formalities for inter-vivos
                      transfers, gifts, and relinquishment between co-owners.
                    </li>
                    <li>
                      <strong>Banking Regulation Act, 1949 s. 45ZA-ZF:</strong> Nominee discharge and claim settlement
                      rules for deceased account holders.
                    </li>
                    <li>
                      <strong>Central Motor Vehicles Rules, 1989 Rule 56:</strong> RTO Form 31 procedure for motor vehicle
                      transfer upon demise of the registered owner.
                    </li>
                    <li>
                      <strong>Indian Succession Act, 1925 s. 213 &amp; 372:</strong> Probate requirements in presidency
                      towns and court Succession Certificates for movable assets.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>India Code: Registration Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.rbi.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Reserve Bank of India Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://parivahan.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Parivahan Sewa (RTO Portal)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Guides &amp; Succession Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates/release-deed-format"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Relinquishment Deed Format
                    </Link>
                    <Link
                      href="/templates/family-settlement-agreement-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Family Settlement Agreement
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Will Format India
                    </Link>
                    <Link
                      href="/services/relinquishment-deed"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Relinquishment Deed Legal Service
                    </Link>
                    <Link
                      href="/services/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Sub-Registrar Will Registration
                    </Link>
                  </div>
                </div>
              </div>
            </section>
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
                  <div className="font-extrabold text-slate-900 text-sm">Advocate Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in Indian testamentary jurisprudence, High Court probate disputes, Registration
                Act Section 17 title conveyancing, and family inheritance settlements.
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
                  <span>PREVENT FUTURE FAMILY DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Children from Co-Heir NOC Lawsuits
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A legally registered Will leaves zero ambiguity, eliminating the requirement for complex
                  NOCs, affidavits, or costly partition litigation after your lifetime.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Challenge-Proof Will Now</span>
                </button>
              </div>

              {/* CARD 3: DUAL CTA 2 - RELINQUISHMENT DEED SERVICE */}
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[10px] font-bold uppercase tracking-wider text-[#C65378] border border-rose-200">
                  <Scale className="w-3 h-3 text-[#C65378]" />
                  <span>SURRENDERING PROPERTY TITLE?</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  Get a Registered Relinquishment Deed Drafted
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Avoid the trap of plain NOCs. Our High Court advocates draft irrevocable, SRO-registered
                  Release Deeds ensuring absolute title transfer across India.
                </p>
                <Link
                  href="/services/relinquishment-deed"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#172228] hover:bg-slate-800 text-white font-extrabold text-xs shadow-xs transition-transform hover:-translate-y-0.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-rose-300" />
                  <span>Explore Relinquishment Deed Desk</span>
                </Link>
                <Link
                  href="/contact"
                  className="block text-xs font-bold text-[#C65378] hover:underline pt-1"
                >
                  Schedule Advocate Consultation &rarr;
                </Link>
              </div>

              {/* CARD 4: TRUST BADGES */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 space-y-3 text-xs text-slate-700">
                <div className="font-extrabold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>WillDrafting Quality Guarantee</span>
                </div>
                <div className="space-y-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Registration Act 1908 Section 17 Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>RBI Deceased Claims DBOD Circular Aligned</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Central Motor Vehicles Rule 56 Compatible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Supreme Court Yellapu Precedent Safeguards</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
