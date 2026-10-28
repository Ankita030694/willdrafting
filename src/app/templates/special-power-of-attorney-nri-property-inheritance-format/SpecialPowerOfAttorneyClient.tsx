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
  DollarSign,
  Gavel,
  Calculator,
  Percent,
  Copy,
  CheckCheck,
  TrendingUp,
  Sliders,
  Users,
  FileText,
  ArrowDownRight,
  Globe,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. Statutory Framework for NRI PoA" },
  { id: "anti-misuse-safeguards", label: "2. Anti-Misuse Restrictive Clauses" },
  { id: "interactive-poa-builder", label: "3. Interactive Special PoA Builder" },
  { id: "restricted-poa-format", label: "4. Restricted Non-Sale PoA Format" },
  { id: "sale-execution-poa-format", label: "5. Alternative Sale PoA with Escrow" },
  { id: "legal-comparison-matrix", label: "6. Special PoA vs GPA vs Sale PoA" },
  { id: "embassy-vs-apostille-sop", label: "7. Embassy Attestation vs Apostille" },
  { id: "ninety-day-adjudication", label: "8. The 90-Day Adjudication Rule" },
  { id: "mutation-probate-procedure", label: "9. Revenue Mutation & Court Probate" },
  { id: "practical-case-scenarios", label: "10. Real NRI Case Scenarios" },
  { id: "mandatory-document-checklist", label: "11. Embassy & Adjudication Checklist" },
  { id: "capital-gains-tax-link", label: "12. Capital Gains Tax on Sale" },
  { id: "institutional-profile", label: "13. Legal Backing & Advocate Profile" },
  { id: "frequently-asked-questions", label: "14. Frequently Asked Questions" },
  { id: "statutory-citations", label: "15. Statutory Citations & MEA Portals" },
];

const FAQS = [
  {
    q: "What is an NRI Special Power of Attorney for inherited property in India?",
    a: "An NRI Special Power of Attorney (PoA) is a legally binding deed executed by a Non-Resident Indian under the Powers of Attorney Act, 1882. It authorizes a trusted representative in India to carry out specific, narrowly defined acts such as applying for revenue mutation, attending court probate hearings, or transferring society share certificates, while explicitly prohibiting any sale, gift, mortgage, or financial encumbrance of the property.",
  },
  {
    q: "Can a Special Power of Attorney be misused by relatives to sell my property?",
    a: "No, provided you use an 'Anti-Misuse' Restricted Special PoA. Under the landmark Supreme Court ruling in Church of Christ Charitable Trust v. P. Ponniamman, powers of attorney must be strictly construed. Our format incorporates an express negative covenant that explicitly strips the agent of any power to execute conveyance deeds, sign sale agreements, or receive buyer payments, making any attempted unauthorized sale void ab initio.",
  },
  {
    q: "Should an NRI choose Indian Embassy Attestation or the Hague Apostille route?",
    a: "If you reside in a Hague Apostille Convention member country (such as the USA, UK, Canada, Australia, or Germany), getting the PoA notarized locally and apostilled by the designated state authority is legally sufficient and accepted across Indian land revenue offices. If you reside in a non-apostille country (such as the UAE, Saudi Arabia, or Singapore), you must get the PoA attested by the Consular Officer at the Indian Embassy or Consulate.",
  },
  {
    q: "What is the 90-day adjudication rule under Section 18 of the Indian Stamp Act?",
    a: "Under Section 18 of the Indian Stamp Act, 1899, any legal instrument executed outside India must be stamped and adjudicated before the Collector of Stamps or District Registrar within three months (90 days) of its first receipt in India. Missing this 90-day deadline attracts heavy statutory penalties ranging from two to ten times the deficit stamp duty.",
  },
  {
    q: "Does an NRI Special Power of Attorney for mutation require registration?",
    a: "Under Section 17 and 18 of the Registration Act, 1908, a Special PoA that is confined strictly to revenue mutation, court appearance, and utility transfer does not compulsorily require registration in all states because it creates no proprietary title. However, the PoA MUST be duly stamped and adjudicated under Section 18 of the Stamp Act. If the PoA authorizes execution of a registered conveyance or sale deed, registration before the Sub-Registrar under Sections 32 and 33 is mandatory.",
  },
  {
    q: "Can my attorney sign probate or letters of administration petitions for me?",
    a: "Yes. Under Sections 228 and 241 of the Indian Succession Act, 1925, an authorized attorney can apply for Letters of Administration with the Will annexed or represent the NRI legal heir in ongoing probate proceedings before the District Judge or High Court.",
  },
  {
    q: "How can an NRI revoke a Special Power of Attorney from abroad?",
    a: "Under Section 201 of the Indian Contract Act, 1872, the principal can revoke a PoA at any time by executing a formal Deed of Revocation. To make it effective, the NRI must serve written notice of revocation upon the attorney, deliver copies to the Tehsildar, Sub-Registrar, and housing society, and publish a public notice in a local daily newspaper.",
  },
  {
    q: "Can the attorney receive inherited property sale proceeds in their own bank account?",
    a: "Strictly no. To comply with Foreign Exchange Management Act (FEMA) regulations and prevent financial fraud, any sale deed executed through an attorney must mandate that all sale consideration cheques, RTGS, or wire transfers be drawn directly and exclusively in favor of the NRI principal's Indian NRO or NRE bank account.",
  },
];

