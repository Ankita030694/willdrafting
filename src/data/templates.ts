export interface TemplateItem {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  category: string;
  language: "en" | "hi";
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  summary: string;
}

export const TEMPLATES_DATA: TemplateItem[] = [
  {
    id: "1",
    slug: "will-format-india",
    title: "Legally Valid Will Format in India for Property & Assets",
    seoTitle: "Will Format in India: Free Legal Template | WillDrafting",
    metaDescription:
      "Download a legally valid Will format in India. Plain paper template with Section 63 witness rules, property schedules, and lawyer review at WillDrafting.",
    primaryKeyword: "will format in india",
    category: "Legal Templates",
    language: "en",
    readTime: "8 min",
    date: "October 19, 2026",
    author: "Advocate Rajeshwar Rao",
    authorRole: "Senior Succession Counsel, AMA Legal Solutions",
    summary:
      "Clause-annotated printable Will template for Indian movable and immovable properties. Fully compliant with Section 63 of the Indian Succession Act, 1925 on plain paper with zero stamp duty.",
  },
  {
    id: "2",
    slug: "will-format-hindi",
    title: "वसीयतनामा फॉर्मेट: हिंदी में कानूनी रूप से मान्य वसीयत",
    seoTitle: "वसीयतनामा फॉर्मेट हिंदी में: मुफ्त नमूना | WillDrafting",
    metaDescription:
      "हिंदी में मुफ्त वसीयतनामा फॉर्मेट पाएँ। धारा 63 के अनुसार दो गवाह, सादे कागज़ पर वसीयत, 3 आम गलतियाँ और वकील द्वारा जाँचा गया प्रिंट-रेडी प्रारूप।",
    primaryKeyword: "वसीयतनामा फॉर्मेट",
    category: "Legal Templates (Hindi)",
    language: "hi",
    readTime: "9 min",
    date: "October 19, 2026",
    author: "Advocate Rajeshwar Rao",
    authorRole: "Senior Succession Counsel, AMA Legal Solutions",
    summary:
      "भारतीय उत्तराधिकार अधिनियम, 1925 की धारा 63 के अनुसार हिंदी में खंड-दर-खंड समझाया गया वसीयतनामा प्रारूप, वैधता जाँच सूची और 3 आम गलतियाँ।",
  },
  {
    id: "3",
    slug: "codicil-format-india",
    title: "Legally Valid Codicil Format in India to Amend a Will",
    seoTitle: "Codicil Format in India: Amend a Will | WillDrafting",
    metaDescription:
      "Download a legally valid Codicil format in India. Learn Section 63 witness rules, Codicil vs New Will guide, and amend your Will safely at WillDrafting.",
    primaryKeyword: "codicil format",
    category: "Legal Templates",
    language: "en",
    readTime: "7 min",
    date: "October 19, 2026",
    author: "Advocate Rajeshwar Rao",
    authorRole: "Senior Succession Counsel, AMA Legal Solutions",
    summary:
      "Clause-annotated printable Codicil template under Section 2(b) and Section 63 of the Indian Succession Act, 1925. Learn when to use a codicil versus drafting a new Will.",
  },
  {
    id: "4",
    slug: "living-will-format-india",
    title: "Living Will Format in India: Advance Medical Directive",
    seoTitle: "Living Will Format India: 2023 Guidelines | WillDrafting",
    metaDescription:
      "Download a valid living will format in India under 2023 SC rules. Free advance medical directive template with notary attestation and hospital SOP guide.",
    primaryKeyword: "living will format india",
    category: "Legal Templates",
    language: "en",
    readTime: "9 min",
    date: "October 19, 2026",
    author: "Advocate Rajeshwar Rao",
    authorRole: "Senior Succession Counsel, AMA Legal Solutions",
    summary:
      "Advance Medical Directive and Living Will template reflecting the January 2023 Supreme Court order. Learn notary attestation rules, surrogate decision-maker appointment, and hospital medical board procedures.",
  },
  {
    id: "5",
    slug: "release-deed-format",
    title: "Relinquishment Deed Format: Free Template & Legal Guide",
    seoTitle: "Relinquishment Deed Format: Free Template | WillDrafting",
    metaDescription:
      "Download a legally valid relinquishment deed format in India. Learn stamp duty by state, release deed vs gift deed rules, and registration requirements.",
    primaryKeyword: "relinquishment deed format",
    category: "Legal Templates",
    language: "en",
    readTime: "9 min",
    date: "October 20, 2026",
    author: "Advocate Rajeshwar Rao",
    authorRole: "Senior Succession Counsel, AMA Legal Solutions",
    summary:
      "Clause-annotated printable Relinquishment Deed (Release Deed) format for transferring inherited co-owner shares in immovable property under Section 17 of the Registration Act, 1908.",
  },
];

export function getTemplateBySlug(slug: string): TemplateItem | undefined {
  return TEMPLATES_DATA.find((item) => item.slug === slug);
}
