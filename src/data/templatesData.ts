export interface TemplateItem {
  id: string;
  title: string;
  href: string;
  badge: string;
  category: "Will Formats" | "Amendments & Codicils" | "Property Deeds" | "Medical Directives" | "Hindi (हिन्दी)";
  badgeStyle: string;
  date: string; // 'DD-MM-YYYY'
  description: string;
  meta: string;
  keywords: string[];
}

export const templatesData: TemplateItem[] = [
  {
    id: "will-format-india",
    title: "Legally Valid Will Format in India for Property & Assets",
    href: "/templates/will-format-india",
    badge: "Will Format",
    category: "Will Formats",
    badgeStyle: "bg-[#C65378]/10 text-[#C65378] border-[#C65378]/25",
    date: "19-10-2026",
    description:
      "Standard English plain paper Will format compliant with Section 63 Indian Succession Act, two-witness execution rules, and asset schedules.",
    meta: "Plain Paper Legal Template (English)",
    keywords: [
      "will format in india",
      "simple will format",
      "plain paper will format",
      "will template pdf",
      "section 63 indian succession act",
      "property will template",
      "two witnesses will rules",
      "free legal will format",
    ],
  },
  {
    id: "will-format-hindi",
    title: "वसीयतनामा फॉर्मेट: हिंदी में कानूनी रूप से मान्य वसीयत",
    href: "/templates/will-format-hindi",
    badge: "Hindi Format",
    category: "Hindi (हिन्दी)",
    badgeStyle: "bg-orange-50 text-orange-700 border-orange-200/80",
    date: "19-10-2026",
    description:
      "भारतीय उत्तराधिकार अधिनियम, 1925 की धारा 63 के तहत हिंदी में कानूनी रूप से मान्य सादे कागज़ पर वसीयतनामा प्रारूप और गवाही नियम।",
    meta: "सादे कागज़ पर हिंदी वसीयत प्रारूप",
    keywords: [
      "वसीयतनामा फॉर्मेट",
      "will format in hindi",
      "vasiyat nama format",
      "वसीयत कैसे लिखें",
      "सादे कागज़ पर वसीयत",
      "वसीयत का प्रारूप",
      "धारा 63 भारतीय उत्तराधिकार अधिनियम",
      "हिंदी में वसीयतनामा",
    ],
  },
  {
    id: "codicil-format-india",
    title: "Legally Valid Codicil Format in India to Amend a Will",
    href: "/templates/codicil-format-india",
    badge: "Codicil",
    category: "Amendments & Codicils",
    badgeStyle: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    date: "19-10-2026",
    description:
      "Section 2(b) supplementary legal instrument to amend, add, or revoke specific clauses in an existing Will without rewriting the whole document.",
    meta: "Section 2(b) Will Amendment Format",
    keywords: [
      "codicil format in india",
      "how to amend a will",
      "codicil vs new will",
      "section 2b indian succession act",
      "change existing will",
      "codicil template india",
      "section 71 alteration in will",
      "supplementary will format",
    ],
  },
  {
    id: "living-will-format-india",
    title: "Living Will Format in India: Advance Medical Directive",
    href: "/templates/living-will-format-india",
    badge: "Living Will",
    category: "Medical Directives",
    badgeStyle: "bg-teal-50 text-teal-800 border-teal-200/80",
    date: "19-10-2026",
    description:
      "Supreme Court 2023 simplified guidelines compliant advance medical directive format for withholding life support with notary attestation.",
    meta: "SC 2023 Simplified Guidelines",
    keywords: [
      "living will format india",
      "advance medical directive format",
      "living will procedure 2023",
      "passive euthanasia will india",
      "common cause 2023 guidelines",
      "living will notary attestation",
      "surrogate healthcare attorney",
      "right to die with dignity",
    ],
  },
  {
    id: "release-deed-format",
    title: "Relinquishment Deed Format: Free Template & Legal Guide",
    href: "/templates/release-deed-format",
    badge: "Deed",
    category: "Property Deeds",
    badgeStyle: "bg-rose-50 text-rose-700 border-rose-200/80",
    date: "20-10-2026",
    description:
      "Haq Tyag legal deed under Section 17 Registration Act for co-heirs surrendering undivided shares in ancestral property without monetary consideration.",
    meta: "Section 17 Registration Act Haq Tyag",
    keywords: [
      "relinquishment deed format",
      "release deed format",
      "haq tyag patra format",
      "relinquishment deed stamp duty",
      "family settlement deed format",
      "ancestral property release deed",
      "release deed vs gift deed",
      "section 17 registration act",
    ],
  },
];
