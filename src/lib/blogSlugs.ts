/**
 * Blog Slugs & SEO Canonicalization Registry
 *
 * Ensures all blog URLs stay strictly <= 115 characters (Screaming Frog URL length compliance),
 * normalizes legacy/renamed blog slugs, and provides verified title & description overrides
 * to prevent truncation and layout regressions.
 */

export const BLOG_SLUG_REDIRECTS: Record<string, string> = {
  "is-will-registration-mandatory-in-india-registration-charges-process-and-documents-2027":
    "is-will-registration-mandatory-in-india",
  "stridhan-property-rights-married-woman-india":
    "hindu-woman-property-rights-stridhan-will",
};

export const BLOG_SLUG_ALIASES: Record<string, string[]> = {
  "is-will-registration-mandatory-in-india": [
    "is-will-registration-mandatory-in-india",
    "is-will-registration-mandatory-in-india-registration-charges-process-and-documents-2027",
  ],
  "is-will-registration-mandatory-in-india-registration-charges-process-and-documents-2027": [
    "is-will-registration-mandatory-in-india",
    "is-will-registration-mandatory-in-india-registration-charges-process-and-documents-2027",
  ],
  "hindu-woman-property-rights-stridhan-will": [
    "hindu-woman-property-rights-stridhan-will",
    "stridhan-property-rights-married-woman-india",
  ],
  "stridhan-property-rights-married-woman-india": [
    "hindu-woman-property-rights-stridhan-will",
    "stridhan-property-rights-married-woman-india",
  ],
};

export const BLOG_TITLE_OVERRIDES: Record<string, string> = {
  // Primary SSOT titles for site listings, sitemaps, and RSS feeds
  "murderer-disqualified-from-inheritance-section-25-hsa":
    "Murderer Disqualified From Inheriting Property: Section 25",
  "cooperative-housing-society-flat-transfer-after-death-maharashtra-delhi":
    "Society Flat Transfer After Death: Complete Legal Guide",
  "life-insurance-beneficial-nominee-section-39-vs-legal-heir-will":
    "Beneficial Nominee in Life Insurance Section 39 vs Will",
  "leasehold-property-dda-noihda-mhada-cidco-transfer-after-death":
    "How to Transfer Leasehold Property After Death in India",
  "estranged-spouse-separation-without-divorce-inheritance-rights":
    "Separated Spouse Inheritance & Property Rights in India",
  "home-loan-after-death-of-borrower-legal-heir-liability-india":
    "Home Loan After Death of Borrower: Legal Heir Liability",
  "uae-dubai-expat-nri-difc-will-vs-indian-will-property":
    "Dubai NRI Will Guide for UAE and Indian Property Assets",
  "lost-or-destroyed-will-how-to-prove-and-probate-copy-section-237":
    "What If Original Will Is Lost or Destroyed in India?",
  "india-double-taxation-avoidance-agreement-dtaa-inheritance-capital-gains":
    "DTAA on Sale of Inherited Property in India: NRI Tax Guide",
  "gram-panchayat-lal-dora-abadi-land-inheritance-without-registry":
    "Village Lal Dora Property Will & Inheritance Guide",
  "tribal-scheduled-tribe-property-inheritance-will-rules-india":
    "Scheduled Tribe Property Inheritance & Will Rules in India",
  "elderly-childless-couple-estate-planning-charity-relatives-india":
    "Estate Planning Guide for Childless Elderly Couples in India",
  "abatement-of-legacies-when-deceased-debts-exceed-estate-assets-india":
    "Payment of Debts & Abatement of Legacies in India: Guide",
  "ademption-of-legacy-what-if-property-mentioned-in-will-is-sold-before-death":
    "Property in Will Sold Before Death: Ademption of Legacy Guide",
  "forged-will-punishment-ipc-bns-handwriting-expert-cfsl-challenge":
    "How to Prove a Forged Will in Court in India: Legal Steps",
  "medical-reimbursement-and-health-insurance-claim-after-patient-death":
    "Claim Health Insurance Reimbursement After Patient Death",
  "canada-nri-oci-indian-inheritance-cra-deemed-disposition-form-t1135":
    "Canadian NRI Inheriting Property in India: CRA Tax Rules",
  "will-writing-services-in-gurgaon-sector-57":
    "Will Writing & Legal Drafting Services in Gurgaon Sector 57",

  // Canonical alias & legacy URL protection
  "is-will-registration-mandatory-in-india":
    "Is Will Registration Mandatory in India? Fees & Process",
  "is-will-registration-mandatory-in-india-registration-charges-process-and-documents-2027":
    "Is Will Registration Mandatory in India? Fees & Process",
};

