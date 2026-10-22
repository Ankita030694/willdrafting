export interface SitemapPageItem {
  title: string;
  href: string; // strictly lowercase with hyphens, e.g. '/templates/will-format-india'
  category?: string; // 'Templates' | 'Tools' | 'Services' | 'Guides' | 'Company'
  date?: string; // 'DD-MM-YYYY' or 'YYYY-MM-DD'
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number; // 0.1 to 1.0 (default: 0.8)
}

/**
 * Single Source of Truth (SSOT) Sitemap Registry for WillDrafting (https://www.willdrafting.in)
 * 
 * Order in this array defines display hierarchy on both:
 * 1. Interactive HTML Sitemap (/sitemap)
 * 2. Search Engine XML Sitemap (/sitemap.xml)
 * 
 * Newly created legal templates and diagnostic tools are prioritized at the very top.
 */
export const staticPages: SitemapPageItem[] = [
  {
    title: "Will Drafting in Indore: Online Will & Succession Help",
    href: "/locations/indore",
    category: "Locations",
    date: "22-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Will Drafting in Surat: Online Will & Business Planning",
    href: "/locations/surat",
    category: "Locations",
    date: "22-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Will Drafting in Chandigarh: Online Will Making Guide",
    href: "/locations/chandigarh",
    category: "Locations",
    date: "22-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Will Drafting in Jaipur: Online Will & Succession Guide",
    href: "/locations/jaipur",
    category: "Locations",
    date: "22-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Will Drafting in Ahmedabad: Online Will & Asset Guide",
    href: "/locations/ahmedabad",
    category: "Locations",
    date: "22-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Will Drafting in Pune: Legal Online Will Making Guide",
    href: "/locations/pune",
    category: "Locations",
    date: "22-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Will Drafting in Kolkata: Registration & Probate Rules",
    href: "/locations/kolkata",
    category: "Locations",
    date: "22-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Will Drafting in Chennai: Registration & Probate Guide",
    href: "/locations/chennai",
    category: "Locations",
    date: "22-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Will Drafting in Hyderabad: Online Will & Asset Planning",
    href: "/locations/hyderabad",
    category: "Locations",
    date: "22-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Will Drafting in Gurgaon: Online Will Services in NCR",
    href: "/locations/gurgaon",
    category: "Locations",
    date: "22-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Will Drafting in Lucknow: Online Will Registration Help",
    href: "/locations/lucknow",
    category: "Locations",
    date: "22-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Will Drafting in Noida: Online Will Registration Support",
    href: "/locations/noida",
    category: "Locations",
    date: "22-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Will Drafting in Bengaluru: Expert Online Will Services",
    href: "/locations/bengaluru",
    category: "Locations",
    date: "22-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },

    {
    title: "Will Drafting in Mumbai: Registration & Probate Law Guide",
    href: "/locations/mumbai",
    category: "Locations",
    date: "22-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
{
    title: "Will Drafting in Delhi: Online Will Registration Guide",
    href: "/locations/delhi",
    category: "Locations",
    date: "21-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Christian & Parsi Will Rules India: Indian Succession Act Guide",
    href: "/blogs/christian-parsi-will-indian-succession-act",
    category: "Guides",
    date: "21-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  // =========================================================================
  // 1. TOP FEATURED BLOG & SUCCESSION GUIDES (PRIORITIZED AT VERY TOP)
  // =========================================================================
  {
    title: "Will vs Family Trust in India: Which is Better & Legal Guide",
    href: "/blogs/will-vs-family-trust-india",
    category: "Guides",
    date: "21-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "How to Include Crypto in Will India: Digital Assets & Succession",
    href: "/blogs/digital-assets-crypto-will-india",
    category: "Guides",
    date: "21-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Is Notarized Will Valid in India: Notarized vs Registered Will",
    href: "/blogs/notarized-will-vs-registered-will-india",
    category: "Guides",
    date: "21-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Can Gift Deed Be Cancelled by Parents: Senior Citizens Act Guide",
    href: "/blogs/gift-deed-cancellation-senior-citizens-act-section-23",
    category: "Guides",
    date: "21-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Gift Deed vs Will Which is Better in India: Decision Guide",
    href: "/blogs/gift-deed-vs-will-india",
    category: "Guides",
    date: "21-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "HUF Property After Death of Karta: Legal Succession & Will Guide",
    href: "/blogs/huf-property-after-death-of-karta",
    category: "Guides",
    date: "21-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Hindu Woman Property Rights: Stridhan & Will Legal Guide",
    href: "/blogs/hindu-woman-property-rights-stridhan-will",
    category: "Guides",
    date: "21-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Second Wife and Children Property Rights in India: Legal Guide",
    href: "/blogs/second-wife-children-property-rights-india",
    category: "Guides",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Married Daughter Rights in Father Property: Legal Rights Guide",
    href: "/blogs/married-daughter-rights-in-fathers-property",
    category: "Guides",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Executor of Will Duties in India: 90-Day Legal Roadmap",
    href: "/blogs/executor-of-will-duties-india",
    category: "Guides",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "How to Challenge a Will in India: Legal Grounds & Limitation Period",
    href: "/blogs/how-to-challenge-a-will-in-india",
    category: "Guides",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Claim Unclaimed Bank Deposits of Deceased: RBI UDGAM Guide",
    href: "/blogs/claim-unclaimed-deposits-deceased-udgam",
    category: "Guides",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Property Transfer After Death of Father Without Will",
    href: "/blogs/property-transfer-after-death-without-will-india",
    category: "Guides",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Demat Shares Transmission After Death: SEBI Rules & Process",
    href: "/blogs/demat-shares-transmission-after-death-sebi",
    category: "Guides",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Legal Heir vs Succession Certificate: Key Differences",
    href: "/blogs/legal-heir-certificate-vs-succession-certificate",
    category: "Guides",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  // =========================================================================
  // 2. TOP FEATURED SERVICE & ADVOCATE PAGES
  // =========================================================================
  {
    title: "Survivor Member Certificate India: Fast SMC Application & SDM Advisory",
    href: "/services/survivor-member-certificate",
    category: "Services",
    date: "21-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Relinquishment Deed India: Haq Tyag Drafting, Stamp Duty & Registration",
    href: "/services/relinquishment-deed",
    category: "Services",
    date: "21-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Legal Heir Certificate India: Revenue Process, Mutation & Lawyers",
    href: "/services/legal-heir",
    category: "Services",
    date: "21-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "NRI Will Drafting India: Two-Will Strategy & Property Lawyers",
    href: "/services/nri-will-india",
    category: "Services",
    date: "21-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Mirror Wills for Couples in India: Joint Will Advice & Lawyers",
    href: "/services/mirror-wills-for-couples",
    category: "Services",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "How to Get Succession Certificate in India: Complete Legal Guide & Lawyers",
    href: "/services/succession-certificate",
    category: "Services",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Probate of Will Lawyers India: Grant of Probate & Letters of Administration",
    href: "/services/probate-lawyer",
    category: "Services",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Will Registration Service India: SRO Process & Home Visits",
    href: "/services/will-registration",
    category: "Services",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  // =========================================================================
  // 2. TOP FEATURED INTERACTIVE TOOLS
  // =========================================================================
  {
    title: "Do I Need an Indian Will? NRI Will Checker Tool",
    href: "/tools/nri-will-checker",
    category: "Tools",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Documents Required for Will in India: Complete Checklist",
    href: "/tools/will-checklist",
    category: "Tools",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    title: "Succession Certificate Fees: Court Fee Calculator India",
    href: "/tools/succession-certificate-court-fee-calculator",
    category: "Tools",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Is Probate Required in India? Free Probate Checker Tool",
    href: "/tools/probate-checker",
    category: "Tools",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  // =========================================================================
  // 2. NEWLY CREATED LEGAL TEMPLATES
  // =========================================================================
  {
    title: "Relinquishment Deed Format: Free Template & Legal Guide",
    href: "/templates/release-deed-format",
    category: "Templates",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 0.95,
  },
  {
    title: "Legally Valid Will Format in India for Property & Assets",
    href: "/templates/will-format-india",
    category: "Templates",
    date: "19-10-2026",
    changefreq: "weekly",
    priority: 0.95,
  },
  {
    title: "वसीयतनामा फॉर्मेट: हिंदी में कानूनी रूप से मान्य वसीयत",
    href: "/templates/will-format-hindi",
    category: "Templates",
    date: "19-10-2026",
    changefreq: "weekly",
    priority: 0.95,
  },
  {
    title: "Legally Valid Codicil Format in India to Amend a Will",
    href: "/templates/codicil-format-india",
    category: "Templates",
    date: "19-10-2026",
    changefreq: "weekly",
    priority: 0.95,
  },
  {
    title: "Living Will Format in India: Advance Medical Directive",
    href: "/templates/living-will-format-india",
    category: "Templates",
    date: "19-10-2026",
    changefreq: "weekly",
    priority: 0.95,
  },

  // =========================================================================
  // 2. NEWLY CREATED DIAGNOSTIC TOOLS & CALCULATORS
  // =========================================================================
  {
    title: "Hindu Succession Calculator: Legal Heir Shares Tool",
    href: "/tools/succession-calculator",
    category: "Tools",
    date: "18-10-2026",
    changefreq: "monthly",
    priority: 0.9,
  },

  // =========================================================================
  // 3. CORE SERVICE & SILO HUB PAGES
  // =========================================================================
  {
    title: "Online Will Drafting India: Legally Valid Will in 15 Mins",
    href: "/",
    category: "Company",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    title: "Comprehensive Will Drafting & Succession Legal Services",
    href: "/services",
    category: "Services",
    date: "18-10-2026",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    title: "NRI Will Drafting: Two-Will Estate Strategy for India",
    href: "/services/nri-will-india",
    category: "Services",
    date: "18-10-2026",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    title: "Will Drafting Pricing India: Fixed Transparent Legal Fees",
    href: "/pricing",
    category: "Services",
    date: "15-10-2026",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    title: "Succession & Estate Law Journal: Indian Will Guides",
    href: "/blogs",
    category: "Guides",
    date: "18-10-2026",
    changefreq: "weekly",
    priority: 0.8,
  },
  {
    title: "About WillDrafting: Succession Advocates & Legal Heritage",
    href: "/aboutus",
    category: "Company",
    date: "15-10-2026",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    title: "Contact Succession Advocates & Will Support Team",
    href: "/contact",
    category: "Company",
    date: "15-10-2026",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    title: "WillDrafting Sitemap: Complete Legal Directory Index",
    href: "/sitemap",
    category: "Company",
    date: "20-10-2026",
    changefreq: "weekly",
    priority: 0.6,
  },

  // =========================================================================
  // 4. STATUTORY PILLAR GUIDES (BLOGS)
  // =========================================================================
  {
    title: "NRI Will for Indian Property: Two-Will Strategy & FEMA Rules",
    href: "/blogs/nri-will-for-indian-property-two-will-strategy",
    category: "Guides",
    date: "12-10-2026",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    title: "Nominee vs Legal Heir: Supreme Court Inheritance Precedents",
    href: "/blogs/nominee-vs-legal-heir-india-supreme-court-rule",
    category: "Guides",
    date: "10-10-2026",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    title: "Probate of Will in India: High Court Rules & 2025 Reforms",
    href: "/blogs/probate-of-will-in-india-2025-amendment-mumbai-chennai-kolkata",
    category: "Guides",
    date: "08-10-2026",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    title: "Is a Will on Plain Paper Legally Valid in India?",
    href: "/blogs/will-valid-on-plain-paper-india",
    category: "Guides",
    date: "05-10-2026",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    title: "How to Appoint Testamentary Guardians for Minor Children",
    href: "/blogs/appoint-guardians-minor-children",
    category: "Guides",
    date: "02-10-2026",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    title: "Rules of Intestate Succession in India Without a Will",
    href: "/blogs/intestacy-rules-without-will",
    category: "Guides",
    date: "28-09-2026",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    title: "Ancestral vs Self-Acquired Property in Hindu Succession",
    href: "/blogs/ancestral-vs-self-acquired-property-will-hindu-succession-act",
    category: "Guides",
    date: "24-09-2026",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    title: "How to Register a Will in India: State Sub-Registrar Guide",
    href: "/blogs/how-to-register-will-in-india-state-sub-registrar-guide",
    category: "Guides",
    date: "20-09-2026",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    title: "Muslim Will (Wasiyat) Rules in India: The One-Third Limit",
    href: "/blogs/muslim-will-wasiyat-india-one-third-rule",
    category: "Guides",
    date: "15-09-2026",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    title: "Senior Citizen Will: Doctor's Medical Fitness Certificate Guide",
    href: "/blogs/senior-citizen-will-doctor-medical-fitness-certificate-india",
    category: "Guides",
    date: "10-09-2026",
    changefreq: "monthly",
    priority: 0.8,
  },
];

/**
 * Normalizes a URL path to strict lowercase, removes redundant slashes,
 * and strips trailing slashes (except root '/').
 */
export function sanitizeHref(href: string): string {
  if (!href) return "/";
  let clean = href.trim().toLowerCase();
  if (!clean.startsWith("/")) {
    clean = "/" + clean;
  }
  // Remove duplicate slashes
  clean = clean.replace(/\/+/g, "/");
  // Remove trailing slash if not root
  if (clean.length > 1 && clean.endsWith("/")) {
    clean = clean.slice(0, -1);
  }
  return clean;
}

/**
 * Converts dates ('DD-MM-YYYY', 'YYYY-MM-DD', or ISO) into standard 'YYYY-MM-DD'
 * for XML sitemap `<lastmod>` compliance.
 */
export function formatDateForXml(dateStr?: string): string {
  if (!dateStr) {
    return new Date().toISOString().split("T")[0];
  }
  const trimmed = dateStr.trim();
  // Check DD-MM-YYYY format
  const ddmmyyyyMatch = trimmed.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (ddmmyyyyMatch) {
    const [, day, month, year] = ddmmyyyyMatch;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  // Check YYYY-MM-DD format
  const yyyymmddMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (yyyymmddMatch) {
    const [, year, month, day] = yyyymmddMatch;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split("T")[0];
  }
  return new Date().toISOString().split("T")[0];
}

/**
 * Formats date into human-readable display e.g. "20 Oct 2026"
 */
export function formatDateForDisplay(dateStr?: string): string {
  if (!dateStr) return "";
  const iso = formatDateForXml(dateStr);
  const [year, month, day] = iso.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const mIndex = parseInt(month, 10) - 1;
  const mName = monthNames[mIndex] || month;
  return `${parseInt(day, 10)} ${mName} ${year}`;
}

/**
 * Returns all deduplicated, sanitized links.
 * Preserves the exact priority array ordering.
 */
export function getAllSitemapLinks(): SitemapPageItem[] {
  const seen = new Set<string>();
  const results: SitemapPageItem[] = [];

  for (const page of staticPages) {
    const cleanHref = sanitizeHref(page.href);
    if (!seen.has(cleanHref)) {
      seen.add(cleanHref);
      results.push({
        ...page,
        href: cleanHref,
        priority: page.priority !== undefined ? Math.min(Math.max(page.priority, 0.1), 1.0) : 0.8,
        changefreq: page.changefreq || "weekly",
      });
    }
  }

  return results;
}

/**
 * Returns unique sorted categories for client filter tabs.
 * 'Templates' is prioritized immediately after 'All'.
 */
export function getCategories(links: SitemapPageItem[] = staticPages): string[] {
  const categoryOrder = ["All", "Templates", "Tools", "Services", "Locations", "Guides", "Company"];
  const dynamicCategories = new Set<string>();

  for (const link of links) {
    if (link.category && link.category !== "All") {
      dynamicCategories.add(link.category);
    }
  }

  const sorted: string[] = ["All"];
  for (const cat of categoryOrder) {
    if (cat !== "All" && dynamicCategories.has(cat)) {
      sorted.push(cat);
      dynamicCategories.delete(cat);
    }
  }
  // Append any remaining categories alphabetically
  Array.from(dynamicCategories)
    .sort()
    .forEach((cat) => sorted.push(cat));

  return sorted;
}
