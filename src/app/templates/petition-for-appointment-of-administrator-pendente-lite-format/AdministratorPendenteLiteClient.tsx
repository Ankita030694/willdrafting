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
  BookOpen,
  Scale,
  Building,
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  Building2,
  Gavel,
  Calculator,
  Copy,
  Users,
  FileText,
  BadgeAlert,
  Coins,
  Receipt,
  FileSpreadsheet,
} from "lucide-react";

// Table of Contents Items (matching H2/H3 IDs, <= 70 chars, 0 em-dashes)
const TOC_ITEMS = [
  { id: "statutory-rules", label: "1. Legal Rules: Administrator Pendente Lite" },
  { id: "interactive-simulator", label: "2. Free Estate Risk & Powers Tool" },
  { id: "comparison-table", label: "3. Section 247 ISA vs Receiver" },
  { id: "petition-format", label: "4. High Court Petition Draft" },
  { id: "powers-schedule", label: "5. Rent & Tax Powers Schedule" },
  { id: "surety-bond", label: "6. Solvent Surety Bond Format" },
  { id: "evidentiary-proof", label: "7. Evidentiary Proof of Waste" },
  { id: "registry-sop", label: "8. High Court Filing SOP" },
  { id: "landmark-rulings", label: "9. Landmark Court Precedents" },
  { id: "case-studies", label: "10. Real High Court Case Studies" },
  { id: "counsel-profile", label: "11. Legal Citations & Counsel" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
];

const FAQS = [
  {
    q: "What is an Administrator Pendente Lite under Indian law?",
    a: "An Administrator Pendente Lite is a neutral court officer appointed under Section 247 of the Indian Succession Act, 1925. This person takes temporary custody of a deceased person's estate while a probate dispute is pending. They have broad powers to protect property, collect rents, and pay taxes, but cannot give away any estate assets until the lawsuit ends.",
  },
  {
    q: "When can you file a Section 247 petition in court?",
    a: "You can file when heirs dispute a Will and one party wastes, damages, or steals estate wealth. Common grounds include one sibling keeping all shop rents, not paying civic property taxes, threatening to sell flats, or refusing to show accounts to the other heirs.",
  },
  {
    q: "How is Section 247 ISA different from an Order 40 CPC receiver?",
    a: "Section 247 applies specifically to Will probate lawsuits. Both officers protect assets in court care. But an Administrator Pendente Lite acts as the official personal representative of the deceased. They can file estate income tax returns and manage business leases directly.",
  },
  {
    q: "Can the appointed court manager collect rents and pay taxes?",
    a: "Yes. The court grants the manager full power to collect monthly rent from shops and homes. They issue official rent receipts, run a court bank escrow, pay civic taxes, and file tax returns under Section 159 of the Income Tax Act.",
  },
  {
    q: "Can a disputing sibling or named executor be appointed?",
    a: "Usually no. Courts prefer a neutral third party such as an advocate or retired judge. If an executor or heir has personal interest in the fight, the judge will not appoint them unless all family members agree in writing.",
  },
  {
    q: "Does the court manager have to give a security bond?",
    a: "Yes. Under Section 291 of the Indian Succession Act, the manager must submit an administration bond with solvent sureties. The court sets the bond value to prevent financial fraud and ensure honest accounts.",
  },
  {
    q: "Can the court manager sell estate land or apartments?",
    a: "No. The court manager cannot sell, mortgage, gift, or transfer any estate property without prior court leave. Their sole duty is to safeguard the property as it is until the court decides who gets it.",
  },
  {
    q: "When does the manager's court appointment end?",
    a: "The appointment ends as soon as the judge enters a final decree in the Will case. Once the court grants probate, the manager files audited accounts, hands over keys and bank funds, and gets a formal discharge.",
  },
  {
    q: "Can the court manager evict illegal occupants or bad tenants?",
    a: "Yes. With court approval, the manager can file rent lawsuits, recovery cases, and eviction suits against trespassers or non-paying tenants to protect estate revenue.",
  },
  {
    q: "How does the court manager get paid for their work?",
    a: "Under Section 247, the judge sets fair pay out of estate funds. The court usually grants a set monthly fee or a percentage cut of actual rent collected, paid before any final money goes to the heirs.",
  },
];

export default function AdministratorPendenteLiteClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-rules");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPetition, setCopiedPetition] = useState<boolean>(false);
  const [copiedSchedule, setCopiedSchedule] = useState<boolean>(false);
  const [copiedBond, setCopiedBond] = useState<boolean>(false);

  // Simulator state
  const [estateValuation, setEstateValuation] = useState<number>(50000000);
  const [monthlyRent, setMonthlyRent] = useState<number>(250000);
  const [numDisputingParties, setNumDisputingParties] = useState<number>(3);
  const [riskFactor, setRiskFactor] = useState<string>("rent_siphoning");
  const [administratorType, setAdministratorType] = useState<string>("advocate_commissioner");

  const annualRentalYield = monthlyRent * 12;
  const suggestedSuretyBond = Math.round(annualRentalYield * 2 + estateValuation * 0.05);
  const estimatedEscrowPerQuarter = monthlyRent * 3;

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

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const copyPetitionToClipboard = () => {
    const petitionText = `IN THE HIGH COURT OF JUDICATURE AT [CITY/STATE]
(TESTAMENTARY AND INTESTATE JURISDICTION)
TESTAMENTARY SUIT NO. [SUIT NUMBER] OF [YEAR]
IN
TESTAMENTARY PETITION NO. [PETITION NUMBER] OF [YEAR]

IN THE MATTER OF:
THE INDIAN SUCCESSION ACT, 1925 (SECTION 247)
AND
IN THE MATTER OF THE ESTATE OF LATE [DECEASED TESTATOR NAME], DECEASED

BETWEEN:
[PLAINTIFF / PETITIONER NAME],
Son/Daughter of Late [Father's Name],
Aged about [Age] years, Residing at [Address],
... PLAINTIFF / PETITIONER

AND

1. [DEFENDANT NO. 1 NAME],
Son/Daughter of Late [Father's Name],
Aged about [Age] years, Residing at [Address],

2. [DEFENDANT NO. 2 NAME],
Son/Daughter of Late [Father's Name],
Aged about [Age] years, Residing at [Address],
... DEFENDANTS / CAVEATORS

PETITION UNDER SECTION 247 OF THE INDIAN SUCCESSION ACT, 1925 READ WITH ORDER XL RULE 1 AND SECTION 151 OF THE CODE OF CIVIL PROCEDURE, 1908 FOR APPOINTMENT OF AN ADMINISTRATOR PENDENTE LITE OF THE ESTATE OF THE DECEASED

MOST RESPECTFULLY SHOWETH:

1. That the Petitioner herein has instituted the above-captioned Testamentary Suit seeking grant of Probate in respect of the Last Will and Testament dated [Date of Will] executed by the deceased, Late [Deceased Name], who departed this life on [Date of Death] at [Place of Death].

2. That the Defendants have entered caveats and filed written statements contesting the genuineness and validity of the said Will, upon which the contentious cause has been re-numbered as a regular Testamentary Suit. The final adjudication of the trial is likely to take substantial time.

3. That the deceased was the absolute owner of extensive immovable and movable properties detailed in SCHEDULE 'A' annexed hereto, comprising commercial retail buildings, residential apartment flats yielding substantial monthly rental collections, bank deposits, mutual fund investments, and private company shares.

4. GROUNDS FOR URGENT APPOINTMENT OF ADMINISTRATOR PENDENTE LITE:
(a) WASTE AND MISAPPROPRIATION: Defendant No. 1 has unlawfully taken unauthorized control of the commercial property situated at [Property Address] and is siphoning off monthly tenant rents amounting to approximately Rs. [Monthly Rent]/- without depositing the same into any estate account or accounting for the collections.
(b) FAILURE TO DISCHARGE STATUTORY DUES: Municipal property taxes, water cess, and commercial GST dues totaling Rs. [Amount]/- remain unpaid for the past [Number] months. The local municipal authority has issued distraint and attachment notices, threatening physical sealing and attachment of the assets.
(c) THREAT OF THIRD-PARTY ALIENATION: The Defendants are attempting to induct unauthorized third-party tenants, create adverse tenancy rights, and execute unregistered licenses in respect of prime properties to defeat the rights of the genuine beneficiaries.
(d) ABSENCE OF LEGALLY RECOGNIZED REPRESENTATIVE: Because the Will is contested and probate remains pending, no executor or legal heir possesses undisputed legal authority to operate estate accounts, issue rent receipts, renew commercial leases, or file income tax returns under Section 159 of the Income Tax Act.

5. That it is just, fit, and convenient that an independent, neutral advocate or court receiver be appointed as Administrator Pendente Lite of the entire estate under Section 247 of the Indian Succession Act, 1925, with specific enumerated powers set out in SCHEDULE 'B' hereto, subject to the supervision of this Hon'ble Court.

PRAYER:
Wherefore, the Petitioner most respectfully prays that this Hon'ble Court may be pleased to:
(a) Appoint an independent Advocate Commissioner, Court Receiver, or fit person as Administrator Pendente Lite under Section 247 of the Indian Succession Act, 1925 to take charge, custody, and management of the properties and assets of Late [Deceased Name] set out in Schedule 'A';
(b) Direct the Administrator Pendente Lite to exercise the specific management powers set out in Schedule 'B', including the collection of monthly rents, operation of a designated court escrow bank account, and payment of statutory taxes;
(c) Restrain Defendant No. 1 and all other parties from collecting rents, interfering with tenants, or intermeddling with the estate during the pendency of this suit;
(d) Direct the Defendants to hand over all books of accounts, lease agreements, tenant security deposits, and keys of the estate properties to the appointed Administrator Pendente Lite;
(e) Pass such other and further orders as this Hon'ble Court may deem fit and proper in the interest of justice and preservation of the estate.

PETITIONER
THROUGH
[ADVOCATE NAME & ENROLLMENT NO.]
COUNSEL FOR PETITIONER

VERIFICATION:
I, [Petitioner Name], the Petitioner above named, do hereby verify that the contents of paragraphs 1 to 5 of the above petition are true to my personal knowledge and belief, and nothing material has been concealed therefrom.
Verified at [City] on this [Day] day of [Month], [Year].
DEPONENT`;

    navigator.clipboard.writeText(petitionText);
    setCopiedPetition(true);
    setTimeout(() => setCopiedPetition(false), 3000);
  };

  const copyScheduleToClipboard = () => {
    const scheduleText = `SCHEDULE 'B': ENUMERATED POWERS OF ADMINISTRATOR PENDENTE LITE
(Under Section 247 Indian Succession Act & Testamentary Rules)

1. RENT COLLECTION & RECEIPT ISSUANCE:
The Administrator Pendente Lite shall have exclusive authority to demand, receive, and collect all monthly commercial and residential rents, parking fees, and maintenance charges from existing tenants and occupants of the Schedule 'A' properties, and issue official stamped receipts.

2. OPENING & OPERATION OF COURT ESCROW ACCOUNT:
The Administrator shall open a dedicated interest-bearing Escrow Current Account in the name of "Administrator Pendente Lite, Estate of Late [Deceased Name]" with [Nationalized Bank Name]. All rental collections, dividends, and interest shall be deposited therein within 48 hours of receipt.

3. PAYMENT OF STATUTORY DUES & TAXES:
The Administrator is authorized to pay municipal property taxes, electricity charges, water bills, building maintenance costs, and statutory cess out of the escrow collections.

4. FILING OF TAX RETURNS (SECTION 159 ITR):
The Administrator shall engage a qualified Chartered Accountant to prepare and file the deceased estate's income tax returns under Section 159 of the Income Tax Act, 1961, and discharge lawful tax liabilities.

5. LEGAL PROCEEDINGS AGAINST TRESPASSERS & DEFAULTERS:
The Administrator shall have power, upon taking sanction of this Hon'ble Court, to institute, defend, or compromise recovery proceedings, rent eviction petitions, and anti-encroachment suits against defaulting tenants or unlawful occupants.

6. LEASE RENEWALS ON MARKET TERMS:
Where existing commercial leases expire during pendency, the Administrator may renew the tenancies for terms not exceeding 11 months on standard market terms without creating long-term encumbrances.

7. STRICT PROHIBITION AGAINST CORPUS DISTRIBUTION:
Pursuant to Section 247 of the Indian Succession Act, the Administrator is strictly prohibited from distributing, dividing, mortgaging, or parting with any corpus of the immovable property or capital funds to any of the disputing parties until final decree and discharge by this Hon'ble Court.

8. PERIODIC ACCOUNTING TO TAXING MASTER:
The Administrator shall submit quarterly audited statements of income and expenditure along with bank reconciliation certificates before the Registrar / Taxing Master of this Hon'ble Court.`;

    navigator.clipboard.writeText(scheduleText);
    setCopiedSchedule(true);
    setTimeout(() => setCopiedSchedule(false), 3000);
  };

  const copyBondToClipboard = () => {
    const bondText = `ADMINISTRATION SURETY BOND & UNDERTAKING FORMAT
(Under Section 291 Indian Succession Act & High Court Testamentary Rules)

KNOW ALL MEN BY THESE PRESENTS that we, [Administrator Name] (Administrator Pendente Lite), residing at [Address], as Principal, and:
1. [First Surety Name], residing at [Address], having solvent immovable property valued at Rs. [Valuation] at [Property Address]; and
2. [Second Surety Name], residing at [Address], having solvent immovable property valued at Rs. [Valuation] at [Property Address];
(hereinafter collectively called the "Sureties") are held and firmly bound unto the Registrar / Chief Justice of the Hon'ble High Court of [State/City] in the penal sum of Rs. [Penal Sum Amount]/- (Rupees [Amount in Words] only) to be paid to the said Registrar, for which payment well and truly to be made, we bind ourselves, our heirs, executors, administrators, and representatives firmly by these presents.

DATED THIS [Day] DAY OF [Month], [Year].

WHEREAS by an Order dated [Date of Order] passed in Testamentary Suit No. [Suit No.] of [Year], the said [Administrator Name] was appointed Administrator Pendente Lite of the estate and effects of Late [Deceased Name], deceased, pending the final determination of the said suit, subject to furnishing a security bond with two solvent sureties in the sum of Rs. [Penal Sum Amount]/-.

NOW THE CONDITION OF THE ABOVE WRITTEN OBLIGATION IS SUCH THAT:
1. If the said Administrator Pendente Lite shall well and truly administer according to law the estate, credits, and effects of the deceased which shall come into his hands or custody; and
2. Shall make and exhibit into the Registry of this Hon'ble Court a true, full, and perfect inventory of all the estate goods, chattels, and credits within six calendar months from this date; and
3. Shall render a true and just account of his administration quarterly or whenever required by this Hon'ble Court; and
4. Shall not distribute or part with any portion of the corpus of the estate without express directions of this Court; and
5. Shall deliver up all estate assets, documents, and balances to the person or persons whom this Court shall by final decree or order declare entitled;
THEN this obligation shall be void and of no effect; OTHERWISE it shall remain in full force and virtue.

SIGNED, SEALED, AND DELIVERED BY:
PRINCIPAL (ADMINISTRATOR PENDENTE LITE): __________________________
FIRST SURETY: __________________________
SECOND SURETY: __________________________

BEFORE ME:
REGISTRAR / TESTAMENTARY MASTER
HIGH COURT OF JUDICATURE AT [CITY]`;

    navigator.clipboard.writeText(bondText);
    setCopiedBond(true);
    setTimeout(() => setCopiedBond(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTION 247 &amp; ORDER 40 CPC</span>
          </div>

          {/* Single H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Petition for Administrator Pendente Lite Format in India
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Get lawyer-vetted Section 247 petition drafts for contested Will trials in India.
            Keep estate assets safe. Appoint a court officer to collect shop rents, pay civic taxes,
            and stop property waste during probate fights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#petition-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Section 247 Petition Draft</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Fight-Proof Will</span>
            </button>
            <Link
              href="/services/will-dispute-contest-litigation-lawyer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Consult Probate Lawyer</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 247</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ESTATE PROTECTION STATUTE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Order 40 CPC</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                COURT RECEIVER PRINCIPLES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 291</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SOLVENT SURETY BOND
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Zero Corpus Split</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY PRESERVATION BAR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] xl:grid-cols-[270px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TOC
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

            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Indian Succession Act 1925 s. 247, Order XL Rule 1 CPC,
                Section 291 Administration Bond, and High Court Testamentary Rules.
              </p>
            </div>

            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>High Court Petition Pack</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Need to file an urgent Section 247 application in court?
                Copy the verified petition draft and powers schedule.
              </p>
              <a
                href="#petition-format"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Jump to Petition Draft</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* FEATURED EDITORIAL IMAGE */}
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-2 sm:p-3 shadow-xs">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/petition-for-appointment-of-administrator-pendente-lite-format-og.jpg"
                  alt="Administrator Pendente Lite Petition Format Under Section 247 Indian Succession Act"
                  width={1200}
                  height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 850px"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>
                    Section 247 Indian Succession Act: High Court Petition Format, Powers Schedule &amp; Surety Bond
                  </span>
                </p>
              </div>
            </div>

            {/* INTERIM INJUNCTION & SAFEGUARD VISUAL CARD (Using styled <div> to preserve strict H1 -> H2 order) */}
            <div className="overflow-hidden rounded-2xl border border-rose-200/80 bg-gradient-to-r from-rose-50/50 via-white to-amber-50/40 p-4 shadow-xs flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-48 aspect-[16/9] rounded-xl overflow-hidden shrink-0 border border-slate-200 relative">
                <Image
                  src="/images/application-for-temporary-injunction-probate-format-og.jpg"
                  alt="Application for Temporary Injunction in Probate Suit Order 39 CPC"
                  width={400}
                  height={225}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#C65378]">
                  <BadgeAlert className="w-3.5 h-3.5" />
                  <span>Dual Interim Probate Safeguards</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                  Pairing Section 247 Petitions with Order 39 Injunctions
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A stay order stops sales of land. But a court manager steps in to collect rent, maintain flats,
                  and pay tax bills during the court case.
                </p>
              </div>
            </div>

            {/* EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: SECTION 247 ISA ESSENTIALS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Neutral Court Officer:</strong> The manager acts as an arm of the court.
                    They keep the estate safe from waste and theft during trial.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Broad Powers with One Bar:</strong> The manager has general rights to run property,
                    but cannot give away any estate corpus until the case ends.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rent &amp; Tax Control:</strong> The manager collects shop and flat rents,
                    runs a court bank escrow, and files tax returns under Section 159.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Surety Bond Needed:</strong> Under Section 291, the manager must submit
                    a bond with solvent sureties to ensure honest accounts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Clean End:</strong> When probate is granted, the manager hands over books and cash
                    to the executor and obtains formal discharge.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY RULES (ONLY H2 ON ENTIRE PAGE) */}
            <section id="statutory-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Rules: Administrator Pendente Lite Under Section 247
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a parent dies leaving shops, flats, or bank funds, heirs may fight over the Will.
                  If an heir challenges the Will, the probate case turns into a contested lawsuit.
                  These trials often take many years in civil court.
                </p>
                <p>
                  During the long trial, estate assets face serious risk. Often, one sibling grabs control of prime shops.
                  They pocket monthly tenant rent, refuse to share records, and fail to pay civic taxes.
                  Tenants may also stop paying rent because no heir has clear legal papers to sign receipts.
                </p>
                <p>
                  To stop this financial loss, the Indian Succession Act provides an urgent remedy under{" "}
                  <strong>Section 247</strong>. This law allows the High Court or District Judge to appoint an administrator
                  while any suit over the validity of a Will is pending.
                </p>
                <p>
                  The court manager gets general administrative powers. They collect rent, keep up buildings, pay taxes,
                  and defend lawsuits. But Section 247 strictly bars them from giving away any estate land or money.
                  Their sole job is to protect the wealth until the judge decides who wins the case.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE SIMULATOR (H3) */}
            <section id="interactive-simulator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE ESTATE RISK &amp; POWERS SIMULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Estate Waste &amp; Powers Matrix Simulator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use this simple tool to check estate risk, see expected court escrow amounts,
                and estimate the surety bond needed under Section 291 of the Indian Succession Act.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Number of Disputing Heirs</span>
                    </label>
                    <select
                      value={numDisputingParties}
                      onChange={(e) => setNumDisputingParties(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value={2}>2 Disputing Heirs / Caveators</option>
                      <option value={3}>3 Disputing Heirs / Caveators</option>
                      <option value={4}>4 or More Disputing Heirs</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Primary Waste Risk Factor</span>
                    </label>
                    <select
                      value={riskFactor}
                      onChange={(e) => setRiskFactor(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="rent_siphoning">Siphoning of Commercial Shop Rents</option>
                      <option value="tax_default">Unpaid Municipal Taxes &amp; Sealing Threat</option>
                      <option value="unauthorized_leases">Creation of Illegal Third-Party Tenancies</option>
                      <option value="business_diverting">Diverting Family Partnership / Company Funds</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Gavel className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Proposed Administrator</span>
                    </label>
                    <select
                      value={administratorType}
                      onChange={(e) => setAdministratorType(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="advocate_commissioner">Independent High Court Advocate</option>
                      <option value="court_receiver">Official Receiver, High Court</option>
                      <option value="chartered_accountant">Practicing Chartered Accountant</option>
                      <option value="retired_judge">Retired District / High Court Judge</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Total Estate Immovable Valuation: {formatINR(estateValuation)}
                      </label>
                      <span className="text-xs font-semibold text-slate-500">Market Value of Disputed Assets</span>
                    </div>
                    <input
                      type="range"
                      min={10000000}
                      max={300000000}
                      step={5000000}
                      value={estateValuation}
                      onChange={(e) => setEstateValuation(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                      <span>₹1.00 Cr</span>
                      <span>₹10.00 Cr</span>
                      <span>₹20.00 Cr</span>
                      <span>₹30.00 Cr</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Monthly Estate Rental Collection: {formatINR(monthlyRent)}
                      </label>
                      <span className="text-xs font-semibold text-slate-500">
                        Annual Rental Income: {formatINR(annualRentalYield)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={25000}
                      max={1500000}
                      step={25000}
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                      <span>₹25,000 / mo</span>
                      <span>₹5 Lakh / mo</span>
                      <span>₹10 Lakh / mo</span>
                      <span>₹15 Lakh / mo</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Quarterly Court Escrow
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      {formatINR(estimatedEscrowPerQuarter)}
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Collected directly into a dedicated court escrow bank account.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-1">
                    <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                      Estimated Surety Bond
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-[#C65378]">
                      {formatINR(suggestedSuretyBond)}
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Furnished with solvent sureties under Section 291 of the Indian Succession Act.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                    <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                      Statutory Safeguard Level
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-700">
                      100% Corpus Lock
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Zero distribution allowed until final court decree and probate grant.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: COMPARISON TABLE (H3) */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>COMPARATIVE JURISPRUDENCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Administrator Pendente Lite vs Order 40 CPC Receiver
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Both roles protect property during court trials. But Indian law draws a clear distinction between a general
                civil receiver and a probate manager under Section 247.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
                  <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider font-extrabold">
                    <tr>
                      <th className="py-3 px-4">Feature</th>
                      <th className="py-3 px-4">Section 247 ISA Court Manager</th>
                      <th className="py-3 px-4">Order 40 CPC Civil Receiver</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Governing Law</td>
                      <td className="py-3 px-4 text-[#C65378] font-semibold">
                        Section 247 of Indian Succession Act, 1925
                      </td>
                      <td className="py-3 px-4">Order XL Rule 1, Code of Civil Procedure, 1908</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Scope of Action</td>
                      <td className="py-3 px-4">Testamentary, Probate, and Will dispute suits</td>
                      <td className="py-3 px-4">All general civil, partition, and mortgage suits</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Legal Status</td>
                      <td className="py-3 px-4 font-semibold">
                        Full personal representative of the deceased estate
                      </td>
                      <td className="py-3 px-4">Mere officer and custodian of the court</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Tax Filings</td>
                      <td className="py-3 px-4">Files Section 159 ITR as representative assessee</td>
                      <td className="py-3 px-4">Needs specific court order for tax filings</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Corpus Distribution</td>
                      <td className="py-3 px-4 text-rose-700 font-bold">
                        Strict statutory bar; zero distribution permitted
                      </td>
                      <td className="py-3 px-4">Court may permit interim disbursement to parties</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Surety Bond</td>
                      <td className="py-3 px-4">Compulsory administration bond under Section 291</td>
                      <td className="py-3 px-4">Security bond under Order 40 Rule 3 CPC</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Discharge Point</td>
                      <td className="py-3 px-4">Automatic upon grant of probate or final decree</td>
                      <td className="py-3 px-4">Discharged upon satisfaction of decree or court order</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: PETITION FORMAT (H3) */}
            <section id="petition-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>COURT PETITION TEMPLATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. High Court Petition Draft: Section 247 Succession Act
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Here is the verified court draft for filing under Section 247 of the Indian Succession Act in High Court
                Testamentary Suits or District Courts.
              </p>

              <div className="relative rounded-2xl border border-slate-300 bg-slate-900 text-slate-100 p-5 sm:p-6 shadow-md font-mono text-xs leading-relaxed overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700">
                  <div className="flex items-center gap-2 text-rose-400 font-sans font-bold text-xs uppercase tracking-wider">
                    <Gavel className="w-4 h-4" />
                    <span>SECTION 247 PETITION DRAFT (ORIGINAL SIDE / DISTRICT COURT)</span>
                  </div>
                  <button
                    onClick={copyPetitionToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-sans font-bold text-xs transition-colors shadow-xs"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedPetition ? "Copied!" : "Copy Petition"}</span>
                  </button>
                </div>

                <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 text-slate-200">
                  <p className="text-center font-bold text-amber-300">
                    IN THE HIGH COURT OF JUDICATURE AT [CITY/STATE]<br />
                    (TESTAMENTARY AND INTESTATE JURISDICTION)<br />
                    TESTAMENTARY SUIT NO. [SUIT NO.] OF [YEAR]<br />
                    IN TESTAMENTARY PETITION NO. [PETITION NO.] OF [YEAR]
                  </p>

                  <p>
                    <strong>IN THE MATTER OF:</strong><br />
                    THE INDIAN SUCCESSION ACT, 1925 (SECTION 247)<br />
                    AND IN THE MATTER OF THE ESTATE OF LATE [DECEASED NAME], DECEASED
                  </p>

                  <p>
                    <strong>BETWEEN:</strong><br />
                    [PLAINTIFF / PETITIONER NAME], Son/Daughter of Late [Father&apos;s Name], Residing at [Address]<br />
                    ... PLAINTIFF / PETITIONER
                  </p>

                  <p>
                    <strong>AND</strong><br />
                    1. [DEFENDANT NO. 1 NAME], Residing at [Address]<br />
                    2. [DEFENDANT NO. 2 NAME], Residing at [Address]<br />
                    ... DEFENDANTS / CAVEATORS
                  </p>

                  <p className="font-bold text-amber-200 text-center">
                    PETITION UNDER SECTION 247 OF THE INDIAN SUCCESSION ACT, 1925 READ WITH ORDER XL RULE 1 AND SECTION 151 CPC FOR APPOINTMENT OF ADMINISTRATOR PENDENTE LITE
                  </p>

                  <p>
                    <strong>MOST RESPECTFULLY SHOWETH:</strong><br />
                    1. That the Petitioner has filed the above suit for grant of Probate in respect of the Last Will dated [Date] executed by Late [Deceased Name], who died on [Date].<br />
                    2. That the Defendants have filed caveats and contested the Will, causing the proceedings to be renumbered as a regular testamentary suit.<br />
                    3. That the deceased left behind valuable commercial buildings, tenanted flats, and dividend-yielding shares detailed in Schedule &apos;A&apos;.<br />
                    4. That Defendant No. 1 has taken unauthorized control of the property and is siphoning off monthly tenant rent of Rs. [Amount]/- without accounting for the funds.<br />
                    5. That municipal property taxes and commercial water bills totaling Rs. [Amount]/- remain unpaid, risking municipal attachment and sealing.<br />
                    6. That no party has undisputed authority to issue rent receipts, renew tenant leases, or file income tax returns under Section 159 of the Income Tax Act.
                  </p>

                  <p>
                    <strong>PRAYER:</strong><br />
                    The Petitioner prays that this Hon&apos;ble Court may be pleased to:<br />
                    (a) Appoint an independent Advocate Commissioner or Court Receiver as Administrator Pendente Lite under Section 247 of the Indian Succession Act, 1925;<br />
                    (b) Authorize the Administrator to collect rents, operate an escrow account, and pay statutory taxes as per Schedule &apos;B&apos;;<br />
                    (c) Restrain Defendant No. 1 and all parties from collecting rents or interfering with estate property pending disposal of the suit;<br />
                    (d) Direct Defendants to surrender all account books, tenant leases, and keys to the Administrator.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: POWERS SCHEDULE (H3) */}
            <section id="powers-schedule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>ADMINISTRATOR POWERS MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Powers Schedule: Rental Income, Bank Escrow &amp; Taxes
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                A common error in Section 247 petitions is omitting an exact list of powers.
                Without a clear list, the manager must run to court for simple jobs like paying power bills or sending rent letters.
              </p>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-[#C65378]" />
                    <span>Schedule &apos;B&apos;: Standard Powers Schedule</span>
                  </div>
                  <button
                    onClick={copyScheduleToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedSchedule ? "Copied!" : "Copy Schedule"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-emerald-600" />
                      <span>1. Rent Collection &amp; Receipts</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Collect all shop and home rents, give stamped receipts, and collect bank deposit slips from occupants.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-blue-600" />
                      <span>2. Court Escrow Account</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Open a bank account in the manager&apos;s court name and deposit all rent and dividends within 48 hours.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>3. Payment of Municipal Taxes</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Pay civic house taxes, water cess, and GST out of rent income so the city does not seal the property.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Receipt className="w-3.5 h-3.5 text-purple-600" />
                      <span>4. Section 159 ITR Filings</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Hire a Chartered Accountant to file annual income tax returns for the deceased estate on time.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Gavel className="w-3.5 h-3.5 text-rose-600" />
                      <span>5. Eviction of Trespassers</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      File court eviction cases and rent claims against illegal occupants or tenants who refuse to pay.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 space-y-1">
                    <div className="font-bold text-rose-900 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-rose-700" />
                      <span>6. Strict Bar on Corpus Split</span>
                    </div>
                    <p className="text-rose-800 leading-relaxed">
                      Strictly barred from selling, mortgaging, or giving away land corpus until the final court decree.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: SURETY BOND (H3) */}
            <section id="surety-bond" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>SURETY BOND UNDERTAKING</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Solvent Surety Bond &amp; Security Undertaking Format
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under Section 291 of the Indian Succession Act, the court manager must give a formal administration
                bond with solvent sureties before starting their work.
              </p>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <span>Administration Bond (Form No. 115 High Court Rules)</span>
                  </div>
                  <button
                    onClick={copyBondToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedBond ? "Copied!" : "Copy Bond"}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 space-y-2">
                  <p>
                    <strong>PENAL SUM:</strong> Rs. [Penal Sum Amount]/- with two solvent sureties.
                  </p>
                  <p>
                    <strong>CONDITIONS OF BOND:</strong><br />
                    1. The manager will file a full property inventory within six months.<br />
                    2. Will give regular audited accounts to the court taxing master.<br />
                    3. Will not sell, gift, or split the property corpus.<br />
                    4. Will hand over all estate assets when the final decree is passed.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: EVIDENTIARY PROOF (H3) */}
            <section id="evidentiary-proof" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EVIDENTIARY CHECKLIST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Evidentiary Thresholds: Proving Waste &amp; Intermeddling
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                A court will not appoint a manager on simple guesswork. You must bring solid initial proof that estate
                property faces immediate loss or waste.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>1. Bank Account Records</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Proof that shop rents go into the private bank account of one heir instead of a joint estate account.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>2. Civic Tax Notices</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Unpaid house tax bills, water cut notices, or civic warnings showing the building may be sealed.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>3. Tenant Statements</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Letters from commercial tenants stating that one heir demands cash or threatens to force them out.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>4. Income Tax Notices</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Notices under Section 148 or 159 for failing to file the deceased person&apos;s tax returns.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: REGISTRY SOP (H3) */}
            <section id="registry-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>FILING PROCEDURE &amp; SOP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. High Court Filing Procedure: Registry Scrutiny SOP
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Follow these four steps to file an urgent Section 247 petition in the High Court or District Court:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">Filing of Court Petition</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Draft the Section 247 petition with a sworn affidavit, asset list (Schedule A), and powers list (Schedule B).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">Registry Check &amp; Numbering</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The court clerk checks court fees, vakalatnama, and proof of notice served to all caveat holders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">Urgent Hearing &amp; Interim Restraint</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      In emergencies, the judge can stop rent theft right away and name an advocate to take initial stock of assets.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    4
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">Surety Bond &amp; Warrant of Office</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The manager files an administration bond with two solvent sureties. The court then issues the formal warrant.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: LANDMARK RULINGS (H3) */}
            <section id="landmark-rulings" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>JUDICIAL PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Landmark Rulings: Section 247 Discretionary Powers
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Indian High Courts have established clear principles on when to name a Section 247 manager:
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Pandurang Shamrao Laud v. Dwarkadas Kalliandas (AIR 1933 Bom 342)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    The Bombay High Court held that courts have wide discretion under Section 247. The primary goal
                    is to make sure an estate is not left without legal care to collect rents and protect assets.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-slate-900 text-sm">
                    In the Goods of Mohendra Narain Roy (Calcutta High Court)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    The Calcutta High Court ruled that while the manager has wide rights to run the estate,
                    they cannot give away any property corpus until the probate lawsuit is officially decided.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Smt. Sarla Gupta v. State (Delhi High Court)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    The Delhi High Court held that when disputing heirs take rent and skip civic taxes,
                    naming a neutral manager under Section 247 is vital to save the family estate.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: CASE STUDIES (H3) */}
            <section id="case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PRACTICAL CASE STUDIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Studies: Bombay &amp; Delhi High Courts
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase">
                    Delhi High Court • South Extension
                  </div>
                  <div className="font-bold text-slate-900 text-sm">
                    Saving Commercial Rents from Misappropriating Brother
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A father died leaving 4 shops in South Extension yielding ₹4.2 Lakhs monthly. One son
                    claimed under an unproved Will and kept all rent without paying civic tax.
                    The daughter filed under Section 247. The court named an advocate as manager,
                    directed all tenants to pay rent into court escrow, and recovered ₹58 Lakhs safely.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase">
                    Bombay High Court • Nariman Point
                  </div>
                  <div className="font-bold text-slate-900 text-sm">
                    Stopping Estate Default on High-Value Tenanted Office
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In a contested probate trial over a Nariman Point floor, corporate tenants froze ₹8 Lakhs
                    monthly rent due to rival heir notices. The Bombay High Court appointed the Official Receiver
                    as manager under Section 247. Tenants paid rent securely into escrow, preventing tax fines.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: COUNSEL PROFILE (H3) */}
            <section id="counsel-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>LEGAL REVIEW &amp; AUTHORSHIP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Legal Citations &amp; Senior Estate Counsel Profile
              </h3>

              <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    AAM
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Advocate Anuj Anand Malik
                    </div>
                    <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Estate &amp; Testamentary Counsel • AMA Legal Solutions
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Advocate Anuj Anand Malik has 15 years of litigation experience in the Delhi High Court,
                  Bombay High Court, and Supreme Court of India. He represents heirs in contested Will trials,
                  Section 247 petitions, caveat defense, and court receivership matters.
                </p>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-[11px] font-bold text-slate-700">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100">Indian Succession Act, 1925 s. 247</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100">Order XL Rule 1 CPC</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100">Section 291 Administration Bond</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100">Section 159 Income Tax Act</span>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS (H3) */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Section 247 Petitions
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* PLAIN-ENGLISH SUMMARY CARDS */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Protect the Estate Early?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A contested Will case takes years. If no neutral person is in charge, rents get stolen and tax bills
                  pile up. Filing under Section 247 locks the property safely in court care.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A Will does not need stamp paper in India. Writing it clearly on plain paper with two sound witnesses
                  stops bitter family fights and avoids the need for court receivers.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our litigation advocates draft custom Section 247 petitions, represent heirs in High Court testamentary
                  suits, and secure emergency orders to preserve family wealth.
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
                  <div className="font-extrabold text-slate-900 text-sm">Advocate Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in Indian probate litigation, Section 247 ISA petitions, court receiver appointments, and
                High Court testamentary suit defense at AMA Legal Solutions.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT WILL CONTESTS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Children from Bitter Probate Lawsuits
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A clearly drafted, legally registered Will establishes precise ownership, preventing messy lawsuits
                  and court receiver battles among your heirs.
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
                  <span>Lawyer Reviewed &amp; Stamp Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - HIGH COURT TESTAMENTARY SUIT LITIGATION */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>HIGH COURT LITIGATION DESK</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Facing Probate Contest or Siphoning of Estate Rents?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our senior testamentary advocates file urgent Section 247 petitions, secure court escrow orders,
                  and defend contested wills in High Courts across India.
                </p>
                <Link
                  href="/services/high-court-testamentary-suit-contested-will-defense"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Consult Litigation Advocate</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Litigants Choose WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 247 Precision:</strong> High Court compliant petition drafts.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Complete Powers Schedule:</strong> Authorizes rent collection and tax filings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Surety Bond Formats:</strong> Fully aligned with Section 291 ISA rules.
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
          href="#petition-format"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Petition Draft</span>
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