/**
 * Dedicated Page Title (<title>) overrides to resolve Screaming Frog "Page Titles: Same as H1"
 * opportunities. Differentiates SERP click intent and secondary keywords while strictly
 * maintaining lengths between 30 and 60 characters and <= 561 px width.
 */
export const BLOG_META_TITLE_OVERRIDES: Record<string, string> = {
  "murderer-disqualified-from-inheritance-section-25-hsa":
    "Can a Murderer Inherit Property? Section 25 HSA Rules",
  "cooperative-housing-society-flat-transfer-after-death-maharashtra-delhi":
    "Society Flat Transfer After Death in Maharashtra & Delhi",
  "life-insurance-beneficial-nominee-section-39-vs-legal-heir-will":
    "Does Nominee or Legal Heir Get Life Insurance? Section 39",
  "leasehold-property-dda-noihda-mhada-cidco-transfer-after-death":
    "Transfer Leasehold Property After Death: DDA, NOIDA, MHADA",
  "estranged-spouse-separation-without-divorce-inheritance-rights":
    "Can Separated Spouse Claim Property Rights Without Divorce?",
  "home-loan-after-death-of-borrower-legal-heir-liability-india":
    "Who Pays Home Loan After Borrower Death? Legal Heir Rights",
  "uae-dubai-expat-nri-difc-will-vs-indian-will-property":
    "DIFC Will vs Indian Will for Dubai NRIs: Property Rules",
  "lost-or-destroyed-will-how-to-prove-and-probate-copy-section-237":
    "How to Prove & Probate a Lost Will in India: Section 237",
  "india-double-taxation-avoidance-agreement-dtaa-inheritance-capital-gains":
    "NRI Capital Gains & DTAA on Inherited Property in India",
  "gram-panchayat-lal-dora-abadi-land-inheritance-without-registry":
    "Lal Dora & Abadi Land Inheritance in India Without Registry",
  "tribal-scheduled-tribe-property-inheritance-will-rules-india":
    "Scheduled Tribe Property Inheritance Law & Customary Rules",
  "elderly-childless-couple-estate-planning-charity-relatives-india":
    "Estate Planning for Childless Couples: Will, Trust & Charity",
  "abatement-of-legacies-when-deceased-debts-exceed-estate-assets-india":
    "When Estate Debts Exceed Assets: Abatement of Legacies Rules",
  "ademption-of-legacy-what-if-property-mentioned-in-will-is-sold-before-death":
    "Ademption of Legacy in India: Property Sold Before Death",
  "forged-will-punishment-ipc-bns-handwriting-expert-cfsl-challenge":
    "How to Challenge & Prove a Forged Will in Court: BNS & CFSL",
  "medical-reimbursement-and-health-insurance-claim-after-patient-death":
    "How Legal Heirs Claim Health Insurance After Patient Death",
  "canada-nri-oci-indian-inheritance-cra-deemed-disposition-form-t1135":
    "Canadian NRI Indian Inheritance: CRA Tax Rules & Form T1135",
  "will-writing-services-in-gurgaon-sector-57":
    "Will Writing Services in Gurgaon Sector 57 | WillDrafting",

  // Canonical alias & legacy URL protection
  "is-will-registration-mandatory-in-india":
    "Is Will Registration Mandatory in India? Fees & Process",
  "is-will-registration-mandatory-in-india-registration-charges-process-and-documents-2027":
    "Is Will Registration Mandatory in India? Fees & Process",
};

/**
 * Dedicated on-page <h1> overrides. Strips awkward branding suffixes from headings,
 * adheres to <= 70 characters, and matches schema Article.headline verbatim.
 */
