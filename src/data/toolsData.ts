export interface ToolItem {
  id: string;
  title: string;
  href: string;
  badge: string;
  category: "Calculators" | "Checkers" | "Checklists" | "NRI & Cross-Border";
  badgeStyle: string;
  date: string; // 'DD-MM-YYYY'
  description: string;
  meta: string;
  keywords: string[];
}

export const toolsData: ToolItem[] = [
  {
    id: "succession-calculator",
    title: "Hindu Succession Calculator: Legal Heir Shares Tool",
    href: "/tools/succession-calculator",
    badge: "Calculator",
    category: "Calculators",
    badgeStyle: "bg-blue-50 text-blue-700 border-blue-200/80",
    date: "18-10-2026",
    description:
      "Calculate exact intestate heir shares under Hindu Succession Act (Sec 8 & 15), Muslim 1/3 Wasiyat rules, and Christian/Parsi succession.",
    meta: "Hindu, Muslim, Christian & Parsi Law",
    keywords: [
      "succession calculator",
      "hindu succession act",
      "legal heir share calculator",
      "class 1 heirs",
      "class 2 heirs",
      "coparcenary rights",
      "section 8",
      "section 15",
      "mother share",
      "daughter rights",
      "muslim inheritance",
      "christian succession",
    ],
  },
  {
    id: "court-fee-calculator",
    title: "Succession Certificate Fees: Court Fee Calculator India",
    href: "/tools/succession-certificate-court-fee-calculator",
    badge: "Calculator",
    category: "Calculators",
    badgeStyle: "bg-blue-50 text-blue-700 border-blue-200/80",
    date: "20-10-2026",
    description:
      "Calculate state-wise succession certificate court fees and ad valorem stamp duty across Delhi, Maharashtra, Karnataka, and all Indian High Courts.",
    meta: "State-Wise Ad Valorem Rates & Caps",
    keywords: [
      "court fee calculator",
      "succession certificate fees",
      "court fee by state",
      "ad valorem stamp duty",
      "section 379 indian succession act",
      "delhi court fee",
      "maharashtra court fee cap",
      "karnataka court fee",
      "court charges succession",
    ],
  },
  {
    id: "probate-checker",
    title: "Is Probate Required in India? Free Probate Checker Tool",
    href: "/tools/probate-checker",
    badge: "Checker",
    category: "Checkers",
    badgeStyle: "bg-purple-50 text-purple-700 border-purple-200/80",
    date: "20-10-2026",
    description:
      "Interactive diagnostic framework under Section 213 & 57 for Mumbai, Kolkata, Chennai, bank claims, society transfers, and property mutation.",
    meta: "Section 213 & 57 Statutory Test",
    keywords: [
      "probate checker",
      "is probate mandatory",
      "section 213 indian succession act",
      "mumbai high court probate",
      "presidential towns",
      "bank demanding probate",
      "letters of administration",
      "executor probate guide",
    ],
  },
  {
    id: "nri-will-checker",
    title: "Do I Need an Indian Will? NRI Will Checker Tool",
    href: "/tools/nri-will-checker",
    badge: "Checker",
    category: "NRI & Cross-Border",
    badgeStyle: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    date: "20-10-2026",
    description:
      "Diagnostic tool for Non-Resident Indians to check foreign Will validity in India, Two-Will strategy, lex loci rei sitae, and FEMA compliance.",
    meta: "Cross-Border Assets & FEMA Rules",
    keywords: [
      "nri will checker",
      "foreign will validity in india",
      "do nri need separate will",
      "two will strategy",
      "fema inheritance rules",
      "nro account repatriation",
      "section 228 indian succession act",
      "cross border succession",
    ],
  },
  {
    id: "will-checklist",
    title: "Documents Required for Will in India: Complete Checklist",
    href: "/tools/will-checklist",
    badge: "Checklist",
    category: "Checklists",
    badgeStyle: "bg-amber-50 text-amber-800 border-amber-200/80",
    date: "20-10-2026",
    description:
      "Interactive 4-stage readiness checklist covering title deeds, bank accounts, demat folios, witness KYC, and doctor medical fitness certificates.",
    meta: "4-Stage Pre-Drafting Readiness",
    keywords: [
      "will checklist",
      "documents required for will",
      "property papers for will",
      "witness id proof",
      "doctor medical fitness certificate",
      "section 63 checklist",
      "executor kyc",
      "asset schedule preparation",
    ],
  },
];