export default function SpecialPowerOfAttorneyClient() {
  const router = useRouter();
  const { data: session } = useSession();

  // Navigation & Scroll spy
  const [activeId, setActiveId] = useState<string>("statutory-framework");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Copy feedbacks
  const [copiedFormat1, setCopiedFormat1] = useState<boolean>(false);
  const [copiedFormat2, setCopiedFormat2] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [copiedCustomClause, setCopiedCustomClause] = useState<boolean>(false);

  // Interactive Builder State
  const [nriCountry, setNriCountry] = useState<string>("USA");
  const [authRoute, setAuthRoute] = useState<string>("apostille");
  const [propertyState, setPropertyState] = useState<string>("Delhi");
  const [attorneyRelation, setAttorneyRelation] = useState<string>("Sibling");
  const [scopeOption, setScopeOption] = useState<string>("mutation_probate_only");
  const [validityPeriod, setValidityPeriod] = useState<string>("completion");

  // ScrollSpy observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
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

  const handleStartDraft = () => {
    if (session) {
      router.push("/start");
    } else {
      window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_EVENT));
    }
  };

  const handlePrintSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (!el) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Special Power of Attorney - WillDrafting.in</title>
          <style>
            body { font-family: 'Times New Roman', Times, serif; padding: 40px; line-height: 1.6; color: #111; }
            h1, h2 { text-align: center; }
            pre { white-space: pre-wrap; font-family: inherit; font-size: 14px; }
          </style>
        </head>
        <body>
          ${el.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const copyToClipboard = (text: string, setFn: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 3000);
  };

  const RESTRICTED_POA_TEXT = `SPECIAL POWER OF ATTORNEY FOR INHERITED PROPERTY
(FOR REVENUE MUTATION, PROBATE & SOCIETY TRANSFER ONLY - NON-SALE)

TO ALL TO WHOM THESE PRESENTS SHALL COME, I, [Full Name of NRI Principal], aged about [Age] years, son/daughter of [Father/Mother Name], residing at [Complete Residential Address Abroad with Zip/Postal Code], holder of Indian / Foreign Passport No. [Passport Number] issued at [Place of Issue], and Indian Permanent Account Number (PAN) [PAN Number], hereinafter referred to as the "PRINCIPAL" (which expression shall unless repugnant to the context mean and include my legal heirs, executors, administrators, and assigns);

SEND GREETINGS:

WHEREAS my late [Father/Mother/Relative Name], [Name of Deceased Testator/Original Owner], departed this life on [Date of Death] at [Place of Demise], leaving behind his/her Last Will and Testament dated [Date of Will] / dying intestate leaving behind surviving Class I legal heirs;

AND WHEREAS by virtue of testamentary succession / intestate inheritance under the Hindu Succession Act, 1956 / Indian Succession Act, 1925, I, the Principal, have inherited and acquired an absolute undivided [Percentage, e.g. 50% / 100%] share, right, title, and interest in the immovable property described in the SCHEDULE hereunder written (hereinafter referred to as the "SCHEDULE PROPERTY");

AND WHEREAS I am presently permanently / gainfully residing outside India at [Country of Residence], and by reason of my professional occupations, personal obligations, and international travel constraints, I am unable to personally travel to India or attend the statutory offices of the Tehsildar, Sub-Registrar, Municipal Corporation, Co-operative Housing Society, or Courts of Law in India;

AND WHEREAS I have full confidence and trust in my [Relationship, e.g. brother/sister/cousin/authorized representative], [Full Name of Attorney], aged about [Age] years, son/daughter of [Parent Name], residing at [Complete Address in India], holding Aadhaar No. [Aadhaar Number] and PAN [PAN Number], hereinafter referred to as the "ATTORNEY";

NOW KNOW YE ALL AND THESE PRESENTS WITNESSETH that I, the Principal, do hereby nominate, constitute, and appoint the said [Full Name of Attorney] as my true and lawful SPECIAL ATTORNEY for me, in my name, and on my behalf, to do, perform, and execute strictly the following acts, deeds, and things in respect of the Schedule Property:

1. REVENUE MUTATION & KHATA/PATTA TRANSFER:
To appear before the competent Tehsildar, Naib Tehsildar, Talati, Patwari, Revenue Circle Officer, or Land Records Authority having territorial jurisdiction over the Schedule Property, to submit necessary applications, declarations, pedigrees (Vamshavali / Pedhinama), and affidavits for recording my name as the lawful owner/co-heir, and to obtain the sanctioned Mutation Order, Jamabandi, Fard, Khata Extract, 7/12 Extract, or Patta in my favor.

2. MUNICIPAL & LOCAL AUTHORITY FORMALITIES:
To represent me before the Municipal Corporation / Development Authority (e.g. DDA / MHADA / BDA / HUDA / CIDCO) for assessment and transfer of property tax records, water connection, electricity meter, and sewerage accounts into my name, and to pay all requisite statutory transfer fees, development charges, and outstanding property tax arrears against official receipts.

3. HOUSING SOCIETY / RWA MEMBERSHIP TRANSMISSION:
To appear before the Managing Committee of the Co-operative Housing Society (CHS) / Resident Welfare Association (RWA) / Apartment Owners Association, submit transmission forms, death certificates, NOCs, and indemnity bonds, and secure the transfer and endorsement of the original Share Certificate and membership rights in my name.

4. TESTAMENTARY & COURT PROCEEDINGS:
To institute, defend, represent, and sign petitions, applications, verification affidavits, and caveat responses in ongoing or prospective proceedings for Probate, Letters of Administration, Succession Certificate, or Declaration of Title before any competent Civil Court, District Court, or High Court in India, and to engage advocates, sign vakalatnamas, and accept service of judicial summons on my behalf.

5. CUSTODY OF ORIGINAL TITLE DEEDS & DOCUMENTS:
To receive, accept delivery of, and issue valid acknowledgment receipts for sanctioned mutation copies, society share certificates, water/electricity sanction orders, and certified court decrees relating to the transmission of the Schedule Property.

--------------------------------------------------------------------------------
EXPRESS NEGATIVE COVENANT & ANTI-MISUSE RESTRICTION (STRICT NON-SALE CLAUSE):
--------------------------------------------------------------------------------
PROVIDED ALWAYS AND IT IS HEREBY EXPRESSLY AGREED, DECLARED, AND RESTRICTED that my said Attorney SHALL HAVE STRICTLY NO POWER, AUTHORITY, OR RIGHT TO:
(a) Sell, convey, alienate, gift, exchange, or transfer the Schedule Property or any part or share thereof to any third party or to himself/herself;
(b) Enter into any Agreement to Sell, Memorandum of Understanding (MoU), or receipt for earnest money or advance token deposit;
(c) Mortgage, hypothecate, charge, pledge, or create any lien, encumbrance, or financial liability against the Schedule Property;
(d) Grant long-term lease exceeding 11 months or surrender tenancy or license rights;
(e) Receive any sale consideration, earnest deposit, or monetary compensation on my behalf.
ANY ATTEMPTED CONVEYANCE, SALE AGREEMENT, MORTGAGE, OR ENCUMBRANCE EXECUTED BY THE SAID ATTORNEY IN CONTRAVENTION OF THIS EXPRESS RESTRICTION SHALL BE NULL, VOID AB INITIO, AND ULTRA VIRES, CONFERRING NO RIGHT, TITLE, OR INTEREST ON ANY PURCHASER OR THIRD PARTY.

REVOCATION & TERMINATION:
This Special Power of Attorney shall remain valid strictly until the completion of the revenue mutation and court probate transmission or until [Date of Expiry, if applicable], unless revoked earlier by me in writing. I reserve the absolute right to revoke or cancel this instrument at any time by delivering written notice to the Attorney.

RATIFICATION:
I, the Principal, hereby ratify and confirm and agree to ratify and confirm whatsoever lawful acts my said Attorney shall lawfully do or cause to be done in accordance with the specific powers herein granted.

SCHEDULE OF THE PROPERTY
(Details of the Inherited Real Estate)
- Property Address: [Complete Municipal/Postal Address with Pin Code]
- Survey / Khasra / Plot / Flat No.: [Plot / Survey / Flat / Unit Number]
- Society / Building / Project Name: [Name of Cooperative Society / Tower]
- Ward / Tehsil / Registration Sub-District: [Tehsil & SRO Location]
- Boundaries:
  * North: [Details / Adjacent Road / Plot]
  * South: [Details / Adjacent Road / Plot]
  * East:  [Details / Adjacent Road / Plot]
  * West:  [Details / Adjacent Road / Plot]

IN WITNESS WHEREOF, I, [Full Name of NRI Principal], have executed and signed these presents at [City, Country of Residence Abroad] on this [Day] day of [Month], [Year 202X].


_____________________________________
[SIGNATURE OF PRINCIPAL / EXECUTANT]
[Full Name of NRI Principal]
Passport No.: [Passport Number]


WITNESSES:
1. Signature: __________________________
   Name: [Full Name of Witness 1]
   Passport / ID No.: [ID Number]
   Address: [Address Abroad]

2. Signature: __________________________
   Name: [Full Name of Witness 2]
   Passport / ID No.: [ID Number]
   Address: [Address Abroad]


NOTARIAL / CONSULAR AUTHENTICATION CERTIFICATE:
Executed and signed before me by the Principal, [Full Name of NRI Principal], who has been identified by his/her Passport No. [Passport Number], on this [Date] at [City, Country].
[SEAL & SIGNATURE OF CONSULAR OFFICER / NOTARY PUBLIC / APOSTILLE]`;

  const SALE_POA_TEXT = `SPECIAL POWER OF ATTORNEY FOR SALE OF INHERITED PROPERTY
(WITH MANDATORY DIRECT NRI BANK ACCOUNT ROUTING & ANTI-FRAUD SAFEGUARD)

TO ALL TO WHOM THESE PRESENTS SHALL COME, I, [Full Name of NRI Principal], aged [Age] years, residing at [Overseas Address], holder of Passport No. [Passport Number] and Indian PAN [PAN Number], hereinafter referred to as the "PRINCIPAL";

DO HEREBY NOMINATE AND APPOINT [Full Name of Attorney], residing at [Indian Address], holding Aadhaar No. [Aadhaar Number] and PAN [PAN Number], as my lawful SPECIAL ATTORNEY to execute the Conveyance/Sale Deed of the Schedule Property on the STRICT CONDITIONS set forth herein:

1. EXECUTION OF REGISTERED SALE DEED:
To appear before the competent Sub-Registrar of Assurances having jurisdiction over the Schedule Property, present for registration, admit execution, and sign the final Sale Deed / Conveyance Deed in favor of the designated Buyer, [Full Name of Buyer].

2. MANDATORY ESCROW & DIRECT NRI BANK PAYMENT COVENANT:
IT IS A STRICT CONDITION PRECEDENT of this Power of Attorney that the Attorney SHALL NOT receive, collect, or accept any part of the sale consideration, advance deposit, or balance payment in cash or in the Attorney's personal bank account.
ALL PAYMENTS OF SALE CONSIDERATION (INCLUDING EARNEST MONEY AND BALANCE AMOUNT) SHALL BE PAID EXCLUSIVELY VIA ACCOUNT PAYEE CHEQUE, RTGS, NEFT, OR WIRE TRANSFER DRAWN DIRECTLY IN THE NAME OF:
- Account Holder Name: [Full Name of NRI Principal]
- Account Type: Non-Resident Ordinary (NRO) / Non-Resident External (NRE) Account
- Account Number: [Bank Account Number]
- Bank Name & Branch: [Bank Name, Branch & IFSC / SWIFT Code]
ANY SALE DEED EXECUTED WITHOUT COMPLIANCE WITH THIS DIRECT NRI REMITTANCE COVENANT SHALL BE DEEMED FRAUDULENT AND VOIDABLE AT THE INSTANCE OF THE PRINCIPAL.

3. TAX DEDUCTION AT SOURCE (TDS) COMPLIANCE:
To submit the Section 197 Lower / Nil TDS Deduction Certificate issued by the Income Tax Department (Form 13) to the Buyer and verify that TDS deducted under Section 195 is credited to the Principal's PAN [PAN Number].

[SCHEDULE OF PROPERTY, PRINCIPAL SIGNATURE, TWO WITNESSES, AND CONSULAR ATTESTATION]`;

  const CHECKLIST_TEXT = `MANDATORY DOCUMENT CHECKLIST FOR NRI SPECIAL POWER OF ATTORNEY:
1. Clean Printout of Special PoA Deed on A4 bond paper (Do NOT sign prior to appointment!).
2. Two passport-size color photographs of the NRI Principal with white background.
3. Original Indian Passport / Foreign Passport + OCI Card with self-attested photocopies.
4. Proof of Overseas Residence Address (Driver's License / Utility Bill / Bank Statement / Residence Visa).
5. Chain of Title Documents for Indian Property:
   - Registered Purchase Deed of late parent / testator.
   - Death Certificate of parent (with apostille/consular attestation if parent died abroad).
   - Copy of Registered Will / Probate Order / Legal Heir Certificate / Surviving Member Certificate.
6. Identity Proof of the Appointed Attorney in India (Photocopy of Indian PAN Card & Aadhaar Card).
7. Two adult witnesses with valid government photo IDs (in USA/UK, local notary or embassy witnesses).
8. Consular Fee / Apostille Processing Fee receipt.
9. Courier Tracking Receipt (Preserve international courier receipt proving date of entry into India for 90-day Stamp Act adjudication!).`;

  // Custom clause generator logic
  const generateCustomClause = () => {
    let powers = "";
    if (scopeOption === "mutation_probate_only") {
      powers = `1. Apply for and obtain sanctioned Revenue Mutation, Jamabandi, and Khata in the Office of the Tehsildar / Land Revenue Authority in the State of ${propertyState}.\n2. Represent the Principal in Testamentary & Probate proceedings before the competent Court in India under the Indian Succession Act, 1925.\n3. Transfer municipal property tax, water, and electricity meters in the Principal's name.`;
    } else if (scopeOption === "society_khata_only") {
      powers = `1. Submit transmission application, NOCs, and legal heir indemnity bonds before the Managing Committee of the Housing Society / RWA.\n2. Obtain endorsement of society share certificates in the name of the Principal.\n3. Settle all society maintenance dues and obtain No Dues Certificate.`;
    } else {
      powers = `1. Execute and register the formal Conveyance/Sale Deed before the Sub-Registrar.\n2. All sale proceeds MUST be credited directly to the Principal's NRO/NRE Bank Account. Attorney has ZERO authority to handle cash.`;
    }

    const authText =
      authRoute === "apostille"
        ? `Executed in ${nriCountry} with Hague Apostille Certificate under the Apostille Convention 1961.`
        : `Executed in ${nriCountry} with Consular Attestation under Diplomatic & Consular Officers (Oaths and Fees) Act, 1848.`;

    const expText =
      validityPeriod === "completion"
        ? `Valid until the completion of mutation and court proceedings.`
        : `Valid for a fixed period of 12 months from the date of execution.`;

    return `// CUSTOM SPECIAL POWER OF ATTORNEY CLAUSE FOR ${nriCountry.toUpperCase()} NRI
// JURISDICTION: ${propertyState.toUpperCase()} | ATTORNEY RELATION: ${attorneyRelation.toUpperCase()}
// AUTHENTICATION ROUTE: ${authText}

SPECIFIC CONFERRED POWERS:
${powers}

EXPRESS ANTI-MISUSE RESTRICTION:
"The Attorney shall have STRICTLY NO POWER to mortgage, pledge, or alienate the Schedule Property. Any transaction creating financial liability shall be ultra vires and void ab initio."

VALIDITY & TERMINATION:
${expText}`;
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Navy - Matching Tool Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>POWERS OF ATTORNEY ACT, 1882 • REGISTRATION ACT SS. 32 &amp; 33 • 90-DAY ADJUDICATION RULE</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            NRI Special Power of Attorney Format for Inherited Property
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download the legally vetted <strong>Anti-Misuse Special PoA format</strong> designed specifically
            for Non-Resident Indians. Authorize trusted representatives in India for revenue mutation, court
            probate, and housing society transmission with an express negative covenant strictly prohibiting
            unauthorized sale or encumbrance.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#restricted-poa-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileCheck className="w-4 h-4" />
              <span>Get Anti-Misuse PoA Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services/nri-will-india"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Users className="w-4 h-4 text-[#C65378]" />
              <span>NRI Property Legal Services</span>
            </Link>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 18 Stamp Act</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                90-DAY ADJUDICATION RULE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Anti-Misuse</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STRICTLY NON-SALE CLAUSE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 32 &amp; 33</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                EMBASSY &amp; APOSTILLE VALID
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">100% Shielded</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DIRECT NRI BANK ROUTING
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

            {/* Statutory Compliance Box */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Governing Statutes</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Powers of Attorney Act 1882, Registration Act 1908 (Sections 32 &amp; 33),
                Indian Stamp Act 1899 (Section 18 adjudication), and Supreme Court precedents Suraj Lamp
                and Church of Christ.
              </p>
            </div>

            {/* Quick Consultation Reminder */}
            <div className="rounded-2xl bg-gradient-to-br from-[#172228] to-slate-800 text-white p-4 text-xs space-y-3">
              <div className="font-bold flex items-center gap-1.5 text-rose-300">
                <Gavel className="w-3.5 h-3.5" />
                <span>Need End-to-End Representation?</span>
              </div>
              <p className="text-white/80 leading-relaxed text-[11px]">
                AMA Legal Solutions provides full consular attestation drafting, courier handling, stamp
                adjudication, and Tehsildar representation.
              </p>
              <Link
                href="/services/nri-will-india"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#C65378] hover:bg-[#a33b5c] px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>Explore NRI Services</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* EXECUTIVE BRIEF BANNER */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: NRI INHERITED PROPERTY POWER OF ATTORNEY</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Anti-Misuse Protection:</strong> Generic PoAs grant broad powers that unscrupulous
                    relatives misuse to sell or mortgage inherited property. Our restricted format limits
                    authority strictly to mutation, court probate, and society transfer.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Embassy vs. Apostille:</strong> If you reside in Hague Apostille countries (USA, UK,
                    Canada, Australia, Germany), local notarization plus state Apostille is legally valid in
                    India. In non-apostille jurisdictions (UAE, Singapore, Saudi Arabia), Indian Embassy
                    attestation is mandatory.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict 90-Day Stamp Rule:</strong> Under Section 18 of the Indian Stamp Act, 1899,
                    the PoA must be presented before the Collector of Stamps / District Registrar for stamp
                    duty adjudication within 90 days of arriving in India.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Cash Handling for Sales:</strong> If you authorize the attorney to execute a
                    Sale Deed, our alternative format mandates that 100% of the sale consideration must be wired
                    directly into the NRI&rsquo;s Indian NRO/NRE account.
                  </span>
                </li>
              </ul>
            </div>

            {/* FEATURED VISUAL ASSET: OFFICIAL OPENGRAPH IMAGE EMBEDDED */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src="/images/special-power-of-attorney-nri-property-inheritance-format-og.jpg"
                  alt="NRI Special Power of Attorney Format for Inherited Property Mutation and Probate"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 850px"
                />
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-700/50">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>VERIFIED STATUTORY TEMPLATE • WAVE 2 CORE ASSET</span>
                  </div>
                  <div className="text-xs text-white/80">
                    Compliant with Powers of Attorney Act 1882, Registration Act 1908 &amp; Indian Stamp Act 1899.
                  </div>
                </div>
                <a
                  href="#restricted-poa-format"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-colors shadow-xs"
                >
                  <span>Jump to Complete Draft</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL GOVERNANCE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Framework: NRI Power of Attorney in India
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When Non-Resident Indians (NRIs), Overseas Citizens of India (OCIs), or Persons of Indian Origin
                  (PIOs) inherit immovable property in India following the death of their parents or ancestors,
                  they face a complex transmission gauntlet. Between local Tehsildar mutation hearings, Municipal
                  Khata extraction, Housing Society share transfer meetings, and District or High Court probate
                  proceedings, physical presence in India is routinely required for 6 to 18 months.
                </p>
                <p>
                  Because residing in India for months is practically unfeasible for busy overseas professionals,
                  the legal system provides a statutory bridge through the <strong>Powers of Attorney Act, 1882</strong>.
                  Under Section 1A and Section 2 of the Act, an instrument of power of attorney executed by the
                  principal authorizes the attorney to execute documents and perform acts with the same legal
                  force as if performed by the principal in person.
                </p>
                <p>
                  However, international execution introduces rigid jurisdictional hurdles under the{" "}
                  <strong>Registration Act, 1908 (Sections 32 &amp; 33)</strong> and the{" "}
                  <strong>Indian Stamp Act, 1899 (Section 18)</strong>. For a power of attorney executed abroad
                  to be legally admissible before an Indian Sub-Registrar, revenue officer, or civil judge, it
                  must strictly satisfy cross-border consular authentication or Hague Apostille certification,
                  followed by statutory stamp duty adjudication upon entering Indian territory.
                </p>
              </div>
            </section>

            {/* SECTION 2: ANTI-MISUSE SAFEGUARDS */}
            <section id="anti-misuse-safeguards" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>RISK PREVENTION &amp; LITIGATION DEFENSE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Anti-Misuse Special PoA: Restricting Authority on Assets
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The biggest blind spot in conventional legal documentation is the dangerous reliance on generic
                  &ldquo;General Power of Attorney&rdquo; (GPA) templates downloaded from internet forums or local
                  typists. These generic drafts routinely contain broad, unconstrained clauses authorizing the
                  attorney to <em>&ldquo;sell, mortgage, lease, exchange, manage, receive monies, execute deeds,
                  and sign all instruments.&rdquo;</em>
                </p>
                <div className="rounded-2xl bg-amber-50/80 border border-amber-200/90 p-5 space-y-2 text-xs sm:text-sm text-amber-950">
                  <div className="font-bold flex items-center gap-2 text-amber-800 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>The Danger of Overly Broad General Power of Attorney:</span>
                  </div>
                  <p>
                    Every year, hundreds of NRIs find their ancestral apartments, agricultural holdings, and family
                    bungalows mortgaged or sold behind their backs by distant cousins, uncles, or domestic brokers
                    who misused broad GPA clauses. Once a registered conveyance deed is executed before an SRO,
                    cancelling it requires multi-year title litigation before civil courts.
                  </p>
                </div>
                <p>
                  To eliminate this catastrophic risk, our format utilizes an <strong>&ldquo;Anti-Misuse&rdquo;
                  Restricted Special Power of Attorney</strong>. This instrument is drafted in strict adherence
                  to the Supreme Court of India&rsquo;s doctrine in{" "}
                  <strong><em>Church of Christ Charitable Trust v. P. Ponniamman Educational Trust (2012) 8 SCC 706</em></strong>,
                  which established that powers of attorney must be strictly construed. An attorney possesses only
                  those precise, enumerated powers explicitly written in the four corners of the deed.
                </p>
                <p>
                  Furthermore, under the historic judgment in{" "}
                  <strong><em>Suraj Lamp &amp; Industries Pvt. Ltd. v. State of Haryana (2012) 1 SCC 656</em></strong>,
                  the Supreme Court ruled that a power of attorney is purely an agency instrument; it does not
                  transfer ownership title. By embedding an <strong>express negative covenant</strong> in the deed,
                  our template legally disables the attorney from selling, gifting, or creating financial
                  encumbrances, ensuring absolute peace of mind for the NRI principal.
                </p>
              </div>
            </section>

            {/* SECTION 3: INTERACTIVE POA CLAUSE BUILDER */}
            <section id="interactive-poa-builder" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sliders className="w-4 h-4" />
                <span>INTERACTIVE CUSTOMIZER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Interactive Tool: Custom Special PoA Clause Builder
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Configure your specific overseas jurisdiction, target Indian state, and representation needs
                below to instantly generate a legally customized Special PoA clause pack.
              </p>

              {/* Tool Configurator Panel */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Country Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>NRI Country of Residence</span>
                    </label>
                    <select
                      value={nriCountry}
                      onChange={(e) => {
                        setNriCountry(e.target.value);
                        if (["UAE", "Singapore", "Saudi Arabia", "Qatar", "Kuwait"].includes(e.target.value)) {
                          setAuthRoute("embassy");
                        } else {
                          setAuthRoute("apostille");
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 font-semibold text-xs sm:text-sm focus:ring-2 focus:ring-[#C65378] focus:bg-white outline-hidden"
                    >
                      <option value="USA">United States (USA)</option>
                      <option value="UK">United Kingdom (UK)</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="UAE">United Arab Emirates (UAE)</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Germany">Germany (EU)</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                    </select>
                  </div>

                  {/* Authentication Track */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-[#5F7E75]" />
                      <span>Authentication Route</span>
                    </label>
                    <select
                      value={authRoute}
                      onChange={(e) => setAuthRoute(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 font-semibold text-xs sm:text-sm focus:ring-2 focus:ring-[#C65378] focus:bg-white outline-hidden"
                    >
                      <option value="apostille">Hague Apostille Certificate (Apostille Convention)</option>
                      <option value="embassy">Indian Embassy / Consulate Attestation</option>
                    </select>
                  </div>

                  {/* Property State in India */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Property Location (State)</span>
                    </label>
                    <select
                      value={propertyState}
                      onChange={(e) => setPropertyState(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 font-semibold text-xs sm:text-sm focus:ring-2 focus:ring-[#C65378] focus:bg-white outline-hidden"
                    >
                      <option value="Delhi">Delhi NCT (MCD / DDA / High Court)</option>
                      <option value="Maharashtra">Maharashtra (Mumbai / Pune - 7/12 &amp; CHS)</option>
                      <option value="Punjab">Punjab (Jamabandi, Fard &amp; Tehsildar)</option>
                      <option value="Haryana">Haryana (Gurugram / Faridabad - HSVP)</option>
                      <option value="Karnataka">Karnataka (Bengaluru - e-Khata &amp; BDA)</option>
                      <option value="Uttar Pradesh">Uttar Pradesh (Noida / Lucknow - Khatauni)</option>
                      <option value="Tamil Nadu">Tamil Nadu (Chennai - Patta &amp; Chitta)</option>
                      <option value="Gujarat">Gujarat (Ahmedabad - City Survey &amp; Talati)</option>
                    </select>
                  </div>

                  {/* Scope of Authority */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Scope of Authority Conferred</span>
                    </label>
                    <select
                      value={scopeOption}
                      onChange={(e) => setScopeOption(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 font-semibold text-xs sm:text-sm focus:ring-2 focus:ring-[#C65378] focus:bg-white outline-hidden"
                    >
                      <option value="mutation_probate_only">Revenue Mutation &amp; Court Probate ONLY (Non-Sale)</option>
                      <option value="society_khata_only">Housing Society Transmission &amp; Municipal Khata ONLY</option>
                      <option value="sale_with_direct_nro">Sale Execution (Strict Direct NRO Wire Routing)</option>
                    </select>
                  </div>

                  {/* Attorney Relationship */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#5F7E75]" />
                      <span>Appointed Attorney Relationship</span>
                    </label>
                    <select
                      value={attorneyRelation}
                      onChange={(e) => setAttorneyRelation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 font-semibold text-xs sm:text-sm focus:ring-2 focus:ring-[#C65378] focus:bg-white outline-hidden"
                    >
                      <option value="Sibling">Brother / Sister (Blood Relative)</option>
                      <option value="Parent">Surviving Parent / Spouse</option>
                      <option value="Cousin">Cousin / Uncle / Nephew (Extended Family)</option>
                      <option value="Advocate">Practicing Advocate / Law Firm</option>
                      <option value="Trusted Friend">Trusted Friend / Local Manager</option>
                    </select>
                  </div>

                  {/* Validity Period */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Validity &amp; Expiry Clause</span>
                    </label>
                    <select
                      value={validityPeriod}
                      onChange={(e) => setValidityPeriod(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 font-semibold text-xs sm:text-sm focus:ring-2 focus:ring-[#C65378] focus:bg-white outline-hidden"
                    >
                      <option value="completion">Expires Automatically upon Completion of Mutation</option>
                      <option value="12months">Fixed 12 Months Expiry Window</option>
                    </select>
                  </div>
                </div>

                {/* Generated Custom Clause Box */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Live Tailored Special PoA Clause:</span>
                    </span>
                    <button
                      onClick={() => copyToClipboard(generateCustomClause(), setCopiedCustomClause)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold text-xs transition-colors"
                    >
                      {copiedCustomClause ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCustomClause ? "Copied!" : "Copy Clause"}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
                    {generateCustomClause()}
                  </pre>
                </div>
              </div>
            </section>

            {/* SECTION 4: DOWNLOADABLE FORMAT 1 - RESTRICTED NON-SALE */}
            <section id="restricted-poa-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>PRIMARY TEMPLATE BOX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Downloadable Format: Restricted Non-Sale Special PoA
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                This is the complete, statutory <strong>Anti-Misuse Special Power of Attorney format</strong>.
                It restricts the attorney solely to revenue mutation, municipal tax Khata, housing society share
                transfer, and court probate proceedings, while barring any sale, mortgage, or financial encumbrance.
              </p>

              {/* Template Container with Copy & Print Controls */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs">
                      NON-SALE RESTRICTED
                    </span>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      Powers of Attorney Act, 1882 Compliant
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(RESTRICTED_POA_TEXT, setCopiedFormat1)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold text-xs transition-colors"
                    >
                      {copiedFormat1 ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedFormat1 ? "Copied Format!" : "Copy Full Format"}</span>
                    </button>
                    <button
                      onClick={() => handlePrintSection("poa-format-1-container")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Draft</span>
                    </button>
                  </div>
                </div>

                <div
                  id="poa-format-1-container"
                  className="max-h-[550px] overflow-y-auto p-4 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200 text-slate-800 text-xs sm:text-sm font-mono leading-relaxed whitespace-pre-wrap selection:bg-[#C65378] selection:text-white"
                >
                  {RESTRICTED_POA_TEXT}
                </div>
              </div>
            </section>

            {/* SECTION 5: ALTERNATIVE FORMAT 2 - SALE EXECUTION WITH ESCROW */}
            <section id="sale-execution-poa-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>AUTHORIZED SALE VARIANT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Alternative Format: Special PoA for Sale with Escrow
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When the NRI heir has already concluded revenue mutation and now desires to sell the inherited
                  property, physical presence before the Sub-Registrar can be substituted by executing a{" "}
                  <strong>Special Power of Attorney for Sale</strong>.
                </p>
                <p>
                  To eliminate the risk of the attorney pocketing token cash or depositing sale proceeds into
                  personal accounts, this specialized format incorporates an <strong>Anti-Cash &amp; Mandatory
                  Direct NRO Bank Wire Covenant</strong>. Under this clause, any sale deed where consideration is
                  not drawn directly in favor of the NRI principal&rsquo;s Indian bank account is automatically voidable.
                </p>
              </div>

              {/* Template Container for Format 2 */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold text-xs">
                      SALE WITH DIRECT NRO REMITTANCE
                    </span>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      FEMA 21(R) &amp; Section 195 TDS Ready
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(SALE_POA_TEXT, setCopiedFormat2)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold text-xs transition-colors"
                    >
                      {copiedFormat2 ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedFormat2 ? "Copied Format!" : "Copy Sale PoA"}</span>
                    </button>
                    <button
                      onClick={() => handlePrintSection("poa-format-2-container")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Draft</span>
                    </button>
                  </div>
                </div>

                <div
                  id="poa-format-2-container"
                  className="max-h-[450px] overflow-y-auto p-4 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200 text-slate-800 text-xs sm:text-sm font-mono leading-relaxed whitespace-pre-wrap"
                >
                  {SALE_POA_TEXT}
                </div>
              </div>
            </section>

            {/* SECTION 6: STRUCTURED COMPARISON TABLE */}
            <section id="legal-comparison-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>COMPARATIVE ANALYSIS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Legal Comparison: Special PoA vs GPA vs Sale Deed PoA
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Understanding the critical statutory distinctions between different powers of attorney prevents
                costly litigation and unauthorized property alienation.
              </p>

              {/* Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700 divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="py-3 px-4 font-bold">Key Legal Parameter</th>
                      <th className="py-3 px-4 font-bold text-rose-300">Restricted Special PoA (Our Template)</th>
                      <th className="py-3 px-4 font-bold text-slate-300">Generic General PoA (GPA)</th>
                      <th className="py-3 px-4 font-bold text-emerald-300">Sale Execution PoA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">Conferred Scope</td>
                      <td className="py-3 px-4 font-medium text-[#C65378]">Specific acts ONLY (Mutation/Probate/CHS)</td>
                      <td className="py-3 px-4 text-slate-600">Broad, universal authority on all properties</td>
                      <td className="py-3 px-4 text-slate-600">Specific authority to sign Conveyance Deed</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">Power to Sell / Mortgage</td>
                      <td className="py-3 px-4 font-bold text-emerald-600">STRICTLY PROHIBITED (Void ab initio)</td>
                      <td className="py-3 px-4 font-bold text-rose-600">Full Power (Extremely High Risk)</td>
                      <td className="py-3 px-4 text-slate-600">Permitted for designated buyer &amp; consideration</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">Handling Sale Monies</td>
                      <td className="py-3 px-4 text-slate-600">Zero monetary authority</td>
                      <td className="py-3 px-4 font-bold text-rose-600">Attorney can collect cash / cheques</td>
                      <td className="py-3 px-4 font-medium text-emerald-600">Direct wire to NRI NRO/NRE account only</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">Stamp Duty Adjudication</td>
                      <td className="py-3 px-4 text-slate-600">Nominal (₹100 to ₹1,000 depending on State)</td>
                      <td className="py-3 px-4 text-slate-600">Nominal for blood relatives; high for others</td>
                      <td className="py-3 px-4 text-slate-600">Conveyance duty adjustment / SRO adjudication</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">SRO Registration Mandate</td>
                      <td className="py-3 px-4 text-slate-600">Not compulsory in most states (Adjudication is)</td>
                      <td className="py-3 px-4 text-slate-600">Compulsory in Maharashtra, UP, Punjab, Haryana</td>
                      <td className="py-3 px-4 font-bold text-slate-900">Compulsory under Reg. Act ss. 32 &amp; 33</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">Ease of Revocation</td>
                      <td className="py-3 px-4 text-slate-600">Revocable at any time by written notice</td>
                      <td className="py-3 px-4 text-slate-600">Difficult if coupled with consideration / interest</td>
                      <td className="py-3 px-4 text-slate-600">Revocable before registration of Sale Deed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 7: EMBASSY ATTESTATION VS HAGUE APOSTILLE SOP */}
            <section id="embassy-vs-apostille-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>OVERSEAS EXECUTION PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Embassy Attestation vs Hague Apostille: Complete SOP
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To make a Power of Attorney executed abroad admissible in India, an NRI must follow one of two
                  statutory authentication routes depending on the country of overseas residence:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Track 1: Apostille */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-rose-50 text-[#C65378]">
                        <CheckCircle2 className="w-5 h-5" />
                      </span>
                      <div>
                        <div className="font-bold text-slate-900 text-sm sm:text-base">TRACK A: Hague Apostille Route</div>
                        <div className="text-[11px] text-slate-500">USA, UK, Canada, Australia, Germany, EU</div>
                      </div>
                    </div>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
                      <li>
                        <strong>Step 1:</strong> Print the draft on clean white A4 paper. Do not sign yet.
                      </li>
                      <li>
                        <strong>Step 2:</strong> Appear before a local Notary Public in your city with two adult
                        witnesses and your passport. Sign the deed in the presence of the notary.
                      </li>
                      <li>
                        <strong>Step 3:</strong> Submit the notarized PoA to the designated state authority
                        (e.g., Secretary of State in the US, Foreign Commonwealth &amp; Development Office - FCDO in the UK)
                        for an <strong>Apostille Certificate</strong> under the Hague Convention 1961.
                      </li>
                      <li>
                        <strong>Step 4:</strong> Because India is a contracting member to the Apostille Convention
                        since 2005, an apostilled PoA requires NO further attestation by the Indian Embassy!
                      </li>
                    </ul>
                  </div>

                  {/* Track 2: Embassy Consular Attestation */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-emerald-50 text-[#5F7E75]">
                        <Building className="w-5 h-5" />
                      </span>
                      <div>
                        <div className="font-bold text-slate-900 text-sm sm:text-base">TRACK B: Indian Embassy Route</div>
                        <div className="text-[11px] text-slate-500">UAE, Saudi Arabia, Singapore, Qatar, Kuwait</div>
                      </div>
                    </div>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
                      <li>
                        <strong>Step 1:</strong> Book a consular miscellaneous services appointment at the Indian
                        Embassy or Consulate General (e.g. VFS / IVS Global centre in Dubai/Abu Dhabi).
                      </li>
                      <li>
                        <strong>Step 2:</strong> Carry two sets of the PoA with photos affixed, original Indian / foreign
                        passport, overseas residence visa, and address proof.
                      </li>
                      <li>
                        <strong>Step 3:</strong> Sign the PoA in person before the Consular Officer under the{" "}
                        <em>Diplomatic and Consular Officers (Oaths and Fees) Act, 1948</em>.
                      </li>
                      <li>
                        <strong>Step 4:</strong> The Consular Officer affixes the red official seal, consular stamp,
                        and signature. The document is now ready for dispatch to India.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: THE 90-DAY ADJUDICATION RULE */}
            <section id="ninety-day-adjudication" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>SECTION 18 INDIAN STAMP ACT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. The 90-Day Adjudication Rule: Section 18 Stamp Act
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Execution and consular attestation abroad is only half the battle. Once the physical document
                  arrives in India, <strong>Section 18 of the Indian Stamp Act, 1899</strong> imposes a mandatory
                  statutory timeline:
                </p>
                <div className="rounded-2xl bg-rose-50/70 border-l-4 border-l-[#C65378] border border-rose-200/80 p-5 space-y-2 text-xs sm:text-sm text-rose-950">
                  <div className="font-bold flex items-center gap-1.5 text-[#C65378] text-sm">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Statutory Text of Section 18: Instruments Executed Out of India</span>
                  </div>
                  <p className="italic">
                    &ldquo;Every instrument chargeable with duty executed out of India and not being a bill of exchange
                    or promissory note, may be stamped within three months after it has been first received in India.&rdquo;
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    The 4 Steps for Successful Collector Adjudication:
                  </h3>
                  <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
                    <li>
                      <strong>Preserve the International Courier Air Waybill (AWB):</strong> The 90-day countdown
                      commences from the exact date the courier packet enters India, NOT the date of execution abroad.
                      Always retain the DHL / FedEx tracking printout as legal evidence of arrival.
                    </li>
                    <li>
                      <strong>Submit to the Collector of Stamps / District Registrar:</strong> The appointed attorney
                      in India must submit the original attested PoA along with an adjudication application form to the
                      office of the Sub-Divisional Magistrate (SDM) / Collector of Stamps having territorial jurisdiction
                      over the property.
                    </li>
                    <li>
                      <strong>Payment of State Stamp Duty:</strong> Pay the prescribed state stamp duty (e.g., ₹100 in
                      Delhi, ₹500 in Maharashtra, ₹100 in Punjab for blood relatives).
                    </li>
                    <li>
                      <strong>Official Certificate of Adjudication (Section 32):</strong> The Collector endorses an
                      official seal and signs a certificate certifying that proper stamp duty has been collected. The
                      PoA is now 100% enforceable before every court and land registry in India.
                    </li>
                  </ol>
                </div>

                <p className="text-xs sm:text-sm text-slate-500">
                  <strong>Warning on Delay:</strong> If the PoA is presented after the 90-day window has expired,
                  Section 35 and Section 40 of the Stamp Act mandate impounding of the document and statutory penalties
                  ranging from <strong>2x to 10x</strong> the deficit stamp duty!
                </p>
              </div>
            </section>

            {/* SECTION 9: MUTATION & PROBATE PROCEDURES */}
            <section id="mutation-probate-procedure" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>INHERITANCE TRANSMISSION WORKFLOW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Mutation &amp; Court Probate Procedures for Non-Residents
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Once the Special PoA is stamped and adjudicated, your attorney can represent you across three
                  key transmission stages:
                </p>
                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <strong className="text-slate-900 text-sm">Stage 1: Revenue Land Mutation (Khata / Patta / 7/12 Extract):</strong>
                    <p className="mt-1 text-slate-600">
                      The attorney presents the certified PoA before the local Tehsildar or Municipal Commissioner along
                      with the registered death certificate and legal heir affidavit (Pedigree Tree / Vamshavali). The
                      Tehsildar issues public notice inviting objections (typically 30 days) and subsequently sanctions
                      the mutation order substituting the NRI heir&rsquo;s name on government land records.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <strong className="text-slate-900 text-sm">Stage 2: Co-operative Housing Society (CHS) &amp; DDA Transfer:</strong>
                    <p className="mt-1 text-slate-600">
                      For apartments in cities like Mumbai, Delhi, and Bengaluru, the attorney submits transmission
                      Form 14 / Appendix 15 along with indemnity bonds to the Society Secretary. The society committee
                      endorses the original share certificate in the NRI&rsquo;s name and issues a fresh membership letter.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <strong className="text-slate-900 text-sm">Stage 3: Court Probate or Letters of Administration:</strong>
                    <p className="mt-1 text-slate-600">
                      Under Sections 228 and 241 of the Indian Succession Act, 1925, if the deceased left a Will covering
                      assets in presidency towns (Mumbai, Kolkata, Chennai) or if required by local banks, the attorney
                      can sign court verification pleadings and engage advocates to secure the final Probate grant.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE SCENARIOS */}
            <section id="practical-case-scenarios" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>REAL-WORLD SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Scenarios: Delhi, Punjab &amp; Mumbai
              </h3>

              <div className="space-y-4">
                {/* Case 1 */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378]">
                      CASE STUDY 1: GURUGRAM &amp; DELHI DDA FLAT
                    </span>
                    <span className="text-xs text-slate-400">California, USA</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Software Architect in San Jose Inheriting Vasant Kunj Flat
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong>Challenge:</strong> Rajesh lived in San Jose and lost his father in Delhi. DDA and MCD
                    demanded personal appearance for biometric verification and mutation hearings.
                    <br />
                    <strong>Solution:</strong> Rajesh executed our Restricted Special PoA in California, had it
                    apostilled by the California Secretary of State, and couriered it to his sister in Delhi. She got
                    it adjudicated under Section 18 at SDM Mehrauli within 28 days and completed the DDA conveyance
                    and mutation without Rajesh taking a single day off from work.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700">
                      CASE STUDY 2: PUNJAB ANCESTRAL FARMLAND
                    </span>
                    <span className="text-xs text-slate-400">London, United Kingdom</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Avoiding the &ldquo;GPA Fraud Trap&rdquo; in Jalandhar Agricultural Land
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong>Challenge:</strong> Jaspreet in Southall inherited 12 acres of agricultural land in
                    Jalandhar. A local uncle requested a &ldquo;Standard GPA&rdquo; to handle the Tehsildar mutation.
                    <br />
                    <strong>Solution:</strong> Suspecting potential unauthorized sale or mortgage, Jaspreet used our
                    Anti-Misuse Special PoA format, which strictly permitted Tehsildar Jamabandi mutation while
                    explicitly barring any sale or lien. When the uncle attempted to mortgage the land to a local
                    credit cooperative, the bank&rsquo;s legal counsel rejected the transaction immediately due to the
                    express negative covenant.
                  </p>
                </div>

                {/* Case 3 */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      CASE STUDY 3: BOMBAY HIGH COURT PROBATE
                    </span>
                    <span className="text-xs text-slate-400">Dubai, United Arab Emirates</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    NRI Executive Probating Father&rsquo;s Will for Bandra Flat
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong>Challenge:</strong> Sunita in Dubai needed to probate her deceased father&rsquo;s registered
                    Will before the Bombay High Court to transfer a Bandra West society flat.
                    <br />
                    <strong>Solution:</strong> Sunita attested the Special PoA at the Consulate General of India, Dubai.
                    Her attorney in Mumbai completed adjudication at the Old Customs House Stamp Office and represented
                    her in the testamentary petition under Section 228 ISA, securing the final Probate grant.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: MANDATORY DOCUMENT CHECKLIST */}
            <section id="mandatory-document-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>STEP-BY-STEP VERIFICATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Mandatory Document Checklist for Embassy &amp; Collector
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Ensure you carry and courier every document in this checklist to prevent delays or rejection
                before the Indian Embassy, state Apostille officer, or Indian Stamp Collector.
              </p>

              {/* Checklist Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Official 9-Point Document Checklist
                  </span>
                  <button
                    onClick={() => copyToClipboard(CHECKLIST_TEXT, setCopiedChecklist)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold text-xs transition-colors"
                  >
                    {copiedChecklist ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedChecklist ? "Copied Checklist!" : "Copy Checklist"}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {CHECKLIST_TEXT}
                </div>
              </div>
            </section>

            {/* SECTION 12: CAPITAL GAINS TAX ON FUTURE SALE */}
            <section id="capital-gains-tax-link" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4 text-[#C65378]" />
                <span>TAX OPTIMIZATION &amp; BUDGET 2024 COMPLIANCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Calculate Capital Gains Tax on Future Property Sale
              </h3>

              <div className="rounded-3xl border border-rose-200/90 bg-gradient-to-br from-rose-50/80 via-white to-amber-50/80 p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C65378]/10 text-[#C65378] font-bold text-xs">
                    <span>FINANCE (NO. 2) ACT, 2024 • SECTIONS 49(1) &amp; 195 TDS</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Planning to Sell the Inherited Property After Mutation?
                  </h3>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                    Under Indian tax law, inheriting property attracts zero tax under Section 47(iii). However,
                    when you sell it, the Income Tax Act calculates capital gains on the cost paid by your parents
                    under Section 49(1). Under Budget 2024, resident and NRI heirs can evaluate the 12.5% flat rate
                    versus 20% indexation grandfathering option to save lakhs in tax.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href="/tools/capital-gains-tax-calculator-inherited-property"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#172228] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-transform hover:-translate-y-0.5 shadow-md"
                  >
                    <Calculator className="w-4 h-4 text-rose-300" />
                    <span>Open Inherited Property Capital Gains Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/services/nri-will-india"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#172228] border border-slate-300 font-bold text-xs sm:text-sm transition-transform hover:-translate-y-0.5 shadow-xs"
                  >
                    <Globe className="w-4 h-4 text-[#5F7E75]" />
                    <span>NRI 15CA/15CB Repatriation Legal Service</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: INSTITUTIONAL LEGAL PROFILE & ADVOCATE VERIFICATION */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL VERIFICATION &amp; ETHICS COMPLIANCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Institutional Legal Profile &amp; Advocate Verification
              </h3>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#172228] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Scale className="w-8 h-8 text-[#C65378]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      AMA Legal Solutions • Succession &amp; Cross-Border Real Estate Practice
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Advocates &amp; Legal Consultants • Bar Council of Delhi &amp; Supreme Court Bar Association
                    </p>
                  </div>
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  WillDrafting.in is an online technology portal backed by <strong>AMA Legal Solutions</strong>, a
                  reputable Indian law firm specializing in cross-border estate succession, NRI property title
                  transmission, and testamentary dispute resolution. Every format, checklist, and statutory recital
                  provided on this platform is curated and regularly audited by senior practicing advocates.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Zero Conflict of Interest</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      Independent legal representation protecting the overseas principal&rsquo;s sole title.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-[#C65378]" />
                      <span>Fiduciary Privilege</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      Full attorney-client privilege covering your title deeds and family inheritance assets.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#5F7E75]" />
                      <span>Pan-India Coverage</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      Revenue mutation and High Court probate representation across all 28 states and 8 UTs.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 14: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Frequently Asked Questions: NRI Power of Attorney
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Clear legal answers to the most common queries raised by Non-Resident Indians managing inherited
                property transmission from abroad.
              </p>

              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50/80 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: STATUTORY CITATIONS & OFFICIAL PORTALS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>STATUTORY AUTHORITIES &amp; EXTERNAL PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                15. Statutory Citations &amp; Official Consular Portals
              </h3>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <strong className="text-slate-900">Key Acts &amp; Enactments:</strong>
                    <ul className="mt-1.5 space-y-1 text-slate-600 text-xs list-disc pl-4">
                      <li>Powers of Attorney Act, 1882 (Act No. 7 of 1882)</li>
                      <li>Registration Act, 1908 (Sections 17, 18, 32 &amp; 33)</li>
                      <li>Indian Stamp Act, 1899 (Sections 18, 31 &amp; 32)</li>
                      <li>Indian Succession Act, 1925 (Sections 228 &amp; 241)</li>
                      <li>Diplomatic &amp; Consular Officers (Oaths and Fees) Act, 1948</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <strong className="text-slate-900">Landmark Judicial Authorities:</strong>
                    <ul className="mt-1.5 space-y-1 text-slate-600 text-xs list-disc pl-4">
                      <li><em>Suraj Lamp &amp; Industries v. State of Haryana</em> (2012) 1 SCC 656</li>
                      <li><em>Church of Christ Trust v. P. Ponniamman</em> (2012) 8 SCC 706</li>
                      <li><em>Rajni Tandon v. Dulal Ranjan Ghosh Dastidar</em> (2009) 14 SCC 782</li>
                      <li>Hague Apostille Convention (1961) ratified by India in 2005</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-500">
                  For official consular appointment bookings and fees, consult the Ministry of External Affairs
                  (MEA) India portal or your designated Indian Embassy (e.g. Indian Embassy Washington DC, High
                  Commission of India London, Consulate General of India Dubai).
                </div>
              </div>
            </section>

            {/* DUAL CONVERSION CTA CARD (MATCHING BENCHMARK FILE) */}
            <div className="rounded-3xl bg-gradient-to-br from-[#172228] to-slate-900 text-white p-6 sm:p-8 md:p-10 shadow-lg space-y-6">
              <div className="max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-300 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>TAILORED RESOLUTIONS FOR OVERSEAS SUCCESSION</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                  Protect Your Indian Property Inheritance with Lawyer-Drafted Precision
                </h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  Draft a challenge-proof Indian Will today to ensure seamless future asset transmission, or book a
                  confidential consultation with our senior NRI property advocates for end-to-end mutation and
                  consular legal assistance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm transition-transform hover:-translate-y-0.5 shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Draft Challenge-Proof Will</span>
                </button>
                <Link
                  href="/services/nri-will-india"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm transition-transform hover:-translate-y-0.5 shadow-md"
                >
                  <Users className="w-4 h-4 text-[#C65378]" />
                  <span>Consult NRI Property Advocate</span>
                </Link>
              </div>
            </div>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY CONVERSION & SERVICE SIDEBAR
              ===================================================================== */}
          <aside className="sticky top-24 hidden lg:block space-y-5">
            {/* Direct Lawyer Consultation Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#C65378] flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>NRI PROPERTY LEGAL DESK</span>
                </span>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  Need Help with Mutation, Probate or Sale in India?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our senior advocates handle complete consular PoA drafting, international courier guidance,
                  Collector stamp adjudication, and Tehsildar representation.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero international travel required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>90-day Stamp adjudication handling</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>FEMA &amp; 15CA/15CB tax compliance</span>
                </div>
              </div>

              <Link
                href="/services/nri-will-india"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#172228] hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <Users className="w-4 h-4 text-rose-300" />
                <span>Explore Full Legal Support</span>
              </Link>
            </div>

            {/* Self-Serve Will Drafting Card */}
            <div className="bg-gradient-to-br from-rose-50/80 via-white to-amber-50/80 rounded-3xl border border-rose-200/90 p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C65378] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>PREVENT FAMILY DISPUTES</span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                Write a Separate Indian Will for Your Indian Assets
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Overseas Wills often cause probate delays in India. Create a legally valid, separate Indian situs Will
                in under 15 minutes.
              </p>
              <button
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs transition-colors shadow-xs"
              >
                <span>Draft Indian Will Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Related Tools & Resources */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-3 text-xs">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-[#5F7E75]" />
                <span>RELATED SUCCESSION TOOLS</span>
              </div>
              <div className="space-y-2">
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100 group"
                >
                  <div className="font-bold text-slate-900 group-hover:text-[#C65378] flex items-center justify-between">
                    <span>Capital Gains Calculator</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#C65378]" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Budget 2024 grandfathering comparator
                  </div>
                </Link>
                <Link
                  href="/templates/nri-separate-indian-will-format"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100 group"
                >
                  <div className="font-bold text-slate-900 group-hover:text-[#C65378] flex items-center justify-between">
                    <span>NRI Separate Indian Will Format</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#C65378]" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Lex situs Section 5 compliant draft
                  </div>
                </Link>
                <Link
                  href="/templates/affidavit-of-legal-heirs-pedigree-tree-format"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100 group"
                >
                  <div className="font-bold text-slate-900 group-hover:text-[#C65378] flex items-center justify-between">
                    <span>Legal Heir Affidavit &amp; Pedigree</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#C65378]" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Vamshavali / Pedhinama revenue format
                  </div>
                </Link>
                <Link
                  href="/services/will-registration"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100 group"
                >
                  <div className="font-bold text-slate-900 group-hover:text-[#C65378] flex items-center justify-between">
                    <span>Sub-Registrar Will Registration</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#C65378]" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    SRO doorstep advocate service
                  </div>
                </Link>
              </div>
            </div>

            {/* Trust Signals Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 text-[11px] text-slate-500 space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Statutory Trust Standard</span>
              </div>
              <p className="leading-relaxed">
                Zero spam, zero cold calling. All inquiries are reviewed exclusively by qualified Indian legal
                advocates compliant with Bar Council rules.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