export const BLOG_H1_OVERRIDES: Record<string, string> = {
  "murderer-disqualified-from-inheritance-section-25-hsa":
    "Murderer Disqualified From Inheriting Property: Section 25",
  "cooperative-housing-society-flat-transfer-after-death-maharashtra-delhi":
    "Society Flat Transfer After Death: Complete Legal Guide",
  "life-insurance-beneficial-nominee-section-39-vs-legal-heir-will":
    "Beneficial Nominee in Life Insurance Section 39 vs Will",
  "leasehold-property-dda-noihda-mhada-cidco-transfer-after-death":
    "How to Transfer Leasehold Property After Death in India",
  "estranged-spouse-separation-without-divorce-inheritance-rights":
    "Separated Spouse Inheritance & Property Rights in India",
  "home-loan-after-death-of-borrower-legal-heir-liability-india":
    "Home Loan After Death of Borrower: Legal Heir Liability",
  "uae-dubai-expat-nri-difc-will-vs-indian-will-property":
    "Dubai NRI Will Guide for UAE and Indian Property Assets",
  "lost-or-destroyed-will-how-to-prove-and-probate-copy-section-237":
    "What If Original Will Is Lost or Destroyed in India?",
  "india-double-taxation-avoidance-agreement-dtaa-inheritance-capital-gains":
    "DTAA on Sale of Inherited Property in India: NRI Tax Guide",
  "gram-panchayat-lal-dora-abadi-land-inheritance-without-registry":
    "Village Lal Dora Property Will & Inheritance Guide",
  "tribal-scheduled-tribe-property-inheritance-will-rules-india":
    "Scheduled Tribe Property Inheritance & Will Rules in India",
  "elderly-childless-couple-estate-planning-charity-relatives-india":
    "Estate Planning Guide for Childless Elderly Couples in India",
  "abatement-of-legacies-when-deceased-debts-exceed-estate-assets-india":
    "Payment of Debts & Abatement of Legacies in India: Guide",
  "ademption-of-legacy-what-if-property-mentioned-in-will-is-sold-before-death":
    "Property in Will Sold Before Death: Ademption of Legacy Guide",
  "forged-will-punishment-ipc-bns-handwriting-expert-cfsl-challenge":
    "How to Prove a Forged Will in Court in India: Legal Steps",
  "medical-reimbursement-and-health-insurance-claim-after-patient-death":
    "Claim Health Insurance Reimbursement After Patient Death",
  "canada-nri-oci-indian-inheritance-cra-deemed-disposition-form-t1135":
    "Canadian NRI Inheriting Property in India: CRA Tax Rules",
  "will-writing-services-in-gurgaon-sector-57":
    "Will Writing & Legal Drafting Services in Gurgaon Sector 57",

  // Canonical alias & legacy URL protection
  "is-will-registration-mandatory-in-india":
    "Is Will Registration Mandatory in India? Complete Legal Guide",
  "is-will-registration-mandatory-in-india-registration-charges-process-and-documents-2027":
    "Is Will Registration Mandatory in India? Complete Legal Guide",
};

export const BLOG_DESCRIPTION_OVERRIDES: Record<string, string> = {
  "is-will-registration-mandatory-in-india":
    "Is Will registration mandatory in India? Check legal position under Section 18, state-wise SRO charges, required documents, and execution rules.",
  "is-will-registration-mandatory-in-india-registration-charges-process-and-documents-2027":
    "Is Will registration mandatory in India? Check legal position under Section 18, state-wise SRO charges, required documents, and execution rules.",
};

/**
 * Returns the canonical shortened slug for any blog slug.
 */
export function canonicalizeBlogSlug(slug?: string | null): string {
  if (!slug) return "";
  const normalized = slug.trim().toLowerCase();
  return BLOG_SLUG_REDIRECTS[normalized] || slug;
}

/**
 * Returns an array of candidate slugs to query MongoDB for, including canonical and aliases.
 */
export function getBlogSlugLookupCandidates(slug?: string | null): string[] {
  if (!slug) return [];
  const normalized = slug.trim().toLowerCase();
  const canonical = canonicalizeBlogSlug(normalized);
  const aliases = BLOG_SLUG_ALIASES[canonical] || BLOG_SLUG_ALIASES[normalized] || [];
  return Array.from(new Set([canonical, normalized, ...aliases]));
}
