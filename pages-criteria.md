# WillDrafting.in — 30 Page Criteria & Creation Prompts

> Extracted and expanded from **WillDrafting-30-URL-SEO-Plan.pdf**
> Prepared: October 19, 2026 · Powered by AMA Legal Solutions

---

## Table of Contents

1. [Global SEO & Content Rules](#global-seo--content-rules)
2. [Volume & Difficulty Tier Definitions](#volume--difficulty-tier-definitions)
3. [Internal Linking Master Rules](#internal-linking-master-rules)
4. [Silo Architecture Overview](#silo-architecture-overview)
5. [TEMPLATES SILO (Pages #1–#5)](#templates-silo-pages-15)
6. [TOOLS SILO (Pages #6–#9)](#tools-silo-pages-69)
7. [SERVICE SILO (Pages #10–#13)](#service-silo-pages-1013)
8. [BLOGS — Post-Death Cluster (Pages #14–#19)](#blogs--post-death-cluster-pages-1419)
9. [BLOGS — Family Rights Cluster (Pages #20–#24)](#blogs--family-rights-cluster-pages-2024)
10. [BLOGS — Will Lifecycle & Planning Cluster (Pages #25–#30)](#blogs--will-lifecycle--planning-cluster-pages-2530)
11. [Rollout Schedule (3 Waves)](#rollout-schedule-3-waves)
12. [What NOT to Build](#what-not-to-build)
13. [Facts to Verify Before Publishing](#facts-to-verify-before-publishing)
14. [Implementation Notes (Codebase)](#implementation-notes-codebase)

---

## Global SEO & Content Rules

All 30 pages must follow these universal rules:

| Rule | Specification |
|---|---|
| **SEO Title** | 30–60 characters |
| **Meta Description** | 70–155 characters |
| **H1** | < 70 characters |
| **H2s** | < 70 characters each |
| **Schema (Blogs)** | `Article` + `FAQPage` + `BreadcrumbList` |
| **Schema (Templates)** | `HowTo` + `FAQPage` + `BreadcrumbList` |
| **Schema (Tools)** | `WebApplication` + `FAQPage` |
| **Schema (Services)** | `Service` + `Offer` + `FAQPage` |
| **Imagery** | Indian imagery ONLY |
| **Comparison Table** | At least one per blog page |
| **Primary CTA** | Every page links to `/start` |
| **Silo Links** | Every page links to at least 2 related pages in the same silo |
| **Anchor Text** | Descriptive and varied — NEVER use exact-match primary keyword as anchor text more than once per page |
| **Content Quality** | YMYL legal niche — must be factually accurate, cite statutes, no AI-spun FAQ pages |
| **Tone & Language** | Plain layman language — must be crystal-clear and simple so that anyone coming to the page can easily understand everything; explain legal terminology in conversational terms without losing statutory accuracy |

> [!IMPORTANT]
> **Universal Layman-Language Rule:** Every page must be written in clear, simple layman language. While WillDrafting.in is in the YMYL legal space and must maintain complete statutory accuracy (citing relevant acts, sections, and court rulings), the explanations, steps, and takeaways must be free from dense legal jargon. Any ordinary person, senior citizen, grieving family member, or NRI visiting the page must be able to read, easily understand everything, and confidently take action.

---

## Volume & Difficulty Tier Definitions

| Volume Tier | Monthly Search Volume (India) |
|---|---|
| **XL** | 50K+ |
| **L** | 10K–50K |
| **M** | 2K–10K |
| **S** | 500–2K |
| **XS** | < 500 (only when conversion intent is very high) |

| Difficulty (KD) | What's Ranking |
|---|---|
| **Low** | Forums / thin blogs ranking |
| **Med** | LawRato / NoBroker / Bajaj / WillJini ranking |
| **High** | .gov.in portals + big finance/property publishers own the top 5 |

---

## Internal Linking Master Rules

| Page Group | Links To |
|---|---|
| Templates #1–#5 | → `/start` ("fill it in for me") |
| Tools #6–#9 | → `/start` and `/service/nri-will-india` |
| Post-death guides #14–#19 | → AMA services #11, #12 and `/tools/succession-calculator` |
| Rights guides #20–#24 | → `/tools/succession-calculator` and `/start` |
| Lifecycle guides #25–#30 | → `/start` and `/pricing` |
| `/tools/succession-calculator` | → `/start` |

> [!IMPORTANT]
> 1. Post-death pages (#14–#19) ALWAYS include a section titled **"How a Will Would Have Avoided This"** that links to `/start`. This is the conversion bridge.
> 2. Rights pages (#20–#24) embed or deep-link the relevant `/tools/succession-calculator` mode.
> 3. Update the existing 10 blogs to link out to the new pages.

---

## Silo Architecture Overview

```
/  (Homepage)
├── /service — Commercial (existing + 4 NEW)
│   ├── /service (existing)
│   ├── /service/nri-will-india (existing)
│   ├── /service/will-registration (NEW #10)
│   ├── /service/probate-lawyer (NEW #11)
│   ├── /service/succession-certificate (NEW #12)
│   └── /service/mirror-wills-for-couples (NEW #13)
│
├── /templates — NEW format silo (5 NEW)
│   ├── /templates (index page — structural, not counted)
│   ├── /templates/will-format-india (#1)
│   ├── /templates/will-format-hindi (#2)
│   ├── /templates/codicil-format-india (#3)
│   ├── /templates/living-will-format-india (#4)
│   └── /templates/release-deed-format (#5)
│
├── /tools — Interactive (existing + 4 NEW)
│   ├── /tools/succession-calculator (existing)
│   ├── /tools/will-checklist (#6)
│   ├── /tools/probate-checker (#7)
│   ├── /tools/succession-certificate-court-fee-calculator (#8)
│   └── /tools/nri-will-checker (#9)
│
└── /blogs — Statutory guides (existing 10 + 17 NEW)
    ├── 10 existing blog guides
    ├── Post-Death Cluster (#14–#19)
    ├── Family Rights Cluster (#20–#24)
    └── Will Lifecycle & Planning Cluster (#25–#30)
```

---

## TEMPLATES SILO (Pages #1–#5)

> [!TIP]
> **Template page pattern:** Every template page must contain: (a) the copy-paste/printable format, (b) a short "will this be legally valid?" checklist under Section 63, (c) the 3 most common mistakes, and (d) a CTA: "Want this filled in, checked by an advocate, and print-ready in 15 minutes? → /start"

---

### Page #1 — `/templates/will-format-india`

| Field | Value |
|---|---|
| **URL** | `/templates/will-format-india` |
| **Page Type** | Template |
| **Primary Keyword** | `will format in india` |
| **Volume Tier** | L (10K–50K) |
| **Keyword Difficulty** | Med |
| **Intent** | Format / DIY |
| **Converts to /start?** | ★★★ Very high |
| **Wave** | 1 (Weeks 1–4) |
| **Secondary Keywords** | `will format pdf`, `simple will format`, `will format for property`, `will format word` |
| **Competitor Gap** | Ranking pages are bare templates with no execution guidance, and some still say stamp paper is needed |
| **Unique Asset** | Clause-annotated format (why each clause exists) + Section 63 witness block + Section 67 warning + printable layout |
| **Schema** | HowTo + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/templates/will-format-hindi`, → `/blogs/notarized-will-vs-registered-will-india` |
| **Implementation** | `src/app/templates/[slug]/page.tsx` + `src/data/templates.ts` |

**Creation Prompt:**
> Create a page at `/templates/will-format-india` targeting the keyword "will format in india" (10K–50K monthly searches). The page must include: (1) A clean, printable, clause-annotated Will format/template for Indian property with each clause explained in a sidebar/annotation — why it exists legally; (2) A highlighted Section 63 (Indian Succession Act) witness attestation block with exact requirements (2 witnesses, testator's signature, etc.); (3) A Section 67 warning callout box explaining that stamp paper is NOT legally required for a Will in India; (4) A "3 Most Common Mistakes" section (e.g., using stamp paper unnecessarily, not having 2 witnesses, ambiguous property descriptions); (5) A "Will this be legally valid?" interactive checklist under Section 63; (6) A prominent CTA: "Want this filled in, checked by an advocate, and print-ready in 15 minutes? → /start"; (7) FAQ schema with 5+ questions covering "is stamp paper needed", "how many witnesses", "do I need a lawyer", "can I type or handwrite", "does it need registration"; (8) HowTo + BreadcrumbList schema; (9) SEO title 30–60 chars, meta desc 70–155 chars, H1 < 70 chars. Use Indian imagery only. Link to `/start`, `/templates/will-format-hindi`, and `/blogs/notarized-will-vs-registered-will-india`.

---

### Page #2 — `/templates/will-format-hindi`

| Field | Value |
|---|---|
| **URL** | `/templates/will-format-hindi` |
| **Page Type** | Template (Hindi) |
| **Primary Keyword** | `वसीयतनामा फॉर्मेट` / `will format in hindi` |
| **Volume Tier** | L (10K–50K) |
| **Keyword Difficulty** | Low |
| **Intent** | Format / DIY |
| **Converts to /start?** | ★★★ Very high |
| **Wave** | 1 (Weeks 1–4) |
| **Secondary Keywords** | `vasiyat nama format`, `वसीयत कैसे लखें`, `will format in hindi pdf` |
| **Competitor Gap** | Hindi results are thin and have grammar/legal errors |
| **Unique Asset** | Fully Hindi page (`lang="hi"`), bilingual toggle reusing the existing EN/HI wizard copy, Hindi FAQ schema |
| **Schema** | HowTo + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/templates/will-format-india`, → `/blogs/notarized-will-vs-registered-will-india` |
| **Implementation** | `src/app/templates/[slug]/page.tsx` — set `lang="hi"` on page wrapper, Devanagari title and meta description |

**Creation Prompt:**
> Create a fully Hindi-language page at `/templates/will-format-hindi` targeting "वसीयतनामा फॉर्मेट" and "will format in hindi" (10K–50K monthly). Set `lang="hi"` on the page wrapper. The page must include: (1) A complete, grammatically correct, legally accurate Will template/format entirely in Hindi (Devanagari script) with each clause annotated explaining its legal purpose; (2) Section 63 requirements explained in simple Hindi; (3) A bilingual toggle button that switches to the English version at `/templates/will-format-india`; (4) "3 सबसे आम गलतियाँ" (3 Most Common Mistakes) section in Hindi; (5) A "क्या यह वसीयत कानूनी रूप से मान्य होगी?" checklist in Hindi; (6) CTA in Hindi: "एक वकील द्वारा जांचा हुआ, प्रिंट-रेडी वसीयतनामा 15 मिनट में चाहिए? → /start"; (7) Hindi FAQ schema with 5+ questions; (8) SEO title and meta description in Devanagari, 30–60 / 70–155 chars; (9) Indian imagery only. Internal links to `/start`, `/templates/will-format-india`.

---

### Page #3 — `/templates/codicil-format-india`

| Field | Value |
|---|---|
| **URL** | `/templates/codicil-format-india` |
| **Page Type** | Template |
| **Primary Keyword** | `codicil format` / `how to change a will` |
| **Volume Tier** | S (500–2K) |
| **Keyword Difficulty** | Low |
| **Intent** | Format |
| **Converts to /start?** | ★★ High |
| **Wave** | 2 (Weeks 5–8) |
| **Secondary Keywords** | `codicil vs new will`, `how to change a will in india`, `codicil to a will sample`, `amendment to will` |
| **Competitor Gap** | Usually buried inside generic articles — no standalone codicil resource |
| **Unique Asset** | Codicil format + "Codicil or New Will?" decision table |
| **Schema** | HowTo + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/templates/will-format-india`, → related blog |

**Creation Prompt:**
> Create a page at `/templates/codicil-format-india` targeting "codicil format" and "how to change a will" (500–2K monthly). Include: (1) A clean, printable codicil format/template with clause annotations; (2) A "Codicil or New Will?" decision comparison table (when to use codicil vs. drafting a new Will — e.g., minor changes = codicil, major changes = new Will); (3) Legal requirements for a valid codicil under Indian Succession Act (same attestation rules as a Will under Section 63); (4) "3 Most Common Mistakes" section specific to codicils; (5) Section explaining how a codicil relates to the original Will and what happens if they conflict; (6) CTA: "Want this filled in, checked by an advocate, and print-ready in 15 minutes? → /start"; (7) FAQ schema with 5+ questions; (8) HowTo + BreadcrumbList schema. Link to `/start`, `/templates/will-format-india`.

---

### Page #4 — `/templates/living-will-format-india`

| Field | Value |
|---|---|
| **URL** | `/templates/living-will-format-india` |
| **Page Type** | Template |
| **Primary Keyword** | `living will format india` |
| **Volume Tier** | M (2K–10K) |
| **Keyword Difficulty** | Low |
| **Intent** | Format |
| **Converts to /start?** | ★★ High |
| **Wave** | 2 (Weeks 5–8) |
| **Secondary Keywords** | `advance medical directive india`, `living will procedure 2023`, `advance directive format`, `passive euthanasia will india` |
| **Competitor Gap** | Most pages still describe the old 2018 magistrate process |
| **Unique Asset** | Format reflecting the **Jan 2023 SC modification** (notary / gazetted officer attestation) + where to deposit copies |
| **Must-Verify Fact** | The Jan 2023 living will modification details — verify against SC order in *Common Cause v. Union of India (M.A. 1699/2019)* |
| **Schema** | HowTo + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/templates/will-format-india`, → related blog |

**Creation Prompt:**
> Create a page at `/templates/living-will-format-india` targeting "living will format india" (2K–10K monthly). CRITICAL: This page MUST reflect the **January 2023 Supreme Court modification** to the living will process — NOT the old 2018 magistrate-centric procedure. Include: (1) A printable advance medical directive / living will format updated for the 2023 SC order (notary / gazetted officer attestation, no magistrate required); (2) Step-by-step "where to deposit copies" guide (hospital, family doctor, family member, municipal authority); (3) Comparison table: 2018 process vs. 2023 simplified process; (4) "Who can be a witness" and attestation requirements; (5) "3 Most Common Mistakes" section; (6) CTA to `/start`; (7) FAQ schema with 5+ questions covering "is living will legal in India", "can I revoke a living will", "who decides when it takes effect", "difference between living will and regular will"; (8) HowTo + BreadcrumbList schema. **⚠️ VERIFY: Confirm Jan 2023 modification details against SC order in Common Cause v. Union of India (M.A. 1699/2019) before publishing.**

---

### Page #5 — `/templates/release-deed-format`

| Field | Value |
|---|---|
| **URL** | `/templates/release-deed-format` |
| **Page Type** | Template |
| **Primary Keyword** | `relinquishment deed format` |
| **Volume Tier** | L (10K–50K) |
| **Keyword Difficulty** | Med |
| **Intent** | Format |
| **Converts to /start?** | ★ Medium |
| **Wave** | 2 (Weeks 5–8) |
| **Secondary Keywords** | `release deed format`, `relinquishment deed stamp duty`, `release deed vs gift deed`, `family settlement deed format` |
| **Competitor Gap** | Relinquishment vs release vs gift is confused everywhere |
| **Unique Asset** | Format + 3-way comparison table + "when NOT to use it" (self-acquired property → gift deed or Will instead) |
| **Must-Verify Fact** | State stamp duty rates for family release / gift deeds — verify against each state's stamp act schedules |
| **Schema** | HowTo + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/blogs/gift-deed-vs-will-india` (#25), → `/templates/will-format-india` |

**Creation Prompt:**
> Create a page at `/templates/release-deed-format` targeting "relinquishment deed format" (10K–50K monthly). Include: (1) A clean, printable release/relinquishment deed format with clause annotations; (2) A **3-way comparison table**: Release Deed vs. Gift Deed vs. Relinquishment Deed — when to use each, legal differences, stamp duty implications; (3) A critical "When NOT to use a release deed" section (e.g., self-acquired property should use a gift deed or Will instead); (4) Stamp duty overview by major states (with caveat to verify current rates); (5) Registration requirements; (6) "3 Most Common Mistakes" section; (7) CTA to `/start`; (8) FAQ schema with 5+ questions; (9) HowTo + BreadcrumbList schema. Link to `/start`, `/blogs/gift-deed-vs-will-india`, `/templates/will-format-india`. **⚠️ VERIFY: State stamp duty rates for family release / gift deeds against each state's stamp act schedules.**

---

## TOOLS SILO (Pages #6–#9)

> [!TIP]
> **Tool page pattern:** Client-side interactive components following the `SuccessionCalculator.tsx` pattern. Server page wrapper with `WebApplication` + `FAQPage` schema. Cheap to build, earn links and repeat visits.

---

### Page #6 — `/tools/will-checklist`

| Field | Value |
|---|---|
| **URL** | `/tools/will-checklist` |
| **Page Type** | Interactive Tool |
| **Primary Keyword** | `documents required for will in india` |
| **Volume Tier** | S (500–2K) |
| **Keyword Difficulty** | Low |
| **Intent** | Planning |
| **Converts to /start?** | ★★★ Very high |
| **Wave** | 1 (Weeks 1–4) |
| **Secondary Keywords** | `will checklist india`, `what do I need to make a will`, `will preparation checklist`, `will documents list` |
| **Competitor Gap** | iWills ranks with exactly this type of content. No other competitor has a comprehensive interactive checklist |
| **What It Does** | Interactive checklist across ~15 asset classes (property, bank, demat, MF, PPF/EPF, insurance, locker, vehicles, digital) + appointments (executor, guardian) |
| **Output CTA** | "Your checklist is ready → start your Will with this pre-filled" |
| **Schema** | WebApplication + FAQPage |
| **Internal Links** | → `/start` (with pre-filled data), → `/service/nri-will-india`, → `/templates/will-format-india` |
| **Implementation** | Client component following `SuccessionCalculator.tsx` pattern |

**Creation Prompt:**
> Create an interactive tool page at `/tools/will-checklist` targeting "documents required for will in india" (500–2K monthly). Build a client-side React component following the `SuccessionCalculator.tsx` pattern. The tool should: (1) Present an interactive, checkbox-driven checklist across **~15 asset classes**: real property (owned/inherited), bank accounts (savings, FD, RD), demat shares & mutual funds, PPF/EPF/NPS, insurance policies (life, health), bank locker, vehicles, jewelry & valuables, business interests/partnership, intellectual property, digital assets (email, social media, crypto), loans & liabilities, foreign assets; (2) Include appointment sections: executor, guardian for minor children, alternate executor; (3) As the user checks items, dynamically build a "Will-Ready" document list showing what documents/information they need for each asset; (4) Generate a printable/downloadable PDF summary; (5) End with CTA: "Your checklist is ready → start your Will with this pre-filled → /start"; (6) Include FAQ schema with 5+ questions; (7) WebApplication + FAQPage schema on the server wrapper. Use smooth animations, progress indicators. Indian imagery only.

---

### Page #7 — `/tools/probate-checker`

| Field | Value |
|---|---|
| **URL** | `/tools/probate-checker` |
| **Page Type** | Interactive Tool |
| **Primary Keyword** | `is probate required in india` |
| **Volume Tier** | S (500–2K) |
| **Keyword Difficulty** | Low |
| **Intent** | Diagnostic |
| **Converts to /start?** | ★★ High |
| **Wave** | 2 (Weeks 5–8) |
| **Secondary Keywords** | `probate required states india`, `do I need probate`, `probate checker tool`, `will probate rules` |
| **Competitor Gap** | Builds on Blog #3 (2025 amendment). No competitor has a diagnostic checker tool |
| **What It Does** | 5 questions: (1) Is the Will contested? (2) Foreign Will? (3) Property in Mumbai/Chennai/Kolkata? (4) Bank/institution demanding probate? (5) Executor named? → Probate likely / not likely |
| **Output CTA** | Low risk → `/start` · High risk → `/service/probate-lawyer` |
| **Schema** | WebApplication + FAQPage |
| **Internal Links** | → `/start`, → `/service/probate-lawyer`, → Blog #3 |
| **Implementation** | Client component following `SuccessionCalculator.tsx` pattern |

**Creation Prompt:**
> Create an interactive diagnostic tool at `/tools/probate-checker` targeting "is probate required in india" (500–2K monthly). Build a client-side React component (following `SuccessionCalculator.tsx`). The tool asks **5 sequential questions** with clear Yes/No buttons: (1) "Is the Will contested or likely to be challenged?" (2) "Was the Will made in a foreign country?" (3) "Does the estate include immovable property in Mumbai, Chennai, or Kolkata (mandatory probate jurisdictions)?" (4) "Is any bank or institution demanding probate before releasing assets?" (5) "Is an executor named in the Will?" Based on answers, calculate a **Probate Risk Score** and display: **Low Risk** → "You likely don't need probate → Make your Will challenge-proof with /start" OR **High Risk** → "You likely need probate → Consult our probate lawyers at /service/probate-lawyer". Include explanation of why each answer matters. FAQ schema with 5+ questions about probate. WebApplication schema. Indian imagery only.

---

### Page #8 — `/tools/succession-certificate-court-fee-calculator`

| Field | Value |
|---|---|
| **URL** | `/tools/succession-certificate-court-fee-calculator` |
| **Page Type** | Interactive Tool |
| **Primary Keyword** | `succession certificate fees` |
| **Volume Tier** | S (500–2K) |
| **Keyword Difficulty** | Low |
| **Intent** | Diagnostic |
| **Converts to /start?** | ★ Medium (AMA lead) |
| **Wave** | 3 (Weeks 9–12) |
| **Secondary Keywords** | `succession certificate court fees by state`, `court fee calculator india`, `succession certificate cost`, `ad valorem fee succession` |
| **Competitor Gap** | Fees vary by state (roughly 2%–7.5% with caps) and nobody calculates it |
| **What It Does** | Select state + asset value → estimated ad valorem court fee range for a succession certificate |
| **Output CTA** | "A Will avoids this cost entirely" → `/start` + AMA service CTA |
| **Must-Verify Fact** | State court-fee percentages and caps for succession certificates — verify against each state's Court Fees Act schedule |
| **Schema** | WebApplication + FAQPage |
| **Internal Links** | → `/start`, → `/service/succession-certificate`, → Blog #14 |
| **Implementation** | Client component following `SuccessionCalculator.tsx` pattern |

**Creation Prompt:**
> Create an interactive calculator tool at `/tools/succession-certificate-court-fee-calculator` targeting "succession certificate fees" (500–2K monthly). Build a client-side React component. The tool should: (1) Let user select their **state** from a dropdown of all Indian states; (2) Enter the **total asset value** for which the succession certificate is needed; (3) Calculate and display the **estimated ad valorem court fee** based on that state's rates (roughly 2%–7.5% with various caps); (4) Show a state-wise comparison table of court fee rates; (5) Prominently display: **"A Will avoids this cost entirely"** with cost savings highlighted → CTA to `/start`; (6) Secondary CTA: "Need help getting a succession certificate? → /service/succession-certificate"; (7) FAQ schema; (8) WebApplication schema. **⚠️ VERIFY: State court-fee percentages and caps against each state's Court Fees Act schedule before publishing.**

---

### Page #9 — `/tools/nri-will-checker`

| Field | Value |
|---|---|
| **URL** | `/tools/nri-will-checker` |
| **Page Type** | Interactive Tool |
| **Primary Keyword** | `do i need an indian will` (NRI) |
| **Volume Tier** | XS (< 500, very high conversion intent) |
| **Keyword Difficulty** | Low |
| **Intent** | Diagnostic |
| **Converts to /start?** | ★★★ Very high |
| **Wave** | 1 (Weeks 1–4) |
| **Secondary Keywords** | `NRI will checker`, `do NRI need separate will for India`, `Indian will for NRI`, `two will strategy NRI` |
| **Competitor Gap** | Copies NRIWillGenius's top tool. Sends traffic to the NRI hub |
| **What It Does** | Country of residence + Indian asset types + existing foreign Will? → Need a separate Indian Will? |
| **Output CTA** | → `/service/nri-will-india` |
| **Schema** | WebApplication + FAQPage |
| **Internal Links** | → `/service/nri-will-india`, → `/start`, → Blog #1 (NRI Will guide) |
| **Implementation** | Client component following `SuccessionCalculator.tsx` pattern |

**Creation Prompt:**
> Create an interactive diagnostic tool at `/tools/nri-will-checker` targeting "do I need an Indian will" for NRIs (< 500 monthly, but extremely high conversion intent). Build a client-side React component. The tool asks: (1) "What country do you currently reside in?" (dropdown); (2) "What Indian asset types do you own?" (checkboxes: residential property, commercial property, agricultural land, bank accounts NRE/NRO, demat/MF, insurance, business interests, other); (3) "Do you already have a Will in your country of residence?" (Yes/No); (4) "Does your existing Will mention Indian assets specifically?" (Yes/No/NA). Based on answers, provide a **recommendation**: "Yes, you need a separate Indian Will" (most cases) OR "Your existing Will may suffice, but verify with a lawyer" → CTA: "Create your Indian Will now → /service/nri-will-india". Include explanation of the Two-Will Strategy, FEMA inheritance rules overview, Section 228 Indian Succession Act. FAQ schema. WebApplication schema. Indian imagery only.

---

## SERVICE SILO (Pages #10–#13)

> [!CAUTION]
> **ONLY publish a service page for a service AMA Legal Solutions actually delivers, with real pricing or a real consultation flow.** Thin or misleading service pages in a YMYL legal niche can lead to a manual action and damage trust. If a service isn't offered yet, skip the URL rather than publishing a placeholder.

---

### Page #10 — `/service/will-registration`

| Field | Value |
|---|---|
| **URL** | `/service/will-registration` |
| **Page Type** | Service |
| **Primary Keyword** | `will registration service india` |
| **Volume Tier** | M (2K–10K) |
| **Keyword Difficulty** | Med |
| **Intent** | Commercial |
| **Converts to /start?** | ★★★ Direct revenue |
| **Wave** | 1 (Weeks 1–4) |
| **Secondary Keywords** | `will registration online`, `register will at sub registrar`, `will registration fees`, `SRO will registration process` |
| **Angle** | Done-for-you SRO registration (booking, witnesses, home visit under Section 31) |
| **Pulls Traffic From** | Blog #8 (state SRO guide) |
| **Schema** | Service + Offer + FAQPage |
| **Internal Links** | → `/start`, → Blog #8, → `/pricing` |
| **Implementation** | Server page under `src/app/service/*`. Prices must match `src/lib/plans.ts` |

**Creation Prompt:**
> Create a service landing page at `/service/will-registration` targeting "will registration service india" (2K–10K monthly). This is a **commercial service page** for AMA's done-for-you Will registration at the Sub-Registrar's Office (SRO). Include: (1) Hero section with clear value proposition: "We handle the entire Will registration process — SRO booking, witnesses, home visit, and all paperwork"; (2) **Service process** (step-by-step): Document preparation → SRO appointment booking → Witness arrangement → Registration day (with/without home visit under Section 31) → Certified copy delivery; (3) **Pricing section** (must match `src/lib/plans.ts`); (4) Benefits of registration vs. unregistered Will (comparison table); (5) "Who needs Will registration" section; (6) State-specific SRO information; (7) Testimonials/trust signals; (8) FAQ schema with questions about fees, timeline, documents needed, home visit availability; (9) Service + Offer + FAQPage schema; (10) CTA buttons throughout → `/start`. Link to Blog #8 and `/pricing`.

---

### Page #11 — `/service/probate-lawyer`

| Field | Value |
|---|---|
| **URL** | `/service/probate-lawyer` |
| **Page Type** | Service |
| **Primary Keyword** | `probate of will lawyer` / `probate services` |
| **Volume Tier** | M (2K–10K) |
| **Keyword Difficulty** | Med |
| **Intent** | Commercial |
| **Converts to /start?** | ★★★ Direct revenue (AMA) |
| **Wave** | 2 (Weeks 5–8) |
| **Secondary Keywords** | `probate lawyer india`, `probate petition india`, `letters of administration lawyer`, `contested will lawyer` |
| **Angle** | Probate petitions (voluntary + contested), Letters of Administration |
| **Pulls Traffic From** | Blog #3, Tool #7 |
| **Schema** | Service + FAQPage |
| **Internal Links** | → `/start`, → `/tools/probate-checker`, → Blog #3 |
| **Implementation** | Server page under `src/app/service/*` |

**Creation Prompt:**
> Create a service landing page at `/service/probate-lawyer` targeting "probate of will lawyer" and "probate services" (2K–10K monthly). This is AMA's probate legal services page. Include: (1) Hero: "Expert Probate Lawyers — Voluntary & Contested Will Probate, Letters of Administration"; (2) **Two service tracks**: Voluntary Probate (uncontested) vs. Contested Probate (challenged Wills) — different processes, timelines, costs; (3) **Letters of Administration** service for cases without a Will; (4) Step-by-step probate process flowchart; (5) "When is probate required?" section (mandatory probate cities: Mumbai, Chennai, Kolkata; bank/institution demands); (6) Pricing/consultation flow; (7) Trust signals and case experience; (8) Embedded link to the Probate Checker tool at `/tools/probate-checker`; (9) FAQ schema with 5+ questions; (10) Service + FAQPage schema. Link to Blog #3, `/tools/probate-checker`, `/start`.

---

### Page #12 — `/service/succession-certificate`

| Field | Value |
|---|---|
| **URL** | `/service/succession-certificate` |
| **Page Type** | Service |
| **Primary Keyword** | `how to get succession certificate` |
| **Volume Tier** | L (10K–50K) |
| **Keyword Difficulty** | Med |
| **Intent** | Commercial + Info |
| **Converts to /start?** | ★★★ Direct revenue (AMA) |
| **Wave** | 2 (Weeks 5–8) |
| **Secondary Keywords** | `succession certificate lawyer`, `succession certificate application`, `succession certificate procedure`, `apply for succession certificate` |
| **Angle** | Full succession certificate procedure + AMA handling it |
| **Pulls Traffic From** | Blog #14, Tool #8 |
| **Schema** | Service + HowTo + FAQPage |
| **Internal Links** | → `/start`, → Blog #14, → `/tools/succession-certificate-court-fee-calculator` |
| **Implementation** | Server page under `src/app/service/*` |

**Creation Prompt:**
> Create a service landing page at `/service/succession-certificate` targeting "how to get succession certificate" (10K–50K monthly). This combines informational + commercial intent. Include: (1) Hero: "Get Your Succession Certificate — Complete Legal Assistance by AMA"; (2) **Full procedure walkthrough** (HowTo schema): Filing petition → Court hearings → Newspaper publication → Certificate issuance → Timeline expectations (typically 3–6 months); (3) **Documents required** comprehensive list; (4) **Court fees** section with link to the fee calculator at `/tools/succession-certificate-court-fee-calculator`; (5) "Succession Certificate vs. Legal Heir Certificate" comparison (link to Blog #14); (6) **AMA's service offering**: What AMA handles end-to-end — petition drafting, court appearances, follow-ups; (7) Pricing; (8) FAQ schema; (9) Service + HowTo + FAQPage schema. Link to Blog #14, `/tools/succession-certificate-court-fee-calculator`, `/start`.

---

### Page #13 — `/service/mirror-wills-for-couples`

| Field | Value |
|---|---|
| **URL** | `/service/mirror-wills-for-couples` |
| **Page Type** | Service |
| **Primary Keyword** | `joint will` / `mirror will husband wife` |
| **Volume Tier** | S (500–2K) |
| **Keyword Difficulty** | Low |
| **Intent** | Commercial |
| **Converts to /start?** | ★★★ Direct revenue |
| **Wave** | 2 (Weeks 5–8) |
| **Secondary Keywords** | `mirror will india`, `couples will india`, `husband wife will`, `mutual will`, `joint will india` |
| **Angle** | Mirror Wills for couples (two Wills, mutual clauses), and why Indian "joint Wills" are risky |
| **Pulls Traffic From** | Homepage, `/pricing` |
| **Schema** | Service + Offer |
| **Internal Links** | → `/start`, → `/pricing`, → `/templates/will-format-india` |
| **Implementation** | Server page under `src/app/service/*` |

**Creation Prompt:**
> Create a service landing page at `/service/mirror-wills-for-couples` targeting "joint will" and "mirror will husband wife" (500–2K monthly). Include: (1) Hero: "Mirror Wills for Couples — Two Coordinated Wills, Not One Risky Joint Will"; (2) **Critical distinction**: Mirror Wills (two separate Wills with mutual clauses — RECOMMENDED) vs. Joint Wills (single document for two people — RISKY in India) with comparison table; (3) Why joint Wills are problematic in India (legal ambiguity, revocation issues, complications after first spouse's death); (4) How Mirror Wills work: mutual clauses, what happens when one spouse dies first, survivor's right to change; (5) **AMA's Mirror Will service**: What couples get (two legally independent Wills with coordinated clauses); (6) Pricing with Offer schema; (7) "When do couples need Mirror Wills" section; (8) FAQ schema; (9) Service + Offer schema. Link to `/start`, `/pricing`.

---

## BLOGS — Post-Death Cluster (Pages #14–#19)

> [!IMPORTANT]
> Post-death pages ALWAYS include a section titled **"How a Will Would Have Avoided This"** that links to `/start`. This is the conversion bridge.
> Blog schema: `Article` + `FAQPage` + `BreadcrumbList`. One comparison table minimum. Indian imagery only.

---

### Page #14 — `/blogs/legal-heir-certificate-vs-succession-certificate`

| Field | Value |
|---|---|
| **URL** | `/blogs/legal-heir-certificate-vs-succession-certificate` |
| **Page Type** | Blog (Post-Death Cluster) |
| **Primary Keyword** | `legal heir certificate vs succession certificate` |
| **Volume Tier** | XL* (head term 90K–150K, but mostly navigational; winnable slice is M–L) |
| **Keyword Difficulty** | High |
| **Intent** | Informational |
| **Converts to /start?** | ★ Medium |
| **Wave** | 1 (Weeks 1–4) |
| **Secondary Keywords** | `legal heir certificate`, `succession certificate`, `legal heir certificate documents`, `which certificate do I need`, `legal heir certificate online` |
| **Angle** | "Which certificate do I need?" decision flow by asset type, plus what to do next |
| **Must-Cite Authority** | Part X ISA 1925; state revenue rules |
| **Unique Asset** | Decision flowchart + state portal table (ONE page, not per-state pages) |
| **Competitor Gap** | Legal heir certificate SERPs are dominated by state portals and generic property sites. None link the certificate to what to do next (mutation, demat, bank claim) |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/service/succession-certificate` (#12), → Blog #15, → `/tools/succession-calculator` |

**Creation Prompt:**
> Create a comprehensive blog guide at `/blogs/legal-heir-certificate-vs-succession-certificate` targeting "legal heir certificate vs succession certificate" (winnable M–L volume from XL head term). **This is the most important page in the post-death cluster.** Include: (1) **"Which Certificate Do I Need?" decision flowchart** — by asset type (bank account → succession cert; property mutation → legal heir cert; demat shares → transmission form + either; insurance → nomination or succession cert; etc.); (2) **Head-to-head comparison table**: Legal Heir Certificate vs. Succession Certificate (issuing authority, purpose, cost, time, when needed, legal basis); (3) **State portal table** listing how to apply for legal heir certificate in each major state (online portal links where available) — THIS IS ONE PAGE, NOT PER-STATE PAGES; (4) "What to do AFTER you get the certificate" — linking to mutation (#15), demat transmission (#16), bank claims (#17); (5) **Documents required** for each certificate type; (6) **"How a Will Would Have Avoided This"** section → `/start`; (7) Cite Part X of Indian Succession Act 1925 and state revenue rules; (8) Article + FAQPage + BreadcrumbList schema; (9) FAQ with 7+ questions. Link to `/service/succession-certificate`, `/tools/succession-calculator`, `/start`.

---

### Page #15 — `/blogs/property-transfer-after-death-without-will-india`

| Field | Value |
|---|---|
| **URL** | `/blogs/property-transfer-after-death-without-will-india` |
| **Page Type** | Blog (Post-Death Cluster) |
| **Primary Keyword** | `property transfer after death of father without will` |
| **Volume Tier** | L (10K–50K) |
| **Keyword Difficulty** | Med |
| **Intent** | Informational |
| **Converts to /start?** | ★★ High |
| **Wave** | 1 (Weeks 1–4) |
| **Secondary Keywords** | `property transfer after death`, `mutation after death`, `property name change after death`, `how to transfer property after death without will` |
| **Angle** | Full roadmap: death certificate → heirship proof → release/partition deed → mutation |
| **Must-Cite Authority** | Hindu Succession Act s.8; municipal/revenue mutation practice |
| **Unique Asset** | Step timeline + document checklist + links to #5 (release deed), #14 (certificates) |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → Blog #14, → `/templates/release-deed-format` (#5), → `/tools/succession-calculator` |

**Creation Prompt:**
> Create a comprehensive blog guide at `/blogs/property-transfer-after-death-without-will-india` targeting "property transfer after death of father without will" (10K–50K monthly). Include: (1) **Complete step-by-step timeline/roadmap**: Death certificate (how to get, timeline) → Heirship proof (legal heir certificate vs. succession certificate — link to #14) → Family agreement or partition (release/partition deed — link to #5) → Property mutation at municipal/revenue office → Name change in property records; (2) **Document checklist** for each step (printable); (3) **Hindu Succession Act Section 8** class-by-class inheritance table (who inherits in what order); (4) Comparison: with Will vs. without Will — time, cost, complexity; (5) **"How a Will Would Have Avoided This"** section → `/start`; (6) Special considerations: multiple heirs disagreeing, NRI heirs, minor heirs; (7) Article + FAQPage + BreadcrumbList schema; (8) FAQ with 7+ questions. Link to Blog #14, `/templates/release-deed-format`, `/tools/succession-calculator`, `/start`.

---

### Page #16 — `/blogs/demat-shares-transmission-after-death-sebi`

| Field | Value |
|---|---|
| **URL** | `/blogs/demat-shares-transmission-after-death-sebi` |
| **Page Type** | Blog (Post-Death Cluster) |
| **Primary Keyword** | `transmission of shares after death` |
| **Volume Tier** | M (2K–10K) |
| **Keyword Difficulty** | Med |
| **Intent** | Informational |
| **Converts to /start?** | ★★ High |
| **Wave** | 2 (Weeks 5–8) |
| **Secondary Keywords** | `demat account transmission after death`, `SEBI transmission rules`, `share transfer after death of holder`, `nominee vs legal heir shares` |
| **Angle** | Plain-language SEBI transmission tiers (nominee vs no nominee, by value) |
| **Must-Cite Authority** | SEBI transmission circulars (verify current thresholds) |
| **Unique Asset** | Tier table + document pack per scenario |
| **Must-Verify Fact** | SEBI transmission value tiers (₹30,000 / ₹30 lakh tiers and removal of mandatory probate for uncontested claims) |
| **Competitor Gap** | Covered by banks and brokers in jargon, with no plain-language family guide |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → Blog #14, → `/service/succession-certificate` (#12) |

**Creation Prompt:**
> Create a plain-language blog guide at `/blogs/demat-shares-transmission-after-death-sebi` targeting "transmission of shares after death" (2K–10K monthly). Include: (1) **SEBI transmission tier table** broken down by: With Nominee vs. Without Nominee, and by value brackets (verify current thresholds — reported as ₹30,000 / ₹30 lakh tiers); (2) **Document pack per scenario** — exact documents needed for each tier/scenario; (3) Step-by-step process: How to approach the depository participant (DP) / broker; (4) "Nominee vs. Legal Heir" distinction — nominee is a trustee, not the owner; (5) What happens when there are multiple legal heirs; (6) **"How a Will Would Have Avoided This"** section → `/start`; (7) Mutual fund transmission process (similar but separate from demat); (8) Article + FAQPage + BreadcrumbList schema; (9) FAQ with 5+ questions. **⚠️ VERIFY: SEBI transmission value tiers against latest SEBI master circular on transmission.**

---

### Page #17 — `/blogs/claim-unclaimed-deposits-deceased-udgam`

| Field | Value |
|---|---|
| **URL** | `/blogs/claim-unclaimed-deposits-deceased-udgam` |
| **Page Type** | Blog (Post-Death Cluster) |
| **Primary Keyword** | `claim unclaimed deposits of deceased` / `UDGAM` |
| **Volume Tier** | L (10K–50K, news-spiky) |
| **Keyword Difficulty** | Med |
| **Intent** | Informational (news-spiky) |
| **Converts to /start?** | ★★ High |
| **Wave** | 2 (Weeks 5–8) |
| **Secondary Keywords** | `UDGAM portal`, `unclaimed bank deposits india`, `deceased bank account claim process`, `RBI unclaimed deposits`, `DEA fund` |
| **Angle** | Find (UDGAM) → claim at branch → documents by claim size |
| **Must-Cite Authority** | RBI UDGAM; RBI deceased-claim directions |
| **Unique Asset** | Step guide + "how a Will + matched nominees prevent this" |
| **Must-Verify Fact** | Size of unclaimed deposits in the RBI DEA Fund (reported as ~₹85,000–98,000 crore) |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → Blog #14, → `/service/succession-certificate` (#12) |

**Creation Prompt:**
> Create a blog guide at `/blogs/claim-unclaimed-deposits-deceased-udgam` targeting "claim unclaimed deposits of deceased" and "UDGAM" (10K–50K monthly, news-spiky). Include: (1) **What is UDGAM?** RBI's portal for finding unclaimed deposits; (2) **Step-by-step guide**: How to search on UDGAM portal → Identify unclaimed deposits → Visit the branch → Submit claim documents; (3) **Documents by claim size** (small claims vs. large claims — different requirements); (4) **The scale of the problem** (cite RBI data on unclaimed deposits — verify current figure); (5) How to claim from different account types (savings, FD, RD, PPF); (6) **"How a Will + Matched Nominees Prevent This"** section — the Will + nomination combo means money never goes to DEA fund → CTA to `/start`; (7) Timeline expectations; (8) Article + FAQPage + BreadcrumbList schema; (9) FAQ with 5+ questions. **⚠️ VERIFY: Size of unclaimed deposits against latest RBI annual report / press release.**

---

### Page #18 — `/blogs/how-to-challenge-a-will-in-india`

| Field | Value |
|---|---|
| **URL** | `/blogs/how-to-challenge-a-will-in-india` |
| **Page Type** | Blog (Post-Death Cluster) |
| **Primary Keyword** | `how to challenge a will in india` |
| **Volume Tier** | M (2K–10K) |
| **Keyword Difficulty** | Med |
| **Intent** | Informational |
| **Converts to /start?** | ★★ High (defensive drafting) |
| **Wave** | 2 (Weeks 5–8) |
| **Secondary Keywords** | `grounds to challenge a will`, `will contest india`, `disputed will india`, `how to prove a will is forged`, `limitation period to challenge will` |
| **Angle** | Grounds + limitation + burden of proof, written from BOTH sides ("how to challenge" AND "how to make yours challenge-proof") |
| **Must-Cite Authority** | ISA ss.59, 61, 63; Limitation Act; BSA 2023 s.67 |
| **Unique Asset** | Grounds table + links to Blog #10 (doctor certificate) |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → Blog #10 (doctor certificate), → `/service/probate-lawyer` (#11) |

**Creation Prompt:**
> Create a dual-perspective blog guide at `/blogs/how-to-challenge-a-will-in-india` targeting "how to challenge a will in india" (2K–10K monthly). **Write from BOTH sides**: people wanting to challenge AND people wanting to make theirs challenge-proof. Include: (1) **Grounds table**: Undue influence, fraud, forgery, testamentary incapacity (mental unsoundness), improper execution (Section 63 violations), revocation — with burden of proof for each; (2) **Limitation period** (cite Limitation Act); (3) **Court procedure**: Where to file, which court, timeline; (4) **Bharatiya Sakshya Adhiniyam (BSA) 2023 Section 67** — new evidence rules; (5) **"How to make YOUR Will challenge-proof"** section: video recording, doctor's certificate (link to Blog #10), proper witnesses, registration, clear language; (6) **"How a Will Would Have Avoided This"** → properly drafted Will through `/start`; (7) Article + FAQPage + BreadcrumbList schema; (8) FAQ with 7+ questions.

---

### Page #19 — `/blogs/executor-of-will-duties-india`

| Field | Value |
|---|---|
| **URL** | `/blogs/executor-of-will-duties-india` |
| **Page Type** | Blog (Post-Death Cluster) |
| **Primary Keyword** | `executor of will duties india` |
| **Volume Tier** | S (500–2K) |
| **Keyword Difficulty** | Low |
| **Intent** | Informational |
| **Converts to /start?** | ★★ High |
| **Wave** | 3 (Weeks 9–12) |
| **Secondary Keywords** | `executor of will india`, `duties of executor`, `executor responsibilities`, `what does an executor do`, `executor first steps after death` |
| **Angle** | Executor's first 90 days checklist |
| **Must-Cite Authority** | ISA ss.2(c), 211, 222 |
| **Unique Asset** | Printable executor checklist |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → Blog #14, → `/service/probate-lawyer` (#11) |

**Creation Prompt:**
> Create a blog guide at `/blogs/executor-of-will-duties-india` targeting "executor of will duties india" (500–2K monthly). Include: (1) **"Executor's First 90 Days" printable checklist**: Day 1–7 (secure the Will, death certificate, notify beneficiaries), Day 8–30 (inventory assets, secure property, notify banks/institutions), Day 31–60 (apply for probate if needed, begin transmission processes), Day 61–90 (distribute assets, file tax returns, final accounting); (2) Legal duties under ISA sections 2(c), 211, 222; (3) Executor's powers and limitations; (4) "Can an executor refuse?" and what happens then; (5) Executor vs. administrator distinction; (6) Common mistakes executors make; (7) **"How a Will Would Have Avoided This"** → naming a clear executor in `/start`; (8) Downloadable/printable checklist; (9) Article + FAQPage + BreadcrumbList schema; (10) FAQ with 5+ questions.

---

## BLOGS — Family Rights Cluster (Pages #20–#24)

> [!IMPORTANT]
> Rights pages (#20–#24) embed or deep-link the relevant `/tools/succession-calculator` mode.

---

### Page #20 — `/blogs/married-daughter-rights-in-fathers-property`

| Field | Value |
|---|---|
| **URL** | `/blogs/married-daughter-rights-in-fathers-property` |
| **Page Type** | Blog (Family Rights Cluster) |
| **Primary Keyword** | `daughter right in father property` |
| **Volume Tier** | L (10K–50K) |
| **Keyword Difficulty** | Med |
| **Intent** | Informational |
| **Converts to /start?** | ★★ High |
| **Wave** | 1 (Weeks 1–4) |
| **Secondary Keywords** | `married daughter rights in father property`, `daughter rights in ancestral property`, `Vineeta Sharma case`, `coparcenary daughter`, `daughter share in property` |
| **Angle** | Self-acquired vs ancestral × with/without Will matrix |
| **Must-Cite Authority** | Vineeta Sharma (2020); HSA s.6, s.8 |
| **Unique Asset** | 2×2 rights matrix + embed of the succession calculator |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/tools/succession-calculator`, → Blog #22 (stridhan), → Blog #23 (HUF) |

**Creation Prompt:**
> Create a comprehensive blog guide at `/blogs/married-daughter-rights-in-fathers-property` targeting "daughter right in father property" (10K–50K monthly). Include: (1) **2×2 Rights Matrix table**: Self-acquired property vs. Ancestral property × With Will vs. Without Will — what a married daughter gets in each scenario; (2) **Vineeta Sharma v. Rakesh Sharma (2020)** Supreme Court ruling — daughters are coparceners by birth, retrospective effect, equal rights to ancestral property; (3) Hindu Succession Act Section 6 (coparcenary) and Section 8 (intestate succession) explained in plain language; (4) Distinction: self-acquired property (father can Will it to anyone) vs. ancestral property (daughter has birthright share); (5) **Embed or deep-link the succession calculator** at `/tools/succession-calculator`; (6) What a daughter can do if her share is denied; (7) CTA: "Ensure your daughter's rights are protected — create your Will → /start"; (8) Article + FAQPage + BreadcrumbList schema; (9) FAQ with 7+ questions.

---

### Page #21 — `/blogs/second-wife-children-property-rights-india`

| Field | Value |
|---|---|
| **URL** | `/blogs/second-wife-children-property-rights-india` |
| **Page Type** | Blog (Family Rights Cluster) |
| **Primary Keyword** | `second wife children property rights` |
| **Volume Tier** | L (10K–50K) |
| **Keyword Difficulty** | Med |
| **Intent** | Informational |
| **Converts to /start?** | ★★ High |
| **Wave** | 2 (Weeks 5–8) |
| **Secondary Keywords** | `second marriage children rights`, `illegitimate children property rights india`, `children of void marriage rights`, `HMA section 16` |
| **Angle** | Rights of children of void/voidable marriages, including coparcenary share |
| **Must-Cite Authority** | HMA s.16; Revanasiddappa v. Mallikarjun (SC 2023) |
| **Unique Asset** | "Who gets what" table |
| **Must-Verify Fact** | Revanasiddappa v. Mallikarjun (2023) scope — verify against judgment text |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/tools/succession-calculator`, → Blog #20, → Blog #24 |

**Creation Prompt:**
> Create a blog guide at `/blogs/second-wife-children-property-rights-india` targeting "second wife children property rights" (10K–50K monthly). Include: (1) **"Who Gets What" comprehensive table**: Children of first marriage vs. children of second marriage vs. children of void/voidable marriage — rights in self-acquired property, ancestral property, and coparcenary property; (2) **HMA Section 16** — children of void/voidable marriages are treated as legitimate for inheritance purposes; (3) **Revanasiddappa v. Mallikarjun (SC 2023)** — coparcenary rights of children born from void marriages; (4) Valid vs. void vs. voidable marriages and how each affects children's rights; (5) Second wife's own property rights (or lack thereof in bigamous marriages); (6) Why a Will is critical in blended families → CTA to `/start`; (7) Embed succession calculator link; (8) Article + FAQPage + BreadcrumbList schema; (9) FAQ with 7+ questions. **⚠️ VERIFY: Revanasiddappa v. Mallikarjun (2023) scope against judgment text.**

---

### Page #22 — `/blogs/hindu-woman-property-rights-stridhan-will`

| Field | Value |
|---|---|
| **URL** | `/blogs/hindu-woman-property-rights-stridhan-will` |
| **Page Type** | Blog (Family Rights Cluster) |
| **Primary Keyword** | `stridhan` / `hindu woman property rights` |
| **Volume Tier** | L (10K–50K) |
| **Keyword Difficulty** | Med |
| **Intent** | Informational |
| **Converts to /start?** | ★★ High |
| **Wave** | 2 (Weeks 5–8) |
| **Secondary Keywords** | `stridhan meaning`, `woman property rights india`, `HSA section 14`, `female intestate succession section 15`, `woman dying without will` |
| **Angle** | Stridhan vs inherited vs self-acquired, and how s.15(2) affects her estate if she has no Will |
| **Must-Cite Authority** | HSA ss.14, 15, 16 |
| **Unique Asset** | Links to the s.15(2) calculator mode |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/tools/succession-calculator`, → Blog #20, → Blog #24 |

**Creation Prompt:**
> Create a blog guide at `/blogs/hindu-woman-property-rights-stridhan-will` targeting "stridhan" and "hindu woman property rights" (10K–50K monthly). Include: (1) **Comprehensive property classification table**: Stridhan (gifts at/before/after marriage, earnings) vs. Inherited property vs. Self-acquired property — what a Hindu woman can do with each; (2) **HSA Section 14** — woman's absolute ownership of her property; (3) **HSA Section 15** — how a Hindu woman's property devolves if she dies without a Will (husband's heirs vs. her parents' heirs depending on how property was acquired); (4) **Critical Section 15(2) trap** — if property was inherited from husband/father-in-law, it goes back to HUSBAND's heirs, not her own family, unless she has a Will; (5) Deep-link to the succession calculator's s.15(2) mode; (6) Why every Hindu woman needs her own Will → CTA to `/start`; (7) Article + FAQPage + BreadcrumbList schema; (8) FAQ with 7+ questions.

---

### Page #23 — `/blogs/huf-property-after-death-of-karta`

| Field | Value |
|---|---|
| **URL** | `/blogs/huf-property-after-death-of-karta` |
| **Page Type** | Blog (Family Rights Cluster) |
| **Primary Keyword** | `huf property after death of karta` |
| **Volume Tier** | M (2K–10K) |
| **Keyword Difficulty** | Low |
| **Intent** | Informational |
| **Converts to /start?** | ★★ High |
| **Wave** | 3 (Weeks 9–12) |
| **Secondary Keywords** | `HUF karta death`, `HUF partition after death`, `HUF succession`, `karta share in HUF property`, `can karta will HUF property` |
| **Angle** | What happens to HUF assets and karta-ship; can the karta's share be willed? |
| **Must-Cite Authority** | HSA s.6, s.30 |
| **Unique Asset** | Flow diagram |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/tools/succession-calculator`, → Blog #20 |

**Creation Prompt:**
> Create a blog guide at `/blogs/huf-property-after-death-of-karta` targeting "huf property after death of karta" (2K–10K monthly). Include: (1) **Flow diagram**: What happens when the Karta dies — who becomes new Karta, what happens to HUF assets, partition rights; (2) **Can the Karta Will his share?** Yes, under HSA Section 30, the Karta can will his COPARCENARY share (not the entire HUF property); (3) HSA Section 6 — deemed partition on death of a coparcener; (4) HUF property vs. Karta's personal property — distinction matters for Wills; (5) Tax implications of HUF dissolution/partition; (6) How to handle HUF assets in a Will; (7) Embed succession calculator link; (8) CTA to `/start`; (9) Article + FAQPage + BreadcrumbList schema; (10) FAQ with 5+ questions.

---

### Page #24 — `/blogs/will-for-unmarried-childless-single-india`

| Field | Value |
|---|---|
| **URL** | `/blogs/will-for-unmarried-childless-single-india` |
| **Page Type** | Blog (Family Rights Cluster) |
| **Primary Keyword** | `who inherits property of unmarried person india` |
| **Volume Tier** | S (500–2K) |
| **Keyword Difficulty** | Low |
| **Intent** | Informational |
| **Converts to /start?** | ★★★ Very high |
| **Wave** | 2 (Weeks 5–8) |
| **Secondary Keywords** | `single person will india`, `unmarried person inheritance`, `childless person property`, `partner inheritance rights india`, `live-in partner will` |
| **Angle** | Without a Will, distant relatives inherit; partners have no statutory right |
| **Must-Cite Authority** | HSA Class II / agnates; ISA |
| **Unique Asset** | "Who inherits from you" examples |
| **Competitor Gap** | Unmarried / childless / single testators (including partners with no statutory inheritance rights) are almost entirely ignored by all Will platforms |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/tools/succession-calculator`, → Blog #20 |

**Creation Prompt:**
> Create a blog guide at `/blogs/will-for-unmarried-childless-single-india` targeting "who inherits property of unmarried person india" (500–2K monthly, but ★★★ very high conversion). Include: (1) **"Who Inherits From You" example scenarios**: Single with living parents → parents; Single with no parents but siblings → siblings; Single with only distant relatives → cousins/uncles; Single with live-in partner → partner gets NOTHING without a Will; (2) **HSA Class I → Class II → agnates → cognates** succession chain explained with examples; (3) **Partners have NO statutory inheritance rights** in India — a Will is the ONLY way to leave property to a partner; (4) Same-sex partners, live-in partners — legal position and why a Will is essential; (5) **Strong CTA**: "A Will is the ONLY way to choose your heirs" → `/start`; (6) Embed succession calculator link; (7) Article + FAQPage + BreadcrumbList schema; (8) FAQ with 7+ questions. **This is the highest-converting blog page** — emphasize urgency.

---

## BLOGS — Will Lifecycle & Planning Cluster (Pages #25–#30)

---

### Page #25 — `/blogs/gift-deed-vs-will-india`

| Field | Value |
|---|---|
| **URL** | `/blogs/gift-deed-vs-will-india` |
| **Page Type** | Blog (Lifecycle Cluster) |
| **Primary Keyword** | `gift deed vs will which is better` |
| **Volume Tier** | M (2K–10K) |
| **Keyword Difficulty** | Med |
| **Intent** | Decision |
| **Converts to /start?** | ★★★ Very high |
| **Wave** | 1 (Weeks 1–4) |
| **Secondary Keywords** | `gift deed vs will`, `gift deed or will for property`, `gift deed tax implications`, `gift deed stamp duty`, `property transfer gift vs will` |
| **Angle** | Control vs certainty vs cost: stamp duty, tax, revocability |
| **Must-Cite Authority** | Income Tax s.56(2)(x); state stamp schedules |
| **Unique Asset** | Side-by-side table + cost example |
| **Must-Verify Fact** | State stamp duty rates for family release / gift deeds — verify against state stamp act schedules |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/pricing`, → Blog #26, → `/templates/release-deed-format` (#5) |

**Creation Prompt:**
> Create a decision-guide blog at `/blogs/gift-deed-vs-will-india` targeting "gift deed vs will which is better" (2K–10K monthly). Include: (1) **Comprehensive side-by-side comparison table**: Gift Deed vs. Will — on dimensions of control (immediate vs. after death), certainty (irrevocable vs. revocable), cost (stamp duty vs. none), tax (s.56(2)(x) vs. no gift tax), timing (immediate transfer vs. testamentary), registration (mandatory vs. optional), revocability; (2) **Worked cost example**: ₹50 lakh property in Maharashtra — cost via gift deed (stamp duty + registration) vs. Will (₹0 stamp duty); (3) When gift deed is better (elderly parent wanting certainty, tax planning); (4) When Will is better (retain control, change mind, avoid stamp duty); (5) Income Tax Section 56(2)(x) explanation — gifts above ₹50,000 are taxable, but exceptions for relatives; (6) CTA: "Choose the right option → create your Will at /start or consult AMA for gift deeds"; (7) Article + FAQPage + BreadcrumbList schema; (8) FAQ with 7+ questions. **⚠️ VERIFY: State stamp duty rates against state stamp act schedules.**

---

### Page #26 — `/blogs/gift-deed-cancellation-senior-citizens-act-section-23`

| Field | Value |
|---|---|
| **URL** | `/blogs/gift-deed-cancellation-senior-citizens-act-section-23` |
| **Page Type** | Blog (Lifecycle Cluster) |
| **Primary Keyword** | `can gift deed be cancelled by parents` |
| **Volume Tier** | M (2K–10K) |
| **Keyword Difficulty** | Low |
| **Intent** | Informational |
| **Converts to /start?** | ★★ High |
| **Wave** | 2 (Weeks 5–8) |
| **Secondary Keywords** | `gift deed cancellation india`, `Section 23 senior citizens act`, `revoke gift deed`, `Urmila Dixit case`, `gift deed cancellation by senior citizen` |
| **Angle** | Parents can revoke a conditional gift if a child neglects them |
| **Must-Cite Authority** | MWPSC Act s.23; Urmila Dixit v. Sunil Sharan Dixit (SC, Jan 2025) |
| **Unique Asset** | "How to word the maintenance condition" clause |
| **Must-Verify Fact** | Urmila Dixit v. Sunil Sharan Dixit, 2025 INSC 20 holding — verify against judgment text on SC website |
| **Competitor Gap** | The Urmila Dixit ruling hasn't been turned into a parent-facing "gift deed vs Will" decision guide by any Will platform |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/pricing`, → Blog #25 |

**Creation Prompt:**
> Create a blog guide at `/blogs/gift-deed-cancellation-senior-citizens-act-section-23` targeting "can gift deed be cancelled by parents" (2K–10K monthly). Include: (1) **Urmila Dixit v. Sunil Sharan Dixit (SC, Jan 2025)** — Supreme Court upheld parents' right to cancel a gift deed when the gifted child neglects maintenance obligations; (2) **MWPSC Act Section 23** explained in plain language — conditional gift deeds for senior citizens, maintenance conditions, revocation grounds; (3) **"How to Word the Maintenance Condition" sample clause** — practical template language for parents to include in gift deeds; (4) When can a gift deed be cancelled vs. when it's irrevocable; (5) **"Why a Will Might Be Better Than a Gift Deed"** — retain control while alive → CTA to `/start`; (6) Comparison: Gift deed with conditions vs. Will → table; (7) Article + FAQPage + BreadcrumbList schema; (8) FAQ with 5+ questions. **⚠️ VERIFY: Urmila Dixit v. Sunil Sharan Dixit, 2025 INSC 20 holding against judgment text on SC website.**

---

### Page #27 — `/blogs/notarized-will-vs-registered-will-india`

| Field | Value |
|---|---|
| **URL** | `/blogs/notarized-will-vs-registered-will-india` |
| **Page Type** | Blog (Lifecycle Cluster) |
| **Primary Keyword** | `is notarized will valid in india` |
| **Volume Tier** | M (2K–10K) |
| **Keyword Difficulty** | Low |
| **Intent** | Informational |
| **Converts to /start?** | ★★★ Very high |
| **Wave** | 1 (Weeks 1–4) |
| **Secondary Keywords** | `notarized will vs registered will`, `will registration vs notarization`, `is unregistered will valid`, `registered will benefits`, `will notarization india` |
| **Angle** | Notarisation adds nothing legally; registration adds evidentiary weight |
| **Must-Cite Authority** | ISA s.63; Registration Act s.18 |
| **Unique Asset** | 3-column comparison: plain / notarised / registered |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/pricing`, → `/service/will-registration` (#10), → `/templates/will-format-india` (#1) |

**Creation Prompt:**
> Create a blog guide at `/blogs/notarized-will-vs-registered-will-india` targeting "is notarized will valid in india" (2K–10K monthly). Include: (1) **3-column comparison table**: Plain Will vs. Notarised Will vs. Registered Will — legal validity, evidentiary value, cost, process, time, revocability, challenges in court; (2) **Key insight: Notarisation adds NOTHING legally** — a plain Will with proper Section 63 attestation is equally valid; (3) **Registration adds evidentiary weight** — harder to challenge, presumption of validity, but NOT mandatory (Registration Act s.18); (4) ISA Section 63 requirements (what actually makes a Will valid); (5) When registration is worth it (high-value estates, family disputes expected); (6) When notarisation is sufficient (low-cost, quick, but no extra legal protection); (7) CTA: "Create your Will → /start" + "Register your Will → /service/will-registration"; (8) Article + FAQPage + BreadcrumbList schema; (9) FAQ with 7+ questions.

---

### Page #28 — `/blogs/will-vs-family-trust-india`

| Field | Value |
|---|---|
| **URL** | `/blogs/will-vs-family-trust-india` |
| **Page Type** | Blog (Lifecycle Cluster) |
| **Primary Keyword** | `will vs trust india` |
| **Volume Tier** | S (500–2K) |
| **Keyword Difficulty** | Med |
| **Intent** | Decision |
| **Converts to /start?** | ★★ High (AMA HNI lead) |
| **Wave** | 3 (Weeks 9–12) |
| **Secondary Keywords** | `family trust vs will`, `private trust india`, `trust for estate planning india`, `will or trust which is better`, `Indian Trusts Act 1882` |
| **Angle** | When a Will is enough and when a private trust makes sense |
| **Must-Cite Authority** | Indian Trusts Act 1882 |
| **Unique Asset** | Decision table + AMA HNI CTA |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/pricing`, → Blog #25 |

**Creation Prompt:**
> Create a decision-guide blog at `/blogs/will-vs-family-trust-india` targeting "will vs trust india" (500–2K monthly, HNI conversion). Include: (1) **Decision comparison table**: Will vs. Private Family Trust — on dimensions of cost to set up, cost to maintain, privacy (Will becomes public after probate, trust stays private), control (trust can have conditions/staged distributions), tax treatment, asset protection, complexity; (2) **When a Will is enough**: Most Indian families, simple asset distribution; (3) **When a trust makes sense**: HNI families (₹5 Cr+), complex family dynamics, business succession, minor beneficiaries, special needs beneficiaries, desire for privacy; (4) Indian Trusts Act 1882 basics; (5) Irrevocable vs. Revocable trusts; (6) CTA for most people: "A Will is probably what you need → /start" + CTA for HNIs: "Discuss trust planning with AMA → consultation"; (7) Article + FAQPage + BreadcrumbList schema; (8) FAQ with 5+ questions.

---

### Page #29 — `/blogs/digital-assets-crypto-will-india`

| Field | Value |
|---|---|
| **URL** | `/blogs/digital-assets-crypto-will-india` |
| **Page Type** | Blog (Lifecycle Cluster) |
| **Primary Keyword** | `how to include crypto in will india` |
| **Volume Tier** | S (500–2K, rising) |
| **Keyword Difficulty** | Low |
| **Intent** | Informational (rising) |
| **Converts to /start?** | ★★★ Very high |
| **Wave** | 3 (Weeks 9–12) |
| **Secondary Keywords** | `digital assets in will`, `crypto inheritance india`, `bitcoin will india`, `digital estate planning`, `include online accounts in will` |
| **Angle** | Two-document method: Will names the heir, a separate sealed letter holds access |
| **Must-Cite Authority** | IT Act VDA taxation (verify) |
| **Unique Asset** | Digital asset inventory template |
| **Competitor Gap** | Only GetYellow covers this seriously. Early-mover opportunity |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/pricing`, → `/tools/will-checklist` (#6) |

**Creation Prompt:**
> Create a blog guide at `/blogs/digital-assets-crypto-will-india` targeting "how to include crypto in will india" (500–2K monthly, rising trend). **Early-mover opportunity** — only GetYellow covers this seriously. Include: (1) **The Two-Document Method**: The Will names the heir/beneficiary for digital assets, but a SEPARATE sealed letter (updated periodically) contains passwords, seed phrases, wallet addresses, and access instructions — never put passwords in the Will itself; (2) **Digital Asset Inventory Template** (downloadable/printable): Email accounts, social media, cloud storage, crypto wallets (hot + cold), NFTs, domain names, online banking, subscription services, digital purchases, professional accounts; (3) **VDA taxation** under Indian IT Act (30% tax, 1% TDS — verify current rules); (4) **Crypto-specific challenges**: Private keys, hardware wallets, DeFi protocols, exchange accounts, dead man's switch services; (5) **Non-crypto digital assets**: Photos, documents, digital purchases, domain names, online businesses; (6) CTA: "Include digital assets in your Will → /start"; (7) Article + FAQPage + BreadcrumbList schema; (8) FAQ with 7+ questions.

---

### Page #30 — `/blogs/christian-parsi-will-indian-succession-act`

| Field | Value |
|---|---|
| **URL** | `/blogs/christian-parsi-will-indian-succession-act` |
| **Page Type** | Blog (Lifecycle Cluster) |
| **Primary Keyword** | `christian will rules india` / `parsi succession` |
| **Volume Tier** | S (500–2K) |
| **Keyword Difficulty** | Low |
| **Intent** | Informational |
| **Converts to /start?** | ★★ High |
| **Wave** | 3 (Weeks 9–12) |
| **Secondary Keywords** | `christian inheritance law india`, `parsi inheritance law`, `Indian Succession Act Part V`, `christian will format`, `parsi will rules` |
| **Angle** | Christian & Parsi testamentary rules (completes personal-law coverage next to Blog #9) |
| **Must-Cite Authority** | ISA Part V ss.31–56 |
| **Unique Asset** | Shares table linked to calculator |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Internal Links** | → `/start`, → `/tools/succession-calculator`, → Blog #9 |

**Creation Prompt:**
> Create a blog guide at `/blogs/christian-parsi-will-indian-succession-act` targeting "christian will rules india" and "parsi succession" (500–2K monthly). This page **completes personal-law coverage** alongside Blog #9 (Muslim/other laws). Include: (1) **Christian testamentary succession** under ISA Part V (ss.31–56): widow's share (1/3 if children, 1/2 if no children), children's shares, parents' rights, kindred's rights; (2) **Parsi testamentary succession**: widow's share, children's shares (son vs. daughter distinction), lineal descendants; (3) **Shares comparison table** for both Christian and Parsi intestate succession — linked to the succession calculator; (4) Key differences from Hindu succession; (5) Testamentary freedom (Christians and Parsis under ISA can Will freely, no coparcenary concept); (6) "Privileged Wills" under ISA (soldiers, mariners); (7) CTA to `/start`; (8) Embed succession calculator link; (9) Article + FAQPage + BreadcrumbList schema; (10) FAQ with 5+ questions.

---

## Rollout Schedule (3 Waves)

### Wave 1 — Traffic + Conversion Quick Wins (Weeks 1–4)

| # | URL | Rationale |
|---|---|---|
| 1 | `/templates/will-format-india` | Highest-volume template |
| 2 | `/templates/will-format-hindi` | Hindi template — low KD, high volume |
| 6 | `/tools/will-checklist` | Planning tool — converts well |
| 9 | `/tools/nri-will-checker` | NRI diagnostic — very high conversion |
| 10 | `/service/will-registration` | Direct revenue |
| 14 | `/blogs/legal-heir-certificate-vs-succession-certificate` | Highest traffic post-death page |
| 15 | `/blogs/property-transfer-after-death-without-will-india` | L volume, strong conversion |
| 20 | `/blogs/married-daughter-rights-in-fathers-property` | L volume rights page |
| 25 | `/blogs/gift-deed-vs-will-india` | Decision page, very high conversion |
| 27 | `/blogs/notarized-will-vs-registered-will-india` | Very high conversion, low KD |

**Cadence:** ~2–3 URLs per week. Request indexing in Google Search Console on publish day.

### Wave 2 — Post-Death Authority + AMA Leads (Weeks 5–8)

| # | URL | Rationale |
|---|---|---|
| 3 | `/templates/codicil-format-india` | Completes template silo |
| 4 | `/templates/living-will-format-india` | Unique angle with 2023 SC update |
| 5 | `/templates/release-deed-format` | High volume format |
| 7 | `/tools/probate-checker` | Diagnostic tool |
| 11 | `/service/probate-lawyer` | AMA service revenue |
| 12 | `/service/succession-certificate` | AMA service revenue |
| 13 | `/service/mirror-wills-for-couples` | AMA service revenue |
| 16 | `/blogs/demat-shares-transmission-after-death-sebi` | Post-death cluster |
| 17 | `/blogs/claim-unclaimed-deposits-deceased-udgam` | Post-death cluster, news-spiky |
| 18 | `/blogs/how-to-challenge-a-will-in-india` | Defensive drafting conversion |
| 21 | `/blogs/second-wife-children-property-rights-india` | Rights cluster |
| 22 | `/blogs/hindu-woman-property-rights-stridhan-will` | Rights cluster |
| 24 | `/blogs/will-for-unmarried-childless-single-india` | Very high conversion |
| 26 | `/blogs/gift-deed-cancellation-senior-citizens-act-section-23` | Urmila Dixit angle |

### Wave 3 — Depth & Long Tail (Weeks 9–12)

| # | URL | Rationale |
|---|---|---|
| 8 | `/tools/succession-certificate-court-fee-calculator` | Completes tools silo |
| 19 | `/blogs/executor-of-will-duties-india` | Completes post-death cluster |
| 23 | `/blogs/huf-property-after-death-of-karta` | Long tail rights |
| 28 | `/blogs/will-vs-family-trust-india` | HNI lead generation |
| 29 | `/blogs/digital-assets-crypto-will-india` | Early-mover, rising trend |
| 30 | `/blogs/christian-parsi-will-indian-succession-act` | Completes personal-law coverage |

---

## What NOT to Build

| Tempting Idea | Why It's Risky | Do This Instead |
|---|---|---|
| `/legal-heir-certificate-tamil-nadu`, `-kerala`, `-delhi` … | State-swapped near-duplicates trigger the doorway classifier | One page (#14) with a state portal table |
| `/will-lawyer-in-mumbai`, `/will-drafting-delhi` … | National statute, identical content | `areaServed` schema + Google Business Profile for real offices |
| `/gift-deed-format`, `/power-of-attorney-format` | Off the core topic, very hard SERPs | Cover gift deeds only as a comparison (#25, #26) |
| Separate "legal heir certificate" service page + blog | Keyword cannibalisation | Blog #14 links to service #12 |
| AI-spun FAQ pages for every query | Helpful Content demotion in YMYL | Answer FAQs inside the relevant pillar page |

---

## Facts to Verify Before Publishing

> [!WARNING]
> These came from web research summaries and are time-sensitive. An advocate at AMA should confirm them against the primary source before the page goes live.

| URL | Claim to Verify | Primary Source to Check |
|---|---|---|
| #16 | SEBI transmission value tiers (₹30,000 / ₹30 lakh tiers and removal of mandatory probate for uncontested claims) | Latest SEBI master circular on transmission |
| #17 | Size of unclaimed deposits in the RBI DEA Fund (~₹85,000–98,000 crore) | Latest RBI annual report / press release |
| #4 | Jan 2023 living will modification details | SC order in *Common Cause v. Union of India (M.A. 1699/2019)* |
| #26 | Urmila Dixit v. Sunil Sharan Dixit, 2025 INSC 20 holding | Judgment text on the SC website |
| #21 | Revanasiddappa v. Mallikarjun (2023) scope | Judgment text |
| #8 | State court-fee percentages and caps for succession certificates | Each state's Court Fees Act schedule |
| #5, #25 | State stamp duty rates for family release / gift deeds | State stamp act schedules |

---

## Implementation Notes (Codebase)

| Page Group | Implementation Path | Notes |
|---|---|---|
| **Blogs #14–30** | Add to `src/data/blogs.ts` | Existing `[slug]` template supports `tableData`, `templateBox`, and `faqs` — no new route needed |
| **Templates #1–5** | New `src/app/templates/[slug]/page.tsx` + `src/data/templates.ts` | Reuse `templateBox` rendering. Add `/templates/*` to `robots.ts` allow-list and `sitemap.ts` |
| **Hindi page #2** | Same template path | Set `lang="hi"` on page wrapper, use Devanagari in title and meta description |
| **Tools #6–9** | Client components following `SuccessionCalculator.tsx` pattern | Server page wrapper with `WebApplication` + `FAQPage` schema |
| **Services #10–13** | Server pages under `src/app/service/*` | `Service` + `Offer` schema. Prices must match `src/lib/plans.ts` |
| **Navbar** | Keep lean | Add "Free Templates" item under the Services dropdown; list the rest in Footer |
| **Index pages** | `/templates` and `/tools` hub pages | Structural hub pages — not counted in the 30 |
| **Content Tone** | Layman-friendly across all pages | Use simple, accessible everyday language so anyone visiting can easily understand every concept, clause, and procedure |

