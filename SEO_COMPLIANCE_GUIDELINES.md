**# WillDrafting SEO & Screaming Frog Compliance Guidelines**

\> **\*\*Purpose:\*\*** This document is the strict technical specification for all landing and topic pages created for **\*\*willdrafting\*\*** (\`https\://www\.willdrafting.in/\`).  

\> Every page generated for WillDrafting **\*\*MUST strictly comply\*\*** with the rules defined here to prevent issues in **\*\*Screaming Frog SEO Spider audits\*\*** and ensure 100% clean passes.

\---

**## 1. Screaming Frog Thresholds & Rules Matrix**

\| SEO Element | Strict Screaming Frog Limit | Ideal Target Range | Common Audit Failure to Prevent |

\| :--- | :--- | :--- | :--- |

\| **\*\*Page Title (\`\<title>\`)\*\*** | **\*\*Max 60 characters\*\*** (≤ 580px) | **\*\*50 – 60 characters\*\*** | \`Page Title: Over 60 Characters\`, \`Below 30 Characters\` |

\| **\*\*Meta Description\*\*** | **\*\*Max 155 characters\*\*** (≤ 960px) | **\*\*140 – 155 characters\*\*** | \`Meta Description: Over 155 Characters\`, \`Below 100 Characters\` |

\| **\*\*H1 Tag\*\*** | **\*\*Strictly 1 per page\*\*** | **\*\*30 – 65 characters\*\*** | \`H1: Missing\`, \`H1: Multiple\`, \`H1: Over 70 Characters\` |

\| **\*\*H2 Tags (\`\<h2>\`)\*\*** | **\*\*Max 70 characters\*\*** (both raw & decoded) | **\*\*45 – 65 characters\*\*** | \`H2: Over 70 Characters\`, \`H2: Duplicate\`, \`H2: Missing\` |

\| **\*\*Punctuation in Headings\*\*** | **\*\*STRICTLY ZERO EM-DASHES (\`—\`)\*\*** | Use colons (\`:\`), hyphens (\`-\`), \`&\` | Broken SERP rendering, parsing quirks, stylistic inconsistency |

\| **\*\*Title vs H1 Distinction\*\*** | **\*\*Must NOT be identical\*\*** | Distinct SERP Title vs on-page H1 | \`Page Titles: Same as H1\` |

\| **\*\*H2 Duplication\*\*** | **\*\*100% unique per page\*\*** | Distinct descriptive headings | \`H2: Duplicate\` |

\| **\*\*Canonical URL\*\*** | **\*\*100% self-referencing absolute URL\*\*** | \`https\://www\.willdrafting.in/[slug]\` | \`Canonical: Missing\`, \`Canonical: Relative URL\` |

\| **\*\*TypeScript / Build\*\*** | **\*\*0 compilation errors\*\*** | \`npx tsc --noEmit\` must pass | Next.js build failure |

\---

**## 2. Page Title (\`metadata.title\`) Rules**

1\. **\*\*Character Length:\*\*** Strictly **\*\*50 to 60 characters\*\*** (inclusive of spaces and branding suffix).

   - **\*\*DO NOT exceed 60 characters\*\*** under any circumstances (Screaming Frog flags \`Over 60 Characters\` at 61+).

   - **\*\*DO NOT drop below 30 characters\*\*** (Screaming Frog flags \`Below 30 Characters\`).

2\. **\*\*Brand Suffix:\*\*** Append \`| WillDrafting\` or \`- WillDrafting\` if character budget permits, or naturally integrate it.

3\. **\*\*Keyword Placement:\*\*** Place the primary target keyword as close to the beginning as possible.

4\. **\*\*Uniqueness:\*\*** Must be 100% distinct across the entire site. No two pages may share the same title.

**### ✅ Compliant Page Title Examples**

\- \`Credit Card Settlement Guide: Settle Debt in India\` (51 chars)

\- \`SARFAESI Act Defense: Protect Your Home from Auction\` (53 chars)

\- \`Settle Bike Loans in India: 50% Relief & No Dues\` (48 chars)

\- \`Bank Recovery Agent Harassment: File Police Complaint\` (53 chars)

\- \`MSME Loan Default Legal Action: Complete Defense Guide\` (54 chars)

**### ❌ Non-Compliant Page Title Examples**

\- \`How to Convince Your Bank for One Time Settlement of Personal Loans and Credit Cards in India\` *\*(89 chars - FLAG: Over 60 Characters)\**

\- \`Loan Settlement\` *\*(15 chars - FLAG: Below 30 Characters)\**

\---

**## 3. Meta Description (\`metadata.description\`) Rules**

1\. **\*\*Character Length:\*\*** Strictly **\*\*140 to 155 characters\*\***.

   - **\*\*DO NOT exceed 155 characters\*\*** (Screaming Frog flags \`Over 155 Characters\` at 156+; Google SERPs truncate).

   - **\*\*DO NOT drop below 100 characters\*\*** (Screaming Frog flags \`Below 100 Characters\` at <100).

2\. **\*\*Core Components:\*\***

   - Naturally includes the primary target keyword.

   - Mentions concrete relief or legal framework (e.g. *\*"50% to 75% waiver"\**, *\*"stop harassment"\**, *\*"RBI guidelines"\**).

   - Contains a concise, action-oriented Call-to-Action (CTA).

3\. **\*\*Punctuation:\*\*** Never use em-dashes (\`—\`). Use commas, periods, or hyphens.

**### ✅ Compliant Meta Description Examples**

\- \`Master the credit card settlement process in India. Learn how to negotiate 50% to 75% waivers, stop harassment, and secure an NOC.\` *\*(132 chars - optimal)\**

\- \`Facing bank recovery agent harassment? Learn how to file a police complaint, invoke RBI Fair Practices guidelines, and protect your family with WillDrafting.\` *\*(154 chars - optimal)\**

\- \`Defaulted on bike loan EMI? Understand bank hypothecation rights, stop illegal vehicle seizure under RBI rules, and negotiate 50% OTS with WillDrafting.\` *\*(150 chars - optimal)\**

**### ❌ Non-Compliant Meta Description Examples**

\- \`Learn how to settle your loan with bank recovery agents under RBI rules.\` *\*(71 chars - FLAG: Below 100 Characters)\**

\- \`Comprehensive, step-by-step authoritative legal guide detailing how borrowers facing severe delinquency and NPA status can defend against aggressive recovery agents, file police FIRs under BNS, and achieve complete debt freedom with WillDrafting.\` *\*(241 chars - FLAG: Over 155 Characters)\**

\---

**## 4. Headings Architecture (\`\<h1>\`, \`\<h2>\`) — CRITICAL**

**### H1 Tag Rules**

\- **\*\*Quantity:\*\*** Strictly **\*\*ONE\*\*** \`\<h1>\` tag per page (Screaming Frog flags \`H1: Missing\` or \`H1: Multiple\`).

\- **\*\*Length:\*\*** 30 to 65 characters (never exceed 70 characters).

\- **\*\*Placement:\*\*** Placed at the top of the main hero section.

\- **\*\*Differentiation from Page Title:\*\*** The \`\<h1>\` MUST NOT be 100% identical to \`metadata.title\` (Screaming Frog flags \`Page Titles: Same as H1\`). Tailor \`\<title>\` for SERP CTR (with secondary hooks/brackets) and \`\<h1>\` for on-page conversion and clear user intent.

**### H2 Tag Rules (\`\<h2>\`) — High Priority Audit Focus**

1\. **\*\*Length Limit:\*\*** Every single \`\<h2>\` MUST BE **\*\*≤ 70 characters\*\***.

   - **\*\*Target Range:\*\*** 45 to 65 characters.

   - **\*\*Entity Count Rule:\*\*** Both raw code characters (e.g. with \`&amp;\`) AND decoded characters (with \`&\`) must be **\*\*≤ 70 characters\*\***.

2\. **\*\*STRICTLY ZERO EM-DASHES (\`—\`) ALLOWED:\*\***

   - **\*\*NEVER\*\*** use em-dashes (\`—\` or \`&mdash;\`) in any heading.

   - Use colons (\`:\`), hyphens (\`-\`), ampersands (\`&\`), or commas (\`,\`) instead.

3\. **\*\*No On-Page Duplicate H2s:\*\***

   - Every \`\<h2>\` on the page must be unique (prevents Screaming Frog \`H2: Duplicate\` warnings).

4\. **\*\*Section Numbering & Matching Anchor IDs:\*\***

   - Number major sections sequentially (\`1.\`, \`2.\`, \`3.\` ...).

   - Ensure the containing \`\<section id="...">\` ID matches the Table of Contents anchor link (\`href="#..."\`).

**### ✅ Compliant H2 Heading Examples (≤ 70 chars, No Em-Dashes)**

\- \`1. Debt Economics: Anatomy of the Credit Card Trap\` (50 chars)

\- \`2. Financial Breakdown: True Principal vs Inflated Dues\` (55 chars)

\- \`3. Resolution Comparison: Debt Relief Pathways\` (46 chars)

\- \`4. CIBIL Algorithm: Post-Settlement Credit Rebuilding\` (52 chars)

\- \`5. Step-by-Step SOP: Verified Debt Resolution Protocol\` (54 chars)

\- \`6. Statutory Notice Defense: Legal Protections\` (46 chars)

\- \`7. 3-Tier Escalation Matrix: Institutional Redressal\` (51 chars)

\- \`8. Procedural Timeline: Default to Resolution Milestones\` (56 chars)

\- \`9. Specialized Scenarios: Layoffs & ARC Assignments\` (49 chars)

\- \`Frequently Asked Questions: Credit Card Settlements\` (52 chars)

**### ❌ Non-Compliant H2 Heading Examples**

\- \`1. Debt Economics & NPA Dynamics: The Anatomy of the Credit Card Trap in India\` *\*(79 chars - FLAG: H2 Over 70 Characters)\**

\- \`Step-by-Step Settlement SOP — How to Settle Your Loans — WillDrafting\` *\*(67 chars - FLAG: Contains Forbidden Em-Dashes)\**

\- \`Overview\` *\*(8 chars - generic; causes duplicate H2 flags)\**

\---

**## 5. Pre-Publish Screaming Frog Audit Checklist**

Before considering any page ready, verify these 8 core audit checkpoints:

\- [ ] **\*\*1. Title Length:\*\*** \`metadata.title\` is strictly **\*\*50–60 characters\*\*** (never > 60).

\- [ ] **\*\*2. Description Length:\*\*** \`metadata.description\` is strictly **\*\*140–155 characters\*\*** (never > 155, never < 100).

\- [ ] **\*\*3. Canonical URL:\*\*** \`alternates.canonical\` points to \`https\://www\.willdrafting.in/[slug]\`.

\- [ ] **\*\*4. Single H1:\*\*** Exactly ONE \`\<h1>\` on the page, length between 30 and 65 characters.

\- [ ] **\*\*5. H2 Length Check:\*\*** Every single \`\<h2>\` is **\*\*≤ 70 characters\*\*** (both raw HTML & decoded text).

\- [ ] **\*\*6. No Em-Dashes:\*\*** Strictly ZERO \`—\` or \`&mdash;\` characters in titles, descriptions, or headings.

\- [ ] **\*\*7. No Duplicate H2s:\*\*** All \`\<h2>\` tags on the page are unique.

\- [ ] **\*\*8. TypeScript Compilation:\*\*** \`npx tsc --noEmit\` passes with 0 errors.

\---

**## 6. Prompt Instruction Snippet for Page Creation**





\`\`\`markdown

CRITICAL SCREAMING FROG SEO COMPLIANCE:

The page MUST STRICTLY COMPLY with \`SEO_COMPLIANCE_GUIDELINES.md\`:

1\. Title: Strictly 50–60 characters (NEVER exceed 60 characters).

2\. Meta Description: Strictly 140–155 characters (NEVER exceed 155, NEVER below 100).

3\. H1: Exactly ONE H1 tag, length 30–65 characters.

4\. H2: EVERY H2 tag MUST BE strictly <= 70 characters (target 45–65 characters). Both raw string and decoded characters must be <= 70 characters.

5\. Punctuation: STRICTLY ZERO EM-DASHES (—) in headings, titles, or metadata. Use colons, hyphens, or & instead.

6\. H2 Duplication: Ensure all H2s on the page are unique and match their TOC anchor IDs.

7\. Canonical: Absolute self-referencing canonical URL (https\://www\.willdrafting.in/[slug]).

8\. Code Quality: Clean TypeScript with 0 compilation errors.

\`\`\`

**## 7. Content Readability Rules: Flesch Reading Ease (CRITICAL)**

**\*\*Objective:\*\*** Every new page created for WillDrafting MUST meet the content readability requirements measured by Screaming Frog SEO Spider. Content must not be classified as "Difficult" or "Very Difficult" under the Flesch Reading Ease test.

**### 7.1. Strict Flesch Reading Ease Score**

Follow these readability score classifications:

\| Flesch Reading Ease Score | Readability Level | Requirement                    |

\| ------------------------- | ----------------- | ------------------------------ |

\| 90-100                    | Very Easy         | Acceptable                     |

\| 80-89                     | Easy              | Acceptable                     |

\| 70-79                     | Fairly Easy       | Ideal                          |

\| 60-69                     | Standard          | Minimum preferred target       |

\| 50-59                     | Fairly Difficult  | Acceptable only when necessary |

\| 30-49                     | Difficult         | NOT ACCEPTABLE                 |

\| 0-29                      | Very Difficult    | STRICTLY PROHIBITED            |

**\*\*Mandatory requirements:\*\***

1\. Target a Flesch Reading Ease score of 60 or higher for all newly created pages.

2\. Never publish content with a Flesch Reading Ease score below 50.

3\. Avoid complex sentence structures, excessive legal terminology, lengthy paragraphs, and unnecessarily complicated explanations.

4\. Write for ordinary Indian borrowers who may have little knowledge of banking laws, financial regulations, or legal procedures.

5\. Do not sacrifice legal accuracy to achieve a higher readability score.

**### 7.2. Sentence Length Rules**

1\. Target an average sentence length of 12-18 words.

2\. Avoid sentences exceeding 25 words whenever possible.

3\. Split sentences containing multiple independent clauses into shorter sentences.

4\. Avoid combining several legal conditions, exceptions, and explanations into a single sentence.

5\. Use direct sentence structures with a clear subject, verb, and object.

6\. Prefer active voice over passive voice whenever appropriate.

**\*\*Bad example:\*\***

"In accordance with the applicable regulatory framework governing financial institutions, borrowers may seek appropriate remedies against unlawful recovery practices that contravene established procedural requirements."

**\*\*Good example:\*\***

"RBI rules protect borrowers from unlawful recovery practices. You can file a complaint if a lender breaks these rules."

**### 7.3. Paragraph Length Rules**

1\. Keep paragraphs between 2 and 4 sentences.

2\. Aim for approximately 40-80 words per paragraph.

3\. Avoid paragraphs exceeding 100 words unless absolutely necessary.

4\. Break long explanations into smaller paragraphs with clear transitions.

5\. Use bullet points and numbered lists for procedures, legal rights, eligibility criteria, and document requirements.

6\. Ensure every paragraph explains one main idea.

**### 7.4. Simple Language and Legal Terminology**

1\. Use familiar English words whenever possible.

2\. Explain complex legal and financial terms immediately after introducing them.

3\. Do not use several unfamiliar legal terms in the same sentence.

4\. Retain essential statutory names, section numbers, case names, and regulatory terminology.

5\. Explain the practical meaning of every important legal provision in plain English.

6\. Avoid unnecessary jargon, redundant expressions, and overly formal language.

7\. Use clear transitions such as "For example," "This means," "However," and "As a result."

8\. Use contractions only when appropriate for the professional tone of the page.

**\*\*Example:\*\***

Instead of writing:

"The creditor may initiate enforcement proceedings pursuant to the applicable statutory provisions."

Write:

"The lender may start legal action under the applicable law."

When a statutory term is essential, retain it and explain it in simple language.

**### 7.5. Content Structure and Readability**

1\. Use descriptive H2 and H3 headings to divide complex topics into manageable sections.

2\. Keep each section focused on one question or subject.

3\. Explain the main answer before introducing detailed legal analysis.

4\. Use numbered steps for legal procedures and settlement processes.

5\. Use tables when comparing legal options, timelines, charges, or borrower rights.

6\. Include relevant examples to explain difficult financial or legal concepts.

7\. Avoid repeating the same information across multiple sections.

8\. Avoid excessive introductory text, filler sentences, and unnecessary explanations.

9\. Keep FAQs direct and concise while answering the actual question.

10\. Maintain all existing SEO heading restrictions, including the 70-character maximum for H2 headings and the prohibition on em-dashes.

**### 7.6. Flesch-Kincaid Grade Level**

Where available, also evaluate the Flesch-Kincaid Grade Level.

1\. Aim for a grade level of approximately 8-10.

2\. Prefer sentence structures understandable to readers with a basic secondary-school education.

3\. Explain technical concepts without removing legally essential details.

4\. Treat the grade-level score as a secondary readability indicator. The primary acceptance metric is Flesch Reading Ease.

**### 7.7. Mandatory Pre-Publication Readability Audit**

Before publishing any newly created page:

1\. Review the complete rendered page content, including headings, paragraphs, lists, and FAQs.

2\. Calculate or measure the Flesch Reading Ease score using a reliable readability analyzer.

3\. Target a score of at least 60.

4\. If the score is below 60, simplify the language, shorten sentences, and restructure lengthy paragraphs.

5\. Repeat the analysis until the target score is achieved, where reasonably possible without compromising legal accuracy.

6\. Check for both Difficult and Very Difficult classifications.

7\. Verify that important legal explanations remain accurate and complete.

8\. Run Screaming Frog against the published URL and inspect its readability results.

9\. Fix any readability issues identified by the actual Screaming Frog crawl.

10\. Never claim that a readability issue is resolved without checking the final rendered content and the relevant Screaming Frog result.

**\*\*Important:\*\*** A readability score calculated before rendering is only a preliminary check. The final result must be verified against the content Screaming Frog actually crawls.

**### 7.8. Mandatory Instruction for AI Page Generation**

Every prompt used to create a new WillDrafting page MUST include the following instruction:

"CRITICAL CONTENT READABILITY REQUIREMENT:

Write all page content according to the Flesch Reading Ease formula. Target a score of 60 or higher. Never publish content with a score below 50.

Use an average sentence length of 12-18 words, short paragraphs, active voice, simple English, clear transitions, and plain-language explanations of complex legal terms.

Avoid unnecessarily long sentences, excessive legal jargon, dense paragraphs, redundant explanations, and complicated sentence structures.

Preserve the accuracy of Indian banking laws, RBI regulations, statutory provisions, and legal explanations. Do not remove essential legal information merely to improve readability.

Before completing the page, evaluate the full content using a reliable readability analyzer. Rewrite difficult passages and repeat the check until the target score is achieved, where reasonably possible.

After deployment, crawl the final URL using Screaming Frog SEO Spider. Inspect the actual readability results and fix any remaining Difficult or Very Difficult classifications.

Do not introduce new SEO issues while improving readability. Continue to comply with all existing title, meta description, H1, H2, canonical URL, duplicate heading, and TypeScript requirements."

---

## 8. Additional SEO Requirements for Every New Page

The rules in this section complement the existing Screaming Frog and readability checks. Apply the relevant requirements to every landing page, topic page, service page, and supporting article.

### 8.1 Search Intent and Keyword Mapping

- [ ] Define one primary search intent for the page: informational, commercial, transactional, or navigational.
- [ ] Choose one primary keyword and a small set of closely related secondary terms before writing.
- [ ] Ensure the page answers the specific question or need implied by its target query.
- [ ] Use the primary keyword naturally in the title, H1, opening section, and where relevant in the URL, headings, and body content.
- [ ] Use synonyms and related entities naturally. Do not repeat keywords unnaturally or add keyword-stuffed headings.
- [ ] Check existing site pages before creating a new URL. If another page already targets the same intent, improve or consolidate the existing page unless there is a clear reason for a separate page.
- [ ] Do not promise a specific settlement percentage, legal outcome, or guaranteed result unless it is accurate, supportable, and appropriately qualified.

### 8.2 Unique, Useful Content

- [ ] Give every URL a distinct purpose, search intent, title, H1, meta description, and substantive main content.
- [ ] Do not publish dozens of pages that only swap a keyword, location, loan type, or a few sentences in an otherwise identical template.
- [ ] Use reusable components for layout, but write page-specific explanations, examples, eligibility factors, risks, process steps, FAQs, and next steps.
- [ ] Answer the main question near the beginning of the page, then explain relevant details, exceptions, and practical actions.
- [ ] Include useful original value where appropriate, such as a worked example, decision table, document checklist, process timeline, or comparison.
- [ ] Remove filler, repeated paragraphs, irrelevant sections, and FAQs that do not help the target reader.
- [ ] Do not invent statistics, citations, case law, customer testimonials, legal provisions, or official guidance.

### 8.3 URL and Indexability

- [ ] Use a short, readable, descriptive, lowercase URL slug with hyphens between words.
- [ ] Avoid unnecessary URL parameters, duplicate trailing-slash versions, and multiple URLs serving the same content.
- [ ] Return the correct HTTP status: normally `200` for a valid page, `301` for a permanent move, and `404` or `410` for content that is genuinely unavailable.
- [ ] Ensure pages intended to rank are not blocked by `robots.txt`, protected by authentication, or marked `noindex`.
- [ ] Ensure staging, preview, test, and duplicate URLs cannot accidentally be indexed.
- [ ] Use a self-referencing absolute canonical URL for a unique indexable page. Canonical tags are hints, so also keep internal links and sitemap URLs consistent.
- [ ] Include only preferred, canonical, indexable URLs that return `200` in the XML sitemap.
- [ ] Verify that important pages are reachable through normal HTML links, not only through search, forms, client-side interactions, or an internal site search.

### 8.4 Internal Links and Site Architecture

- [ ] Link to each new page from at least one relevant, indexable page on the site.
- [ ] Add contextual links from related guides, service pages, topic hubs, and relevant tools where useful.
- [ ] Use descriptive anchor text that explains the destination. Avoid using the same exact-match keyword as anchor text everywhere.
- [ ] Link from the new page to relevant supporting content and appropriate service or contact pages.
- [ ] Check that all internal links resolve correctly and do not lead through unnecessary redirect chains.
- [ ] Avoid orphan pages, excessive site depth, irrelevant cross-links, and footer/sidebar links added only to manipulate rankings.
- [ ] If a table of contents is used, make every anchor link point to an existing unique section ID.

### 8.5 Structured Data

- [ ] Add structured data only when it accurately describes the visible page content and the page is eligible for that schema type.
- [ ] Select the appropriate schema type where applicable, such as `Organization`, `BreadcrumbList`, `Article` or `BlogPosting`, or `Product`. Do not add types merely because they are available.
- [ ] Keep structured data consistent with visible content, page canonical URL, author, dates, and organization details.
- [ ] Validate JSON-LD syntax and test the result with Google's Rich Results Test where supported and the Schema Markup Validator.
- [ ] Do not expect structured data to guarantee a rich result or ranking improvement.
- [ ] Do not add FAQ structured data solely to seek a Google FAQ rich result; eligibility is limited and display is not guaranteed.

### 8.6 Images and Other Media

- [ ] Use relevant, high-quality images and descriptive filenames where practical.
- [ ] Provide meaningful `alt` text for informative images. Use empty alt text (`alt=""`) for purely decorative images.
- [ ] Do not stuff keywords into alt text or repeat the same alt text for unrelated images.
- [ ] Use responsive image sizes and modern formats such as WebP or AVIF when supported.
- [ ] Set image width and height, or an aspect ratio, to reduce layout shifts.
- [ ] Compress images without making them visibly poor quality.
- [ ] Lazy-load below-the-fold images, but do not lazy-load the main above-the-fold/LCP image by default.
- [ ] Ensure important image content is available to crawlers and does not depend on inaccessible scripts.

### 8.7 Page Experience and Technical Quality

- [ ] Ensure the page works on mobile screens and at common viewport sizes.
- [ ] Use semantic HTML and a logical heading hierarchy. Do not choose heading tags only for their visual styling.
- [ ] Ensure the main content and important links are present in rendered HTML and can be accessed by search engines.
- [ ] Avoid intrusive interstitials, unexpected overlays, broken layouts, and controls that cannot be used by keyboard or assistive technology.
- [ ] Test loading performance and Core Web Vitals. Current good targets are LCP ≤ 2.5 seconds, INP ≤ 200 milliseconds, and CLS ≤ 0.1 at the 75th percentile.
- [ ] Avoid unnecessary JavaScript, large client-side bundles, render-blocking resources, and layout shifts.
- [ ] Use HTTPS and ensure canonical URLs, internal links, redirects, and sitemap entries use the preferred HTTPS host.
- [ ] Check browser console errors, failed network requests, missing images, and hydration issues after deployment.

### 8.8 Trust, Expertise, and Legal/Financial Accuracy

- [ ] Because debt and legal-financial topics can affect important decisions, make the content accurate, careful, and transparent.
- [ ] Identify the author or reviewer where appropriate and show relevant, verifiable qualifications rather than unsupported claims of expertise.
- [ ] Provide an author/reviewer profile and a way to contact the organization where appropriate.
- [ ] Cite relevant primary sources, such as current RBI publications, applicable statutes, court judgments, or official government pages, when making legal or regulatory claims.
- [ ] Verify that cited sources actually support the claim and are current. Include publication or update dates when useful.
- [ ] Distinguish general information from legal advice. Explain that the right course of action can depend on the facts and documents of an individual case.
- [ ] Do not imply guaranteed loan settlement, guaranteed debt waiver, guaranteed CIBIL score improvement, or guaranteed legal outcomes.
- [ ] Review pages when laws, RBI directions, court decisions, or business processes change. Update dates only when a meaningful review or revision has occurred.

### 8.9 Metadata, Social Sharing, and Page Completeness

- [ ] Keep the existing title, description, H1, H2 length, uniqueness, and punctuation rules in this document.
- [ ] Use a unique, relevant Open Graph title, description, and image when social sharing is important.
- [ ] Set an appropriate `lang` attribute on the document and use correct language markup for the page content.
- [ ] Set a clear favicon and consistent brand details where applicable.
- [ ] Include a useful breadcrumb trail when it helps users understand the site hierarchy.
- [ ] Ensure the page has a meaningful main landmark, navigation, and footer; these should support usability rather than substitute for unique main content.
- [ ] Check that no placeholder text, empty sections, broken buttons, dummy links, or unfinished content are visible.

### 8.10 Pagination, Filters, and Similar URLs

- [ ] Review faceted navigation, sorting, filters, search-result URLs, and query parameters for accidental crawl traps or duplicate content.
- [ ] Decide which filtered URLs, if any, should be indexable based on unique search demand and useful content.
- [ ] Do not allow unlimited combinations of filters or parameters to create large numbers of low-value crawlable URLs.
- [ ] For paginated content, provide crawlable links between pages and use consistent canonical behavior appropriate to the implementation.
- [ ] Do not canonicalize substantially different pages to one URL merely to hide duplication; fix the underlying content or URL design.

### 8.11 Analytics and Conversion Tracking

- [ ] Verify that analytics and conversion tracking work without blocking page content or causing major performance issues.
- [ ] Track meaningful actions relevant to the page, such as qualified contact submissions, consultation requests, or tool completions.
- [ ] Respect applicable privacy and consent requirements for analytics, advertising, and personal data.
- [ ] Test forms, validation messages, success states, and error states before publishing.
- [ ] Ensure tracking events do not fire multiple times for a single action and do not expose sensitive user information.

### 8.12 Duplicate, Broken, and Crawl Checks

Before release, inspect the rendered URL with Screaming Frog or equivalent tools:

- [ ] Confirm the page returns the intended HTTP status and is indexable.
- [ ] Confirm title, meta description, H1, canonical, robots directives, and language are correct.
- [ ] Confirm internal links, image URLs, CSS, JavaScript, and other critical resources load successfully.
- [ ] Check for duplicate titles, descriptions, H1s, repeated H2s, thin content, and near-duplicate pages.
- [ ] Check for broken internal links, redirect chains, redirect loops, orphan pages, and unexpected 4xx/5xx responses.
- [ ] Check that the page is included in the sitemap when it should be indexed.
- [ ] Review mobile rendering, accessibility basics, performance, and any structured data.
- [ ] Run the project's lint, type-check, tests, and production build. For TypeScript projects, run `npx tsc --noEmit` and the repository's actual build command.
- [ ] Re-crawl after deployment. Do not mark an issue fixed until the final URL and rendered content have been checked.

---

## 9. Recommended Page Content Blueprint

Use this as a flexible blueprint, not a requirement to force every section onto every URL. Include only sections that genuinely help answer the user's intent.

1. **Hero:** One H1, a concise answer or value proposition, and a relevant next step.
2. **Quick answer:** A direct response to the main query near the top.
3. **Key facts:** Important eligibility factors, definitions, risks, or legal context.
4. **Detailed explanation:** Unique, well-organized sections with descriptive H2s and H3s.
5. **Process or steps:** Practical steps, required documents, timelines, or decision points where relevant.
6. **Options and comparisons:** Explain alternatives, trade-offs, costs, and risks where applicable.
7. **Examples or tools:** A worked example, calculator, checklist, or table only when useful and accurate.
8. **Risks and exceptions:** Explain important limitations and situations where advice may differ.
9. **FAQs:** Answer real follow-up questions concisely. Do not add generic FAQs just to increase word count.
10. **Sources and review details:** Link to reliable primary sources and show relevant authorship/review information.
11. **Relevant next step:** Link to a related guide, useful tool, or service/contact page without making unsupported promises.

---

## 10. Reusable AI Prompt for Creating SEO Pages

Copy this prompt into the task used to create each new page. Replace the bracketed values before running it.

```text
Create a production-ready page for [WEBSITE] at [CANONICAL URL].

Page topic: [TOPIC]
Primary keyword: [PRIMARY KEYWORD]
Secondary terms/entities: [SECONDARY TERMS]
Search intent: [INTENT]
Target audience: [AUDIENCE]
Desired user action: [ACTION]
Relevant internal pages: [INTERNAL URLS]
Required framework and project conventions: [FRAMEWORK / CONVENTIONS]

Before coding:
1. Inspect the existing project structure, routing, shared components, metadata conventions,
   design system, content model, and related pages.
2. Check existing URLs and content to avoid keyword cannibalization and near-duplicate pages.
3. Identify the exact user intent and plan a page that adds distinct value.
4. Reuse shared layout components, but make the content specific to this page.
5. Do not change unrelated functionality or invent facts, legal citations, statistics, prices,
   guarantees, testimonials, or business credentials.

SEO REQUIREMENTS:
- Unique title of 50-60 characters, following the project's configured SEO rules.
- Unique meta description of 140-155 characters, following the project's configured SEO rules.
- Exactly one H1, 30-65 characters, and different from the title.
- Keep each H2 at 70 characters or fewer; aim for 45-65 characters where natural.
- Do not use em-dashes in titles, metadata, or headings.
- Make H2 headings unique on the page and ensure table-of-contents anchors match section IDs.
- Add an absolute, self-referencing canonical URL for the preferred indexable URL.
- Set index/follow directives appropriately. Do not accidentally noindex a page intended to rank.
- Use the primary keyword naturally. Avoid keyword stuffing.
- Add relevant contextual internal links with descriptive anchor text.
- Add accurate structured data only when appropriate and supported by visible content.
- Add useful image alt text; use empty alt text for decorative images.
- Ensure the page can be crawled, rendered, and accessed on mobile.
- Keep the page distinct from existing pages; do not merely swap the keyword in a template.

CONTENT AND TRUST:
- Answer the main query early and explain complex terms in plain English.
- Aim for Flesch Reading Ease 60+ where reasonably possible; do not publish below 50
  without review. Preserve legal and factual accuracy over a mechanical score.
- Target an average sentence length of 12-18 words. Use concise paragraphs, lists, and tables
  when they genuinely improve understanding.
- For legal/financial claims, verify current primary sources and link to them.
- Distinguish general information from individualized legal or financial advice where appropriate.
- Do not promise a guaranteed settlement, waiver, credit-score outcome, or legal result.
- Include relevant risks, exceptions, practical steps, and useful FAQs without filler.
- Include author/reviewer details only when they are real and verifiable.

IMPLEMENTATION AND VALIDATION:
- Follow the existing framework, routing, TypeScript, styling, accessibility, and coding conventions.
- Do not introduce broken links, placeholder text, console errors, hydration errors, or missing assets.
- Do not add unnecessary JavaScript or performance-heavy dependencies.
- Verify title and description character counts programmatically.
- Run the project's lint, tests, type-check, and production build where available.
- Inspect the final rendered page, not just the source code.
- Crawl the deployed URL with Screaming Frog and fix actual issues found.
- Check HTTP status, indexability, canonical, robots directives, internal links, images,
  duplicate metadata/headings, sitemap inclusion, and readability.
- Report the files changed, checks run, results, and any remaining limitations.
```

---

## 11. Important Implementation Notes

- **Do not treat a single SEO checklist as a ranking guarantee.** Technical compliance helps search engines access and understand a page, but rankings also depend on usefulness, competition, authority, and many other factors.
- **Do not force every optional element onto every page.** Schema, FAQs, tables, images, breadcrumbs, and page sections should be used when relevant.
- **Use WillDrafting consistently.** The production domain for this project is `https://www.willdrafting.in/`. Use it consistently for canonical URLs, internal links, sitemap entries, structured data, and relevant brand references.
- **Keep the existing project as the source of truth for implementation.** Confirm framework conventions and available scripts before adding dependencies or changing routing.
- **Separate automated checks from editorial review.** Character counts and broken links can be checked mechanically; legal accuracy, usefulness, and originality require human review.
