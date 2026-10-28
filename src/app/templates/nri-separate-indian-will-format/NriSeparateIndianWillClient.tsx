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
  Globe,
  Coins,
  MapPin,
  Building2,
  Info,
  Calendar,
  Send,
  Download,
  AlertCircle,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Statutory Foundation: Lex Situs Doctrine" },
  { id: "nri-revocation-trap", label: "2. The NRI Revocation Trap: Global vs Indian Wills" },
  { id: "fema-rbi-regulations", label: "3. FEMA & RBI Rules: Immovable Assets in India" },
  { id: "comparative-matrix", label: "4. Single Global Will vs Dual Wills Table" },
  { id: "copy-paste-template", label: "5. NRI Separate Indian Situs Will Template" },
  { id: "essential-clauses", label: "6. Essential Clauses: Non-Conflict & Executorship" },
  { id: "cross-border-probate", label: "7. Cross-Border Probate: Sec 228 vs Fresh Probate" },
  { id: "repatriation-protocol", label: "8. Repatriation Protocol: RBI USD 1M & Form 15CA/CB" },
  { id: "tax-planning-sec195", label: "9. Tax Planning: Section 195 TDS & Inherited Sales" },
  { id: "execution-sop", label: "10. Execution SOP: High Commission Attestation" },
  { id: "institutional-profile", label: "11. Legal Backing & Advocate Profile" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-citations", label: "13. Statutory Citations & Official Portals" },
];

const FAQS = [
  {
    q: "Why should an NRI have a separate Indian Will for assets in India?",
    a: "Under Section 5 of the Indian Succession Act, 1925, succession to immovable property situated in India is strictly governed by the law of India (lex situs), regardless of your overseas domicile or citizenship. Having an independent Indian Will prevents multi-year cross-border probate litigation, eliminates exorbitant apostille and foreign court exemplification expenses, and ensures seamless revenue mutation before local Sub-Registrars and municipal authorities.",
  },
  {
    q: "How does a standard Indian Will template accidentally revoke a US, UK, or UAE Will?",
    a: "Almost every generic, free Will template found on the internet begins with the boilerplate clause: 'I hereby revoke all my previous Wills, codicils, and testamentary dispositions.' Under Section 62 of the Indian Succession Act and international private law, executing that clause automatically revokes all previous wills executed anywhere in the world, including your US revocable living trust, UK mirror will, or UAE DIFC Will. An NRI Will must include a territory-restricted non-conflict clause.",
  },
  {
    q: "Can an NRI or OCI bequeath agricultural land or farmhouses in India?",
    a: "Under FEMA Regulations (Notification No. FEMA 21(R)/2018-RB), Non-Resident Indians and Overseas Citizens of India are strictly prohibited from purchasing agricultural land, plantation property, or farmhouses in India. However, an NRI or OCI can lawfully inherit such properties from a resident Indian. When drafting a Will, an NRI can only bequeath inherited agricultural land to an Indian citizen permanently residing in India. Bequeathing agricultural land to foreign citizens requires prior RBI approval.",
  },
  {
    q: "Is probate mandatory in India for a Will executed overseas by an NRI?",
    a: "Under Section 213 read with Section 57(a) and (b) of the Indian Succession Act, 1925, probate is compulsory only if the Will is executed within or pertains to immovable properties situated within the ordinary original civil jurisdiction of the High Courts of Bombay, Calcutta, or Chennai. For properties situated in Delhi, Bengaluru, Hyderabad, Pune, or Gurgaon, obtaining probate is optional under statutory law, although local housing societies or banks may occasionally demand it.",
  },
  {
    q: "Can a foreign court probate order be directly executed in India?",
    a: "No. A foreign probate decree or letter of administration issued by a court in the US, UK, Canada, or Australia cannot be directly executed in India to transfer property or access bank lockers. Under Section 228 of the Indian Succession Act, the executor must file an application before an Indian High Court or District Court for Ancillary Letters of Administration with a certified exemplification of the foreign Will annexed. This process frequently takes 18 to 36 months, which is why a separate Indian Will is crucial.",
  },
  {
    q: "Can an NRI appoint an Indian resident as an executor?",
    a: "Yes, and legal experts strongly advise doing so. Appointing a trusted Indian resident, such as a resident sibling, family member, chartered accountant, or an advocate from AMA Legal Solutions, ensures that physical appearances before the Sub-Registrar, probate hearings, and municipal mutation proceedings can be completed expeditiously without requiring the NRI executor to travel across continents.",
  },
  {
    q: "How should an NRI execute an Indian Will while living abroad?",
    a: "Under Section 63 of the Indian Succession Act, 1925, the Will must be signed by the testator in the physical presence of two independent adult witnesses who sign in the testator's presence. When abroad, best legal practice involves signing before a local overseas Notary Public followed by an Apostille under the Hague Convention 1961 (for countries like the US, UK, Canada, and Australia), or executing it at the consular section of the nearest Indian Embassy or High Commission.",
  },
  {
    q: "Can sale proceeds of inherited property be repatriated abroad by an NRI?",
    a: "Yes. Under the Foreign Exchange Management Act and RBI Master Direction on Remittance of Assets, an NRI or OCI can repatriate up to USD 1,000,000 (One Million US Dollars) per financial year out of balances held in their NRO bank account resulting from the sale of inherited assets. This requires payment of all applicable Indian taxes, followed by submission of Form 15CA (online self-declaration) and Form 15CB (Chartered Accountant certification) to the authorized dealer bank.",
  },
  {
    q: "What is Section 195 TDS when an NRI sells inherited property in India?",
    a: "Under Section 195 of the Income Tax Act, 1961, the buyer of a property from an NRI must deduct Tax Deducted at Source (TDS). In the absence of an official Lower Deduction Certificate, buyers deduct TDS on the FULL sale consideration at 12.5% or 20% plus surcharge and cess (often totaling 20% to 23.9% of the gross value). NRI sellers should file Form 13 on the TRACES portal under Section 197 to obtain a certificate allowing TDS to be deducted only on actual capital gains.",
  },
  {
    q: "Does an NRI need to register an Indian Will at the Sub-Registrar Office?",
    a: "Will registration is completely optional under Section 18(e) of the Registration Act, 1908. An unregistered Will signed on plain A4 paper before two independent witnesses is 100% legally enforceable in India. However, if the NRI visits India, registering the Will before the Sub-Registrar where the property is located provides formidable evidentiary weight against frivolous legal challenges from disgruntled relatives.",
  },
];

