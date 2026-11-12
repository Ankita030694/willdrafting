"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Scale,
  Building,
  Lock,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  Copy,
  CheckCheck,
  TrendingUp,
  Sliders,
  Users,
  FileText,
  AlertOctagon,
  Gavel,
  ShieldAlert,
  ChevronDown,
} from "lucide-react";

// Table of Contents Items (strictly matching section IDs, <= 70 chars, 0 em-dashes)
const TOC_ITEMS = [
  { id: "legal-framework", label: "1. Legal Rules: Order 39 CPC & Sec 268" },
  { id: "tripartite-test", label: "2. Tripartite Test in Testamentary Suits" },
  { id: "order-39-application-draft", label: "3. Order 39 Application Draft" },
  { id: "irreparable-injury-affidavit", label: "4. Irreparable Injury Affidavit Format" },
  { id: "model-restraining-order", label: "5. High Court Status Quo Restraining Order" },
  { id: "interactive-evaluator", label: "6. Injunction Risk & Urgency Evaluator" },
  { id: "probate-vs-title-injunction", label: "7. Probate vs Title Injunction Comparison" },
  { id: "high-court-rules-matrix", label: "8. High Court Testamentary Rules Matrix" },
  { id: "step-by-step-sop", label: "9. Step-by-Step SOP: Stopping Estate Sale" },
  { id: "order-39-rule-2a-contempt", label: "10. Injunction Breach & Rule 2A Contempt" },
  { id: "landmark-citations", label: "11. Landmark Case Laws & Precedents" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
];

const FAQS = [
  {
    q: "Can a probate court grant a temporary injunction to stop the sale of property?",
    a: "Yes. While a probate court does not adjudicate disputed titles to property, Section 268 of the Indian Succession Act, 1925 makes the Code of Civil Procedure applicable to all probate proceedings. Under Order 39 Rules 1 and 2 read with Section 151 CPC and Section 269 of the Indian Succession Act, the court possesses plenary jurisdiction to preserve and protect the corpus of the estate from waste, damage, or alienation pending final decision on the validity of the Will.",
  },
  {
    q: "What is the tripartite test for getting an injunction in a probate suit?",
    a: "Under landmark Supreme Court jurisprudence in Dalpat Kumar v. Prahlad Singh, the applicant must establish three conditions: (1) Prima Facie Case by showing caveatable interest as a natural legal heir and establishing suspicious circumstances surrounding the execution of the disputed Will; (2) Irreparable Injury showing that unauthorized transfer to third parties will create irreversible encumbrances and multi-party litigation that money cannot remedy; and (3) Balance of Convenience demonstrating that freezing alienation preserves the subject matter in custodia legis without causing injustice.",
  },
  {
    q: "How does a probate proceeding become a contentious testamentary suit?",
    a: "Under Section 295 of the Indian Succession Act, 1925, as soon as a caveator files a caveat under Section 284 followed by a verified affidavit in support disclosing grounds of opposition, the petition is numbered as a regular suit. The propounder becomes the Plaintiff and the caveator becomes the Defendant, and full Code of Civil Procedure powers including Order 39 temporary injunctions become immediately enforceable.",
  },
  {
    q: "What happens if an executor sells property during the pendency of a probate petition?",
    a: "If an injunction has been granted, any sale or mortgage executed in violation of court orders attracts severe contempt proceedings under Order 39 Rule 2A CPC, punishable with attachment of properties and civil prison detention up to three months. Furthermore, under the landmark ruling in Surjit Singh v. Harbans Singh, any transfer made in defiance of an injunction order is illegal and void ab initio.",
  },
  {
    q: "Does Section 52 of the Transfer of Property Act apply to probate proceedings?",
    a: "Once a caveat is filed and the petition is converted into a contentious testamentary suit under Section 295, the doctrine of Lis Pendens under Section 52 applies. Any third-party purchaser pendente lite takes the property strictly subject to the ultimate decree of the court, although obtaining an express Order 39 injunction is strongly advised to prevent third-party possession disputes.",
  },
  {
    q: "What is the difference between Order 39 Injunction and Section 247 Administrator Pendente Lite?",
    a: "An Order 39 injunction is a restraining order that commands parties to maintain status quo and prohibits sale, encumbrance, or structural alteration. In contrast, Section 247 of the Indian Succession Act appoints an independent court officer (Administrator Pendente Lite or Receiver under Order 40 CPC) to actively take physical custody, collect tenant rents, pay municipal taxes, and manage running commercial assets until the Will contest concludes.",
  },
  {
    q: "Can I serve the injunction order on the Sub-Registrar of Assurances?",
    a: "Yes. Once the High Court or District Judge issues an interim status quo order, an advocate must immediately serve a certified copy along with an official letter of intimation on the jurisdictional Sub-Registrar (SRO) and revenue authorities (Tahsildar or Municipal Corporation). This formally blocks the registration of any sale deed, gift deed, or revenue mutation in respect of the property.",
  },
  {
    q: "What documents must be attached with the Order 39 application in a probate court?",
    a: "You must attach: (1) Sworn verification affidavit under Order 19 CPC detailing personal knowledge and specific threats; (2) Certified pedigree table proving caveatable interest as Class I or II legal heir; (3) Evidence of suspicious circumstances (medical records showing mental incapacity, suspicious handwriting reports); (4) Evidence of imminent alienation (property portal listings, broker communications, site photographs); and (5) Property schedule specifying survey numbers and boundaries.",
  },
  {
    q: "How quickly can an ex-parte status quo order be obtained in urgent situations?",
    a: "In extreme emergencies where demolition or imminent registered sale is demonstrated, the court can grant an ex-parte ad-interim injunction on the very first day under the proviso to Order 39 Rule 3 CPC. The applicant must comply with the mandatory requirement of delivering copies to the opposite party by registered post or courier on the same day.",
  },
  {
    q: "What is the court fee payable on an interlocutory injunction application in probate?",
    a: "Because an interlocutory application under Order 39 is filed within an existing testamentary suit, it does not require ad-valorem court fees on the market value of the property. A nominal miscellaneous court fee stamp (ranging from ₹10 to ₹100 depending on the state Court Fees Act) is affixed to the application and supporting affidavit.",
  },
];

export default function ProbateInjunctionClient() {
  const { status } = useSession();
  const router = useRouter();

  const [activeId, setActiveId] = useState<string>("legal-framework");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Copy states for 3 legal assets
  const [copiedApp, setCopiedApp] = useState(false);
  const [copiedAffidavit, setCopiedAffidavit] = useState(false);
  const [copiedOrder, setCopiedOrder] = useState(false);

  // Evaluator Interactive State
  const [relation, setRelation] = useState<string>("child");
  const [ground, setGround] = useState<string>("suspicious_circumstances");
  const [threat, setThreat] = useState<string>("active_broker_listing");

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-90px 0px -60% 0px",
        threshold: 0.05,
      }
    );

    const elements = document.querySelectorAll("section[id], div[id].scroll-target");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleStartDraft = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (status === "authenticated") {
      router.push("/start/dashboard");
    } else {
      window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_EVENT));
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Evaluation computation
  const evaluationResult = useMemo(() => {
    let score = 75;
    let remedy = "Urgent Order 39 Rules 1 & 2 Application + Caveat Notice to Sub-Registrar";
    let statusText = "High Probability of Injunction";

    if (relation === "child" || relation === "spouse") {
      score += 15;
    } else if (relation === "sibling") {
      score += 5;
    } else {
      score -= 10;
    }

    if (ground === "suspicious_circumstances" || ground === "medical_incapacity") {
      score += 10;
    } else if (ground === "forged_will") {
      score += 5;
    }

    if (threat === "registered_agreement" || threat === "demolition_threat") {
      score += 5;
      remedy = "Emergency Ex-Parte Order 39 Motion (Rule 3 Proviso) + Section 247 Receiver Application";
      statusText = "Critical Emergency: Immediate Ex-Parte Restraint Warranted";
    }

    const clamped = Math.min(Math.max(score, 45), 98);
    return {
      score: clamped,
      remedy,
      statusText,
    };
  }, [relation, ground, threat]);

  // Asset 1: Application Format Text
  const copyApplicationToClipboard = () => {
    const text = `IN THE HIGH COURT OF JUDICATURE AT [CITY] /
IN THE COURT OF THE PRINCIPAL DISTRICT JUDGE AT [CITY]
TESTAMENTARY AND INTESTATE JURISDICTION

TESTAMENTARY SUIT NO. [____] OF [YEAR]
IN
PROBATE PETITION NO. [____] OF [YEAR]

IN THE MATTER OF:
The Alleged Last Will and Testament dated [Date of Disputed Will] of Late [Deceased's Full Name], who died at [City/Place] on [Date of Death].

BETWEEN:
[Applicant/Caveator Full Name],
Son/Daughter/Spouse of [Father's/Spouse's Name],
Aged about [Age] years, Residing at [Full Residential Address],
Aadhaar No.: [XXXX-XXXX-XXXX], PAN: [ABCDE1234F]
... APPLICANT / DEFENDANT (CAVEATOR)

VERSUS

[Petitioner/Propounder Full Name],
Son/Daughter of [Father's Name],
Aged about [Age] years, Residing at [Full Residential Address]
... RESPONDENT / PLAINTIFF (PETITIONER)

APPLICATION UNDER ORDER XXXIX RULES 1 AND 2 READ WITH SECTION 151 OF THE CODE OF CIVIL PROCEDURE, 1908 AND SECTION 268 OF THE INDIAN SUCCESSION ACT, 1925 FOR AD-INTERIM EX-PARTE TEMPORARY INJUNCTION RESTRAINING ALIENATION, CREATION OF THIRD-PARTY RIGHTS, AND ALTERATION OF ESTATE ASSETS

MOST RESPECTFULLY SHOWETH:

1. That the Applicant herein is the natural son/daughter and Class I legal heir of Late [Deceased's Name], who departed this life on [Date of Death] at [Place of Death]. The Applicant has already lodged a Caveat under Section 284 of the Indian Succession Act, 1925 and filed an Affidavit in Support of Caveat on [Date], pursuant to which this Hon'ble Court has converted and re-numbered the probate proceeding as a Contentious Testamentary Suit under Section 295 of the Act.

2. That the Respondent/Plaintiff has propounded an alleged unregistered/registered Will dated [Date of Will], falsely purporting to be the last testamentary disposition of the deceased, wherein the Applicant and other natural heirs have been entirely excluded, and the entire immovable and movable estate has been bequeathed solely in favour of the Respondent under highly suspicious and unnatural circumstances.

3. ESTABLISHMENT OF PRIMA FACIE CASE:
(a) The Applicant has an undisputable caveatable interest in the estate of the deceased, being a Class I legal heir under Section 8 of the Hindu Succession Act, 1956, entitled to a [1/Xth] undivided share in the event of intestacy.
(b) The alleged Will dated [Date] is riddled with grave suspicious circumstances: the deceased was [Age] years old, suffering from severe dementia/stroke, and hospitalized at [Hospital Name] during the alleged date of execution; the Respondent actively participated in procuring the document; and the attesting witnesses are personal associates of the Respondent with no prior familiarity with the family.
(c) The Applicant has placed on record reliable medical certificates and handwriting analysis demonstrating lack of testamentary capacity and signature forgery.

4. IMMINENT THREAT OF ALIENATION & IRREPARABLE INJURY:
(a) That the estate comprises valuable immovable property consisting of [Full Property Description, e.g., Land and Residential Bungalow situated at Plot No. XX, Sector YY, City], more particularly described in the SCHEDULE hereunder written.
(b) That on [Date], the Applicant discovered that the Respondent, acting without any legal grant of probate or letters of administration, has engaged local property brokers and listed the Schedule Property for sale on online real estate portals for a sum of Rs. [Amount in Figures].
(c) That on [Recent Date], prospective buyers and property dealers visited the Schedule Property at the instance of the Respondent, seeking to inspect title papers and execute an unregistered Agreement to Sell with intent to induct third parties into possession.
(d) That under Section 211 and 213 of the Indian Succession Act, no right as an executor or legatee can be established in any court without a valid probate grant. An unprobated Will confers no transferable title to alienate ancestral or testamentary corpus.
(e) If the Respondent succeeds in creating third-party rights, alienating the property, or parting with possession, it will multiply litigation, introduce stranger purchasers, lead to demolition of structural portions, and cause grave, irreversible, and irreparable injury to the Applicant that cannot be compensated in monetary terms.

5. BALANCE OF CONVENIENCE:
The balance of convenience lies entirely in favour of the Applicant. Restraining alienation and preserving the corpus of the estate in custodia legis will maintain the status quo ante during the trial of the Testamentary Suit. Conversely, refusal of injunction will destroy the subject matter of the dispute and render any final decree in favour of the Applicant entirely nugatory.

6. That the Applicant has not filed any other similar application before this Hon'ble Court or any other court for the same relief.

PRAYER:
In light of the facts and circumstances stated above, it is most respectfully prayed that this Hon'ble Court may graciously be pleased to:

(a) Pass an ad-interim ex-parte order of temporary injunction restraining the Respondent/Plaintiff, their family members, servants, agents, attorneys, assignees, and real estate developers from selling, mortgaging, gifting, leasing, alienating, creating any third-party interest, or parting with possession in respect of the immovable property described in the SCHEDULE hereunder written, until the final disposal of this Testamentary Suit;

(b) Direct the Sub-Registrar of Assurances at [Location/Zone] not to register any instrument of sale, conveyance, lease, mortgage, or transfer in respect of the Schedule Property until the final disposal of the present suit;

(c) Direct the Municipal Corporation / Revenue Authorities at [City/District] not to effect any mutation, Khata transfer, or property tax ledger alteration on the basis of the disputed Will dated [Date];

(d) Pass such other or further order(s) as this Hon'ble Court may deem fit and proper in the interest of justice, equity, and good conscience.

SCHEDULE OF IMMOVABLE PROPERTY
All that piece and parcel of land and building measuring [Area] sq. ft. / sq. yds., bearing Municipal No. [____], Khasra / Survey No. [____], situated at [Complete Address with Boundaries: North, South, East, West].

FILED BY:
[Advocate for Applicant/Caveator]
Enrolment No.: [____]
Chamber No.: [____], High Court / District Court, [City]
DATE: [Date of Filing]
PLACE: [City]`;

    navigator.clipboard.writeText(text);
    setCopiedApp(true);
    setTimeout(() => setCopiedApp(false), 3000);
  };

  // Asset 2: Affidavit Format Text
  const copyAffidavitToClipboard = () => {
    const text = `IN THE COURT OF THE PRINCIPAL DISTRICT JUDGE AT [CITY] /
IN THE HIGH COURT OF JUDICATURE AT [CITY]
TESTAMENTARY AND INTESTATE JURISDICTION

TESTAMENTARY SUIT NO. [____] OF [YEAR]
IN
PROBATE PETITION NO. [____] OF [YEAR]

IN THE MATTER OF:
[Applicant Name] ... APPLICANT / DEFENDANT
VERSUS
[Respondent Name] ... RESPONDENT / PLAINTIFF

AFFIDAVIT UNDER ORDER XIX RULES 1 AND 2 OF THE CODE OF CIVIL PROCEDURE, 1908 IN SUPPORT OF APPLICATION FOR TEMPORARY INJUNCTION UNDER ORDER XXXIX RULES 1 AND 2 CPC

I, [Applicant Name], son/daughter/spouse of [Father's/Spouse's Name], aged about [Age] years, residing at [Full Residential Address], do hereby solemnly affirm and state on oath as under:

1. That I am the Applicant in the accompanying Application under Order XXXIX Rules 1 & 2 CPC and the Caveator/Defendant in the above-captioned Testamentary Suit. I am fully conversant with the facts and circumstances of the case and competent to swear this affidavit.

2. That the contents of Paragraphs 1 to 6 of the accompanying Application under Order XXXIX Rules 1 & 2 CPC are true and correct to my personal knowledge, derived from family records, title deeds, and recent site occurrences.

3. That I solemnly swear that on [Date], I personally witnessed property brokers and prospective purchasers inspecting the Schedule Property accompanied by the Respondent. The Respondent openly asserted that they intend to execute a registered conveyance deed within seven days to monetize the property.

4. That the deceased did not possess testamentary capacity on [Date of Alleged Will], having suffered acute cognitive impairment. If the Schedule Property is alienated prior to the examination of attesting witnesses under Section 68 of the Indian Evidence Act, 1872, the entire subject matter of this suit will be irretrievably destroyed.

5. That I will suffer grave and irreparable loss that cannot be quantified or recouped in terms of money if an ad-interim restraining order is not granted immediately.

DEPONENT

VERIFICATION:
Verified at [City] on this [Day] day of [Month], [Year], that the contents of paragraphs 1 to 5 of the above affidavit are true and correct to my personal knowledge and belief, no part of it is false, and nothing material has been concealed therefrom.

DEPONENT
Identified by me:
[Advocate Signature & Enrolment Number]
Solemnly affirmed before me on this day by the deponent.
[Oath Commissioner / Notary Public Seal & Signature]`;

    navigator.clipboard.writeText(text);
    setCopiedAffidavit(true);
    setTimeout(() => setCopiedAffidavit(false), 3000);
  };

  // Asset 3: Model Restraining Order Text
  const copyOrderToClipboard = () => {
    const text = `MODEL HIGH COURT / DISTRICT JUDGE STATUS QUO RESTRAINING ORDER TEXT
(IN TESTAMENTARY SUIT UNDER SECTION 268 & 269 ISA READ WITH ORDER 39 RULES 1 & 2 CPC)

"ORDER:
1. Heard learned Counsel for the Applicant/Caveator and perused the pleadings and supporting affidavit.

2. The Applicant has placed on record prima facie material demonstrating caveatable interest as a Class I legal heir and raised substantial contentious issues regarding the execution and testamentary capacity of the testator in respect of the alleged Will dated [Date].

3. It is prima facie shown that attempts are being made to alienate and create third-party rights over the immovable properties constituting the corpus of the estate. Under Section 268 of the Indian Succession Act, 1925, the Code of Civil Procedure regulates testamentary proceedings, and the Court possesses inherent power to preserve the estate in custodia legis pending adjudication.

4. In view of the impending threat of third-party induction, this Court is satisfied that a prima facie case is made out, the balance of convenience lies in favour of granting protection, and failure to grant ad-interim relief will cause irreparable injury to the estate.

5. ACCORDINGLY, IT IS ORDERED that the Respondent/Plaintiff, their agents, family members, power of attorney holders, and developers are hereby RESTRAINED from selling, mortgaging, leasing, gifting, transferring, parting with possession, or in any manner creating third-party interests or encumbrances upon the immovable property detailed in Schedule 'A' of the Application, till the next date of hearing.

6. Both parties are directed to maintain strict STATUS QUO with respect to title and physical possession of the said property.

7. Let a certified copy of this Order be forwarded forthwith to the Sub-Registrar of Assurances at [Zone/District] and the Municipal Revenue Authority, with a direction not to register any instrument of transfer or effect any revenue mutation in respect of the Schedule Property until further orders of this Court.

8. The Applicant shall comply with the mandatory provisions of Order XXXIX Rule 3 CPC within 24 hours.

List the matter on [Next Hearing Date] for completion of service and written reply."`;

    navigator.clipboard.writeText(text);
    setCopiedOrder(true);
    setTimeout(() => setCopiedOrder(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378]/15 selection:text-[#C65378]">
      {/* Decorative ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#C65378]/[0.06] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-96 -left-20 w-96 h-96 rounded-full bg-[#5F7E75]/[0.06] blur-3xl"
      />

      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative bg-[#172228] text-white pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Category Pill Badge (Div - NOT a heading) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>ORDER 39 RULES 1 &amp; 2 CPC • SECTION 268 &amp; 269 INDIAN SUCCESSION ACT</span>
          </div>

          {/* Strict H1 Tag (Single on page, 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Probate Injunction Application Format under Order 39 CPC
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download lawyer-vetted temporary injunction applications and urgent affidavits for Indian probate suits.
            Restrain executors, co-heirs, and unauthorized third parties from selling, mortgaging, or transferring estate
            assets pending will contests.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#order-39-application-draft"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Order 39 Application Draft</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services/temporary-injunction-against-co-heir-alienation-suit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <ShieldAlert className="w-4 h-4 text-[#C65378]" />
              <span>Stop Estate Alienation Now</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <Gavel className="w-4 h-4 text-emerald-400" />
              <span>Consult Litigation Counsel</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STATS STRIP (Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 268</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CPC JURISDICTION IN PROBATE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Order 39 R 1 &amp; 2</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                INJUNCTION AGAINST WASTE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rule 2A CPC</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CIVIL PRISON FOR BREACH
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Dalpat Kumar</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SUPREME COURT TRIPARTITE TEST
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THREE-COLUMN GRID (Table of Contents + Main Content + Sidebar)
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

            {/* Legal Notice Box */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Courtroom Moat</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Code of Civil Procedure, 1908 Order 39 Rules 1 &amp; 2, Indian Succession Act, 1925
                Sections 268, 269, 284 &amp; 295, and Specific Relief Act, 1963 Section 38.
              </p>
            </div>

            {/* Injunction Quick Jump Card */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>Quick Legal Formats</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Facing an urgent property transfer threat? Copy the court-tested petition, verification affidavit, or
                model restraining order text below.
              </p>
              <a
                href="#order-39-application-draft"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Jump to Application</span>
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
                  src="/images/application-for-temporary-injunction-probate-format-og.jpg"
                  alt="Order 39 CPC Temporary Injunction Application Format in Probate Suits India"
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
                    Official Interlocutory Motion under Order 39 Rules 1 &amp; 2 CPC in Probate &amp; Testamentary Suits
                  </span>
                </p>
              </div>
            </div>

            {/* =================================================================
                SECTION 1: LEGAL FRAMEWORK (STRICTLY THE SINGLE H2 ON THE PAGE)
                ================================================================= */}
            <section id="legal-framework" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#C65378] uppercase tracking-wider">
                <Gavel className="w-4 h-4" />
                <span>Statutory Authority &amp; Plenary Jurisdiction</span>
              </div>
              
              {/* STRICTLY THE ONE AND ONLY H2 TAG (Length: 38 chars, <= 70 chars, 0 em-dashes) */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Rules: Order 39 CPC &amp; Sec 268
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                When a family member or executor propounds a contested Will and secretly moves to sell, develop, or
                mortgage estate real estate, caveators face a unique procedural hurdle. An ordinary civil court injunction
                draft often fails in probate proceedings because the Probate Court is fundamentally a court of
                conscience, not a court of title.
              </p>

              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-950 text-xs sm:text-sm space-y-2">
                <div className="font-extrabold flex items-center gap-2 text-amber-900">
                  <AlertTriangle className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                  <span>The Critical Moat: Jurisdiction to Protect the Corpus in Custodia Legis</span>
                </div>
                <p className="leading-relaxed">
                  While landmark Supreme Court judgments in <em>Chiranjilal Shrilal Goenka v. Jasjit Singh (1993) 2 SCC 507</em> and{" "}
                  <em>Kanwarjit Singh Dhillon v. Hardyal Singh Dhillon (2007) 11 SCC 357</em> establish that a probate court cannot
                  determine disputed ownership between the testator and third parties, <strong>Section 268 of the Indian
                  Succession Act, 1925</strong> expressly mandates that the Code of Civil Procedure, 1908 regulates all
                  proceedings of the District Judge. Under Section 269 ISA read with Order 39 Rules 1 and 2 CPC, the court
                  holds comprehensive plenary power to freeze property, restrain alienation, and preserve the subject matter
                  of the estate until the validity of the Will is decided.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="font-extrabold text-slate-900 text-sm mb-1">Section 268 ISA</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Applies the entire Code of Civil Procedure to probate cases, empowering judges to hear interlocutory
                    motions under Order 39.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="font-extrabold text-slate-900 text-sm mb-1">Section 269 ISA</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Grants explicit statutory authority to the District Court to interfere for the immediate protection and
                    custody of the estate.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="font-extrabold text-slate-900 text-sm mb-1">Section 295 ISA</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Converts the petition into a regular contentious suit upon caveat entry, giving full plaintiff and
                    defendant litigation standing.
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================================
                SECTION 2: TRIPARTITE TEST (ALL SUBSEQUENT SECTIONS ARE H3)
                ================================================================= */}
            <section id="tripartite-test" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#C65378] uppercase tracking-wider">
                <Scale className="w-4 h-4" />
                <span>The Three Injunction Pillars in Probate</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Tripartite Test in Testamentary Suits
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                In <em>Dalpat Kumar v. Prahlad Singh (1992) 1 SCC 719</em>, the Hon&apos;ble Supreme Court settled the three
                indispensable pillars for temporary injunctions. In a contested probate or testamentary suit, these tests
                operate under specialized evidentiary thresholds:
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm sm:text-base">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-[#C65378] text-xs flex items-center justify-center font-black">
                      1
                    </span>
                    <span>Prima Facie Case: Caveatable Interest &amp; Suspicious Circumstances</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                    The applicant does not need to prove absolute ownership of the property. Instead, you must show:
                    (a) <strong>Caveatable Interest</strong> under Section 283/284 ISA (e.g. you are a natural heir who would
                    inherit under intestate succession); and (b) <strong>Credible Suspicious Circumstances</strong> surrounding
                    the Will, such as physical or mental infirmity of the testator, exclusion of direct heirs without
                    reasons, or active execution by the sole legatee.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm sm:text-base">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-[#C65378] text-xs flex items-center justify-center font-black">
                      2
                    </span>
                    <span>Irreparable Injury: Destruction of Unique Immovable Heritage</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                    Irreparable injury means damage that cannot be cured or compensated by money. If the respondent sells
                    the ancestral home or land to a third-party builder, third-party rights intervene, title registers are
                    mutated, and multi-year partition suits follow. Once destroyed or developed, the unique corpus of the
                    family estate is lost forever.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm sm:text-base">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-[#C65378] text-xs flex items-center justify-center font-black">
                      3
                    </span>
                    <span>Balance of Convenience: Preserving Status Quo Ante</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                    The court balances whether withholding the injunction causes more injury to the applicant than granting
                    it causes to the respondent. Because the respondent holds no granted probate, freezing property
                    transactions preserves the status quo with zero permanent loss to anyone. If the Will is genuine, the
                    respondent can sell after the final decree.
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================================
                SECTION 3: ORDER 39 APPLICATION FORMAT (MANDATORY ASSET 1)
                ================================================================= */}
            <section id="order-39-application-draft" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#C65378] uppercase tracking-wider">
                <FileCheck className="w-4 h-4" />
                <span>Court-Ready Interlocutory Application Format</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Order 39 Application Draft
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Use this comprehensive interlocutory application format in High Courts or District Courts exercising
                testamentary jurisdiction. It establishes caveatable standing, sets out specific alienation threats, and
                prays for restraining orders against both respondents and local registration authorities.
              </p>

              {/* Template Container Box */}
              <div className="rounded-2xl border border-slate-300 bg-white shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wide">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>APPLICATION UNDER ORDER 39 RULES 1 &amp; 2 CPC IN TESTAMENTARY SUIT</span>
                  </div>
                  <button
                    onClick={copyApplicationToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    {copiedApp ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-white" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Application</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 sm:p-6 bg-slate-50/70 overflow-x-auto max-h-[580px] font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-wrap select-all">
{`IN THE HIGH COURT OF JUDICATURE AT [CITY] /
IN THE COURT OF THE PRINCIPAL DISTRICT JUDGE AT [CITY]
TESTAMENTARY AND INTESTATE JURISDICTION

TESTAMENTARY SUIT NO. [____] OF [YEAR]
IN
PROBATE PETITION NO. [____] OF [YEAR]

IN THE MATTER OF:
The Alleged Last Will and Testament dated [Date of Disputed Will] of Late [Deceased's Full Name], who died at [City/Place] on [Date of Death].

BETWEEN:
[Applicant/Caveator Full Name],
Son/Daughter/Spouse of [Father's/Spouse's Name],
Aged about [Age] years, Residing at [Full Residential Address],
Aadhaar No.: [XXXX-XXXX-XXXX], PAN: [ABCDE1234F]
... APPLICANT / DEFENDANT (CAVEATOR)

VERSUS

[Petitioner/Propounder Full Name],
Son/Daughter of [Father's Name],
Aged about [Age] years, Residing at [Full Residential Address]
... RESPONDENT / PLAINTIFF (PETITIONER)

APPLICATION UNDER ORDER XXXIX RULES 1 AND 2 READ WITH SECTION 151 OF THE CODE OF CIVIL PROCEDURE, 1908 AND SECTION 268 OF THE INDIAN SUCCESSION ACT, 1925 FOR AD-INTERIM EX-PARTE TEMPORARY INJUNCTION RESTRAINING ALIENATION, CREATION OF THIRD-PARTY RIGHTS, AND ALTERATION OF ESTATE ASSETS

MOST RESPECTFULLY SHOWETH:

1. That the Applicant herein is the natural son/daughter and Class I legal heir of Late [Deceased's Name], who departed this life on [Date of Death] at [Place of Death]. The Applicant has already lodged a Caveat under Section 284 of the Indian Succession Act, 1925 and filed an Affidavit in Support of Caveat on [Date], pursuant to which this Hon'ble Court has converted and re-numbered the probate proceeding as a Contentious Testamentary Suit under Section 295 of the Act.

2. That the Respondent/Plaintiff has propounded an alleged unregistered/registered Will dated [Date of Will], falsely purporting to be the last testamentary disposition of the deceased, wherein the Applicant and other natural heirs have been entirely excluded, and the entire immovable and movable estate has been bequeathed solely in favour of the Respondent under highly suspicious and unnatural circumstances.

3. ESTABLISHMENT OF PRIMA FACIE CASE:
(a) The Applicant has an undisputable caveatable interest in the estate of the deceased, being a Class I legal heir under Section 8 of the Hindu Succession Act, 1956, entitled to a [1/Xth] undivided share in the event of intestacy.
(b) The alleged Will dated [Date] is riddled with grave suspicious circumstances: the deceased was [Age] years old, suffering from severe dementia/stroke, and hospitalized at [Hospital Name] during the alleged date of execution; the Respondent actively participated in procuring the document; and the attesting witnesses are personal associates of the Respondent with no prior familiarity with the family.
(c) The Applicant has placed on record reliable medical certificates and handwriting analysis demonstrating lack of testamentary capacity and signature forgery.

4. IMMINENT THREAT OF ALIENATION & IRREPARABLE INJURY:
(a) That the estate comprises valuable immovable property consisting of [Full Property Description, e.g., Land and Residential Bungalow situated at Plot No. XX, Sector YY, City], more particularly described in the SCHEDULE hereunder written.
(b) That on [Date], the Applicant discovered that the Respondent, acting without any legal grant of probate or letters of administration, has engaged local property brokers and listed the Schedule Property for sale on online real estate portals for a sum of Rs. [Amount in Figures].
(c) That on [Recent Date], prospective buyers and property dealers visited the Schedule Property at the instance of the Respondent, seeking to inspect title papers and execute an unregistered Agreement to Sell with intent to induct third parties into possession.
(d) That under Section 211 and 213 of the Indian Succession Act, no right as an executor or legatee can be established in any court without a valid probate grant. An unprobated Will confers no transferable title to alienate ancestral or testamentary corpus.
(e) If the Respondent succeeds in creating third-party rights, alienating the property, or parting with possession, it will multiply litigation, introduce stranger purchasers, lead to demolition of structural portions, and cause grave, irreversible, and irreparable injury to the Applicant that cannot be compensated in monetary terms.

5. BALANCE OF CONVENIENCE:
The balance of convenience lies entirely in favour of the Applicant. Restraining alienation and preserving the corpus of the estate in custodia legis will maintain the status quo ante during the trial of the Testamentary Suit. Conversely, refusal of injunction will destroy the subject matter of the dispute and render any final decree in favour of the Applicant entirely nugatory.

6. That the Applicant has not filed any other similar application before this Hon'ble Court or any other court for the same relief.

PRAYER:
In light of the facts and circumstances stated above, it is most respectfully prayed that this Hon'ble Court may graciously be pleased to:

(a) Pass an ad-interim ex-parte order of temporary injunction restraining the Respondent/Plaintiff, their family members, servants, agents, attorneys, assignees, and real estate developers from selling, mortgaging, gifting, leasing, alienating, creating any third-party interest, or parting with possession in respect of the immovable property described in the SCHEDULE hereunder written, until the final disposal of this Testamentary Suit;

(b) Direct the Sub-Registrar of Assurances at [Location/Zone] not to register any instrument of sale, conveyance, lease, mortgage, or transfer in respect of the Schedule Property until the final disposal of the present suit;

(c) Direct the Municipal Corporation / Revenue Authorities at [City/District] not to effect any mutation, Khata transfer, or property tax ledger alteration on the basis of the disputed Will dated [Date];

(d) Pass such other or further order(s) as this Hon'ble Court may deem fit and proper in the interest of justice, equity, and good conscience.

SCHEDULE OF IMMOVABLE PROPERTY
All that piece and parcel of land and building measuring [Area] sq. ft. / sq. yds., bearing Municipal No. [____], Khasra / Survey No. [____], situated at [Complete Address with Boundaries: North, South, East, West].

FILED BY:
[Advocate for Applicant/Caveator]
Enrolment No.: [____]
Chamber No.: [____], High Court / District Court, [City]
DATE: [Date of Filing]
PLACE: [City]`}
                </div>
              </div>
            </section>

            {/* =================================================================
                SECTION 4: IRREPARABLE INJURY AFFIDAVIT (MANDATORY ASSET 2)
                ================================================================= */}
            <section id="irreparable-injury-affidavit" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#C65378] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Statutory Verification on Oath</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Irreparable Injury Affidavit Format
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                An Order 39 application in a testamentary court is defective without a supporting affidavit sworn under
                Order 19 CPC. This affidavit establishes personal knowledge of the applicant, verifies the urgency of
                site threats, and affirms the lack of adequate monetary remedy.
              </p>

              {/* Affidavit Box */}
              <div className="rounded-2xl border border-slate-300 bg-white shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wide">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>AFFIDAVIT UNDER ORDER 19 CPC IN SUPPORT OF ORDER 39 APPLICATION</span>
                  </div>
                  <button
                    onClick={copyAffidavitToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    {copiedAffidavit ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-white" />
                        <span>Copied Affidavit!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Affidavit</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 sm:p-6 bg-slate-50/70 overflow-x-auto max-h-[460px] font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-wrap select-all">
{`IN THE COURT OF THE PRINCIPAL DISTRICT JUDGE AT [CITY] /
IN THE HIGH COURT OF JUDICATURE AT [CITY]
TESTAMENTARY AND INTESTATE JURISDICTION

TESTAMENTARY SUIT NO. [____] OF [YEAR]
IN
PROBATE PETITION NO. [____] OF [YEAR]

IN THE MATTER OF:
[Applicant Name] ... APPLICANT / DEFENDANT
VERSUS
[Respondent Name] ... RESPONDENT / PLAINTIFF

AFFIDAVIT UNDER ORDER XIX RULES 1 AND 2 OF THE CODE OF CIVIL PROCEDURE, 1908 IN SUPPORT OF APPLICATION FOR TEMPORARY INJUNCTION UNDER ORDER XXXIX RULES 1 AND 2 CPC

I, [Applicant Name], son/daughter/spouse of [Father's/Spouse's Name], aged about [Age] years, residing at [Full Residential Address], do hereby solemnly affirm and state on oath as under:

1. That I am the Applicant in the accompanying Application under Order XXXIX Rules 1 & 2 CPC and the Caveator/Defendant in the above-captioned Testamentary Suit. I am fully conversant with the facts and circumstances of the case and competent to swear this affidavit.

2. That the contents of Paragraphs 1 to 6 of the accompanying Application under Order XXXIX Rules 1 & 2 CPC are true and correct to my personal knowledge, derived from family records, title deeds, and recent site occurrences.

3. That I solemnly swear that on [Date], I personally witnessed property brokers and prospective purchasers inspecting the Schedule Property accompanied by the Respondent. The Respondent openly asserted that they intend to execute a registered conveyance deed within seven days to monetize the property.

4. That the deceased did not possess testamentary capacity on [Date of Alleged Will], having suffered acute cognitive impairment. If the Schedule Property is alienated prior to the examination of attesting witnesses under Section 68 of the Indian Evidence Act, 1872, the entire subject matter of this suit will be irretrievably destroyed.

5. That I will suffer grave and irreparable loss that cannot be quantified or recouped in terms of money if an ad-interim restraining order is not granted immediately.

DEPONENT

VERIFICATION:
Verified at [City] on this [Day] day of [Month], [Year], that the contents of paragraphs 1 to 5 of the above affidavit are true and correct to my personal knowledge and belief, no part of it is false, and nothing material has been concealed therefrom.

DEPONENT
Identified by me:
[Advocate Signature & Enrolment Number]
Solemnly affirmed before me on this day by the deponent.
[Oath Commissioner / Notary Public Seal & Signature]`}
                </div>
              </div>
            </section>

            {/* =================================================================
                SECTION 5: MODEL RESTRAINING ORDER TEXT (MANDATORY ASSET 3)
                ================================================================= */}
            <section id="model-restraining-order" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#C65378] uppercase tracking-wider">
                <Gavel className="w-4 h-4" />
                <span>Model High Court Restraining Order Text</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. High Court Status Quo Restraining Order
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                When presenting your case during urgent mentioning, your counsel should propose explicit restraining
                terms to ensure the order covers both physical possession and registry mutation. Here is the standard
                High Court status quo restraining order text:
              </p>

              {/* Order Box */}
              <div className="rounded-2xl border border-slate-300 bg-white shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wide">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>JUDICIAL RESTRAINING ORDER MODEL CLAUSES</span>
                  </div>
                  <button
                    onClick={copyOrderToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    {copiedOrder ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-white" />
                        <span>Copied Order Text!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Order Text</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 sm:p-6 bg-slate-50/70 overflow-x-auto max-h-[420px] font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-wrap select-all">
{`MODEL HIGH COURT / DISTRICT JUDGE STATUS QUO RESTRAINING ORDER TEXT
(IN TESTAMENTARY SUIT UNDER SECTION 268 & 269 ISA READ WITH ORDER 39 RULES 1 & 2 CPC)

"ORDER:
1. Heard learned Counsel for the Applicant/Caveator and perused the pleadings and supporting affidavit.

2. The Applicant has placed on record prima facie material demonstrating caveatable interest as a Class I legal heir and raised substantial contentious issues regarding the execution and testamentary capacity of the testator in respect of the alleged Will dated [Date].

3. It is prima facie shown that attempts are being made to alienate and create third-party rights over the immovable properties constituting the corpus of the estate. Under Section 268 of the Indian Succession Act, 1925, the Code of Civil Procedure regulates testamentary proceedings, and the Court possesses inherent power to preserve the estate in custodia legis pending adjudication.

4. In view of the impending threat of third-party induction, this Court is satisfied that a prima facie case is made out, the balance of convenience lies in favour of granting protection, and failure to grant ad-interim relief will cause irreparable injury to the estate.

5. ACCORDINGLY, IT IS ORDERED that the Respondent/Plaintiff, their agents, family members, power of attorney holders, and developers are hereby RESTRAINED from selling, mortgaging, leasing, gifting, transferring, parting with possession, or in any manner creating third-party interests or encumbrances upon the immovable property detailed in Schedule 'A' of the Application, till the next date of hearing.

6. Both parties are directed to maintain strict STATUS QUO with respect to title and physical possession of the said property.

7. Let a certified copy of this Order be forwarded forthwith to the Sub-Registrar of Assurances at [Zone/District] and the Municipal Revenue Authority, with a direction not to register any instrument of transfer or effect any revenue mutation in respect of the Schedule Property until further orders of this Court.

8. The Applicant shall comply with the mandatory provisions of Order XXXIX Rule 3 CPC within 24 hours.

List the matter on [Next Hearing Date] for completion of service and written reply."`}
                </div>
              </div>
            </section>

            {/* =================================================================
                SECTION 6: INTERACTIVE READINESS & URGENCY EVALUATOR
                ================================================================= */}
            <section id="interactive-evaluator" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#C65378] uppercase tracking-wider">
                <Sliders className="w-4 h-4" />
                <span>Interactive Assessment Tool</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Injunction Risk &amp; Urgency Evaluator
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Assess your legal standing and determine the exact interlocutory remedies warranted for your case.
                Select your relationship to the deceased, primary Will challenge ground, and observed threat of property
                alienation:
              </p>

              {/* Interactive Tool Card */}
              <div className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Selector 1: Relationship */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Your Relationship to Deceased
                    </label>
                    <select
                      value={relation}
                      onChange={(e) => setRelation(e.target.value)}
                      className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 bg-slate-50/70 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="child">Direct Child (Son / Daughter - Class I)</option>
                      <option value="spouse">Surviving Spouse (Class I)</option>
                      <option value="sibling">Brother / Sister (Class II)</option>
                      <option value="grandchild">Grandchild / Nephew</option>
                      <option value="creditor">Estate Creditor / Agreement Holder</option>
                    </select>
                  </div>

                  {/* Selector 2: Grounds */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Ground of Will Challenge
                    </label>
                    <select
                      value={ground}
                      onChange={(e) => setGround(e.target.value)}
                      className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 bg-slate-50/70 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="suspicious_circumstances">Suspicious Execution &amp; Unnatural Exclusion</option>
                      <option value="medical_incapacity">Hospitalization &amp; Mental Incapacity</option>
                      <option value="forged_will">Forged Signatures / Impersonation</option>
                      <option value="revoked_by_subsequent">Revoked by Subsequent Registered Will</option>
                    </select>
                  </div>

                  {/* Selector 3: Alienation Threat */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Observed Alienation Threat
                    </label>
                    <select
                      value={threat}
                      onChange={(e) => setThreat(e.target.value)}
                      className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 bg-slate-50/70 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="active_broker_listing">Brokers Visiting &amp; Online Portals</option>
                      <option value="registered_agreement">Drafted Agreement to Sell / Advance Token</option>
                      <option value="demolition_threat">Demolition / Structural Alteration Begun</option>
                      <option value="mutation_attempt">Applying for Revenue Mutation / Khata Transfer</option>
                    </select>
                  </div>
                </div>

                {/* Results Panel */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-[#172228] to-slate-950 text-white space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <div className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
                        INJUNCTION SUCCESS READINESS
                      </div>
                      <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                        {evaluationResult.statusText}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl sm:text-4xl font-black text-rose-400">
                        {evaluationResult.score}%
                      </span>
                      <div className="text-[10px] text-white/70">Estimated Motion Strength</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-white/90">
                    <div className="font-bold text-rose-200">Recommended Litigation Strategy:</div>
                    <p className="leading-relaxed text-white/80">{evaluationResult.remedy}</p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Order 39 Rules 1 &amp; 2 + Order 19 CPC Compliant</span>
                    </div>
                    <Link
                      href="/services/temporary-injunction-against-co-heir-alienation-suit"
                      className="inline-flex items-center gap-1.5 text-[#C65378] hover:text-rose-300 font-bold transition-colors"
                    >
                      <span>File Restraining Motion with Senior Counsel</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================================
                SECTION 7: PROBATE VS TITLE INJUNCTION COMPARISON
                ================================================================= */}
            <section id="probate-vs-title-injunction" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#C65378] uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Comparative Jurisprudence</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Probate vs Title Injunction Comparison
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Understanding the legal distinctions between an injunction in an ordinary title suit and an injunction in
                a probate proceeding is crucial to avoid summary rejection of your application:
              </p>

              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm text-slate-800">
                  <thead className="bg-[#172228] text-white text-[11px] uppercase tracking-wider font-bold">
                    <tr>
                      <th className="p-3.5 sm:p-4">Key Legal Metric</th>
                      <th className="p-3.5 sm:p-4">Probate Injunction (ISA s. 268)</th>
                      <th className="p-3.5 sm:p-4">Civil Title Injunction (SRA s. 38)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Core Subject Matter</td>
                      <td className="p-3.5 sm:p-4 text-slate-700">
                        Preservation of the estate corpus <em>in custodia legis</em> until Will validity is tried.
                      </td>
                      <td className="p-3.5 sm:p-4 text-slate-700">
                        Adjudication and declaration of absolute ownership, title, and lawful possession.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Prima Facie Burden</td>
                      <td className="p-3.5 sm:p-4 text-slate-700">
                        Prove caveatable interest as intestate heir + suspicious circumstances of Will.
                      </td>
                      <td className="p-3.5 sm:p-4 text-slate-700">
                        Must establish clear title chain, registered sale deed, or adverse possession.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Executor Authority</td>
                      <td className="p-3.5 sm:p-4 text-slate-700">
                        Executor has no right to alienate prior to probate (Section 211 &amp; 213 ISA).
                      </td>
                      <td className="p-3.5 sm:p-4 text-slate-700">
                        Transfer governed by Section 54 of Transfer of Property Act, 1882.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Court Fee on Injunction</td>
                      <td className="p-3.5 sm:p-4 text-slate-700">
                        Nominal miscellaneous application fee (₹10 to ₹100). No ad-valorem fee.
                      </td>
                      <td className="p-3.5 sm:p-4 text-slate-700">
                        Often requires ad-valorem court fee based on property valuation or fixed slab.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Breach Consequences</td>
                      <td className="p-3.5 sm:p-4 text-slate-700">
                        Order 39 Rule 2A civil prison + sale declared <em>void ab initio</em> (Surjit Singh).
                      </td>
                      <td className="p-3.5 sm:p-4 text-slate-700">
                        Order 39 Rule 2A contempt + lis pendens under Section 52 Transfer of Property Act.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* =================================================================
                SECTION 8: HIGH COURT RULES MATRIX
                ================================================================= */}
            <section id="high-court-rules-matrix" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#C65378] uppercase tracking-wider">
                <Landmark className="w-4 h-4" />
                <span>Jurisdictional Practice Directions</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. High Court Testamentary Rules Matrix
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Rules governing temporary injunctions and caveats vary across Indian High Courts exercising original
                testamentary jurisdiction:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                    <span>Bombay High Court (Original Side)</span>
                    <span className="text-[10px] bg-rose-50 text-[#C65378] px-2 py-0.5 rounded-full font-bold">
                      Rule 397 &amp; Form 113
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Caveat must be filed under Rule 397 within 14 days of service of citation. Once caveat is entered and
                    affidavit in support filed under Rule 399, the petition becomes a Suit. Interim applications are filed as
                    Interim Applications (IA) on the Original Side.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                    <span>Delhi High Court (Original Side)</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      DHC Rules 2018
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Testamentary cases over ₹2 Crores are tried on the Original Side. Order 39 applications are listed
                    before the Roster Judge. Urgent mentioning for status quo requires advance notice to the propounder or
                    compliance with Rule 3 proviso.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                    <span>Calcutta High Court (Testamentary)</span>
                    <span className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                      Chapter XXXV
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Governed under Chapter XXXV of Original Side Rules. Caveat stays grant for 8 days pending affidavit.
                    Once converted to contentious cause, Master of Court registers as a testamentary suit for injunction.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                    <span>District &amp; Sessions Courts</span>
                    <span className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full font-bold">
                      Civil Court Manuals
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In all mofussil districts across India, Principal District Judges try probate petitions. Section 268
                    ISA directly invokes CPC Order 39, and appeals lie under Order 43 Rule 1(r) to the High Court.
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================================
                SECTION 9: STEP-BY-STEP SOP
                ================================================================= */}
            <section id="step-by-step-sop" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#C65378] uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Standard Operating Procedure</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Stopping Estate Sale
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Follow this sequential 6-step litigation protocol to freeze estate alienation as soon as a suspicious Will
                is propounded:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">File Section 284 Probate Caveat Immediately</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Lodge Form 12 caveat in the High Court or District Court where probate is sought. This ensures no
                      ex-parte grant can be issued without serving mandatory notice upon you.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">
                      Submit Verified Affidavit in Support (Sec 295 Conversion)
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Within the statutory timeline (8 to 14 days), file your detailed affidavit disclosing suspicious
                      circumstances. The court automatically converts the petition into a Contentious Testamentary Suit.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">
                      File Order 39 Interlocutory Application &amp; Order 19 Affidavit
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Move an application under Order 39 Rules 1 &amp; 2 CPC read with Section 268 ISA, accompanied by the
                      sworn verification affidavit detailing broker advertisements or property visits.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    4
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">
                      Press for Urgent Mentioning &amp; Ad-Interim Status Quo
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Appear before the Bench and establish immediate danger of alienation. Urge the court to pass an
                      ad-interim status quo order restraining sale, leasing, and encumbrance.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    5
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">Serve SRO &amp; Revenue Authorities with Order</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Obtain certified copies of the restraining order and officially deliver them to the Sub-Registrar
                      of Assurances and Municipal Corporation to freeze deed registration and Khata mutations.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    6
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">Maintain Vigilance &amp; Enforce Rule 2A Contempt</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If the respondent attempts to violate the injunction, immediately file an application under Order 39
                      Rule 2A CPC for civil imprisonment and property attachment.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================================
                SECTION 10: INJUNCTION BREACH & RULE 2A CONTEMPT
                ================================================================= */}
            <section id="order-39-rule-2a-contempt" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#C65378] uppercase tracking-wider">
                <AlertOctagon className="w-4 h-4" />
                <span>Enforcement &amp; Penal Consequences</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Injunction Breach &amp; Rule 2A Contempt
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Parties who knowingly violate or circumvent an injunction order in testamentary proceedings face severe
                statutory penalties under the Code of Civil Procedure and settled Supreme Court jurisprudence:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#C65378]" />
                    <span>Order 39 Rule 2A CPC Penalties</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                    <li>Attachment of the violator&apos;s personal properties for up to 1 year.</li>
                    <li>Detention in Civil Prison for a term extending up to three months.</li>
                    <li>Sale of attached properties to compensate the injured legal heirs.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-[#C65378]" />
                    <span>Transfers Declared Void Ab Initio</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In <em>Surjit Singh v. Harbans Singh (1995) 6 SCC 50</em>, the Supreme Court held that any conveyance,
                    mortgage, or agreement executed in defiance of an injunction order is unlawful and void. The purchaser
                    acquires zero title or equity, and the court will restore original possession.
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================================
                SECTION 11: LANDMARK CITATIONS & PRECEDENTS
                ================================================================= */}
            <section id="landmark-citations" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#C65378] uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Case Law Compendium</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Landmark Case Laws &amp; Precedents
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Every lawyer and litigant arguing an Order 39 motion in probate must cite these authoritative precedents:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                  <div className="font-extrabold text-slate-900 text-sm">
                    1. Chiranjilal Shrilal Goenka v. Jasjit Singh, (1993) 2 SCC 507
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Supreme Court of India:</strong> The probate court has exclusive jurisdiction to decide the
                    genuineness of the Will. It cannot adjudicate title, but holds custody over the estate until grant.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                  <div className="font-extrabold text-slate-900 text-sm">
                    2. Kanwarjit Singh Dhillon v. Hardyal Singh Dhillon, (2007) 11 SCC 357
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Supreme Court of India:</strong> Affirmed that grant of probate does not confer title where the
                    testator had none. Protection of properties during the suit is essential to prevent third-party chaos.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                  <div className="font-extrabold text-slate-900 text-sm">
                    3. Dalpat Kumar v. Prahlad Singh, (1992) 1 SCC 719
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Supreme Court of India:</strong> Established the golden tripartite test of prima facie case,
                    irreparable loss, and balance of convenience governing all interlocutory injunction grants.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                  <div className="font-extrabold text-slate-900 text-sm">
                    4. Atma Ram v. Smt. Shakuntala Rani, Delhi High Court
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Delhi High Court:</strong> Held that under Section 268 of the Indian Succession Act, the court
                    hearing a probate petition is fully competent to grant temporary injunction under Order 39 CPC.
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================================
                SECTION 12: FAQS
                ================================================================= */}
            <section id="frequently-asked-questions" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#C65378] uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Common Litigation Questions</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions
              </h3>

              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
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
                    Senior Testamentary Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in High Court probate litigation, contested Will defenses, Section 284 caveats, and emergency
                Order 39 property freezing motions at AMA Legal Solutions.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Advocate</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - INJUNCTION RETAINER (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-3 h-3" />
                  <span>EMERGENCY INJUNCTION DESK</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Is an Executor or Relative Secretly Selling Estate Property?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our litigation team files urgent Order 39 motions in High Courts and District Courts within 24 hours to
                  restrain illegal property alienation and freeze Sub-Registrar registrations.
                </p>
                <Link
                  href="/services/temporary-injunction-against-co-heir-alienation-suit"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs transition-colors shadow-xs"
                >
                  <Gavel className="w-3.5 h-3.5" />
                  <span>Retain Injunction Counsel</span>
                </Link>
                <div className="pt-1 text-[11px] text-slate-500">
                  Immediate Ex-Parte Relief • High Court &amp; District Judges
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT WILL CONTEST LAWSUITS</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Heirs from Costly Probate Injunctions
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  A lawyer-vetted, properly registered Will with medical certificates and unequivocal executor powers
                  prevents bad-faith caveats and interlocutory stay orders.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will Online</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Clear Bequest Clauses &amp; Doctor Certification</span>
                </div>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Litigants Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 268 Precision:</strong> Overcomes jurisdictional title objections in probate.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Tripartite Test Compliant:</strong> Vetted under Dalpat Kumar (1992) SCC mandates.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>SRO Notice Architecture:</strong> Direct intimation clauses to freeze deed registration.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Rule 2A Deterrence:</strong> Civil prison and void-ab-initio safeguards built-in.
                    </span>
                  </li>
                </ul>
              </div>

              {/* CARD 5: RELATED LEGAL SERVICES */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3 text-xs">
                <div className="font-extrabold text-slate-900 uppercase tracking-wider">
                  Related Litigation Solutions
                </div>
                <div className="space-y-2 text-slate-600">
                  <Link
                    href="/services/will-dispute-contest-litigation-lawyer"
                    className="block hover:text-[#C65378] transition-colors font-medium"
                  >
                    • Contested Will Defense &amp; Litigation Counsel
                  </Link>
                  <Link
                    href="/services/probate-lawyer"
                    className="block hover:text-[#C65378] transition-colors font-medium"
                  >
                    • High Court &amp; District Probate Advocates
                  </Link>
                  <Link
                    href="/services/temporary-injunction-against-co-heir-alienation-suit"
                    className="block hover:text-[#C65378] transition-colors font-medium"
                  >
                    • Co-Heir Property Alienation Injunction Retainer
                  </Link>
                  <Link
                    href="/templates"
                    className="block hover:text-[#C65378] transition-colors font-medium"
                  >
                    • Legal Will, Codicil &amp; Deed Templates Directory
                  </Link>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