export default function NriSeparateIndianWillClient() {
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
  const [copiedMainTemplate, setCopiedMainTemplate] = useState<boolean>(false);
  const [copiedRevocationClause, setCopiedRevocationClause] = useState<boolean>(false);
  const [copiedAttestationChecklist, setCopiedAttestationChecklist] = useState<boolean>(false);

  // Interactive Assessment State
  const [testatorCountry, setTestatorCountry] = useState<string>("usa");
  const [hasForeignWill, setHasForeignWill] = useState<string>("yes");
  const [hasAgriculturalLand, setHasAgriculturalLand] = useState<string>("no");
  const [executorType, setExecutorType] = useState<string>("resident");

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

  const copyMainTemplateToClipboard = () => {
    const templateText = `LAST WILL AND TESTAMENT FOR INDIAN SITUS ASSETS ONLY
(COMPLIANT WITH SECTION 63 OF THE INDIAN SUCCESSION ACT, 1925)

I, [Full Legal Name of Testator], [Son / Daughter / Spouse of [Father's / Spouse's Name]], aged about [Age] years, holding [Indian Passport / Foreign Passport] No. [Passport Number] / OCI Card No. [OCI Number], currently residing at [Full Overseas Residential Address, City, State, ZIP/Postal Code, Country], and having permanent ties in India with Indian PAN: [PAN Number], being of sound mind, disposing memory, and robust understanding, do hereby make, publish, and declare this as my LAST WILL AND TESTAMENT RELATING EXCLUSIVELY TO ALL MY REAL, IMMOVABLE, MOVABLE, AND FINANCIAL ASSETS SITUATED WITHIN THE REPUBLIC OF INDIA ("INDIAN WILL").

1. TERRITORIAL JURISDICTION & NON-CONFLICT REVOCATION CLAUSE (CRITICAL):
1.1. I hereby revoke, cancel, and annul all former Wills, Codicils, and testamentary writings made by me AT ANY TIME HERETOFORE ONLY AND STRICTLY TO THE EXTENT THAT THEY RELATE TO, DEAL WITH, OR DISPOSE OF MY PROPERTIES AND ASSETS SITUATED WITHIN THE TERRITORY OF THE REPUBLIC OF INDIA.
1.2. I expressly declare and confirm that this Will DOES NOT revoke, alter, supersedes, or in any manner affect any Will, Living Trust, Codicil, or testamentary disposition executed by me in [Country of Residence, e.g., United States of America / United Kingdom / United Arab Emirates / Canada / Australia] or any other jurisdiction outside India concerning my assets situated outside the Republic of India.
1.3. Both this Indian Will and any separate Will or Living Trust executed by me in respect of my foreign assets shall operate simultaneously, concurrently, and independently within their respective territorial jurisdictions without conflict.

2. APPOINTMENT OF EXECUTOR & TRUSTEE FOR INDIAN ESTATE:
2.1. I hereby nominate, constitute, and appoint [Full Name of Indian Resident Executor], [Son/Daughter/Spouse of [Name]], residing at [Full Indian Address], holding Aadhaar No. [Aadhaar Number] and PAN [PAN Number], as the sole Executor and Trustee of this my Indian Will.
2.2. In the event that the said [Name of Primary Executor] predeceases me, renounces probate, is incapable, or unwilling to act as Executor, I nominate, constitute, and appoint [Full Name of Alternate Executor], residing at [Alternate Address], PAN [PAN Number], as the Alternate Executor of this Indian Will.
2.3. I hereby empower my Executor to apply for Probate or Letters of Administration before any competent High Court or District Court in India, represent my estate before the Sub-Registrar of Assurances, Municipal Corporations, Revenue Authorities, Banks, and Demat Depositories, and execute all necessary conveyances, mutation forms, and tax declarations.

3. SCHEDULE A: IMMOVABLE PROPERTIES IN INDIA:
I declare that I am the sole, absolute, and unencumbered owner of the following immovable properties situated in India, which I bequeath as follows:
3.1. [Description of Property 1: Flat/House No., Building Name, Survey/Khasra No., Ward, City, State, Pin Code]:
I hereby devise, give, and bequeath this entire property, along with all undivided proportional share in land, parking, rights, and easements, absolutely and forever to my [Relationship, e.g., Son / Daughter / Spouse], [Full Name of Beneficiary], residing at [Address], holding [Passport/Aadhaar No.].
3.2. [Description of Property 2: Commercial Unit / Land / Plot Details]:
I hereby devise and bequeath this property absolutely to [Full Name of Beneficiary 2].

4. SCHEDULE B: MOVABLE ASSETS, BANK ACCOUNTS & SECURITIES:
4.1. Non-Resident Ordinary (NRO) / Non-Resident External (NRE) / FCNR Bank Accounts:
I bequeath all balances, fixed deposits, and accrued interest standing to my credit in Account No. [Account Number] with [Bank Name, Branch Name, IFSC Code] absolutely to [Full Name of Beneficiary].
4.2. Demat Accounts, Equity Shares & Mutual Funds:
I bequeath all shares, mutual fund units, and securities held under Demat Client ID [Client ID] with Depository Participant [DP Name, DP ID] to [Full Name of Beneficiary].
4.3. Physical Lockers, Gold Jewellery & Personal Effects:
I bequeath the contents of Bank Locker No. [Locker No.] with [Bank Branch] to [Full Name of Beneficiary].

5. NOMINEES VS TESTAMENTARY HEIRS DECLARATION:
I clarify that any nomination recorded with any bank, cooperative housing society, company, or mutual fund is solely for administrative convenience. My beneficiaries specified in this Will shall be the true, absolute, and beneficial owners of all such funds and properties as confirmed by the Supreme Court of India in Shakti Yezdani v. Jayanand Salgaonkar (2023).

6. RESIDUARY INDIAN ESTATE CLAUSE:
I hereby devise and bequeath all the rest, residue, and remainder of my estate, property, and effects, whether real or personal, situated within the Republic of India, not hereinbefore specifically disposed of, absolutely and forever to [Full Name of Residuary Beneficiary].

7. SURVIVORSHIP REQUIREMENT:
Any beneficiary named in this Will must survive me by a minimum period of thirty (30) consecutive calendar days to take any beneficial interest hereunder. If any beneficiary dies within 30 days of my death, their bequest shall devolve as if they had predeceased me.

IN WITNESS WHEREOF, I, [Full Name of Testator], have hereunto set and subscribed my hands and signature to this my Last Will and Testament on this [Day] day of [Month], [Year], at [City, Country of Execution], in the presence of the witnesses attesting below.

_____________________________________________
SIGNATURE OF THE TESTATOR
[Full Name of Testator]

ATTESTATION BY INDEPENDENT WITNESSES (SECTION 63, INDIAN SUCCESSION ACT, 1925):
Signed, published, and declared by the above-named Testator, [Full Name of Testator], as and for his/her Last Will and Testament relating strictly to his/her Indian assets, in the presence of us, who at his/her request, in his/her presence, and in the presence of each other, all being present at the same time, have subscribed our names and signatures as attesting witnesses:

WITNESS 1:
Signature: ___________________________________
Full Legal Name: [Witness 1 Name]
Father's / Spouse's Name: [Father's Name]
Residential Address: [Witness 1 Address]
Passport / ID Number: [ID Number]
Occupation: [Occupation]

WITNESS 2:
Signature: ___________________________________
Full Legal Name: [Witness 2 Name]
Father's / Spouse's Name: [Father's Name]
Residential Address: [Witness 2 Address]
Passport / ID Number: [ID Number]
Occupation: [Occupation]

OPTIONAL MEDICAL PRACTITIONER FITNESS CERTIFICATE:
I, Dr. [Doctor's Full Name], MBBS / MD, Regn No. [Registration No.], practicing at [Clinic/Hospital Address], certify that I have examined the Testator [Name of Testator] on this day [Date] and find him/her to be in sound mental health, possessing full cognitive faculties and testamentary capacity to execute this Will.
Signature & Seal: ____________________________`;
    navigator.clipboard.writeText(templateText);
    setCopiedMainTemplate(true);
    setTimeout(() => setCopiedMainTemplate(false), 3000);
  };

  const copyRevocationClauseToClipboard = () => {
    const clauseText = `TERRITORIAL NON-CONFLICT REVOCATION CLAUSE (INDIAN SITUS RESTRICTED):
"I hereby revoke, cancel, and annul all former Wills, Codicils, and testamentary dispositions made by me at any time heretofore ONLY AND STRICTLY TO THE EXTENT THAT THEY RELATE TO, DEAL WITH, OR DISPOSE OF MY PROPERTIES, INVESTMENTS, AND ASSETS SITUATED WITHIN THE REPUBLIC OF INDIA. 

I expressly declare and confirm that this Will shall NOT revoke, amend, supersede, or in any manner affect any Will, Living Trust, Codicil, or testamentary writing executed by me in the United States of America, United Kingdom, United Arab Emirates, Canada, Australia, Singapore, or any other foreign jurisdiction concerning my assets situated outside the Republic of India. Both this Indian Will and my separate overseas Will/Trust instruments shall operate concurrently, independently, and harmoniously in their respective territorial domains."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedRevocationClause(true);
    setTimeout(() => setCopiedRevocationClause(false), 3000);
  };

  const copyAttestationChecklistToClipboard = () => {
    const checklistText = `NRI OVERSEAS WILL EXECUTION & ATTESTATION CHECKLIST:
1. Print the complete Will on crisp, high-quality, durable white A4 or Legal paper (one-sided printing recommended).
2. Ensure two independent adult witnesses are physically present who receive NO benefit whatsoever under this Will (Section 67 compliance).
3. The Testator signs or initials at the bottom of EVERY single page, with full legal signature on the final attestation page.
4. Both witnesses sign the attestation clause in the physical presence of the Testator and each other.
5. OPTION A (Apostille for Hague Convention Countries - US, UK, Australia): Sign before a local overseas Notary Public, then obtain an Apostille certificate from the Secretary of State or Foreign Office.
6. OPTION B (Indian Consular Attestation): Book an in-person appointment at the nearest Indian Embassy or Consulate General for consular attestation under the Diplomatic and Consular Officers Act, 1948.
7. Preserve the original signed and attested document in a fireproof vault and dispatch one certified duplicate copy to the appointed Indian Resident Executor.`;
    navigator.clipboard.writeText(checklistText);
    setCopiedAttestationChecklist(true);
    setTimeout(() => setCopiedAttestationChecklist(false), 3000);
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
            <Globe className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTION 5 &amp; FEMA 1999 • SEPARATE SITUS WILL</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            NRI Will Format for Indian Property: Separate Situs Will
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Legally valid, lawyer-vetted <strong>NRI will format for Indian property</strong> compliant
            with Section 5 and Section 63 of the Indian Succession Act, 1925. Features the critical
            territorial non-conflict revocation clause to safeguard your US, UK, Canada, or UAE estate plans.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Draft Challenge-Proof NRI Will</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Award className="w-4 h-4 text-[#C65378]" />
              <span>Consult Senior NRI Succession Counsel</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 5 ISA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                LEX SITUS SUCCESSION DOCTRINE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">0% Revocation</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NON-CONFLICT SAFEGUARD
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">USD 1,000,000</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                RBI ANNUAL REPATRIATION CAP
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Form 13 &amp; 15CA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TAX &amp; REMITTANCE COMPLIANCE
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
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 5, 62, 63, 67, 213, 214 &amp; 228 of the Indian Succession
                Act, 1925, Foreign Exchange Management Act (FEMA 1999), RBI Notification No. FEMA
                21(R)/2018-RB, and Sections 195 &amp; 197 of the Income Tax Act, 1961.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & TEMPLATES
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* EXECUTIVE BRIEF BOX */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: NRI ESTATE SUCCESSION IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Lex Situs Immovable Property Rule:</strong> Under Section 5 of the Indian Succession
                    Act, 1925, succession to immovable land, flats, and houses in India is strictly governed by
                    Indian statutory law, regardless of foreign residency, citizenship, or foreign probate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Revocation Trap Prevention:</strong> Boilerplate Indian Will templates state
                    &apos;I revoke all previous wills&apos;, which legally nullifies your US living trust, UK
                    will, or Dubai estate plan. An Indian situs Will must contain a territorial non-conflict clause.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>FEMA Agricultural Asset Safeguards:</strong> Under FEMA 21(R), NRIs and OCIs can
                    lawfully inherit agricultural land or farmhouses, but can only bequeath them to resident Indian
                    citizens. Disposing agricultural assets to foreign citizens requires prior RBI sanction.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>USD 1 Million Annual Repatriation:</strong> Legally inherited estate liquidation proceeds
                    can be repatriated overseas up to USD 1M per financial year under the RBI Liberalised Remittance
                    framework using Form 15CA and Form 15CB certifications.
                  </span>
                </li>
              </ul>
            </div>

            {/* VISUAL FEATURED BANNER CARD (Generated Image Preview) */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src="/images/nri-separate-indian-will-format-og.jpg"
                  alt="NRI Will Format for Indian Property and Separate Indian Situs Will Template"
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-50 to-rose-50/40 border-t border-slate-100 text-xs">
                <div className="space-y-0.5">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Verified Legal Asset: Territory-Restricted Indian Situs Will
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Non-conflict revocation protocol compliant with Section 5, 63 &amp; FEMA 1999 directives.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-rose-200 text-[#C65378] font-bold text-[11px] shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Supreme Court Compliant</span>
                </div>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Foundation: Section 5 &amp; Lex Situs Doctrine
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  When a Non-Resident Indian (NRI) or Overseas Citizen of India (OCI) owns immovable property in India,
                  such as residential apartments in Bengaluru, ancestral bungalows in Delhi, or plots in Pune, the legal
                  mechanism governing succession is dictated by a fundamental principle of Private International Law
                  codified in <strong>Section 5 of the Indian Succession Act, 1925</strong>:
                </p>
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs border-l-4 border-l-[#C65378] leading-relaxed">
                  &ldquo;Section 5(1): Succession to the immovable property in India of a person deceased shall be
                  regulated by the law of India, wherever such person may have had his domicile at the time of his death.
                  <br />
                  <br />
                  Section 5(2): Succession to the movable property of a person deceased is regulated by the law of the
                  country in which such person had his domicile at the time of his death.&rdquo;
                </div>
                <p>
                  This statutory dichotomy creates two distinct succession jurisdictions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-bold text-[#172228] flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#C65378]" />
                      <span>Immovable Property (Lex Situs)</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Succession to real estate, land, and apartments in India is governed exclusively by Indian law
                      (Indian Succession Act, 1925; Hindu Succession Act, 1956; or Shariat Act, 1937), irrespective of
                      whether you hold American, British, Canadian, or Australian citizenship.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-bold text-[#172228] flex items-center gap-2">
                      <Coins className="w-4 h-4 text-[#5F7E75]" />
                      <span>Movable Assets (Lex Domicilii)</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Bank deposits, mutual funds, and shares theoretically follow your country of domicile. However,
                      Indian banks and depositories (NSDL/CDSL) operate strictly under Reserve Bank of India and SEBI
                      circulars, practically necessitating a localized Indian Will to avoid complex court-ordered succession certificates.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: THE NRI REVOCATION TRAP */}
            <section id="nri-revocation-trap" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldAlert className="w-4 h-4" />
                <span>USER DEMAND SIGNAL &amp; WARNING</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. The NRI Revocation Trap: Global vs Situs-Specific Wills
              </h3>
              <div className="bg-rose-50/70 border border-rose-200/90 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 font-black text-rose-900 text-sm">
                  <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                  <span>The #1 Reddit &amp; Quora Nightmare (r/nri Horror Story)</span>
                </div>
                <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
                  An Indian expatriate living in California spent \$4,000 drafting a comprehensive California Living
                  Trust and Pour-Over Will to shield their US home and \$2M 401(k) retirement portfolio from costly US
                  probate. Later, during a vacation to Gurgaon, they downloaded a free, standard Indian Will template to
                  leave their family flat to their sister.
                </p>
                <div className="p-3 bg-white/90 border border-rose-300 rounded-xl text-xs font-mono text-rose-950">
                  &ldquo;I hereby revoke, cancel, and annul all former Wills, Codicils, and testamentary dispositions
                  made by me at any time heretofore.&rdquo;
                </div>
                <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
                  <strong>The Catastrophic Outcome:</strong> Upon their sudden demise, US probate litigators discovered
                  the executed Indian Will. Because the revocation clause was global and unqualified, the court ruled that
                  the California Living Trust was revoked. The entire US estate was pushed into California probate court,
                  racking up over \$85,000 in statutory probate attorney fees, freezing bank accounts for 22 months, and
                  exposing the estate to unnecessary taxation.
                </p>
                <div className="pt-2 border-t border-rose-200 text-xs font-bold text-rose-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Our template eliminates this risk via a precise <strong>Territorial Non-Conflict Revocation Clause</strong>,
                    guaranteeing your overseas and Indian estate plans co-exist safely.
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 3: FEMA & RBI REGULATIONS */}
            <section id="fema-rbi-regulations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>FOREIGN EXCHANGE COMPLIANCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. FEMA &amp; RBI Rules: Immovable Assets Held by NRIs &amp; OCIs
              </h3>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Estate planning for overseas Indians must harmonize the <strong>Indian Succession Act, 1925</strong> with
                  the <strong>Foreign Exchange Management Act (FEMA), 1999</strong>, specifically <em>Notification No. FEMA 21(R)/2018-RB</em>.
                  FEMA establishes strict statutory boundaries regarding what property an NRI/OCI can inherit and bequeath:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Residential &amp; Commercial Properties</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                      <li>An NRI or OCI can freely inherit any residential or commercial property in India.</li>
                      <li>Can be bequeathed under an Indian Will to ANY person, whether resident or non-resident.</li>
                      <li>No prior approval from the Reserve Bank of India (RBI) is mandated.</li>
                      <li>Rental income and sale proceeds can be remitted through NRO bank accounts.</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Agricultural Land, Plantations &amp; Farmhouses</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                      <li>NRIs and OCIs CANNOT purchase agricultural land in India under FEMA.</li>
                      <li>HOWEVER, an NRI/OCI can lawfully inherit agricultural land from a resident Indian.</li>
                      <li>
                        <strong>Bequest Restriction:</strong> An NRI can bequeath inherited farmland ONLY to a
                        citizen of India permanently residing in India.
                      </li>
                      <li>Bequeathing agricultural land to foreign citizens requires prior RBI sanction.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: COMPARATIVE MATRIX */}
            <section id="comparative-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>STRUCTURED COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Comparative Matrix: Single Global Will vs Dual Wills
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="py-3 px-4 font-bold border-b border-slate-700">Legal Parameter</th>
                      <th className="py-3 px-4 font-bold border-b border-slate-700 text-rose-300">
                        Single Global Worldwide Will
                      </th>
                      <th className="py-3 px-4 font-bold border-b border-slate-700 text-emerald-300">
                        Dual Situs-Specific Wills (Recommended)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-extrabold text-slate-900">Revocation Risk</td>
                      <td className="py-3 px-4 text-rose-700 font-semibold">
                        Critical: Accidental revocation of foreign trusts, UK wills, or DIFC assets.
                      </td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">
                        Zero: Protected by express territorial non-conflict reservation clause.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-extrabold text-slate-900">Indian Probate Speed</td>
                      <td className="py-3 px-4">
                        Very Slow (24 to 36 months) via Section 228 Ancillary Letters of Administration.
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        Fast (6 to 9 months) via direct District Court / High Court petition.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-extrabold text-slate-900">Apostille &amp; Legal Costs</td>
                      <td className="py-3 px-4 text-rose-700">
                        Expensive: Foreign court certified copies, apostilles, sworn translations, consular fees.
                      </td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">
                        Minimal: Original Indian legal instrument executed directly on standard paper.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-extrabold text-slate-900">Local Land Mutation</td>
                      <td className="py-3 px-4">
                        Sub-Registrars often reject foreign wills without expensive High Court confirmation decrees.
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        Smooth mutation before Tehsildar, Patwari, or Municipal Corporation.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-extrabold text-slate-900">Executorship Practicality</td>
                      <td className="py-3 px-4">
                        Foreign executor must execute Power of Attorney or physically travel to India repeatedly.
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        Trusted resident Indian co-executor manages all ground formalities smoothly.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-extrabold text-slate-900">Bank &amp; Demat Transmission</td>
                      <td className="py-3 px-4">
                        NRO banks trigger protracted legal scrutiny and demand high-value indemnity bonds.
                      </td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">
                        Rapid transmission supported by Supreme Court Shakti Yezdani citation.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 5: COPY-PASTEABLE TEMPLATE */}
            <section id="copy-paste-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>LEGAL INSTRUMENT DRAFT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Copy-Pasteable Template: NRI Separate Indian Situs Will
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Below is the complete, lawyer-drafted Indian Situs Will format for Non-Resident Indians and OCIs.
                Click &ldquo;Copy Complete Template&rdquo; to copy the editable text into Word, Google Docs, or your preferred editor.
              </p>

              {/* Template Box with Copy Button */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Statutory NRI Indian Situs Will (Section 63 ISA 1925 Compliant)</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyMainTemplateToClipboard}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition-colors shadow-xs"
                  >
                    {copiedMainTemplate ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-rose-300" />
                        <span>Copy Complete Template</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 sm:p-6 rounded-xl bg-slate-900 text-slate-100 text-[11px] sm:text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[580px] border border-slate-800">
{`LAST WILL AND TESTAMENT FOR INDIAN SITUS ASSETS ONLY
(COMPLIANT WITH SECTION 63 OF THE INDIAN SUCCESSION ACT, 1925)

I, [Full Legal Name of Testator], [Son / Daughter / Spouse of [Father's / Spouse's Name]], aged about [Age] years, holding [Indian Passport / Foreign Passport] No. [Passport Number] / OCI Card No. [OCI Number], currently residing at [Full Overseas Residential Address, City, State, ZIP/Postal Code, Country], and having permanent ties in India with Indian PAN: [PAN Number], being of sound mind, disposing memory, and robust understanding, do hereby make, publish, and declare this as my LAST WILL AND TESTAMENT RELATING EXCLUSIVELY TO ALL MY REAL, IMMOVABLE, MOVABLE, AND FINANCIAL ASSETS SITUATED WITHIN THE REPUBLIC OF INDIA ("INDIAN WILL").

1. TERRITORIAL JURISDICTION & NON-CONFLICT REVOCATION CLAUSE (CRITICAL):
1.1. I hereby revoke, cancel, and annul all former Wills, Codicils, and testamentary writings made by me AT ANY TIME HERETOFORE ONLY AND STRICTLY TO THE EXTENT THAT THEY RELATE TO, DEAL WITH, OR DISPOSE OF MY PROPERTIES AND ASSETS SITUATED WITHIN THE TERRITORY OF THE REPUBLIC OF INDIA.
1.2. I expressly declare and confirm that this Will DOES NOT revoke, alter, supersedes, or in any manner affect any Will, Living Trust, Codicil, or testamentary disposition executed by me in [Country of Residence, e.g., United States of America / United Kingdom / United Arab Emirates / Canada / Australia] or any other jurisdiction outside India concerning my assets situated outside the Republic of India.
1.3. Both this Indian Will and any separate Will or Living Trust executed by me in respect of my foreign assets shall operate simultaneously, concurrently, and independently within their respective territorial jurisdictions without conflict.

2. APPOINTMENT OF EXECUTOR & TRUSTEE FOR INDIAN ESTATE:
2.1. I hereby nominate, constitute, and appoint [Full Name of Indian Resident Executor], [Son/Daughter/Spouse of [Name]], residing at [Full Indian Address], holding Aadhaar No. [Aadhaar Number] and PAN [PAN Number], as the sole Executor and Trustee of this my Indian Will.
2.2. In the event that the said [Name of Primary Executor] predeceases me, renounces probate, is incapable, or unwilling to act as Executor, I nominate, constitute, and appoint [Full Name of Alternate Executor], residing at [Alternate Address], PAN [PAN Number], as the Alternate Executor of this Indian Will.
2.3. I hereby empower my Executor to apply for Probate or Letters of Administration before any competent High Court or District Court in India, represent my estate before the Sub-Registrar of Assurances, Municipal Corporations, Revenue Authorities, Banks, and Demat Depositories, and execute all necessary conveyances, mutation forms, and tax declarations.

3. SCHEDULE A: IMMOVABLE PROPERTIES IN INDIA:
I declare that I am the sole, absolute, and unencumbered owner of the following immovable properties situated in India, which I bequeath as follows:
3.1. [Description of Property 1: Flat/House No., Building Name, Survey/Khasra No., Ward, City, State, Pin Code]:
I hereby devise, give, and bequeath this entire property, along with all undivided proportional share in land, parking, rights, and easements, absolutely and forever to my [Relationship, e.g., Son / Daughter / Spouse], [Full Name of Beneficiary], residing at [Address], holding [Passport/Aadhaar No.].
3.2. [Description of Property 2: Commercial Unit / Land / Plot Details]:
I hereby devise and bequeath this property absolutely to [Full Name of Beneficiary 2].

4. SCHEDULE B: MOVABLE ASSETS, BANK ACCOUNTS & SECURITIES:
4.1. Non-Resident Ordinary (NRO) / Non-Resident External (NRE) / FCNR Bank Accounts:
I bequeath all balances, fixed deposits, and accrued interest standing to my credit in Account No. [Account Number] with [Bank Name, Branch Name, IFSC Code] absolutely to [Full Name of Beneficiary].
4.2. Demat Accounts, Equity Shares & Mutual Funds:
I bequeath all shares, mutual fund units, and securities held under Demat Client ID [Client ID] with Depository Participant [DP Name, DP ID] to [Full Name of Beneficiary].
4.3. Physical Lockers, Gold Jewellery & Personal Effects:
I bequeath the contents of Bank Locker No. [Locker No.] with [Bank Branch] to [Full Name of Beneficiary].

5. NOMINEES VS TESTAMENTARY HEIRS DECLARATION:
I clarify that any nomination recorded with any bank, cooperative housing society, company, or mutual fund is solely for administrative convenience. My beneficiaries specified in this Will shall be the true, absolute, and beneficial owners of all such funds and properties as confirmed by the Supreme Court of India in Shakti Yezdani v. Jayanand Salgaonkar (2023).

6. RESIDUARY INDIAN ESTATE CLAUSE:
I hereby devise and bequeath all the rest, residue, and remainder of my estate, property, and effects, whether real or personal, situated within the Republic of India, not hereinbefore specifically disposed of, absolutely and forever to [Full Name of Residuary Beneficiary].

7. SURVIVORSHIP REQUIREMENT:
Any beneficiary named in this Will must survive me by a minimum period of thirty (30) consecutive calendar days to take any beneficial interest hereunder. If any beneficiary dies within 30 days of my death, their bequest shall devolve as if they had predeceased me.

IN WITNESS WHEREOF, I, [Full Name of Testator], have hereunto set and subscribed my hands and signature to this my Last Will and Testament on this [Day] day of [Month], [Year], at [City, Country of Execution], in the presence of the witnesses attesting below.

_____________________________________________
SIGNATURE OF THE TESTATOR
[Full Name of Testator]

ATTESTATION BY INDEPENDENT WITNESSES (SECTION 63, INDIAN SUCCESSION ACT, 1925):
Signed, published, and declared by the above-named Testator, [Full Name of Testator], as and for his/her Last Will and Testament relating strictly to his/her Indian assets, in the presence of us, who at his/her request, in his/her presence, and in the presence of each other, all being present at the same time, have subscribed our names and signatures as attesting witnesses:

WITNESS 1:
Signature: ___________________________________
Full Legal Name: [Witness 1 Name]
Father's / Spouse's Name: [Father's Name]
Residential Address: [Witness 1 Address]
Passport / ID Number: [ID Number]
Occupation: [Occupation]

WITNESS 2:
Signature: ___________________________________
Full Legal Name: [Witness 2 Name]
Father's / Spouse's Name: [Father's Name]
Residential Address: [Witness 2 Address]
Passport / ID Number: [ID Number]
Occupation: [Occupation]

OPTIONAL MEDICAL PRACTITIONER FITNESS CERTIFICATE:
I, Dr. [Doctor's Full Name], MBBS / MD, Regn No. [Registration No.], practicing at [Clinic/Hospital Address], certify that I have examined the Testator [Name of Testator] on this day [Date] and find him/her to be in sound mental health, possessing full cognitive faculties and testamentary capacity to execute this Will.
Signature & Seal: ____________________________`}
                </pre>
              </div>
            </section>

            {/* SECTION 6: ESSENTIAL CLAUSES */}
            <section id="essential-clauses" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>MANDATORY CLAUSE ANALYSIS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Essential Clauses: Non-Conflict &amp; Indian Executor Powers
              </h3>
              <div className="space-y-4">
                {/* Standalone Snippet 1: Non-Conflict Revocation */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-sm text-slate-900">
                      Standalone Territorial Non-Conflict Revocation Snippet
                    </div>
                    <button
                      type="button"
                      onClick={copyRevocationClauseToClipboard}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                    >
                      {copiedRevocationClause ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Snippet</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-slate-50 text-slate-800 text-[11px] font-mono border border-slate-200 whitespace-pre-wrap">
{`"I hereby revoke, cancel, and annul all former Wills, Codicils, and testamentary dispositions made by me at any time heretofore ONLY AND STRICTLY TO THE EXTENT THAT THEY RELATE TO, DEAL WITH, OR DISPOSE OF MY PROPERTIES, INVESTMENTS, AND ASSETS SITUATED WITHIN THE REPUBLIC OF INDIA. 

I expressly declare and confirm that this Will shall NOT revoke, amend, supersede, or in any manner affect any Will, Living Trust, Codicil, or testamentary writing executed by me in the United States of America, United Kingdom, United Arab Emirates, Canada, Australia, Singapore, or any other foreign jurisdiction concerning my assets situated outside the Republic of India. Both this Indian Will and my separate overseas Will/Trust instruments shall operate concurrently, independently, and harmoniously in their respective territorial domains."`}
                  </pre>
                </div>

                {/* Core Provisions Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                    <div className="font-bold text-[#172228]">Resident Executor Clause</div>
                    <p className="text-slate-600 text-[11px]">
                      Empowers your local Indian representative to access bank lockers, apply for probate, and register mutation deeds without waiting for your foreign travel.
                    </p>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                    <div className="font-bold text-[#172228]">30-Day Survivorship Rule</div>
                    <p className="text-slate-600 text-[11px]">
                      Prevents catastrophic double-probate and double court fees if both spouses perish in a common transatlantic aviation or vehicular disaster.
                    </p>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                    <div className="font-bold text-[#172228]">Residuary Indian Clause</div>
                    <p className="text-slate-600 text-[11px]">
                      Catches forgotten fixed deposits, tax refunds, dividends, or newly inherited ancestral shares, preventing partial intestacy in India.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: CROSS-BORDER PROBATE */}
            <section id="cross-border-probate" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>CROSS-BORDER PROBATE JURISDICTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Cross-Border Probate: Ancillary Letters vs Fresh Probate
              </h3>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  NRIs frequently ask: <em>&ldquo;Can I simply use my California or UK probate order in India?&rdquo;</em>
                  The answer under Indian jurisprudence is an emphatic <strong>NO</strong>.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    The Section 228 Ancillary Letters of Administration Procedure:
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under <strong>Section 228 of the Indian Succession Act, 1925</strong>, when a Will has been proved
                    and probated in a competent foreign court, an Indian court does not grant fresh probate. Instead, it
                    entertains a petition for <strong>Ancillary Letters of Administration with the copy of the Will annexed</strong>.
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                    <li>Requires a Court Exemplification sealed by the foreign probate judge and Secretary of State.</li>
                    <li>Mandates apostille certification under the Hague Convention 1961.</li>
                    <li>Mandatory public citation notices in local Indian daily newspapers inviting objections.</li>
                    <li>Payment of maximum ad-valorem state court fees (e.g., up to ₹75,000 in Maharashtra).</li>
                    <li>Typical timeline: <strong>18 to 36 months</strong> of protracted High Court registry scrutiny.</li>
                  </ul>
                </div>
                <p>
                  <strong>Why a Separate Indian Will Eliminates This Nightmare:</strong> With an independent Indian Will,
                  your Indian executor files directly before the District Court or High Court without waiting for the foreign
                  probate proceedings to conclude. Furthermore, in non-presidency cities (Delhi, Bengaluru, Hyderabad, Pune,
                  Noida, Gurgaon), probate is NOT legally mandatory under Section 213, allowing immediate municipal mutation!
                </p>
              </div>
            </section>

            {/* SECTION 8: REPATRIATION PROTOCOL */}
            <section id="repatriation-protocol" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>FEMA CAPITAL REPATRIATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Repatriation Protocol: RBI USD 1M Limit &amp; Form 15CA 15CB
              </h3>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Once inherited assets in India are transmitted or liquidated, an NRI beneficiary faces the challenge of
                  remitting funds overseas to their local bank in New York, London, Toronto, or Dubai. The Reserve Bank of India
                  governs this process through its <strong>Master Direction on Remittance of Assets</strong>:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-bold text-[#172228] text-xs sm:text-sm flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#C65378]" />
                      <span>USD 1,000,000 Annual Cap</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      An NRI or OCI can remit up to <strong>USD 1 Million (USD 1,000,000)</strong> per financial year
                      (April 1 to March 31) out of funds held in their NRO bank account resulting from the sale of inherited
                      property or maturity of estate investments.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-bold text-[#172228] text-xs sm:text-sm flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-[#5F7E75]" />
                      <span>Form 15CA &amp; Form 15CB Protocol</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Prior to remittance, a practicing Indian Chartered Accountant issues <strong>Form 15CB</strong>,
                      certifying that all Indian capital gains taxes have been computed and paid. The NRI then generates
                      <strong>Form 15CA</strong> on the Income Tax e-filing portal for the Authorized Dealer (AD) bank.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: TAX PLANNING & SECTION 195 */}
            <section id="tax-planning-sec195" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>CAPITAL GAINS &amp; TDS COMPLIANCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Tax Planning: Section 195 TDS &amp; Inherited Property Sales
              </h3>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  When your NRI heirs eventually sell inherited immovable property in India, they encounter <strong>Section 195 of the Income Tax Act, 1961</strong>.
                  Unlike resident property sales where buyers deduct 1% TDS under Section 194-IA, sales by NRIs trigger draconian withholding tax obligations:
                </p>
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-2 text-xs text-amber-950">
                  <div className="font-bold flex items-center gap-2 text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>The Section 195 Withholding Trap: Gross Consideration vs Net Gains</span>
                  </div>
                  <p>
                    By statutory default, the buyer must deduct TDS at <strong>12.5% or 20% plus surcharge and cess</strong>
                    (often reaching 20% to 23.9%) on the <strong>ENTIRE GROSS SALE CONSIDERATION</strong>, not just the capital gain!
                    For example, on a ₹2 Crore inherited apartment, ₹41.6 Lakhs can be deducted and locked up with the tax department.
                  </p>
                  <p className="font-semibold pt-1">
                    <strong>Solution:</strong> The NRI seller must submit <strong>Form 13 on the TRACES portal</strong> under
                    Section 197 to obtain a Lower or Nil Deduction Certificate prior to executing the registered sale deed.
                  </p>
                </div>

                {/* Mid-Article Contextual Link to Interactive Calculator */}
                <div className="p-5 rounded-2xl bg-[#172228] text-white space-y-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300">
                      <Calculator className="w-4 h-4" />
                      <span>RECOMMENDED STATUTORY CALCULATOR</span>
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-300 font-semibold">
                      Budget 2024 Ready
                    </span>
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-white">
                    Calculate Capital Gains Tax on Inherited Property in India
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Compare <strong>12.5% Flat Tax vs 20% Indexation</strong> under the latest Section 112 grandfathering proviso,
                    compute Section 49(1) deemed cost of acquisition from parents, and calculate Section 54/54EC exemptions.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-all hover:gap-3"
                    >
                      <span>Open Inherited Property Capital Gains Calculator</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: EXECUTION SOP */}
            <section id="execution-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>STEP-BY-STEP EXECUTION PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Execution SOP: High Commission Attestation Protocol
              </h3>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Executing an Indian Will while living abroad must adhere strictly to <strong>Section 63 of the Indian Succession Act, 1925</strong>.
                  Follow this verified 3-path execution protocol based on your geographic location:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-slate-900 text-xs">PATH A: APOSTILLE (HAGUE NATIONS)</div>
                    <p className="text-[11px] text-slate-600">
                      For USA, UK, Canada, Australia: Sign before a local public notary with two independent adult witnesses.
                      Submit the notarized document to the state Secretary of State / Foreign Office for an Apostille certificate.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-slate-900 text-xs">PATH B: CONSULAR ATTESTATION</div>
                    <p className="text-[11px] text-slate-600">
                      For UAE, Singapore, or non-Hague nations: Book an appointment at the nearest Indian Embassy or Consulate
                      General. Sign before the Consular Officer under the Diplomatic and Consular Officers Act, 1948.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-slate-900 text-xs">PATH C: SRO REGISTRATION IN INDIA</div>
                    <p className="text-[11px] text-slate-600">
                      During your visit to India: Sign on plain paper before two witnesses and register before the Sub-Registrar
                      having territorial jurisdiction over your property. Provides highest evidential weight.
                    </p>
                  </div>
                </div>

                {/* Execution Checklist Box */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                      NRI Will Execution Checklist (Physical Attestation Steps)
                    </div>
                    <button
                      type="button"
                      onClick={copyAttestationChecklistToClipboard}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                    >
                      {copiedAttestationChecklist ? (
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
                    <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Print on durable white A4 or Legal paper (one-sided)</span>
                    </div>
                    <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Two independent adult witnesses receiving zero bequests (Sec 67)</span>
                    </div>
                    <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Testator initials every page and signs full signature at end</span>
                    </div>
                    <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Doctor fitness certificate attached if testator is senior citizen</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Profile: Legal Excellence &amp; Trust Signals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Cross-Border Estate Succession Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-[#C65378] text-xs font-bold shrink-0">
                    <Scale className="w-4 h-4" />
                    <span>Bar Council Verified Advocates</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
                  <div className="p-4 rounded-xl bg-slate-50 space-y-1.5 border border-slate-100">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Pan-India Jurisdiction</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Comprehensive courtroom probate practice before Delhi High Court, Bombay High Court, Calcutta High Court, and District Courts pan-India.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 space-y-1.5 border border-slate-100">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-[#C65378]" />
                      <span>Cross-Border NRI Estate Practice</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Structuring simultaneous US living trusts, UK mirror wills, Dubai DIFC wills, and Indian situs wills for diaspora families across 42+ nations.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 space-y-1.5 border border-slate-100">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-[#5F7E75]" />
                      <span>FEMA &amp; TRACES Tax Advocacy</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Filing Section 197 Form 13 Lower TDS petitions, managing Form 15CA/15CB repatriation, and handling revenue mutations at Sub-Registrar offices.
                    </p>
                  </div>
                </div>

                {/* Dual Conversion Banner */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-white to-emerald-50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="font-extrabold text-slate-900 text-sm">
                      Need a Customized Challenge-Proof NRI Estate Plan?
                    </div>
                    <p className="text-xs text-slate-600">
                      Consult with our senior succession advocates or draft your compliant Indian Will online in 15 minutes.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={handleStartDraft}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-colors text-center"
                    >
                      Start Online Will Draft
                    </button>
                    <Link
                      href="/contact"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors text-center"
                    >
                      Consult NRI Succession Counsel
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions: NRI Wills for Indian Property
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
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-extrabold text-xs sm:text-sm text-slate-900 hover:text-[#C65378] transition-colors gap-3"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
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

            {/* SECTION 13: STATUTORY CITATIONS & PORTALS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ExternalLink className="w-4 h-4" />
                <span>STATUTORY REPOSITORY &amp; OFFICIAL CITATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Statutory Citations: Indian Succession Act &amp; RBI Directives
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 text-xs text-slate-600 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold border border-slate-200"
                  >
                    <span>India Code: Indian Succession Act, 1925</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://www.rbi.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold border border-slate-200"
                  >
                    <span>Reserve Bank of India: FEMA 21(R) Regulations</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://www.incometax.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold border border-slate-200"
                  >
                    <span>TRACES Portal: Form 13 Lower TDS Application</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://www.mea.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold border border-slate-200"
                  >
                    <span>Ministry of External Affairs: Apostille &amp; Legalisation</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Guides &amp; Succession Formats
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Legal Templates Hub
                    </Link>
                    <Link
                      href="/services/nri-will-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      NRI Indian Will Drafting Service
                    </Link>
                    <Link
                      href="/services/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      SRO Will Registration Pan-India
                    </Link>
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Inherited Property Tax Calculator
                    </Link>
                    <Link
                      href="/templates/joint-mutual-mirror-will-format-husband-wife"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Spousal Mirror Will Format
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Standard Indian Will Template
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
                Specialist in Indian testamentary jurisprudence, cross-border NRI estate structuring, High Court
                probate litigation, and Section 197 Form 13 Lower TDS tax defense pan-India.
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
                  <span>PROTECT YOUR OVERSEAS ESTATE PLAN</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Challenge-Proof Indian Situs Will in 15 Mins
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Our guided legal engine automatically inserts the non-conflict territorial revocation clause,
                  safeguarding your US living trust or UK will from accidental revocation.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Drafting Your NRI Will</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; FEMA Compliant</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card - NO MOBILE NUMBERS) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>CROSS-BORDER NRI ESTATE DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Complex Cross-Border Estate or High-Value Assets in India?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our succession advocates assist with High Court probate, consular attestation, SRO registration,
                  and Form 13 Lower TDS applications across all Indian states.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Award className="w-3.5 h-3.5 text-rose-300" />
                  <span>Schedule Advocate Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why NRIs &amp; OCIs Trust WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Foreign Revocation:</strong> Safe territory-restricted clause.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>FEMA 21(R) Precision:</strong> Strict compliance for agricultural assets.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>RBI Repatriation Ready:</strong> Integrated with Form 15CA &amp; 15CB SOP.
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
          href="#copy-paste-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View NRI Template</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft NRI Will</span>
        </button>
      </div>
    </div>
  );
}
